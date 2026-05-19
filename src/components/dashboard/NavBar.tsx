'use client'

import React from 'react';
import { Bell, User, Search } from 'lucide-react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from '@/lib/utils';

const navItems = [
  { name: "Jobs", href: "/user/job" },
  { name: "Dashboard", href: "/user/dashboard" },
  { name: "Courses", href: "/user/courses" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <div className="w-full pt-5 px-6">
      <nav className="max-w-[1400px] mx-auto h-14 bg-black/70 backdrop-blur-md border border-white/6 rounded-2xl flex items-center justify-between px-5 shadow-xl shadow-black/40">
        {/* Brand */}
        <div className="flex items-center gap-8">
          <Link href="/" className="font-serif font-black text-xl tracking-tight text-white hover:opacity-75 transition-opacity">
            Yuva <span className="text-cyan-400 italic">Udyam</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium px-3.5 py-1.5 rounded-lg transition-colors",
                    isActive ? "text-cyan-400 bg-cyan-500/10" : "text-white/35 hover:text-white/70"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <div className="relative hidden lg:flex items-center">
            <Search className="absolute left-3 w-3.5 h-3.5 text-white/20" />
            <input
              placeholder="Search anything..."
              className="bg-white/3 border border-white/6 rounded-lg pl-9 pr-4 h-8 w-56 text-xs text-white placeholder:text-white/20 outline-none focus:border-cyan-500/30 transition-colors"
            />
          </div>

          <div className="h-5 w-px bg-white/6" />

          <button className="relative w-8 h-8 flex items-center justify-center text-white/30 hover:text-white/60 transition-colors">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-cyan-400 rounded-full" />
          </button>

          <div className="flex items-center gap-2.5 cursor-pointer group">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-semibold text-white/70 group-hover:text-white transition-colors leading-none">Raj Singh</p>
              <p className="text-[9px] text-white/20 font-mono mt-0.5">ID: 4402-91</p>
            </div>
            <div className="w-8 h-8 rounded-lg border border-white/8 bg-white/4 flex items-center justify-center group-hover:border-cyan-500/30 transition-all">
              <User className="w-4 h-4 text-white/40" />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default function NavbarLinks() {
  const pathname = usePathname();
  return (
    <div className="hidden md:flex items-center gap-1">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link key={item.name} href={item.href}
            className={cn("text-sm font-medium px-3.5 py-1.5 rounded-lg transition-colors",
              isActive ? "text-cyan-400 bg-cyan-500/10" : "text-white/35 hover:text-white/70"
            )}
          >{item.name}</Link>
        );
      })}
    </div>
  );
}
