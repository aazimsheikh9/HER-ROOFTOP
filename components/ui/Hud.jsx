"use client";

import { motion } from "framer-motion";
import { useAudio } from "../audio/AudioProvider";

const NAV = [
  { id: "gallery", label: "memories" },
  { id: "notes", label: "love notes" },
  { id: "openwhen", label: "open when…" },
  { id: "playlist", label: "our songs" },
  { id: "reasons", label: "100 reasons" },
  { id: "dreams", label: "future dreams" },
];

export default function Hud({ onOpen, onFinale }) {
  const { musicOn, toggleMusic, ambientOn, toggleAmbient } = useAudio();

  return (
    <>
      {/* Top-left title */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1.2 }}
        className="fixed top-5 left-5 md:top-7 md:left-8 z-30 pointer-events-none"
      >
        <p className="font-script text-2xl md:text-3xl text-gold-200 text-glow-warm">
          For Zainu <span className="text-rose-glow text-glow-rose">❤</span>
        </p>
        <p className="text-[10px] md:text-xs tracking-[0.35em] uppercase text-white/55 mt-1">
          a rooftop in the stars
        </p>
      </motion.div>

      {/* Top-right audio + finale */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1.2 }}
        className="fixed top-5 right-5 md:top-7 md:right-8 z-30 flex items-center gap-2"
      >
        <ToggleChip on={ambientOn} onClick={toggleAmbient} label="city sounds" />
        <ToggleChip on={musicOn} onClick={toggleMusic} label={musicOn ? "music ◐" : "music"} />
        <button
          onClick={onFinale}
          className="px-4 py-2 rounded-full glass-warm text-[10px] tracking-[0.3em] uppercase text-gold-200 hover:scale-105 transition"
        >
          finale ✨
        </button>
      </motion.div>

      {/* Bottom floating nav */}
      <motion.nav
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 1.2 }}
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-30 max-w-[95vw]"
      >
        <div className="glass rounded-full px-3 py-2 flex flex-wrap gap-1 justify-center">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => onOpen(n.id)}
              className="px-3 md:px-4 py-2 rounded-full text-[10px] md:text-xs tracking-[0.25em] uppercase text-white/75 hover:text-gold-200 hover:bg-white/5 transition"
            >
              {n.label}
            </button>
          ))}
        </div>
      </motion.nav>

      {/* Bottom-right hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 1.4 }}
        className="hidden md:block fixed bottom-24 right-6 z-30 text-[10px] tracking-[0.3em] uppercase text-white/40 max-w-[180px] text-right"
      >
        tap the moon… <br/> tap the cake, the telescope, lanterns ✨
      </motion.p>
    </>
  );
}

function ToggleChip({ on, onClick, label }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded-full text-[10px] tracking-[0.3em] uppercase transition ${
        on
          ? "glass-warm text-gold-200"
          : "glass text-white/60 hover:text-gold-200"
      }`}
    >
      {label}
    </button>
  );
}
