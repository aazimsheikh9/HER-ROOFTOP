"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import Hotspot from "./Hotspot";

export default function MusicPlayer({ onClick }) {
  const dialRef = useRef();
  const ledRef = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (dialRef.current) dialRef.current.rotation.z = t * 0.4;
    if (ledRef.current) ledRef.current.material.opacity = 0.6 + Math.sin(t * 3) * 0.4;
  });

  return (
    <Hotspot onClick={onClick}>
      <group position={[-2.0, 0.3, 2.6]} rotation={[0, 0.2, 0]}>
        {/* Body */}
        <mesh>
          <boxGeometry args={[0.9, 0.55, 0.4]} />
          <meshStandardMaterial color="#3b2a66" metalness={0.4} roughness={0.6} />
        </mesh>
        {/* Top */}
        <mesh position={[0, 0.28, 0]}>
          <boxGeometry args={[0.92, 0.02, 0.42]} />
          <meshStandardMaterial color="#5b3f8a" />
        </mesh>
        {/* Speaker grille left */}
        <mesh position={[-0.22, 0, 0.21]}>
          <circleGeometry args={[0.13, 24]} />
          <meshStandardMaterial color="#0c0826" emissive="#1a1240" emissiveIntensity={0.4} />
        </mesh>
        {/* Speaker grille right */}
        <mesh position={[0.22, 0, 0.21]}>
          <circleGeometry args={[0.13, 24]} />
          <meshStandardMaterial color="#0c0826" emissive="#1a1240" emissiveIntensity={0.4} />
        </mesh>
        {/* Dial */}
        <mesh ref={dialRef} position={[0, 0.05, 0.21]}>
          <ringGeometry args={[0.04, 0.07, 24]} />
          <meshBasicMaterial color="#ffd98a" toneMapped={false} />
        </mesh>
        {/* LED */}
        <mesh ref={ledRef} position={[0.3, 0.18, 0.21]}>
          <sphereGeometry args={[0.018, 8, 8]} />
          <meshBasicMaterial color="#ff8da1" transparent opacity={1} toneMapped={false} />
        </mesh>
        {/* Antenna */}
        <mesh position={[0.4, 0.55, -0.1]} rotation={[0, 0, 0.2]}>
          <cylinderGeometry args={[0.005, 0.005, 0.5, 8]} />
          <meshStandardMaterial color="#aaa" metalness={0.9} />
        </mesh>
        <mesh position={[0.49, 0.81, -0.15]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial color="#ffd98a" emissive="#ffae3c" emissiveIntensity={0.4} />
        </mesh>
      </group>
    </Hotspot>
  );
}
