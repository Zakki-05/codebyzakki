import React from 'react';
import { motion } from 'framer-motion';
import { Code, Sparkles, Database, GitBranch, Terminal, Globe, Server, Cpu } from 'lucide-react';
import { useSound } from './SoundManager';

const SKILL_CATEGORIES = [
  {
    title: 'Frontend Development',
    skills: [
      { name: 'React JS', icon: Terminal, level: 85, color: '#61dafb' },
      { name: 'JavaScript (ES6+)', icon: Sparkles, level: 80, color: '#f7df1e' },
      { name: 'HTML5 Platform', icon: Code, level: 90, color: '#e34f26' },
      { name: 'CSS3 Styling', icon: Cpu, level: 90, color: '#1572b6' },
      { name: 'Tailwind CSS', icon: Server, level: 90, color: '#06b6d4' },
      { name: 'Bootstrap Grids', icon: Database, level: 75, color: '#7952b3' }
    ]
  },
  {
    title: 'Backend Systems',
    skills: [
      { name: 'Django Framework', icon: Database, level: 60, color: '#092e20' },
      { name: 'REST APIs', icon: Globe, level: 75, color: '#8b5cf6' }
    ]
  },
  {
    title: 'Tools & Workflows',
    skills: [
      { name: 'Git Versioning', icon: GitBranch, level: 80, color: '#f05032' },
      { name: 'GitHub Ecosystem', icon: GitBranch, level: 85, color: '#181717' }
    ]
  },
  {
    title: 'Hosting & Deployment',
    skills: [
      { name: 'Netlify Hosting', icon: Globe, level: 80, color: '#00c8c8' },
      { name: 'Render Deploy', icon: Server, level: 70, color: '#4646ec' }
    ]
  }
];

export default function Skills() {
  const { playHover, playClick } = useSound();

  return (
    <section id="skills" className="relative py-28 px-6 overflow-hidden bg-transparent">
      {/* Background radial highlight */}
      <div className="absolute top-[30%] right-[-10%] w-[400px] h-[400px] ambient-glow opacity-20 pointer-events-none z-0"></div>

      <div className="max-w-6xl mx-auto relative z-10 space-y-16">
        
        {/* Title Details */}
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-mono tracking-[0.25em] text-theme-accent uppercase font-bold"
          >
            02 // SKILLSET
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-theme-text"
          >
            Core Technical Matrix
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xs sm:text-sm text-theme-textSec leading-relaxed"
          >
            My engineering stack for building fluid single-page interfaces and responsive deployment pipelines.
          </motion.p>
        </div>

        {/* Categorized Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SKILL_CATEGORIES.map((cat, catIdx) => (
            <div key={cat.title} className="space-y-6">
              
              {/* Category Label */}
              <h3 className="font-mono text-[10px] tracking-widest text-theme-textMuted uppercase pl-1 pb-2 border-b border-theme-border/60">
                // 0{catIdx + 1} : {cat.title}
              </h3>

              {/* Skills List */}
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
                      className="p-4 rounded-xl glass-card-premium flex flex-col justify-between group cursor-pointer relative overflow-hidden"
                    >
                      <div className="flex items-center gap-3 justify-between w-full">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-theme-bgSec border border-theme-border text-theme-textSec group-hover:bg-theme-accent group-hover:text-[#020617] group-hover:border-theme-accent transition-all duration-300">
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs font-bold text-theme-text group-hover:text-theme-accent transition-colors duration-300 font-sans">
                            {skill.name}
                          </span>
                        </div>
                        
                      </div>

                      {/* Micro visual progress scale */}
                      <div className="mt-3.5 h-[1.5px] w-full bg-theme-border/60 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-theme-accent to-theme-accentSec"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1, duration: 1, ease: 'easeOut' }}
                        />
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
