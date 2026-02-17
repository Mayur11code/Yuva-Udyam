'use client'

import React, { useEffect, useState } from 'react';
import { scoutCourses } from '@/src/app/actions/courses/ScoutCourses';
import { CourseCard } from '@/src/components/dashboard/courses/CourseCard';
import { Sparkles, BrainCircuit, ExternalLink, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function CoursesPage() {
  const [data, setData] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(true);

  useEffect(() => {
    async function init() {
      const res = await scoutCourses("user_2026_forge");
      setData(res);
      setIsSearching(false);
    }
    init();
  }, []);

  if (isSearching) return (
    <div className="h-screen bg-[#0B0E14] flex flex-col items-center justify-center gap-4 text-slate-500">
      <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
      <p className="font-mono text-xs uppercase tracking-[0.2em] animate-pulse">AI is scouting learning paths...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0B0E14] px-6 py-8 space-y-10">

      {/* AI ANALYSIS SUMMARY */}
      <section className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-5 group-hover:opacity-10 transition duration-700"></div>

        <Card className="relative bg-[#151921] border-slate-800 px-8 py-6 rounded-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">

            {/* Icon */}
            <div className="w-14 h-14 bg-blue-600/10 rounded-xl flex items-center justify-center border border-blue-500/20 shrink-0">
              <BrainCircuit className="w-6 h-6 text-blue-500" />
            </div>

            {/* Text */}
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-2 text-blue-400 font-semibold text-[11px] uppercase tracking-widest">
                <Sparkles className="w-3 h-3" /> Forge Intelligence
              </div>

              <h1 className="text-2xl font-bold text-white">
                Academy Readiness Report
              </h1>

              <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
                {data.analysis}
              </p>
            </div>

            {/* Score */}
            <div className="text-left md:text-right mt-4 md:mt-0">
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                Match Score
              </p>
              <h4 className="text-3xl font-bold text-blue-500">
                {data.isPersonalized ? "94%" : "BASE"}
              </h4>
            </div>
          </div>
        </Card>
      </section>

      {/* COURSE LIST */}
      <div className="space-y-5">

        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <h2 className="text-lg font-semibold text-white">
            Recommended Modules
          </h2>

          <Badge
            variant="outline"
            className="border-slate-800 text-slate-500 font-mono text-[11px]"
          >
            {data.courses.length} FOUND
          </Badge>
        </div>

        {/* 🔥 Tighter Grid */}
        <div className="flex flex-wrap gap-4">
          {data.courses.map((course: any, i: number) => (
            <a
              href={course.url}
              target="_blank"
              rel="noopener noreferrer"
              key={i}
              className="block"
            >
              <CourseCard course={course} />
            </a>
          ))}
        </div>

      </div>
    </div>
  );
}