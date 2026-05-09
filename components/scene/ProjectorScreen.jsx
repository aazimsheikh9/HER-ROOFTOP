"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Hotspot from "./Hotspot";

export default function ProjectorScreen({ onClick }) {
  const screenRef = useRef();

  const tex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 288;
    const g = c.getContext("2d");
    const grad = g.createLinearGradient(0, 0, 0, 288);
    grad.addColorStop(0, "#1a1240");
    grad.addColorStop(1, "#3b2a66");
    g.fillStyle = grad;
    g.fillRect(0, 0, 512, 288);
    g.fillStyle = "rgba(255,217,138,0.9)";
    g.font = "italic 38px serif";
    g.textAlign = "center";
    g.fillText("our future, loading…", 256, 150);
    g.font = "20px sans-serif";
    g.fillStyle = "rgba(255,255,255,0.55)";
    g.fillText("(click to open)", 256, 200);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);

  useFrame(({ clock }) => {
    if (!screenRef.current) return;
    screenRef.current.material.emissiveIntensity =
      0.45 + Math.sin(clock.getElapsedTime() * 0.8) * 0.1;
  });

  return (
    <Hotspot onClick={onClick}>
      <group position={[-7.4, 1.4, -3.2]} rotation={[0, 0.6, 0]}>
        {/* Frame */}
        <mesh>
          <boxGeometry args={[2.2, 1.3, 0.04]} />
          <meshStandardMaterial color="#1a1240" />
        </mesh>
        {/* Screen */}
        <mesh ref={screenRef} position={[0, 0, 0.025]}>
          <planeGeometry args={[2.05, 1.15]} />
          <meshStandardMaterial
            map={tex}
            emissive="#a98ff0"
            emissiveIntensity={0.5}
            emissiveMap={tex}
            toneMapped={false}
          />
        </mesh>
        {/* Stand */}
        <mesh position={[0, -1.0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.8, 8]} />
          <meshStandardMaterial color="#3b2a66" />
        </mesh>
        <mesh position={[0, -1.4, 0]}>
          <boxGeometry args={[0.7, 0.04, 0.4]} />
          <meshStandardMaterial color="#3b2a66" />
        </mesh>
      </group>
    </Hotspot>
  );
}
