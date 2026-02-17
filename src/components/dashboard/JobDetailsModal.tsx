'use client'

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Building2, MapPin, Banknote, Calendar, 
  Target, Sparkles, CheckCircle, Loader2, X 
} from 'lucide-react';
import { applyToJob } from '@/src/app/actions/jobs/Apply';
import { generateCareerRoadmap } from '@/src/app/actions/jobs/GapAnalysis';
import { toast } from "sonner";

export function JobDetailsModal({ job, isOpen, onClose, userId }: any) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [roadmap, setRoadmap] = useState<any>(null);
  const [isApplying, setIsApplying] = useState(false);

  if (!isOpen || !job) return null;

  // 1. COMPATIBILITY ANALYSIS (The Roadmap Logic)
  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    const toastId = toast.loading("Analyzing compatibility with Gemini...");
    try {
      const data = await generateCareerRoadmap(userId, job.id);
      setRoadmap(data);
      toast.success("Analysis Complete!", { id: toastId });
    } catch (error) {
      toast.error("Ensure your resume is uploaded first.", { id: toastId });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // 2. THE APPLY ACTION
  const handleApply = async () => {
    setIsApplying(true);
    const toastId = toast.loading("Submitting application...");
    try {
      const res = await applyToJob(userId, job.id);
      if (res.success) {
        toast.success("Successfully Applied!", { id: toastId });
        onClose(); // Close modal on success
      }
    } catch (error) {
      toast.error("Application failed.", { id: toastId });
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <Card className="bg-[#0B0E14] border-slate-800 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative animate-in zoom-in-95 duration-300">
        
        {/* CLOSE BUTTON */}
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors">
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 md:p-12 space-y-10">
          
          {/* HEADER SECTION */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-600/10 rounded-2xl border border-blue-500/20">
                <Building2 className="w-8 h-8 text-blue-500" />
              </div>
              <div>
                <h2 className="text-3xl font-black text-white tracking-tight">{job.role}</h2>
                <p className="text-blue-400 font-bold">{job.organization}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-6 text-slate-400 text-sm border-y border-slate-800/50 py-4">
              <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {job.location}</span>
              <span className="flex items-center gap-2"><Banknote className="w-4 h-4 text-emerald-500" /> {job.salary}</span>
              <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> Deadline: {job.deadline}</span>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-10">
            
            {/* LEFT: JOB DETAILS */}
            <div className="col-span-12 lg:col-span-7 space-y-8">
              <div className="space-y-3">
                <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest">Required Skillset</h3>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill: string) => (
                    <Badge key={skill} variant="outline" className="bg-slate-900 border-slate-800 text-slate-300 px-3 py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* DYNAMIC ROADMAP INJECTION */}
              {roadmap && (
                <div className="space-y-6 p-6 bg-blue-600/5 border border-blue-500/20 rounded-2xl animate-in slide-in-from-top-4 duration-500">
                  <h3 className="text-blue-400 font-bold flex items-center gap-2">
                    <Target className="w-4 h-4" /> Skill Gap Roadmap
                  </h3>
                  <div className="space-y-4">
                    {roadmap.roadmap.map((step: any, i: number) => (
                      <div key={i} className="flex gap-4">
                        <div className="text-blue-500 font-mono text-xs pt-1">0{i+1}</div>
                        <div>
                          <p className="text-sm text-slate-200 font-bold">{step.task}</p>
                          <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-tighter">Recommended: {step.resource}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT: ACTIONS */}
            <div className="col-span-12 lg:col-span-5 space-y-4 bg-slate-950/50 p-6 rounded-2xl border border-slate-800/50 h-fit">
              <p className="text-xs text-slate-500 leading-relaxed text-center mb-4">
                Verify your compatibility before submitting to ensure the best fit for the role.
              </p>
              
              <Button 
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full h-14 bg-slate-800 hover:bg-slate-700 text-white font-bold gap-3"
              >
                {isAnalyzing ? <Loader2 className="animate-spin" /> : <Sparkles className="w-5 h-5 text-blue-400" />}
                Analyze Compatibility
              </Button>

              <Button 
                onClick={handleApply}
                disabled={isApplying}
                className="w-full h-14 bg-blue-600 hover:bg-blue-500 text-white font-black text-lg shadow-lg shadow-blue-900/40 gap-3"
              >
                {isApplying ? <Loader2 className="animate-spin" /> : <CheckCircle />}
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}