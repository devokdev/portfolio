"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Html } from "@react-three/drei";

const STAGES = [
  "Sheet",
  "Half Fold",
  "Corner Folds",
  "Airplane",
  "Butterfly",
  "House"
];

export default function InteractivePaper({ isDark }: { isDark: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { camera, pointer } = useThree();

  // Single Source of Truth FSM State
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [targetStageIdx, setTargetStageIdx] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isReversing, setIsReversing] = useState(false);
  const [progressState, setProgressState] = useState(1.0);

  const [hovered, setHovered] = useState(false);

  const subdivisions = 65;
  const size = 3;

  const baseGeometry = useMemo(() => {
    return new THREE.PlaneGeometry(size, size, subdivisions, subdivisions);
  }, []);

  // Internal values for timing/wobbles
  const animRef = useRef({
    time: 0,
    wobble: 0,
    progress: 1.0,
    reverseTimer: 0.0,
  });

  useEffect(() => {
    document.body.style.cursor = hovered && !isAnimating && !isReversing ? "pointer" : "default";
    return () => {
      document.body.style.cursor = "default";
    };
  }, [hovered, isAnimating, isReversing]);

  // Stage coordinate mapping
  const getStagePosition = (x: number, y: number, stageIndex: number): THREE.Vector3 => {
    const p = new THREE.Vector3(x, y, 0);
    const bound = size / 2; // 1.5

    // Defensive check: Clamp stage index to prevent out-of-bounds NaNs
    const safeIdx = Math.max(0, Math.min(STAGES.length - 1, stageIndex));

    switch (safeIdx) {
      case 0: // Sheet (Flat plane)
        return p;

      case 1: // Half Fold
        if (x > 0) {
          const angle = Math.PI / 2.5;
          p.set(x * Math.cos(angle), y, -x * Math.sin(angle));
        }
        return p;

      case 2: // Corner Folds
        {
          const cornerSize = 0.6;
          const trDist = (x - (bound - cornerSize)) + (y - (bound - cornerSize));
          const tlDist = (-x - (bound - cornerSize)) + (y - (bound - cornerSize));

          if (x > 0 && y > 0 && trDist > 0) {
            const foldAngle = Math.PI / 1.4;
            const distFromCrease = trDist / Math.sqrt(2);
            p.set(
              x - distFromCrease * Math.sqrt(2) * (1 - Math.cos(foldAngle)),
              y - distFromCrease * Math.sqrt(2) * (1 - Math.cos(foldAngle)),
              -distFromCrease * Math.sin(foldAngle)
            );
          } else if (x < 0 && y > 0 && tlDist > 0) {
            const foldAngle = Math.PI / 1.4;
            const distFromCrease = tlDist / Math.sqrt(2);
            p.set(
              x + distFromCrease * Math.sqrt(2) * (1 - Math.cos(foldAngle)),
              y - distFromCrease * Math.sqrt(2) * (1 - Math.cos(foldAngle)),
              -distFromCrease * Math.sin(foldAngle)
            );
          }
        }
        return p;

      case 3: // Airplane (Classic Dart Jet with upturned winglets)
        {
          // Linear taper towards the nose
          const taper = THREE.MathUtils.lerp(0.05, 1.0, (bound - y) / size);
          const nx = x * taper;
          const absX = Math.abs(nx);
          let z = 0;
          let newX = nx;

          const wingCrease = 0.26;
          const wingletCrease = 0.85;

          // Fuselage center crease
          if (absX < wingCrease) {
            z = -absX * 1.9;
          } else if (absX < wingletCrease) {
            // Main Wing folded back up
            z = -wingCrease * 1.9 + (absX - wingCrease) * 1.25;
            newX = (nx > 0 ? wingCrease : -wingCrease) + (nx - (nx > 0 ? wingCrease : -wingCrease)) * 0.5;
          } else {
            // Outer wingtips folded straight up (winglets)
            const wingZ = -wingCrease * 1.9 + (wingletCrease - wingCrease) * 1.25;
            z = wingZ + (absX - wingletCrease) * 2.2;
            const wingX = (nx > 0 ? wingCrease : -wingCrease) + ((nx > 0 ? wingletCrease : -wingletCrease) - (nx > 0 ? wingCrease : -wingCrease)) * 0.5;
            newX = wingX + (nx - (nx > 0 ? wingletCrease : -wingletCrease)) * 0.15;
          }
          p.set(newX, y * 0.95, z - 0.2);
        }
        return p;

      case 4: // Butterfly (Origami Butterfly with curled antennae)
        {
          const absX = Math.abs(x);
          let z = 0;
          let newX = x;
          let newY = y * 0.88;

          const bodyW = 0.14;

          if (y > 1.15 && absX < 0.12) {
            // Curled Antennae at the head
            const t = (y - 1.15) / (bound - 1.15);
            newX = x + Math.sign(x) * t * 0.42;
            newY = 1.15 + (y - 1.15) * 0.4;
            z = t * 0.38;
          } else if (absX > bodyW) {
            const dist = absX - bodyW;
            // Separate forewings (wider, swept) and hindwings (smaller)
            const isForewing = y > 0;
            const wingScale = isForewing
              ? 0.5 + Math.sin((y / bound) * Math.PI * 0.5) * 0.9
              : 0.5 + Math.cos((y / -bound) * Math.PI * 0.5) * 0.3;
            
            // Sweep wings slightly along Y
            newY = y + (isForewing ? dist * 0.18 : -dist * 0.12);
            newX = (x > 0 ? bodyW : -bodyW) + (x - (x > 0 ? bodyW : -bodyW)) * wingScale;
            
            // Rotate wings up
            z = 0.1 + dist * 1.1 + Math.sin(dist * 4.5) * 0.08;
            
            // Add horizontal separating fold line crease
            z -= Math.max(0, 0.18 - Math.abs(y)) * 0.12;
          } else {
            // Fold tight central body
            z = -absX * 0.9;
          }
          p.set(newX, newY, z - 0.12);
        }
        return p;

      case 5: // House ( Origami house with back walls and an open front door flap )
        {
          let newX = x;
          let newY = y * 0.85;
          let z = 0;

          const wallLimit = 0.65;
          const doorMinX = -0.22;
          const doorMaxX = 0.22;
          const doorMinY = -bound * 0.9; // -1.35
          const doorMaxY = -bound * 0.3; // -0.45

          // 1. Fold side walls back 90 degrees
          if (x > wallLimit) {
            newX = wallLimit;
            z = -(x - wallLimit) * 1.15;
          } else if (x < -wallLimit) {
            newX = -wallLimit;
            z = -(-wallLimit - x) * 1.15;
          } else if (x >= doorMinX && x <= doorMaxX && y >= doorMinY && y <= doorMaxY) {
            // 2. Fold the front door flap slightly open (rotating around left hinge at doorMinX)
            const doorW = x - doorMinX;
            const doorAngle = 0.7; // ~40 degrees open
            newX = doorMinX + doorW * Math.cos(doorAngle);
            z = doorW * Math.sin(doorAngle);
          }

          // 3. Pitch roof for the top section
          const roofLine = 0.28;
          if (y > roofLine) {
            const t = Math.max(0, (bound - y) / (bound - roofLine));
            newX = newX * t;
            z = z + (y - roofLine) * 0.45 + (1.0 - Math.abs(newX / wallLimit)) * 0.35;
          }

          p.set(newX * 0.92, newY, z - 0.18);
        }
        return p;

      default:
        return p;
    }
  };

  const advanceStage = () => {
    // FSM rule: Ignore clicks while animating or reversing
    if (isAnimating || isReversing) return;

    if (currentStageIdx === STAGES.length - 1) {
      // Reached the end, trigger the auto-reverse flow immediately
      setIsReversing(true);
      setTargetStageIdx(currentStageIdx - 1);
      animRef.current.progress = 0;
      animRef.current.wobble = 0.45;
    } else {
      // Advance to next stage cleanly
      setTargetStageIdx(currentStageIdx + 1);
      setIsAnimating(true);
      animRef.current.progress = 0;
      animRef.current.wobble = 0.5;
    }
  };

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    animRef.current.time += delta;

    if (animRef.current.wobble > 0.01) {
      animRef.current.wobble *= 0.94;
    }

    // FSM Stage progress updates
    if (isAnimating) {
      animRef.current.progress = Math.min(1.0, animRef.current.progress + delta * 1.3);
      setProgressState(animRef.current.progress);

      if (animRef.current.progress >= 1.0) {
        setCurrentStageIdx(targetStageIdx);
        setIsAnimating(false);
        animRef.current.progress = 1.0;
        animRef.current.reverseTimer = 0.0; // Reset reverse timer on target reach
      }
    } else if (isReversing) {
      // Reverse step animation
      animRef.current.progress = Math.min(1.0, animRef.current.progress + delta * 1.6);
      setProgressState(animRef.current.progress);

      if (animRef.current.progress >= 1.0) {
        const nextTarget = targetStageIdx;
        setCurrentStageIdx(nextTarget);
        animRef.current.progress = 1.0;

        if (nextTarget > 0) {
          // Continue reversing step-by-step
          setTargetStageIdx(nextTarget - 1);
          animRef.current.progress = 0;
        } else {
          // Reached flat paper sheet (0), end reverse flow
          setIsReversing(false);
          setTargetStageIdx(0);
        }
      }
    } else if (currentStageIdx === STAGES.length - 1) {
      // Auto-reverse after 2.2 seconds of inactivity at final stage
      animRef.current.reverseTimer += delta;
      if (animRef.current.reverseTimer >= 2.2) {
        setIsReversing(true);
        setTargetStageIdx(currentStageIdx - 1);
        animRef.current.progress = 0;
        animRef.current.wobble = 0.4;
      }
    }

    // 1. Morph Vertices
    const geom = meshRef.current.geometry;
    const posAttr = geom.getAttribute("position") as THREE.BufferAttribute;
    const basePosAttr = baseGeometry.getAttribute("position") as THREE.BufferAttribute;

    const t = animRef.current.progress;
    // Easing curve (Cubic easeInOut)
    const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const tempV = new THREE.Vector3();
    for (let i = 0; i < posAttr.count; i++) {
      const origX = basePosAttr.getX(i);
      const origY = basePosAttr.getY(i);

      // Interpolate from current stage position towards target stage position
      const pPrev = getStagePosition(origX, origY, currentStageIdx);
      const pNext = getStagePosition(origX, origY, targetStageIdx);

      tempV.lerpVectors(pPrev, pNext, ease);

      // Handle NaNs defensively to prevent exploding geometry
      if (isNaN(tempV.x) || isNaN(tempV.y) || isNaN(tempV.z)) {
        tempV.set(origX, origY, 0);
      }

      // Wobble overshoot decay
      if (animRef.current.wobble > 0.005) {
        const wiggle = Math.sin(origX * 6 + animRef.current.time * 20) * 
                       Math.cos(origY * 6 + animRef.current.time * 20) * 
                       animRef.current.wobble * 0.04;
        tempV.z += wiggle;
      }

      posAttr.setXYZ(i, tempV.x, tempV.y, tempV.z);
    }

    posAttr.needsUpdate = true;
    geom.computeVertexNormals();

    // 2. Apply float & tilt rotation to parent group
    const clockTime = animRef.current.time;
    const floatY = Math.sin(clockTime * 0.6) * 0.08;
    const swayX = Math.cos(clockTime * 0.4) * 0.05;

    const targetTiltX = (pointer.y * Math.PI) / 10;
    const targetTiltY = (pointer.x * Math.PI) / 10;

    if (groupRef.current) {
      groupRef.current.position.y = floatY;
      groupRef.current.position.x = swayX;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetTiltX, 0.05) + Math.sin(clockTime * 0.3) * 0.01;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetTiltY, 0.05) + Math.cos(clockTime * 0.2) * 0.01;
    }
  });

  return (
    <group>
      {/* Dynamic FSM Debug Overlay */}
      <Html prepend style={{ position: "absolute", top: 16, left: 16, width: "180px", pointerEvents: "none" }}>
        <div 
          className="border border-zinc-200/20 bg-black/60 backdrop-blur-sm rounded font-mono text-[10px] text-zinc-400 leading-normal p-4 select-none"
        >
          <p className="text-zinc-200 font-bold mb-1 border-b border-zinc-800 pb-1">origami status</p>
          <p>Stage: <span className="text-white">{STAGES[currentStageIdx]}</span></p>
          <p>Target: <span className="text-zinc-300">{STAGES[targetStageIdx]}</span></p>
          <p>Status: <span className={isAnimating ? "text-indigo-400" : isReversing ? "text-amber-400" : "text-emerald-400"}>
            {isAnimating ? "transitioning" : isReversing ? "reversing" : "idle"}
          </span></p>
          <p>Progress: <span className="text-white">{Math.round(progressState * 100)}%</span></p>
          <p>Mesh Visible: <span className="text-emerald-500">true</span></p>
        </div>
      </Html>

      <group ref={groupRef}>
        <mesh
          ref={meshRef}
          castShadow
          receiveShadow
          onClick={advanceStage}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <planeGeometry args={[size, size, subdivisions, subdivisions]} />
          <meshStandardMaterial
            color={isDark ? "#b0b0b0" : "#ffffff"}
            roughness={0.88}
            metalness={0.02}
            side={THREE.DoubleSide}
            shadowSide={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </group>
  );
}
