'use client'

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlayCircle, Clock, Star, ExternalLink, ArrowRight } from 'lucide-react';

interface CourseCardProps {
  course: {
    title: string;
    url: string;
    thumbnail: string;
    tags: string[];
    provider?: string;
  };
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="group relative bg-[#151921] border-slate-800 overflow-hidden hover:border-blue-500/50 transition-all duration-500 shadow-lg max-w-[320px] w-full"> {/* Added max-w and shadow-lg */}
      {/* 1. THUMBNAIL AREA */}
      <div className="aspect-[16/9] relative overflow-hidden"> {/* Changed from aspect-video to aspect-[16/9] for a tighter ratio */}
        <img 
          src={course.thumbnail} 
          alt={course.title} 
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" /* Reduced scale and increased initial opacity */
        />
        
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-transparent to-transparent opacity-90" />
        <div className="absolute inset-0 bg-blue-600/5 group-hover:bg-transparent transition-colors duration-500" />

        {/* Floating "Go" Button */}
        <div className="absolute bottom-3 right-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
           <div className="bg-blue-600 p-2 rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.4)]"> {/* Smaller button and shadow */}
              <ExternalLink className="w-3.5 h-3.5 text-white" /> {/* Smaller icon */}
           </div>
        </div>

        {/* "Learning" Indicator */}
        <div className="absolute top-3 left-3">
           <Badge className="bg-black/60 backdrop-blur-md border-slate-700 text-[9px] font-mono text-blue-400 py-0.5 px-2">
             LIVE SOURCE
           </Badge>
        </div>
      </div>

      {/* 2. CONTENT AREA */}
      <div className="p-4 space-y-3"> {/* Reduced padding and spacing */}
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {course.tags.slice(0, 2).map((tag: string) => (
            <span key={tag} className="text-[9px] font-black text-slate-500 uppercase tracking-widest border-l-2 border-blue-500 pl-2">
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="font-bold text-white text-sm leading-tight min-h-[32px] group-hover:text-blue-400 transition-colors"> {/* Smaller line height and min-height */}
          {course.title}
        </h3>

        {/* Footer Metrics */}
        <div className="pt-2 flex items-center justify-between border-t border-slate-800/50">
          <div className="flex items-center gap-3 text-[10px] font-medium text-slate-500"> {/* Reduced gap */}
             <span className="flex items-center gap-1.5">
               <Clock className="w-3 h-3 text-blue-500/70" /> 
               Self-Paced
             </span>
             <span className="flex items-center gap-1.5">
               <Star className="w-3 h-3 text-yellow-500/70" /> 
               High Impact
             </span>
          </div>
          
          <ArrowRight className="w-3.5 h-3.5 text-slate-700 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
        </div>
      </div>

      {/* Decorative Border Glow */}
      <div className="absolute inset-0 border border-blue-500/0 group-hover:border-blue-500/20 rounded-xl pointer-events-none transition-all" />
    </Card>
  );
}