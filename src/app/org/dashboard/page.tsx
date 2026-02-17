'use client'

import React, { useState, useEffect } from 'react';
import { publishJob } from '../../actions/jobs/Publish';
import {
  Users,
  Activity,
  Plus,
  MoreVertical,
  FileText,
  ArrowUpRight,
  BarChart3,
  Settings,
  LogOut,
  Loader2,
  Sparkles,
  MapPin,
  Database,
  CheckCircle,
  X
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from "sonner";
import { parseJobPDF } from '../../actions/pdfparsing';

// Types...
type JobForm = {
  job_role: string;
  organization: string;
  salary: string;
  deadline: string;
  skills_required: string[];
  location: string;
};

const initialForm: JobForm = {
  job_role: "",
  organization: "",
  salary: "",
  deadline: "",
  skills_required: [],
  location: ""
};

export default function OrgDashboard() {
  const [isParsing, setIsParsing] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [formData, setFormData] = useState<JobForm>(initialForm);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setPdfPreviewUrl(objectUrl);

    try {
      setIsParsing(true);
      const toastId = toast.loading("AI is forges a digital version of this PDF...");
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
      toast.success("Details Extracted Successfully!", { id: toastId });
    } catch (error) {
      toast.error("Failed to parse document.");
    } finally {
      setIsParsing(false);
      e.target.value = "";
    }
  };

  const handlePublish = async () => {
    try {
      setIsPublishing(true);
      const toastId = toast.loading("Publishing to National Grid...");
      const result = await publishJob(formData);
      if (result?.success) {
        toast.success("Job Live on Portal!", { id: toastId });
        setShowReview(false);
        setFormData(initialForm);
      }
    } catch (error) {
      toast.error("Publishing failed.");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#080B11] text-slate-300 font-sans">
      {/* Sidebar */}
      <aside className="w-20 border-r border-slate-800 flex flex-col items-center py-8 gap-10 bg-[#0B0E14]">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-white text-xl">Y</div>
        <div className="flex flex-col gap-6">
          <Button variant="ghost" size="icon" className="text-blue-500 bg-blue-500/10"><BarChart3 /></Button>
          <Button variant="ghost" size="icon"><Users /></Button>
          <Button variant="ghost" size="icon"><Settings /></Button>
        </div>
        <Button variant="ghost" size="icon" className="mt-auto text-rose-500"><LogOut /></Button>
      </aside>

      <main className="flex-1 p-10 space-y-10 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Organization Portal</h1>
            <p className="text-slate-500 mt-1 text-sm">Digitize, review, and publish national job openings.</p>
          </div>
          <div className="flex gap-3">
            <label htmlFor="pdf-upload" className="cursor-pointer">
              <div className={`bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-lg flex items-center gap-2 transition-all ${isParsing ? 'opacity-50' : ''}`}>
                {isParsing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                New Notification
              </div>
              <input type="file" id="pdf-upload" className="hidden" onChange={handleUpload} disabled={isParsing} accept="application/pdf" />
            </label>
          </div>
        </div>

        {/* 1. METRICS BENTO GRID (Always Visible) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard label="Active Postings" value="12" trend="+2 this month" icon={<Activity className="text-blue-500" />} />
          <MetricCard label="Total Applicants" value="1.2k" trend="+14% growth" icon={<Users className="text-emerald-500" />} />
          <Card className="bg-gradient-to-br from-indigo-600 to-blue-700 border-none p-6 text-white shadow-xl shadow-blue-500/10">
            <h4 className="font-bold text-lg mb-1 flex items-center gap-2"><Sparkles className="w-4 h-4" /> AI-Driven Ingestion</h4>
            <p className="text-blue-100 text-[11px] leading-relaxed mb-4">Digitize scanned PDF notifications into structured listings instantly.</p>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div className="bg-white w-3/4 h-full shadow-[0_0_10px_white]" />
            </div>
          </Card>
        </div>

        {/* 2. DYNAMIC CONTENT AREA */}
        {showReview ? (
          /* REVIEW MODE: THE AI EXTRACTED FORM */
          <div className="animate-in fade-in slide-in-from-bottom-5 duration-500">
            <Card className="bg-[#151921] border-slate-700 shadow-2xl overflow-hidden">
              <div className="bg-emerald-500 h-1 w-full" />
              <div className="p-8 flex flex-col md:flex-row gap-10">
                <div className="w-full md:w-1/3 space-y-4">
                  {/* ACTUAL PDF PREVIEW */}
                  <div className="aspect-[3/4] bg-slate-950 rounded-lg border border-slate-800 overflow-hidden relative group">
                    {pdfPreviewUrl ? (
                      <iframe
                        src={`${pdfPreviewUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                        className="w-full h-full pointer-events-none"
                        title="PDF Preview"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full gap-2">
                        <FileText className="w-12 h-12 text-slate-800" />
                        <span className="text-[10px] font-mono text-slate-700">Loading Document...</span>
                      </div>
                    )}

                    {/* Overlay to maintain the "Forge" aesthetic */}
                    <div className="absolute inset-0 bg-blue-500/5 pointer-events-none border-2 border-transparent group-hover:border-blue-500/20 transition-all" />
                  </div>

                  <Button
                    variant="outline"
                    className="w-full border-slate-800 text-slate-500 hover:bg-rose-500/10 hover:text-rose-500"
                    onClick={() => {
                      setShowReview(false);
                      setPdfPreviewUrl(null); // Clean up memory
                    }}
                  >
                    <X className="w-4 h-4 mr-2" /> Discard
                  </Button>
                </div>

                <div className="flex-1 space-y-8">
                  <div className="w-full">
                    <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-1">Extracted Job Role</p>
                    <input
                      value={formData.job_role}
                      onChange={(e) => setFormData({ ...formData, job_role: e.target.value })}
                      className="bg-transparent text-3xl font-black text-white border-b border-slate-800 focus:border-blue-500 outline-none w-full pb-2"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <InputField label="Organization" value={formData.organization} onChange={(v) => setFormData({ ...formData, organization: v })} />
                    <InputField label="Location" icon={<MapPin className="w-3 h-3" />} value={formData.location} onChange={(v) => setFormData({ ...formData, location: v })} />
                    <InputField label="Pay Scale" value={formData.salary} onChange={(v) => setFormData({ ...formData, salary: v })} />
                    <InputField label="Deadline" value={formData.deadline} onChange={(v) => setFormData({ ...formData, deadline: v })} />
                  </div>

                  <div className="space-y-3">
                    <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Skill Matrix</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.skills_required.map((skill, i) => (
                        <Badge key={i} variant="secondary" className="bg-slate-800 text-slate-300 border-slate-700">{skill}</Badge>
                      ))}
                    </div>
                  </div>

                  <Button onClick={handlePublish} disabled={isPublishing} className="w-full bg-emerald-600 hover:bg-emerald-500 h-16 text-lg font-bold gap-3 shadow-lg shadow-emerald-900/20">
                    {isPublishing ? <Loader2 className="animate-spin" /> : <Database className="w-5 h-5" />}
                    Forge to National Database
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          /* DEFAULT MODE: RECENT JOB MANAGEMENT */
          <div className="space-y-4 animate-in fade-in duration-700">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-500" /> Recent Postings
            </h2>
            <Card className="bg-[#151921] border-slate-800 overflow-hidden shadow-2xl">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-950/50 text-slate-500 font-bold uppercase tracking-tighter border-b border-slate-800">
                  <tr>
                    <th className="px-6 py-4">Position</th>
                    <th className="px-6 py-4">Applicants</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Date Posted</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {[1, 2, 3].map((i) => (
                    <tr key={i} className="hover:bg-slate-800/10 transition-colors">
                      <td className="px-6 py-4 font-bold text-white">Scientist 'B' (Electronics)</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-blue-400">42</span>
                          <div className="flex -space-x-2"><div className="w-5 h-5 rounded-full bg-slate-700 border border-slate-900" /><div className="w-5 h-5 rounded-full bg-slate-600 border border-slate-900" /></div>
                        </div>
                      </td>
                      <td className="px-6 py-4"><Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Active</Badge></td>
                      <td className="px-6 py-4 text-slate-500 font-mono text-xs text-nowrap">Feb 17, 2026</td>
                      <td className="px-6 py-4 text-right"><MoreVertical className="w-4 h-4 inline cursor-pointer text-slate-600" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}

// 🔹 HELPER COMPONENTS
function MetricCard({ label, value, trend, icon }: { label: string; value: string; trend: string; icon: React.ReactNode }) {
  return (
    <Card className="bg-[#151921] border-slate-800 p-6 flex justify-between items-center group cursor-pointer hover:border-blue-500/50 transition-all">
      <div>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</p>
        <h3 className="text-3xl font-bold text-white mt-2">{value}</h3>
        <p className="text-emerald-500 text-[10px] mt-2 flex items-center gap-1"><ArrowUpRight className="w-3 h-3" /> {trend}</p>
      </div>
      <div className="w-10 h-10 opacity-20 group-hover:opacity-100 transition-opacity">{icon}</div>
    </Card>
  );
}

function InputField({ label, value, onChange, icon }: { label: string; value: string; onChange: (v: string) => void; icon?: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest flex items-center gap-1">{icon}{label}</p>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent border-b border-transparent focus:border-slate-800 outline-none text-white w-full pb-1 transition-colors"
      />
    </div>
  );
}

// 🔹 UTILITY
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result?.toString().split(',')[1] || "");
    reader.onerror = reject;
  });
}