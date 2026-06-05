import React from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Sparkles, Wind, Database, Link, GitBranch, Smartphone, Layers, Terminal, Grid } from 'lucide-react';
import { useSound } from './SoundManager';

const SKILL_CATEGORIES = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React JS', icon: Terminal, levelText: 'Intermediate', color: 'from-[#61dafb] to-[#1fc8f8]', shadow: 'rgba(97,218,251,0.1)' },
      { name: 'JavaScript (ES6+)', icon: Sparkles, levelText: 'Intermediate', color: 'from-[#f7df1e] to-[#f0db4f]', shadow: 'rgba(247,223,30,0.1)' },
      { name: 'HTML5 Platform', icon: Code, levelText: 'Advanced', color: 'from-[#e34f26] to-[#f06529]', shadow: 'rgba(240,101,41,0.1)' },
      { name: 'CSS3 Styling', icon: Palette, levelText: 'Advanced', color: 'from-[#1572b6] to-[#33a9dc]', shadow: 'rgba(21,114,182,0.1)' },
      { name: 'Tailwind CSS', icon: Wind, levelText: 'Advanced', color: 'from-[#06b6d4] to-[#3b82f6]', shadow: 'rgba(6,182,212,0.1)' },
      { name: 'Responsive Design', icon: Smartphone, levelText: 'Advanced', color: 'from-[#10b981] to-[#059669]', shadow: 'rgba(16,185,129,0.1)' },
      { name: 'UI/UX Visuals', icon: Layers, levelText: 'Intermediate', color: 'from-[#00f0ff] to-[#8b5cf6]', shadow: 'rgba(0,240,255,0.1)' }
    ]
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Django Framework', icon: Database, levelText: 'Beginner', color: 'from-[#092e20] to-[#12583c]', shadow: 'rgba(9,46,32,0.1)' },
      { name: 'REST API Caching', icon: Link, levelText: 'Intermediate', color: 'from-[#8b5cf6] to-[#ec4899]', shadow: 'rgba(139,92,246,0.1)' }
    ]
  },
  {
    title: 'Tools',
    skills: [
      { name: 'Git & Github CD', icon: GitBranch, levelText: 'Intermediate', color: 'from-[#f05032] to-[#ff6b4a]', shadow: 'rgba(240,80,50,0.1)' },
      { name: 'Bootstrap Grids', icon: Grid, levelText: 'Intermediate', color: 'from-[#7952b3] to-[#9b66cc]', shadow: 'rgba(121,82,179,0.1)' }
    ]
  }
];

export default function Skills() {
  const { playHover, playClick } = useSound();

  return (
    <section id="skills" className="relative py-28 px-6 overflow-hidden tech-grid bg-[#030303]">
      
      {/* Background drift lighting blobs */}
      <div className="absolute top-[30%] right-[-10%] w-[350px] h-[350px] rounded-full bg-neon-blue/[0.02] blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[30%] left-[-10%] w-[350px] h-[350px] rounded-full bg-neon-purple/[0.02] blur-[120px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Title details */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neon-blue/20 bg-neon-blue/[0.02] text-neon-blue text-[10px] font-mono tracking-widest uppercase mb-4 animate-pulse-slow">
            <Terminal className="w-3 h-3" />
            ENGINE_COMPILER // STACK
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold font-poppins tracking-tight text-white mb-4 uppercase">
            SKILL MATRICES
          </h2>
          <p className="text-text-gray max-w-xl mx-auto text-xs md:text-sm font-light font-sans leading-relaxed">
            A structured mapping of technologies, structural frameworks, and creative user spaces representing my production engineering stack.
          </p>
        </div>

        {/* Categorized Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SKILL_CATEGORIES.map((cat, catIdx) => (
            <div key={cat.title} className="space-y-6">
              
              {/* Category Header Label */}
              <h3 className="font-mono text-[10px] tracking-widest text-text-gray/50 uppercase text-left pl-1 pb-2 border-b border-white/[0.03]">
                // 0{catIdx + 1} : {cat.title}
              </h3>

              {/* Skills list cards */}
              <div className="space-y-4">
                {cat.skills.map((skill, skillIdx) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: skillIdx * 0.05 + catIdx * 0.1, type: 'spring', stiffness: 200, damping: 20 }}
                      onClick={playClick}
                      onMouseEnter={playHover}
                      className="p-4 rounded-xl glass-card border-white/5 flex items-center justify-between group cursor-pointer relative overflow-hidden"
                    >
                      {/* Subtle hover background accent */}
                      <div className="absolute inset-0 bg-white/[0.005] group-hover:bg-white/[0.015] transition-all duration-300 pointer-events-none" />

                      {/* Icon and Name */}
                      <div className="flex items-center gap-3 relative z-10">
                        <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5 text-text-gray group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="font-poppins text-xs font-semibold text-white tracking-wide">{skill.name}</span>
                      </div>

                      {/* Level Badge */}
                      <span className="font-mono text-[9px] text-neon-blue font-bold tracking-widest px-2 py-0.5 rounded border border-neon-blue/20 bg-neon-blue/5 relative z-10 uppercase">
                        {skill.levelText}
                      </span>
                    </motion.div>
                  );
                })}
              </div>

            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
