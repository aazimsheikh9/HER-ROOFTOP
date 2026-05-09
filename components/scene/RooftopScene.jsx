"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { AdaptiveDpr, AdaptiveEvents, PerformanceMonitor } from "@react-three/drei";
import { useState } from "react";

import SceneCamera from "./SceneCamera";
import Sky from "./Sky";
import CitySkyline from "./CitySkyline";
import Clouds from "./Clouds";
import Rooftop from "./Rooftop";
import FairyLights from "./FairyLights";
import Cushions from "./Cushions";
import CakeTable from "./CakeTable";
import PolaroidWall from "./PolaroidWall";
import Telescope from "./Telescope";
import MusicPlayer from "./MusicPlayer";
import Lanterns from "./Lanterns";
import ProjectorScreen from "./ProjectorScreen";
import Fireflies from "./Fireflies";
import Moon from "./Moon";
import StarNameMagic from "./StarNameMagic";

export default function RooftopScene({ onObjectClick, magicMode, onMoonClick }) {
  const [dpr, setDpr] = useState(1.25);

  return (
    <div className="absolute inset-0">
      <Canvas
        shadows={false}
        dpr={dpr}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 2.6, 9], fov: 45, near: 0.1, far: 200 }}
        onCreated={({ gl }) => {
          gl.setClearColor("#070417");
        }}
      >
        <PerformanceMonitor
          onIncline={() => setDpr(Math.min(1.75, window.devicePixelRatio || 1.5))}
          onDecline={() => setDpr(1)}
        />
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />

        {/* Ambient mood lighting */}
        <color attach="background" args={["#070417"]} />
        <fog attach="fog" args={["#0c0826", 14, 60]} />
        <ambientLight intensity={0.35} color="#a98ff0" />
        <hemisphereLight args={["#a98ff0", "#150f3a", 0.45]} />
        <directionalLight
          position={[-10, 14, -6]}
          intensity={0.8}
          color="#cdb8ff"
        />

        <Suspense fallback={null}>
          <SceneCamera />

          {/* Background layers */}
          <Sky />
          <Clouds />
          <CitySkyline />
          <Moon onClick={onMoonClick} />

          {/* Rooftop foreground */}
          <Rooftop />
          <FairyLights />
          <Cushions />

          <CakeTable onClick={() => onObjectClick("cake")} />
          <PolaroidWall onClick={() => onObjectClick("gallery")} />
          <Telescope onClick={() => onObjectClick("telescope")} />
          <MusicPlayer onClick={() => onObjectClick("music")} />
          <Lanterns onClick={(idx) => onObjectClick(`lantern-${idx}`)} />
          <ProjectorScreen onClick={() => onObjectClick("dreams")} />

          <Fireflies count={48} />

          {magicMode && <StarNameMagic />}
        </Suspense>
      </Canvas>
    </div>
  );
}
