"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Catenary string of warm bulbs. Two strings — front and side.
 */
function buildCatenary(start, end, sag, segments = 32) {
  const pts = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const x = THREE.MathUtils.lerp(start.x, end.x, t);
    const y = THREE.MathUtils.lerp(start.y, end.y, t) - Math.sin(t * Math.PI) * sag;
    const z = THREE.MathUtils.lerp(start.z, end.z, t);
    pts.push(new THREE.Vector3(x, y, z));
  }
  return pts;
}

function Strand({ from, to, sag = 0.6, count = 18, phase = 0 }) {
  const points = useMemo(
    () => buildCatenary(new THREE.Vector3(...from), new THREE.Vector3(...to), sag, 64),
    [from, to, sag]
  );

  const lineGeom = useMemo(() => {
    const g = new THREE.BufferGeometry().setFromPoints(points);
    return g;
  }, [points]);

  const bulbPositions = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      const t = (i + 0.5) / count;
      const idx = Math.floor(t * (points.length - 1));
      arr.push(points[idx]);
    }
    return arr;
  }, [points, count]);

  const bulbsRef = useRef();
  useFrame(({ clock }) => {
    if (!bulbsRef.current) return;
    const t = clock.getElapsedTime();
    bulbsRef.current.children.forEach((b, i) => {
      const k = 0.7 + Math.sin(t * 1.6 + i * 0.7 + phase) * 0.3;
      b.material.opacity = k;
      b.scale.setScalar(0.04 + k * 0.02);
    });
  });

  return (
    <group>
      <line geometry={lineGeom}>
        <lineBasicMaterial color="#1a1438" />
      </line>
      <group ref={bulbsRef}>
        {bulbPositions.map((p, i) => (
          <mesh key={i} position={p}>
            <sphereGeometry args={[1, 10, 10]} />
            <meshBasicMaterial
              color={i % 4 === 0 ? "#ffe4b3" : "#ffd98a"}
              transparent
              opacity={0.9}
              toneMapped={false}
            />
          </mesh>
        ))}
        {/* Glow halos via additive sprites */}
        {bulbPositions.map((p, i) => (
          <sprite key={`g-${i}`} position={p} scale={[0.4, 0.4, 1]}>
            <spriteMaterial
              color="#ffd98a"
              transparent
              opacity={0.35}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </sprite>
        ))}
      </group>
    </group>
  );
}

export default function FairyLights() {
  return (
    <group>
      {/* Front rail strand */}
      <Strand from={[-10, 1.6, -5.9]} to={[10, 1.6, -5.9]} sag={0.7} count={26} />
      {/* Diagonal strand from front-right post to back rail */}
      <Strand from={[10, 1.05, -5.9]} to={[10, 3.4, 1]} sag={0.4} count={14} phase={1.2} />
      <Strand from={[-10, 1.05, -5.9]} to={[-10, 3.4, 1]} sag={0.4} count={14} phase={2.4} />
      {/* Overhead sweep */}
      <Strand from={[-10, 3.4, 1]} to={[10, 3.4, 1]} sag={0.9} count={26} phase={0.6} />

      {/* Single soft warm light to fake bounce */}
      <pointLight position={[0, 2.6, -2]} intensity={0.9} color="#ffc864" distance={14} decay={2} />
      <pointLight position={[-4, 1.4, -3]} intensity={0.4} color="#ffb27a" distance={6} decay={2} />
      <pointLight position={[4, 1.4, -3]} intensity={0.4} color="#ffb27a" distance={6} decay={2} />
    </group>
  );
}
