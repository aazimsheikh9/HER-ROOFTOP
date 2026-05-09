"use client";

import { motion } from "framer-motion";
import Modal from "./Modal";
import { loveNotes } from "@/lib/content";

export default function LoveNotesModal({ open, onClose }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Love Notes"
      subtitle="things I've wanted to say out loud"
      maxWidth="max-w-3xl"
    >
      <div className="space-y-5">
        {loveNotes.map((n, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08, duration: 0.55 }}
            className="glass-warm rounded-2xl p-6"
          >
            <p className="font-script text-2xl md:text-3xl text-gold-200 text-glow-warm mb-3">
              {n.title}
            </p>
            <p className="font-serif italic text-white/85 leading-relaxed">
              {n.body}
            </p>
            <div className="mt-4 text-right text-xs tracking-[0.3em] uppercase text-white/40">
              — yours, always
            </div>
          </motion.div>
        ))}
      </div>
    </Modal>
  );
}
