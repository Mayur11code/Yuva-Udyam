"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";

export function JheyGrid() {
  const containerRef = useRef(null);

  const isInView = useInView(containerRef, {
    margin: "-20% 0px -20% 0px",
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const progress = useTransform(scrollYProgress, (v) => (isInView ? v : 0));

  const scaleCenter = useTransform(progress, [0, 0.4], [2.5, 1]);
  const opacityCenter = useTransform(progress, [0, 0.1], [0, 1]);
  const layer1Scale = useTransform(progress, [0.05, 0.4], [0.3, 1]);
  const layer1Opacity = useTransform(progress, [0.1, 0.3], [0, 1]);
  const layer2Scale = useTransform(progress, [0.15, 0.5], [0.3, 1]);
  const layer2Opacity = useTransform(progress, [0.2, 0.4], [0, 1]);
  const layer3Scale = useTransform(progress, [0.25, 0.6], [0.3, 1]);
  const layer3Opacity = useTransform(progress, [0.3, 0.5], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[400vh] bg-black z-20 contain-layout contain-paint contain-size"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-black transform-gpu will-change-transform [backface-visibility:hidden]">

        <div className="relative w-full max-w-7xl h-[80vh] px-6 md:px-10">
          <div className="grid grid-cols-5 grid-rows-3 gap-4 md:gap-8 h-full w-full">

            {/* LAYER 1 — AI & Tech */}
            <motion.div
              style={{ scale: layer1Scale, opacity: layer1Opacity }}
              className="absolute inset-0 grid grid-cols-5 grid-rows-3 gap-4 md:gap-8 pointer-events-none px-6 md:px-10 transform-gpu will-change-transform"
            >
              <Img c="col-start-1 row-start-1" src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400" alt="AI Technology" />
              <Img c="col-start-5 row-start-1" src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400" alt="Online Learning" />
              <Img c="col-start-1 row-start-3" src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400" alt="Students Studying" />
              <Img c="col-start-5 row-start-3" src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400" alt="Job Interview" />
            </motion.div>

            {/* LAYER 2 — Career & Growth */}
            <motion.div
              style={{ scale: layer2Scale, opacity: layer2Opacity }}
              className="absolute inset-0 grid grid-cols-5 grid-rows-3 gap-4 md:gap-8 pointer-events-none px-6 md:px-10 transform-gpu will-change-transform"
            >
              <Img c="col-start-2 row-start-1" src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400" alt="Resume Writing" />
              <Img c="col-start-4 row-start-1" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400" alt="Professional Woman" />
              <Img c="col-start-2 row-start-3" src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400" alt="Team Meeting" />
              <Img c="col-start-4 row-start-3" src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400" alt="Skill Development" />
            </motion.div>

            {/* LAYER 3 — India & Youth */}
            <motion.div
              style={{ scale: layer3Scale, opacity: layer3Opacity }}
              className="absolute inset-0 grid grid-cols-5 grid-rows-3 gap-4 md:gap-8 pointer-events-none px-6 md:px-10 transform-gpu will-change-transform"
            >
              <Img c="col-start-3 row-start-1" src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400" alt="Collaboration" />
              <Img c="col-start-3 row-start-3" src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=400" alt="Career Growth" />
            </motion.div>

            {/* MAIN IMAGE */}
            <motion.div
              style={{ scale: scaleCenter, opacity: opacityCenter }}
              className="col-start-3 row-start-2 z-20 transform-gpu will-change-transform"
            >
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
                className="w-full aspect-[4/5] object-cover rounded-xl shadow-2xl border-2 border-cyan-400/20"
                loading="lazy"
                decoding="async"
                alt="Young Professional"
              />
            </motion.div>
          </div>
        </div>

        <div className="absolute top-20 left-10 z-30 pointer-events-none">
          <h2 className="text-white text-6xl md:text-9xl font-black uppercase leading-[0.8] tracking-tighter">
            Your<br />Future.
          </h2>
        </div>

      </div>
    </section>
  );
}

function Img({ src, c, alt }: { src: string; c: string; alt?: string }) {
  return (
    <div className={c}>
      <img
        src={src}
        loading="lazy"
        decoding="async"
        className="w-full aspect-[4/5] object-cover rounded-xl border border-cyan-400/10 will-change-transform"
        alt={alt || ""}
      />
    </div>
  );
}