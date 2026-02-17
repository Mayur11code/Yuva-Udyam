'use client'

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Star, ExternalLink, ArrowRight } from 'lucide-react';

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
    <Card
  className="group relative bg-[#151921] border border-slate-800
             overflow-hidden transition-all duration-300
             hover:border-blue-500/30
             w-[240px]"
>


      {/* Thumbnail */}
      <div className="aspect-[16/11] relative overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover
                     transition-transform duration-500
                     group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14]/80 via-transparent to-transparent" />

        <div className="absolute top-2 left-2">
          <Badge className="bg-black/50 backdrop-blur border-slate-700 text-[8px] font-mono text-blue-400 px-2 py-0.5">
            LIVE
          </Badge>
        </div>

        <div className="absolute bottom-2 right-2 opacity-0 translate-y-2
                        group-hover:opacity-100 group-hover:translate-y-0
                        transition-all duration-300">
          <div className="bg-blue-600 p-1.5 rounded-md">
            <ExternalLink className="w-3 h-3 text-white" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 space-y-2">

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {course.tags.slice(0, 2).map((tag: string) => (
            <span
              key={tag}
              className="text-[8px] font-medium text-slate-500
                         uppercase tracking-wide"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3
          className="text-sm font-semibold text-white
                     leading-snug line-clamp-2
                     group-hover:text-blue-400
                     transition-colors"
        >
          {course.title}
        </h3>

        {/* Footer */}
        <div className="pt-1 flex items-center justify-between
                        border-t border-slate-800/60">

          <div className="flex items-center gap-2 text-[9px]
                          text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-blue-500/70" />
              Self-Paced
            </span>

            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-500/70" />
              Impact
            </span>
          </div>

          <ArrowRight
            className="w-3 h-3 text-slate-600
                       group-hover:text-blue-500
                       group-hover:translate-x-1
                       transition-all"
          />
        </div>
      </div>
    </Card>
  );
}
