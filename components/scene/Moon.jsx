"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Moon({ onClick }) {
  const moonRef = useRef();
  const haloRef = useRef();
  const reflRef = useRef();
  const [hovered, setHovered] = useState(false);

  const moonTex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const g = c.getContext("2d");
    const grad = g.createRadialGradient(120, 110, 30, 128, 128, 130);
    grad.addColorStop(0, "#fff8dc");
    grad.addColorStop(1, "#f5e0b6");
    g.fillStyle = grad;
    g.fillRect(0, 0, 256, 256);
    // craters
    for (let i = 0; i < 14; i++) {
      const x = 60 + Math.random() * 130;
      const y = 60 + Math.random() * 130;
      const r = 4 + Math.random() * 14;
      const cg = g.createRadialGradient(x - 1, y - 1, 0, x, y, r);
      cg.addColorStop(0, "rgba(160,140,100,0.35)");
      cg.addColorStop(1, "rgba(160,140,100,0)");
      g.fillStyle = cg;
      g.beginPath();
      g.arc(x, y, r, 0, Math.PI * 2);
      g.fill();
    }
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (haloRef.current) {
      const target = hovered ? 1.4 : 1.0;
      haloRef.current.scale.lerp(
        new THREE.Vector3(target, target, 1).multiplyScalar(5.2),
        0.06
      );
      haloRef.current.material.opacity =
        0.35 + Math.sin(t * 1.4) * 0.08 + (hovered ? 0.2 : 0);
    }
    if (reflRef.current) {
      reflRef.current.material.opacity = 0.18 + Math.sin(t * 0.8) * 0.04;
    }
  });

  return (
    <group position={[-9, 9, -18]}>
      {/* Halo */}
      <sprite ref={haloRef} scale={[5.2, 5.2, 1]}>
        <spriteMaterial
          color="#ffd98a"
          transparent
          opacity={0.35}
          depthWrite={false}
        />
      </sprite>

      {/* Moon */}
      <mesh
        ref={moonRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.();
        }}
      >
        <sphereGeometry args={[1.3, 48, 48]} />
        <meshBasicMaterial map={moonTex} toneMapped={false} />
      </mesh>

      {/* Soft moonlight pool on the rooftop floor — ground reflection */}
      <mesh ref={reflRef} rotation={[-Math.PI / 2, 0, 0]} position={[5.5, -8.95, 9]}>
        <circleGeometry args={[3.2, 32]} />
        <meshBasicMaterial color="#cdb8ff" transparent opacity={0.18} depthWrite={false} />
      </mesh>
    </group>
  );
}
