"use client";

import React from "react";

export default function FloatingBackground() {
  return (
    // Raised z-index to z-10 so elements float on top of solid background sections, keeping pointer-events-none
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10 select-none opacity-60 dark:opacity-30 transition-opacity duration-1000">
      
      {/* Dynamic light glowing ambient blobs */}
      <div className="absolute top-[10%] left-[5%] w-[35vw] h-[35vw] rounded-full bg-radial-gradient from-zinc-300/40 dark:from-zinc-800/15 to-transparent blur-[90px] animate-[drift_30s_infinite_alternate_ease-in-out]" />
      <div className="absolute bottom-[15%] right-[8%] w-[40vw] h-[40vw] rounded-full bg-radial-gradient from-zinc-400/30 dark:from-zinc-900/15 to-transparent blur-[110px] animate-[drift_40s_infinite_alternate_ease-in-out_2s]" />
      <div className="absolute top-[50%] left-[60%] w-[25vw] h-[25vw] rounded-full bg-radial-gradient from-zinc-300/30 dark:from-zinc-800/20 to-transparent blur-[70px] animate-[drift_35s_infinite_alternate_ease-in-out_4s]" />

      {/* Floating Wireframe Origami Shapes - increased opacity for visibility */}
      <svg className="absolute w-20 h-20 text-zinc-400 dark:text-zinc-700/80 top-[15%] right-[25%] opacity-70 dark:opacity-40 animate-[float-rot_40s_infinite_linear]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.75">
        {/* Wireframe origami plane */}
        <polygon points="10,50 90,30 50,80" />
        <line x1="10" y1="50" x2="50" y2="80" />
        <line x1="90" y1="30" x2="50" y2="80" />
        <line x1="10" y1="50" x2="90" y2="30" />
      </svg>

      <svg className="absolute w-24 h-24 text-zinc-400 dark:text-zinc-700/60 bottom-[20%] left-[15%] opacity-70 dark:opacity-30 animate-[float-rot_55s_infinite_linear_reverse]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.75">
        {/* Geometric diamond / paper fold */}
        <polygon points="50,10 90,50 50,90 10,50" />
        <line x1="50" y1="10" x2="50" y2="90" />
        <line x1="10" y1="50" x2="90" y2="50" />
        <line x1="50" y1="10" x2="10" y2="50" />
        <line x1="50" y1="90" x2="90" y2="50" />
      </svg>

      <svg className="absolute w-16 h-16 text-zinc-350 dark:text-zinc-800 top-[65%] right-[10%] opacity-80 dark:opacity-40 animate-[float-rot_48s_infinite_linear]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
        {/* Simple fold pyramid */}
        <polygon points="50,15 15,75 85,75" />
        <line x1="50" y1="15" x2="50" y2="75" />
        <line x1="15" y1="75" x2="50" y2="75" />
        <line x1="85" y1="75" x2="50" y2="75" />
      </svg>

      {/* Subtle Grid overlay pattern */}
      <div 
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.05]" 
        style={{
          backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
          backgroundSize: "28px 28px"
        }}
      />

      {/* CSS Keyframe animations directly injected for portability */}
      <style jsx global>{`
        @keyframes drift {
          0% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(4vw, -6vh) scale(1.1);
          }
          100% {
            transform: translate(-3vw, 5vh) scale(0.95);
          }
        }
        @keyframes float-rot {
          0% {
            transform: translateY(0) rotate(0deg) scale(1);
          }
          50% {
            transform: translateY(-25px) rotate(180deg) scale(1.05);
          }
          100% {
            transform: translateY(0) rotate(360deg) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
