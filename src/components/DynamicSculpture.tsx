"use client";

import dynamic from "next/dynamic";
import React from "react";

const HeroPaperScene = dynamic(
  () => import("./HeroPaperScene"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center text-zinc-400 font-sans tracking-widest text-xs uppercase animate-pulse">
        Initializing Paper Scene...
      </div>
    ),
  }
);

export default function DynamicSculpture({ isDark }: { isDark: boolean }) {
  return <HeroPaperScene isDark={isDark} />;
}
