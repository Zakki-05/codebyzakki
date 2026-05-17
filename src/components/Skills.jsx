import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Sparkles, Wind, Database, Link, GitBranch, Smartphone, Layers, Terminal, Grid } from 'lucide-react';
import { useSound } from './SoundManager';

const SKILLS = [
  { name: 'HTML5', icon: Code, level: 95, color: 'from-[#e34f26] to-[#f06529]', shadow: 'rgba(240,101,41,0.2)' },
  { name: 'CSS3', icon: Palette, level: 90, color: 'from-[#1572b6] to-[#33a9dc]', shadow: 'rgba(21,114,182,0.2)' },
  { name: 'JavaScript', icon: Sparkles, level: 92, color: 'from-[#f7df1e] to-[#f0db4f]', shadow: 'rgba(247,223,30,0.2)' },
  { name: 'Tailwind CSS', icon: Wind, level: 95, color: 'from-[#06b6d4] to-[#3b82f6]', shadow: 'rgba(6,182,212,0.2)' },
  { name: 'Bootstrap', icon: Grid, level: 85, color: 'from-[#7952b3] to-[#9b66cc]', shadow: 'rgba(121,82,179,0.2)' },
  { name: 'React JS', icon: Terminal, level: 90, color: 'from-[#61dafb] to-[#1fc8f8]', shadow: 'rgba(97,218,251,0.2)' },
  { name: 'Django', icon: Database, level: 80, color: 'from-[#092e20] to-[#12583c]', shadow: 'rgba(9,46,32,0.2)' },
  { name: 'REST API', icon: Link, level: 85, color: 'from-[#8b5cf6] to-[#ec4899]', shadow: 'rgba(139,92,246,0.2)' },
  { name: 'Git & GitHub', icon: GitBranch, level: 88, color: 'from-[#f05032] to-[#ff6b4a]', shadow: 'rgba(240,80,50,0.2)' },
  { name: 'Responsive Design', icon: Smartphone, level: 95, color: 'from-[#10b981] to-[#059669]', shadow: 'rgba(16,185,129,0.2)' },
  { name: 'UI/UX Design', icon: Layers, level: 88, color: 'from-[#00f0ff] to-[#8b5cf6]', shadow: 'rgba(0,240,255,0.2)' }
];

export default function Skills() {
  const { playHover, playClick } = useSound();

  return (
    <section id="skills" className="relative py-28 px-6 overflow-hidden tech-grid">
      
      {/* Background drift lighting blobs */}
      <div className="absolute top-[30%] right-[-10%] w-[350px] h-[350px] rounded-full bg-neon-blue/5 blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[30%] left-[-10%] w-[350px] h-[350px] rounded-full bg-neon-purple/5 blur-[120px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Title details */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-blue/20 bg-neon-blue/5 text-neon-blue text-xs font-mono tracking-widest uppercase mb-4 animate-pulse-slow">
            <Terminal className="w-3.5 h-3.5" />
            ENGINE_COMPILER
          </div>
          <h2 className="text-4xl md:text-6xl font-black font-poppins tracking-tight text-white mb-4 uppercase">
            SKILL MATRICES
          </h2>
          <p className="text-text-gray max-w-xl mx-auto text-sm md:text-base font-light font-sans">
            A comprehensive mapping of technologies, structural frameworks, and creative design platforms representing my engineering stack.
          </p>
        </div>

        {/* Skills Bento Grid wrapper */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {SKILLS.map((skill, idx) => {
            const Icon = skill.icon;
            
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: idx * 0.05, type: 'spring', stiffness: 180, damping: 20 }}
                onClick={playClick}
                onMouseEnter={playHover}
                className="p-6 rounded-[24px] glass-card border-white/5 flex flex-col justify-between group cursor-pointer relative overflow-hidden h-[180px] hover:scale-[1.02]"
                style={{
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {/* Floating graphic backdrop decoration */}
                <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-white/[0.01] border border-white/5 group-hover:scale-150 group-hover:bg-neon-blue/[0.02] transition-transform duration-500 pointer-events-none" />

                {/* Top Section: Icon badge & Name */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-white group-hover:bg-white group-hover:text-black transition-colors duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-poppins text-sm font-bold text-white tracking-wide">{skill.name}</span>
                  </div>
                  
                  {/* Glowing percentage readout */}
                  <span className="font-mono text-xs text-neon-blue font-bold opacity-60 group-hover:opacity-100 transition-opacity">
                    {skill.level}%
                  </span>
                </div>

                {/* Bottom Section: Progress loading bar metrics */}
                <div className="space-y-2 mt-auto">
                  <div className="flex justify-between text-[8px] font-mono text-white/40 uppercase">
                    <span>Mastery Level</span>
                    <span>Ready</span>
                  </div>
                  
                  {/* Core track container */}
                  <div className="h-1.5 w-full bg-white/[0.03] border border-white/5 rounded-full overflow-hidden p-[1px]">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + idx * 0.05, duration: 1.2, ease: 'easeOut' }}
                      className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                      style={{
                        boxShadow: `0 0 10px ${skill.shadow}`
                      }}
                    />
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>

    </section>
  );
}
