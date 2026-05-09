"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const STAR_COUNT = 600;

export default function Sky() {
  const starsRef = useRef();
  const shootingRef = useRef();
  const tRef = useRef(0);

  // Static dome stars
  const positions = useMemo(() => {
    const arr = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT; i++) {
      // Distribute on a hemisphere behind the rooftop
      const phi = Math.random() * Math.PI; // 0..π
      const theta = Math.random() * Math.PI - Math.PI / 2; // -π/2 .. π/2
      const r = 60 + Math.random() * 12;
      const x = r * Math.cos(theta) * Math.cos(phi);
      const y = Math.abs(r * Math.sin(theta)) + 3;
      const z = -Math.abs(r * Math.cos(theta) * Math.sin(phi)) - 6;
      arr.set([x, y, z], i * 3);
    }
    return arr;
  }, []);

  // Shooting star path
  const shootingState = useRef({
    active: false,
    t: 0,
    duration: 1.2,
    nextIn: 4 + Math.random() * 6,
    start: new THREE.Vector3(),
    end: new THREE.Vector3(),
  });

  useFrame((_, dt) => {
    tRef.current += dt;
    // Twinkle via subtle uniform-time shader-less pulse
    if (starsRef.current) {
      const mat = starsRef.current.material;
      mat.opacity = 0.75 + Math.sin(tRef.current * 1.2) * 0.08;
    }

    // Shooting star scheduler
    const s = shootingState.current;
    if (!s.active) {
      s.nextIn -= dt;
      if (s.nextIn <= 0) {
        s.active = true;
        s.t = 0;
        s.start.set(-30 + Math.random() * 10, 14 + Math.random() * 4, -25 + Math.random() * 10);
        s.end.set(s.start.x + 30 + Math.random() * 10, s.start.y - 6, s.start.z + 8);
      }
    } else if (shootingRef.current) {
      s.t += dt;
      const k = Math.min(1, s.t / s.duration);
      const p = s.start.clone().lerp(s.end, k);
      shootingRef.current.position.copy(p);
      shootingRef.current.material.opacity = Math.sin(k * Math.PI);
      if (k >= 1) {
        s.active = false;
        s.nextIn = 5 + Math.random() * 10;
      }
    }
  });

  return (
    <group>
      {/* Star points */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.45}
          sizeAttenuation
          transparent
          opacity={0.85}
          color="#fff8dc"
          depthWrite={false}
        />
      </points>

      {/* Shooting star */}
      <mesh ref={shootingRef} position={[-50, 30, -30]}>
        <sphereGeometry args={[0.18, 8, 8]} />
        <meshBasicMaterial color="#fff5d8" transparent opacity={0} />
      </mesh>
    </group>
  );
}
