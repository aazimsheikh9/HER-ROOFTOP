"use client";

export default function Cushions() {
  const items = [
    { x: -1.6, z: 1.8, c: "#b86baf", s: [1.4, 0.35, 1.4], r: 0.1 },
    { x: 0.4, z: 1.4, c: "#7b4fb1", s: [1.5, 0.4, 1.5], r: -0.2 },
    { x: 1.9, z: 1.8, c: "#c97a87", s: [1.3, 0.32, 1.3], r: 0.3 },
    // back row
    { x: -2.2, z: 0.0, c: "#5d3f8a", s: [1.2, 0.3, 1.2], r: 0.15 },
    { x: 2.6, z: 0.2, c: "#9e62a8", s: [1.2, 0.3, 1.2], r: -0.1 },
  ];

  return (
    <group>
      {items.map((c, i) => (
        <group key={i} position={[c.x, c.s[1] / 2 + 0.02, c.z]} rotation={[0, c.r, 0]}>
          <mesh>
            <boxGeometry args={c.s} />
            <meshStandardMaterial color={c.c} roughness={1} />
          </mesh>
          {/* Tassel highlight on top */}
          <mesh position={[0, c.s[1] / 2 + 0.005, 0]}>
            <boxGeometry args={[c.s[0] * 0.94, 0.02, c.s[2] * 0.94]} />
            <meshStandardMaterial color="#ffd98a" emissive="#ffae3c" emissiveIntensity={0.15} />
          </mesh>
        </group>
      ))}

      {/* Folded blanket */}
      <group position={[1.0, 0.18, 2.6]} rotation={[0, 0.3, 0]}>
        <mesh>
          <boxGeometry args={[2, 0.18, 0.9]} />
          <meshStandardMaterial color="#3b2a66" roughness={1} />
        </mesh>
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[1.95, 0.05, 0.85]} />
          <meshStandardMaterial color="#5b3f8a" roughness={1} />
        </mesh>
      </group>
    </group>
  );
}
