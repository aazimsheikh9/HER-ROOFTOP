"use client";

import { motion } from "framer-motion";
import Modal from "./Modal";

export default function EasterEggModal({ open, onClose }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="you found it ✦"
      subtitle="the tiny secret"
      maxWidth="max-w-md"
    >
      <motion.div
        initial={{ scale: 0.7, rotate: -8, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-center py-4"
      >
        <div className="text-6xl mb-4">💌</div>
        <p className="font-script text-3xl text-rose-glow text-glow-rose">
          knew you'd find it.
        </p>
        <p className="font-serif italic text-white/80 mt-3 leading-relaxed">
          you've always been the kind of person who notices small things. that's one of the
          thousand reasons I love you.
        </p>
      </motion.div>
    </Modal>
  );
}
