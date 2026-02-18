"use client";

import { GlowingEffect } from "@/components/ui/glowing-effect";

export function GlowSection() {
  return (
    <section className="relative z-30 bg-black py-40 isolate">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <h2 className="text-white text-4xl md:text-6xl font-black tracking-tight mb-16 uppercase">
          Built for Both Sides
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <Card
            title="Organisation Portal"
            desc="Organisations simply upload a PDF — our AI auto-extracts job details and publishes vacancies instantly. No manual data entry, ever."
          />
          <Card
            title="AI Mock Interview"
            desc="Practice real interview questions tailored to your target role. Get honest AI feedback on your answers and a clear view of where to improve."
          />
          <Card
            title="WhatsApp & Meet Alerts"
            desc="Never miss an opportunity. Get instant WhatsApp notifications and see upcoming Google Meet interview schedules right on your dashboard."
          />
        </div>
      </div>
    </section>
  );
}

function Card({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="relative group rounded-2xl">
      <div className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-2xl pointer-events-none">
        <GlowingEffect
          spread={120}
          blur={20}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={10}
        />
      </div>

      <div className="relative rounded-2xl bg-zinc-950/90 backdrop-blur-xl border border-white/10 p-8 transition-all duration-500 group-hover:border-cyan-500/30">
        <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden">
          <GlowingEffect
            spread={60}
            blur={0}
            glow={true}
            disabled={false}
            movementDuration={0.6}
            borderWidth={3}
          />
        </div>

        <div className="relative z-10">
          <div className="mb-4 text-cyan-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
          </div>
          <h3 className="text-white text-xl font-bold mb-3 uppercase tracking-wider">{title}</h3>
          <p className="text-zinc-400 leading-relaxed font-mono text-sm">{desc}</p>
        </div>
      </div>
    </div>
  );
}