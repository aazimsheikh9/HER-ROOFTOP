"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

/**
 * Wraps any 3D group and adds a hover/glow pulse + click handler.
 * Children render inside a group whose scale lerps on hover.
 */
export default function Hotspot({
  children,
  onClick,
  hoverScale = 1.04,
  cursor = "pointer",
}) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((_, dt) => {
    if (!groupRef.current) return;
    const target = hovered ? hoverScale : 1;
    const cur = groupRef.current.scale.x;
    const next = cur + (target - cur) * Math.min(1, dt * 6);
    groupRef.current.scale.setScalar(next);
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = cursor;
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
    >
      {children}
    </group>
  );
}
