"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => setVisible(false), 2500);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!visible) document.body.style.overflow = "";
  }, [visible]);

  const letters = "LOADING".split("");

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{
            position: "fixed",
            inset: 0,
            background: "#000",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            willChange: "opacity",
            transform: "translateZ(0)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                animate={{
                  opacity: [1, 0.15, 1],
                  scale: [1, 0.85, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                  delay: i * 0.15,
                }}
                style={{
                  display: "inline-block",
                  color: "#fff",
                  fontFamily: "'Quattrocento Sans', sans-serif",
                  fontSize: "1.1rem",
                  letterSpacing: "0.25em",
                  willChange: "opacity, transform",
                  transform: "translateZ(0)",
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Quattrocento+Sans&display=swap');
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
