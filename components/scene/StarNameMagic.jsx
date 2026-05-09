"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Spawns a swarm of bright stars that converge into the shape of "Zainab ❤️"
 * across the sky. Uses an offscreen canvas to sample dense pixel positions of
 * the rendered text — these become the target positions for floating particles.
 */

const SAMPLE_DENSITY = 4; // step in px when sampling — lower = more particles

function sampleTextPositions() {
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 256;
  const g = c.getContext("2d");
  g.fillStyle = "#000";
  g.fillRect(0, 0, c.width, c.height);
  g.fillStyle = "#fff";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.font = "italic 700 150px 'Dancing Script', cursive";
  g.fillText("Zainab ❤", c.width / 2, c.height / 2);

  const data = g.getImageData(0, 0, c.width, c.height).data;
  const points = [];
  for (let y = 0; y < c.height; y += SAMPLE_DENSITY) {
    for (let x = 0; x < c.width; x += SAMPLE_DENSITY) {
      const idx = (y * c.width + x) * 4;
      if (data[idx] > 128) {
        // Map to 3D world coords — wide arc across the sky
        const u = x / c.width - 0.5;
        const v = y / c.height - 0.5;
        points.push(new THREE.Vector3(u * 22, 8 - v * 5, -14));
      }
    }
  }
  return points;
}

export default function StarNameMagic() {
  const targets = useMemo(() => sampleTextPositions(), []);
  const count = targets.length;
  const meshRef = useRef();

  const state = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      cur: new THREE.Vector3(
        (Math.random() - 0.5) * 40,
        2 + Math.random() * 14,
        -10 - Math.random() * 20
      ),
      target: targets[i],
      speed: 0.6 + Math.random() * 1.2,
      phase: Math.random() * Math.PI * 2,
    }));
  }, [count, targets]);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const startTime = useRef(performance.now() / 1000);

  useFrame(() => {
    if (!meshRef.current) return;
    const t = performance.now() / 1000 - startTime.current;
    const k = Math.min(1, t / 2.2); // ease-in over 2.2s
    state.forEach((p, i) => {
      const ease = 1 - Math.pow(1 - k, 3);
      const lerped = p.cur.clone().lerp(p.target, ease);
      // gentle hover after arrival
      lerped.x += Math.sin(t * 1.6 + p.phase) * 0.04 * (1 - ease + 0.4);
      lerped.y += Math.cos(t * 1.4 + p.phase) * 0.04 * (1 - ease + 0.4);
      dummy.position.copy(lerped);
      const tw = 0.06 + Math.sin(t * 3 + p.phase) * 0.02;
      dummy.scale.setScalar(tw);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  const tex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const g = c.getContext("2d");
    const grad = g.createRadialGradient(32, 32, 1, 32, 32, 30);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.4, "rgba(255,217,138,0.7)");
    grad.addColorStop(1, "rgba(255,217,138,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
  }, []);

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]} frustumCulled={false}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        map={tex}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </instancedMesh>
  );
}
