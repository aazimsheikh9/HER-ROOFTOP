"use client";

import { motion } from "framer-motion";
import Modal from "./Modal";
import { lanternMessages } from "@/lib/content";

export default function LanternModal({ open, onClose, index }) {
  const msg = lanternMessages[index % lanternMessages.length];
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="A whisper inside the lantern"
      subtitle="hidden, just for you"
      maxWidth="max-w-xl"
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-6"
      >
        <div className="text-6xl mb-4">🏮</div>
        <p className="font-script text-3xl md:text-4xl text-gold-200 text-glow-warm">
          {msg}
        </p>
        <p className="mt-6 text-xs tracking-[0.4em] uppercase text-white/45">
          tap the next lantern for another ✨
        </p>
      </motion.div>
    </Modal>
  );
}
