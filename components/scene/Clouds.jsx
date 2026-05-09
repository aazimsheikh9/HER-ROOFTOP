"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Soft drifting cloud puffs — flat planes with radial gradient material.
 */
export default function Clouds() {
  const groupRef = useRef();

  const clouds = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      x: -25 + Math.random() * 50,
      y: 10 + Math.random() * 6,
      z: -22 - Math.random() * 8,
      scale: 4 + Math.random() * 6,
      speed: 0.08 + Math.random() * 0.08,
      opacity: 0.15 + Math.random() * 0.18,
    }));
  }, []);

  const tex = useMemo(() => {
    // Build a radial gradient cloud texture in canvas (no external asset needed)
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const g = c.getContext("2d");
    const grad = g.createRadialGradient(128, 128, 16, 128, 128, 120);
    grad.addColorStop(0, "rgba(255,255,255,0.85)");
    grad.addColorStop(0.4, "rgba(180,160,230,0.45)");
    grad.addColorStop(1, "rgba(180,160,230,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 256, 256);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);

  useFrame((_, dt) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child, i) => {
      child.position.x += clouds[i].speed * dt;
      if (child.position.x > 30) child.position.x = -30;
    });
  });

  return (
    <group ref={groupRef}>
      {clouds.map((c, i) => (
        <sprite key={i} position={[c.x, c.y, c.z]} scale={[c.scale, c.scale * 0.55, 1]}>
          <spriteMaterial
            map={tex}
            transparent
            opacity={c.opacity}
            depthWrite={false}
            color="#c9bdf4"
          />
        </sprite>
      ))}
    </group>
  );
}
