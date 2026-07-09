"use client";

import dynamic from "next/dynamic";
import React from "react";

const HeroParticleScene = dynamic(
  () => import("./HeroParticleScene"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center text-zinc-400 font-sans tracking-widest text-xs uppercase animate-pulse">
        Initializing Particle Scene...
      </div>
    ),
  }
);

export default function DynamicSculpture({ isDark, isReady }: { isDark: boolean; isReady: boolean }) {
  return <HeroParticleScene isReady={isReady} />;
}
