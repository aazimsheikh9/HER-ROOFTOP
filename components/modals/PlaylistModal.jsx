"use client";

import { motion } from "framer-motion";
import Modal from "./Modal";
import { playlist } from "@/lib/content";
import { useAudio } from "../audio/AudioProvider";

export default function PlaylistModal({ open, onClose }) {
  const { musicOn, toggleMusic } = useAudio();
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Our Songs"
      subtitle="a playlist that sounds like us"
      maxWidth="max-w-2xl"
    >
      <div className="mb-5 flex items-center justify-between">
        <p className="font-serif italic text-white/70">
          press play. close your eyes. I'll meet you on the rooftop.
        </p>
        <button
          onClick={toggleMusic}
          className="px-4 py-2 rounded-full glass-warm text-[10px] tracking-[0.3em] uppercase text-gold-200 hover:scale-105 transition"
        >
          {musicOn ? "pause" : "play"} ♪
        </button>
      </div>
      <ul className="divide-y divide-white/5">
        {playlist.map((s, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-baseline gap-4 py-3"
          >
            <span className="font-script text-2xl text-gold-300 w-8 text-right">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex-1">
              <p className="font-serif text-lg text-white/90">
                {s.title}{" "}
                <span className="text-white/40 italic">— {s.artist}</span>
              </p>
              <p className="text-xs tracking-[0.2em] uppercase text-gold-300/70">
                {s.note}
              </p>
            </div>
          </motion.li>
        ))}
      </ul>
    </Modal>
  );
}
