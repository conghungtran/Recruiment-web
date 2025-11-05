"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  FaceDetector,
  FilesetResolver,
  type FaceDetectorResult,
} from "@mediapipe/tasks-vision";

export type FacePresenceStatus =
  | "idle"
  | "loading"
  | "present"
  | "absent"
  | "multiple"
  | "error";

interface UseFacePresenceOptions {
  minConfidence?: number;
  fps?: number;
  absenceMs?: number;
  allowMultiple?: boolean;
  onViolation?: (reason: "no_face" | "multi_face") => void;
  wasmBaseUrl?: string; // optional override for CDN/base URL of wasm files
}

export function useFacePresence(options?: UseFacePresenceOptions) {
  const {
    minConfidence = 0.6,
    fps = 10,
    absenceMs = 3000,
    allowMultiple = false,
    onViolation,
    wasmBaseUrl =
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.21/wasm",
  } = options || {};

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [status, setStatus] = useState<FacePresenceStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  // Refs for stable access in RAF loop (avoid re-creating callbacks and restarts)
  const statusRef = useRef<FacePresenceStatus>("idle");
  const fpsRef = useRef<number>(fps);
  const minConfidenceRef = useRef<number>(minConfidence);
  const absenceMsRef = useRef<number>(absenceMs);
  const allowMultipleRef = useRef<boolean>(allowMultiple);
  const onViolationRef = useRef<UseFacePresenceOptions["onViolation"]>(onViolation);

  useEffect(() => { fpsRef.current = fps; }, [fps]);
  useEffect(() => { minConfidenceRef.current = minConfidence; }, [minConfidence]);
  useEffect(() => { absenceMsRef.current = absenceMs; }, [absenceMs]);
  useEffect(() => { allowMultipleRef.current = allowMultiple; }, [allowMultiple]);
  useEffect(() => { onViolationRef.current = onViolation; }, [onViolation]);

  const setStatusSafe = (next: FacePresenceStatus) => {
    if (statusRef.current !== next) {
      statusRef.current = next;
      setStatus(next);
    }
  };

  const detectorRef = useRef<FaceDetector | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const loopRef = useRef<number | null>(null);
  const lastTickRef = useRef<number>(0);
  const absentSinceRef = useRef<number | null>(null);
  const stoppedRef = useRef<boolean>(false);
  const violatedRef = useRef<boolean>(false);
  const originalConsoleErrorRef = useRef<typeof console.error | null>(null);

  const stop = useCallback(() => {
    stoppedRef.current = true;
    if (loopRef.current) cancelAnimationFrame(loopRef.current);

    // Stop camera tracks and detach from video element
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
      if (videoRef.current) {
        try { videoRef.current.pause(); } catch {}
        try {
          const src = videoRef.current.srcObject as MediaStream | null;
          src?.getTracks().forEach((t) => t.stop());
        } catch {}
        // @ts-expect-error: srcObject is assignable at runtime
        videoRef.current.srcObject = null;
      }
    } catch {}

    // Close detector defensively
    try {
      const d = detectorRef.current as unknown as { close?: () => void } | null;
      if (d?.close) d.close();
    } catch {}
    detectorRef.current = null;

    // Restore console.error if we monkey-patched it
    if (originalConsoleErrorRef.current) {
      console.error = originalConsoleErrorRef.current;
      originalConsoleErrorRef.current = null;
    }

    setStatusSafe("idle");
  }, []);

  const detectLoop = useCallback(
    async (t: number) => {
      if (stoppedRef.current) return;
      loopRef.current = requestAnimationFrame(detectLoop);

      const interval = 1000 / fpsRef.current;
      if (t - lastTickRef.current < interval) return;
      lastTickRef.current = t;

      const video = videoRef.current as HTMLVideoElement | null;
      const detector = detectorRef.current;
      if (!video || !detector) return;

      // Guard: ensure the video has valid dimensions and is ready
      if (
        video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA ||
        video.videoWidth === 0 ||
        video.videoHeight === 0 ||
        video.paused ||
        video.ended
      ) {
        return;
      }

      try {
        const result: FaceDetectorResult = detector.detectForVideo(
          video,
          performance.now()
        );
        const detections = result.detections || [];
        const faces = detections.filter((d) => {
          const score = d.categories?.[0]?.score ?? 1;
          return score >= minConfidenceRef.current;
        });
        const count = faces.length;

        if (count === 0) {
          if (statusRef.current !== "absent") setStatusSafe("absent");
          if (absentSinceRef.current == null)
            absentSinceRef.current = performance.now();
          const elapsed = performance.now() - (absentSinceRef.current ?? 0);
          if (elapsed >= absenceMsRef.current && !violatedRef.current) {
            violatedRef.current = true;
            onViolationRef.current?.("no_face");
          }
        } else if (count > 1 && !allowMultipleRef.current) {
          if (statusRef.current !== "multiple") setStatusSafe("multiple");
          if (!violatedRef.current) {
            violatedRef.current = true;
            onViolationRef.current?.("multi_face");
          }
        } else {
          absentSinceRef.current = null;
          if (statusRef.current !== "present") setStatusSafe("present");
          violatedRef.current = false;
        }
      } catch (e: any) {
        // Treat as transient error; skip this frame
        setError(e?.message ?? "Face detection error");
      }
    },
    []
  );

  const start = useCallback(async () => {
    try {
      setStatusSafe("loading");

      // Load fileset and model
      const fileset = await FilesetResolver.forVisionTasks(wasmBaseUrl);

      // Suppress noisy INFO logs from TFLite that Next treats as errors in dev
      if (!originalConsoleErrorRef.current) {
        originalConsoleErrorRef.current = console.error;
        console.error = (...args: any[]) => {
          try {
            const msg = args?.[0];
            if (
              typeof msg === "string" &&
              (/XNNPACK delegate/i.test(msg) || /TensorFlow Lite/i.test(msg))
            ) {
              return;
            }
          } catch {}
          return originalConsoleErrorRef.current!(...args);
        };
      }

      const detector = await FaceDetector.createFromOptions(fileset, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite",
        },
        minDetectionConfidence: minConfidence,
        runningMode: "VIDEO",
      });
      detectorRef.current = detector;

      // Camera
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 320 },
          height: { ideal: 240 },
        },
        audio: false,
      });
      streamRef.current = stream;

      const video = videoRef.current;
      if (!video) throw new Error("Video element not ready");
      video.srcObject = stream;

      // Wait for metadata to ensure videoWidth/Height are available
      await new Promise<void>((resolve) => {
        const onLoaded = () => {
          video.removeEventListener("loadedmetadata", onLoaded);
          resolve();
        };
        if (video.readyState >= HTMLMediaElement.HAVE_METADATA) resolve();
        else video.addEventListener("loadedmetadata", onLoaded);
      });

      await video.play();

      // Mark as absent while detector warms up so UI doesn't stay in "loading"
      setStatusSafe("absent");

      // Extra guard: wait until canplay if dimensions are still 0
      if (video.videoWidth === 0 || video.videoHeight === 0) {
        await new Promise<void>((resolve) => {
          const onCanPlay = () => {
            video.removeEventListener("canplay", onCanPlay);
            resolve();
          };
          video.addEventListener("canplay", onCanPlay);
        });
      }

      stoppedRef.current = false;
      lastTickRef.current = 0;
      absentSinceRef.current = null;
      violatedRef.current = false;

      loopRef.current = requestAnimationFrame(detectLoop);
    } catch (e: any) {
      setStatusSafe("error");
      setError(e?.message ?? "Camera/model init failed");
    }
  }, [wasmBaseUrl]);

  useEffect(() => {
    return () => stop();
  }, [stop]);

  return { videoRef, status, error, start, stop };
}