"use client";

import { useMemo } from "react";
import * as THREE from "three";

/**
 * Procedural city silhouette with twinkling windows.
 * Two layers for depth.
 */
export default function CitySkyline() {
  const buildings = useMemo(() => {
    const arr = [];
    let x = -28;
    while (x < 28) {
      const w = 1.2 + Math.random() * 2.2;
      const h = 2.5 + Math.random() * 5.5;
      arr.push({ x: x + w / 2, w, h });
      x += w + 0.05;
    }
    return arr;
  }, []);

  const farBuildings = useMemo(() => {
    const arr = [];
    let x = -32;
    while (x < 32) {
      const w = 1 + Math.random() * 1.5;
      const h = 1.8 + Math.random() * 3;
      arr.push({ x: x + w / 2, w, h });
      x += w + 0.04;
    }
    return arr;
  }, []);

  const windowTex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 256;
    c.height = 512;
    const g = c.getContext("2d");
    g.fillStyle = "#0a0626";
    g.fillRect(0, 0, 256, 512);
    for (let y = 30; y < 500; y += 18) {
      for (let x = 12; x < 244; x += 16) {
        if (Math.random() > 0.55) {
          const warm = Math.random() > 0.3;
          g.fillStyle = warm
            ? `rgba(255,210,140,${0.4 + Math.random() * 0.6})`
            : `rgba(180,200,255,${0.25 + Math.random() * 0.5})`;
          g.fillRect(x, y, 6, 9);
        }
      }
    }
    const t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);

  return (
    <group>
      {/* Far layer */}
      <group position={[0, 0, -22]}>
        {farBuildings.map((b, i) => (
          <mesh key={`f-${i}`} position={[b.x, b.h / 2 + 0.2, 0]}>
            <boxGeometry args={[b.w, b.h, 0.6]} />
            <meshBasicMaterial color="#0d0930" />
          </mesh>
        ))}
      </group>

      {/* Near layer with windows */}
      <group position={[0, 0, -16]}>
        {buildings.map((b, i) => (
          <group key={`n-${i}`} position={[b.x, b.h / 2 + 0.2, 0]}>
            <mesh>
              <boxGeometry args={[b.w, b.h, 0.8]} />
              <meshStandardMaterial
                color="#0c0826"
                emissive="#1a1240"
                emissiveIntensity={0.25}
              />
            </mesh>
            <mesh position={[0, 0, 0.41]}>
              <planeGeometry args={[b.w * 0.92, b.h * 0.92]} />
              <meshBasicMaterial
                map={windowTex}
                transparent
                opacity={0.9}
                toneMapped={false}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* Soft city glow */}
      <mesh position={[0, 1.6, -15.9]}>
        <planeGeometry args={[70, 6]} />
        <meshBasicMaterial
          color="#ffae3c"
          transparent
          opacity={0.1}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
