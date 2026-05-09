"use client";

import { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";

import LoadingScreen from "./LoadingScreen";
import IntroOverlay from "./IntroOverlay";
import Hud from "./ui/Hud";
import ModalRouter from "./modals/ModalRouter";
import EndingSequence from "./EndingSequence";
import EasterEgg from "./EasterEgg";
import AudioProvider from "./audio/AudioProvider";

// 3D scene is heavy — load on the client only
const RooftopScene = dynamic(() => import("./scene/RooftopScene"), {
  ssr: false,
});

export default function Experience() {
  const [phase, setPhase] = useState("loading"); // loading -> intro -> scene -> ending
  const [activeModal, setActiveModal] = useState(null);
  const [magicMode, setMagicMode] = useState(false); // moon-clicked star storm
  const [endingOpen, setEndingOpen] = useState(false);

  const openModal = useCallback((id) => setActiveModal(id), []);
  const closeModal = useCallback(() => setActiveModal(null), []);

  // After loading, show intro overlay for ~3.4s, then dissolve into the scene
  useEffect(() => {
    if (phase === "intro") {
      const t = setTimeout(() => setPhase("scene"), 3400);
      return () => clearTimeout(t);
    }
  }, [phase]);

  const sceneMounted = phase === "intro" || phase === "scene";

  return (
    <AudioProvider>
      <AnimatePresence>
        {phase === "loading" && (
          <LoadingScreen
            key="loading"
            onReady={() => setPhase("intro")}
          />
        )}
      </AnimatePresence>

      {sceneMounted && (
        <div className="relative w-full h-screen">
          <RooftopScene
            onObjectClick={openModal}
            magicMode={magicMode}
            onMoonClick={() => setMagicMode((m) => !m)}
          />

          {phase === "scene" && (
            <>
              <Hud
                onOpen={openModal}
                onFinale={() => setEndingOpen(true)}
              />
              <EasterEgg onFound={() => openModal("easter")} />
            </>
          )}

          <div className="vignette" />

          <AnimatePresence>
            {phase === "intro" && <IntroOverlay key="intro" />}
          </AnimatePresence>
        </div>
      )}

      <AnimatePresence>
        {endingOpen && (
          <EndingSequence
            key="ending"
            onClose={() => setEndingOpen(false)}
          />
        )}
      </AnimatePresence>

      <ModalRouter activeModal={activeModal} onClose={closeModal} />
    </AudioProvider>
  );
}
