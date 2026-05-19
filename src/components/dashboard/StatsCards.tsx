'use client'

import { Briefcase, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

const stats = [
  { label: 'Total Applied', count: 24, change: '+2 this week', icon: Briefcase, accent: '#22d3ee' },
  { label: 'Selected', count: 7, change: '+1 this week', icon: CheckCircle2, accent: '#34d399' },
  { label: 'Withdrawn', count: 5, change: '-1 this week', icon: XCircle, accent: '#f87171', negative: true },
  { label: 'In Progress', count: 12, change: '+3 this week', icon: Clock, accent: '#818cf8' },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="relative rounded-xl border border-white/6 bg-black/40 backdrop-blur-sm p-4 overflow-hidden group hover:border-white/10 transition-all"
        >
          {/* Subtle top accent */}
          <div
            className="absolute top-0 left-0 right-0 h-px opacity-60"
            style={{ background: `linear-gradient(90deg, transparent, ${stat.accent}60, transparent)` }}
          />

          <div className="flex items-start justify-between mb-3">
            <p className="text-[10px] font-mono text-white/25 uppercase tracking-[0.15em] leading-tight">{stat.label}</p>
            <stat.icon
              className="w-3.5 h-3.5 shrink-0 opacity-30 group-hover:opacity-60 transition-opacity"
              style={{ color: stat.accent }}
            />
          </div>

          <p className="text-3xl font-black text-white leading-none tracking-tight">{stat.count}</p>
          <p
            className={cn("text-[10px] font-mono mt-2", stat.negative ? "text-rose-400/70" : "text-emerald-400/70")}
          >
            {stat.change}
          </p>
        </div>
      ))}
    </div>
  );
}
