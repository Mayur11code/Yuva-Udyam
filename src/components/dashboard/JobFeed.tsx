'use client'

import React, { useState } from 'react';
import { ExternalLink, Mic2, MapPin, IndianRupee } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from "sonner";
import { cn } from '@/lib/utils';

const SAMPLE_JOBS = [
  { id: "job_001", role: "Scientist 'B' (Electronics)", organization: "DRDO", salary: "₹56,100 – ₹1,77,500", location: "New Delhi", deadline: "Mar 30, 2026", skills: ["Electronics", "Signal Processing", "MATLAB"] },
  { id: "job_002", role: "Junior Research Fellow", organization: "ISRO", salary: "₹31,000/month", location: "Bengaluru", deadline: "Apr 15, 2026", skills: ["Python", "Data Analysis", "Space Technology"] },
  { id: "job_003", role: "Data Analyst (IT Division)", organization: "NIC", salary: "₹44,900 – ₹1,42,400", location: "Remote", deadline: "Apr 5, 2026", skills: ["SQL", "Power BI", "Python"] },
  { id: "job_004", role: "Assistant Professor (CS)", organization: "IIT Roorkee", salary: "₹57,700 – ₹1,82,400", location: "Roorkee, UK", deadline: "Apr 20, 2026", skills: ["Machine Learning", "Research", "C++"] },
  { id: "job_005", role: "Civil Engineer (Grade II)", organization: "NHAI", salary: "₹40,000 – ₹1,40,000", location: "Multiple Cities", deadline: "Mar 25, 2026", skills: ["AutoCAD", "Structural Analysis", "Project Management"] },
  { id: "job_006", role: "Pharmacist (Grade A)", organization: "AIIMS Delhi", salary: "₹35,400 – ₹1,12,400", location: "New Delhi", deadline: "May 1, 2026", skills: ["Pharmacology", "Drug Dispensing", "Clinical Pharmacy"] },
];

export function JobFeed() {
  const router = useRouter();
  const [expandedJob, setExpandedJob] = useState<string | null>(null);

  return (
    <div className="rounded-2xl border border-white/6 overflow-hidden bg-black/40 backdrop-blur-sm">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/6">
              <th className="px-6 py-3.5 text-[10px] font-mono text-white/25 uppercase tracking-[0.18em]">Position</th>
              <th className="px-6 py-3.5 text-[10px] font-mono text-white/25 uppercase tracking-[0.18em]">Organisation</th>
              <th className="px-6 py-3.5 text-[10px] font-mono text-white/25 uppercase tracking-[0.18em]">Pay Scale</th>
              <th className="px-6 py-3.5 text-[10px] font-mono text-white/25 uppercase tracking-[0.18em]">Deadline</th>
              <th className="px-6 py-3.5 text-[10px] font-mono text-white/25 uppercase tracking-[0.18em] text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {SAMPLE_JOBS.map((job) => (
              <tr
                key={job.id}
                className="border-b border-white/4 hover:bg-white/2 transition-colors group cursor-pointer"
                onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
              >
                <td className="px-6 py-4">
                  <p className="font-semibold text-white group-hover:text-cyan-400 transition-colors text-sm">{job.role}</p>
                  <p className="text-[10px] font-mono text-white/20 mt-0.5">
                    <MapPin className="w-2.5 h-2.5 inline mr-1" />{job.location}
                  </p>
                  {expandedJob === job.id && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {job.skills.map(s => (
                        <span key={s} className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/8 text-cyan-400 border border-cyan-500/15">{s}</span>
                      ))}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 text-white/40 text-sm">{job.organization}</td>
                <td className="px-6 py-4">
                  <span className="font-mono text-emerald-400 text-xs">{job.salary}</span>
                </td>
                <td className="px-6 py-4 text-white/25 font-mono text-xs">{job.deadline}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => { e.stopPropagation(); router.push(`./dashboard/interview?jobId=${job.id}`); }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono hover:bg-cyan-500/20 transition-colors"
                    >
                      <Mic2 className="w-3 h-3" /> Practice
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); toast.success(`Applying to ${job.role}...`); }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 text-white/40 border border-white/8 text-xs font-mono hover:text-white/70 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" /> Apply
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-3 border-t border-white/4 flex items-center justify-between">
        <span className="text-[10px] font-mono text-white/15">{SAMPLE_JOBS.length} active postings</span>
        <span className="text-[10px] font-mono text-white/15">Last synced: just now</span>
      </div>
    </div>
  );
}
