"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Smooth parallax camera that subtly follows the pointer / device tilt,
 * giving the rooftop a cinematic floaty feel.
 */
export default function SceneCamera() {
  const { camera, size } = useThree();
  const target = useRef(new THREE.Vector2(0, 0));
  const current = useRef(new THREE.Vector2(0, 0));
  const lookAt = useRef(new THREE.Vector3(0, 1.6, 0));
  const time = useRef(0);

  useEffect(() => {
    const onMove = (e) => {
      const x = (e.clientX / size.width) * 2 - 1;
      const y = (e.clientY / size.height) * 2 - 1;
      target.current.set(x, y);
    };
    const onTilt = (e) => {
      if (e.gamma == null || e.beta == null) return;
      target.current.set(
        THREE.MathUtils.clamp(e.gamma / 30, -1, 1),
        THREE.MathUtils.clamp(e.beta / 60, -1, 1)
      );
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("deviceorientation", onTilt);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("deviceorientation", onTilt);
    };
  }, [size.width, size.height]);

  useFrame((_, dt) => {
    time.current += dt;
    current.current.lerp(target.current, 0.04);

    // Base camera position with gentle breathing
    const breath = Math.sin(time.current * 0.4) * 0.06;
    camera.position.x = current.current.x * 0.6;
    camera.position.y = 2.6 + current.current.y * 0.25 + breath;
    camera.position.z = 9 + Math.sin(time.current * 0.25) * 0.15;

    camera.lookAt(lookAt.current);
  });

  return null;
}
