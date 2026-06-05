import React from 'react';
import { motion } from 'framer-motion';
import { Code, Rocket, Blocks, Award, Sparkles } from 'lucide-react';
import { useSound } from './SoundManager';

const TIMELINE = [
  {
    title: 'React Web Applications',
    subtitle: 'Frontend Engineering',
    desc: 'Architected multiple single-page React environments using custom hooks, central states, and Framer Motion for high-fidelity responsive layouts.',
    icon: Code,
    accent: '#38bdf8'
  },
  {
    title: 'REST API Integrations',
    subtitle: 'Full-Stack Integration',
    desc: 'Connected React client dashboards with Python Django and SQLite servers. Integrated JSON Web Tokens (JWT) for secure authentication middleware.',
    icon: Blocks,
    accent: '#8b5cf6'
  },
  {
    title: 'Frontend Developer Intern (AspiraSys)',
    subtitle: 'Professional Internship',
    desc: 'Collaborated with senior engineers on frontend templates, optimized asset delivery speeds, and configured modular React interface components.',
    icon: Award,
    accent: '#ec4899'
  },
  {
    title: 'Deployment & CI/CD Pipelines',
    subtitle: 'Cloud Operations',
    desc: 'Synchronized version-controlled codebases with Netlify and Render. Implemented continuous deployment workflows connected to GitHub repositories.',
    icon: Rocket,
    accent: '#10b981'
  }
];

export default function Experience() {
  const { playHover, playClick } = useSound();

  return (
    <section id="experience" className="relative py-28 px-6 overflow-hidden bg-transparent">
      {/* Background Radial Glow */}
      <div className="absolute top-[40%] left-[-10%] w-[350px] h-[350px] ambient-glow opacity-20 pointer-events-none z-0"></div>

      <div className="max-w-4xl mx-auto relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-mono tracking-[0.25em] text-theme-accent uppercase font-bold"
          >
            04 // EXPERIENCE
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-theme-text"
          >
            Development Milestones
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xs sm:text-sm text-theme-textSec leading-relaxed"
          >
            A vertical trace of projects, team integrations, and cloud operations accomplished.
          </motion.p>
        </div>

        {/* Timeline Track */}
        <div className="relative pt-8 pl-6 md:pl-0">
          
          {/* Vertical Grid Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-theme-border/60 pointer-events-none" />

          <div className="space-y-12">
            {TIMELINE.map((item, idx) => {
              const Icon = item.icon;
              const isEven = idx % 2 === 0;

              return (
                <div 
                  key={item.title} 
                  className={`flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  } relative`}
                >
                  {/* Timeline Node Center Circle */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-[12px] md:-translate-x-[16px] top-1 z-20 pointer-events-none">
                    <div 
                      className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-theme-bgSec border border-theme-border flex items-center justify-center shadow-lg"
                      style={{ borderColor: item.accent }}
                    >
                      <Icon className="w-3.5 h-3.5" style={{ color: item.accent }} />
                    </div>
                  </div>

                  {/* Spacer Column */}
                  <div className="hidden md:block w-1/2"></div>

                  {/* Card Block */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 150, damping: 20 }}
                    onMouseEnter={playHover}
                    onClick={playClick}
                    className="w-full md:w-[45%] pl-6 md:pl-0 space-y-3"
                  >
                    <div className="glass-card-premium rounded-2xl p-6 space-y-3">
                      <div className="space-y-1">
                        <span className="font-mono text-[9px] uppercase tracking-widest font-bold" style={{ color: item.accent }}>
                          {item.subtitle}
                        </span>
                        <h4 className="text-base font-bold text-theme-text">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-xs text-theme-textSec leading-relaxed font-light">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
