"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TechKey {
  keyLabel: string;    // Physical keyboard binding
  name: string;        // Tech name
  slugName: string;    // Simple Icons slug
  definition: string;
  category: string;
  type: "white" | "black";
  frequency: number;
  estYear: number;     // Year of launch/creation
}

const TECH_KEYS: TechKey[] = [
  // White keys (14 total)
  {
    keyLabel: "Q",
    name: "Python",
    slugName: "python",
    definition: "The snake charmer of code. Runs your data pipelines, writes your scripts, and powers AI models that act like they know everything.",
    category: "Languages",
    type: "white",
    frequency: 261.63,
    estYear: 1991
  },
  {
    keyLabel: "E",
    name: "JavaScript",
    slugName: "javascript",
    definition: "The chaotic neutral wizard of the web. It's quirky, it's everywhere, it behaves weirdly, but it makes the digital world go round.",
    category: "Languages",
    type: "white",
    frequency: 293.66,
    estYear: 1995
  },
  {
    keyLabel: "R",
    name: "React.js",
    slugName: "react",
    definition: "UI Lego blocks. Move them, compose them, break them, and watch your state render 10,000 times because you forgot a dependency array.",
    category: "Frontend",
    type: "white",
    frequency: 329.63,
    estYear: 2013
  },
  {
    keyLabel: "T",
    name: "Next.js",
    slugName: "nextdotjs",
    definition: "React with a fancy university degree. Does server-side magic, structures your files, and makes your SEO climb to the stars.",
    category: "Frontend",
    type: "white",
    frequency: 349.23,
    estYear: 2016
  },
  {
    keyLabel: "Y",
    name: "Node.js",
    slugName: "nodedotjs",
    definition: "Taking JavaScript out of its browser cage and letting it run wild on the server. Fast, event-driven, and slightly hyperactive.",
    category: "Backend",
    type: "white",
    frequency: 392.00,
    estYear: 2009
  },
  {
    keyLabel: "U",
    name: "FastAPI",
    slugName: "fastapi",
    definition: "Python at warp speed. Generates interactive API documentation automatically because writing docs is a chore.",
    category: "Backend",
    type: "white",
    frequency: 440.00,
    estYear: 2018
  },
  {
    keyLabel: "I",
    name: "PostgreSQL",
    slugName: "postgresql",
    definition: "The absolute bedrock of relational truth. Unshakable, sturdy, and guards your data like a giant elephant guardian.",
    category: "Database",
    type: "white",
    frequency: 493.88,
    estYear: 1996
  },
  {
    keyLabel: "A",
    name: "Docker",
    slugName: "docker",
    definition: "But it works on my machine! Fine, then we will package your machine in a little shipping container and run it on Mars.",
    category: "DevOps",
    type: "white",
    frequency: 523.25,
    estYear: 2013
  },
  {
    keyLabel: "S",
    name: "Git",
    slugName: "git",
    definition: "A time-travel machine for code. Save points, parallel realities (branches), and the occasional merge conflict nightmare.",
    category: "Tools",
    type: "white",
    frequency: 587.33,
    estYear: 2005
  },
  {
    keyLabel: "H",
    name: "Tailwind CSS",
    slugName: "tailwindcss",
    definition: "Injecting utility classes directly into your HTML until your code looks like a giant bowl of alphabet soup, but looks gorgeous.",
    category: "Frontend",
    type: "white",
    frequency: 659.25,
    estYear: 2017
  },
  {
    keyLabel: "Z",
    name: "C++",
    slugName: "cplusplus",
    definition: "The high-performance muscle-car of languages. Zero safety nets, manual memory management, and compilation errors that look like ancient scrolls.",
    category: "Languages",
    type: "white",
    frequency: 698.46,
    estYear: 1985
  },
  {
    keyLabel: "X",
    name: "Java",
    slugName: "openjdk",
    definition: "Write once, run anywhere... as long as you have enough RAM to feed the garbage collector. Verbose, corporate, and extremely object-oriented.",
    category: "Languages",
    type: "white",
    frequency: 783.99,
    estYear: 1995
  },
  {
    keyLabel: "C",
    name: "Flask",
    slugName: "flask",
    definition: "Python's minimalist micro-framework. It doesn't tell you how to structure your app; it just hands you a clean glass of water and says 'go build'.",
    category: "Frontend",
    type: "white",
    frequency: 880.00,
    estYear: 2010
  },
  {
    keyLabel: "V",
    name: "Ollama",
    slugName: "ollama",
    definition: "Running open-source LLMs locally on your own laptop so you can chat with AI without sending your secrets to the cloud.",
    category: "Tools",
    type: "white",
    frequency: 987.77,
    estYear: 2023
  },

  // Black keys (9 total)
  {
    keyLabel: "W",
    name: "TypeScript",
    slugName: "typescript",
    definition: "JavaScript, but with a strict parent who watches your every move and yells at compile time. Prevents self-inflicted wounds.",
    category: "Languages",
    type: "black",
    frequency: 277.18,
    estYear: 2012
  },
  {
    keyLabel: "D",
    name: "GitHub",
    slugName: "github",
    definition: "The developer's social club. Where we show off our green lawns (contribution grids) and hoard stars like space pirates.",
    category: "Tools",
    type: "black",
    frequency: 311.13,
    estYear: 2008
  },
  {
    keyLabel: "F",
    name: "PyTorch",
    slugName: "pytorch",
    definition: "Teaching matrix math to silicon chips so they can hallucinate poetry, generate images of cats, and understand human speech.",
    category: "AI/ML",
    type: "black",
    frequency: 369.99,
    estYear: 2016
  },
  {
    keyLabel: "G",
    name: "GenAI & LLMs",
    slugName: "huggingface",
    definition: "Talking to computer chips using human words and hoping they don't start referencing their own imaginary memories.",
    category: "AI/ML",
    type: "black",
    frequency: 415.30,
    estYear: 2017
  },
  {
    keyLabel: "J",
    name: "SQLite",
    slugName: "sqlite",
    definition: "A database that lives inside a single tiny file on your computer. Compact, self-contained, and surprisingly punchy.",
    category: "Database",
    type: "black",
    frequency: 466.16,
    estYear: 2000
  },
  {
    keyLabel: "K",
    name: "AWS",
    slugName: "amazonwebservices",
    definition: "Amazon's infinite cloud playground. Hundreds of services with strange acronyms and a bill that keeps your heart racing.",
    category: "DevOps",
    type: "black",
    frequency: 554.37,
    estYear: 2006
  },
  {
    keyLabel: "L",
    name: "Firebase",
    slugName: "firebase",
    definition: "Backend-as-a-Service that gets your app running in 5 minutes, and then makes you double check your database queries so you don't go broke.",
    category: "Tools",
    type: "black",
    frequency: 622.25,
    estYear: 2011
  },
  {
    keyLabel: "N",
    name: "Deep Learning",
    slugName: "tensorflow",
    definition: "Stacking layers of artificial neurons so high that they eventually learn to predict the next word or find the cat in the image.",
    category: "AI/ML",
    type: "black",
    frequency: 739.99,
    estYear: 2006
  },
  {
    keyLabel: "M",
    name: "RAG Pipelines",
    slugName: "qdrant",
    definition: "Giving LLMs an open-book test by feeding them custom search engine data so they stop hallucinating and speak factual truths.",
    category: "AI/ML",
    type: "black",
    frequency: 830.61,
    estYear: 2020
  }
];

interface FloatingNote {
  id: number;
  char: string;
  left: number;
}

export default function TechKeyboard() {
  const [activeKeys, setActiveKeys] = useState<Record<string, boolean>>({});
  const [hoveredKey, setHoveredKey] = useState<TechKey | null>(null);
  const [lastPressedKey, setLastPressedKey] = useState<TechKey | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [floatingNotes, setFloatingNotes] = useState<FloatingNote[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasSwept, setHasSwept] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const sweepTimerRef = useRef<NodeJS.Timeout | null>(null);

  const whiteKeys = TECH_KEYS.filter((k) => k.type === "white");
  const blackKeys = TECH_KEYS.filter((k) => k.type === "black");

  // Calculate left offset percentage for black keys centered exactly on seams
  const getBlackKeyLeft = (keyLabel: string): string => {
    let seamIndex = 0;
    if (keyLabel === "W") seamIndex = 1;
    else if (keyLabel === "D") seamIndex = 2;
    else if (keyLabel === "F") seamIndex = 4;
    else if (keyLabel === "G") seamIndex = 5;
    else if (keyLabel === "J") seamIndex = 6;
    else if (keyLabel === "K") seamIndex = 8;
    else if (keyLabel === "L") seamIndex = 9;
    else if (keyLabel === "N") seamIndex = 11;
    else if (keyLabel === "M") seamIndex = 12;
    return `${(seamIndex / 14) * 100}%`;
  };

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("skills");
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const totalDist = rect.height + windowHeight;
      const currentDist = windowHeight - rect.top;
      const progress = Math.min(Math.max(currentDist / totalDist, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (sweepTimerRef.current) clearInterval(sweepTimerRef.current);
    };
  }, []);

  // One-time Glissando Sweep when user scrolls down to capabilities
  useEffect(() => {
    if (scrollProgress > 0.15 && !hasSwept) {
      setHasSwept(true);
      let i = 0;
      sweepTimerRef.current = setInterval(() => {
        if (i < TECH_KEYS.length) {
          setHoveredKey(TECH_KEYS[i]);
          i++;
        } else {
          setHoveredKey(null);
          if (sweepTimerRef.current) {
            clearInterval(sweepTimerRef.current);
            sweepTimerRef.current = null;
          }
        }
      }, 70);
    }
  }, [scrollProgress, hasSwept]);

  const stopSweep = () => {
    if (sweepTimerRef.current) {
      clearInterval(sweepTimerRef.current);
      sweepTimerRef.current = null;
    }
  };

  const playPianoNote = (keyLabel: string, freq: number) => {
    if (isMuted || typeof window === "undefined") return;

    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          audioCtxRef.current = new AudioContextClass();
        }
      }

      const audioCtx = audioCtxRef.current;
      if (!audioCtx) return;

      if (audioCtx.state === "suspended") {
        audioCtx.resume();
      }
      
      const masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0, audioCtx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.25, audioCtx.currentTime + 0.01);
      masterGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);
      masterGain.connect(audioCtx.destination);

      const osc1 = audioCtx.createOscillator();
      const gain1 = audioCtx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain1.gain.setValueAtTime(0.8, audioCtx.currentTime);
      osc1.connect(gain1).connect(masterGain);

      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(freq * 2, audioCtx.currentTime);
      gain2.gain.setValueAtTime(0.2, audioCtx.currentTime);
      osc2.connect(gain2).connect(masterGain);

      const osc3 = audioCtx.createOscillator();
      const gain3 = audioCtx.createGain();
      osc3.type = "sine";
      osc3.frequency.setValueAtTime(freq * 3, audioCtx.currentTime);
      gain3.gain.setValueAtTime(0.08, audioCtx.currentTime);
      osc3.connect(gain3).connect(masterGain);

      const oscNoise = audioCtx.createOscillator();
      const gainNoise = audioCtx.createGain();
      oscNoise.type = "triangle";
      oscNoise.frequency.setValueAtTime(freq * 4, audioCtx.currentTime);
      gainNoise.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gainNoise.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);
      oscNoise.connect(gainNoise).connect(audioCtx.destination);

      osc1.start();
      osc2.start();
      osc3.start();
      oscNoise.start();

      const stopTime = audioCtx.currentTime + 1.3;
      osc1.stop(stopTime);
      osc2.stop(stopTime);
      osc3.stop(stopTime);
      oscNoise.stop(audioCtx.currentTime + 0.05);

      triggerFloatingNote();
    } catch (e) {
      console.warn("Web Audio failed to synthesize note:", e);
    }
  };

  const triggerFloatingNote = () => {
    const chars = ["♩", "𝅘𝅥𝅮", "♫", "♬", "𝄞"];
    const randomChar = chars[Math.floor(Math.random() * chars.length)];
    const newNote = {
      id: Date.now() + Math.random(),
      char: randomChar,
      left: Math.random() * 80 + 10,
    };
    setFloatingNotes((prev) => [...prev, newNote]);
    setTimeout(() => {
      setFloatingNotes((prev) => prev.filter((n) => n.id !== newNote.id));
    }, 1500);
  };

  useEffect(() => {
    const isTypingInInput = () => {
      const activeEl = document.activeElement;
      if (!activeEl) return false;
      return (
        activeEl.tagName === "INPUT" ||
        activeEl.tagName === "TEXTAREA" ||
        activeEl.hasAttribute("contenteditable") ||
        activeEl.getAttribute("role") === "textbox"
      );
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTypingInInput()) return;

      const key = e.key.toUpperCase();
      const matchedKey = TECH_KEYS.find((k) => k.keyLabel === key);

      if (matchedKey) {
        e.preventDefault();
        stopSweep();
        setActiveKeys((prev) => ({ ...prev, [key]: true }));
        setLastPressedKey(matchedKey);
        playPianoNote(key, matchedKey.frequency);
      } else if (e.code === "Space") {
        e.preventDefault();
        setActiveKeys((prev) => ({ ...prev, SPACE: true }));
        playPianoNote("SPACE", 196.00);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (isTypingInInput()) return;

      const key = e.key.toUpperCase();
      if (TECH_KEYS.some((k) => k.keyLabel === key)) {
        setActiveKeys((prev) => ({ ...prev, [key]: false }));
      } else if (e.code === "Space") {
        setActiveKeys((prev) => ({ ...prev, SPACE: false }));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isMuted]);

  const handleKeyPress = (key: TechKey) => {
    stopSweep();
    setActiveKeys((prev) => ({ ...prev, [key.keyLabel]: true }));
    setLastPressedKey(key);
    playPianoNote(key.keyLabel, key.frequency);
  };

  const handleKeyRelease = (key: TechKey) => {
    setActiveKeys((prev) => ({ ...prev, [key.keyLabel]: false }));
  };

  const handleSpacePress = () => {
    setActiveKeys((prev) => ({ ...prev, SPACE: true }));
    playPianoNote("SPACE", 196.00);
  };

  const handleSpaceRelease = () => {
    setActiveKeys((prev) => ({ ...prev, SPACE: false }));
  };

  const displayedKey = lastPressedKey;

  const getTempoLabel = (category: string) => {
    switch (category) {
      case "Languages": return "Andante Expressivo";
      case "Frontend": return "Allegro Vivace";
      case "Backend": return "Presto Hypersonico";
      case "Database": return "Grave Solidus";
      case "DevOps": return "Con Brio Container";
      case "Tools": return "Tempo Rubato";
      case "AI/ML": return "Molto Intellectus";
      default: return "Moderato";
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-6 px-4 relative z-10 overflow-visible">
      
      {/* Ambient background glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 rounded-3xl">
        <div className="absolute top-[20%] left-[25%] w-[50%] h-[50%] bg-zinc-800/10 rounded-full blur-[100px] animate-pulse pointer-events-none" style={{ animationDuration: "8s" }} />
        <div className="absolute bottom-[10%] right-[20%] w-[45%] h-[45%] bg-zinc-700/5 rounded-full blur-[120px] animate-pulse pointer-events-none" style={{ animationDuration: "14s" }} />
      </div>

      {/* Floating Note Particles */}
      <div className="absolute w-full max-w-6xl h-32 pointer-events-none overflow-hidden z-20">
        <AnimatePresence>
          {floatingNotes.map((note) => (
            <motion.span
              key={note.id}
              initial={{ opacity: 1, y: 60, scale: 0.8, rotate: 0 }}
              animate={{ opacity: 0, y: -50, scale: 1.3, rotate: Math.random() * 80 - 40 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              className="absolute text-xl font-serif text-zinc-400 select-none filter drop-shadow-sm"
              style={{ left: `${note.left}%` }}
            >
              {note.char}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      {/* HORIZONTAL VIEW: Highly 3D Glossy Mechanical-cap Keyboard Layout */}
      <div className="relative w-full max-w-6xl bg-zinc-950 border border-zinc-800/80 rounded-2xl p-5 shadow-[0_25px_50px_rgba(0,0,0,0.85)]">
        
        {/* SHEET MUSIC PAPER DISPLAY */}
        <motion.div 
          whileHover={{ y: -2, boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05), 0 5px 15px rgba(0,0,0,0.15)" }}
          className="relative w-full bg-zinc-100 border border-zinc-400 rounded-xl p-4 min-h-[110px] flex items-center justify-between mb-5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-300"
        >
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col justify-between h-[30px] pointer-events-none opacity-20">
            <div className="h-[1px] bg-zinc-800" />
            <div className="h-[1px] bg-zinc-800" />
            <div className="h-[1px] bg-zinc-800" />
            <div className="h-[1px] bg-zinc-800" />
            <div className="h-[1px] bg-zinc-800" />
          </div>

          <div className="flex w-full items-center gap-3 relative z-10 font-serif">
            <motion.div 
              whileHover={{ rotate: 10, scale: 1.05 }}
              className="text-4xl md:text-5xl text-zinc-800 select-none pr-3 border-r border-zinc-500 leading-none cursor-pointer"
            >
              𝄞
            </motion.div>

            <div className="flex-1 text-left min-h-[60px] flex flex-col justify-center">
              {displayedKey ? (
                <motion.div
                  key={displayedKey.name}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <div className="flex items-baseline gap-2 mb-0.5">
                    <span className="text-[9px] md:text-xs text-zinc-700 tracking-widest font-mono uppercase">
                      {getTempoLabel(displayedKey.category)}
                    </span>
                    <span className="text-[10px] text-zinc-600 font-mono">
                      [Key: {displayedKey.keyLabel}]
                    </span>
                  </div>
                  
                  <h3 className="text-lg md:text-xl font-bold text-zinc-900 tracking-wide leading-tight">
                    Opus: {displayedKey.name} ({displayedKey.estYear})
                  </h3>
                  
                  <p className="text-xs md:text-sm text-zinc-800 italic leading-snug mt-0.5 font-serif pr-2">
                    &ldquo;{displayedKey.definition}&rdquo;
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-zinc-700 text-xs flex flex-col justify-center font-serif"
                >
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-650 animate-pulse" />
                    <span className="text-[9px] tracking-wider uppercase font-mono">System Standby</span>
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-zinc-750 leading-tight">
                    Opus 1: Developer's Symphony
                  </h3>
                  <p className="text-[11px] italic mt-0.5 text-zinc-600">
                    Press keys (Q W E R T Y U I A S H Z X C V / W D F G J K L N M) to compose your masterpiece.
                  </p>
                </motion.div>
              )}
            </div>

            <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-zinc-200/50 border border-zinc-500 text-zinc-800">
              {displayedKey ? (
                <motion.div
                  key={displayedKey.name}
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <img 
                    src={`https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${displayedKey.slugName}.svg`} 
                    className="w-6 h-6 filter grayscale brightness-50 contrast-125" 
                    alt={displayedKey.name} 
                  />
                </motion.div>
              ) : (
                <span className="text-xl">🎼</span>
              )}
            </div>
          </div>
        </motion.div>

        {/* PIANO KEYBOARD CONTAINER */}
        <div className="bg-[#050505] border border-zinc-900 rounded-xl p-3 shadow-[inset_0_6px_20px_rgba(0,0,0,0.95)] flex flex-col gap-3 relative overflow-visible">
          
          <div className="flex items-center justify-between px-1 pt-0.5 border-b border-zinc-900 pb-1.5">
            <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">
              Acoustic Grayscale Module v4.0
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`px-2.5 py-0.5 rounded border text-[8px] font-mono uppercase tracking-wider transition-all duration-200 ${
                  isMuted
                    ? "bg-zinc-900 border-zinc-800 text-zinc-600"
                    : "bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-750 hover:text-white"
                }`}
              >
                {isMuted ? "🔇 Muted" : "🔊 Sound On"}
              </button>
            </div>
          </div>

          {/* THE PIANO KEYS LAYER */}
          <div className="relative w-full flex select-none bg-[#050505] py-0.5 overflow-visible">
            
            {/* Deep Fallboard Shadow Recess overlay */}
            <div className="absolute top-0 inset-x-0 h-6 bg-gradient-to-b from-black via-black/85 to-transparent pointer-events-none z-20" />

            {/* White Keys Row */}
            <div className="w-full flex h-44 sm:h-52 md:h-56 relative overflow-visible rounded-b-sm bg-[#050505] gap-[3px] z-10">
              {whiteKeys.map((key) => {
                const isPressed = !!activeKeys[key.keyLabel];

                return (
                  <button
                    key={key.keyLabel}
                    onMouseEnter={() => {
                      stopSweep();
                      setHoveredKey(key);
                    }}
                    onMouseLeave={() => {
                      setHoveredKey((prev) => (prev?.keyLabel === key.keyLabel ? null : prev));
                      handleKeyRelease(key);
                    }}
                    onPointerDown={() => handleKeyPress(key)}
                    onPointerUp={() => handleKeyRelease(key)}
                    onPointerLeave={() => handleKeyRelease(key)}
                    className={`flex-1 flex flex-col justify-between pb-3 pt-6 items-center rounded-b-lg border-r border-l border-zinc-355 cursor-pointer outline-none transition-all duration-100 relative ${
                      isPressed
                        ? "bg-gradient-to-b from-zinc-200 via-zinc-150 to-zinc-350 translate-y-[10px] border-b-[6px] border-b-zinc-400 shadow-[inset_0_12px_18px_rgba(0,0,0,0.35),0_4px_6px_rgba(0,0,0,0.4)] h-[calc(100%-10px)]"
                        : "bg-gradient-to-b from-white via-zinc-100 to-zinc-200 border-b-[18px] border-b-zinc-350 shadow-[0_15px_15px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.8)] hover:-translate-y-[2px] hover:border-b-[20px] hover:shadow-[0_18px_24px_rgba(0,0,0,0.28)] h-full"
                    }`}
                  >
                    {/* Rich top glossy glare */}
                    <div className="absolute top-[1.5px] left-[1.5px] right-[1.5px] h-[35%] bg-gradient-to-b from-white/70 via-white/20 to-transparent rounded-t-sm pointer-events-none" />

                    <img 
                      src={`https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${key.slugName}.svg`}
                      className={`w-6 h-6 transition-all duration-150 ${
                        isPressed 
                          ? "opacity-100 filter grayscale brightness-50 contrast-125" 
                          : "opacity-60 filter grayscale brightness-75 hover:opacity-100 hover:brightness-50"
                      }`}
                      alt={key.name}
                    />

                    <div className="flex flex-col items-center gap-0.5 leading-none select-none">
                      <span className="text-[7px] font-mono text-zinc-400/80 font-semibold tracking-tighter">
                        {key.estYear}
                      </span>
                      <span className="text-[9px] font-mono font-bold text-zinc-800">
                        {key.keyLabel}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Black Keys Row (Absolutely positioned overlay container rendered *after* white keys row for perfect stacking) */}
            <div className="absolute inset-x-0 top-0 h-26 sm:h-32 md:h-36 pointer-events-none overflow-visible z-20">
              {blackKeys.map((key) => {
                const isPressed = !!activeKeys[key.keyLabel];
                const leftOffset = getBlackKeyLeft(key.keyLabel);

                return (
                  <button
                    key={key.keyLabel}
                    onMouseEnter={() => {
                      stopSweep();
                      setHoveredKey(key);
                    }}
                    onMouseLeave={() => {
                      setHoveredKey((prev) => (prev?.keyLabel === key.keyLabel ? null : prev));
                      handleKeyRelease(key);
                    }}
                    onPointerDown={() => handleKeyPress(key)}
                    onPointerUp={() => handleKeyRelease(key)}
                    onPointerLeave={() => handleKeyRelease(key)}
                    style={{ left: leftOffset }}
                    className={`absolute -translate-x-1/2 w-[3.8%] h-full rounded-b-md border-l border-r border-black cursor-pointer outline-none transition-all duration-100 flex flex-col justify-between pb-2.5 pt-3.5 items-center pointer-events-auto ${
                      isPressed
                        ? "bg-gradient-to-b from-zinc-700 to-zinc-955 translate-y-[8px] border-b-[4px] border-b-black shadow-[inset_0_6px_10px_rgba(0,0,0,0.9),0_2px_4px_rgba(0,0,0,0.5)] h-[calc(100%-8px)]"
                        : "bg-gradient-to-b from-zinc-800 via-zinc-850 to-zinc-950 border-b-[14px] border-b-[#050505] shadow-[0_12px_12px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.15)] hover:scale-y-[1.03] hover:-translate-y-[1px] hover:border-b-[15px] hover:shadow-[0_14px_16px_rgba(0,0,0,0.7)] h-full"
                    }`}
                  >
                    {/* Glossy top reflection */}
                    <div className="absolute top-[1px] left-[1px] right-[1px] h-[30%] bg-gradient-to-b from-zinc-500/40 via-transparent to-transparent rounded-t-sm pointer-events-none" />

                    {/* Inverted white brand logo for readability on black keys */}
                    <img 
                      src={`https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${key.slugName}.svg`}
                      className={`w-5 h-5 transition-all duration-150 filter invert brightness-200 contrast-125 ${
                        isPressed 
                          ? "opacity-100" 
                          : "opacity-60"
                      }`}
                      alt={key.name}
                    />

                    <div className="flex flex-col items-center gap-0.5 leading-none select-none">
                      <span className="text-[6px] font-mono text-zinc-400 font-medium">
                        {key.estYear}
                      </span>
                      <span className="text-[8px] font-mono font-bold text-zinc-100">
                        {key.keyLabel}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

          </div>

          {/* SPACEBAR SUSTAIN PEDAL */}
          <div className="flex justify-center w-full mt-1">
            <div className="w-1/3 perspective-[1000px] h-8 relative">
              <button
                onPointerDown={handleSpacePress}
                onPointerUp={handleSpaceRelease}
                onPointerLeave={handleSpaceRelease}
                className={`w-full h-full rounded-md border-t border-zinc-100/20 transition-all duration-75 relative flex items-center justify-center cursor-pointer outline-none overflow-hidden ${
                  activeKeys.SPACE
                    ? "bg-gradient-to-b from-zinc-400 to-zinc-550 translate-y-[2px] shadow-[inset_0_3px_4px_rgba(0,0,0,0.7)]"
                    : "bg-gradient-to-b from-zinc-300 via-zinc-250 to-zinc-400 border-b-2 border-b-zinc-600 shadow-[0_3px_4px_rgba(0,0,0,0.3)] hover:from-zinc-200"
                }`}
              >
                <div className="flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-wider text-zinc-800 font-bold">
                  <span>Sustain Pedal</span>
                  <span className="text-xs">─</span>
                  <span>Space</span>
                </div>
              </button>
            </div>
          </div>

        </div>

        {/* Controls label */}
        <div className="mt-3 text-center">
          <p className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">
            Type binding keys or SPACE to play
          </p>
        </div>

      </div>
    </div>
  );
}
