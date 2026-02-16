'use client'

import React, { useState } from 'react';
import { 
  Upload, Database, Users, Activity, 
  Plus, MoreVertical, FileText, CheckCircle, 
  ArrowUpRight, BarChart3, Settings, LogOut
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from "sonner";
import { parseJobPDF } from '../../actions/pdfparsing';

export default function OrgDashboard() {
  const [isParsing, setIsParsing] = useState(false);
  const [parsedData, setParsedData] = useState<any>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsParsing(true);
    const toastId = toast.loading("AI is analyzing the official notification...");
    
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64 = reader.result?.toString().split(',')[1];
      const data = await parseJobPDF(base64!);
      setParsedData(data);
      setIsParsing(false);
      toast.success("Details Extracted Successfully!", { id: toastId });
    };
  };

  return (
    <div className="flex min-h-screen bg-[#080B11] text-slate-300 font-sans">
      {/* Mini Sidebar */}
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
            <p className="text-slate-500 mt-1 text-sm">Review, digitize, and publish national job openings[cite: 7, 14].</p>
          </div>
          <div className="flex gap-3">
             <Button variant="outline" className="bg-[#151921] border-slate-800 text-slate-400">View Live Portal</Button>
             <label htmlFor="pdf-upload" className="cursor-pointer">
                <div className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-lg flex items-center gap-2 transition-all">
                  <Plus className="w-4 h-4" /> New Notification
                </div>
                <input type="file" id="pdf-upload" className="hidden" onChange={handleUpload} disabled={isParsing} />
             </label>
          </div>
        </div>

        {/* Top Metrics Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-[#151921] border-slate-800 p-6 flex justify-between items-center group cursor-pointer hover:border-blue-500/50 transition-all">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Active Postings</p>
              <h3 className="text-3xl font-bold text-white mt-2">12</h3>
              <p className="text-emerald-500 text-xs mt-2 flex items-center gap-1"><ArrowUpRight className="w-3 h-3"/> +2 this month</p>
            </div>
            <Activity className="text-blue-500 w-10 h-10 opacity-20 group-hover:opacity-100 transition-opacity" />
          </Card>
          
          <Card className="bg-[#151921] border-slate-800 p-6 flex justify-between items-center group cursor-pointer hover:border-emerald-500/50 transition-all">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Applicants</p>
              <h3 className="text-3xl font-bold text-white mt-2">1.2k</h3>
              <p className="text-emerald-500 text-xs mt-2 flex items-center gap-1"><ArrowUpRight className="w-3 h-3"/> +14% growth</p>
            </div>
            <Users className="text-emerald-500 w-10 h-10 opacity-20 group-hover:opacity-100 transition-opacity" />
          </Card>

          <Card className="bg-gradient-to-br from-indigo-600 to-blue-700 border-none p-6 text-white shadow-xl shadow-blue-500/10">
            <h4 className="font-bold text-lg mb-2">Smart Extraction</h4>
            <p className="text-blue-100 text-xs leading-relaxed mb-4">Digitize scanned PDF notifications into structured national listings instantly[cite: 73, 74, 118].</p>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
               <div className="bg-white w-3/4 h-full" />
            </div>
          </Card>
        </div>

        {/* Content Area: Upload Review OR Table */}
        {parsedData ? (
          <div className="animate-in fade-in slide-in-from-bottom-5 duration-500">
            <Card className="bg-[#151921] border-slate-700 shadow-2xl overflow-hidden">
               <div className="bg-emerald-500 h-1 w-full" />
               <div className="p-8 flex gap-10">
                  <div className="w-1/3 space-y-4">
                    <div className="aspect-[3/4] bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-center text-slate-700 flex-col gap-2">
                       <FileText className="w-12 h-12" />
                       <span className="text-xs">Original Document Preview [cite: 97]</span>
                    </div>
                    <Button variant="outline" className="w-full border-slate-800 text-slate-500" onClick={() => setParsedData(null)}>Cancel</Button>
                  </div>
                  <div className="flex-1 space-y-8">
                     <div className="flex justify-between items-start">
                        <div>
                           <h2 className="text-2xl font-bold text-white">{parsedData.job_role}</h2>
                           <p className="text-slate-400">{parsedData.organization} • {parsedData.location}</p>
                        </div>
                        <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Ready to Publish</Badge>
                     </div>

                     <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-1">
                           <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Pay Scale</p>
                           <p className="text-xl font-mono text-emerald-400">{parsedData.salary}</p>
                        </div>
                        <div className="space-y-1">
                           <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Application Deadline</p>
                           <p className="text-xl font-mono text-rose-400">{parsedData.deadline}</p>
                        </div>
                     </div>

                     <div className="space-y-3">
                        <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Required Skill Matrix</p>
                        <div className="flex flex-wrap gap-2">
                          {parsedData.skills_required?.map((skill: string) => (
                            <Badge key={skill} className="bg-slate-950 text-slate-400 border-slate-800 font-normal">{skill}</Badge>
                          ))}
                        </div>
                     </div>

                     <Button onClick={() => {toast.success("Publishing to National Database...")}} className="w-full bg-emerald-600 hover:bg-emerald-500 h-14 text-lg font-bold gap-2">
                       <Database className="w-5 h-5" /> Publish to National Database
                     </Button>
                  </div>
               </div>
            </Card>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-500" /> Recent Job Management
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
                        <td className="px-6 py-4 font-bold text-white">Scientist 'B' [cite: 102]</td>
                        <td className="px-6 py-4">
                           <div className="flex items-center gap-2">
                              <span className="font-mono text-blue-400">42</span>
                              <div className="flex -space-x-2">
                                 <div className="w-5 h-5 rounded-full bg-slate-700 border border-slate-900" />
                                 <div className="w-5 h-5 rounded-full bg-slate-600 border border-slate-900" />
                              </div>
                           </div>
                        </td>
                        <td className="px-6 py-4"><Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Active</Badge></td>
                        <td className="px-6 py-4 text-slate-500 font-mono text-xs">Feb 12, 2026</td>
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