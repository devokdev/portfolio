"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const DEFAULT_WORDS = ["BUILD", "CREATE", "DEPLOY", "LEARN"];

function RendererNormalizer() {
  const { gl } = useThree();
  useEffect(() => {
    gl.outputColorSpace = THREE.SRGBColorSpace;
    gl.toneMapping = THREE.NoToneMapping;
    gl.setClearColor(0x000000, 0);
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }, [gl]);
  return null;
}

// Configuration Interface
interface HeroParticleSceneProps {
  particleCount?: number;
  words?: string[];
  morphDuration?: number;     // duration of the morph transition (s)
  holdDuration?: number;      // duration to display the word (s)
  disperseDuration?: number;  // duration of the disperse phase (s)
  particleSize?: number;      // base scale of the points
  colorBase?: string;         // Hex code base color
  colorHighlight?: string;    // Hex code highlighted color
  repelRadius?: number;       // Radius for cursor deflection
}

interface WordBounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  width: number;
  height: number;
}

// Bounding box calculation for centering text
function calculateBounds(points: Float32Array): WordBounds {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  for (let i = 0; i < points.length / 3; i++) {
    const x = points[i * 3];
    const y = points[i * 3 + 1];
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }

  return {
    minX,
    maxX,
    minY,
    maxY,
    width: maxX - minX,
    height: maxY - minY,
  };
}

// Center points around (0,0)
function centerPoints(points: Float32Array, bounds: WordBounds): Float32Array {
  const centerX = (bounds.minX + bounds.maxX) / 2;
  const centerY = (bounds.minY + bounds.maxY) / 2;
  const centered = new Float32Array(points.length);
  for (let i = 0; i < points.length / 3; i++) {
    centered[i * 3] = points[i * 3] - centerX;
    centered[i * 3 + 1] = points[i * 3 + 1] - centerY;
    centered[i * 3 + 2] = points[i * 3 + 2];
  }
  return centered;
}

// Sample canvas text to extract raw coordinates
function sampleTextRaw(text: string, count: number): Float32Array {
  if (typeof window === "undefined") return new Float32Array(count * 3);

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return new Float32Array(count * 3);

  canvas.width = 600;
  canvas.height = 200;

  ctx.fillStyle = "#ffffff";
  ctx.font = "600 100px sans-serif"; // Premium clean geometric sans-serif
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 300, 100);

  const imgData = ctx.getImageData(0, 0, 600, 200);
  const data = imgData.data;

  const points: { x: number; y: number }[] = [];
  for (let y = 0; y < 200; y += 2) {
    for (let x = 0; x < 600; x += 2) {
      const idx = (y * 600 + x) * 4;
      if (data[idx] > 128) {
        points.push({
          x: x / 100, // raw scale, centered later
          y: -y / 100,
        });
      }
    }
  }

  const result = new Float32Array(count * 3);
  if (points.length === 0) return result;

  for (let i = 0; i < count; i++) {
    const pt = points[i % points.length];
    result[i * 3] = pt.x + (Math.random() - 0.5) * 0.01;
    result[i * 3 + 1] = pt.y + (Math.random() - 0.5) * 0.01;
    result[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
  }

  return result;
}

// Generate normalized randomized coordinates in a sphere
function generateRandomSphere(count: number): Float32Array {
  const result = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const r = Math.cbrt(Math.random()); // Even density

    result[i * 3] = Math.sin(phi) * Math.cos(theta) * r;
    result[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * r;
    result[i * 3 + 2] = Math.cos(phi) * r;
  }
  return result;
}

function InteractiveParticles({
  particleCount: count,
  words,
  morphDuration,
  holdDuration,
  disperseDuration,
  particleSize,
  colorBase,
  colorHighlight,
  repelRadius,
}: Required<HeroParticleSceneProps>) {
  const { viewport } = useThree();
  const pointsRef = useRef<THREE.Points>(null);

  // Soft circular glow texture for particles
  const particleTexture = useMemo(() => {
    if (typeof window === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    grad.addColorStop(0, "rgba(255, 255, 255, 1)");
    grad.addColorStop(0.3, "rgba(255, 255, 255, 0.7)");
    grad.addColorStop(1, "rgba(255, 255, 255, 0)");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 16, 16);

    return new THREE.CanvasTexture(canvas);
  }, []);

  // Parse color structures
  const baseColor = useMemo(() => new THREE.Color(colorBase), [colorBase]);
  const highlightColor = useMemo(() => new THREE.Color(colorHighlight), [colorHighlight]);

  // Compute centered word points & bounds
  const shapes = useMemo(() => {
    const rawWords = words.map((w) => sampleTextRaw(w, count));
    const bounds = rawWords.map((pts) => calculateBounds(pts));
    const centeredWords = rawWords.map((pts, idx) => centerPoints(pts, bounds[idx]));

    return {
      words: centeredWords,
      bounds: bounds,
      disperse: generateRandomSphere(count),
    };
  }, [words, count]);

  const stateRef = useRef({
    currentPositions: new Float32Array(count * 3),
    cycleTimer: 0,
    currentWordIndex: 0,
  });

  const colors = useMemo(() => {
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      col[i * 3] = baseColor.r;
      col[i * 3 + 1] = baseColor.g;
      col[i * 3 + 2] = baseColor.b;
    }
    return col;
  }, [count, baseColor]);

  // Set initial positions
  useEffect(() => {
    const s = stateRef.current;
    const initialWord = shapes.words[0];
    const initialBounds = shapes.bounds[0];
    
    // Initial scale calculation
    const scaleX = (viewport.width * 0.75) / initialBounds.width;
    const scaleY = (viewport.height * 0.4) / initialBounds.height;
    const scale = Math.min(scaleX, scaleY);

    for (let i = 0; i < count * 3; i += 3) {
      s.currentPositions[i] = initialWord[i] * scale;
      s.currentPositions[i + 1] = initialWord[i + 1] * scale;
      s.currentPositions[i + 2] = initialWord[i + 2] * scale;
    }
  }, [shapes, count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const s = stateRef.current;
    const geom = pointsRef.current.geometry;
    const posAttr = geom.getAttribute("position") as THREE.BufferAttribute;
    const colAttr = geom.getAttribute("color") as THREE.BufferAttribute;

    const time = state.clock.getElapsedTime();

    // Map mouse screen coords into 3D viewport space
    const mouseX = (state.pointer.x * viewport.width) / 2;
    const mouseY = (state.pointer.y * viewport.height) / 2;

    const totalCycle = holdDuration + disperseDuration + morphDuration;
    s.cycleTimer += delta;
    if (s.cycleTimer >= totalCycle) {
      s.cycleTimer = 0;
      s.currentWordIndex = (s.currentWordIndex + 1) % words.length;
    }

    // Determine current phase & LERP targets
    let phase: "hold" | "disperse" | "morph" = "hold";
    let progress = 0;
    let fromShape: Float32Array;
    let toShape: Float32Array;
    let fromScale = 1;
    let toScale = 1;

    const nextWordIndex = (s.currentWordIndex + 1) % words.length;

    // Scale calculation based on real-time viewport dimensions (zero cropping)
    const getWordScale = (idx: number) => {
      const b = shapes.bounds[idx];
      const sX = (viewport.width * 0.95) / b.width;
      const sY = (viewport.height * 0.55) / b.height;
      return Math.min(sX, sY);
    };

    const disperseScale = Math.min(viewport.width * 0.4, viewport.height * 0.4);

    if (s.cycleTimer < holdDuration) {
      // Phase 1: HOLD current word
      phase = "hold";
      fromShape = shapes.words[s.currentWordIndex];
      toShape = shapes.words[s.currentWordIndex];
      fromScale = getWordScale(s.currentWordIndex);
      toScale = fromScale;
      progress = 1.0;
    } else if (s.cycleTimer < holdDuration + disperseDuration) {
      // Phase 2: DISPERSE into floating sphere
      phase = "disperse";
      fromShape = shapes.words[s.currentWordIndex];
      toShape = shapes.disperse;
      fromScale = getWordScale(s.currentWordIndex);
      toScale = disperseScale;
      progress = (s.cycleTimer - holdDuration) / disperseDuration;
    } else {
      // Phase 3: MORPH into next word
      phase = "morph";
      fromShape = shapes.disperse;
      toShape = shapes.words[nextWordIndex];
      fromScale = disperseScale;
      toScale = getWordScale(nextWordIndex);
      progress = (s.cycleTimer - (holdDuration + disperseDuration)) / morphDuration;
    }

    // Easing curve (ease-in-out cubic)
    const ease = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;

      // Calculate source and destination positions
      const sx = fromShape[idx] * fromScale;
      const sy = fromShape[idx + 1] * fromScale;
      const sz = fromShape[idx + 2] * (phase === "disperse" ? disperseScale : 1);

      const tx = toShape[idx] * toScale;
      const ty = toShape[idx + 1] * toScale;
      const tz = toShape[idx + 2] * (phase === "morph" ? 1 : disperseScale);

      // Smoothly interpolate coordinate morphs
      let x = THREE.MathUtils.lerp(sx, tx, ease);
      let y = THREE.MathUtils.lerp(sy, ty, ease);
      let z = THREE.MathUtils.lerp(sz, tz, ease);

      // Add gentle organic floating drift (breathing/noise effect)
      const driftX = Math.sin(time * 0.4 + i) * 0.05;
      const driftY = Math.cos(time * 0.35 + i * 1.2) * 0.05;
      const driftZ = Math.sin(time * 0.3 + i * 2) * 0.04;

      x += driftX;
      y += driftY;
      z += driftZ;

      // Mouse repulsion physics
      const dx = x - mouseX;
      const dy = y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      let pushX = 0;
      let pushY = 0;

      if (dist < repelRadius && dist > 0.02) {
        const force = (repelRadius - dist) / repelRadius;
        pushX = (dx / dist) * force * 0.32;
        pushY = (dy / dist) * force * 0.32;
        
        // Dynamic color highlight near cursor
        colAttr.setXYZ(i, highlightColor.r, highlightColor.g, highlightColor.b);
      } else {
        // Fallback base color
        colAttr.setXYZ(i, baseColor.r, baseColor.g, baseColor.b);
      }

      // Springy position update
      s.currentPositions[idx] = THREE.MathUtils.lerp(s.currentPositions[idx], x + pushX, 0.1);
      s.currentPositions[idx + 1] = THREE.MathUtils.lerp(s.currentPositions[idx + 1], y + pushY, 0.1);
      s.currentPositions[idx + 2] = THREE.MathUtils.lerp(s.currentPositions[idx + 2], z, 0.1);

      posAttr.setXYZ(i, s.currentPositions[idx], s.currentPositions[idx + 1], s.currentPositions[idx + 2]);
    }

    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;

    // Almost imperceptible camera floating drift (luxury look)
    state.camera.position.x = Math.sin(time * 0.15) * 0.1;
    state.camera.position.y = Math.cos(time * 0.12) * 0.1;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[stateRef.current.currentPositions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={particleSize}
        vertexColors
        transparent
        opacity={1.0}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        map={particleTexture || undefined}
      />
    </points>
  );
}

export default function HeroParticleScene({
  particleCount = 10560,
  words = DEFAULT_WORDS,
  morphDuration = 1.5,
  holdDuration = 2.2,
  disperseDuration = 1.3,
  particleSize = 0.045,
  colorBase = "#B8B8B8",
  colorHighlight = "#FFFFFF",
  repelRadius = 0.72,
}: HeroParticleSceneProps) {
  const [activeCount, setActiveCount] = useState(particleCount);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scale particle count based on parent container width using ResizeObserver
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const width = entry.contentRect.width;
        if (width < 380) {
          setActiveCount(Math.min(particleCount, 3960));
        } else if (width < 768) {
          setActiveCount(Math.min(particleCount, 6000));
        } else {
          setActiveCount(particleCount);
        }
      }
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, [particleCount]);

  return (
    // Seamless absolute layout container with zero borders, backgrounds, or panels
    <div ref={containerRef} className="absolute inset-0 w-full h-full bg-transparent overflow-hidden border-0 p-0 m-0 shadow-none pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance", premultipliedAlpha: false }}
        className="w-full h-full bg-transparent block border-none outline-none"
        style={{ background: "transparent" }}
      >
        <RendererNormalizer />
        <ambientLight intensity={1.5} />
        
        <InteractiveParticles
          particleCount={activeCount}
          words={words}
          morphDuration={morphDuration}
          holdDuration={holdDuration}
          disperseDuration={disperseDuration}
          particleSize={particleSize}
          colorBase={colorBase}
          colorHighlight={colorHighlight}
          repelRadius={repelRadius}
        />
      </Canvas>
    </div>
  );
}
