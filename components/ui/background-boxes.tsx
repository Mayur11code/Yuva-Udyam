"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  const rows = new Array(150).fill(1);
  const cols = new Array(100).fill(1);
  const colors = ["#93c5fd","#f9a8d4","#86efac","#fde047","#fca5a5","#d8b4fe","#93c5fd","#a5b4fc","#c4b5fd"];
  const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

  return (
    <div
      style={{ transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)` }}
      className={cn("absolute -top-1/4 left-1/4 z-0 flex h-full w-full -translate-x-1/2 -translate-y-1/2 p-4", className)}
      {...rest}
    >
      {rows.map((_, i) => (
        <motion.div key={`row` + i} className="relative h-8 w-16 border-l border-slate-700">
          {cols.map((_, j) => (
            <motion.div
              whileHover={{ backgroundColor: `${getRandomColor()}`, transition: { duration: 0 } }}
              animate={{ transition: { duration: 2 } }}
              key={`col` + j}
              className="relative h-8 w-16 border-t border-r border-slate-700"
            >
              {j % 2 === 0 && i % 2 === 0 ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="pointer-events-none absolute -top-[14px] -left-[22px] h-6 w-10 stroke-[1px] text-slate-700">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                </svg>
              ) : null}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);

export function BoxesCTA() {
  return (
    <section className="relative w-full h-screen bg-slate-900 overflow-hidden flex flex-col items-center justify-center">
      <Boxes />
      <div className="pointer-events-none absolute inset-0 z-10 bg-slate-900 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)]" />
      <div className="relative z-20 flex flex-col items-center text-center px-6 gap-6">
        <p className="text-cyan-400 font-mono text-lg uppercase tracking-[0.25em]">+ Start Today. It's Free.</p>
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase leading-none">
          Your Dream Job<br />
          <span className="text-cyan-400">Is One Upload Away.</span>
        </h2>
        <p className="text-neutral-400 font-mono text-base max-w-xl">
          Upload your resume. Know where you stand. Get your roadmap. Land the role.
        </p>
        <div className="flex flex-wrap gap-4 justify-center mt-2">
          <button className="flex items-center gap-2 bg-cyan-500 text-black font-bold text-sm px-8 py-4 rounded-full hover:bg-cyan-400 transition-all duration-200 hover:scale-105 active:scale-95 uppercase tracking-widest">
            Get Started Free
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button className="border border-white/20 text-white text-sm px-8 py-4 rounded-full hover:border-white/50 hover:bg-white/5 transition-all duration-200 uppercase tracking-widest font-mono">
            Learn More
          </button>
        </div>
        <p className="text-neutral-400 font-mono text-base uppercase tracking-widest mt-4">
          Empowering India's Youth. One Career at a Time.
        </p>
      </div>
    </section>
  );
}
