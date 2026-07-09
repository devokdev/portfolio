"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface StatItem {
  value: string;
  label: string;
  targetPercent: number; 
}

interface Spark {
  id: number;
  xPercent: number; 
  y: number; 
  size: number;
  delay: number;
}

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [sparks, setSparks] = useState<Spark[]>([]);
  const [sparkId, setSparkId] = useState(0);
  const [emitterX, setEmitterX] = useState(0);

  const totalSegments = 10;
  const activeSegmentsCount = Math.round((stat.targetPercent / 100) * totalSegments);
  
  // Target percentage boundary of the active blocks sequence
  const sparkXPercent = (activeSegmentsCount / totalSegments) * 100;

  // Emit sparks at the current smoothly interpolated emitter position
  useEffect(() => {
    if (!isHovered) {
      setSparks([]);
      return;
    }

    const interval = setInterval(() => {
      const newSparks: Spark[] = Array.from({ length: 2 }).map((_, i) => ({
        id: sparkId + i,
        xPercent: emitterX,
        y: (Math.random() - 0.5) * 6,
        size: 1.2 + Math.random() * 1.8, // extremely tiny, sophisticated spark size
        delay: Math.random() * 0.05,
      }));

      setSparks((prev) => [...prev.slice(-20), ...newSparks]);
      setSparkId((prev) => prev + 2);
    }, 80);

    return () => clearInterval(interval);
  }, [isHovered, sparkId, emitterX]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.04 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setEmitterX(0);
      }}
      className="flex flex-col p-6 bg-[#fbfbfa] dark:bg-[#0f0f0f] border border-black/5 dark:border-white/5 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden select-none cursor-pointer"
    >
      {/* Invisible element used to calculate smoothly sliding emitter position */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: isHovered ? sparkXPercent : 0 }}
        transition={{
          type: "spring",
          stiffness: 70,
          damping: 15,
          delay: isHovered ? index * 0.15 : 0,
        }}
        onUpdate={(latest) => {
          if (typeof latest.x === "number") {
            setEmitterX(latest.x);
          }
        }}
        className="hidden"
      />

      <span className="text-3xl font-bold font-sans text-zinc-900 dark:text-zinc-100 z-10 font-mono">
        {stat.value}
      </span>
      <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mt-1 z-10">
        {stat.label}
      </span>

      {/* Boxy Game Health Bar Grid (Zero rounded corners/No curves) */}
      <div className="w-full mt-6 relative overflow-visible z-10 flex gap-1 h-3.5 items-center">
        {Array.from({ length: totalSegments }).map((_, segmentIdx) => {
          const isActive = segmentIdx < activeSegmentsCount;
          
          return (
            <motion.div
              key={segmentIdx}
              initial={false}
              animate={{
                backgroundColor: isHovered && isActive 
                  ? "var(--active-color)" 
                  : "var(--inactive-color)",
                scale: isHovered && isActive ? 1.05 : 1,
              }}
              style={{
                "--active-color": "var(--text-primary, #1c1c1a)",
                "--inactive-color": "var(--border-color, rgba(0, 0, 0, 0.06))",
              } as React.CSSProperties}
              transition={{
                duration: 0.2,
                delay: isHovered && isActive ? segmentIdx * 0.07 : 0, 
              }}
              className="h-2.5 flex-1 rounded-none border border-black/[0.03] dark:border-white/[0.03] bg-zinc-200 dark:bg-zinc-800 transition-colors duration-300"
            />
          );
        })}

        {/* Sophisticated square sparks positioned relative to smoothly sliding emitterX */}
        {isHovered &&
          sparks.map((spark) => (
            <motion.div
              key={spark.id}
              initial={{
                left: `${spark.xPercent}%`,
                top: `50%`,
                y: spark.y,
                opacity: 1,
                scale: 1,
                rotate: 45, // diamond rotated shape for premium feel
              }}
              animate={{
                left: `${spark.xPercent + (Math.random() * 4 - 2)}%`,
                y: spark.y - (20 + Math.random() * 30), 
                opacity: 0,
                scale: 0.1,
              }}
              transition={{
                duration: 0.5 + Math.random() * 0.2,
                ease: "easeOut",
                delay: spark.delay,
              }}
              className="absolute pointer-events-none rounded-none bg-zinc-700 dark:bg-zinc-200 shadow-[0_0_4px_rgba(255,255,255,0.4)]"
              style={{
                width: spark.size,
                height: spark.size,
                marginTop: -spark.size / 2,
              }}
            />
          ))}
      </div>
    </motion.div>
  );
}

export default function InteractiveStats() {
  const statsData: StatItem[] = [
    { value: "10+", label: "Projects Completed", targetPercent: 80 },
    { value: "5+", label: "AI Workflows", targetPercent: 60 },
    { value: "3+", label: "Years Learning", targetPercent: 40 },
    { value: "∞", label: "Curiosity Factor", targetPercent: 100 },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-12 w-full">
      {statsData.map((stat, index) => (
        <StatCard
          key={index}
          stat={stat}
          index={index}
        />
      ))}
    </div>
  );
}
