"use client";

import React from "react";
import { motion } from "framer-motion";

interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  duration: string;
  details: string[];
  revLabel: string;
  refCode: string;
}

const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: "01",
    company: "Sopra Steria",
    role: "AI Project Intern",
    duration: "Jun 2025 – Jul 2025",
    details: [
      "Developed a high-performance RAG-based enterprise chatbot using LLMs, embedding retrievals, and optimized backend APIs for corporate knowledge base access.",
      "Built scalable pipelines for document processing, semantic chunking, indexing, and context validation, improving system reliability and response alignment.",
      "Assisted in model deployment experiments, profiling retrieval bottlenecks to reduce semantic search latency."
    ],
    revLabel: "REV. A01",
    refCode: "CAD-REF-509"
  },
  {
    id: "02",
    company: "BML Munjal University",
    role: "B.Tech — Data Science & AI",
    duration: "2023 – 2027",
    details: [
      "Focusing on advanced algorithms, neural network design, natural language pipelines, software development lifecycle (SDLC), and data pipelines.",
      "Actively participating in national hackathons and innovative AI incubators."
    ],
    revLabel: "REV. B02",
    refCode: "EDU-REF-104"
  }
];

export default function InteractiveExperience() {
  return (
    <div className="relative w-full max-w-6xl mx-auto py-8 overflow-visible">
      {/* Drafting table background details: faint layout markers, compass coordinates */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none opacity-30 dark:opacity-20">
        
        {/* drafting grid line */}
        <div className="absolute top-[20%] left-0 right-0 h-[0.5px] bg-dashed bg-zinc-400 dark:bg-zinc-800 border-t border-dashed border-zinc-400/50 dark:border-zinc-800/35" />
        <div className="absolute top-[70%] left-0 right-0 h-[0.5px] bg-dashed bg-zinc-400 dark:bg-zinc-800 border-t border-dashed border-zinc-400/50 dark:border-zinc-800/35" />
        
        {/* Faint blueprint angle helper (compass circle) */}
        <svg className="absolute top-1/4 -right-16 w-64 h-64 text-zinc-500 dark:text-zinc-800 stroke-current opacity-20" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="45" strokeWidth="0.25" strokeDasharray="1 3" />
          <circle cx="50" cy="50" r="30" strokeWidth="0.25" />
          <line x1="50" y1="0" x2="50" y2="100" strokeWidth="0.25" />
          <line x1="0" y1="50" x2="100" y2="50" strokeWidth="0.25" />
          <text x="52" y="8" className="text-[3px] font-mono fill-current">0.00° N</text>
        </svg>

        <svg className="absolute bottom-12 -left-20 w-80 h-80 text-zinc-500 dark:text-zinc-800 stroke-current opacity-25" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="40" strokeWidth="0.25" strokeDasharray="2 2" />
          <path d="M 50 10 L 50 90 M 10 50 L 90 50" strokeWidth="0.15" />
          <text x="12" y="48" className="text-[3px] font-mono fill-current">W_REF_ALIGN</text>
        </svg>
      </div>

      {/* Main Timeline Stream */}
      <div className="relative z-10 space-y-16 pl-8 md:pl-16 border-l border-zinc-400 dark:border-zinc-850 ml-4 md:ml-8">
        
        {/* Dynamic timeline line path drawing */}
        <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-zinc-500 via-zinc-400 to-transparent dark:from-zinc-700 dark:via-zinc-800 dark:to-transparent" />

        {EXPERIENCE_DATA.map((item, idx) => {
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: idx * 0.2, ease: "easeOut" }}
              className="relative"
            >
              {/* Timeline blueprint node mark */}
              <div className="absolute -left-[41px] md:-left-[73px] top-6 w-6 h-6 flex items-center justify-center pointer-events-none">
                {/* SVG calibration crosshair node */}
                <svg className="w-6 h-6 text-zinc-500 dark:text-zinc-700 bg-[#faf6f0] dark:bg-[#070707] rounded-full" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="0.75" />
                  <circle cx="10" cy="10" r="2" fill="currentColor" />
                  <line x1="10" y1="0" x2="10" y2="20" stroke="currentColor" strokeWidth="0.5" />
                  <line x1="0" y1="10" x2="20" y2="10" stroke="currentColor" strokeWidth="0.5" />
                </svg>
              </div>

              {/* CARD CONTAINER: Warm parchment blueprint paper */}
              <div 
                className="group relative max-w-3xl bg-[#faf6f0]/85 dark:bg-[#0c0b0a]/75 backdrop-blur-[2px] border border-zinc-400 dark:border-zinc-850 p-6 md:p-8 rounded-none transition-all duration-300 hover:bg-[#fcfaf6] dark:hover:bg-[#0f0e0d] hover:border-zinc-500 dark:hover:border-zinc-750 hover:shadow-[0_8px_20px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
              >
                {/* Subtle paper texture noise background overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.01)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.008)_1px,transparent_1px)] [background-size:8px_8px] pointer-events-none rounded-none" />

                {/* CAD corner brackets */}
                <div className="absolute top-2 left-2 border-t border-l border-zinc-500 dark:border-zinc-700 w-2.5 h-2.5 pointer-events-none" />
                <div className="absolute top-2 right-2 border-t border-r border-zinc-500 dark:border-zinc-700 w-2.5 h-2.5 pointer-events-none" />
                <div className="absolute bottom-2 left-2 border-b border-l border-zinc-300 dark:border-zinc-700 w-2.5 h-2.5 pointer-events-none" />
                <div className="absolute bottom-2 right-2 border-b border-r border-zinc-300 dark:border-zinc-700 w-2.5 h-2.5 pointer-events-none" />

                {/* Header block details */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-zinc-400 dark:border-zinc-850">
                  <div>
                    <h3 className="text-lg font-bold font-sans text-zinc-900 dark:text-zinc-100 leading-tight">
                      {item.company}
                    </h3>
                    <p className="text-xs font-mono text-zinc-700 dark:text-zinc-400 uppercase tracking-wider mt-0.5">
                      {item.role}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-[8px] font-mono text-zinc-650 dark:text-zinc-500 select-none tracking-widest border border-zinc-400 dark:border-zinc-800 px-1.5 py-0.5 rounded-sm">
                      {item.refCode}
                    </span>
                    <span className="text-[10px] font-mono font-semibold text-zinc-700 dark:text-zinc-350 bg-zinc-200/20 dark:bg-zinc-800/20 px-3 py-1 rounded border border-zinc-400/50 dark:border-zinc-800/40">
                      {item.duration}
                    </span>
                  </div>
                </div>

                {/* Description details list */}
                <ul className="text-xs text-zinc-800 dark:text-zinc-300 space-y-3 list-none pl-1 leading-relaxed">
                  {item.details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex gap-2 items-start">
                      {/* Architectural horizontal index tick mark */}
                      <span className="text-zinc-600 dark:text-zinc-650 mt-1 select-none font-mono">
                        ↳
                      </span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>

                {/* Revision block labels at the very bottom right (blueprint detailing) */}
                <div className="mt-6 flex justify-between items-center text-[7px] font-mono text-zinc-600 dark:text-zinc-500 select-none tracking-widest pt-2 border-t border-dotted border-zinc-400 dark:border-zinc-800/80">
                  <span>DOCUMENT: EXP_SHEET_0{idx + 1}</span>
                  <span className="font-bold">{item.revLabel}</span>
                </div>

              </div>
            </motion.div>
          );
        })}

      </div>
    </div>
  );
}
