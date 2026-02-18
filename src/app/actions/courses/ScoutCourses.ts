'use server'

import { db } from "@/lib/db";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const FALLBACK_COURSES = [
  {
    title: "Prisma & PostgreSQL Deep Dive",
    url: "https://www.prisma.io/docs",
    thumbnail: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=400",
    tags: ["Database", "Backend"]
  },
  {
    title: "System Design Crash Course",
    url: "https://www.youtube.com/results?search_query=system+design+playlist",
    thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=400",
    tags: ["Architecture", "Scalability"]
  },
  {
    title: "AWS Cloud Fundamentals",
    url: "https://aws.amazon.com/training/",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=400",
    tags: ["Cloud", "DevOps"]
  }
];

export async function scoutCourses(userId: string) {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { skills: true }
    });

    const skills = user?.skills;

    // 🔥 NEW LOGIC: If no resume/skills → return generic courses
    if (!skills || skills.length === 0) {
      return {
        success: true,
        analysis:
          "Upload your resume to unlock personalized AI-powered course recommendations tailored to your skill gaps.",
        courses: FALLBACK_COURSES,
        isPersonalized: false
      };
    }

    // 🔥 Only call Gemini if skills exist
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `
      The user has these skills: ${skills.join(", ")}.
      Find 4 high-quality, free learning resources (official docs or NPTEL courses) that would help them bridge gaps into advanced SaaS architecture.
      Focus on courses that are beginner-friendly but also have pathways to advanced topics, ensuring they can grow into a 'Forge' architect role.
      that would help them bridge gaps into advanced SaaS architecture.

      Return JSON:
      {
        "analysis": "A 2-sentence summary of their gaps.",
        "courses": [
          { "title": "string", "url": "string", "thumbnail_query": "string", "tags": ["string"] }
        ]
      }
    `;

    const result = await model.generateContent(prompt);
    const aiData = JSON.parse(result.response.text());

    const courses = aiData.courses.map((c: any) => ({
      ...c,
      thumbnail:
        "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=400"
    }));

    return {
      success: true,
      analysis: aiData.analysis,
      courses,
      isPersonalized: true
    };

  } catch (error) {
    console.warn("Course Scouting failed. Using Fallbacks.");
    console.error(error);

    return {
      success: false,
      analysis:
        "We've curated a core curriculum to strengthen your foundational 'Forge' architecture.",
      courses: FALLBACK_COURSES,
      isPersonalized: false
    };
  }
}
