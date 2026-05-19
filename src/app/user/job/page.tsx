'use client'

import React, { useState } from 'react';
import { JobFeed } from '@/src/components/dashboard/JobFeed';
import { Search, SlidersHorizontal, Building2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const categories = ["All Jobs", "Technical", "Administrative", "Research", "Defence"];
const orgs = [
  { name: "DRDO", jobs: 8 },
  { name: "ISRO", jobs: 5 },
  { name: "NIC", jobs: 12 },
  { name: "AIIMS", jobs: 7 },
];

export default function JobsDiscoveryPage() {
  const [activeCategory, setActiveCategory] = useState("All Jobs");

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <div className="pointer-events-none fixed inset-0 z-0" style={{ backgroundImage: 'radial-gradient(circle, #1a1a1a 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

      <div className="relative z-10">
        <div className="max-w-[1300px] mx-auto px-8 py-10 space-y-8">
          {/* Page header */}
          <div>
            <p className="text-cyan-400 font-mono text-xs uppercase tracking-[0.2em] mb-2">+ National Job Feed</p>
            <h1 className="font-serif text-4xl font-black text-white tracking-tight">
              Browse <span className="text-cyan-400 italic">Openings</span>
            </h1>
          </div>

          {/* Search bar */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input
                placeholder="Search by role, organisation, or keyword..."
                className="w-full bg-white/3 border border-white/6 rounded-xl pl-11 pr-4 h-11 text-sm text-white placeholder:text-white/20 outline-none focus:border-cyan-500/30 transition-colors"
              />
            </div>
            <button className="flex items-center gap-2 px-5 h-11 rounded-xl border border-white/6 bg-white/3 text-white/35 text-sm font-mono hover:border-white/12 hover:text-white/60 transition-all">
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
            <button className="px-6 h-11 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-sm transition-all">
              Search
            </button>
          </div>

          {/* Category chips */}
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-mono border transition-all",
                  activeCategory === cat
                    ? "bg-cyan-500/15 text-cyan-400 border-cyan-500/30"
                    : "bg-white/3 text-white/25 border-white/6 hover:text-white/50 hover:border-white/12"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Main grid */}
          <div className="grid grid-cols-12 gap-6">
            {/* Job list */}
            <div className="col-span-12 lg:col-span-9 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-white font-semibold text-base">Active Notifications</h2>
                <span className="text-[10px] font-mono text-white/20">Showing {6} results</span>
              </div>
              <JobFeed />
            </div>

            {/* Sidebar */}
            <div className="col-span-12 lg:col-span-3 space-y-4">
              {/* AI match card */}
              <div className="relative rounded-2xl border border-white/6 bg-black/40 backdrop-blur-sm p-5 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent pointer-events-none" />
                <div className="relative z-10 space-y-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-xs font-semibold text-white">AI Career Match</span>
                  </div>
                  <p className="text-white/30 text-xs font-mono leading-relaxed">
                    Upload your resume to get a match score against every active posting.
                  </p>
                  <button className="w-full py-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono hover:bg-cyan-500/15 transition-colors">
                    Smart Match →
                  </button>
                </div>
              </div>

              {/* Top orgs */}
              <div className="rounded-2xl border border-white/6 bg-black/40 backdrop-blur-sm p-5 space-y-4">
                <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.18em]">Top Organisations</p>
                <div className="space-y-3">
                  {orgs.map(org => (
                    <div key={org.name} className="flex items-center justify-between group cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-white/4 border border-white/6 flex items-center justify-center group-hover:border-cyan-500/20 transition-all">
                          <Building2 className="w-3.5 h-3.5 text-white/25 group-hover:text-cyan-400 transition-colors" />
                        </div>
                        <span className="text-sm text-white/60 group-hover:text-white transition-colors font-mono">{org.name}</span>
                      </div>
                      <span className="text-[10px] font-mono text-white/20">{org.jobs} open</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

