"use client";
import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, AnimatePresence } from "motion/react";

export function BentoGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isInside, setIsInside] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (gridRef.current) {
      const rect = gridRef.current.getBoundingClientRect();
      x.set(e.clientX - rect.left);
      y.set(e.clientY - rect.top);
    }
  };

  const features = [
    {
      title: "AI Resume Scorer",
      description: "Upload your resume and get an instant match score against any job posting. Know exactly where you stand.",
      skeleton: <SkeletonResume />,
      className: "col-span-1 lg:col-span-4 border-b lg:border-r border-neutral-800",
    },
    {
      title: "Skill Gap Analysis",
      description: "Identify missing skills and get curated SWAYAM & NPTEL course recommendations.",
      skeleton: <SkeletonSkills />,
      className: "border-b col-span-1 lg:col-span-2 border-neutral-800",
    },
    {
      title: "AI Mock Interview",
      description: "Practice with our AI interviewer, get real-time feedback and track your improvement over time.",
      skeleton: <SkeletonInterview />,
      className: "col-span-1 lg:col-span-3 lg:border-r border-neutral-800",
    },
    {
      title: "Smart Job Matching",
      description: "Jobs that truly match your skillset — filtered and ranked by our AI engine in real time.",
      skeleton: <SkeletonJobs />,
      className: "col-span-1 lg:col-span-3 border-b border-neutral-800 lg:border-none",
    },
  ];

  return (
    <section className="w-full py-24 px-6 bg-black border-t border-neutral-900 relative">
      <div className="pointer-events-none absolute inset-0 z-0" style={{ backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 px-8">
          <p className="text-cyan-400 font-mono text-sm uppercase tracking-[0.25em] mb-3">+ Everything in one place</p>
          <h2 className="text-white text-5xl md:text-6xl font-black tracking-tighter uppercase">
            Built for <span className="text-cyan-400">Your Success</span>
          </h2>
          <p className="text-neutral-400 font-mono text-base mt-4 max-w-2xl mx-auto">
            From resume to offer letter — Yuva Udyam has every tool you need to land your dream role.
          </p>
        </div>
        <div
          ref={gridRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsInside(true)}
          onMouseLeave={() => setIsInside(false)}
          className="relative mt-12 grid grid-cols-1 rounded-xl lg:grid-cols-6 border border-neutral-800 overflow-hidden"
          style={{ cursor: "none" }}
        >
          <AnimatePresence>
            {isInside && (
              <motion.div
                className="pointer-events-none absolute z-[100]"
                style={{ top: y, left: x }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <svg stroke="currentColor" fill="currentColor" strokeWidth="1" viewBox="0 0 16 16" className="h-6 w-6 -translate-x-[12px] -translate-y-[10px] -rotate-[70deg] stroke-sky-600 text-sky-500" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
                </svg>
                <div className="mt-1 min-w-max rounded-full bg-cyan-500 px-3 py-1 text-xs text-white font-mono whitespace-nowrap">Yuva Udyam ✦</div>
              </motion.div>
            )}
          </AnimatePresence>
          {features.map((feature) => (
            <div key={feature.title} className={cn("relative overflow-hidden p-6 sm:p-8 bg-zinc-950", feature.className)}>
              <p className="text-left text-xl font-bold tracking-tight text-white md:text-2xl">{feature.title}</p>
              <p className="my-2 max-w-sm text-left text-sm text-neutral-400 font-mono leading-relaxed">{feature.description}</p>
              <div className="h-full w-full">{feature.skeleton}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const SkeletonResume = () => {
  const bars = [92, 78, 65, 88, 55];
  const labels = ["Keywords", "Experience", "Skills", "Education", "Projects"];
  return (
    <div className="relative flex h-full gap-6 px-2 py-6">
      <div className="mx-auto w-full rounded-xl bg-zinc-900 border border-neutral-800 p-6">
        <div className="flex items-center gap-6 mb-6">
          <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 border-cyan-500">
            <span className="text-2xl font-black text-white">87</span>
            <span className="absolute -bottom-1 text-[10px] text-cyan-400 font-mono">SCORE</span>
          </div>
          <div>
            <p className="text-white font-bold text-lg">Frontend Developer</p>
            <p className="text-neutral-500 text-sm font-mono">@ Razorpay · Strong Match</p>
            <span className="mt-1 inline-block text-xs bg-cyan-400/10 text-cyan-400 px-2 py-0.5 rounded-full font-mono uppercase tracking-widest">Top 13% Applicants</span>
          </div>
        </div>
        <div className="space-y-2">
          {bars.map((val, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="w-20 text-xs text-neutral-500 font-mono shrink-0">{labels[i]}</span>
              <div className="flex-1 h-2 rounded-full bg-neutral-800">
                <motion.div initial={{ width: 0 }} animate={{ width: `${val}%` }} transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }} className="h-2 rounded-full bg-cyan-500" />
              </div>
              <span className="text-xs text-neutral-400 font-mono w-8 text-right">{val}%</span>
            </div>
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-32 bg-gradient-to-t from-zinc-950 to-transparent" />
    </div>
  );
};

const SkeletonSkills = () => {
  const have = ["React", "TypeScript", "CSS", "Git", "REST APIs"];
  const missing = ["Next.js", "Docker", "GraphQL", "AWS"];
  return (
    <div className="relative flex h-full flex-col gap-4 py-6 px-2 overflow-hidden">
      <div className="rounded-xl bg-zinc-900 border border-neutral-800 p-4">
        <p className="text-xs font-mono text-green-400 uppercase tracking-widest mb-2">You have</p>
        <div className="flex flex-wrap gap-2">{have.map((s) => <span key={s} className="text-xs bg-green-400/10 text-green-400 border border-green-400/20 px-2 py-1 rounded-full font-mono">{s}</span>)}</div>
      </div>
      <div className="rounded-xl bg-zinc-900 border border-neutral-800 p-4">
        <p className="text-xs font-mono text-red-400 uppercase tracking-widest mb-2">Missing</p>
        <div className="flex flex-wrap gap-2">{missing.map((s) => <span key={s} className="text-xs bg-red-400/10 text-red-400 border border-red-400/20 px-2 py-1 rounded-full font-mono">{s}</span>)}</div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-16 bg-gradient-to-t from-zinc-950 to-transparent" />
    </div>
  );
};

const SkeletonInterview = () => {
  const messages = [
    { role: "ai", text: "Explain the difference between var, let, and const in JavaScript." },
    { role: "user", text: "var is function-scoped, while let and const are block-scoped. const cannot be reassigned..." },
    { role: "ai", text: "Great answer! Score: 9/10 — You covered scope and reassignment correctly." },
  ];
  return (
    <div className="relative flex h-full flex-col gap-3 py-6 px-2 overflow-hidden">
      {messages.map((msg, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.3 }}
          className={cn("max-w-[85%] rounded-xl px-4 py-3 text-xs font-mono leading-relaxed", msg.role === "ai" ? "self-start bg-cyan-400/10 text-cyan-300 border border-cyan-400/20" : "self-end bg-neutral-800 text-neutral-300")}
        >{msg.text}</motion.div>
      ))}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-16 bg-gradient-to-t from-zinc-950 to-transparent" />
    </div>
  );
};

const SkeletonJobs = () => {
  const jobs = [
    { title: "Frontend Engineer", company: "Razorpay", match: 92, location: "Bangalore" },
    { title: "React Developer", company: "CRED", match: 87, location: "Remote" },
    { title: "UI Engineer", company: "Zepto", match: 81, location: "Mumbai" },
  ];
  return (
    <div className="relative flex h-full flex-col gap-3 py-6 px-2 overflow-hidden">
      {jobs.map((job, i) => (
        <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15 }}
          className="flex items-center justify-between rounded-xl bg-zinc-900 border border-neutral-800 px-4 py-3"
        >
          <div>
            <p className="text-white text-sm font-bold">{job.title}</p>
            <p className="text-neutral-500 text-xs font-mono">{job.company} · {job.location}</p>
          </div>
          <span className="text-xs font-black text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded-full font-mono">{job.match}%</span>
        </motion.div>
      ))}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-16 bg-gradient-to-t from-zinc-950 to-transparent" />
    </div>
  );
};
