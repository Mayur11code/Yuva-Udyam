'use client'

import React from 'react';
import { Clock, CheckCircle2, AlertCircle, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const SAMPLE_APPS = [
  { id: "app_1", status: "In Progress", job: { role: "Data Analyst (IT Division)", organization: "NIC" }, interview: { score: 78 } },
  { id: "app_2", status: "Selected", job: { role: "Junior Research Fellow", organization: "ISRO" }, interview: { score: 91 } },
  { id: "app_3", status: "In Progress", job: { role: "Assistant Engineer", organization: "PWD Maharashtra" }, interview: null },
  { id: "app_4", status: "Withdrawn", job: { role: "Pharmacist Grade A", organization: "AIIMS Delhi" }, interview: null },
];

const statusConfig: Record<string, { icon: React.ElementType; color: string; bg: string; border: string }> = {
  Selected:    { icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/8",  border: "border-emerald-500/15" },
  "In Progress": { icon: Clock,       color: "text-cyan-400",    bg: "bg-cyan-500/8",     border: "border-cyan-500/15" },
  Withdrawn:   { icon: AlertCircle,  color: "text-rose-400",    bg: "bg-rose-500/8",     border: "border-rose-500/15" },
};

export function ActiveApplications({ userId }: { userId: string }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-white font-bold text-lg">My Applications</h2>
        <span className="text-[10px] font-mono text-white/20 bg-white/4 border border-white/6 px-2.5 py-1 rounded-full">
          {SAMPLE_APPS.length} tracked
        </span>
      </div>

      <div className="space-y-2">
        {SAMPLE_APPS.map((app) => {
          const cfg = statusConfig[app.status] ?? statusConfig["In Progress"];
          const Icon = cfg.icon;
          return (
            <div
              key={app.id}
              className="flex items-center gap-4 p-4 rounded-xl border border-white/6 bg-black/30 hover:bg-white/2 hover:border-white/10 transition-all group cursor-pointer backdrop-blur-sm"
            >
              {/* Status icon */}
              <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border", cfg.bg, cfg.border)}>
                <Icon className={cn("w-4 h-4", cfg.color)} />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm truncate group-hover:text-cyan-400 transition-colors">
                  {app.job.role}
                </p>
                <p className="text-white/30 text-xs font-mono mt-0.5">{app.job.organization}</p>
              </div>

              {/* Score */}
              {app.interview && (
                <div className="text-right hidden sm:block shrink-0">
                  <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest">AI Score</p>
                  <p className={cn("text-sm font-black font-mono", app.interview.score >= 80 ? "text-emerald-400" : "text-yellow-400")}>
                    {app.interview.score}%
                  </p>
                </div>
              )}

              {/* Status badge */}
              <span className={cn("text-[10px] font-mono px-2.5 py-1 rounded-full border shrink-0", cfg.color, cfg.bg, cfg.border)}>
                {app.status}
              </span>

              <ChevronRight className="w-3.5 h-3.5 text-white/15 group-hover:text-white/40 transition-colors shrink-0" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
