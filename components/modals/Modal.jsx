"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function Modal({ open, onClose, title, subtitle, children, maxWidth = "max-w-3xl" }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center px-4 py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className={`relative glass rounded-3xl w-full ${maxWidth} max-h-[88vh] overflow-y-auto p-6 md:p-10 shadow-glowPlum`}
          >
            <button
              onClick={onClose}
              aria-label="close"
              className="absolute top-4 right-4 w-9 h-9 rounded-full glass text-white/70 hover:text-gold-200 hover:scale-110 transition grid place-items-center text-lg"
            >
              ×
            </button>
            <div className="mb-6">
              {subtitle && (
                <p className="text-[10px] tracking-[0.4em] uppercase text-gold-300/70 mb-2">
                  {subtitle}
                </p>
              )}
              <h2 className="font-script text-4xl md:text-5xl text-gold-200 text-glow-warm">
                {title}
              </h2>
              <div className="h-px w-24 bg-gradient-to-r from-gold-300 to-transparent mt-4" />
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
