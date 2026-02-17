'use server'

import { db } from "@/lib/db";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// RELIABLE FALLBACKS (If AI hits a rate limit or finds nothing)
const FALLBACK_COURSES = [
  {
    title: "Next.js 15 Masterclass",
    url: "https://nextjs.org/learn",
    thumbnail: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=400",
    tags: ["Core", "Fullstack"]
  },
  {
    title: "Prisma & PostgreSQL Deep Dive",
    url: "https://www.prisma.io/docs",
    thumbnail: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=400",
    tags: ["Database", "Backend"]
  }
];

export async function scoutCourses(userId: string) {
  try {
    // 1. Get User Skills from Neon
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { skills: true }
    });

    const skills = user?.skills || ["Web Development", "React"];

    // 2. Initialize Gemini
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `
      The user has these skills: ${skills.join(", ")}. 
      Find 4 high-quality, free learning resources (YouTube playlists or official docs) that would help them bridge gaps into advanced SaaS architecture.
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

    // 3. Transform for UI (Adding Unsplash placeholders based on Gemini's search query)
    const courses = aiData.courses.map((c: any) => ({
      ...c,
      thumbnail: `https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=400` // Default tech placeholder
    }));

    return { 
      success: true, 
      analysis: aiData.analysis, 
      courses,
      isPersonalized: true 
    };

  } catch (error) {
    console.warn("Course Scouting failed. Using Fallbacks.");
    return { 
      success: false, 
      analysis: "We've curated a core curriculum to strengthen your foundational 'Forge' architecture.",
      courses: FALLBACK_COURSES,
      isPersonalized: false 
    };
  }
}