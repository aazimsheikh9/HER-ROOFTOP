"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Fireflies({ count = 40 }) {
  const meshRef = useRef();
  const matRef = useRef();

  const data = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      origin: new THREE.Vector3(
        -8 + Math.random() * 16,
        0.6 + Math.random() * 2.8,
        -3 + Math.random() * 6
      ),
      amp: 0.3 + Math.random() * 0.7,
      speed: 0.4 + Math.random() * 0.7,
      phase: Math.random() * Math.PI * 2,
    }));
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  const tex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const g = c.getContext("2d");
    const grad = g.createRadialGradient(32, 32, 1, 32, 32, 30);
    grad.addColorStop(0, "rgba(255,235,170,1)");
    grad.addColorStop(0.4, "rgba(255,200,100,0.6)");
    grad.addColorStop(1, "rgba(255,200,100,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    data.forEach((d, i) => {
      dummy.position.set(
        d.origin.x + Math.sin(t * d.speed + d.phase) * d.amp,
        d.origin.y + Math.sin(t * d.speed * 1.3 + d.phase) * 0.4,
        d.origin.z + Math.cos(t * d.speed + d.phase) * d.amp
      );
      const flicker = 0.05 + (0.05 + Math.sin(t * 4 + d.phase) * 0.05);
      dummy.scale.setScalar(flicker);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        ref={matRef}
        map={tex}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </instancedMesh>
  );
}
