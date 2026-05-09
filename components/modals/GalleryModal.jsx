"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Modal from "./Modal";
import { memories } from "@/lib/content";

export default function GalleryModal({ open, onClose }) {
  const [active, setActive] = useState(null);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Memory Gallery"
      subtitle="snapshots, frozen in time"
      maxWidth="max-w-5xl"
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {memories.map((m, i) => (
          <motion.button
            key={i}
            onClick={() => setActive(m)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
            whileHover={{ y: -4, rotate: i % 2 ? 1 : -1 }}
            className="group relative bg-white/5 rounded-xl overflow-hidden border border-white/10 shadow-glowPlum"
          >
            <div className="aspect-[4/5] bg-gradient-to-br from-plum-500/40 to-rose-glow/30 grid place-items-center">
              <img
                src={m.src}
                alt={m.caption}
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            </div>
            <p className="text-center font-serif italic text-sm text-white/80 px-3 py-2">
              {m.caption}
            </p>
          </motion.button>
        ))}
      </div>

      {active && (
        <motion.div
          className="mt-8 glass-warm rounded-2xl p-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="font-script text-3xl text-gold-200 text-glow-warm">
            more mememories in the making...
          </p>
        </motion.div>
      )}
    </Modal>
  );
}
