"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function ScrollingGrid() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"], // Triggers when the top of the grid enters the bottom of the screen
  });

  // Transforms: Map scroll progress (0 to 1) to CSS values
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [100, 0]);

  return (
    <section ref={targetRef} className="relative w-full py-20 flex flex-col items-center justify-center">
      <motion.div style={{ opacity, y: textY }} className="text-center mb-10">
        <h2 className="text-8xl font-black text-white uppercase leading-none">
          let's<br />scroll.
        </h2>
        <p className="text-gray-400 mt-4 uppercase tracking-widest">Originally from Jhey</p>
      </motion.div>

      {/* Grid Layer */}
      <motion.div 
        style={{ scale, opacity }}
        className="grid grid-cols-3 gap-4 w-full max-w-6xl px-4"
      >
        {[...Array(9)].map((_, i) => (
          <div key={i} className="aspect-square bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center">
             <span className="text-zinc-700 font-mono">NODE_{i+1}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}