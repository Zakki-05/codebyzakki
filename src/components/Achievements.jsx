import React from 'react';
import { motion } from 'framer-motion';
import { Award, GraduationCap, Layers, Globe } from 'lucide-react';
import { useSound } from './SoundManager';

const ACHIEVEMENTS = [
  {
    icon: GraduationCap,
    title: 'BCA Graduate',
    desc: 'Completed Bachelor of Computer Applications from Islamiah College (Autonomous), Vaniyambadi, establishing strong computer architecture and software engineering foundations.',
    badge: 'BATCH OF 2026',
    accent: '#38bdf8'
  },
  {
    icon: Layers,
    title: 'Multiple React Projects',
    desc: 'Architected and built multiple high-fidelity web applications in React, implementing robust state management, modular components, and fluid responsive grid layouts.',
    badge: '5+ PRODUCTION BUILDS',
    accent: '#8b5cf6'
  },
  {
    icon: Award,
    title: 'Full-Stack Project Completed',
    desc: 'Successfully engineered Pernambut Connection—a civic coordination network connecting local citizens. Developed secure client dashboards and integrated Python Django REST backend endpoints.',
    badge: 'COMPLETED INTEGRATION',
    accent: '#ec4899'
  },
  {
    icon: Globe,
    title: 'Live Deployments & CD Pipelines',
    desc: 'Staged and deployed web applications live on production platforms using Git, Netlify, and Render, establishing continuous integration hooks for seamless codebase syncing.',
    badge: 'NETLIFY & RENDER',
    accent: '#10b981'
  }
];

export default function Achievements() {
  const { playHover, playClick } = useSound();

  return (
    <section id="achievements" className="relative py-28 px-6 overflow-hidden bg-transparent">
      {/* Background Radial Glow */}
      <div className="absolute top-[40%] right-[-10%] w-[350px] h-[350px] ambient-glow opacity-20 pointer-events-none z-0"></div>

      <div className="max-w-6xl mx-auto relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-mono tracking-[0.25em] text-theme-accent uppercase font-bold"
          >
            05 // CREDENTIALS
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-theme-text"
          >
            Core Achievements
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xs sm:text-sm text-theme-textSec leading-relaxed"
          >
            A summary of milestones, credentials, and full-stack integrations.
          </motion.p>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ACHIEVEMENTS.map((ach, idx) => {
            const Icon = ach.icon;
            
            return (
              <motion.div
                key={ach.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onClick={playClick}
                onMouseEnter={playHover}
                className="p-6 rounded-2xl glass-card-premium flex flex-col justify-between group cursor-pointer relative"
              >
                {/* Top Section */}
                <div className="space-y-4 text-left">
                  <div className="flex justify-between items-start">
                    <div 
                      className="p-2.5 rounded-xl bg-theme-bgSec border border-theme-border text-theme-textSec group-hover:text-[#020617] transition-all duration-300"
                      style={{ groupHoverBg: ach.accent }}
                    >
                      <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" style={{ color: ach.accent }} />
                    </div>
                    <span 
                      className="font-mono text-[9px] font-bold tracking-widest border px-2 py-0.5 rounded uppercase"
                      style={{ color: ach.accent, borderColor: `${ach.accent}40`, backgroundColor: `${ach.accent}08` }}
                    >
                      {ach.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-theme-text group-hover:text-theme-accent transition-colors duration-300">
                    {ach.title}
                  </h3>
                  <p className="text-xs md:text-sm text-theme-textSec leading-relaxed font-light">
                    {ach.desc}
                  </p>
                </div>

                <div className="text-[10px] font-mono text-theme-textMuted border-t border-theme-border/60 pt-4 mt-6 flex justify-between select-none">
                  <span>VERIFIED // SECURE</span>
                  <span>0{idx + 1}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
