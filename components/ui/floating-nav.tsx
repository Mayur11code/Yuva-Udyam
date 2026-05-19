"use client";
import React, { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "@/lib/utils";

// ─── Card Nav Data ────────────────────────────────────────────────────────────
const cardNavItems = [
  {
    label: "For Students",
    accent: "#38bdf8",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 3.741-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
      </svg>
    ),
    links: [
      {
        label: "Resume Scorer",
        desc: "AI-powered resume analysis",
        href: "/user/dashboard",
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5 shrink-0"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>,
      },
      {
        label: "Skill Gap & Roadmap",
        desc: "Find gaps, build your path",
        href: "/user/dashboard",
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5 shrink-0"><path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" /></svg>,
      },
      {
        label: "AI Course Maker",
        desc: "Personalised learning plan",
        href: "/user/courses",
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5 shrink-0"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" /></svg>,
      },
      {
        label: "Mock Interview",
        desc: "Practice with AI feedback",
        href: "/user/dashboard/interview",
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5 shrink-0"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" /></svg>,
      },
    ],
  },
  {
    label: "For Organisations",
    accent: "#34d399",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
    links: [
      {
        label: "Post a Job",
        desc: "PDF upload, AI-extracted",
        href: "/org/dashboard",
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5 shrink-0"><path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" /></svg>,
      },
      {
        label: "View Applications",
        desc: "Track all candidates",
        href: "/org/dashboard",
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5 shrink-0"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" /></svg>,
      },
      {
        label: "Candidate Analytics",
        desc: "Insights & match scores",
        href: "/org/dashboard",
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5 shrink-0"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" /></svg>,
      },
    ],
  },
  {
    label: "Platform",
    accent: "#a78bfa",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z" />
      </svg>
    ),
    links: [
      {
        label: "SWAYAM & NPTEL",
        desc: "Govt-certified courses",
        href: "/user/courses",
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5 shrink-0"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 3.741-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" /></svg>,
      },
      {
        label: "WhatsApp Alerts",
        desc: "Real-time job notifications",
        href: "/user/dashboard",
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5 shrink-0"><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" /></svg>,
      },
      {
        label: "Google Meet Scheduler",
        desc: "Auto-schedule interviews",
        href: "/user/dashboard",
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5 shrink-0"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg>,
      },
    ],
  },
];

function CardNavDropdown({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.96 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="absolute top-[calc(100%+16px)] left-1/2 -translate-x-1/2 w-[780px] z-[6000]"
    >
      {/* Caret */}
      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-[#0a0a0a] border-l border-t border-cyan-500/20" />

      <div
        className="rounded-2xl overflow-hidden shadow-2xl shadow-black/80"
        style={{
          background: "linear-gradient(135deg, #0a0a0a 0%, #0d1117 100%)",
          border: "1px solid rgba(56,189,248,0.15)",
          boxShadow: "0 0 0 1px rgba(56,189,248,0.05), 0 25px 60px rgba(0,0,0,0.8), 0 0 40px rgba(56,189,248,0.04)",
        }}
      >
        {/* Top accent line */}
        <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, #38bdf8 30%, #a78bfa 70%, transparent)" }} />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(56,189,248,0.8)]" />
            <span className="font-serif font-black text-sm text-white">
              Yuva <span className="text-cyan-400 italic">Udyam</span>
            </span>
          </div>
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-300 transition-colors text-xs tracking-wider"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
            Close
          </button>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-3">
          {cardNavItems.map((item, colIdx) => (
            <div
              key={item.label}
              className={cn(
                "p-5 flex flex-col gap-3",
                colIdx < cardNavItems.length - 1 && "border-r border-white/5"
              )}
            >
              {/* Section header */}
              <div className="flex items-center gap-2 mb-1">
                <div
                  className="flex items-center justify-center w-6 h-6 rounded-md"
                  style={{
                    backgroundColor: item.accent + "18",
                    color: item.accent,
                    border: `1px solid ${item.accent}30`,
                  }}
                >
                  {item.icon}
                </div>
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.18em]"
                  style={{ color: item.accent }}
                >
                  {item.label}
                </span>
              </div>

              {/* Links */}
              <div className="flex flex-col gap-0.5">
                {item.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="group flex items-start gap-2.5 rounded-lg px-2.5 py-2 transition-all duration-150 hover:bg-white/5"
                  >
                    <span className="mt-0.5 text-zinc-600 group-hover:text-zinc-300 transition-colors duration-150">
                      {link.icon}
                    </span>
                    <span className="flex flex-col">
                      <span className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors leading-tight">
                        {link.label}
                      </span>
                      <span className="text-[11px] text-zinc-600 group-hover:text-zinc-500 transition-colors mt-0.5 font-mono">
                        {link.desc}
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between px-6 py-3.5 border-t border-white/5"
          style={{ background: "rgba(56,189,248,0.03)" }}
        >
          <p className="text-zinc-600 text-[11px] font-mono tracking-wider uppercase">
            Empowering India&apos;s youth workforce
          </p>
          <a
            href="/signup"
            className="flex items-center gap-1.5 text-xs font-bold text-black bg-cyan-400 hover:bg-cyan-300 transition-colors px-3.5 py-1.5 rounded-full uppercase tracking-widest"
          >
            Get Started
            <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// Center nav items (no login) — used in static header
function CenterNav({
  navItems,
  cardNavOpen,
  setCardNavOpen,
}: {
  navItems: { name: string; link: string; icon?: React.ReactNode }[];
  cardNavOpen: boolean;
  setCardNavOpen: (v: boolean) => void;
}) {
  return (
    <div className="relative flex items-center gap-1">
      <button
        onClick={() => setCardNavOpen(!cardNavOpen)}
        className={cn(
          "relative flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors",
          cardNavOpen
            ? "bg-white/10 text-white"
            : "text-neutral-300 hover:bg-white/10 hover:text-white"
        )}
      >
        <svg
          className={cn(
            "w-3.5 h-3.5 transition-transform duration-200",
            cardNavOpen ? "rotate-45" : "rotate-0"
          )}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <span className="hidden sm:block">Explore</span>
      </button>

      <div className="h-5 w-px bg-white/10" />

      {navItems.map((navItem, idx) => (
        <a
          key={`link-${idx}`}
          href={navItem.link}
          className="relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-neutral-300 transition-colors hover:bg-white/10 hover:text-white"
        >
          <span className="block sm:hidden">{navItem.icon}</span>
          <span className="hidden sm:block">{navItem.name}</span>
        </a>
      ))}

      <AnimatePresence>
        {cardNavOpen && (
          <CardNavDropdown onClose={() => setCardNavOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

// Full nav (center items + login) — used in floating pill
function NavContent({
  navItems,
  cardNavOpen,
  setCardNavOpen,
}: {
  navItems: { name: string; link: string; icon?: React.ReactNode }[];
  cardNavOpen: boolean;
  setCardNavOpen: (v: boolean) => void;
}) {
  return (
    <>
      <CenterNav
        navItems={navItems}
        cardNavOpen={cardNavOpen}
        setCardNavOpen={setCardNavOpen}
      />
      <div className="h-5 w-px bg-white/10" />
      <a
        href="/login"
        className="relative rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-all hover:bg-neutral-200"
      >
        <span>Login</span>
      </a>
    </>
  );
}

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: React.ReactNode;
  }[];
  className?: string;
}) => {
  const { scrollY } = useScroll();
  const [isFloating, setIsFloating] = useState(false);
  const [floatVisible, setFloatVisible] = useState(false);
  const [cardNavOpen, setCardNavOpen] = useState(false);
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (current) => {
    const HERO_THRESHOLD = 80;
    const direction = current - lastScrollY.current;
    lastScrollY.current = current;

    if (current < HERO_THRESHOLD) {
      setIsFloating(false);
      setFloatVisible(false);
    } else {
      setIsFloating(true);
      setFloatVisible(direction < 0);
    }
  });

  return (
    <>
      <motion.header
        animate={{ opacity: isFloating ? 0 : 1, y: isFloating ? -20 : 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "fixed top-0 inset-x-0 z-[5000] flex items-center px-8 py-4",
          "border-b border-white/5 bg-black/60 backdrop-blur-md",
          isFloating ? "pointer-events-none" : "pointer-events-auto",
          className
        )}
      >
        {/* Left: Logo */}
        <span className="font-serif font-black text-xl text-white w-48 shrink-0">
          Yuva <span className="text-cyan-400 italic">Udyam</span>
        </span>

        {/* Center: Nav buttons */}
        <div className="flex-1 flex items-center justify-center">
          <CenterNav
            navItems={navItems}
            cardNavOpen={cardNavOpen}
            setCardNavOpen={setCardNavOpen}
          />
        </div>

        {/* Right: Login */}
        <div className="w-48 shrink-0 flex justify-end">
          <a
            href="/login"
            className="rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition-all hover:bg-neutral-200"
          >
            Login
          </a>
        </div>
      </motion.header>

      <AnimatePresence>
        {isFloating && floatVisible && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-10 inset-x-0 mx-auto z-[5000] flex justify-center pointer-events-auto"
          >
            <div className="relative flex items-center justify-center gap-2 rounded-full border border-white/10 bg-black/80 px-2 py-1.5 shadow-lg shadow-black/30 backdrop-blur-md">
              <NavContent
                navItems={navItems}
                cardNavOpen={cardNavOpen}
                setCardNavOpen={setCardNavOpen}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};