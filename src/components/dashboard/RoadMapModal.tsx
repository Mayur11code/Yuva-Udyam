'use client'

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, BookOpen, Target } from 'lucide-react';

export function RoadmapModal({ data, isOpen, onClose }: any) {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <Card className="bg-[#0B0E14] border-slate-800 w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-8 space-y-8">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Target className="text-blue-500" /> Career Gap Analysis
              </h2>
              <p className="text-slate-500 text-sm mt-1">Personalized roadmap based on your stored resume.</p>
            </div>
            <button onClick={onClose} className="text-slate-500 hover:text-white">✕</button>
          </div>

          <div className="space-y-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Missing Skills</p>
            <div className="flex flex-wrap gap-2">
              {data.missingSkills.map((s: string) => (
                <Badge key={s} className="bg-rose-500/10 text-rose-400 border-rose-500/20">{s}</Badge>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Preparation Steps</p>
            {data.roadmap.map((step: any, i: number) => (
              <div key={i} className="flex gap-4 group">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-xs">
                    {i + 1}
                  </div>
                  {i < data.roadmap.length - 1 && <div className="w-px h-full bg-slate-800 my-1" />}
                </div>
                <div className="pb-6">
                  <h4 className="font-bold text-slate-200 group-hover:text-blue-400 transition-colors">{step.step}</h4>
                  <p className="text-sm text-slate-400 mt-1">{step.task}</p>
                  <div className="flex items-center gap-2 mt-2 text-[10px] text-blue-500 font-bold hover:underline cursor-pointer">
                    <BookOpen className="w-3 h-3" /> {step.resource}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}