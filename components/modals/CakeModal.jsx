"use client";

import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Modal from "./Modal";

const COLORS = ["#ffd98a", "#ff8da1", "#a98ff0", "#ffae3c", "#fff5e1", "#c97a87"];

export default function CakeModal({ open, onClose }) {
  // Generate confetti pieces fresh each time the modal opens
  const confetti = useMemo(() => {
    if (!open) return [];
    return Array.from({ length: 80 }).map(() => ({
      x: Math.random() * 100,
      delay: Math.random() * 0.6,
      duration: 1.6 + Math.random() * 1.2,
      rot: Math.random() * 360,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 6 + Math.random() * 8,
    }));
  }, [open]);

  useEffect(() => {
    if (!open) return;
    // gentle vibration on supported devices
    if (navigator.vibrate) navigator.vibrate([10, 30, 10]);
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Make a wish, my love"
      subtitle="your year starts now"
      maxWidth="max-w-2xl"
    >
      {/* Confetti layer */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
        {confetti.map((c, i) => (
          <motion.span
            key={i}
            className="absolute rounded-sm"
            style={{
              left: `${c.x}%`,
              top: "-10%",
              width: c.size,
              height: c.size * 0.4,
              background: c.color,
              transform: `rotate(${c.rot}deg)`,
            }}
            animate={{
              y: ["-10%", "120%"],
              rotate: [c.rot, c.rot + 360],
            }}
            transition={{
              delay: c.delay,
              duration: c.duration,
              ease: "easeIn",
              repeat: Infinity,
              repeatDelay: 1.4,
            }}
          />
        ))}
      </div>

      <div className="relative text-center py-6">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-7xl mb-4"
        >
          🎂
        </motion.div>
        <p className="font-script text-4xl md:text-5xl text-gold-200 text-glow-warm">
          Happy Birthday, Zainu, My love <span className="text-rose-glow text-glow-rose">❤</span>
        </p>
        <p className="mt-4 font-serif italic text-white/80 max-w-md mx-auto">
          another year of you. another year of getting to love you. that's all I ever wanted.
        </p>
        <p className="mt-6 text-xs tracking-[0.4em] uppercase text-white/50">
          blow out the candle, make a wish ✨
        </p>
      </div>
    </Modal>
  );
}
