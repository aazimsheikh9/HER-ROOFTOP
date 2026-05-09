"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import Hotspot from "./Hotspot";

function Lantern({ position, phase, onClick }) {
  const groupRef = useRef();
  const flameRef = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(t * 0.7 + phase) * 0.05;
      groupRef.current.position.y = position[1] + Math.sin(t * 0.5 + phase) * 0.05;
    }
    if (flameRef.current) {
      flameRef.current.material.opacity = 0.7 + Math.sin(t * 8 + phase) * 0.3;
    }
  });

  return (
    <Hotspot onClick={onClick}>
      <group ref={groupRef} position={position}>
        {/* String */}
        <mesh position={[0, 0.6, 0]}>
          <cylinderGeometry args={[0.005, 0.005, 1.2, 6]} />
          <meshBasicMaterial color="#3b2a66" />
        </mesh>
        {/* Cap */}
        <mesh position={[0, 0.05, 0]}>
          <coneGeometry args={[0.13, 0.1, 12]} />
          <meshStandardMaterial color="#3b2a66" />
        </mesh>
        {/* Body — translucent paper */}
        <mesh position={[0, -0.08, 0]}>
          <cylinderGeometry args={[0.13, 0.1, 0.28, 12]} />
          <meshStandardMaterial
            color="#ffd98a"
            emissive="#ffae3c"
            emissiveIntensity={0.7}
            transparent
            opacity={0.85}
          />
        </mesh>
        {/* Bottom rim */}
        <mesh position={[0, -0.23, 0]}>
          <torusGeometry args={[0.1, 0.012, 8, 16]} />
          <meshStandardMaterial color="#3b2a66" />
        </mesh>
        {/* Flame halo */}
        <sprite ref={flameRef} position={[0, -0.08, 0]} scale={[0.7, 0.7, 1]}>
          <spriteMaterial color="#ffc864" transparent opacity={0.85} depthWrite={false} />
        </sprite>
      </group>
    </Hotspot>
  );
}

export default function Lanterns({ onClick }) {
  const positions = [
    [-5.4, 2.3, -3.8],
    [-2.6, 2.9, -4.2],
    [1.6, 2.7, -4.5],
    [4.6, 2.2, -3.6],
    [-7.2, 2.1, 0.4],
  ];
  return (
    <group>
      {positions.map((p, i) => (
        <Lantern
          key={i}
          position={p}
          phase={i * 1.3}
          onClick={() => onClick(i)}
        />
      ))}
    </group>
  );
}
