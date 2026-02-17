'use client'

import React, { useEffect, useState } from 'react';
import { Loader2, ExternalLink, Mic2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getAllJobs } from '@/src/app/actions/loadJobs';
import { generateCareerRoadmap } from '@/src/app/actions/jobs/GapAnalysis';
import { RoadmapModal } from './RoadMapModal'; // IMPORT THE MODAL
import { toast } from "sonner";
import { applyToJob } from '@/src/app/actions/jobs/Apply';
import { JobDetailsModal } from './JobDetailsModal';

export function JobFeed() {
  const router = useRouter();
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoadmap, setSelectedRoadmap] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleOpenDetails = (job: any) => {
    setSelectedJob(job);
    setIsDetailsOpen(true);
  };



  const handleJobClick = async (jobId: string) => {
    const toastId = toast.loading("Analyzing skill gaps with Gemini...");
    try {
      // Using your hardcoded forge user ID to pull stored resume data
      console.log("Generating roadmap for user_2026_forge and jobId:", jobId);
      const roadmapData = await generateCareerRoadmap("user_2026_forge", jobId);
      console.log("Roadmap Data:", roadmapData);
      setSelectedRoadmap(roadmapData);
      setIsModalOpen(true);
      toast.dismiss(toastId);
    } catch (error) {

      toast.error("Could not generate roadmap. Ensure your resume is uploaded.");
      toast.dismiss(toastId);
      console.log("Error generating roadmap:", error);
    }
  };

  useEffect(() => {
    async function fetchJobs() {
      try {
        const data = await getAllJobs();
        setJobs(data);
      } catch (error) {
        toast.error("Failed to sync with National Database");
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
        <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">Querying National Grid...</p>
      </div>
    );
  }

  return (
    <>
      <Card className="bg-[#151921] border-slate-800 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-950/50 text-slate-500 font-bold uppercase tracking-tighter border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Position</th>
                <th className="px-6 py-4">Organization</th>
                <th className="px-6 py-4">Salary</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {jobs.map((job) => (
                <tr
                  key={job.id}
                  onClick={() => handleOpenDetails(job)} // Trigger the new Modal
                  className="hover:bg-blue-500/5 transition-colors group cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-200 group-hover:text-blue-400 transition-colors">{job.role}</div>
                    <div className="text-[10px] text-slate-600 font-mono mt-0.5">REF: {job.id.slice(0, 8).toUpperCase()}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-400">{job.organization}</td>
                  <td className="px-6 py-4"><span className="text-emerald-400 font-mono font-bold">{job.salary}</span></td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-500 hover:text-white">
                        <ExternalLink className="w-4 h-4" />
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-500 text-white h-8 px-3 text-xs font-bold flex gap-2"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevents the Roadmap modal from opening
                            toast.info(`Launching Interview for ${job.role}`);

                            // NEW: Navigate to the interview page with the jobId parameter
                            router.push(`./dashboard/interview?jobId=${job.id}`);
                          }}>
                          <Mic2 className="w-3.5 h-3.5" /> Practice
                        </Button>
                      </Button>
                    </div>

                  </td>

                </tr>

              ))}

            </tbody>
          </table>
        </div>
      </Card>
      <JobDetailsModal
        job={selectedJob}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        userId="user_2026_forge"
      />
      {/* MODAL COMPONENT */}
      <RoadmapModal
        data={selectedRoadmap}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}