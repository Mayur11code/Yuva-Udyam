"use client";
import { useScroll, useTransform, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) setHeight(ref.current.getBoundingClientRect().height);
  }, [ref]);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start 10%", "end 50%"] });
  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full bg-black font-sans md:px-10" ref={containerRef}>
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        <p className="text-cyan-400 font-mono text-xl uppercase tracking-[0.25em] mb-3">+ Our Journey</p>
        <h2 className="font-serif text-4xl md:text-6xl font-black tracking-tight text-white max-w-4xl">
          Building <span className="text-cyan-400 italic">Yuva Udyam</span>
        </h2>
        <p className="text-neutral-400 font-mono text-base mt-4 max-w-lg">
          From a college idea to India's career intelligence platform — here's how we got here.
        </p>
      </div>
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-10 md:pt-40 md:gap-10">
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-black flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-cyan-500/20 border border-cyan-500 p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-black text-neutral-600">{item.title}</h3>
            </div>
            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-black text-neutral-600">{item.title}</h3>
              {item.content}
            </div>
          </div>
        ))}
        <div style={{ height: height + "px" }} className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-800 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]">
          <motion.div style={{ height: heightTransform, opacity: opacityTransform }} className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-cyan-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full" />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ value, label }: { value: string; label: string }) => (
  <div className="rounded-xl bg-zinc-900 border border-neutral-800 p-5 flex flex-col gap-1">
    <p className="text-3xl font-black text-white">{value}</p>
    <p className="text-xs text-neutral-500 font-mono uppercase tracking-widest mt-1">{label}</p>
  </div>
);

const Tag = ({ text, color = "cyan" }: { text: string; color?: string }) => (
  <span className={`text-xs font-mono px-3 py-1 rounded-full border ${
    color === "cyan" ? "text-cyan-400 bg-cyan-400/10 border-cyan-400/20" :
    color === "green" ? "text-green-400 bg-green-400/10 border-green-400/20" :
    color === "purple" ? "text-purple-400 bg-purple-400/10 border-purple-400/20" :
    "text-orange-400 bg-orange-400/10 border-orange-400/20"
  }`}>{text}</span>
);

export const yuvaUdyamTimelineData: TimelineEntry[] = [
  {
    title: "2024",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-neutral-300 text-base md:text-lg font-medium leading-relaxed">
          The idea is born. A group of students frustrated with generic job portals that never told you <em>why</em> you weren't getting callbacks.
        </p>
        <p className="text-neutral-500 font-mono text-sm">
          Initial research phase: 200+ student interviews conducted across India. Problem validated: 87% of students didn't know what skills they were missing for their target jobs.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <StatCard value="200+" label="Students Interviewed" />
          <StatCard value="87%" label="Felt Skills Gap" />
        </div>
        <div className="flex flex-wrap gap-2">
          <Tag text="Problem Validated" color="green" />
          <Tag text="Research Phase" color="cyan" />
        </div>
      </div>
    ),
  },
  {
    title: "2025",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-neutral-300 text-base md:text-lg font-medium leading-relaxed">
          Core AI engine built: resume scoring, skill gap analysis, and job matching algorithms trained on thousands of Indian job postings and resumes.
        </p>
        <p className="text-neutral-500 font-mono text-sm">
          Integrated with SWAYAM & NPTEL for course recommendations. WhatsApp & Google Meet alerts built. First 100 beta users onboarded from 3 colleges.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <StatCard value="3" label="College Partners" />
          <StatCard value="100" label="Beta Users" />
        </div>
        <div className="flex flex-wrap gap-2">
          <Tag text="AI Engine Built" color="cyan" />
          <Tag text="Beta Launch" color="purple" />
          <Tag text="SWAYAM Integration" color="green" />
        </div>
      </div>
    ),
  },
  {
    title: "2026",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-neutral-300 text-base md:text-lg font-medium leading-relaxed">
          Yuva Udyam officially launches: India's first AI-powered career intelligence platform connecting students, job seekers, and organisations in one unified ecosystem.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <StatCard value="10K+" label="Students Onboarded" />
          <StatCard value="500+" label="Jobs Posted" />
          <StatCard value="200+" label="Organisations" />
        </div>
        <div className="flex flex-wrap gap-2">
          <Tag text="AI Resume Scorer" color="cyan" />
          <Tag text="Smart Job Matching" color="green" />
          <Tag text="Mock Interviews" color="purple" />
          <Tag text="Skill Roadmaps" color="orange" />
        </div>
      </div>
    ),
  },
  {
    title: "Vision",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-neutral-300 text-base md:text-lg font-medium leading-relaxed">
          Our goal: make every young Indian job seeker unstoppable. Not just a job portal, but a lifelong career co-pilot powered by AI.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl bg-zinc-900 border border-cyan-500/20 p-5">
            <p className="text-cyan-400 font-black text-2xl">1M+</p>
            <p className="text-xs text-neutral-500 font-mono uppercase tracking-widest mt-1">Students by 2027</p>
          </div>
          <div className="rounded-xl bg-zinc-900 border border-cyan-500/20 p-5">
            <p className="text-cyan-400 font-black text-2xl">Pan India</p>
            <p className="text-xs text-neutral-500 font-mono uppercase tracking-widest mt-1">Every State & City</p>
          </div>
          <div className="rounded-xl bg-zinc-900 border border-cyan-500/20 p-5">
            <p className="text-cyan-400 font-black text-2xl">Govt.</p>
            <p className="text-xs text-neutral-500 font-mono uppercase tracking-widest mt-1">Scheme Integration</p>
          </div>
        </div>
        <p className="text-neutral-600 font-mono text-xs uppercase tracking-widest">
          Empowering India's Youth. One Career at a Time.
        </p>
      </div>
    ),
  },
];
