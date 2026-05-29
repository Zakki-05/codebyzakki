import React from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Sparkles, Wind, Database, Link, GitBranch, Smartphone, Layers, Terminal, Grid } from 'lucide-react';
import { useSound } from './SoundManager';

const SKILL_CATEGORIES = [
  {
    title: 'Core Architecture',
    skills: [
      { name: 'React JS', icon: Terminal, level: 90, color: 'from-[#61dafb] to-[#1fc8f8]', shadow: 'rgba(97,218,251,0.1)' },
      { name: 'JavaScript (ES6+)', icon: Sparkles, level: 92, color: 'from-[#f7df1e] to-[#f0db4f]', shadow: 'rgba(247,223,30,0.1)' },
      { name: 'HTML5 Platform', icon: Code, level: 95, color: 'from-[#e34f26] to-[#f06529]', shadow: 'rgba(240,101,41,0.1)' },
      { name: 'CSS3 Styling', icon: Palette, level: 90, color: 'from-[#1572b6] to-[#33a9dc]', shadow: 'rgba(21,114,182,0.1)' }
    ]
  },
  {
    title: 'Frameworks & Design',
    skills: [
      { name: 'Tailwind CSS', icon: Wind, level: 95, color: 'from-[#06b6d4] to-[#3b82f6]', shadow: 'rgba(6,182,212,0.1)' },
      { name: 'Bootstrap Grids', icon: Grid, level: 85, color: 'from-[#7952b3] to-[#9b66cc]', shadow: 'rgba(121,82,179,0.1)' },
      { name: 'UI/UX Visuals', icon: Layers, level: 88, color: 'from-[#00f0ff] to-[#8b5cf6]', shadow: 'rgba(0,240,255,0.1)' },
      { name: 'Responsive Design', icon: Smartphone, level: 95, color: 'from-[#10b981] to-[#059669]', shadow: 'rgba(16,185,129,0.1)' }
    ]
  },
  {
    title: 'Integrations & Backends',
    skills: [
      { name: 'Django Framework', icon: Database, level: 80, color: 'from-[#092e20] to-[#12583c]', shadow: 'rgba(9,46,32,0.1)' },
      { name: 'REST API Caching', icon: Link, level: 85, color: 'from-[#8b5cf6] to-[#ec4899]', shadow: 'rgba(139,92,246,0.1)' },
      { name: 'Git & Github CD', icon: GitBranch, level: 88, color: 'from-[#f05032] to-[#ff6b4a]', shadow: 'rgba(240,80,50,0.1)' }
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

                      {/* Left: Icon and Name */}
                      <div className="flex items-center gap-3 relative z-10">
                        <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5 text-text-gray group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="font-poppins text-xs font-semibold text-white tracking-wide">{skill.name}</span>
                      </div>

                      {/* Right: Progress level indicator */}
                      <div className="flex items-center gap-3 relative z-10 w-24 sm:w-28 flex-shrink-0">
                        <div 
                          className="h-1 w-full bg-white/[0.03] border border-white/5 rounded-full overflow-hidden p-[0.5px]"
                          role="progressbar" 
                          aria-valuenow={skill.level} 
                          aria-valuemin="0" 
                          aria-valuemax="100"
                          aria-label={`Proficiency in ${skill.name}`}
                        >
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1, duration: 1, ease: 'easeOut' }}
                            className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                          />
                        </div>
                        <span className="font-mono text-[9px] text-neon-blue font-bold tracking-widest w-6 text-right">
                          {skill.level}%
                        </span>
                      </div>

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
