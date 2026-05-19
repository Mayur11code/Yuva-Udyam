'use client'

import React from 'react';
import { Video, Calendar, Clock, ExternalLink } from 'lucide-react';
import { toast } from "sonner";

export function UpcomingInterview() {
  return (
    <div className="rounded-2xl border border-white/6 bg-black/40 backdrop-blur-sm overflow-hidden">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      <div className="p-5 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-white font-semibold text-sm">Upcoming Interview</span>
          </div>
          <span className="text-[9px] font-mono text-white/15 uppercase tracking-widest">Scheduled</span>
        </div>

        {/* Interview details */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-white/25">
            <Clock className="w-3 h-3" />
            Wed, Apr 24 · 10:00 – 10:30 AM
          </div>
          <p className="text-white font-semibold text-sm leading-snug">
            Chemical Architect Interview at MHRD
          </p>
          <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/8 border border-emerald-500/15 px-2 py-0.5 rounded-full">
            <span className="w-1 h-1 rounded-full bg-emerald-400" />
            Confirmed
          </span>
        </div>

        {/* Google Meet block */}
        <div className="rounded-xl border border-white/6 bg-white/2 p-4 space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/15 flex items-center justify-center shrink-0">
              <Video className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <p className="text-white text-xs font-semibold leading-none">Google Meet</p>
              <p className="text-white/25 text-[10px] font-mono mt-0.5">Video interview enabled</p>
            </div>
          </div>
          <button
            onClick={() => toast.success("Redirecting to Google Meet...")}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs tracking-wide transition-all active:scale-95"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Join Meeting
          </button>
        </div>
      </div>
    </div>
  );
}
