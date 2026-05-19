'use client'

import React, { useState } from 'react';
import { FileUp, Star, CheckCircle2, AlertCircle, Loader2, RefreshCcw } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from "sonner";
import { analyzeResume } from '@/src/app/actions/ResumeScore'; // ADJUST PATH IF NEEDED
import { uploadAndStoreResume } from '@/src/app/actions/jobs/Analyse';

export function ResumeScorer() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [data, setData] = useState<any>(null);

 // Inside src/components/dashboard/ResumeScorer.tsx
const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  setIsAnalyzing(true);
  const toastId = toast.loading("Syncing resume to Forge profile...");

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = async () => {
    const base64 = reader.result?.toString().split(',')[1];
    
    if (base64) {
      // Use the new action to store in DB
      const result = await uploadAndStoreResume("user_2026_forge", base64);
      
      if (result.success) {
        // Now that it's saved, you can also get the score
        const analysis = await analyzeResume(base64);
        setData(analysis);
        toast.success("Resume saved & analyzed!", { id: toastId });
      } else {
        toast.error("Database sync failed.", { id: toastId });
      }
    }
    setIsAnalyzing(false);
  };
};

  return (
    <Card className="bg-black/40 border-white/6 shadow-xl overflow-hidden backdrop-blur-sm">
      <CardContent className="p-6 space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-white font-semibold text-sm">Resume Score</span>
        </div>

        {!data ? (
          <div>
            <input type="file" id="resume-upload" className="hidden" accept=".pdf" onChange={handleFileChange} />
            <label htmlFor="resume-upload" className="block cursor-pointer">
              <div className="p-5 border border-dashed border-white/8 rounded-xl text-center space-y-2 group hover:border-cyan-500/30 transition-colors">
                {isAnalyzing
                  ? <Loader2 className="w-6 h-6 text-cyan-400 animate-spin mx-auto" />
                  : <FileUp className="w-6 h-6 text-white/15 mx-auto group-hover:text-cyan-400 transition-colors" />}
                <p className="text-[10px] font-mono text-white/20">
                  {isAnalyzing ? "Analysing resume..." : "Upload Resume (PDF)"}
                </p>
              </div>
            </label>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in zoom-in-95 duration-500">
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-mono text-white/25 uppercase tracking-widest">Match Score</span>
              <span className="text-2xl font-black text-white">{data.score}%</span>
            </div>
            <Progress value={data.score} className="h-1.5 bg-white/5" />

            <div className="rounded-lg border border-white/6 bg-white/2 p-3">
              <p className="text-emerald-400 text-[10px] font-mono mb-2 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Strengths
              </p>
              <ul className="text-[10px] text-white/30 space-y-1 font-mono">
                {data.strengths.map((s: string, i: number) => <li key={i}>— {s}</li>)}
              </ul>
            </div>

            <Button
              variant="ghost"
              onClick={() => setData(null)}
              className="w-full text-[10px] text-white/20 h-8 gap-2 hover:text-white/50 hover:bg-white/4"
            >
              <RefreshCcw className="w-3 h-3" /> Re-scan
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}