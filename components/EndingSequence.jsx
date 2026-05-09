"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const COLORS = ["#ffd98a", "#ff8da1", "#a98ff0", "#ffae3c", "#fff5e1"];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.55, delayChildren: 0.6 },
  },
};

const lineVariant = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function EndingSequence({ onClose }) {
  const canvasRef = useRef(null);

  /* ── canvas fireworks (pure imperative, no GSAP) ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = [];

    function spawnFirework(x, y) {
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const N = 60 + Math.floor(Math.random() * 40);
      for (let i = 0; i < N; i++) {
        const a = Math.random() * Math.PI * 2;
        const v = 2 + Math.random() * 4;
        particles.push({
          x, y,
          vx: Math.cos(a) * v,
          vy: Math.sin(a) * v,
          life: 1,
          color,
          size: 1.5 + Math.random() * 2,
        });
      }
    }

    let raf;
    let nextFw = 0.3;
    const start = performance.now();

    const loop = () => {
      const t = (performance.now() - start) / 1000;

      ctx.fillStyle = "rgba(7,4,23,0.18)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (t > nextFw) {
        spawnFirework(
          canvas.width * (0.15 + Math.random() * 0.7),
          canvas.height * (0.1 + Math.random() * 0.45)
        );
        nextFw = t + 0.45 + Math.random() * 0.6;
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04;
        p.vx *= 0.99;
        p.vy *= 0.99;
        p.life -= 0.012;
        if (p.life <= 0) { particles.splice(i, 1); continue; }
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  /* ── floating hearts — stable random values ── */
  const hearts = useRef(
    Array.from({ length: 22 }).map(() => ({
      left: Math.random() * 100,
      dur: 8 + Math.random() * 8,
      delay: Math.random() * 6,
      size: 14 + Math.random() * 22,
      drift: (Math.random() - 0.5) * 60,
    }))
  ).current;

  return (
    <motion.div
      className="fixed inset-0 z-[95] overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at center, #1d1551 0%, #0c0826 55%, #050315 100%)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.2 } }}
    >
      {/* Fireworks canvas */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Floating hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {hearts.map((h, i) => (
          <motion.span
            key={i}
            className="absolute"
            style={{
              left: `${h.left}%`,
              bottom: "-10%",
              fontSize: h.size,
              color: "#ff8da1",
              filter: "drop-shadow(0 0 10px rgba(255,141,161,0.7))",
            }}
            animate={{
              y: ["0%", "-130vh"],
              x: ["0px", `${h.drift}px`],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: h.dur,
              delay: h.delay,
              ease: "easeOut",
              repeat: Infinity,
            }}
          >
            ❤
          </motion.span>
        ))}
      </div>

      {/* Text — pure Framer Motion stagger */}
      <motion.div
        className="relative z-10 h-full w-full flex flex-col items-center justify-center text-center px-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p
          variants={lineVariant}
          className="text-xs md:text-sm tracking-[0.5em] uppercase text-white/60"
        >
          one last thing —
        </motion.p>

        <motion.h2
          variants={lineVariant}
          className="mt-8 font-script text-4xl md:text-6xl text-gold-200 text-glow-warm leading-tight max-w-3xl"
        >
          No matter how big this world is,
        </motion.h2>

        <motion.h2
          variants={lineVariant}
          className="mt-3 font-script text-4xl md:text-6xl text-rose-glow text-glow-rose leading-tight max-w-3xl"
        >
          my favorite place will always be beside you.
        </motion.h2>

        <motion.p
          variants={lineVariant}
          className="mt-12 font-serif italic text-white/75 text-lg max-w-md"
        >
          happy birthday, my Zainab. tonight, tomorrow, every night after that.
        </motion.p>

        <motion.button
          variants={lineVariant}
          onClick={onClose}
          className="mt-12 px-8 py-3 rounded-full glass-warm text-gold-200 text-xs tracking-[0.3em] uppercase hover:scale-105 transition"
        >
          back to the rooftop ↩
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
