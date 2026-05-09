"use client";

import { useMemo } from "react";
import * as THREE from "three";

export default function Rooftop() {
  const woodTex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 512;
    const g = c.getContext("2d");
    g.fillStyle = "#241a3d";
    g.fillRect(0, 0, 512, 512);
    // plank streaks
    for (let y = 0; y < 512; y += 32) {
      g.fillStyle = `rgba(${30 + Math.random() * 20},${20 + Math.random() * 20},${50 + Math.random() * 25},0.6)`;
      g.fillRect(0, y, 512, 1);
    }
    for (let i = 0; i < 700; i++) {
      g.fillStyle = `rgba(255,217,138,${Math.random() * 0.05})`;
      g.fillRect(Math.random() * 512, Math.random() * 512, 1, 1);
    }
    const t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(4, 4);
    return t;
  }, []);

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[26, 18]} />
        <meshStandardMaterial
          map={woodTex}
          color="#3a2960"
          roughness={0.9}
          metalness={0.05}
        />
      </mesh>

      {/* Soft rug under cushions */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 1]}>
        <circleGeometry args={[3.6, 32]} />
        <meshStandardMaterial color="#5b3f8a" roughness={1} />
      </mesh>

      {/* Railing — front */}
      <Railing position={[0, 0, -6]} length={20} />
      {/* Railing — sides */}
      <Railing position={[-10, 0, -2]} length={8} rotation={[0, Math.PI / 2, 0]} />
      <Railing position={[10, 0, -2]} length={8} rotation={[0, Math.PI / 2, 0]} />
    </group>
  );
}

function Railing({ position, length, rotation = [0, 0, 0] }) {
  const posts = [];
  const count = Math.floor(length / 1.1);
  for (let i = 0; i <= count; i++) {
    const x = -length / 2 + (i / count) * length;
    posts.push(x);
  }
  return (
    <group position={position} rotation={rotation}>
      {/* Top rail */}
      <mesh position={[0, 1.05, 0]}>
        <boxGeometry args={[length, 0.06, 0.06]} />
        <meshStandardMaterial color="#6a4ea3" emissive="#1a1240" emissiveIntensity={0.4} metalness={0.5} roughness={0.4} />
      </mesh>
      {/* Bottom rail */}
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[length, 0.04, 0.04]} />
        <meshStandardMaterial color="#5a3f88" metalness={0.5} roughness={0.5} />
      </mesh>
      {/* Posts */}
      {posts.map((x, i) => (
        <mesh key={i} position={[x, 0.55, 0]}>
          <boxGeometry args={[0.04, 1.0, 0.04]} />
          <meshStandardMaterial color="#5a3f88" metalness={0.4} roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
}
