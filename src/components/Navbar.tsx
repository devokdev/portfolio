"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";
import { Moon, Sun, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Me" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "achievements", label: "Achievements" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Section highlighters
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-6xl transition-all duration-500 border rounded-full ${
        isScrolled
          ? "bg-white/75 dark:bg-[#181818]/75 backdrop-blur-md py-3.5 border-zinc-400 dark:border-zinc-800/80 shadow-md"
          : "bg-transparent py-4.5 border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo("home")}
          className="text-lg font-mono font-bold tracking-widest flex items-center gap-1 group"
        >
          <span className="text-zinc-900 dark:text-white transition-colors duration-300">K</span>
          <span className="text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors duration-300">·</span>
          <span className="text-zinc-900 dark:text-white transition-colors duration-300">D</span>
        </button>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="relative text-sm font-sans tracking-wide transition-colors duration-300 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white py-1"
            >
              {item.label}
              {activeSection === item.id && (
                <motion.span
                  layoutId="activeDot"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 flex items-center justify-center"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <span className="w-1.5 h-1.5 rotate-45 bg-zinc-900 dark:bg-white block" />
                </motion.span>
              )}
            </button>
          ))}
        </nav>

        {/* Theme Toggle & Download CTA */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 transition-all duration-300 flex items-center justify-center relative overflow-hidden"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="w-4 h-4 transition-transform duration-500 hover:rotate-12" />
            ) : (
              <Sun className="w-4 h-4 transition-transform duration-500 hover:rotate-45" />
            )}
          </button>

          <a
            href="/resumes/KartavyaDev_Resume (1).pdf"
            download
            className="hidden sm:flex items-center gap-2 text-xs font-mono tracking-wider uppercase border border-zinc-900 dark:border-zinc-100 bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 px-4 py-2.5 rounded-md hover:bg-transparent hover:text-zinc-900 dark:hover:bg-transparent dark:hover:text-zinc-50 transition-all duration-300 group"
          >
            Resume
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </motion.header>
  );
}
