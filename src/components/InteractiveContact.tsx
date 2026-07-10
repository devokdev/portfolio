"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Send, CheckCircle2 } from "lucide-react";

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

export default function InteractiveContact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  
  // Submission animation stages
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isStamped, setIsStamped] = useState(false);
  const [stampSettled, setStampSettled] = useState(false);
  const [paperBounced, setPaperBounced] = useState(false);
  const [proposalSubmitted, setProposalSubmitted] = useState(false);

  const [activeFocus, setActiveFocus] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Sequence start: Lock document
    setIsSubmitting(true);

    // Apply stamp after slight delay
    setTimeout(() => {
      setIsStamped(true);
      setPaperBounced(true); // Paper wiggles from impact force
      
      // Reset bounce flag
      setTimeout(() => setPaperBounced(false), 450);
      
      // Stamp ink settles
      setTimeout(() => {
        setStampSettled(true);
      }, 300);

      // Slide document up and show final success state
      setTimeout(() => {
        setProposalSubmitted(true);
        // Reset local submission states for future uses
        setIsSubmitting(false);
        setIsStamped(false);
        setStampSettled(false);
        setFormData({ name: "", email: "", message: "" });
      }, 1500);

    }, 300);
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto py-12 px-4 md:px-8 overflow-visible">
      
      {/* BACKGROUND: Drafting desk details, construction grid lines */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none opacity-25 dark:opacity-15">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.015)_1.5px,transparent_1.5px)] dark:bg-[radial-gradient(rgba(255,255,255,0.008)_1.5px,transparent_1.5px)] [background-size:20px_20px]" />
        
        {/* Faint blueprint helper circles */}
        <svg className="absolute top-10 left-12 w-96 h-96 text-zinc-400 dark:text-zinc-800 opacity-20" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.2" />
          <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="0.2" strokeDasharray="1 2" />
          <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="0.2" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.2" />
        </svg>

        <svg className="absolute bottom-8 right-8 w-72 h-72 text-zinc-400 dark:text-zinc-800 opacity-15" viewBox="0 0 100 100" fill="none">
          <rect x="10" y="10" width="80" height="80" stroke="currentColor" strokeWidth="0.2" />
          <line x1="10" y1="10" x2="90" y2="90" stroke="currentColor" strokeWidth="0.1" />
          <line x1="90" y1="10" x2="10" y2="90" stroke="currentColor" strokeWidth="0.1" />
        </svg>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 relative z-10">
        
        {/* Left Side: General project details / proposal details */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-12">
          <div className="space-y-6">
            <span className="text-base md:text-lg font-mono font-bold tracking-wider text-zinc-550 dark:text-zinc-500 uppercase">
              // 07 Dispatch Proposal
            </span>
            <h2 className="text-4xl md:text-5xl font-sans font-bold text-zinc-900 dark:text-white leading-tight">
              Let&apos;s build something premium.
            </h2>
            <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-sm">
              Seeking partnerships, interesting engineering projects, or high-impact opportunities in Product Engineering and AI.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3 text-zinc-800 dark:text-zinc-300">
              <Mail className="w-4 h-4 text-zinc-500" />
              <a href="mailto:kartavya.dev.23cse@bmu.edu.in" className="text-xs font-mono hover:underline">
                kartavya.dev.23cse@bmu.edu.in
              </a>
            </div>
            <div className="flex items-center gap-3 text-zinc-800 dark:text-zinc-300">
              <MapPin className="w-4 h-4 text-zinc-500" />
              <span className="text-xs font-mono">Gurugram / Delhi NCR, India</span>
            </div>

            <div className="flex gap-4 pt-6 border-t border-zinc-300 dark:border-zinc-850">
              <a 
                href="https://github.com/devokdev/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 border border-zinc-400 dark:border-zinc-800 rounded-lg bg-white dark:bg-[#0c0c0c] text-zinc-700 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-650 dark:hover:border-zinc-700 transition-all"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://www.linkedin.com/in/kartavyadev/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 border border-zinc-400 dark:border-zinc-800 rounded-lg bg-white dark:bg-[#0c0c0c] text-zinc-700 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-650 dark:hover:border-zinc-700 transition-all"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: The blueprint Proposal Sheet form */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {!proposalSubmitted ? (
              <motion.div
                key="proposal-form"
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                animate={paperBounced ? { y: [0, 5, -2, 0] } : { y: 0 }}
                className="relative bg-[#faf6f0] dark:bg-[#0d0c0b] border border-zinc-400 dark:border-zinc-800 p-6 md:p-10 shadow-[0_12px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.65)] rounded-none overflow-hidden"
              >
                
                {/* Paper texture overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.008)_1px,transparent_1px)] [background-size:6px_6px] pointer-events-none z-0" />

                {/* CAD Blueprint details */}
                <div className="absolute top-2 left-2 border-t border-l border-zinc-500 dark:border-zinc-700 w-2.5 h-2.5 pointer-events-none" />
                <div className="absolute top-2 right-2 border-t border-r border-zinc-500 dark:border-zinc-700 w-2.5 h-2.5 pointer-events-none" />
                <div className="absolute bottom-2 left-2 border-b border-l border-zinc-500 dark:border-zinc-700 w-2.5 h-2.5 pointer-events-none" />
                <div className="absolute bottom-2 right-2 border-b border-r border-zinc-500 dark:border-zinc-700 w-2.5 h-2.5 pointer-events-none" />

                <div className="absolute top-2.5 right-6 text-[7px] font-mono text-zinc-500 select-none tracking-widest">
                  FORM-ID: PROPOSAL-REQ-402 // REV. A00
                </div>

                {/* Form header block */}
                <div className="mb-8 pb-4 border-b border-zinc-400 dark:border-zinc-850 relative z-10">
                  <h3 className="text-sm font-mono uppercase tracking-widest text-zinc-650 dark:text-zinc-400 font-bold">
                    // Engineering Proposal Dispatch
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                  
                  {/* Field 1: Name */}
                  <div className="space-y-1.5 relative">
                    <div className="flex justify-between items-baseline">
                      <label htmlFor="form-name" className="text-[10px] font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                        01. Proposer Identity (Name)
                      </label>
                      <span className={`text-[8px] font-mono transition-opacity duration-300 ${activeFocus === "name" ? "opacity-100 text-zinc-700" : "opacity-0"}`}>
                        [FIELD_ACTIVE]
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        id="form-name"
                        type="text"
                        required
                        readOnly={isSubmitting}
                        value={formData.name}
                        onFocus={() => setActiveFocus("name")}
                        onBlur={() => setActiveFocus(null)}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Specify full name or company"
                        className="w-full bg-transparent p-2.5 text-sm text-zinc-900 dark:text-zinc-100 font-mono outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                      />
                      {/* Blueprint Animated Border line */}
                      <div className="absolute bottom-0 inset-x-0 h-[1px] bg-zinc-350 dark:bg-zinc-800" />
                      <motion.div 
                        animate={activeFocus === "name" ? { scaleX: 1 } : { scaleX: 0 }}
                        className="absolute bottom-0 inset-x-0 h-[1.5px] bg-zinc-900 dark:bg-zinc-100 origin-left"
                      />
                    </div>
                  </div>

                  {/* Field 2: Email */}
                  <div className="space-y-1.5 relative">
                    <div className="flex justify-between items-baseline">
                      <label htmlFor="form-email" className="text-[10px] font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                        02. Route Coordinate (Email Address)
                      </label>
                      <span className={`text-[8px] font-mono transition-opacity duration-300 ${activeFocus === "email" ? "opacity-100 text-zinc-700" : "opacity-0"}`}>
                        [ROUTE_ACTIVE]
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        id="form-email"
                        type="email"
                        required
                        readOnly={isSubmitting}
                        value={formData.email}
                        onFocus={() => setActiveFocus("email")}
                        onBlur={() => setActiveFocus(null)}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="coordinate@domain.ext"
                        className="w-full bg-transparent p-2.5 text-sm text-zinc-900 dark:text-zinc-100 font-mono outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                      />
                      <div className="absolute bottom-0 inset-x-0 h-[1px] bg-zinc-350 dark:bg-zinc-800" />
                      <motion.div 
                        animate={activeFocus === "email" ? { scaleX: 1 } : { scaleX: 0 }}
                        className="absolute bottom-0 inset-x-0 h-[1.5px] bg-zinc-900 dark:bg-zinc-100 origin-left"
                      />
                    </div>
                  </div>

                  {/* Field 3: Message */}
                  <div className="space-y-1.5 relative">
                    <div className="flex justify-between items-baseline">
                      <label htmlFor="form-message" className="text-[10px] font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                        03. System Specifications & Scope
                      </label>
                      <span className={`text-[8px] font-mono transition-opacity duration-300 ${activeFocus === "message" ? "opacity-100 text-zinc-700" : "opacity-0"}`}>
                        [DATA_INSPECT]
                      </span>
                    </div>
                    <div className="relative">
                      <textarea
                        id="form-message"
                        required
                        rows={4}
                        readOnly={isSubmitting}
                        value={formData.message}
                        onFocus={() => setActiveFocus("message")}
                        onBlur={() => setActiveFocus(null)}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Detail the product architecture, constraints, or guidelines..."
                        className="w-full bg-transparent p-2.5 text-sm text-zinc-900 dark:text-zinc-100 font-mono outline-none resize-none placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                      />
                      <div className="absolute bottom-0 inset-x-0 h-[1px] bg-zinc-350 dark:bg-zinc-800" />
                      <motion.div 
                        animate={activeFocus === "message" ? { scaleX: 1 } : { scaleX: 0 }}
                        className="absolute bottom-0 inset-x-0 h-[1.5px] bg-zinc-900 dark:bg-zinc-100 origin-left"
                      />
                    </div>
                  </div>

                  {/* Submit Action block */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center gap-3 bg-zinc-900 hover:bg-zinc-850 dark:bg-zinc-100 dark:hover:bg-white text-zinc-50 dark:text-zinc-950 px-6 py-3.5 rounded font-mono text-xs uppercase tracking-wider transition-all duration-300 w-full justify-center group font-bold disabled:opacity-50 select-none cursor-pointer"
                    >
                      {isSubmitting ? "Locking Proposal..." : "Submit Proposal"}
                      <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>

                </form>

                {/* PHYSICAL INK STAMP OVERLAY */}
                <AnimatePresence>
                  {isStamped && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 select-none bg-black/5 dark:bg-black/10">
                      <motion.div
                        initial={{ scale: 3, opacity: 0 }}
                        animate={stampSettled ? { scale: 1, opacity: 0.6 } : { scale: 1, opacity: 0.8 }}
                        exit={{ scale: 1, opacity: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 18,
                        }}
                        className="border-[6px] border-zinc-950 dark:border-zinc-100 px-6 py-3 text-3xl font-mono font-bold tracking-widest text-zinc-950 dark:text-zinc-100 uppercase select-none rounded border-double rotate-[-12deg] bg-white/20"
                      >
                        PROPOSAL RECVD
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>

              </motion.div>
            ) : (
              // Stage 6: Success Confirmation View
              <motion.div
                key="success-card"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#faf6f0] dark:bg-[#0d0c0b] border border-zinc-400 dark:border-zinc-850 p-12 text-center space-y-6 shadow-[0_12px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.65)]"
              >
                <div className="inline-flex p-3 bg-zinc-200/50 dark:bg-zinc-900/30 rounded-full text-zinc-900 dark:text-zinc-100 border border-zinc-400 dark:border-zinc-800">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold font-sans text-zinc-900 dark:text-zinc-100">Proposal Dispatched</h3>
                <p className="text-xs font-mono text-zinc-700 dark:text-zinc-400 max-w-xs mx-auto leading-relaxed">
                  The requirement sheets have been successfully archived in system cache. I will audit your proposal and reply within 24 hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setProposalSubmitted(false)}
                    className="text-xs font-mono text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white border-b border-zinc-400 hover:border-zinc-900 dark:hover:border-white pb-0.5 transition-all select-none"
                  >
                    Submit another proposal
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
