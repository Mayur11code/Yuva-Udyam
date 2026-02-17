'use server'

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function publishJob(data: any) {
  try {
    const job = await db.job.create({
      data: {
        role: data.job_role,
        organization: data.organization,
        salary: data.salary,
        location: data.location,
        deadline: data.deadline,
        skills: data.skills_required,
        status: "Active"
      }
    });
    
    // This refreshes the Job Feed for users immediately
    revalidatePath("/dashboard"); 
    return { success: true, jobId: job.id };
  } catch (error) {
    console.error("FORGE_DB_ERROR:", error);
    return { success: false };
  }
}