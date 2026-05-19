'use client'

import React, { useState } from 'react';
import { BookOpen, ExternalLink, Clock, Star, ChevronRight, Target, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';

const SAMPLE_COURSES = [
  {
    title: "The Joy of Computing using Python",
    provider: "NPTEL",
    platform: "SWAYAM",
    duration: "12 weeks",
    level: "Beginner",
    rating: 4.8,
    enrolled: "2.3L+",
    tags: ["Python", "Programming", "Data"],
    url: "https://swayam.gov.in",
    match: 96,
  },
  {
    title: "Data Science for Engineers",
    provider: "IIT Madras",
    platform: "NPTEL",
    duration: "8 weeks",
    level: "Intermediate",
    rating: 4.6,
    enrolled: "1.1L+",
    tags: ["Machine Learning", "Statistics", "Python"],
    url: "https://nptel.ac.in",
    match: 91,
  },
  {
    title: "Cloud Computing",
    provider: "IIT Kharagpur",
    platform: "NPTEL",
    duration: "8 weeks",
    level: "Intermediate",
    rating: 4.5,
    enrolled: "87K+",
    tags: ["AWS", "Cloud", "DevOps"],
    url: "https://nptel.ac.in",
    match: 84,
  },
  {
    title: "Introduction to Machine Learning",
    provider: "IIT Bombay",
    platform: "NPTEL",
    duration: "10 weeks",
    level: "Intermediate",
    rating: 4.7,
    enrolled: "1.9L+",
    tags: ["ML", "AI", "Python"],
    url: "https://nptel.ac.in",
    match: 89,
  },
  {
    title: "Database Management System",
    provider: "IIT Madras",
    platform: "NPTEL",
    duration: "12 weeks",
    level: "Beginner",
    rating: 4.4,
    enrolled: "95K+",
    tags: ["SQL", "PostgreSQL", "Database"],
    url: "https://nptel.ac.in",
    match: 78,
  },
  {
    title: "Soft Skills",
    provider: "IIT Roorkee",
    platform: "SWAYAM",
    duration: "4 weeks",
    level: "Beginner",
    rating: 4.3,
    enrolled: "3.2L+",
    tags: ["Communication", "Leadership", "Interview"],
    url: "https://swayam.gov.in",
    match: 72,
  },
];

const levelColor: Record<string, string> = {
  Beginner: "text-emerald-400 bg-emerald-500/8 border-emerald-500/15",
  Intermediate: "text-amber-400 bg-amber-500/8 border-amber-500/15",
  Advanced: "text-rose-400 bg-rose-500/8 border-rose-500/15",
};

export default function CoursesPage() {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Python", "ML", "Cloud", "SQL", "Communication"];

  const filtered = filter === "All"
    ? SAMPLE_COURSES
    : SAMPLE_COURSES.filter(c => c.tags.some(t => t.toLowerCase().includes(filter.toLowerCase())));

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <div className="pointer-events-none fixed inset-0 z-0" style={{ backgroundImage: 'radial-gradient(circle, #1a1a1a 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-8 py-10 space-y-10">
          {/* Header */}
          <div>
            <p className="text-cyan-400 font-mono text-xs uppercase tracking-[0.2em] mb-2">+ Learning Path</p>
            <h1 className="font-serif text-4xl font-black text-white tracking-tight">
              Recommended <span className="text-cyan-400 italic">Courses</span>
            </h1>
            <p className="text-white/30 text-sm font-mono mt-2">Curated from SWAYAM & NPTEL based on your skill gaps.</p>
          </div>

          {/* Analysis strip */}
          <div className="relative rounded-2xl border border-white/6 bg-black/40 p-6 overflow-hidden backdrop-blur-sm">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/15 flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-mono text-cyan-400/60 uppercase tracking-widest mb-1">AI Readiness Analysis</p>
                <p className="text-white/60 text-sm leading-relaxed">
                  Based on your resume and target roles, we identified gaps in <span className="text-white font-medium">cloud infrastructure, ML fundamentals, and SQL</span>. These courses are ranked by relevance to your profile.
                </p>
              </div>
              <div className="shrink-0 text-center md:text-right">
                <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest">Profile Match</p>
                <p className="text-3xl font-black text-cyan-400">94%</p>
              </div>
            </div>
          </div>

          {/* Filter chips */}
          <div className="flex gap-2 flex-wrap">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-mono border transition-all",
                  filter === f
                    ? "bg-cyan-500/15 text-cyan-400 border-cyan-500/30"
                    : "bg-white/3 text-white/25 border-white/6 hover:text-white/50 hover:border-white/12"
                )}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Course grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((course, i) => (
              <a
                key={i}
                href={course.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-2xl border border-white/6 bg-black/40 backdrop-blur-sm p-5 hover:border-cyan-500/20 hover:bg-white/2 transition-all block"
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent group-hover:via-cyan-500/20 transition-all" />

                {/* Match score */}
                <div className="flex items-start justify-between mb-4">
                  <span className={cn("text-[9px] font-mono px-2 py-0.5 rounded-full border", levelColor[course.level] ?? levelColor.Beginner)}>
                    {course.level}
                  </span>
                  <span className="text-[10px] font-mono text-cyan-400/60">{course.match}% match</span>
                </div>

                <h3 className="text-white font-semibold text-sm leading-snug mb-1 group-hover:text-cyan-400 transition-colors">
                  {course.title}
                </h3>
                <p className="text-white/25 text-xs font-mono mb-4">{course.provider} · {course.platform}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {course.tags.map(t => (
                    <span key={t} className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-white/4 text-white/30 border border-white/6">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Meta */}
                <div className="flex items-center justify-between border-t border-white/6 pt-3">
                  <div className="flex items-center gap-3 text-[10px] font-mono text-white/20">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{course.duration}</span>
                    <span className="flex items-center gap-1"><Star className="w-3 h-3" />{course.rating}</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-white/15 group-hover:text-cyan-400 transition-colors" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
