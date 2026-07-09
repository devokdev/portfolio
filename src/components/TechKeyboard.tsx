"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TechKey {
  keyLabel: string; // The physical keyboard key, e.g., 'Q'
  name: string;     // The tech name, e.g., 'Python'
  icon: React.ReactNode; // SVG icon
  definition: string;
  category: string;
  bgClass: string;     // Top surface color base
  lipColor: string;    // 3D lip bottom shadow color
  textClass: string;   // Icon and label color class
}

const TECH_KEYS: TechKey[] = [
  // ROW 1
  {
    keyLabel: "Q",
    name: "Python",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.93 2.01c-2.58 0-4.94.22-4.94 2.3v1.65h5V7.5h-7c-1.85 0-3 1.15-3 3v4.6c0 1.85 1.15 3 3 3h1.65v-2.3c0-2.08 1.67-3.75 3.75-3.75h4.65c1.85 0 3-1.15 3-3V5.2c0-1.85-1.15-3.19-3.11-3.19zM8.33 3.6c.36 0 .65.29.65.65s-.29.65-.65.65-.65-.29-.65-.65.29-.65.65-.65zM15.42 16.5h-5v1.54c0 2.08-1.67 3.75-3.75 3.75H2c1.85 0 3.11-1.34 3.11-3.19v-4.5c0-1.85 1.15-3 3-3h7V9.6h-1.65v2.3c0 2.08-1.67 3.75-3.75 3.75H5.06c-1.85 0-3 1.15-3 3v4.6c0 1.85 1.15 3 3 3H10c1.85 0 3-1.15 3-3v-4.6c0-1.85-1.15-3.15-3.11-3.15zm-3.35 3.9c-.36 0-.65-.29-.65-.65s.29-.65.65-.65.65.29.65.65-.29.65-.65.65z" />
      </svg>
    ),
    definition: "A high-level language optimized for readability, AI, and scripting.",
    category: "Languages",
    bgClass: "bg-zinc-700",
    lipColor: "#3f3f46",
    textClass: "text-zinc-100"
  },
  {
    keyLabel: "W",
    name: "TypeScript",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M2 2h20v20H2V2zm12.3 10.74h-2.38V20h-2.6v-7.26H7V10.4h7.3v2.34zm6.05 4.3c-.02 1.48-1.07 2.62-2.92 2.62-1.78 0-2.82-.93-3-2.38h2.46c.09.58.46.88 1.05.88.54 0 .86-.27.86-.68 0-.41-.33-.58-.98-.86l-.76-.32c-1.32-.56-2.18-1.28-2.18-2.73 0-1.57 1.25-2.69 3.03-2.69 1.77 0 2.67.92 2.76 2.27H16.4c-.06-.51-.37-.77-.86-.77-.48 0-.77.22-.77.58 0 .34.21.5.86.77l.76.32c1.47.62 2.16 1.4 2.16 2.98z" />
      </svg>
    ),
    definition: "Strictly typed superset of JavaScript that compiles to plain JS.",
    category: "Languages",
    bgClass: "bg-zinc-800",
    lipColor: "#18181b",
    textClass: "text-zinc-200"
  },
  {
    keyLabel: "E",
    name: "JavaScript",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M2 2h20v20H2V2zm15.48 11.23c-.1-.78-.58-1.28-1.42-1.28-.78 0-1.25.43-1.25 1.03 0 .7.51.95 1.4.1.34l.98.38c1.78.68 2.5 1.55 2.5 3.08 0 1.94-1.38 3.19-3.75 3.19-2.33 0-3.66-1.12-3.87-2.9h2.82c.08.76.57 1.28 1.48 1.28.78 0 1.35-.42 1.35-1.17 0-.75-.43-.98-1.35-1.37l-.98-.4c-1.63-.67-2.33-1.48-2.33-2.92 0-1.74 1.34-3.03 3.49-3.03 2.01 0 3.28.98 3.51 2.7h-2.78zm-6.68 5.75c-.2 1.15-1.22 1.9-2.74 1.9-1.8 0-2.88-.93-2.97-2.86h2.58c.07.61.42.96 1.02.96.6 0 .93-.3.93-.89v-8.77h2.7v8.78c0 .24-.03.48-.06.72l-.12-.72c0 1.45-.73 2.18-1.84 2.18z" />
      </svg>
    ),
    definition: "High-level, interpreted scripting language for web pages and servers.",
    category: "Languages",
    bgClass: "bg-zinc-600",
    lipColor: "#27272a",
    textClass: "text-zinc-100"
  },
  {
    keyLabel: "R",
    name: "React.js",
    icon: (
      <svg className="w-5 h-5 animate-[spin_8s_linear_infinite]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(0 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
    ),
    definition: "Declarative, efficient, and flexible JavaScript library for building UIs.",
    category: "Frontend",
    bgClass: "bg-zinc-300",
    lipColor: "#a1a1aa",
    textClass: "text-zinc-950"
  },
  {
    keyLabel: "T",
    name: "Next.js",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 18L12 6L16 18" />
        <path d="M8 12H16" />
      </svg>
    ),
    definition: "The React framework for production, supporting SSR and static sites.",
    category: "Frontend",
    bgClass: "bg-zinc-400",
    lipColor: "#71717a",
    textClass: "text-zinc-950"
  },
  {
    keyLabel: "Y",
    name: "Node.js",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L3.5 6.9v10.2L12 22l8.5-4.9V6.9L12 2zm6.7 13.9l-6.7 3.9v-7.8l6.7-3.9v7.8zm-8.2 3.9l-6.7-3.9V8.2l6.7 3.9v7.8z" />
      </svg>
    ),
    definition: "Open-source, cross-platform JavaScript runtime environment.",
    category: "Backend",
    bgClass: "bg-zinc-500",
    lipColor: "#52525b",
    textClass: "text-zinc-100"
  },
  {
    keyLabel: "U",
    name: "FastAPI",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    definition: "Modern, fast (high-performance) web framework for building APIs with Python.",
    category: "Backend",
    bgClass: "bg-zinc-700",
    lipColor: "#3f3f46",
    textClass: "text-zinc-100"
  },
  {
    keyLabel: "I",
    name: "PostgreSQL",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5V19A9 3 0 0 0 21 19V5" />
        <path d="M3 12A9 3 0 0 0 21 12" />
      </svg>
    ),
    definition: "Powerful, open-source object-relational database system.",
    category: "Database",
    bgClass: "bg-zinc-800",
    lipColor: "#18181b",
    textClass: "text-zinc-200"
  },

  // ROW 2
  {
    keyLabel: "A",
    name: "Docker",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.983 8.878h-2.208v2.162h2.208V8.878zm3.256 0h-2.228v2.162h2.228V8.878zm-6.527 0H8.504v2.162h2.208V8.878zm-3.272 0H5.217v2.162h2.228V8.878zm3.272-2.454H8.504v2.16h2.208V6.424zm-3.272 0H5.217v2.16h2.228V6.424zm6.543 0h-2.208v2.16h2.208V6.424zm-3.271-2.438H8.504v2.16h2.208V3.986zm10.742 7.747c-.042-.03-.276-.204-.847-.204-.37 0-.756.143-1.077.348-.48.307-.803.738-1.011 1.25-.13.317-.183.702-.183 1.085 0 .285.03.542.083.76h-.018c-.08-.184-.183-.343-.323-.482-.607-.604-1.636-.604-2.242 0-.214.21-.365.49-.444.805a2.532 2.532 0 00-.063.535c-.015.092-.023.18-.023.27v.032c-.086-.184-.197-.348-.344-.492-.61-.607-1.636-.607-2.243 0-.256.257-.424.618-.466 1.02a2.91 2.91 0 00-.012.38v.032l-.008.016c-.035-.116-.07-.24-.12-.345a2.316 2.316 0 00-.317-.506 2.217 2.217 0 00-.917-.655 2.518 2.518 0 00-.937-.179c-.394 0-.77.106-1.07.283a2.308 2.308 0 00-.774.8c-.287.49-.408 1.07-.408 1.65v.087H2.218v1.656c0 .445.068.796.223 1.08.31.57.854.912 1.488.912h16.29c.774 0 1.458-.46 1.834-1.22.257-.518.324-1.127.324-1.785 0-3.14-2.313-5.267-4.394-5.267z" />
      </svg>
    ),
    definition: "Containerization platform to build, ship, and run applications anywhere.",
    category: "DevOps",
    bgClass: "bg-zinc-650",
    lipColor: "#27272a",
    textClass: "text-zinc-100"
  },
  {
    keyLabel: "S",
    name: "Git",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V6" />
        <circle cx="9" cy="6" r="3" />
        <path d="M12 12c-3 0-3 3-6 3" />
        <circle cx="18" cy="12" r="3" />
        <path d="M18 15v3a3 3 0 0 1-3 3H9" />
      </svg>
    ),
    definition: "Distributed version control system for tracking source code changes.",
    category: "Tools",
    bgClass: "bg-zinc-400",
    lipColor: "#71717a",
    textClass: "text-zinc-950"
  },
  {
    keyLabel: "D",
    name: "GitHub",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
      </svg>
    ),
    definition: "Cloud-based hosting service for Git repositories and collaboration.",
    category: "Tools",
    bgClass: "bg-zinc-800",
    lipColor: "#18181b",
    textClass: "text-zinc-200"
  },
  {
    keyLabel: "F",
    name: "PyTorch",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.65 14.65c-.3.3-.7.45-1.15.45s-.85-.15-1.15-.45c-.3-.3-.45-.7-.45-1.15s.15-.85.45-1.15c.3-.3.7-.45 1.15-.45s.85.15 1.15.45c.3.3.45.7.45 1.15s-.15.85-.45 1.15zm.25-4.8c-.05.15-.15.25-.3.3L12 12.85l-1.6-1c-.15-.05-.25-.15-.3-.3l-1.35-4.1c-.05-.15 0-.3.1-.4.1-.1.25-.15.4-.1L12 7.75l2.75-1c.15-.05.3 0 .4.1.1.1.15.25.1.4l-1.35 4.1z" />
      </svg>
    ),
    definition: "Open-source machine learning library based on the Torch library.",
    category: "AI/ML",
    bgClass: "bg-zinc-300",
    lipColor: "#a1a1aa",
    textClass: "text-zinc-950"
  },
  {
    keyLabel: "G",
    name: "GenAI & LLMs",
    icon: (
      <svg className="w-5 h-5 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        <circle cx="12" cy="12" r="4" fill="currentColor" />
      </svg>
    ),
    definition: "Artificial intelligence models capable of generating text, code, or media.",
    category: "AI/ML",
    bgClass: "bg-zinc-500",
    lipColor: "#52525b",
    textClass: "text-zinc-100"
  },
  {
    keyLabel: "H",
    name: "Tailwind CSS",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
      </svg>
    ),
    definition: "Utility-first CSS framework for rapid and modern UI development.",
    category: "Frontend",
    bgClass: "bg-zinc-700",
    lipColor: "#3f3f46",
    textClass: "text-zinc-100"
  },
  {
    keyLabel: "J",
    name: "SQLite",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 22V4c0-.5.2-1 .6-1.4C5 2.2 5.5 2 6 2h12c.5 0 1 .2 1.4.6.4.4.6.9.6 1.4v18l-8-4-8 4z" />
      </svg>
    ),
    definition: "C-language library that implements a small, fast, self-contained SQL engine.",
    category: "Database",
    bgClass: "bg-zinc-600",
    lipColor: "#27272a",
    textClass: "text-zinc-100"
  },
  {
    keyLabel: "K",
    name: "AWS",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .3a12 12 0 0 0-3.26 23.55c.6.1.83-.26.83-.58v-2.06c-1.67.36-2-.8-2-8.08V11a2.31 2.31 0 0 1 .46-1.5 2.32 2.32 0 0 1 1.5-.47c.28 0 1 .24.83.58v2.06c-1.67-.36-2 .8-2 8.08zM15.42 16.5H8.33" />
        <path d="M6.3 18.3c4.2 2.8 9.2 2.8 13.4 0-.4-.4-.8-.7-1.3-.9-3.5 2.2-7.7 2.2-11.2 0-.3.3-.6.6-.9.9z" />
      </svg>
    ),
    definition: "Comprehensive, evolving cloud computing platform provided by Amazon.",
    category: "DevOps",
    bgClass: "bg-zinc-750",
    lipColor: "#1c1917",
    textClass: "text-zinc-200"
  },
];

export default function TechKeyboard() {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [hoveredKey, setHoveredKey] = useState<TechKey | null>(null);
  const [lastPressedKey, setLastPressedKey] = useState<TechKey | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  
  const [visualizerBars, setVisualizerBars] = useState<number[]>([10, 10, 10, 10, 10, 10, 10, 10, 10, 10]);

  // Audio Click Synthesizer using Web Audio API
  const playKeyboardClick = (isSpace = false) => {
    if (isMuted || typeof window === "undefined") return;
    
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      
      const audioCtx = new AudioContextClass();
      const pitchFactor = 0.88 + Math.random() * 0.24; 
      
      const clickOsc = audioCtx.createOscillator();
      const clickGain = audioCtx.createGain();
      clickOsc.type = "sine";
      clickOsc.frequency.setValueAtTime((isSpace ? 750 : 1550) * pitchFactor, audioCtx.currentTime);
      clickOsc.frequency.exponentialRampToValueAtTime((isSpace ? 180 : 380) * pitchFactor, audioCtx.currentTime + 0.035);
      
      clickGain.gain.setValueAtTime(0.14, audioCtx.currentTime);
      clickGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);
      
      clickOsc.connect(clickGain);
      clickGain.connect(audioCtx.destination);
      
      const clackOsc = audioCtx.createOscillator();
      const clackGain = audioCtx.createGain();
      clackOsc.type = "triangle";
      clackOsc.frequency.setValueAtTime((isSpace ? 95 : 185) * pitchFactor, audioCtx.currentTime);
      clackOsc.frequency.exponentialRampToValueAtTime((isSpace ? 45 : 75) * pitchFactor, audioCtx.currentTime + 0.08);
      
      clackGain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      clackGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.09);
      
      clackOsc.connect(clackGain);
      clackGain.connect(audioCtx.destination);
      
      const bufferSize = audioCtx.sampleRate * 0.025; 
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      const noiseSource = audioCtx.createBufferSource();
      noiseSource.buffer = buffer;
      
      const noiseFilter = audioCtx.createBiquadFilter();
      noiseFilter.type = "bandpass";
      noiseFilter.frequency.setValueAtTime(950 * pitchFactor, audioCtx.currentTime);
      noiseFilter.Q.setValueAtTime(1.8, audioCtx.currentTime);
      
      const noiseGain = audioCtx.createGain();
      noiseGain.gain.setValueAtTime(0.035, audioCtx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.018);
      
      noiseSource.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(audioCtx.destination);
      
      clickOsc.start();
      clackOsc.start();
      noiseSource.start();
      
      clickOsc.stop(audioCtx.currentTime + 0.045);
      clackOsc.stop(audioCtx.currentTime + 0.1);
      noiseSource.stop(audioCtx.currentTime + 0.025);
      
      setVisualizerBars(Array.from({ length: 10 }, () => Math.floor(40 + Math.random() * 55)));
      setTimeout(() => {
        setVisualizerBars(Array.from({ length: 10 }, () => Math.floor(12 + Math.random() * 20)));
      }, 120);
      
    } catch (e) {
      console.warn("Web Audio click failed to play", e);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      const matchedKey = TECH_KEYS.find((k) => k.keyLabel === key);
      
      if (matchedKey) {
        e.preventDefault();
        setActiveKey(key);
        setLastPressedKey(matchedKey);
        playKeyboardClick(false);
      } else if (e.code === "Space") {
        e.preventDefault();
        setActiveKey("SPACE");
        playKeyboardClick(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      if (TECH_KEYS.some((k) => k.keyLabel === key)) {
        setActiveKey(null);
      } else if (e.code === "Space") {
        setActiveKey(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isMuted]);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisualizerBars((prev) =>
        prev.map((val) => Math.max(5, val - Math.floor(Math.random() * 8 + 3)))
      );
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const handleKeyClick = (key: TechKey) => {
    setActiveKey(key.keyLabel);
    setLastPressedKey(key);
    playKeyboardClick(false);
    setTimeout(() => {
      setActiveKey(null);
    }, 120);
  };

  const handleSpaceClick = () => {
    setActiveKey("SPACE");
    playKeyboardClick(true);
    setTimeout(() => {
      setActiveKey(null);
    }, 120);
  };

  const displayedDefinition = hoveredKey || lastPressedKey || null;

  return (
    <div className="w-full flex flex-col items-center justify-center py-6 px-4">
      {/* 3D Keyboard Housing Casing */}
      <div className="relative w-full max-w-4xl bg-gradient-to-b from-zinc-800 via-zinc-900 to-zinc-950 border-t-2 border-zinc-700/60 border-l border-r border-zinc-900 rounded-3xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.1)] transition-all duration-300">
        
        {/* Shiny metallic screw studs in corners */}
        <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-gradient-to-tr from-zinc-700 to-zinc-400 border border-zinc-900 shadow-lg" />
        <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-gradient-to-tr from-zinc-700 to-zinc-400 border border-zinc-900 shadow-lg" />
        <div className="absolute bottom-4 left-4 w-3 h-3 rounded-full bg-gradient-to-tr from-zinc-700 to-zinc-400 border border-zinc-900 shadow-lg" />
        <div className="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-gradient-to-tr from-zinc-700 to-zinc-400 border border-zinc-900 shadow-lg" />

        {/* TOP STATUS BAR (OLED Screen + Control Panel) */}
        <div className="flex flex-col md:flex-row items-stretch justify-between gap-4 mb-6 border-b border-zinc-800/80 pb-5">
          
          {/* Custom OLED Screen Display */}
          <div className="flex-1 bg-black border border-zinc-800 rounded-xl p-4 min-h-[80px] flex items-center relative overflow-hidden shadow-[inset_0_4px_10px_rgba(0,0,0,0.9)]">
            {/* Screen overlay glow scanlines */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/20 to-transparent pointer-events-none z-10" />
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] pointer-events-none" />
            
            <div className="w-full flex items-center justify-between gap-4 relative z-0">
              <div className="flex-1 font-mono text-left select-none">
                <AnimatePresence mode="wait">
                  {displayedDefinition ? (
                    <motion.div
                      key={displayedDefinition.name}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.12 }}
                    >
                      <div className="flex items-baseline gap-2">
                        <span className="text-[10px] text-zinc-500 uppercase tracking-widest">{displayedDefinition.category}</span>
                        <span className="text-xs text-zinc-700">[{displayedDefinition.keyLabel}]</span>
                      </div>
                      <h4 className="text-base font-bold text-zinc-100 uppercase tracking-wider">{displayedDefinition.name}</h4>
                      <p className="text-[11px] text-zinc-400 leading-tight mt-0.5">{displayedDefinition.definition}</p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-zinc-500 text-xs flex flex-col justify-center h-full py-1"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-zinc-700 animate-pulse" />
                        <span className="text-[10px] tracking-wider uppercase text-zinc-500">System Ready // Hover or Press key</span>
                      </div>
                      <p className="text-[11px] text-zinc-600 mt-1 font-mono">Physical bindings active: Q W E R T Y U I A S D F G H J K</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* OLED Graphic Equalizer visualizer */}
              <div className="flex items-end gap-0.5 h-10 w-20 px-2 border-l border-zinc-800">
                {visualizerBars.map((val, idx) => (
                  <div
                    key={idx}
                    className="w-1 bg-zinc-700 transition-all duration-150 ease-out"
                    style={{ height: `${val}%` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Quick controls */}
          <div className="flex md:flex-col justify-between md:justify-center items-center gap-3">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`px-4 py-2 rounded-xl border text-[10px] font-mono uppercase tracking-wider transition-all duration-200 ${
                isMuted
                  ? "bg-zinc-800/20 border-zinc-800 text-zinc-600"
                  : "bg-zinc-850 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              {isMuted ? "🔇 Sound Off" : "🔊 Sound On"}
            </button>
            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
              Glossy 3D keycaps
            </span>
          </div>

        </div>

        {/* KEYBOARD PLATE (Key Grid with dark recess frame) */}
        <div className="bg-zinc-950 border-2 border-zinc-900 rounded-2xl p-4 md:p-6 shadow-[inset_0_8px_20px_rgba(0,0,0,0.8)] flex flex-col gap-4 select-none">
          {/* Row 1 */}
          <div className="grid grid-cols-8 gap-2.5 md:gap-4 w-full">
            {TECH_KEYS.slice(0, 8).map((key) => {
              const isPressed = activeKey === key.keyLabel;
              return (
                <div
                  key={key.keyLabel}
                  className="perspective-[1000px] h-14 sm:h-16 md:h-18 relative"
                  onMouseEnter={() => setHoveredKey(key)}
                  onMouseLeave={() => setHoveredKey(null)}
                  onClick={() => handleKeyClick(key)}
                >
                  <button
                    className={`w-full h-full rounded-xl border-t border-l border-r border-white/10 transition-all duration-75 relative flex flex-col items-center justify-center p-2 cursor-pointer outline-none overflow-hidden ${key.bgClass} ${key.textClass} ${
                      isPressed
                        ? "translate-y-[6px] shadow-[0_1px_0_rgba(0,0,0,0.9)]"
                        : "shadow-[0_8px_0_var(--lip)] hover:translate-y-[-1px] hover:shadow-[0_9px_0_var(--lip)]"
                    }`}
                    style={{
                      "--lip": key.lipColor,
                    } as React.CSSProperties}
                  >
                    {/* Glossy top-glare highlight element */}
                    <div className="absolute top-[1.5px] left-[1.5px] right-[1.5px] h-[40%] bg-gradient-to-b from-white/25 to-transparent rounded-t-lg pointer-events-none" />
                    
                    {/* Key Legend Label (Q, W, E, etc.) in upper corner */}
                    <span className="absolute top-1.5 left-2 text-[8px] md:text-[9px] font-mono font-bold opacity-45">
                      {key.keyLabel}
                    </span>

                    {/* Logo Icon instead of initials */}
                    <div className="mt-2.5 flex items-center justify-center opacity-85 hover:opacity-100 transition-opacity">
                      {key.icon}
                    </div>

                    {/* Sub-label under logo */}
                    <span className="text-[7px] md:text-[8px] uppercase tracking-wider font-mono font-bold opacity-30 mt-1">
                      {key.name.slice(0, 4)}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-8 gap-2.5 md:gap-4 w-full">
            {TECH_KEYS.slice(8, 16).map((key) => {
              const isPressed = activeKey === key.keyLabel;
              return (
                <div
                  key={key.keyLabel}
                  className="perspective-[1000px] h-14 sm:h-16 md:h-18 relative"
                  onMouseEnter={() => setHoveredKey(key)}
                  onMouseLeave={() => setHoveredKey(null)}
                  onClick={() => handleKeyClick(key)}
                >
                  <button
                    className={`w-full h-full rounded-xl border-t border-l border-r border-white/10 transition-all duration-75 relative flex flex-col items-center justify-center p-2 cursor-pointer outline-none overflow-hidden ${key.bgClass} ${key.textClass} ${
                      isPressed
                        ? "translate-y-[6px] shadow-[0_1px_0_rgba(0,0,0,0.9)]"
                        : "shadow-[0_8px_0_var(--lip)] hover:translate-y-[-1px] hover:shadow-[0_9px_0_var(--lip)]"
                    }`}
                    style={{
                      "--lip": key.lipColor,
                    } as React.CSSProperties}
                  >
                    {/* Glossy top-glare highlight element */}
                    <div className="absolute top-[1.5px] left-[1.5px] right-[1.5px] h-[40%] bg-gradient-to-b from-white/25 to-transparent rounded-t-lg pointer-events-none" />

                    {/* Key Legend Label (A, S, D, etc.) */}
                    <span className="absolute top-1.5 left-2 text-[8px] md:text-[9px] font-mono font-bold opacity-45">
                      {key.keyLabel}
                    </span>

                    {/* Logo Icon instead of initials */}
                    <div className="mt-2.5 flex items-center justify-center opacity-85 hover:opacity-100 transition-opacity">
                      {key.icon}
                    </div>

                    {/* Sub-label under logo */}
                    <span className="text-[7px] md:text-[8px] uppercase tracking-wider font-mono font-bold opacity-30 mt-1">
                      {key.name.slice(0, 4)}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Row 3 (Spacebar & Side keys for realism) */}
          <div className="grid grid-cols-12 gap-2.5 md:gap-4 w-full mt-1.5">
            {/* CTRL Key */}
            <div className="col-span-2 perspective-[1000px] h-12 md:h-13">
              <button
                className="w-full h-full rounded-xl bg-zinc-800 border-t border-white/10 shadow-[0_6px_0_#27272a] flex items-center justify-center text-[8px] font-mono uppercase text-zinc-550 cursor-not-allowed select-none relative overflow-hidden"
                disabled
              >
                <div className="absolute top-[1px] left-[1px] right-[1px] h-[40%] bg-gradient-to-b from-white/15 to-transparent rounded-t-lg" />
                CTRL
              </button>
            </div>
            
            {/* ALT Key */}
            <div className="col-span-1 perspective-[1000px] h-12 md:h-13">
              <button
                className="w-full h-full rounded-xl bg-zinc-850 border-t border-white/10 shadow-[0_6px_0_#18181b] flex items-center justify-center text-[8px] font-mono uppercase text-zinc-550 cursor-not-allowed select-none relative overflow-hidden"
                disabled
              >
                <div className="absolute top-[1px] left-[1px] right-[1px] h-[40%] bg-gradient-to-b from-white/15 to-transparent rounded-t-lg" />
                ALT
              </button>
            </div>

            {/* Spacebar */}
            <div
              className="col-span-6 perspective-[1000px] h-12 md:h-13 relative"
              onClick={handleSpaceClick}
            >
              <button
                className={`w-full h-full rounded-xl border-t border-white/15 transition-all duration-75 relative flex items-center justify-center cursor-pointer outline-none overflow-hidden bg-zinc-700 text-zinc-100 ${
                  activeKey === "SPACE"
                    ? "translate-y-[4px] shadow-[0_1px_0_rgba(0,0,0,0.9)]"
                    : "shadow-[0_6px_0_#3f3f46] hover:translate-y-[-1px] hover:shadow-[0_7px_0_#3f3f46]"
                }`}
              >
                <div className="absolute top-[1px] left-[1px] right-[1px] h-[40%] bg-gradient-to-b from-white/20 to-transparent rounded-t-lg" />
                <div className="w-16 h-1 rounded-full bg-zinc-500 opacity-60" />
              </button>
            </div>

            {/* ALT Key */}
            <div className="col-span-1 perspective-[1000px] h-12 md:h-13">
              <button
                className="w-full h-full rounded-xl bg-zinc-850 border-t border-white/10 shadow-[0_6px_0_#18181b] flex items-center justify-center text-[8px] font-mono uppercase text-zinc-550 cursor-not-allowed select-none relative overflow-hidden"
                disabled
              >
                <div className="absolute top-[1px] left-[1px] right-[1px] h-[40%] bg-gradient-to-b from-white/15 to-transparent rounded-t-lg" />
                ALT
              </button>
            </div>

            {/* FN Key */}
            <div className="col-span-2 perspective-[1000px] h-12 md:h-13">
              <button
                className="w-full h-full rounded-xl bg-zinc-800 border-t border-white/10 shadow-[0_6px_0_#27272a] flex items-center justify-center text-[8px] font-mono uppercase text-zinc-550 cursor-not-allowed select-none relative overflow-hidden"
                disabled
              >
                <div className="absolute top-[1px] left-[1px] right-[1px] h-[40%] bg-gradient-to-b from-white/15 to-transparent rounded-t-lg" />
                FN
              </button>
            </div>
          </div>
        </div>

        {/* Control hint label */}
        <div className="mt-5 text-center">
          <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
            Type Q W E R T Y U I A S D F G H J K or SPACE on your keyboard to click
          </p>
        </div>

      </div>
    </div>
  );
}
