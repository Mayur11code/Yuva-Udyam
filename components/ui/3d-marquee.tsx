"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ThreeDMarqueeProps {
  images: string[];
  className?: string;
}

export function ThreeDMarquee({
  images,
  className,
}: ThreeDMarqueeProps) {
  return (
    <div
      className={cn(
        "overflow-hidden [perspective:1000px]",
        className
      )}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="grid grid-cols-4 gap-4 opacity-30 [transform:rotateX(55deg)_rotateZ(-35deg)_scale(1.2)]">
          {images.map((image, idx) => (
            <div
              key={idx}
              className="relative h-40 w-64 overflow-hidden rounded-xl border border-white/10 bg-neutral-900 shadow-xl"
            >
              <img
                src={image}
                alt={`image-${idx}`}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}