import React from 'react';
import { motion } from 'framer-motion';
import { Award, GraduationCap, Layers, Globe, Sparkles, Terminal } from 'lucide-react';
import { useSound } from './SoundManager';

const ACHIEVEMENTS = [
  {
    icon: GraduationCap,
    title: 'BCA Graduate',
    desc: 'Completed Bachelor of Computer Applications from Islamiah College (Autonomous), Vaniyambadi, establishing strong computer architecture and software engineering foundations.',
    badge: 'BATCH OF 2026',
    color: 'from-[#00f0ff] to-[#8b5cf6]',
    shadow: 'rgba(0, 240, 255, 0.15)'
  },
  {
    icon: Layers,
    title: 'Multiple React Projects',
    desc: 'Architected and built multiple high-fidelity web applications in React, implementing robust state management, modular components, and fluid responsive grid layouts.',
    badge: '5+ PRODUCTION BUILDS',
    color: 'from-[#8b5cf6] to-[#ec4899]',
    shadow: 'rgba(139, 92, 246, 0.15)'
  },
  {
    icon: Award,
    title: 'Full-Stack Project Completed',
    desc: 'Successfully engineered Pernambut Connection—a civic coordination network connecting local citizens. Developed secure client dashboards and integrated Python Django REST backend endpoints.',
    badge: 'COMPLETED INTEGRATION',
    color: 'from-[#ec4899] to-[#00f0ff]',
    shadow: 'rgba(236, 72, 153, 0.15)'
  },
  {
    icon: Globe,
    title: 'Live Deployments & CD Pipelines',
    desc: 'Staged and deployed web applications live on production platforms using Git, Netlify, and Render, establishing continuous integration hooks for seamless codebase syncing.',
    badge: 'NETLIFY & RENDER',
    color: 'from-[#10b981] to-[#00f0ff]',
    shadow: 'rgba(16, 185, 129, 0.15)'
  }
];

export default function Achievements() {
  const { playHover, playClick } = useSound();

  return (
    <section id="achievements" className="relative py-28 px-6 overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-[40%] right-[-10%] w-[450px] h-[450px] rounded-full bg-neon-blue/[0.01] blur-[150px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        
        {/* Header Block */}
        <div className="text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-purple/20 bg-neon-purple/5 text-neon-purple text-xs font-mono tracking-widest uppercase mb-4 animate-pulse-slow">
            <Sparkles className="w-3.5 h-3.5" />
            SUCCESS_METRICS // CORE_MILESTONES
          </div>
          <h2 className="text-4xl md:text-6xl font-black font-poppins tracking-tight text-white uppercase leading-none">
            ACHIEVEMENTS
          </h2>
          <p className="text-text-gray max-w-xl text-sm md:text-base font-light font-sans mt-4">
            Key professional milestones, academic qualifications, and successful full-stack deployments completed throughout my engineering path.
          </p>
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
                transition={{ delay: idx * 0.1, type: 'spring', stiffness: 200, damping: 20 }}
                onClick={playClick}
                onMouseEnter={playHover}
                className="p-6 rounded-[24px] glass-card border-white/5 flex flex-col justify-between hover:border-white/10 group cursor-pointer relative"
              >
                {/* Accent glow on hover */}
                <div className="absolute inset-0 rounded-[24px] border border-neon-blue/0 group-hover:border-white/5 transition-all duration-300 pointer-events-none" />

                {/* Top Section */}
                <div className="space-y-4 text-left">
                  <div className="flex justify-between items-start">
                    <div className="p-3 rounded-2xl bg-white/[0.01] border border-white/5 text-text-gray group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-[9px] text-neon-blue font-bold tracking-widest border border-neon-blue/20 bg-neon-blue/5 px-2 py-0.5 rounded uppercase">
                      {ach.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-poppins text-white tracking-wide">
                    {ach.title}
                  </h3>
                  <p className="text-xs md:text-sm text-text-gray/80 leading-relaxed font-sans font-light">
                    {ach.desc}
                  </p>
                </div>

                {/* Bottom line accent */}
                <div className="pt-4 mt-6 border-t border-white/[0.03] flex items-center gap-1.5 text-[8.5px] font-mono text-text-gray/40 uppercase tracking-widest">
                  <Terminal className="w-3 h-3 text-neon-purple" />
                  Status: Verified Credentials
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>

    </section>
  );
}
