"use client";

import React, { useState } from "react";
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

export default function Home() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

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
      github: "https://github.com",
      live: "https://github.com",
      icon: <Mail className="w-12 h-12 text-zinc-700 dark:text-zinc-300" />
    },
    {
      id: "02",
      title: "KishanBhai",
      subtitle: "AI Agricultural Assistance Platform",
      tech: ["React.js", "Next.js", "Firebase", "Gemini AI", "Flutter"],
      metric: "IIT Ropar Incubation Support",
      desc: "Multilingual AI-powered platform featuring crop disease detection, weather forecasts, and voice assistance across 5 Indian languages to mitigate crop loss.",
      github: "https://github.com",
      live: "https://github.com",
      icon: <Compass className="w-12 h-12 text-zinc-700 dark:text-zinc-300" />
    },
    {
      id: "03",
      title: "Codebase Intelligence",
      subtitle: "Semantic Retrieval Engine",
      tech: ["Python", "FastAPI", "FAISS", "PostgreSQL", "Docker"],
      metric: "35% Search Latency Reduction",
      desc: "FastAPI microservice following clean architecture, optimizing FAISS vector search, yielding +8.4% ROUGE-L and +47% domain alignment score.",
      github: "https://github.com",
      live: "https://github.com",
      icon: <Cpu className="w-12 h-12 text-zinc-700 dark:text-zinc-300" />
    }
  ];

  // Achievements Data
  const achievements = [
    { id: "01", title: "Google Agentic AI Hackathon", role: "Finalist 2025" },
    { id: "02", title: "IIT Ropar GenAI Hackathon", role: "3rd Place Winner" },
    { id: "03", title: "Sopra Steria AI Project", role: "Enterprise Incubation" },
    { id: "04", title: "Amity Innovation Challenge", role: "Top 8 Finalist 2025" },
    { id: "05", title: "Academic Excellence Scholarship", role: "CSE Merit Scholar" },
    { id: "06", title: "Consistent Performer", role: "B.Tech CGPA: 8.72/10.0" }
  ];

  return (
    <div className="flex-1 w-full relative z-10 select-none">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section 
        id="home" 
        className="min-h-screen flex flex-col justify-center pt-24 px-6 md:px-12 max-w-7xl mx-auto relative overflow-hidden transition-colors duration-1000"
        style={{ backgroundColor: "var(--color-home)" }}
      >
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
              <span className="text-zinc-400 dark:text-zinc-600">Dev</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mt-6 border-l-2 border-zinc-200 dark:border-zinc-800 pl-4 py-1 text-left max-w-sm"
            >
              <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Product Engineer / AI Builder / Full Stack Developer
              </p>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 text-sm md:text-base text-zinc-600 dark:text-zinc-400 max-w-md leading-relaxed"
            >
              I build intelligent systems and digital products that solve real-world problems. Turning ideas into impact through code and design.
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
                Explore My Work 
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>

          {/* Right Column: 3D Centerpiece */}
          <div className="lg:col-span-5 h-[350px] md:h-[500px] w-full flex items-center justify-center relative">
            <div className="absolute inset-0 z-0 bg-radial-gradient from-zinc-200/20 dark:from-zinc-900/40 to-transparent pointer-events-none rounded-full blur-3xl" />
            <div className="w-full h-full relative z-10">
              <DynamicSculpture isDark={isDark} />
            </div>
            
            {/* Museum Style Sculpture label */}
            <div className="absolute right-4 bottom-4 border border-zinc-200/60 dark:border-zinc-800/60 bg-white/40 dark:bg-black/20 backdrop-blur-sm p-4 rounded-md font-mono text-[10px] text-zinc-400 dark:text-zinc-500 max-w-[150px] leading-tight text-right uppercase">
              <p className="font-bold text-zinc-600 dark:text-zinc-300">// 01 Paper fold</p>
              <p>Structure base 45</p>
              <p className="mt-1">Smooth rotation enabled</p>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="border-t border-zinc-200/60 dark:border-zinc-800/60 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "10+", label: "Projects Completed" },
            { value: "5+", label: "AI Workflows" },
            { value: "3+", label: "Years Learning" },
            { value: "∞", label: "Curiosity Factor" },
          ].map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col items-center justify-center p-4 border border-zinc-200/20 bg-white/10 dark:bg-black/5 rounded"
            >
              <span className="text-3xl font-bold font-sans text-zinc-800 dark:text-zinc-200">{stat.value}</span>
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest mt-1">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 2. ABOUT ME SECTION */}
      <section 
        id="about" 
        className="py-32 px-6 md:px-12 transition-colors duration-1000"
        style={{ backgroundColor: "var(--color-about)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left side info */}
            <div className="lg:col-span-7 space-y-8">
              <span className="text-xs font-mono tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">// 02 About Me</span>
              <h2 className="text-3xl md:text-5xl font-sans font-bold text-zinc-900 dark:text-white leading-tight">
                I build systems that solve real world problems.
              </h2>
              
              <div className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base space-y-6 leading-relaxed">
                <p>
                  I am a passionate software engineer currently pursuing a Bachelor of Technology in Computer Science Engineering, with a focus on Data Science &amp; AI at BML Munjal University, Gurugram.
                </p>
                <p>
                  From building multilingual agricultural tools like <strong className="text-zinc-900 dark:text-zinc-100 font-medium">KishanBhai</strong> (which was selected for IIT Ropar incubation) to designing robust email microservices and enterprise RAG systems, I enjoy creating software that couples architectural discipline with high utility.
                </p>
              </div>

              {/* What Drives Me columns */}
              <div className="grid grid-cols-2 gap-6 pt-6">
                {[
                  { title: "Solve", desc: "Identify real problems and create actionable digital solutions." },
                  { title: "Build", desc: "Write scalable backend microservices and modern, performant web UIs." },
                  { title: "Deliver", desc: "Integrate vector databases, retrieval systems, and reliable API layers." },
                  { title: "Improve", desc: "Maintain high test coverage, clean structure, and optimized performance." },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <h3 className="font-mono text-xs font-bold uppercase text-zinc-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                      {item.title}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side portrait with paper card frame */}
            <div className="lg:col-span-5 flex justify-center">
              <motion.div 
                initial={{ rotate: -1, scale: 0.98 }}
                whileInView={{ rotate: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="paper-curl-container p-4 w-full max-w-sm border border-zinc-200/50 dark:border-zinc-800/50"
              >
                <div className="relative w-full aspect-[4/5] bg-zinc-100 dark:bg-zinc-900 overflow-hidden rounded-sm">
                  <Image
                    src="/developer_portrait.png"
                    alt="Kartavya Dev Portrait"
                    fill
                    sizes="(max-width: 768px) 100vw, 350px"
                    priority
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
                  />
                </div>
                
                <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center text-xs font-mono">
                  <div>
                    <p className="text-zinc-800 dark:text-zinc-200">Kartavya Dev</p>
                    <p className="text-zinc-400">Delhi NCR, India</p>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Available for roles" />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Beyond Code tags */}
          <div className="mt-16 p-8 border border-zinc-200/50 dark:border-zinc-800/50 rounded-md bg-white/20 dark:bg-black/10 backdrop-blur-sm max-w-3xl">
            <h4 className="text-xs font-mono tracking-widest text-zinc-400 uppercase mb-4">// Beyond Code</h4>
            <div className="flex flex-wrap gap-3">
              {["Chess", "Reading", "Hackathons", "Fitness", "Tech Podcasts", "Travel"].map((tag, i) => (
                <span 
                  key={i} 
                  className="px-3 py-1.5 border border-zinc-200 dark:border-zinc-800 text-xs font-mono rounded bg-white/40 dark:bg-zinc-900/40 text-zinc-600 dark:text-zinc-300 hover:-translate-y-0.5 hover:shadow-sm transition-all duration-300"
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
        className="py-32 px-6 md:px-12 transition-colors duration-1000"
        style={{ backgroundColor: "var(--color-skills)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-xs font-mono tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">// 03 Capabilities</span>
            <h2 className="text-3xl md:text-5xl font-sans font-bold text-zinc-900 dark:text-white mt-4">
              Tools I use. Skills I master.
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
        className="py-32 px-6 md:px-12 transition-colors duration-1000"
        style={{ backgroundColor: "var(--color-projects)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-mono tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">// 04 Featured Work</span>
              <h2 className="text-3xl md:text-5xl font-sans font-bold text-zinc-900 dark:text-white mt-4">
                Things I&apos;ve built with purpose.
              </h2>
            </div>
            
            <a 
              href="https://github.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase border-b border-zinc-400 dark:border-zinc-600 hover:border-zinc-900 dark:hover:border-zinc-100 pb-1 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              View GitHub Profile <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Large Project exhibits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                className="paper-card p-6 flex flex-col justify-between min-h-[480px] border border-zinc-200/50 dark:border-zinc-800/50"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-xs font-mono text-zinc-400">{project.id}</span>
                    <div className="p-3 border border-zinc-100 dark:border-zinc-800/80 rounded bg-zinc-50 dark:bg-zinc-900 shadow-inner">
                      {project.icon}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold font-sans text-zinc-900 dark:text-white leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-xs font-mono text-zinc-400 mt-1 uppercase tracking-wider">
                    {project.subtitle}
                  </p>

                  <div className="my-6 border-y border-zinc-200/50 dark:border-zinc-800/50 py-3">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block mb-1">Key Highlight</span>
                    <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {project.metric}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {project.desc}
                  </p>
                </div>

                <div className="mt-8 space-y-4">
                  {/* Tech chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t, tIdx) => (
                      <span key={tIdx} className="text-[9px] font-mono border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-900/50 px-2 py-0.5 rounded text-zinc-500 dark:text-zinc-400">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4 pt-2 border-t border-zinc-100 dark:border-zinc-800/50">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-mono text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
                    >
                      <GithubIcon className="w-3.5 h-3.5" /> Source
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-mono text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
                    >
                      Live <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ACHIEVEMENTS SECTION */}
      <section 
        id="achievements" 
        className="py-32 px-6 md:px-12 transition-colors duration-1000"
        style={{ backgroundColor: "var(--color-achievements)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-xs font-mono tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">// 05 Milestones</span>
            <h2 className="text-3xl md:text-5xl font-sans font-bold text-zinc-900 dark:text-white mt-4">
              Recognitions &amp; Milestones.
            </h2>
          </div>

          {/* Plaque collection */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="paper-card p-6 flex flex-col justify-between border border-zinc-200/50 dark:border-zinc-800/50 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-zinc-400">Award // 0{idx+1}</span>
                    <Award className="w-4 h-4 text-zinc-400" />
                  </div>
                  <h3 className="text-lg font-bold font-sans text-zinc-900 dark:text-white leading-tight">
                    {item.title}
                  </h3>
                </div>
                <div className="mt-8 pt-4 border-t border-zinc-100 dark:border-zinc-800/60">
                  <span className="text-xs font-mono font-bold uppercase text-zinc-500 dark:text-zinc-400">
                    {item.role}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. EXPERIENCE SECTION */}
      <section 
        id="experience" 
        className="py-32 px-6 md:px-12 transition-colors duration-1000"
        style={{ backgroundColor: "var(--color-experience)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-xs font-mono tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">// 06 Professional Path</span>
            <h2 className="text-3xl md:text-5xl font-sans font-bold text-zinc-900 dark:text-white mt-4">
              Architectural Timeline.
            </h2>
          </div>

          <div className="relative border-l border-zinc-300 dark:border-zinc-800 pl-8 ml-4 space-y-12">
            {/* Timeline Dot highlight animation */}
            <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-zinc-400 to-transparent" />

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Point on timeline */}
              <span className="absolute -left-[37px] top-1.5 w-4 h-4 rounded-full border border-zinc-400 bg-white dark:bg-zinc-950 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-zinc-100" />
              </span>

              <div className="paper-card p-6 max-w-2xl border border-zinc-200/50 dark:border-zinc-800/50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-lg font-bold font-sans text-zinc-900 dark:text-white">Sopra Steria</h3>
                    <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider">AI Project Intern</p>
                  </div>
                  <span className="text-xs font-mono text-zinc-400 bg-zinc-100 dark:bg-zinc-900 px-3 py-1 rounded border border-zinc-200/30 dark:border-zinc-800/30">
                    Jun 2025 – Jul 2025
                  </span>
                </div>

                <ul className="text-xs text-zinc-600 dark:text-zinc-400 space-y-3 list-disc pl-4 leading-relaxed">
                  <li>
                    Developed a high-performance RAG-based enterprise chatbot using LLMs, embedding retrievals, and optimized backend APIs for corporate knowledge base access.
                  </li>
                  <li>
                    Built scalable pipelines for document processing, semantic chunking, indexing, and context validation, improving system reliability and response alignment.
                  </li>
                  <li>
                    Assisted in model deployment experiments, profiling retrieval bottlenecks to reduce semantic search latency.
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Point on timeline */}
              <span className="absolute -left-[37px] top-1.5 w-4 h-4 rounded-full border border-zinc-400 bg-white dark:bg-zinc-950 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
              </span>

              <div className="paper-card p-6 max-w-2xl border border-zinc-200/50 dark:border-zinc-800/50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-lg font-bold font-sans text-zinc-900 dark:text-white">BML Munjal University</h3>
                    <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider">B.Tech — Data Science &amp; AI</p>
                  </div>
                  <span className="text-xs font-mono text-zinc-400 bg-zinc-100 dark:bg-zinc-900 px-3 py-1 rounded border border-zinc-200/30 dark:border-zinc-800/30">
                    2023 – 2027
                  </span>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Focusing on advanced algorithms, neural network design, natural language pipelines, software development lifecycle (SDLC), and data pipelines. Actively participating in national hackathons and innovative AI incubators.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. CONTACT SECTION */}
      <section 
        id="contact" 
        className="py-32 px-6 md:px-12 transition-colors duration-1000"
        style={{ backgroundColor: "var(--color-contact)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Left side text details */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div className="space-y-6">
                <span className="text-xs font-mono tracking-widest text-zinc-500 dark:text-zinc-600 uppercase">// 07 Get In Touch</span>
                <h2 className="text-4xl md:text-5xl font-sans font-bold text-white leading-tight">
                  Let&apos;s build something premium.
                </h2>
                <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
                  Seeking partnerships, interesting engineering projects, or high-impact opportunities in Product Engineering and AI.
                </p>
              </div>

              {/* Socials & details */}
              <div className="mt-12 space-y-6">
                <div className="flex items-center gap-3 text-zinc-300">
                  <Mail className="w-4 h-4 text-zinc-500" />
                  <a href="mailto:kartavya.dev.23cse@bmu.edu.in" className="text-xs font-mono hover:text-white transition-colors">
                    kartavya.dev.23cse@bmu.edu.in
                  </a>
                </div>
                <div className="flex items-center gap-3 text-zinc-300">
                  <MapPin className="w-4 h-4 text-zinc-500" />
                  <span className="text-xs font-mono">Gurugram / Delhi NCR, India</span>
                </div>

                <div className="flex gap-4 pt-6 border-t border-zinc-800">
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-3 border border-zinc-800 rounded bg-[#1f1f1f] text-zinc-400 hover:text-white hover:border-zinc-700 hover:scale-105 transition-all duration-300"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-3 border border-zinc-800 rounded bg-[#1f1f1f] text-zinc-400 hover:text-white hover:border-zinc-700 hover:scale-105 transition-all duration-300"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right side form */}
            <div className="lg:col-span-7">
              <div className="p-8 border border-zinc-800 bg-[#222222] rounded-md shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-12 h-12 bg-zinc-800 pointer-events-none" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }} />
                
                <AnimatePresence mode="wait">
                  {!formSubmitted ? (
                    <motion.form 
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleFormSubmit}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Name</label>
                        <input
                          id="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-[#1c1c1c] border border-zinc-800 focus:border-zinc-500 outline-none rounded p-3 text-sm text-zinc-200 font-mono transition-colors"
                          placeholder="Your name"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Email Address</label>
                        <input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-[#1c1c1c] border border-zinc-800 focus:border-zinc-500 outline-none rounded p-3 text-sm text-zinc-200 font-mono transition-colors"
                          placeholder="your.email@domain.com"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="message" className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Message</label>
                        <textarea
                          id="message"
                          required
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full bg-[#1c1c1c] border border-zinc-800 focus:border-zinc-500 outline-none rounded p-3 text-sm text-zinc-200 font-mono transition-colors resize-none"
                          placeholder="Tell me about your product goals..."
                        />
                      </div>

                      <button
                        type="submit"
                        className="flex items-center gap-3 bg-zinc-100 hover:bg-white text-zinc-950 px-6 py-3.5 rounded font-mono text-xs uppercase tracking-wider transition-all duration-300 w-full justify-center group font-bold"
                      >
                        Send Proposal
                        <Send className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-16 text-center space-y-4"
                    >
                      <div className="inline-flex p-3 bg-zinc-800 rounded-full text-emerald-400 border border-zinc-700">
                        <CheckCircle className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-bold font-sans text-white">Proposal Dispatched</h3>
                      <p className="text-xs font-mono text-zinc-400 max-w-xs mx-auto leading-relaxed">
                        Thank you for reaching out, {formData.name}. I will review your query and reply within 24 hours.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="mt-24 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono text-zinc-600 gap-4">
            <p>© {new Date().getFullYear()} Kartavya Dev. All rights reserved.</p>
            <p>Designed with architectural precision &amp; code integrity.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
