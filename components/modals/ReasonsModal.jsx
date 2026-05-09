"use client";

import { motion } from "framer-motion";
import Modal from "./Modal";
import { reasons } from "@/lib/content";

export default function ReasonsModal({ open, onClose }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="100 Reasons Why I Love You"
      subtitle="and counting, always"
      maxWidth="max-w-4xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 max-h-[60vh] overflow-y-auto pr-2">
        {reasons.map((r, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: (i % 20) * 0.02 }}
            className="font-serif italic text-white/85 leading-relaxed flex gap-3 py-1.5"
          >
            <span className="text-gold-300 font-script text-lg w-8 shrink-0 text-right">
              {String(i + 1).padStart(3, "0")}
            </span>
            <span>{r}</span>
          </motion.p>
        ))}
      </div>
      <p className="mt-6 text-center font-script text-2xl text-rose-glow text-glow-rose">
        and tomorrow I'll think of more.
      </p>
    </Modal>
  );
}
