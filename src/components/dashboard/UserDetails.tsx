'use client'

import { ShieldCheck, MapPin } from 'lucide-react';

export function UserDetails({ name, id }: { name: string; id: string }) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="flex items-center gap-5 p-5 rounded-2xl border border-white/6 bg-white/2 backdrop-blur-sm">
      {/* Avatar */}
      <div className="relative shrink-0">
        <div className="w-14 h-14 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.08)]">
          <span className="font-black text-lg text-cyan-400 tracking-wide">{initials}</span>
        </div>
        <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-black shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="text-white font-bold text-lg leading-none">{name}</span>
          <span className="inline-flex items-center gap-1 text-[10px] font-mono text-cyan-400 bg-cyan-500/8 border border-cyan-500/15 px-2 py-0.5 rounded-full">
            <ShieldCheck className="w-2.5 h-2.5" /> Verified
          </span>
        </div>
        <div className="flex items-center gap-4 mt-1.5">
          <span className="flex items-center gap-1 text-xs text-white/30 font-mono">
            <MapPin className="w-3 h-3" /> Uttar Pradesh, IN
          </span>
          <span className="text-[10px] font-mono text-white/15 bg-white/4 px-2 py-0.5 rounded">
            UID: {id}
          </span>
        </div>
      </div>

      {/* Status strip */}
      <div className="hidden md:flex flex-col items-end gap-1 shrink-0">
        <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.15em]">Status</span>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono text-emerald-400">Active</span>
        </div>
      </div>
    </div>
  );
}
