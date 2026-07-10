"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  ArrowRight,
  ArrowUpRight,
  Code2,
  BrainCircuit,
  Globe,
  Briefcase,
  Layers,
  Award,
  Send,
  CheckCircle,
  FileCode,
  MapPin,
  Compass,
  Cpu,
  BookOpen
} from "lucide-react";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
    </svg>
  );
}
import Navbar from "@/components/Navbar";
import DynamicSculpture from "@/components/DynamicSculpture";
import { useTheme } from "@/components/ThemeProvider";
import TechKeyboard from "@/components/TechKeyboard";
import InteractiveStats from "@/components/InteractiveStats";
import InteractiveProjects from "@/components/InteractiveProjects";
import InteractiveExperience from "@/components/InteractiveExperience";
import InteractiveContact from "@/components/InteractiveContact";

export default function Home() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // System Loader States
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 10) {
          clearInterval(interval);
          setTimeout(() => {
            setShowLoader(false);
          }, 450);
          return 10;
        }
        return prev + 1;
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  // 3D Parallax Tilt Portrait Casing States
  const [portraitTilt, setPortraitTilt] = useState({ x: 0, y: 0 });
  const [portraitGlow, setPortraitGlow] = useState({ x: 0, y: 0, opacity: 0 });

  const handlePortraitMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((centerY - y) / centerY) * 12; // tilt max 12 degrees
    const rotateY = ((x - centerX) / centerX) * 12;
    setPortraitTilt({ x: rotateX, y: rotateY });
    setPortraitGlow({ x, y, opacity: 0.12 });
  };

  const handlePortraitMouseLeave = () => {
    setPortraitTilt({ x: 0, y: 0 });
    setPortraitGlow((prev) => ({ ...prev, opacity: 0 }));
  };

  // Polaroid Camera Click & Flash Effects
  const [hasFlashed, setHasFlashed] = useState(false);
  const [showFlash, setShowFlash] = useState(false);

  const playCameraShutterSound = () => {
    if (typeof window === "undefined") return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();

      // 1. Shutter Snap (Short noise burst)
      const bufferSize = ctx.sampleRate * 0.04;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = "bandpass";
      noiseFilter.frequency.setValueAtTime(1000, ctx.currentTime);
      noiseFilter.Q.setValueAtTime(3, ctx.currentTime);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.2, ctx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.035);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      // 2. Mechanical Clack (mirror action)
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(160, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.08);

      oscGain.gain.setValueAtTime(0.3, ctx.currentTime);
      oscGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.075);

      osc.connect(oscGain);
      oscGain.connect(ctx.destination);

      // 3. Winding Motor hum (film ejection)
      const motorOsc = ctx.createOscillator();
      const motorGain = ctx.createGain();
      motorOsc.type = "sawtooth";
      motorOsc.frequency.setValueAtTime(100, ctx.currentTime + 0.08);
      motorOsc.frequency.linearRampToValueAtTime(140, ctx.currentTime + 0.4);

      motorGain.gain.setValueAtTime(0, ctx.currentTime);
      motorGain.gain.setValueAtTime(0.03, ctx.currentTime + 0.08);
      motorGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

      motorOsc.connect(motorGain);
      motorGain.connect(ctx.destination);

      noise.start();
      osc.start();
      motorOsc.start(ctx.currentTime + 0.08);

      noise.stop(ctx.currentTime + 0.04);
      osc.stop(ctx.currentTime + 0.08);
      motorOsc.stop(ctx.currentTime + 0.4);
    } catch (e) {
      console.warn("Failed to play camera shutter sound", e);
    }
  };

  const triggerCameraFlash = () => {
    if (hasFlashed) return;
    setHasFlashed(true);
    setShowFlash(true);
    playCameraShutterSound();
    setTimeout(() => {
      setShowFlash(false);
    }, 450);
  };

  // Form State
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ name: "", email: "", message: "" });
      }, 5000);
    }
  };

  // Skills Data
  const skillCategories = [
    {
      title: "Programming",
      icon: <Code2 className="w-5 h-5 text-zinc-400" />,
      skills: ["Python", "JavaScript", "TypeScript", "SQL", "C++", "Java"]
    },
    {
      title: "AI / ML",
      icon: <BrainCircuit className="w-5 h-5 text-zinc-400" />,
      skills: ["Machine Learning", "Deep Learning", "NLP", "Generative AI", "LLMs", "TensorFlow", "PyTorch"]
    },
    {
      title: "Web Development",
      icon: <Globe className="w-5 h-5 text-zinc-400" />,
      skills: ["React.js", "Next.js", "Node.js", "FastAPI", "Flask", "Tailwind CSS"]
    },
    {
      title: "Tools & Platforms",
      icon: <Briefcase className="w-5 h-5 text-zinc-400" />,
      skills: ["Git & GitHub", "Docker", "Firebase", "PostgreSQL", "Ollama"]
    },
    {
      title: "Concepts I Work With",
      icon: <Layers className="w-5 h-5 text-zinc-400" />,
      skills: ["System Design", "REST APIs", "Vector DBs", "RAG Pipelines", "Agile & SDLC"]
    }
  ];

  // Projects Data
  const projects = [
    {
      id: "01",
      title: "EAOS Simplified",
      subtitle: "AI-Assisted Email Operations Platform",
      tech: ["FastAPI", "React.js", "PostgreSQL", "SMTP/IMAP"],
      metric: "40% Efficiency Increase",
      desc: "Engineered AI-powered outreach automation platform supporting 1K+ workflows with batch sending, inbox synchronization, and thread-aware response pipelines.",
      github: "https://github.com/devokdev/EAOS_Simplified",
      live: "https://eaos-web-chi.vercel.app/"
    },
    {
      id: "02",
      title: "KishanBhai",
      subtitle: "AI Agricultural Assistance Platform",
      tech: ["React.js", "Next.js", "Firebase", "Gemini AI", "Flutter"],
      metric: "IIT Ropar Incubation Support",
      desc: "Multilingual AI-powered platform featuring crop disease detection, weather forecasts, and voice assistance across 5 Indian languages to mitigate crop loss.",
      github: "https://github.com/devokdev/KishanBhai",
      live: "https://kishan-bhai.vercel.app/"
    },
    {
      id: "03",
      title: "Codebase Intelligence",
      subtitle: "Semantic Retrieval Engine",
      tech: ["Python", "FastAPI", "FAISS", "PostgreSQL", "Docker"],
      metric: "35% Search Latency Reduction",
      desc: "FastAPI microservice following clean architecture, optimizing FAISS vector search, yielding +8.4% ROUGE-L and +47% domain alignment score.",
      github: "https://github.com/devokdev/Codebase-explanator",
      live: "https://github.com/devokdev/Codebase-explanator"
    }
  ];

  // Achievements Data
  const achievements = [
    { id: "01", title: "Google Agentic AI Hackathon", role: "Finalist 2025", joke: "(Survived the Finals)" },
    { id: "02", title: "IIT Ropar GenAI Hackathon", role: "3rd Place Winner", joke: "(and a free T-shirt)" },
    { id: "03", title: "Amity Innovation Challenge", role: "Top 8 Finalist 2025", joke: "(almost famous)" },
    { id: "04", title: "Academic Excellence & Performance", role: "CSE Merit Scholar | B.Tech CGPA: 8.60", joke: "(parents approved)" }
  ];

  return (
    <div className="flex-1 w-full relative z-0 select-none">
      <AnimatePresence>
        {showLoader && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -30, transition: { duration: 0.6, ease: "easeInOut" } }}
            className="fixed inset-0 bg-[#070707] z-[999999] flex flex-col items-center justify-center select-none cursor-none"
          >
            {/* Micro-grid background for technical feel */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />

            {/* Laser scan sweep line in background */}
            <motion.div
              animate={{ top: ["-10%", "110%"] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent pointer-events-none"
            />

            {/* Center Plaque Box with project-card style L-corners */}
            <div className="relative w-80 p-8 bg-zinc-950/75 border border-zinc-800/40 backdrop-blur-md flex flex-col items-center text-center">

              {/* Cyber Blueprint L-Corners */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-zinc-700" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-zinc-700" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-zinc-700" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-zinc-700" />

              {/* Top telemetry tag */}
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-6 block">
                // BOOT_SEQUENCE: INITIALIZING COFFEE RECEPTORS
              </span>

              {/* System Load Status */}
              <div className="h-6 overflow-hidden mb-6 flex items-center justify-center">
                <span className="text-[10px] font-mono text-zinc-300 tracking-wider">
                  {loadingProgress < 3 && "CONNECTING INTERFACES & WATERING PIANO..."}
                  {loadingProgress >= 3 && loadingProgress < 7 && "LOADING SHINY PIXELS & AI BUZZWORDS..."}
                  {loadingProgress >= 7 && loadingProgress < 10 && "COMPILING BLUEPRINTS WITHOUT WARNINGS..."}
                  {loadingProgress === 10 && "SYSTEM ACTIVE (HIRE THIS GUY)"}
                </span>
              </div>

              {/* Game Healthbar Progress Segments */}
              <div className="flex gap-1 w-full justify-between items-center mb-6">
                {Array.from({ length: 10 }).map((_, i) => {
                  const isActive = i < loadingProgress;
                  return (
                    <div
                      key={i}
                      className={`h-4 flex-1 transition-all duration-300 rounded-none ${isActive
                          ? "bg-zinc-100 shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                          : "bg-zinc-900 border border-zinc-850"
                        }`}
                    />
                  );
                })}
              </div>

              {/* Percentage Counter */}
              <span className="text-[10px] font-mono text-zinc-400">
                {Math.min(loadingProgress * 10, 100)}% COMPILING
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar />

      {/* 1. HERO SECTION */}
      <section
        id="home"
        className="min-h-screen flex flex-col justify-center pt-24 px-6 md:px-12 max-w-7xl mx-auto relative z-0 overflow-hidden transition-colors duration-1000"
        style={{ backgroundColor: "var(--color-home)" }}
      >
        <div className="relative z-10 w-full h-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center flex-1 py-12">
            {/* Left Column: Typography */}
            <div className="lg:col-span-7 flex flex-col justify-center sm:text-left text-center">
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xs md:text-sm font-mono tracking-widest text-zinc-400 dark:text-zinc-500 uppercase mb-4"
              >
                Hello, I&apos;m
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-5xl md:text-7xl font-sans font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.05]"
              >
                Kartavya<br />
                <span className="text-zinc-400 dark:text-zinc-650">Dev</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="mt-6 border-l-2 border-zinc-200 dark:border-zinc-800 pl-4 py-1 text-left max-w-sm"
              >
                <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-semibold">
                  Product Engineer / AI Builder / Full Stack Developer
                </p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-8 text-sm md:text-base text-zinc-600 dark:text-zinc-400 max-w-md leading-relaxed"
              >
                I build overly smart AI systems and digital products that actually solve real-world problems. Designing things so clean you could eat off them, and writing code that mostly compiles on the first attempt.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-10 flex flex-wrap gap-4 justify-center sm:justify-start"
              >
                <button
                  onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                  className="flex items-center gap-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-50 dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 px-6 py-3.5 rounded-md font-mono text-xs uppercase tracking-wider transition-all duration-300 group shadow-md"
                >
                  Explore My Labor
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </div>

            {/* Right Column: 3D Centerpiece */}
            <div className="lg:col-span-5 h-[350px] md:h-[500px] w-full flex items-center justify-center relative">
              <div className="w-full h-full relative z-10">
                <DynamicSculpture isDark={isDark} isReady={!showLoader} />
              </div>
            </div>
          </div>

          {/* Interactive Stats component */}
          <InteractiveStats />
        </div>
      </section>      {/* 2. ABOUT ME SECTION */}
      <section
        id="about"
        className="py-32 px-6 md:px-12 relative z-0 transition-colors duration-1000"
        style={{ backgroundColor: "var(--color-about)" }}
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left side info */}
            <div className="lg:col-span-7 space-y-8">
              <span className="text-base md:text-lg font-mono font-bold tracking-wider text-zinc-550 dark:text-zinc-400 uppercase">// 02 About Me</span>
              <h2 className="text-3xl md:text-5xl font-sans font-bold text-zinc-900 dark:text-white leading-tight">
                I build systems that actually work <span className="text-[0.55em] font-normal text-zinc-500/60 dark:text-zinc-550/50 block md:inline md:ml-1">(unlike my sleep schedule).</span>
              </h2>

              <div className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base space-y-6 leading-relaxed">
                <p>
                  I am a code-slinging software engineer pursuing a B.Tech in Computer Science Engineering (focusing on Data Science &amp; AI) at BML Munjal University, Gurugram. Yes, I voluntarily read documentation for fun.
                </p>
                <p>
                  From building multilingual crop-saving copilots like KishanBhai (incubated by IIT Ropar!) to designing email microservices and enterprise RAG systems that don&apos;t hallucinate, I enjoy creating software that couples serious engineering discipline with high utility.
                </p>
              </div>

              {/* What Drives Me columns */}
              <div className="grid grid-cols-2 gap-6 pt-6">
                {[
                  { title: "Solve", desc: "Spot real-world bugs and address them before anyone notices." },
                  { title: "Build", desc: "Write backend services that survive traffic spikes and clean, responsive UIs." },
                  { title: "Deliver", desc: "Wire up vector databases and RAG pipelines without summoning AI hallucinations." },
                  { title: "Improve", desc: "Chase 99% test coverage and squeeze milliseconds out of API response times." },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <h3 className="font-mono text-xs font-bold uppercase text-zinc-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                      {item.title}
                    </h3>
                    <p className="text-xs text-zinc-505 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side portrait with Polaroid ejection printout & 3D parallax tilt */}
            <div className="lg:col-span-5 flex justify-center relative">
              <motion.div
                initial={{ opacity: 0, y: -200, scale: 0.85, rotate: -6 }}
                whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 2 }}
                viewport={{ once: true, margin: "-100px" }}
                onViewportEnter={triggerCameraFlash}
                animate={{
                  rotateX: portraitTilt.x,
                  rotateY: portraitTilt.y,
                }}
                transition={{
                  y: { type: "spring", stiffness: 60, damping: 12 },
                  rotate: { type: "spring", stiffness: 60, damping: 12 },
                  rotateX: { type: "spring", stiffness: 150, damping: 15 },
                  rotateY: { type: "spring", stiffness: 150, damping: 15 },
                  opacity: { duration: 0.8 }
                }}
                onMouseMove={handlePortraitMouseMove}
                onMouseLeave={handlePortraitMouseLeave}
                className="w-full max-w-sm p-4 pb-14 bg-[#fafaf7] border border-zinc-250/90 shadow-2xl relative overflow-hidden cursor-pointer select-none"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Square Polaroid Photo Area with localized developing effect */}
                <div
                  className="relative w-full aspect-square bg-zinc-950 overflow-hidden border border-zinc-900/10 shadow-inner"
                  style={{
                    transform: "translateZ(30px)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="w-full h-full relative"
                  >
                    <img
                      src="/developer_portrait_v2.png"
                      alt="Kartavya Dev Portrait"
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out scale-105 hover:scale-110"
                    />
                  </motion.div>

                  {/* Localized Shutter Flash Overlay */}
                  {showFlash && (
                    <motion.div
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 0 }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                      className="absolute inset-0 bg-white z-30 pointer-events-none"
                    />
                  )}
                </div>

                {/* Radial Hover Shine Element (simulating paper light reflections) */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-20"
                  style={{
                    opacity: portraitGlow.opacity,
                    background: `radial-gradient(circle 180px at ${portraitGlow.x}px ${portraitGlow.y}px, rgba(255,255,255,0.12), transparent)`,
                  }}
                />

                {/* Polaroid Signature/Caption Area (monospaced handwritten marker feel in black) */}
                <div
                  className="mt-6 text-center font-mono italic text-xs tracking-wider text-black font-bold"
                  style={{
                    transform: "translateZ(15px)",
                  }}
                >
                  <p className="text-black text-sm font-bold">Kartavya Dev</p>
                  <p className="text-zinc-700 font-medium mt-1">Delhi NCR, India — Mostly Caffeinated</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Beyond Code tags - flat, unboxed list */}
          <div className="mt-20 pt-8 border-t border-zinc-200/20 dark:border-zinc-800/20 max-w-3xl">
            <h4 className="text-xs font-mono tracking-widest text-zinc-400 uppercase mb-4">// Beyond Code (IRL Interests)</h4>
            <div className="flex flex-wrap gap-3">
              {["Chess (Badly)", "Reading Docs", "Hackathons (For the pizza)", "Fitness", "Tech Podcasts", "Travel"].map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 border border-zinc-200/30 dark:border-zinc-800/30 text-xs font-mono rounded bg-zinc-500/5 dark:bg-zinc-500/5 text-zinc-600 dark:text-zinc-300 transition-colors duration-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. SKILLS SECTION */}
      <section
        id="skills"
        className="py-32 px-6 md:px-12 relative z-0 transition-colors duration-1000"
        style={{ backgroundColor: "var(--color-skills)" }}
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-16">
            <span className="text-base md:text-lg font-mono font-bold tracking-wider text-zinc-550 dark:text-zinc-400 uppercase">// 03 Capabilities & Powers</span>
            <h2 className="text-3xl md:text-5xl font-sans font-bold text-zinc-900 dark:text-white mt-4">
              The instruments of my digital skillset.
            </h2>
          </div>

          {/* Interactive Keyboard Tech Stack */}
          <div className="mt-8 flex justify-center">
            <TechKeyboard />
          </div>
        </div>
      </section>

      {/* 4. PROJECTS SECTION */}
      <section
        id="projects"
        className="py-32 px-6 md:px-12 relative z-0 transition-colors duration-1000"
        style={{ backgroundColor: "var(--color-projects)" }}
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-base md:text-lg font-mono font-bold tracking-wider text-zinc-550 dark:text-zinc-400 uppercase">// 04 Proof of Labor</span>
              <h2 className="text-3xl md:text-5xl font-sans font-bold text-zinc-900 dark:text-white mt-4">
                Systems built with architectural pride <span className="text-[0.55em] font-normal text-zinc-500/60 dark:text-zinc-550/50 block mt-1.5">(and a lot of coffee).</span>
              </h2>
            </div>

            <a
              href="https://github.com/devokdev/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase border-b border-zinc-400 dark:border-zinc-600 hover:border-zinc-900 dark:hover:border-zinc-100 pb-1 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              View GitHub Profile <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Large Project exhibits - technical blueprint modules */}
          <InteractiveProjects />
        </div>
      </section>

      {/* 5. ACHIEVEMENTS SECTION */}
      <section
        id="achievements"
        className="py-32 px-6 md:px-12 relative z-0 transition-colors duration-1000"
        style={{ backgroundColor: "var(--color-achievements)" }}
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-16">
            <span className="text-base md:text-lg font-mono font-bold tracking-wider text-zinc-550 dark:text-zinc-400 uppercase">// 05 Milestones & Medals</span>
            <h2 className="text-3xl md:text-5xl font-sans font-bold text-zinc-900 dark:text-white mt-4">
              Proof that my code compiled elsewhere.
            </h2>
          </div>

          {/* Editorial timeline table - flat, premium row items */}
          <div className="flex flex-col border-t border-zinc-200/10 dark:border-zinc-800/20">
            {achievements.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ x: 8 }}
                className="grid grid-cols-12 gap-4 py-8 items-center border-b border-zinc-200/10 dark:border-zinc-800/20 group cursor-pointer transition-all duration-300 pl-2 hover:pl-4 border-l-2 border-l-transparent hover:border-l-zinc-900 dark:hover:border-l-white"
              >
                {/* Index / Number */}
                <div className="col-span-12 md:col-span-2 text-xs font-mono text-zinc-400 dark:text-zinc-500">
                  Award // 0{idx + 1}
                </div>

                {/* Milestone Title */}
                <div className="col-span-12 md:col-span-6">
                  <h3 className="text-lg md:text-xl font-bold font-sans text-zinc-900 dark:text-white transition-colors duration-300 group-hover:text-black dark:group-hover:text-white">
                    {item.title}
                  </h3>
                </div>

                {/* Milestone Details */}
                <div className="col-span-10 md:col-span-3 text-xs md:text-sm font-mono text-zinc-700 dark:text-zinc-300">
                  <span>{item.role} </span>
                  <span className="text-zinc-500/70 dark:text-zinc-600 font-normal">{item.joke}</span>
                </div>

                {/* Icon Action Indicator */}
                <div className="col-span-2 md:col-span-1 flex justify-end text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                  <Award className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. EXPERIENCE SECTION */}
      <section
        id="experience"
        className="py-32 px-6 md:px-12 relative z-0 transition-colors duration-1000"
        style={{ backgroundColor: "var(--color-experience)" }}
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-16">
            <span className="text-base md:text-lg font-mono font-bold tracking-wider text-zinc-550 dark:text-zinc-400 uppercase">// 06 Timeline of Employment</span>
            <h2 className="text-3xl md:text-5xl font-sans font-bold text-zinc-900 dark:text-white mt-4">
              My journey from junior compiler to systems architect.
            </h2>
          </div>

          <InteractiveExperience />
        </div>
      </section>

      {/* 7. CONTACT SECTION */}
      <section
        id="contact"
        className="py-32 px-6 md:px-12 relative z-0 transition-colors duration-1000"
        style={{ backgroundColor: "var(--color-contact)" }}
      >
        <InteractiveContact />
      </section>
    </div>
  );
}
