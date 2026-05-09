"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import Hotspot from "./Hotspot";

export default function CakeTable({ onClick }) {
  const flameRef = useRef();
  const haloRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (flameRef.current) {
      flameRef.current.scale.set(
        1 + Math.sin(t * 8) * 0.08,
        1 + Math.sin(t * 6) * 0.12,
        1 + Math.cos(t * 7) * 0.08
      );
    }
    if (haloRef.current) {
      haloRef.current.material.opacity = 0.45 + Math.sin(t * 5) * 0.15;
    }
  });

  return (
    <Hotspot onClick={onClick}>
      <group position={[-3.6, 0, 0.8]} rotation={[0, 0.4, 0]}>
        {/* Table */}
        <mesh position={[0, 0.36, 0]}>
          <cylinderGeometry args={[0.62, 0.65, 0.06, 24]} />
          <meshStandardMaterial color="#3b2a66" roughness={0.7} metalness={0.2} />
        </mesh>
        <mesh position={[0, 0.18, 0]}>
          <cylinderGeometry args={[0.05, 0.07, 0.36, 12]} />
          <meshStandardMaterial color="#2a1f55" />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.45, 0.5, 0.04, 16]} />
          <meshStandardMaterial color="#2a1f55" />
        </mesh>

        {/* Cake plate */}
        <mesh position={[0, 0.41, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.02, 24]} />
          <meshStandardMaterial color="#dcd5e8" metalness={0.6} roughness={0.3} />
        </mesh>

        {/* Cake — two tiers */}
        <mesh position={[0, 0.55, 0]}>
          <cylinderGeometry args={[0.34, 0.34, 0.22, 32]} />
          <meshStandardMaterial color="#f4d3df" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.74, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.16, 32]} />
          <meshStandardMaterial color="#ffe9b8" roughness={0.7} />
        </mesh>

        {/* Frosting drip ring */}
        <mesh position={[0, 0.66, 0]}>
          <torusGeometry args={[0.34, 0.025, 8, 32]} />
          <meshStandardMaterial color="#fff5e1" emissive="#ffd98a" emissiveIntensity={0.15} />
        </mesh>

        {/* Candle */}
        <mesh position={[0, 0.88, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.12, 12]} />
          <meshStandardMaterial color="#fff5e1" />
        </mesh>
        {/* Flame */}
        <mesh ref={flameRef} position={[0, 0.97, 0]}>
          <coneGeometry args={[0.04, 0.1, 12]} />
          <meshBasicMaterial color="#ffc864" toneMapped={false} />
        </mesh>
        {/* Halo */}
        <sprite ref={haloRef} position={[0, 0.97, 0]} scale={[0.5, 0.5, 1]}>
          <spriteMaterial
            color="#ffd98a"
            transparent
            opacity={0.5}
            depthWrite={false}
          />
        </sprite>
        <pointLight position={[0, 1.0, 0]} intensity={0.6} color="#ffc864" distance={3} decay={2} />
      </group>
    </Hotspot>
  );
}
