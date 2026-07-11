"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowRight, ExternalLink, Network } from "lucide-react";

interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  beforeLabel: string;
  beforeVal: string;
  afterLabel: string;
  afterVal: string;
  metricLabel: string;
  metricVal: string;
  desc: string;
  tech: string[];
  github: string;
  live: string;
  systemFlow: {
    label: string;
    detail: string;
  }[];
  detailedMetrics: {
    label: string;
    val: string;
  }[];
}

const PROJECTS_DATA: ProjectData[] = [
  {
    id: "01",
    title: "EAOS Simplified",
    subtitle: "AI-Assisted Email Operations Platform",
    beforeLabel: "Manual Email Operations",
    beforeVal: "15m / Draft",
    afterLabel: "AI outreach Automation",
    afterVal: "12s / Draft",
    metricLabel: "Operational Efficiency Gain",
    metricVal: "+150%",
    desc: "Engineered AI-powered outreach automation platform supporting 1K+ workflows with batch sending, inbox synchronization, and thread-aware response pipelines.",
    tech: ["FastAPI", "React.js", "PostgreSQL", "SMTP/IMAP"],
    github: "https://github.com/devokdev/EAOS_Simplified",
    live: "https://eaos-web-chi.vercel.app/",
    systemFlow: [
      { label: "Trigger Workflow", detail: "Batch schedules emails based on inbox signals" },
      { label: "AI Thread Analysis", detail: "FastAPI parses thread history context" },
      { label: "Agent generation", detail: "LLM drafts thread-aware customized responses" },
      { label: "SMTP Sync Gateway", detail: "Secured IMAP dispatch & inbox updates" }
    ],
    detailedMetrics: [
      { label: "Inbox Sync Latency", val: "-85%" },
      { label: "Successful Workflows", val: "1.2K+" },
      { label: "Response Accuracy", val: "99.4%" }
    ]
  },
  {
    id: "02",
    title: "KishanBhai",
    subtitle: "AI Agricultural Assistance Platform",
    beforeLabel: "Manual Diagnostic",
    beforeVal: "10 Days",
    afterLabel: "AI Disease Detection",
    afterVal: "1.5s / Image",
    metricLabel: "Incubation Offered By",
    metricVal: "IIT Ropar Offered",
    desc: "Multilingual AI-powered platform featuring crop disease detection, weather forecasts, and voice assistance across 5 Indian languages to mitigate crop loss.",
    tech: ["React.js", "Next.js", "Firebase", "Gemini AI", "Flutter"],
    github: "https://github.com/devokdev/KishanBhai",
    live: "https://kishan-bhai.vercel.app/",
    systemFlow: [
      { label: "Image Capture", detail: "Flutter application uploads crop photograph" },
      { label: "Vision Processing", detail: "Firebase Function directs payload to AI models" },
      { label: "Gemini Diagnostic", detail: "Analyzes leaf lesions & identifies pathology" },
      { label: "Voice Verdict", detail: "Generates natural speech response in native dialect" }
    ],
    detailedMetrics: [
      { label: "Crop Loss Reduction", val: "25%" },
      { label: "Language Translation", val: "98.2%" },
      { label: "Indian dialects support", val: "5+" }
    ]
  },
  {
    id: "03",
    title: "Codebase Intelligence",
    subtitle: "Semantic Retrieval Engine",
    beforeLabel: "Keyword Matching Search",
    beforeVal: "0 Context",
    afterLabel: "FAISS Vector Search",
    afterVal: "97% Domain Fit",
    metricLabel: "Search Latency Reduced By",
    metricVal: "35% Reduction",
    desc: "FastAPI microservice following clean architecture, optimizing FAISS vector search, yielding +8.4% ROUGE-L and +47% domain alignment score.",
    tech: ["Python", "FastAPI", "FAISS", "PostgreSQL", "Docker"],
    github: "https://github.com/devokdev/Codebase-explanator",
    live: "https://github.com/devokdev/Codebase-explanator",
    systemFlow: [
      { label: "Query Ingest", detail: "Accepts code queries & raw text lookups" },
      { label: "Chunk Indexing", detail: "Tokenizes code syntax structure nodes" },
      { label: "Vector Search", detail: "FAISS extracts closest embedding distances" },
      { label: "Metadata Fetch", detail: "PostgreSQL joins file paths & domain nodes" }
    ],
    detailedMetrics: [
      { label: "ROUGE-L Score", val: "+8.4%" },
      { label: "Domain Alignment", val: "+47%" },
      { label: "Query Execution time", val: "14ms" }
    ]
  },
  {
    id: "04",
    title: "Invisible Medical Watermarking",
    subtitle: "Hybrid DWT-CNN-Transformer Framework",
    beforeLabel: "Traditional Embedding",
    beforeVal: "High BER",
    afterLabel: "DWT-CNN-Transformer",
    afterVal: "0 BER / 10+ Attacks",
    metricLabel: "Manuscript Submitted To",
    metricVal: "IEEE MultiMedia",
    desc: "Developed a multimodal medical image watermarking framework using DWT, CNNs, and Transformers for robust watermark embedding. Achieved 52.74 dB PSNR, 0.994 SSIM, and 0 BER on 1,000+ images under 10+ distortion attacks. Authored and submitted a manuscript to IEEE Multimedia (under review).",
    tech: ["PyTorch", "OpenCV", "CNNs", "Transformers", "Computer Vision"],
    github: "https://github.com/devokdev/Invisible_Image_Watermarking",
    live: "https://github.com/devokdev/Invisible_Image_Watermarking",
    systemFlow: [
      { label: "DWT Frequency Mapping", detail: "Embeds watermark info inside frequency sub-bands" },
      { label: "CNN Feature Extract", detail: "Extracts resilient spatial landmarks from host" },
      { label: "Transformer Attention", detail: "Applies self-attention blocks to model pixel dependencies" },
      { label: "Attack Simulation", detail: "Evaluates extraction integrity under distortion channels" }
    ],
    detailedMetrics: [
      { label: "Peak Signal-to-Noise Ratio", val: "52.74 dB" },
      { label: "Structural Similarity (SSIM)", val: "0.994" },
      { label: "Bit Error Rate (BER)", val: "0" }
    ]
  }
];

function Github({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
    </svg>
  );
}

// Odometer Character Animator Component (Rolling digits 0-9)
const Odometer = ({ value }: { value: string }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });
  const chars = value.split("");

  return (
    <span ref={containerRef} className="inline-flex items-center font-mono select-none">
      {chars.map((char, idx) => {
        const isNum = /\d/.test(char);
        if (!isNum || !isInView) {
          return (
            <span 
              key={idx} 
              className="w-[0.62em] h-[1.2em] inline-flex items-center justify-center font-bold text-zinc-900 dark:text-zinc-100"
            >
              {char}
            </span>
          );
        }

        const num = parseInt(char, 10);
        return (
          <span
            key={idx}
            className="w-[0.62em] h-[1.2em] inline-flex items-center justify-center overflow-hidden relative text-zinc-900 dark:text-zinc-100"
          >
            <motion.span
              initial={{ y: "0%" }}
              animate={{ y: `-${num * 10}%` }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: idx * 0.04 }}
              className="absolute left-0 top-0 w-full flex flex-col items-center"
            >
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                <span 
                  key={n} 
                  className="h-[1.2em] flex items-center justify-center select-none font-bold"
                >
                  {n}
                </span>
              ))}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
};

export default function InteractiveProjects() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedCard((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full space-y-8 max-w-6xl mx-auto py-8">
      {PROJECTS_DATA.map((project, idx) => {
        const isExpanded = expandedCard === project.id;

        let borderClass = "border-zinc-300 dark:border-zinc-800 hover:border-zinc-500 dark:hover:border-zinc-700 shadow-sm hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.6)]";
        let lCornerClass = "border-zinc-400 dark:border-zinc-650";
        
        if (project.id === "01") {
          borderClass = "border-blue-400/40 dark:border-blue-900/40 hover:border-blue-500/80 dark:hover:border-blue-700/80 shadow-[0_4px_15px_rgba(59,130,246,0.04)] dark:shadow-[0_8px_30px_rgba(59,130,246,0.08)]";
          lCornerClass = "border-blue-500 dark:border-blue-500/60";
        } else if (project.id === "02") {
          borderClass = "border-emerald-400/40 dark:border-emerald-900/40 hover:border-emerald-500/80 dark:hover:border-emerald-700/80 shadow-[0_4px_15px_rgba(16,185,129,0.04)] dark:shadow-[0_8px_30px_rgba(16,185,129,0.08)]";
          lCornerClass = "border-emerald-500 dark:border-emerald-500/60";
        } else if (project.id === "03") {
          borderClass = "border-orange-400/45 dark:border-orange-900/40 hover:border-orange-500/80 dark:hover:border-orange-700/80 shadow-[0_4px_15px_rgba(249,115,22,0.04)] dark:shadow-[0_8px_30px_rgba(249,115,22,0.08)]";
          lCornerClass = "border-orange-500 dark:border-orange-500/60";
        } else if (project.id === "04") {
          borderClass = "border-yellow-400/40 dark:border-yellow-900/40 hover:border-yellow-500/80 dark:hover:border-yellow-700/80 shadow-[0_4px_15px_rgba(234,179,8,0.04)] dark:shadow-[0_8px_30px_rgba(234,179,8,0.08)]";
          lCornerClass = "border-yellow-500 dark:border-yellow-500/60";
        }

        return (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
            className={`group relative bg-white/80 dark:bg-[#070707]/60 backdrop-blur-[3px] border rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 ${borderClass}`}
          >
            {/* AMBIENT BACKGROUND: Slow panning structural grid pattern */}
            <motion.div 
              animate={{ backgroundPosition: ["0px 0px", "24px 24px"] }}
              transition={{ ease: "linear", duration: 25, repeat: Infinity }}
              className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none z-0" 
            />

            {/* AMBIENT SCAN LINE: slow moving blueprint glare across card surface */}
            <motion.div
              animate={{ x: ["-100%", "600%"] }}
              transition={{ ease: "linear", duration: 14, repeat: Infinity }}
              className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-zinc-400/20 dark:via-zinc-700/5 to-transparent skew-x-12 pointer-events-none z-10"
            />

            {/* CAD L-CORNER MARKERS (Fine architectural markings detailing borders) */}
            <div className={`absolute top-2 left-2 border-t border-l w-3 h-3 pointer-events-none ${lCornerClass}`} />
            <span className="absolute top-2.5 left-6 text-[7px] font-mono text-zinc-500 dark:text-zinc-500 pointer-events-none select-none tracking-widest">[0,0]</span>

            <div className={`absolute top-2 right-2 border-t border-r w-3 h-3 pointer-events-none ${lCornerClass}`} />
            <span className="absolute top-2.5 right-6 text-[7px] font-mono text-zinc-500 dark:text-zinc-500 pointer-events-none select-none tracking-widest">[W,0]</span>

            <div className={`absolute bottom-2 left-2 border-b border-l w-3 h-3 pointer-events-none ${lCornerClass}`} />
            <span className="absolute bottom-2.5 left-6 text-[7px] font-mono text-zinc-500 dark:text-zinc-500 pointer-events-none select-none tracking-widest">[0,H]</span>

            <div className={`absolute bottom-2 right-2 border-b border-r w-3 h-3 pointer-events-none ${lCornerClass}`} />
            <span className="absolute bottom-2.5 right-6 text-[7px] font-mono text-zinc-500 dark:text-zinc-500 pointer-events-none select-none tracking-widest">[W,H]</span>

            {/* Micro Crosshair Calibration Marks */}
            <svg className="w-2 h-2 text-zinc-400 dark:text-zinc-600 absolute top-2.5 left-[48%] opacity-30" viewBox="0 0 10 10">
              <circle cx="5" cy="5" r="4" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <line x1="5" y1="0" x2="5" y2="10" stroke="currentColor" strokeWidth="0.5" />
              <line x1="0" y1="5" x2="10" y2="5" stroke="currentColor" strokeWidth="0.5" />
            </svg>

            {/* CARD HEADER SECTION */}
            <div 
              onClick={() => toggleExpand(project.id)}
              className="p-6 md:p-8 cursor-pointer relative z-10 select-none flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              {/* Left Column: Title Block */}
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono tracking-widest text-zinc-600 dark:text-zinc-500 uppercase">
                    // SYS_MOD_{project.id}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 dark:bg-zinc-800 animate-pulse" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold font-sans text-zinc-900 dark:text-zinc-100 leading-tight">
                  {project.title}
                </h3>
                <p className="text-xs font-mono text-zinc-700 dark:text-zinc-400 uppercase tracking-wider">
                  {project.subtitle}
                </p>
              </div>

              {/* Middle Column: Transformation Comparison View */}
              <div className="flex items-center gap-4 bg-zinc-200/55 dark:bg-zinc-900/20 border border-zinc-400 dark:border-zinc-850 px-4 py-3 rounded min-w-[280px] max-w-sm relative overflow-hidden group-hover:border-zinc-600 dark:group-hover:border-zinc-800 transition-colors">
                <div className="flex-1 text-left space-y-0.5">
                  <span className="text-[8px] font-mono text-zinc-600 dark:text-zinc-500 uppercase block tracking-wider">
                    {project.beforeLabel}
                  </span>
                  <span className="text-xs font-mono text-zinc-700 dark:text-zinc-400 line-through">
                    {project.beforeVal}
                  </span>
                </div>

                <div className="flex items-center text-zinc-550 dark:text-zinc-700">
                  <ArrowRight className="w-4 h-4" />
                </div>

                <div className="flex-1 text-left space-y-0.5 pl-2 border-l border-zinc-400 dark:border-zinc-850">
                  <span className="text-[8px] font-mono text-zinc-700 dark:text-zinc-300 uppercase block tracking-wider font-bold">
                    {project.afterLabel}
                  </span>
                  <span className="text-xs font-mono font-bold text-zinc-900 dark:text-zinc-100">
                    {project.afterVal}
                  </span>
                </div>
              </div>

              {/* Right Column: Key Metric Highlight */}
              <div className="text-left md:text-right min-w-[160px]">
                <span className="text-[9px] font-mono text-zinc-600 dark:text-zinc-500 uppercase tracking-widest block">
                  {project.metricLabel}
                </span>
                <span className="text-lg font-mono font-bold text-zinc-900 dark:text-zinc-100 uppercase mt-0.5 block">
                  <Odometer value={project.metricVal} />
                </span>
              </div>
            </div>

            {/* Architectural Grid Line Divider */}
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="h-[1px] bg-zinc-400 dark:bg-zinc-850 origin-left relative z-10"
            />

            {/* BLUEPRINT UNFOLDING EXPANSION CONTENT */}
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10 overflow-hidden bg-zinc-50/20 dark:bg-[#070707]/30"
                >
                  <div className="p-6 md:p-8 space-y-8 border-t border-zinc-300 dark:border-zinc-850">
                    
                    {/* Section 1: Detailed Description & Metrics Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                      
                      {/* Left 2 Columns: Description & System Overview */}
                      <div className="md:col-span-2 space-y-4">
                        <span className="text-[9px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest block">
                          // Module Overview
                        </span>
                        <p className="text-sm text-zinc-800 dark:text-zinc-300 leading-relaxed font-sans pr-4">
                          {project.desc}
                        </p>
                      </div>

                      {/* Right 1 Column: Mini Performance Indicators */}
                      <div className="space-y-4 bg-zinc-200/45 dark:bg-zinc-900/10 border border-zinc-300 dark:border-zinc-850 rounded-lg p-4">
                        <span className="text-[9px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest block mb-1">
                          // Performance Indicators
                        </span>
                        <div className="space-y-3">
                          {project.detailedMetrics.map((met, mIdx) => (
                            <div key={mIdx} className="flex justify-between items-center text-xs font-mono">
                              <span className="text-zinc-600 dark:text-zinc-400">{met.label}</span>
                              <span className="text-zinc-900 dark:text-zinc-100 font-bold">
                                <Odometer value={met.val} />
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>

                    {/* Section 2: Architecture Flow Visualization */}
                    <div className="space-y-4">
                      <span className="text-[9px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest block">
                        // System Data Flow Pipeline
                      </span>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                        {project.systemFlow.map((flow, fIdx) => (
                          <div 
                            key={fIdx}
                            className="bg-white/80 dark:bg-[#0c0c0c]/80 border border-zinc-300 dark:border-zinc-850 rounded-lg p-4 space-y-2 relative transition-all duration-300 hover:border-zinc-500 dark:hover:border-zinc-700"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[9px] font-mono text-zinc-500 dark:text-zinc-400 uppercase font-semibold">
                                Stage 0{fIdx + 1}
                              </span>
                              <Network className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-650" />
                            </div>
                            <h4 className="text-xs font-mono font-bold text-zinc-900 dark:text-zinc-200">
                              {flow.label}
                            </h4>
                            <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-snug">
                              {flow.detail}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Section 3: Tech stack chips & Action buttons */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4 border-t border-zinc-300 dark:border-zinc-800">
                      
                      {/* Tech Chips Staggered reveal */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.tech.map((t, tIdx) => (
                          <span 
                            key={tIdx} 
                            className="text-[10px] font-mono px-2.5 py-1 border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#0a0a0a] rounded text-zinc-800 dark:text-zinc-300 select-none"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Action buttons appearing last */}
                      <div className="flex items-center gap-4">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-1.5 border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#0c0c0c] hover:border-zinc-500 dark:hover:border-zinc-600 rounded text-xs font-mono text-zinc-700 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-all select-none"
                        >
                          <Github className="w-3.5 h-3.5" /> Source Code
                        </a>
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-1.5 border border-zinc-300 dark:border-zinc-800 bg-zinc-900 dark:bg-zinc-800 hover:bg-zinc-800 dark:hover:bg-zinc-700 rounded text-xs font-mono text-white select-none transition-all"
                        >
                          Launch App <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>

                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        );
      })}
    </div>
  );
}
