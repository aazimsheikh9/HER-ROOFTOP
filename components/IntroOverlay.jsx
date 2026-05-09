"use client";

import { motion } from "framer-motion";

export default function IntroOverlay() {
  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center"
      style={{
        background:
          "radial-gradient(ellipse at center, rgba(29,21,81,0.55) 0%, rgba(7,4,23,0.95) 70%)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.6, ease: "easeInOut" } }}
    >
      <div className="text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "0.05em" }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="font-serif text-xl md:text-2xl text-white/70 italic"
        >
          for the only person who feels like home,
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 1.6, ease: "easeOut" }}
          className="mt-6 font-script text-6xl md:text-8xl text-gold-200 text-glow-warm"
        >
          Happy Birthday, Zainu <span className="text-rose-glow text-glow-rose">❤</span>
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.2, duration: 1.4, ease: "easeOut" }}
          className="mx-auto mt-10 h-px w-40 bg-gradient-to-r from-transparent via-gold-300 to-transparent origin-center"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1.4 }}
          className="mt-8 text-sm tracking-[0.4em] uppercase text-white/60"
        >
          a tiny rooftop, just for tonight
        </motion.p>
      </div>
    </motion.div>
  );
}
