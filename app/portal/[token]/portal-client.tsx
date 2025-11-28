"use client";
import useSWR from "swr";
import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

function stageLabel(stage?: string) {
  const s = (stage || "").toLowerCase();
  switch (s) {
    case "applied":
      return "Đã nộp";
    case "screening":
      return "Sàng lọc";
    case "interview":
      return "Phỏng vấn";
    case "offer":
      return "Đề nghị";
    case "hired":
      return "Trúng tuyển";
    case "rejected":
      return "Từ chối";
    default:
      return s || "Đang xử lý";
  }
}

export default function CandidatePortal({ token }: { token: string }) {
  const { data, isLoading } = useSWR(`/api/candidate/${token}`, fetcher);
  const rec = data?.data;
  const jobId = rec?.job_id;
  const { data: jobData } = useSWR(jobId ? `/api/jobs/${jobId}` : null, fetcher);

  return (
    <div className="max-w-2xl mx-auto py-10 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Trạng thái hồ sơ</h1>
        <p className="text-sm text-muted-foreground">Mã theo dõi: <code>{token}</code></p>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Đang tải...</p>
      ) : !data?.success ? (
        <Card><CardContent className="p-6">Không tìm thấy hồ sơ. Vui lòng kiểm tra lại mã theo dõi.</CardContent></Card>
      ) : (
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-lg">{rec.fullName}</div>
                <div className="text-sm text-muted-foreground">{rec.email} • {rec.phone}</div>
              </div>
              <Badge variant="secondary">{stageLabel(rec.cv_status)}</Badge>
            </div>
            {jobData?.success && (
              <div className="text-sm">Vị trí: <span className="font-medium">{jobData.data.job_title}</span></div>
            )}
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Nộp lúc: {new Date(rec.uploadedAt).toLocaleString()}</div>
              {rec.interview_time && (
                <div className="text-sm">Lịch phỏng vấn: <span className="font-medium">{new Date(rec.interview_time).toLocaleString()}</span></div>
              )}
            </div>
            <div className="text-xs text-muted-foreground">Trạng thái hệ thống: {rec.status === 1 ? "ĐÁP ỨNG" : rec.status === 0 ? "KHÔNG ĐÁP ỨNG" : "Đang đánh giá"}</div>
          </CardContent>
        </Card>
      )}

      <div className="text-sm text-muted-foreground">Nếu bạn cần hỗ trợ, vui lòng liên hệ: careers@vtech.com</div>
    </div>
  );
}
