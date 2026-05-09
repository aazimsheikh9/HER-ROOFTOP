"use client";

import { motion } from "framer-motion";
import Modal from "./Modal";
import { dreams } from "@/lib/content";

export default function DreamsModal({ open, onClose }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Future Dreams Together"
      subtitle="the rooms we haven't lived in yet"
      maxWidth="max-w-4xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {dreams.map((d, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="glass rounded-2xl p-6 hover:shadow-glowPlum transition"
          >
            <p className="font-script text-2xl text-gold-200 text-glow-warm mb-2">
              {d.title}
            </p>
            <p className="font-serif italic text-white/80 leading-relaxed">
              {d.body}
            </p>
          </motion.div>
        ))}
      </div>
      <p className="mt-8 text-center font-serif italic text-white/70">
        every one of these is a promise.
      </p>
    </Modal>
  );
}
