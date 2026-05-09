"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "./Modal";
import { openWhenLetters } from "@/lib/content";

export default function OpenWhenModal({ open, onClose }) {
  const [opened, setOpened] = useState({}); // index -> boolean

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Open When…"
      subtitle="for the days I can't be next to you"
      maxWidth="max-w-4xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {openWhenLetters.map((l, i) => {
          const isOpen = !!opened[i];
          return (
            <button
              key={i}
              onClick={() => setOpened((s) => ({ ...s, [i]: !s[i] }))}
              className="text-left relative group"
            >
              <motion.div
                whileHover={{ y: -3 }}
                className="glass rounded-2xl p-6 min-h-[160px] relative overflow-hidden"
              >
                <p className="font-script text-2xl text-gold-200 text-glow-warm">
                  {l.when}
                </p>
                <div className="mt-3 h-px w-12 bg-gradient-to-r from-gold-300 to-transparent" />
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.p
                      key="body"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="mt-3 font-serif italic text-white/85 leading-relaxed"
                    >
                      {l.body}
                    </motion.p>
                  ) : (
                    <motion.p
                      key="hint"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="mt-3 text-xs tracking-[0.3em] uppercase text-white/40"
                    >
                      tap the envelope to open
                    </motion.p>
                  )}
                </AnimatePresence>
                <span className="absolute top-3 right-3 text-2xl text-rose-glow text-glow-rose">
                  {isOpen ? "💌" : "✉"}
                </span>
              </motion.div>
            </button>
          );
        })}
      </div>
    </Modal>
  );
}
