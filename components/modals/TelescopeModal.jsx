"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "./Modal";
import { telescopeQuotes } from "@/lib/content";

export default function TelescopeModal({ open, onClose }) {
  const [idx, setIdx] = useState(0);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Through the Telescope"
      subtitle="zooming into the night sky"
      maxWidth="max-w-2xl"
    >
      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden glass">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, #1d1551 0%, #070417 70%)",
          }}
        />
        {/* tiny stars */}
        {Array.from({ length: 80 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white/80 animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
        {/* lens vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, transparent 35%, rgba(0,0,0,0.85) 75%)",
          }}
        />
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0 grid place-items-center px-8 text-center"
          >
            <p className="font-script text-2xl md:text-4xl text-gold-200 text-glow-warm max-w-md">
              {telescopeQuotes[idx]}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          onClick={() => setIdx((i) => (i - 1 + telescopeQuotes.length) % telescopeQuotes.length)}
          className="px-4 py-2 rounded-full glass text-white/70 hover:text-gold-200 transition text-xs tracking-[0.3em] uppercase"
        >
          ← prev
        </button>
        <button
          onClick={() => setIdx((i) => (i + 1) % telescopeQuotes.length)}
          className="px-4 py-2 rounded-full glass-warm text-gold-200 hover:scale-105 transition text-xs tracking-[0.3em] uppercase"
        >
          next ★
        </button>
      </div>
    </Modal>
  );
}
