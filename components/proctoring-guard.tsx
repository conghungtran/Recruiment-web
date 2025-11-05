"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useFacePresence, type FacePresenceStatus } from "@/hooks/use-face-presence";

interface ProctoringGuardProps {
  cvId?: string | number;
  enabled?: boolean; // when true, violations trigger reject + redirect
  absenceMs?: number;
  allowMultiple?: boolean;
  minConfidence?: number;
  fps?: number;
  wasmBaseUrl?: string;
  className?: string;
  // Camera floating window
  draggable?: boolean;
  initialPosition?: { x: number; y: number };
  children: React.ReactNode;
}

export default function ProctoringGuard({
  cvId,
  enabled = true,
  absenceMs = 3000,
  allowMultiple = false,
  minConfidence = 0.5,
  fps = 12,
  wasmBaseUrl,
  className,
  draggable = true,
  initialPosition,
  children,
}: ProctoringGuardProps) {
  const router = useRouter();

  const { videoRef, status, start, stop } = useFacePresence({
    absenceMs,
    allowMultiple,
    minConfidence,
    fps,
    wasmBaseUrl,
    onViolation: async (reason) => {
      if (!enabled || !cvId) return;
      try {
        const base = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8080";
        await fetch(`${base}/api/cv/${cvId}/status`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cv_status: "rejected", reason }),
        });
      } catch (e) {
        // ignore
      } finally {
        stop();
        router.replace(`/cv-processing/${cvId}`);
      }
    },
  });

  useEffect(() => {
    start();
    return () => stop();
  }, [start, stop]);

  const blocked = status !== "present";

  // Draggable camera preview
  const WIDTH = 160; // w-40 = 10rem ≈ 160px
  const HEIGHT = 112; // h-28 = 7rem ≈ 112px
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const dragRef = useRef<{ dragging: boolean; dx: number; dy: number }>({ dragging: false, dx: 0, dy: 0 });

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("proctor_cam_pos") : null;
    if (saved) {
      try {
        const p = JSON.parse(saved);
        setPos({ x: p.x, y: p.y });
        return;
      } catch {}
    }
    const def = initialPosition ?? {
      x: Math.max(16, (typeof window !== "undefined" ? window.innerWidth : 0) - WIDTH - 16),
      y: Math.max(16, (typeof window !== "undefined" ? window.innerHeight : 0) - HEIGHT - 16),
    };
    setPos(def);
  }, [initialPosition]);

  useEffect(() => {
    if (!draggable) return;
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragRef.current.dragging) return;
      const point = (e as TouchEvent).touches?.[0] ?? (e as MouseEvent);
      const x = (point as any).clientX - dragRef.current.dx;
      const y = (point as any).clientY - dragRef.current.dy;
      const maxX = window.innerWidth - WIDTH - 8;
      const maxY = window.innerHeight - HEIGHT - 8;
      const next = { x: Math.min(Math.max(8, x), maxX), y: Math.min(Math.max(8, y), maxY) };
      setPos(next);
    };
    const onUp = () => {
      if (!dragRef.current.dragging) return;
      dragRef.current.dragging = false;
      if (pos) localStorage.setItem("proctor_cam_pos", JSON.stringify(pos));
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove as any);
      window.removeEventListener("touchend", onUp);
    };
  }, [draggable, pos]);

  const onDown = (e: React.MouseEvent | React.TouchEvent) => {
    if (!draggable || !pos) return;
    const point = (e as React.TouchEvent).touches?.[0] ?? (e as React.MouseEvent);
    dragRef.current.dragging = true;
    dragRef.current.dx = (point as any).clientX - pos.x;
    dragRef.current.dy = (point as any).clientY - pos.y;
  };

  return (
    <div className={`relative ${className ?? ""}`}>
      {/* Camera preview (draggable) */}
      {pos && (
        <div
          onMouseDown={onDown as any}
          onTouchStart={onDown as any}
          style={{ position: "fixed", left: pos.x, top: pos.y }}
          className="z-40 cursor-move select-none"
        >
          <video
            ref={videoRef}
            playsInline
            autoPlay
            muted
            className="w-40 h-28 bg-black/60 rounded-md border border-white/10 object-cover shadow-lg"
          />
        </div>
      )}

      {/* Overlay to block interactions when no single face */}
      {blocked && (
        <div className="absolute inset-0 z-30 grid place-items-center bg-black/60 text-white text-center p-6">
          <div className="space-y-2">
            <p className="text-lg font-medium">Hãy giữ khuôn mặt trong khung hình để tiếp tục</p>
            <p className="text-sm opacity-80">
              Trạng thái: {status === "loading" ? "Đang khởi tạo camera..." : status}
            </p>
          </div>
        </div>
      )}

      <div aria-hidden={blocked} className={blocked ? "pointer-events-none select-none blur-sm" : ""}>
        {children}
      </div>
    </div>
  );
}
