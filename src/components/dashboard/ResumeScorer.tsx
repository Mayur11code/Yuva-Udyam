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
    <Card className="bg-[#151921] border-slate-800 shadow-xl overflow-hidden">
      <CardContent className="p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            Resume Score
          </div>
        </div>

        {!data ? (
          <div className="space-y-4">
            <input type="file" id="resume-upload" className="hidden" accept=".pdf" onChange={handleFileChange} />
            <label htmlFor="resume-upload" className="block cursor-pointer">
              <div className="p-4 border border-dashed border-slate-700 rounded-xl bg-slate-950/50 text-center space-y-3 group hover:border-blue-500/50 transition-colors">
                {isAnalyzing ? <Loader2 className="w-8 h-8 text-blue-500 animate-spin mx-auto" /> : <FileUp className="w-8 h-8 text-slate-600 mx-auto group-hover:text-blue-500" />}
                <p className="text-[10px] text-slate-500 leading-relaxed">
                  {isAnalyzing ? "Gemini is thinking..." : "Click to upload Resume (PDF)"}
                </p>
              </div>
            </label>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in zoom-in-95 duration-500">
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Match Score</span>
              <span className="text-2xl font-black text-white">{data.score}%</span>
            </div>
            <Progress value={data.score} className="h-2 bg-slate-800 shadow-[0_0_10px_rgba(59,130,246,0.3)]" />
            
            <div className="space-y-3 pt-2">
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <p className="text-emerald-400 text-[9px] font-bold mb-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> STRENGTHS
                </p>
                <ul className="text-[9px] text-slate-400 list-disc pl-3">
                  {data.strengths.map((s: string, i: number) => <li key={i}>{s}</li>)}
                </ul>
              </div>
              
              <Button 
                variant="ghost" 
                onClick={() => setData(null)}
                className="w-full text-[10px] text-slate-500 h-8 gap-2 hover:bg-slate-800"
              >
                <RefreshCcw className="w-3 h-3" /> Re-scan Resume
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}