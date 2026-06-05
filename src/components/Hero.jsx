import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Linkedin, Github } from 'lucide-react';
import avatar from '/my-pic.jpg';

export default function Hero() {
  return (
    <section id="hero" className="relative flex flex-col items-center justify-center min-h-screen py-15 overflow-hidden bg-transparent">
      {/* Ambient glow background */}
      <div className="absolute inset-0 -z-10">
        <div className="ambient-glow opacity-30 w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Textual intro */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-theme-text tracking-tight">
            Mohammad Zakki Adnaan
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-theme-accent typewriter-cursor">
            Frontend &amp; React Developer
          </h2>
          <p className="text-sm md:text-base text-theme-textSec max-w-lg">
            I specialize in building premium, high‑performance web experiences with React, Tailwind CSS, and modern SaaS‑style UI patterns.
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 px-5 py-2 bg-theme-accent text-white rounded-lg glass-card-premium hover:bg-theme-accentGlow transition-colors"
            >
              <Download size={18} /> Download Resume
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2 border border-theme-accent text-theme-accent rounded-lg glass-card-premium hover:bg-theme-accentGlow hover:text-white transition-colors"
            >
              <ArrowRight size={18} /> Contact Me
            </a>
            <a
              href="https://github.com/zakkiadnaan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-theme-border text-theme-textSec rounded-lg glass-card-premium hover:border-theme-accent hover:text-theme-accent transition-colors"
            >
              <Github size={18} /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/zakkiadnaan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-theme-border text-theme-textSec rounded-lg glass-card-premium hover:border-theme-accent hover:text-theme-accent transition-colors"
            >
              <Linkedin size={18} /> LinkedIn
            </a>
          </div>
        </motion.div>

        {/* Avatar image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center md:justify-end"
        >
          <img
            src={avatar}
            alt="Mohammad Zakki Adnaan"
            className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 rounded-lg border border-theme-accent shadow-lg object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
