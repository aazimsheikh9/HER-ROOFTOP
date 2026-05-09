"use client";

import { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";

const AudioCtx = createContext(null);

export function useAudio() {
  return useContext(AudioCtx);
}

export default function AudioProvider({ children }) {
  const ambientRef = useRef(null);
  const musicRef = useRef(null);
  const [musicOn, setMusicOn] = useState(false);
  const [ambientOn, setAmbientOn] = useState(false);

  // Set up audio elements only on the client
  useEffect(() => {
    // Lightweight optional placeholders — files dropped into /public/audio
    ambientRef.current = new Audio("/audio/ambient.mp3");
    ambientRef.current.loop = true;
    ambientRef.current.volume = 0.25;

    musicRef.current = new Audio("/audio/music.mp3");
    musicRef.current.loop = true;
    musicRef.current.volume = 0.45;

    // Suppress noisy "no source" errors if files aren't placed yet
    const onErr = () => {};
    ambientRef.current.addEventListener("error", onErr);
    musicRef.current.addEventListener("error", onErr);

    return () => {
      ambientRef.current?.pause();
      musicRef.current?.pause();
    };
  }, []);

  const tryPlay = (el) => el?.play().catch(() => {});

  const toggleMusic = useCallback(() => {
    if (!musicRef.current) return;
    if (musicOn) {
      musicRef.current.pause();
      setMusicOn(false);
    } else {
      tryPlay(musicRef.current);
      setMusicOn(true);
    }
  }, [musicOn]);

  const toggleAmbient = useCallback(() => {
    if (!ambientRef.current) return;
    if (ambientOn) {
      ambientRef.current.pause();
      setAmbientOn(false);
    } else {
      tryPlay(ambientRef.current);
      setAmbientOn(true);
    }
  }, [ambientOn]);

  const value = { musicOn, toggleMusic, ambientOn, toggleAmbient };

  return <AudioCtx.Provider value={value}>{children}</AudioCtx.Provider>;
}
