"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CandidatePortalEntry() {
  const [token, setToken] = useState("");
  const router = useRouter();
  return (
    <div className="max-w-md mx-auto py-12">
      <h1 className="text-2xl font-bold mb-4">Tra cứu hồ sơ ứng tuyển</h1>
      <p className="text-sm text-muted-foreground mb-6">Nhập mã theo dõi (đã gửi qua email sau khi nộp CV) để xem trạng thái hồ sơ.</p>
      <div className="flex gap-2">
        <Input placeholder="Nhập mã theo dõi" value={token} onChange={(e)=>setToken(e.target.value)} />
        <Button onClick={()=> token.trim() && router.push(`/portal/${token.trim()}`)}>Xem</Button>
      </div>
    </div>
  );
}
