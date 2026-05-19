"use client";

import React from "react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

// Icons
const Icons = {
  org: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect x="2" y="8" width="20" height="14" rx="2"/>
    </svg>
  ),
  resume: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
  ),
  interview: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    </svg>
  ),
  skills: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
    </svg>
  ),
  whatsapp: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
};

interface CardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  className?: string;
  align?: "between" | "start";
}

function GlowCard({ icon, title, desc, className, align = "between" }: CardProps) {
  return (
    <li className={`relative ${className}`}>
      <div className="relative h-full rounded-2xl border border-white/[0.08] bg-zinc-950 p-2">
        {/* The glowing border effect */}
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.1}
          borderWidth={2}
        />
        {/* Card content */}
        <div className={`relative flex h-full flex-col ${align === "start" ? "justify-start" : "justify-between"} gap-6 overflow-hidden rounded-xl p-6`}>
          {/* Icon box */}
          <div className="w-fit rounded-lg border border-white/10 bg-zinc-900 p-2 text-cyan-400">
            {icon}
          </div>
          <div>
            <h3 className="mb-2 text-lg font-bold text-white uppercase tracking-wide">{title}</h3>
            <p className="text-sm text-zinc-400 font-mono leading-relaxed">{desc}</p>
          </div>
        </div>
      </div>
    </li>
  );
}

export function GlowSection() {
  return (
    <section className="relative z-30 bg-black py-32 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Heading */}
        <div className="mb-16">
          <p className="text-cyan-400 font-mono text-base uppercase tracking-[0.25em] mb-3">
            + Platform Features
          </p>
          <h2 className="text-white text-5xl md:text-6xl font-black tracking-tighter uppercase">
            Built for <span className="text-cyan-400">Both Sides</span>
          </h2>
        </div>

        {/* Bento Grid */}
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-12 md:grid-rows-2">

          {/* Top-left */}
          <GlowCard
            className="md:col-span-4 md:row-span-1 min-h-[200px]"
            icon={Icons.org}
            title="Organisation Portal"
            desc="Organisations upload a PDF — our AI auto-extracts job details and publishes vacancies instantly. No manual entry, ever."
          />

          {/* Center tall — spans both rows */}
          <GlowCard
            className="md:col-span-4 md:row-span-2 min-h-[420px]"
            align="start"
            icon={Icons.interview}
            title="AI Mock Interview"
            desc="Practice real interview questions tailored to your target role. Get honest AI feedback on your answers and a clear view of where to improve. Track your progress over multiple sessions and walk into every interview with confidence. From HR rounds to technical deep-dives, our AI adapts to your industry and experience level — so every session feels like the real thing."
          />

          {/* Top-right */}
          <GlowCard
            className="md:col-span-4 md:row-span-1 min-h-[200px]"
            icon={Icons.whatsapp}
            title="WhatsApp & Meet Alerts"
            desc="Never miss an opportunity. Get instant WhatsApp notifications and see upcoming Google Meet interview schedules right on your dashboard."
          />

          {/* Bottom-left */}
          <GlowCard
            className="md:col-span-4 md:row-span-1 min-h-[200px]"
            icon={Icons.resume}
            title="AI Resume Scorer"
            desc="Upload your resume and get an instant match score against any job posting. Know exactly where you stand before you apply."
          />

          {/* Bottom-right */}
          <GlowCard
            className="md:col-span-4 md:row-span-1 min-h-[200px]"
            icon={Icons.skills}
            title="Skill Gap Analysis"
            desc="Identify missing skills and get curated SWAYAM & NPTEL course recommendations to close the gap fast."
          />

        </ul>
      </div>
    </section>
  );
}
