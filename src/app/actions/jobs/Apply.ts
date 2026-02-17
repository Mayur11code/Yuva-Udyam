'use server'

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function applyToJob(userId: string, jobId: string) {
  try {
    // 1. Create the application link in Neon Postgres
    await db.application.upsert({
      where: {
        userId_jobId: {
          userId: userId,
          jobId: jobId,
        },
      },
      update: {
        status: "Applied", // If they already started an interview, update status
      },
      create: {
        userId: userId,
        jobId: jobId,
        status: "Applied",
      },
    });

    // 2. Refresh the dashboard data
    revalidatePath("/dashboard");
    
    return { success: true, message: "Application submitted successfully!" };
  } catch (error) {
    console.error("Apply Error:", error);
    return { success: false, message: "Failed to submit application." };
  }
}