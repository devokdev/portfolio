"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import InteractivePaper from "./InteractivePaper";

// Sparse dust particles for museum atmosphere
function DustParticles({ count = 40 }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;

      vel[i * 3] = (Math.random() - 0.5) * 0.04;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.04;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.04;
    }
    return [pos, vel];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const geom = pointsRef.current.geometry;
    const posAttr = geom.getAttribute("position") as THREE.BufferAttribute;

    for (let i = 0; i < count; i++) {
      let x = posAttr.getX(i) + velocities[i * 3] * delta;
      let y = posAttr.getY(i) + velocities[i * 3 + 1] * delta;
      let z = posAttr.getZ(i) + velocities[i * 3 + 2] * delta;

      // Wrap boundaries
      if (x < -3) x = 3; if (x > 3) x = -3;
      if (y < -3) y = 3; if (y > 3) y = -3;
      if (z < -3) z = 3; if (z > 3) z = -3;

      posAttr.setXYZ(i, x, y, z);
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#888888"
        transparent
        opacity={0.35}
        sizeAttenuation={true}
      />
    </points>
  );
}

export default function HeroPaperScene({ isDark = false }: { isDark?: boolean }) {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        shadows
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={isDark ? 0.45 : 0.85} />

        {/* Soft studio spot lights */}
        <spotLight
          position={[3, 6, 3]}
          angle={0.4}
          penumbra={1}
          intensity={isDark ? 25 : 55}
          castShadow
          color="#fffaef"
        />

        <directionalLight
          position={[-3, 5, -2]}
          intensity={isDark ? 0.3 : 0.6}
          color="#e8f0f8"
        />

        <DustParticles count={35} />

        <InteractivePaper isDark={isDark} />

        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 3} />
      </Canvas>
    </div>
  );
}
