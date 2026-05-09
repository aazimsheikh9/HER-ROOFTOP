"use client";

import { useMemo } from "react";
import * as THREE from "three";
import Hotspot from "./Hotspot";

/**
 * A small wooden frame with several polaroid photos pinned by string lights.
 * Each polaroid is a tiny mesh with a CanvasTexture placeholder.
 */
function makePolaroidTexture(label) {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 320;
  const g = c.getContext("2d");
  g.fillStyle = "#fff8ec";
  g.fillRect(0, 0, 256, 320);
  // photo area
  const grad = g.createLinearGradient(0, 0, 0, 240);
  const palettes = [
    ["#6d4dc7", "#ff8da1"],
    ["#3a2960", "#ffd98a"],
    ["#5b3f8a", "#ffae3c"],
    ["#0c0826", "#ff8da1"],
    ["#a98ff0", "#ffe9b8"],
  ];
  const [a, b] = palettes[Math.floor(Math.random() * palettes.length)];
  grad.addColorStop(0, a);
  grad.addColorStop(1, b);
  g.fillStyle = grad;
  g.fillRect(16, 16, 224, 224);

  // a few star/heart sparkles
  for (let i = 0; i < 30; i++) {
    g.fillStyle = `rgba(255,255,255,${Math.random() * 0.5})`;
    g.fillRect(16 + Math.random() * 224, 16 + Math.random() * 224, 1.5, 1.5);
  }

  // caption
  g.fillStyle = "#3a2960";
  g.font = "italic 22px serif";
  g.textAlign = "center";
  g.fillText(label, 128, 290);

  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function Polaroid({ position, rotation, label }) {
  const tex = useMemo(() => makePolaroidTexture(label), [label]);
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={[0.5, 0.62, 0.02]} />
        <meshStandardMaterial map={tex} />
      </mesh>
      {/* clip */}
      <mesh position={[0, 0.32, 0.012]}>
        <boxGeometry args={[0.06, 0.04, 0.02]} />
        <meshStandardMaterial color="#bdb3c6" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  );
}

export default function PolaroidWall({ onClick }) {
  const items = [
    { p: [-0.9, 1.7, 0.01], r: [0, 0, -0.08], l: "us, april" },
    { p: [-0.3, 1.85, 0.01], r: [0, 0, 0.05], l: "your laugh" },
    { p: [0.35, 1.7, 0.01], r: [0, 0, -0.04], l: "first trip" },
    { p: [0.95, 1.85, 0.01], r: [0, 0, 0.09], l: "rainy day" },
    { p: [-0.6, 1.15, 0.01], r: [0, 0, 0.06], l: "you ❤" },
    { p: [0.05, 1.05, 0.01], r: [0, 0, -0.05], l: "movie night" },
    { p: [0.7, 1.15, 0.01], r: [0, 0, 0.03], l: "sunset" },
  ];

  return (
    <Hotspot onClick={onClick}>
      <group position={[6.4, 0.2, -2.2]} rotation={[0, -0.6, 0]}>
        {/* Backing board */}
        <mesh position={[0, 1.5, 0]}>
          <boxGeometry args={[2.6, 1.9, 0.04]} />
          <meshStandardMaterial color="#2a1f55" />
        </mesh>
        {/* Frame */}
        <mesh position={[0, 1.5, 0.022]}>
          <boxGeometry args={[2.7, 2.0, 0.02]} />
          <meshStandardMaterial color="#6a4ea3" emissive="#1a1240" emissiveIntensity={0.3} />
        </mesh>

        {/* String of lights along top */}
        <mesh position={[0, 2.55, 0.04]}>
          <boxGeometry args={[2.6, 0.005, 0.005]} />
          <meshBasicMaterial color="#aa9fc1" />
        </mesh>
        {Array.from({ length: 7 }).map((_, i) => (
          <mesh key={i} position={[-1.2 + i * 0.4, 2.5, 0.05]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshBasicMaterial color="#ffd98a" toneMapped={false} />
          </mesh>
        ))}

        {items.map((it, i) => (
          <Polaroid key={i} position={it.p} rotation={it.r} label={it.l} />
        ))}

        {/* Soft light wash on the wall */}
        <pointLight position={[0, 1.6, 0.6]} intensity={0.5} color="#ffd98a" distance={4} decay={2} />
      </group>
    </Hotspot>
  );
}
