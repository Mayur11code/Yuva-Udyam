"use client";
import Link from "next/link";
import { GlobeDisplay } from "@/components/ui/globe-wrapper";
import { JheyGrid } from "@/components/ui/jhey-grid";
import { GlowSection } from "@/components/ui/glow-section";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { FlipWords } from "@/components/ui/flip-words";
import { FloatingNav } from "@/components/ui/floating-nav";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";
import LogoLoop from "@/components/ui/LogoLoop";
import StarBorder from "@/components/ui/StarBorder";
import ClickSpark from "@/components/ui/ClickSpark";
import { cn } from "@/lib/utils";
import { CometCard } from "@/components/ui/comet-card";
import { Cover } from "@/components/ui/cover";
import { BentoGrid } from "@/components/ui/bento-grid";
import { Timeline, yuvaUdyamTimelineData } from "@/components/ui/timeline";
import { BoxesCTA } from "@/components/ui/background-boxes";
import { LoadingScreen } from "@/components/ui/LoadingScreen";


export default function LandingPage() {
  const navItems = [
    { name: "Home", link: "#" },
    { name: "Features", link: "#features" },
    { name: "Contact", link: "#contact" },
  ];

  const partnerLogos = [
    { node: <span className="text-white font-bold text-xl tracking-widest">SWAYAM</span> },
    { node: <span className="text-white font-bold text-xl tracking-widest">NPTEL</span> },
    { node: <span className="text-white font-bold text-xl tracking-widest">GOOGLE MEET</span> },
    { node: <span className="text-white font-bold text-xl tracking-widest">WHATSAPP</span> },
    { node: <span className="text-white font-bold text-xl tracking-widest">GOVT. OF INDIA</span> },
    { node: <span className="text-white font-bold text-xl tracking-widest">UGC</span> },
    { node: <span className="text-white font-bold text-xl tracking-widest">AICTE</span> },
    { node: <span className="text-white font-bold text-xl tracking-widest">STARTUP INDIA</span> },
  ];

  const schemes = [
    {
      title: "PM Mudra Yojana",
      desc: "Collateral-free loans up to ₹10 lakh for small & micro businesses.",
      tag: "Finance",
      number: "01",
    },
    {
      title: "Startup India",
      desc: "Tax benefits, funding access & mentorship for eligible startups.",
      tag: "Startup",
      number: "02",
    },
    {
      title: "Stand Up India",
      desc: "Dedicated bank loans for SC/ST & women entrepreneurs.",
      tag: "Inclusion",
      number: "03",
    },
    {
      title: "PMEGP Scheme",
      desc: "Government subsidy up to 35% on projects for rural & urban youth.",
      tag: "Employment",
      number: "04",
    },
  ];

  return (
    <ClickSpark
      sparkColor="#38bdf8"
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <main className="bg-black w-full">

        {/* LOADING SCREEN */}
        <LoadingScreen />

        {/* FLOATING NAV */}
        <FloatingNav navItems={navItems} />

        {/* HERO */}
        <section className="relative min-h-screen w-full flex items-center overflow-hidden">
          <div
            className={cn(
              "absolute inset-0",
              "[background-size:55px_55px]",
              "[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
            )}
          />
          <div className="pointer-events-none absolute inset-0 bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 lg:px-16 flex flex-col lg:flex-row items-center justify-between gap-0">

            <div className="flex-1 max-w-[560px] flex flex-col gap-6 pt-24 lg:pt-0">
              <div className="inline-flex items-center gap-2">
                <span className="text-cyan-400 text-xs font-mono tracking-[0.25em] uppercase">
                  + India's Career Intelligence Platform
                </span>
              </div>

              <h1 className="font-serif text-5xl md:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight">
                <span className="text-white">Don't just apply.</span>
                <br />
                <span className="text-cyan-400 italic">Know where</span>
                <br />
                <span className="text-white">you stand.</span>
              </h1>

              <div className="text-xl md:text-2xl font-semibold text-white">
                Your career,{" "}
                <FlipWords
                  words={["guided", "smarter", "AI-powered", "redefined"]}
                  className="text-cyan-400"
                />
              </div>

              <p className="text-sm text-neutral-400 leading-relaxed font-mono max-w-[420px]">
                Upload your resume. Get scored. Find your skill gaps. Build a
                roadmap. Land the job, with AI by your side.
              </p>

              <div className="flex flex-wrap gap-4 mt-2">
                <Link href="/signup" className="flex items-center gap-2 bg-cyan-500 text-black font-bold text-sm px-7 py-3.5 rounded-full hover:bg-cyan-400 transition-all duration-200 hover:scale-105 active:scale-95 uppercase tracking-widest">
                  Get Started Free
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link href="/org/dashboard" className="flex items-center gap-2 border border-white/20 text-white text-sm px-7 py-3.5 rounded-full hover:border-white/50 hover:bg-white/5 transition-all duration-200 uppercase tracking-widest font-mono">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M5 6h6M5 9h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  I'm an Organisation
                </Link>
              </div>

              <div className="flex gap-10 mt-4 pt-6 border-t border-white/10">
                <div>
                  <p className="text-2xl font-black text-white">10K+</p>
                  <p className="text-xs text-neutral-500 font-mono mt-0.5 uppercase tracking-widest">Students</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-white">500+</p>
                  <p className="text-xs text-neutral-500 font-mono mt-0.5 uppercase tracking-widest">Jobs Posted</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-white">200+</p>
                  <p className="text-xs text-neutral-500 font-mono mt-0.5 uppercase tracking-widest">Organisations</p>
                </div>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center lg:justify-end relative">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden>
                <div
                  className="w-[520px] h-[520px] rounded-full opacity-15 blur-3xl"
                  style={{ background: "radial-gradient(circle, #00e5ff 0%, #0033ff 55%, transparent 100%)" }}
                />
              </div>
              <div className="w-full max-w-[680px] aspect-square">
                <GlobeDisplay />
              </div>
            </div>

          </div>
        </section>

        {/* DOTTED GLOW — CTA */}
        <section className="relative w-full h-[500px] overflow-hidden bg-black flex items-center justify-center">
          <DottedGlowBackground
            className="absolute inset-0"
            gap={20}
            radius={1.5}
            color="rgba(255,255,255,0.4)"
            glowColor="rgba(56,189,248,0.9)"
            opacity={0.8}
            speedMin={0.3}
            speedMax={1.0}
            speedScale={1}
          />
          <div className="relative z-10 text-center px-6">
            <h2 className="font-serif text-white text-4xl md:text-6xl font-black tracking-tight">
              Not Just a <span className="text-cyan-400 italic">Job Portal</span>
            </h2>
            <p className="text-neutral-400 text-base mt-5 max-w-lg mx-auto leading-relaxed">
              Yuva Udyam tells you what the job demands, where you stand, and exactly how to bridge the gap.
            </p>
            <Link href="/signup" className="inline-block mt-8 px-8 py-3 rounded-full bg-cyan-500 text-black font-bold text-sm hover:bg-cyan-400 transition-colors tracking-wide">
              Get Started Free
            </Link>
          </div>
        </section>

        {/* SCROLL GALLERY */}
        <JheyGrid />

        {/* GLOW CARDS */}
        <GlowSection />

        {/* RIPPLE TILES */}
        <section className="relative w-full h-[450px] overflow-hidden">
          <div className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
            <h2 className="font-serif text-white text-4xl md:text-5xl font-black tracking-tight">
              Built for <span className="text-cyan-400 italic">Everyone</span>
            </h2>
            <p className="text-neutral-400 font-mono text-sm mt-2 uppercase tracking-widest">
              Students, job seekers, and organisations — all in one platform
            </p>
          </div>
          <BackgroundRippleEffect />
        </section>

        {/* SPOTLIGHT CARDS */}
        <section id="features" className="w-full py-24 px-6 bg-black">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-white text-4xl md:text-5xl font-black tracking-tight text-center mb-16">
              What Yuva Udyam <span className="text-cyan-400 italic">Does</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <CardSpotlight className="h-80" color="#0ea5e9">
                <div className="relative z-20">
                  <p className="text-xl font-bold text-white">AI Resume Scorer</p>
                  <p className="text-neutral-300 mt-4 text-sm leading-relaxed">
                    Upload your resume and get an instant score against any job posting. See exactly where you match and where you fall short.
                  </p>
                </div>
              </CardSpotlight>
              <CardSpotlight className="h-80" color="#6366f1">
                <div className="relative z-20">
                  <p className="text-xl font-bold text-white">Skill Gap & Roadmap</p>
                  <p className="text-neutral-300 mt-4 text-sm leading-relaxed">
                    Identify missing skills and get a personalised roadmap to cover them — with curated SWAYAM & NPTEL course suggestions.
                  </p>
                </div>
              </CardSpotlight>
              <CardSpotlight className="h-80" color="#0ea5e9">
                <div className="relative z-20">
                  <p className="text-xl font-bold text-white">AI Mock Interview</p>
                  <p className="text-neutral-300 mt-4 text-sm leading-relaxed">
                    Practice core concept interviews with our AI, receive genuine feedback, and track your improvement over time.
                  </p>
                </div>
              </CardSpotlight>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <CardSpotlight className="h-80" color="#6366f1">
                <div className="relative z-20">
                  <p className="text-xl font-bold text-white">AI Course Maker</p>
                  <p className="text-neutral-300 mt-4 text-sm leading-relaxed">
                    Get a tailored course built specifically for you based on your target job and current skill set. Learn what matters most.
                  </p>
                </div>
              </CardSpotlight>
              <CardSpotlight className="h-80" color="#0ea5e9">
                <div className="relative z-20">
                  <p className="text-xl font-bold text-white">Smart Job Matching</p>
                  <p className="text-neutral-300 mt-4 text-sm leading-relaxed">
                    Filter jobs that truly match your skillset. Organisations upload a PDF and vacancies are published automatically via AI extraction.
                  </p>
                </div>
              </CardSpotlight>
              <CardSpotlight className="h-80" color="#6366f1">
                <div className="relative z-20">
                  <p className="text-xl font-bold text-white">Dashboard & Alerts</p>
                  <p className="text-neutral-300 mt-4 text-sm leading-relaxed">
                    Track applications, interviews, and schedules in one dashboard. Get WhatsApp alerts and Google Meet integration for upcoming sessions.
                  </p>
                </div>
              </CardSpotlight>
            </div>
          </div>
        </section>

        {/* LOGO LOOP */}
        <section id="contact" className="w-full py-16 bg-black border-t border-neutral-900">
          <p className="text-neutral-500 font-mono text-xs uppercase tracking-widest text-center mb-10">
            Integrated with platforms you already use
          </p>
          <LogoLoop
            logos={partnerLogos}
            speed={80}
            direction="left"
            logoHeight={40}
            gap={64}
            pauseOnHover
            fadeOut
            fadeOutColor="#000000"
          />
          <div className="flex justify-center mt-12">
            <StarBorder
              as="a"
              href="#contact"
              color="#38bdf8"
              speed="6s"
              className="text-white font-bold text-sm uppercase tracking-widest"
            >
              Contact Us
            </StarBorder>
          </div>
        </section>

        {/* GOVERNMENT SCHEMES — COMET CARDS */}
        <section className="w-full py-24 px-6 bg-black border-t border-neutral-900">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-cyan-400 font-mono text-base uppercase tracking-[0.25em] mb-4">
                + Opportunities for You
              </p>
              <h2 className="font-serif text-white text-5xl md:text-7xl font-black tracking-tight leading-none">
                Government{" "}
                <Cover className="text-cyan-400 italic text-5xl md:text-7xl font-black tracking-tight leading-none py-0">Schemes</Cover>
              </h2>
              <p className="text-neutral-400 font-mono text-base mt-5 max-w-lg mx-auto">
                Discover funding, mentorship & support programs built for India's young entrepreneurs.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {schemes.map((scheme) => (
                <CometCard key={scheme.title}>
                  <div className="rounded-2xl bg-zinc-900 border border-white/10 p-5 h-48 flex flex-col justify-between hover:border-cyan-500/30 transition-colors duration-300">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded-full font-mono">
                        {scheme.tag}
                      </span>
                      <span className="text-neutral-700 font-black text-xl font-mono">
                        {scheme.number}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg leading-snug">
                        {scheme.title}
                      </h3>
                      <p className="text-neutral-400 text-sm mt-1.5 leading-relaxed font-mono">
                        {scheme.desc}
                      </p>
                    </div>
                  </div>
                </CometCard>
              ))}
            </div>
          </div>
        </section>

        {/* BENTO GRID */}
        <BentoGrid />

        {/* TIMELINE */}
        <Timeline data={yuvaUdyamTimelineData} />

        {/* BOXES CTA + FOOTER */}
        <BoxesCTA />

      </main>
    </ClickSpark>
  );
}
