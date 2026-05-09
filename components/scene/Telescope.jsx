"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import Hotspot from "./Hotspot";

export default function Telescope({ onClick }) {
  const tubeRef = useRef();
  useFrame(({ clock }) => {
    if (!tubeRef.current) return;
    const t = clock.getElapsedTime();
    tubeRef.current.rotation.x = -0.7 + Math.sin(t * 0.4) * 0.04;
    tubeRef.current.rotation.y = Math.sin(t * 0.3) * 0.06;
  });

  return (
    <Hotspot onClick={onClick}>
      <group position={[3.2, 0, -2.4]} rotation={[0, -0.4, 0]}>
        {/* Tripod legs */}
        {[0, 1, 2].map((i) => (
          <mesh
            key={i}
            position={[
              Math.cos((i * Math.PI * 2) / 3) * 0.22,
              0.55,
              Math.sin((i * Math.PI * 2) / 3) * 0.22,
            ]}
            rotation={[
              Math.cos((i * Math.PI * 2) / 3) * 0.25,
              (i * Math.PI * 2) / 3,
              Math.sin((i * Math.PI * 2) / 3) * 0.25,
            ]}
          >
            <cylinderGeometry args={[0.025, 0.035, 1.1, 8]} />
            <meshStandardMaterial color="#3b2a66" metalness={0.5} roughness={0.5} />
          </mesh>
        ))}

        {/* Mount */}
        <mesh position={[0, 1.15, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.18, 16]} />
          <meshStandardMaterial color="#1a1240" metalness={0.7} roughness={0.4} />
        </mesh>

        {/* Tube */}
        <group ref={tubeRef} position={[0, 1.25, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <cylinderGeometry args={[0.13, 0.16, 1.4, 24]} />
            <meshStandardMaterial color="#0c0826" metalness={0.8} roughness={0.3} emissive="#1a1240" emissiveIntensity={0.2} />
          </mesh>
          {/* Lens ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.7]}>
            <torusGeometry args={[0.16, 0.03, 8, 24]} />
            <meshStandardMaterial color="#ffd98a" emissive="#ffae3c" emissiveIntensity={0.4} metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Eyepiece */}
          <mesh position={[0, 0.18, -0.5]}>
            <cylinderGeometry args={[0.05, 0.05, 0.18, 16]} />
            <meshStandardMaterial color="#1a1240" metalness={0.6} roughness={0.4} />
          </mesh>
        </group>

        <pointLight position={[0, 1.4, 0]} intensity={0.25} color="#a98ff0" distance={3} decay={2} />
      </group>
    </Hotspot>
  );
}
