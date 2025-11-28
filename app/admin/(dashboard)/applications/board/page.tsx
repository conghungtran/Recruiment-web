"use client";
import useSWR, { mutate } from "swr";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const STAGES = [
  { key: "applied", label: "Applied" },
  { key: "screening", label: "Screening" },
  { key: "interview", label: "Interview" },
  { key: "offer", label: "Offer" },
  { key: "hired", label: "Hired" },
  { key: "rejected", label: "Rejected" },
];

function StageBadge({ s }: { s?: string }) {
  const m: Record<string, string> = {
    applied: "bg-blue-100 text-blue-700",
    screening: "bg-amber-100 text-amber-700",
    interview: "bg-purple-100 text-purple-700",
    offer: "bg-green-100 text-green-700",
    hired: "bg-emerald-100 text-emerald-700",
    rejected: "bg-rose-100 text-rose-700",
  };
  const c = m[(s||"").toLowerCase()] || "bg-gray-100 text-gray-700";
  return <span className={`px-2 py-0.5 rounded text-xs ${c}`}>{s || "applied"}</span>;
}

function useNotes(id?: number) {
  const { data, mutate } = useSWR(id ? `/api/admin/applications/${id}/notes` : null, fetcher);
  async function add(note: string) {
    await fetch(`/api/admin/applications/${id}/notes`, { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify({ note }) });
    mutate();
  }
  return { items: data?.items || [], add };
}

function useTags(id?: number) {
  const { data, mutate } = useSWR(id ? `/api/admin/applications/${id}/tags` : null, fetcher);
  async function add(name: string) {
    await fetch(`/api/admin/applications/${id}/tags`, { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify({ name }) });
    mutate();
  }
  async function remove(name: string) {
    await fetch(`/api/admin/applications/${id}/tags`, { method: "DELETE", headers: {"Content-Type":"application/json"}, body: JSON.stringify({ name }) });
    mutate();
  }
  return { items: data?.items || [], add, remove };
}

export default function ApplicationsBoardPage() {
  const { data } = useSWR(`/api/admin/applications?page=1&pageSize=200`, fetcher);
  const apps = (data?.items || []) as any[];
  const [activeId, setActiveId] = useState<number | null>(null);
  const [noteText, setNoteText] = useState("");
  const [newTag, setNewTag] = useState("");

  const notes = useNotes(activeId || undefined);
  const tags = useTags(activeId || undefined);
  const [bulkIds, setBulkIds] = useState("");
  const [bulkStage, setBulkStage] = useState<string>("applied");

  function groupByStage() {
    const groups: Record<string, any[]> = {};
    for (const a of apps) {
      const s = (a.cv_status || "applied").toLowerCase();
      groups[s] = groups[s] || [];
      groups[s].push(a);
    }
    return groups;
  }

  async function onDropStage(e: React.DragEvent<HTMLDivElement>, stage: string) {
    const id = Number(e.dataTransfer.getData("text/plain"));
    if (!id) return;
    await fetch(`/api/admin/applications/stage`, { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify({ id, stage }) });
    mutate(`/api/admin/applications?page=1&pageSize=200`);
  }

  async function scheduleInterview(id: number) {
    const v = prompt("Nhập thời gian phỏng vấn (ISO 8601, ví dụ: 2025-11-20T09:00:00Z)");
    if (!v) return;
    await fetch(`/api/admin/interview/${id}/schedule`, { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify({ time: v }) });
    mutate(`/api/admin/applications?page=1&pageSize=200`);
  }

  const grouped = groupByStage();

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h1 className="text-xl font-semibold">Pipeline</h1>
        <div className="flex items-center gap-2">
          <Input placeholder="IDs, ví dụ: 1,2,3" value={bulkIds} onChange={(e)=>setBulkIds(e.target.value)} className="w-56" />
          <Select value={bulkStage} onValueChange={setBulkStage}>
            <SelectTrigger className="w-40"><SelectValue placeholder="Stage" /></SelectTrigger>
            <SelectContent>
              {STAGES.map(s => (<SelectItem key={s.key} value={s.key}>{s.label}</SelectItem>))}
            </SelectContent>
          </Select>
          <Button onClick={async ()=> {
            const ids = bulkIds.split(',').map(s=>Number(s.trim())).filter(Boolean);
            if(!ids.length) return;
            await fetch('/api/admin/applications/stage', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ id: ids[0], stage: bulkStage }) });
            // For more than one id, call backend bulk endpoint
            if(ids.length>1){ await fetch('/api/admin/applications/stage', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ id: ids[1], stage: bulkStage }) }).catch(()=>{}); }
            // Also call bulk endpoint to ensure server-side update
            await fetch('/api/admin/applications/bulk-stage', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ ids, stage: bulkStage }) }).catch(()=>{});
            mutate(`/api/admin/applications?page=1&pageSize=200`);
          }}>Apply</Button>
        </div>
        <Button asChild variant="outline"><a href="/api/admin/applications/export" target="_blank" rel="noreferrer">Export CSV</a></Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {STAGES.map((col) => (
          <div key={col.key} className="bg-muted/30 rounded-lg p-2 min-h-[60vh]"
            onDragOver={(e)=>e.preventDefault()}
            onDrop={(e)=>onDropStage(e, col.key)}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium">{col.label}</div>
              <Badge variant="secondary">{(grouped[col.key] || []).length}</Badge>
            </div>
            <div className="space-y-2">
              {(grouped[col.key] || []).map((a) => (
                <Card key={a.id}
                  draggable
                  onDragStart={(e)=> e.dataTransfer.setData("text/plain", String(a.id))}
                  className="p-3 cursor-grab active:cursor-grabbing"
                >
                  <div className="text-sm font-medium truncate">{a.fullName}</div>
                  <div className="text-xs text-muted-foreground truncate">{a.email}</div>
                  <div className="flex items-center justify-between mt-2">
                    <StageBadge s={a.cv_status} />
                    <div className="flex gap-2">
                      <Button size="xs" variant="outline" onClick={()=> setActiveId(a.id)}>Notes/Tags</Button>
                      <Button size="xs" onClick={()=> scheduleInterview(a.id)}>Schedule</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!activeId} onOpenChange={(v)=> !v && setActiveId(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Notes & Tags for #{activeId}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <div className="text-sm font-medium mb-2">Tags</div>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.items.map((t: any) => (
                  <span key={t.id} className="inline-flex items-center gap-1 bg-muted rounded px-2 py-1 text-xs">
                    {t.name}
                    <button className="text-muted-foreground hover:text-foreground" onClick={()=> tags.remove(t.name)}>×</button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <Input placeholder="Add tag" value={newTag} onChange={(e)=>setNewTag(e.target.value)} />
                <Button onClick={async ()=> { if(newTag.trim()){ await tags.add(newTag.trim()); setNewTag(""); } }}>Add</Button>
              </div>
            </div>

            <div>
              <div className="text-sm font-medium mb-2">Notes</div>
              <div className="space-y-2 max-h-56 overflow-auto">
                {notes.items.map((n: any) => (
                  <div key={n.id} className="border rounded p-2 text-sm">
                    <div className="text-xs text-muted-foreground mb-1">{n.created_at}</div>
                    {n.note}
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-2">
                <Textarea placeholder="Write a note" value={noteText} onChange={(e)=>setNoteText(e.target.value)} />
                <Button onClick={async ()=> { if(noteText.trim() && activeId){ await notes.add(noteText.trim()); setNoteText(""); } }}>Save</Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
