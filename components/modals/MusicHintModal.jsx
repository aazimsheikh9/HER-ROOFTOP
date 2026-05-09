"use client";

import { useEffect } from "react";
import Modal from "./Modal";
import { useAudio } from "../audio/AudioProvider";

export default function MusicHintModal({ open, onClose }) {
  const { musicOn, toggleMusic } = useAudio();

  // When the user clicks the radio, also toggle music immediately
  useEffect(() => {
    if (open) toggleMusic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={musicOn ? "music, on" : "music, paused"}
      subtitle="our little soundtrack"
      maxWidth="max-w-md"
    >
      <p className="font-serif italic text-white/80 leading-relaxed">
        {musicOn
          ? "the radio's on. close your eyes for a second — pretend it's our song. dance with me, even if no one's watching."
          : "the radio is resting now. it'll pick up again whenever you want it to."}
      </p>
    </Modal>
  );
}
