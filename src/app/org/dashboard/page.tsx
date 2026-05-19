'use client'

import React, { useState } from 'react';
import { publishJob } from '../../actions/jobs/Publish';
import {
  Users, Activity, Plus, MoreVertical, FileText,
  ArrowUpRight, BarChart3, Settings, LogOut, Loader2,
  Sparkles, MapPin, Database, X, Zap, BriefcaseIcon,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from "sonner";
import { parseJobPDF } from '../../actions/pdfparsing';
import { cn } from '@/lib/utils';

type JobForm = {
  job_role: string; organization: string; salary: string;
  deadline: string; skills_required: string[]; location: string;
};

const initialForm: JobForm = {
  job_role: "", organization: "", salary: "",
  deadline: "", skills_required: [], location: ""
};

const navItems = [
  { icon: <BarChart3 className="w-5 h-5" />, active: true },
  { icon: <BriefcaseIcon className="w-5 h-5" />, active: false },
  { icon: <Users className="w-5 h-5" />, active: false },
  { icon: <Settings className="w-5 h-5" />, active: false },
];

export default function OrgDashboard() {
  const [isParsing, setIsParsing] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [formData, setFormData] = useState<JobForm>(initialForm);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPdfPreviewUrl(URL.createObjectURL(file));
    try {
      setIsParsing(true);
      const toastId = toast.loading("AI is parsing the PDF...");
      const base64 = await fileToBase64(file);
      const result = await parseJobPDF(base64);
      setFormData({
        job_role: result?.data?.job_role ?? "",
        organization: result?.data?.organization ?? "",
        salary: result?.data?.salary ?? "",
        deadline: result?.data?.deadline ?? "",
        skills_required: result?.data?.skills_required ?? [],
        location: result?.data?.location ?? ""
      });
      setShowReview(true);
      toast.success("Extracted successfully!", { id: toastId });
    } catch {
      toast.error("Failed to parse document.");
    } finally {
      setIsParsing(false);
      e.target.value = "";
    }
  };

  const handlePublish = async () => {
    try {
      setIsPublishing(true);
      const toastId = toast.loading("Publishing job...");
      const result = await publishJob(formData);
      if (result?.success) {
        toast.success("Job is now live!", { id: toastId });
        setShowReview(false);
        setFormData(initialForm);
      }
    } catch {
      toast.error("Publishing failed.");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-white font-sans">
      {/* Dot grid background */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{ backgroundImage: 'radial-gradient(circle, #1a1a1a 1px, transparent 1px)', backgroundSize: '28px 28px' }}
      />

      {/* Sidebar */}
      <aside className="relative z-10 w-16 shrink-0 flex flex-col items-center py-6 gap-8 border-r border-white/5 bg-black/80 backdrop-blur-md">
        {/* Logo */}
        <span className="font-serif font-black text-xl text-cyan-400 italic leading-none">Y</span>

        <div className="flex flex-col gap-2 flex-1">
          {navItems.map((item, i) => (
            <button
              key={i}
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                item.active
                  ? "bg-cyan-500/10 text-cyan-400 shadow-[inset_0_0_0_1px_rgba(34,211,238,0.2)]"
                  : "text-white/20 hover:text-white/50 hover:bg-white/5"
              )}
            >
              {item.icon}
            </button>
          ))}
        </div>

        <button className="w-10 h-10 rounded-xl flex items-center justify-center text-white/20 hover:text-rose-400 hover:bg-rose-500/10 transition-all">
          <LogOut className="w-4 h-4" />
        </button>
      </aside>

      {/* Main */}
      <main className="relative z-10 flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-8 py-10 space-y-10">

          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <p className="text-cyan-400 font-mono text-xs uppercase tracking-[0.2em] mb-2">+ Organisation Portal</p>
              <h1 className="font-serif text-4xl font-black text-white tracking-tight">
                Job <span className="text-cyan-400 italic">Management</span>
              </h1>
              <p className="text-white/30 text-sm font-mono mt-2">Digitize, review, and publish national job openings.</p>
            </div>

            <label htmlFor="pdf-upload" className="cursor-pointer">
              <div className={cn(
                "flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-sm px-5 py-2.5 rounded-full transition-all",
                isParsing && "opacity-60 pointer-events-none"
              )}>
                {isParsing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                Upload PDF
              </div>
              <input type="file" id="pdf-upload" className="hidden" onChange={handleUpload} disabled={isParsing} accept="application/pdf" />
            </label>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricCard
              label="Active Postings"
              value="12"
              trend="+2 this month"
              icon={<Activity className="w-5 h-5 text-cyan-400" />}
              glow="cyan"
            />
            <MetricCard
              label="Total Applicants"
              value="1.2k"
              trend="+14% growth"
              icon={<Users className="w-5 h-5 text-emerald-400" />}
              glow="emerald"
            />
            {/* AI Card */}
            <div className="relative rounded-2xl overflow-hidden border border-cyan-500/20 p-6 bg-black group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span className="text-white font-bold text-sm">AI-Driven Ingestion</span>
                </div>
                <p className="text-white/40 text-xs font-mono leading-relaxed mb-4">
                  Digitize scanned PDF notifications into structured listings instantly.
                </p>
                <div className="w-full h-1 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.6)]" />
                </div>
                <p className="text-cyan-400/50 text-[10px] font-mono mt-2">75% accuracy boost</p>
              </div>
            </div>
          </div>

          {/* Dynamic area */}
          {showReview ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="rounded-2xl border border-white/8 bg-black/60 overflow-hidden backdrop-blur-sm">
                <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent" />
                <div className="p-8 flex flex-col md:flex-row gap-10">
                  {/* PDF Preview */}
                  <div className="w-full md:w-1/3 space-y-4">
                    <div className="aspect-[3/4] bg-white/3 rounded-xl border border-white/8 overflow-hidden">
                      {pdfPreviewUrl ? (
                        <iframe src={`${pdfPreviewUrl}#toolbar=0&navpanes=0&scrollbar=0`} className="w-full h-full pointer-events-none" title="PDF Preview" />
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full gap-2">
                          <FileText className="w-10 h-10 text-white/10" />
                          <span className="text-[10px] font-mono text-white/20">Loading...</span>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => { setShowReview(false); setPdfPreviewUrl(null); }}
                      className="w-full py-2.5 rounded-xl border border-white/8 text-white/30 hover:border-rose-500/30 hover:text-rose-400 text-sm font-mono transition-all flex items-center justify-center gap-2"
                    >
                      <X className="w-3.5 h-3.5" /> Discard
                    </button>
                  </div>

                  {/* Form */}
                  <div className="flex-1 space-y-8">
                    <div>
                      <p className="text-cyan-400 font-mono text-[10px] uppercase tracking-[0.2em] mb-2">Extracted Job Role</p>
                      <input
                        value={formData.job_role}
                        onChange={(e) => setFormData({ ...formData, job_role: e.target.value })}
                        className="bg-transparent font-serif text-3xl font-black text-white border-b border-white/10 focus:border-cyan-500/50 outline-none w-full pb-2 transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <ReviewField label="Organisation" value={formData.organization} onChange={(v) => setFormData({ ...formData, organization: v })} />
                      <ReviewField label="Location" icon={<MapPin className="w-3 h-3" />} value={formData.location} onChange={(v) => setFormData({ ...formData, location: v })} />
                      <ReviewField label="Pay Scale" value={formData.salary} onChange={(v) => setFormData({ ...formData, salary: v })} />
                      <ReviewField label="Deadline" value={formData.deadline} onChange={(v) => setFormData({ ...formData, deadline: v })} />
                    </div>

                    <div>
                      <p className="text-white/30 font-mono text-[10px] uppercase tracking-[0.2em] mb-3">Skill Matrix</p>
                      <div className="flex flex-wrap gap-2">
                        {formData.skills_required.map((skill, i) => (
                          <span key={i} className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={handlePublish}
                      disabled={isPublishing}
                      className="w-full py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                    >
                      {isPublishing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Database className="w-4 h-4" />}
                      Publish to National Database
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-5 animate-in fade-in duration-500">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                <h2 className="text-white font-bold text-lg">Recent Postings</h2>
              </div>

              <div className="rounded-2xl border border-white/6 overflow-hidden bg-black/40 backdrop-blur-sm">
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/6">
                      <th className="px-6 py-4 text-[10px] font-mono text-white/25 uppercase tracking-[0.18em]">Position</th>
                      <th className="px-6 py-4 text-[10px] font-mono text-white/25 uppercase tracking-[0.18em]">Applicants</th>
                      <th className="px-6 py-4 text-[10px] font-mono text-white/25 uppercase tracking-[0.18em]">Status</th>
                      <th className="px-6 py-4 text-[10px] font-mono text-white/25 uppercase tracking-[0.18em]">Date Posted</th>
                      <th className="px-6 py-4 text-[10px] font-mono text-white/25 uppercase tracking-[0.18em] text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { title: "Scientist 'B' (Electronics)", applicants: 42, date: "Feb 17, 2026" },
                      { title: "Junior Engineer (Civil)", applicants: 28, date: "Feb 14, 2026" },
                      { title: "Data Analyst (IT)", applicants: 67, date: "Feb 10, 2026" },
                    ].map((job, i) => (
                      <tr key={i} className="border-b border-white/4 hover:bg-white/3 transition-colors group">
                        <td className="px-6 py-4 font-semibold text-white">{job.title}</td>
                        <td className="px-6 py-4">
                          <span className="font-mono text-cyan-400 text-sm">{job.applicants}</span>
                          <span className="text-white/20 text-xs font-mono ml-1">applicants</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                            Active
                          </span>
                        </td>
                        <td className="px-6 py-4 text-white/30 font-mono text-xs">{job.date}</td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-white/15 hover:text-white/60 transition-colors opacity-0 group-hover:opacity-100">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Empty state hint */}
              <p className="text-white/15 text-xs font-mono text-center py-2">
                Upload a PDF notification above to add more postings →
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function MetricCard({ label, value, trend, icon, glow }: {
  label: string; value: string; trend: string; icon: React.ReactNode; glow: "cyan" | "emerald";
}) {
  const glowColor = glow === "cyan" ? "rgba(34,211,238,0.08)" : "rgba(52,211,153,0.08)";
  const borderColor = glow === "cyan" ? "rgba(34,211,238,0.12)" : "rgba(52,211,153,0.12)";
  const trendColor = glow === "cyan" ? "text-cyan-400" : "text-emerald-400";

  return (
    <div
      className="relative rounded-2xl p-6 overflow-hidden group cursor-default border"
      style={{ background: glowColor, borderColor }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${glow === "cyan" ? "#22d3ee" : "#34d399"}40, transparent)` }} />
      <div className="flex items-start justify-between">
        <div>
          <p className="text-white/30 font-mono text-[10px] uppercase tracking-[0.18em]">{label}</p>
          <h3 className="font-serif text-4xl font-black text-white mt-2 tracking-tight">{value}</h3>
          <p className={cn("text-[10px] font-mono mt-2 flex items-center gap-1", trendColor)}>
            <ArrowUpRight className="w-3 h-3" />{trend}
          </p>
        </div>
        <div className="opacity-40 group-hover:opacity-100 transition-opacity mt-1">{icon}</div>
      </div>
    </div>
  );
}

function ReviewField({ label, value, onChange, icon }: {
  label: string; value: string; onChange: (v: string) => void; icon?: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <p className="text-white/25 font-mono text-[10px] uppercase tracking-[0.18em] flex items-center gap-1">{icon}{label}</p>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent border-b border-white/8 focus:border-cyan-500/40 outline-none text-white w-full pb-1.5 text-sm transition-colors"
      />
    </div>
  );
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result?.toString().split(',')[1] || "");
    reader.onerror = reject;
  });
}
