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
    bgColor: "#0D1B2A",
    textColor: "#fff",
    links: [
      { label: "Resume Scorer", href: "/student/resume" },
      { label: "Skill Gap & Roadmap", href: "/student/skill-gap" },
      { label: "AI Course Maker", href: "/student/courses" },
      { label: "Mock Interview", href: "/student/interview" },
    ],
  },
  {
    label: "For Organisations",
    bgColor: "#0A1F1A",
    textColor: "#fff",
    links: [
      { label: "Post a Job (PDF Upload)", href: "/org/post" },
      { label: "View Applications", href: "/org/applications" },
      { label: "Candidate Analytics", href: "/org/analytics" },
    ],
  },
  {
    label: "Platform",
    bgColor: "#1A0D2E",
    textColor: "#fff",
    links: [
      { label: "SWAYAM & NPTEL Courses", href: "/platform/courses" },
      { label: "WhatsApp Alerts", href: "/platform/alerts" },
      { label: "Google Meet Scheduler", href: "/platform/meet" },
    ],
  },
];

function CardNavDropdown({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-[700px] z-[6000]"
    >
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-zinc-900 border-l border-t border-white/10" />

      <div className="rounded-2xl border border-white/10 bg-zinc-900/95 backdrop-blur-xl shadow-2xl shadow-black/60 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
          <span className="text-white font-bold text-sm tracking-widest uppercase">
            Yuva Udyam
          </span>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white transition-colors text-xs tracking-wide"
          >
            ✕ Close
          </button>
        </div>

        <div className="grid grid-cols-3 gap-0 divide-x divide-white/10">
          {cardNavItems.map((item) => (
            <div
              key={item.label}
              className="p-5 hover:bg-white/5 transition-colors duration-200"
              style={{ backgroundColor: item.bgColor + "cc" }}
            >
              <p className="text-zinc-400 text-xs font-semibold uppercase tracking-widest mb-4">
                {item.label}
              </p>
              <div className="flex flex-col gap-2">
                {item.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-zinc-300 hover:text-cyan-400 transition-colors group"
                  >
                    <svg
                      className="w-3 h-3 text-zinc-600 group-hover:text-cyan-400 transition-colors shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="px-5 py-3 border-t border-white/10 flex items-center justify-between bg-black/30">
          <span className="text-zinc-500 text-xs">
            Empowering India's youth workforce
          </span>
          <a
            href="/register"
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Get Started Free →
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function NavContent({
  navItems,
  cardNavOpen,
  setCardNavOpen,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: React.ReactNode;
  }[];
  cardNavOpen: boolean;
  setCardNavOpen: (v: boolean) => void;
}) {
  return (
    <>
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

      <div className="flex items-center gap-1">
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
      </div>

      <div className="h-5 w-px bg-white/10" />

      <button className="relative rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-all hover:bg-neutral-200">
        <span>Login</span>
      </button>

      <AnimatePresence>
        {cardNavOpen && (
          <CardNavDropdown onClose={() => setCardNavOpen(false)} />
        )}
      </AnimatePresence>
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
          "fixed top-0 inset-x-0 z-[5000] flex items-center justify-between px-8 py-4",
          "border-b border-white/5 bg-black/60 backdrop-blur-md",
          isFloating ? "pointer-events-none" : "pointer-events-auto",
          className
        )}
      >
        <span className="text-white font-black text-lg tracking-widest uppercase">
          Yuva Udyam
        </span>

        <div className="relative flex items-center gap-2">
          <NavContent
            navItems={navItems}
            cardNavOpen={cardNavOpen}
            setCardNavOpen={setCardNavOpen}
          />
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