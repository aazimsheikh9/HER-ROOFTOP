"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen({ onReady }) {
  const [progress, setProgress] = useState(0);
  const [enterReady, setEnterReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    const tick = () => {
      if (!mounted) return;
      setProgress((p) => {
        const next = Math.min(100, p + Math.random() * 9 + 3);
        if (next >= 100) setEnterReady(true);
        return next;
      });
    };
    const id = setInterval(tick, 220);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center px-6 text-center"
      style={{
        background:
          "radial-gradient(ellipse at center, #1d1551 0%, #0c0826 55%, #050315 100%)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.0 } }}
    >
      {/* Faint stars */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 60 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white/80 animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.7 + 0.2,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="relative z-10"
      >
        <p className="font-script text-3xl md:text-5xl text-gold-200 text-glow-warm">
          Preparing a special night
        </p>
        <p className="font-script text-2xl md:text-4xl text-rose-glow text-glow-rose mt-2">
          for someone I love…
        </p>
      </motion.div>

      <div className="relative z-10 mt-12 w-64 md:w-80">
        <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-gold-300 via-rose-glow to-plum-300"
            style={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>
        <p className="mt-3 text-xs tracking-[0.3em] uppercase text-white/50">
          {Math.floor(progress)}%
        </p>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: enterReady ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        disabled={!enterReady}
        onClick={onReady}
        className="relative z-10 mt-10 px-8 py-3 rounded-full glass-warm text-gold-200 text-sm tracking-[0.25em] uppercase hover:scale-105 transition-transform disabled:cursor-not-allowed"
      >
        Step onto the rooftop
      </motion.button>

      <p className="absolute bottom-6 left-0 right-0 text-center text-[10px] tracking-[0.3em] uppercase text-white/30">
        with love, always
      </p>
    </motion.div>
  );
}
