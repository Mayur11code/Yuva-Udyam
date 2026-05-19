'use client'

import React from 'react';
import Link from 'next/link';
import { UserDetails } from '../../../components/dashboard/UserDetails';
import { StatsCards } from '../../../components/dashboard/StatsCards';
import { JobFeed } from '../../../components/dashboard/JobFeed';
import { ActiveApplications } from '../../../components/dashboard/UserDashBoard/ActiveApplications';
import { UpcomingInterview } from '../../../components/dashboard/UpcomingInterview';
import { ResumeScorer } from '../../../components/dashboard/ResumeScorer';
import { SyncButton } from '@/src/components/dashboard/SyncButton';
import { BrainCircuit, Trophy, Target, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

const MOCK_USER = { id: "user_2026_forge", name: "Raj Singh" };

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-black text-white font-sans">
      {/* Dot grid */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{ backgroundImage: 'radial-gradient(circle, #1a1a1a 1px, transparent 1px)', backgroundSize: '28px 28px' }}
      />

      {/* Sidebar */}
      <aside className="relative z-10 w-16 shrink-0 flex flex-col items-center py-6 border-r border-white/5 bg-black/80 backdrop-blur-md sticky top-0 h-screen">
        <Link href="/" className="font-serif font-black text-xl text-cyan-400 italic leading-none hover:opacity-75 transition-opacity">
          Y
        </Link>
        <div className="mt-auto">
          <button className="w-10 h-10 rounded-xl flex items-center justify-center text-white/20 hover:text-rose-400 hover:bg-rose-500/10 transition-all" title="Log out">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="relative z-10 flex-1 overflow-y-auto">
        <div className="max-w-[1300px] mx-auto px-8 py-10 grid grid-cols-12 gap-6">

          {/* Left column (9 cols) */}
          <div className="col-span-12 lg:col-span-9 space-y-8">

            {/* Page header */}
            <div>
              <p className="text-cyan-400 font-mono text-xs uppercase tracking-[0.2em] mb-2">+ Student Dashboard</p>
              <h1 className="font-serif text-4xl font-black text-white tracking-tight">
                Welcome back, <span className="text-cyan-400 italic">{MOCK_USER.name.split(' ')[0]}</span>
              </h1>
              <p className="text-white/30 text-sm font-mono mt-1">Your career intelligence hub — all in one place.</p>
            </div>

            {/* User identity strip */}
            <UserDetails name={MOCK_USER.name} id={MOCK_USER.id} />

            {/* Stats */}
            <StatsCards />

            {/* Active Applications */}
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <ActiveApplications userId={MOCK_USER.id} />
            </section>

            {/* National Job Feed */}
            <section className="space-y-5 animate-in fade-in slide-in-from-bottom-6 duration-1000">
              <div className="flex items-center justify-between border-b border-white/6 pb-4">
                <div className="flex items-center gap-2.5">
                  <Target className="w-4 h-4 text-cyan-400" />
                  <h2 className="text-white font-bold text-lg">National Job Feed</h2>
                </div>
                <div className="flex items-center gap-4">
                  <SyncButton />
                  <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
                    Real-time sync
                  </span>
                </div>
              </div>
              <JobFeed />
            </section>
          </div>

          {/* Right column (3 cols) */}
          <div className="col-span-12 lg:col-span-3 space-y-5">

            {/* Upcoming Interview */}
            <UpcomingInterview />

            {/* Resume Scorer */}
            <ResumeScorer />

            {/* AI Performance card */}
            <div className="relative rounded-2xl border border-white/6 overflow-hidden bg-black/60 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
              <div className="relative z-10 p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-sm font-bold text-white">Performance Insights</h3>
                </div>
                <p className="text-[11px] text-white/35 leading-relaxed font-mono">
                  Average AI interview score: <span className="text-white font-bold">78%</span>.
                  You are in the <span className="text-emerald-400 font-bold">top 15%</span> of candidates
                  for technical roles this week.
                </p>
                <div className="w-full h-1 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
                </div>
                <div className="absolute top-4 right-4 opacity-5">
                  <BrainCircuit className="w-16 h-16" />
                </div>
              </div>
            </div>

            {/* System status */}
            <div className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl border border-white/5 bg-white/2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
              <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.15em]">
                Gemini 1.5 Flash · Online
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
