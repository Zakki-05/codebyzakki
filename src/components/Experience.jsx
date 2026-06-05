import React from 'react';
import { motion } from 'framer-motion';
import { School, GraduationCap, Code, Rocket, Blocks, Award, Network, Search, Sparkles } from 'lucide-react';
import { useSound } from './SoundManager';

const TIMELINE = [
  {
    title: 'Completed Class XII',
    date: 'June 2023',
    desc: 'Graduated from Islamiah Higher Secondary School, Pernambut, under the Tamil Nadu State Board.',
    icon: School,
    color: 'border-neon-blue bg-neon-blue/10 text-neon-blue',
    shadow: 'rgba(0, 240, 255, 0.2)'
  },
  {
    title: 'Began BCA Degree',
    date: 'August 2023',
    desc: 'Joined Islamiah College (Autonomous), Vaniyambadi, to pursue a Bachelor of Computer Applications.',
    icon: GraduationCap,
    color: 'border-neon-purple bg-neon-purple/10 text-neon-purple',
    shadow: 'rgba(139, 92, 246, 0.2)'
  },
  {
    title: 'Flask Micro-Framework',
    date: 'September 2024',
    desc: 'Completed a technical workshop on Python-based web development using Flask at Sacred Heart College.',
    icon: Code,
    color: 'border-neon-pink bg-neon-pink/10 text-neon-pink',
    shadow: 'rgba(236, 72, 153, 0.2)'
  },
  {
    title: 'Frontend Developer Intern',
    date: 'July 2025',
    desc: 'Applied HTML5, CSS3, and JavaScript principles at AspiraSys to build functional web components and interactive layouts.',
    icon: Rocket,
    color: 'border-emerald-400 bg-emerald-400/10 text-emerald-400',
    shadow: 'rgba(16, 185, 129, 0.2)'
  },
  {
    title: 'Industrial Training',
    date: 'Sep 2025 - Oct 2025',
    desc: 'Completed a 6-week intensive Web Development, AI Tools & Deployment Platforms training program in Chennai.',
    icon: Blocks,
    color: 'border-neon-blue bg-neon-blue/10 text-neon-blue',
    shadow: 'rgba(0, 240, 255, 0.2)'
  },
  {
    title: 'First Place Winner',
    date: 'December 2025',
    desc: 'Secured 1st Place in the Pirates Pursuits event at the TECH-FRENZY 2K25 National Level Technical Symposium.',
    icon: Sparkles,
    color: 'border-neon-purple bg-neon-purple/10 text-neon-purple',
    shadow: 'rgba(139, 92, 246, 0.2)'
  },
  {
    title: 'Third Prize Winner',
    date: 'December 2025',
    desc: 'Won 3rd Prize in the ADZ - AP event hosted at the Sacred Heart College IT Symposium.',
    icon: Award,
    color: 'border-neon-pink bg-neon-pink/10 text-neon-pink',
    shadow: 'rgba(236, 72, 153, 0.2)'
  },
  {
    title: 'Frontend Developer Projects',
    date: 'Present Day',
    desc: 'Built 5+ responsive web applications, developed React-based user interfaces, integrated REST APIs, and managed deployments using Netlify and Render.',
    icon: Search,
    color: 'border-emerald-400 bg-emerald-400/10 text-emerald-400 animate-pulse',
    shadow: 'rgba(16, 185, 129, 0.3)'
  }
];

export default function Experience() {
  const { playHover, playClick } = useSound();

  return (
    <section id="journey" className="relative py-28 px-6 overflow-hidden">
      
      {/* Background drifting glow */}
      <div className="absolute top-[50%] right-[-10%] w-[400px] h-[400px] bg-neon-blue/5 rounded-full blur-[150px] pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Title Header */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-blue/20 bg-neon-blue/5 text-neon-blue text-xs font-mono tracking-widest uppercase mb-4 animate-pulse-slow">
            <Sparkles className="w-3.5 h-3.5" />
            CHRONOLOGICAL_LOG
          </div>
          <h2 className="text-4xl md:text-6xl font-black font-poppins tracking-tight text-white mb-4 uppercase">
            MY JOURNEY
          </h2>
          <p className="text-text-gray max-w-xl mx-auto text-sm md:text-base font-light font-sans">
            A linear progression detailing the milestones, technologies, academic foundations, and projects engineered throughout my developer career.
          </p>
        </div>

        {/* Timeline Core Track & nodes */}
        <div className="relative">
          
          {/* Vertical Glowing Line Track */}
          <div className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-neon-blue via-neon-purple to-neon-pink opacity-45 shadow-[0_0_10px_rgba(0,240,255,0.3)] pointer-events-none" />

          {/* Timeline Nodes */}
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
                  
                  {/* 1. Timeline Center Pulse Dot badge */}
                  <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 top-1.5 z-20 flex items-center justify-center pointer-events-none">
                    <div className="w-10 h-10 rounded-full bg-black border-2 border-solid flex items-center justify-center shadow-lg relative" style={{ borderColor: item.color.split(' ')[0].replace('border-', '') }}>
                      <Icon className="w-4 h-4 text-white animate-pulse" />
                    </div>
                  </div>

                  {/* 2. Content card block */}
                  <div className={`w-full md:w-5/12 pl-12 md:pl-0 ${isEven ? 'md:pl-8 text-left' : 'md:pr-8 md:text-right'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 50 : -50, y: 20 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ type: 'spring', stiffness: 200, damping: 22 }}
                      onMouseEnter={playHover}
                      onClick={playClick}
                      className="p-6 rounded-[24px] glass-card border-white/5 hover:border-white/10 hover:scale-[1.01] cursor-pointer relative"
                    >
                      {/* Interactive glowing highlight */}
                      <div className="absolute inset-0 rounded-[24px] border border-neon-blue/0 hover:border-neon-blue/15 transition-colors" />

                      {/* Header metadata details */}
                      <span className="text-[10px] font-mono text-neon-blue font-bold tracking-widest uppercase block mb-1">
                        {item.date}
                      </span>
                      <h3 className="text-lg font-bold font-poppins text-white tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs text-text-gray leading-relaxed font-sans font-light mt-2">
                        {item.desc}
                      </p>
                    </motion.div>
                  </div>

                  {/* Empty spacer side for alignment grid */}
                  <div className="hidden md:block w-5/12" />

                </div>
              );
            })}
          </div>

        </div>

      </div>

    </section>
  );
}
