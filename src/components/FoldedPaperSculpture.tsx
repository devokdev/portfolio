"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function SculptureGeometry() {
  const geomRef = useRef<THREE.BufferGeometry>(null);

  // Define vertices for a beautiful, complex abstract folded paper sculpture
  const vertices = useMemo(() => {
    return new Float32Array([
      // Top pyramid section
      0, 2.0, 0,   -1.2, 0.2, 0.8,   0, 0.2, 1.5,
      0, 2.0, 0,   0, 0.2, 1.5,      1.2, 0.2, 0.8,
      0, 2.0, 0,   1.2, 0.2, 0.8,    0.8, 0.2, -1.0,
      0, 2.0, 0,   0.8, 0.2, -1.0,   -0.8, 0.2, -1.0,
      0, 2.0, 0,   -0.8, 0.2, -1.0,  -1.2, 0.2, 0.8,

      // Middle folded facets
      -1.2, 0.2, 0.8,   0, 0.2, 1.5,     0, -1.0, 1.2,
      0, 0.2, 1.5,      1.2, 0.2, 0.8,   0, -1.0, 1.2,
      1.2, 0.2, 0.8,    0.8, 0.2, -1.0,  0.8, -1.0, -0.6,
      0.8, 0.2, -1.0,   -0.8, 0.2, -1.0, 0, -1.2, -0.8,
      -0.8, 0.2, -1.0,  -1.2, 0.2, 0.8,  -0.8, -1.0, -0.6,

      // Bottom section connecting to center base
      -1.2, 0.2, 0.8,   0, -1.0, 1.2,    -0.8, -1.0, -0.6,
      1.2, 0.2, 0.8,    0, -1.0, 1.2,    0.8, -1.0, -0.6,
      0, -1.0, 1.2,     0.8, -1.0, -0.6, 0, -2.0, 0,
      0, -1.0, 1.2,     -0.8, -1.0, -0.6, 0, -2.0, 0,
      0.8, -1.0, -0.6,  0, -1.2, -0.8,   0, -2.0, 0,
      -0.8, -1.0, -0.6, 0, -1.2, -0.8,   0, -2.0, 0,
    ]);
  }, []);

  React.useEffect(() => {
    if (geomRef.current) {
      geomRef.current.setAttribute(
        "position",
        new THREE.BufferAttribute(vertices, 3)
      );
      geomRef.current.computeVertexNormals();
    }
  }, [vertices]);

  return (
    <bufferGeometry ref={geomRef} />
  );
}

interface InteractiveMeshProps {
  isDark: boolean;
}

function InteractiveMesh({ isDark }: InteractiveMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!meshRef.current) return;

    // Slow continuous rotation
    const baseRotationY = state.clock.getElapsedTime() * 0.15;

    // Follow mouse coordinates
    mouse.current.x = (state.pointer.x * Math.PI) / 8;
    mouse.current.y = (state.pointer.y * Math.PI) / 8;

    // Smooth interpolation
    currentRotation.current.x += (mouse.current.y - currentRotation.current.x) * 0.05;
    currentRotation.current.y += (mouse.current.x - currentRotation.current.y) * 0.05;

    meshRef.current.rotation.x = currentRotation.current.x;
    meshRef.current.rotation.y = baseRotationY + currentRotation.current.y;
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <SculptureGeometry />
      <meshStandardMaterial
        color={isDark ? "#a0a0a0" : "#d8d8d8"}
        roughness={0.9}
        metalness={0.05}
        flatShading={true}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function FoldedPaperSculpture({ isDark = false }: { isDark?: boolean }) {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={isDark ? 0.4 : 0.7} />
        
        {/* Soft museum-like lighting spotlight */}
        <spotLight
          position={[5, 8, 5]}
          angle={0.3}
          penumbra={1}
          intensity={isDark ? 10 : 25}
          castShadow
        />
        
        <directionalLight
          position={[-5, 5, -5]}
          intensity={isDark ? 0.2 : 0.4}
        />

        <InteractiveMesh isDark={isDark} />

        {/* Paper support stand */}
        <mesh position={[0, -2.1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <cylinderGeometry args={[1.5, 1.5, 0.05, 32]} />
          <meshStandardMaterial
            color={isDark ? "#1a1a1a" : "#f0f0f0"}
            roughness={0.9}
          />
        </mesh>
        
        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 6} />
      </Canvas>
    </div>
  );
}
