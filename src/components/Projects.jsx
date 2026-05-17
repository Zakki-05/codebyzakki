import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Terminal, ShoppingBag, GraduationCap, Megaphone, BookOpen, Sparkles } from 'lucide-react';
import { useSound } from './SoundManager';

const PROJECTS = [
  {
    title: 'Pernambut Hub',
    subtitle: 'Local Portal & Directory',
    desc: 'A complete regional hub mapping commercial sectors, local directories, public announcements, and timings. Optimized for maximum mobile performance.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Google Maps API'],
    icon: Terminal,
    live: 'https://pernambut-hub.onrender.com/',
    github: 'https://github.com/Zakki-05',
    color: 'from-[#00f0ff] to-[#8b5cf6]',
    shadow: 'rgba(0, 240, 255, 0.15)'
  },
  {
    title: 'Tech Zone Ecommerce',
    subtitle: 'High-End Electronic Storefront',
    desc: 'An immersive consumer electronic marketplace complete with high-speed filters, fluid shopping cart states, Stripe APIs, and persistent secure client checkout routing.',
    tech: ['React JS', 'Redux Toolkit', 'Tailwind CSS', 'Stripe'],
    icon: ShoppingBag,
    live: 'https://tech-zone-zakki-05.netlify.app/',
    github: 'https://github.com/Zakki-05',
    color: 'from-[#8b5cf6] to-[#ec4899]',
    shadow: 'rgba(139, 92, 246, 0.15)'
  },
  {
    title: 'Al Huda Islamic School',
    subtitle: 'Institution Portal & Manager',
    desc: 'A premium academic administration platform managing online student admission structures, responsive image assets, and dynamic event notice channels.',
    tech: ['React JS', 'Framer Motion', 'Tailwind CSS'],
    icon: GraduationCap,
    live: 'https://al-huda-islamic-school.netlify.app/',
    github: 'https://github.com/Zakki-05',
    color: 'from-[#ec4899] to-[#00f0ff]',
    shadow: 'rgba(236, 72, 153, 0.15)'
  },
  {
    title: 'Digital Marketing Website',
    subtitle: 'High-Conversion Agency Site',
    desc: 'A high-converting promotional platform optimized for client acquisitions, media loads, fluid scrolling triggers, and elegant responsive layouts.',
    tech: ['HTML5', 'Tailwind CSS', 'Vanilla JavaScript'],
    icon: Megaphone,
    live: 'https://digital-marketing-zakki.netlify.app/',
    github: 'https://github.com/Zakki-05',
    color: 'from-[#f59e0b] to-[#ec4899]',
    shadow: 'rgba(245, 158, 11, 0.15)'
  },
  {
    title: 'Library Management System',
    subtitle: 'Database Transaction Hub',
    desc: 'A secure relational management backend streamlining book borrowing workflows, QR code transactions, and clean inventory dashboards.',
    tech: ['Python Django', 'SQLite', 'Bootstrap', 'QR API'],
    icon: BookOpen,
    live: 'https://github.com/Zakki-05/library-management-zakki-05',
    github: 'https://github.com/Zakki-05/library-management-zakki-05',
    color: 'from-[#10b981] to-[#00f0ff]',
    shadow: 'rgba(16, 185, 129, 0.15)'
  }
];

export default function Projects() {
  const { playHover, playClick } = useSound();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Card Tilt Handler utilizing mouse coordinates
  const handleMouseMove = (e, index) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    const factorX = x / (box.width / 2);
    const factorY = y / (box.height / 2);

    card.style.transform = `perspective(800px) rotateX(${-factorY * 10}deg) rotateY(${factorX * 10}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.boxShadow = `0 15px 35px -5px ${PROJECTS[index].shadow}`;
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    card.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.37)';
    setHoveredIndex(null);
  };

  return (
    <section id="projects" className="relative py-28 px-6 overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-[40%] left-[-10%] w-[450px] h-[450px] rounded-full bg-neon-purple/5 blur-[150px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-20">
        
        {/* Title Block */}
        <div className="text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-purple/20 bg-neon-purple/5 text-neon-purple text-xs font-mono tracking-widest uppercase mb-4 animate-pulse-slow">
            <Sparkles className="w-3.5 h-3.5" />
            PRODUCT_DIRECTORY
          </div>
          <h2 className="text-4xl md:text-6xl font-black font-poppins tracking-tight text-white uppercase leading-none">
            ADDITIONAL PROJECTS
          </h2>
          <p className="text-text-gray max-w-xl text-sm md:text-base font-light font-sans mt-4">
            A comprehensive showcase of creative portals, landing layouts, and database systems displaying versatile frontend capability.
          </p>
        </div>

        {/* Projects Cards Grid wrapper */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((proj, idx) => {
            const Icon = proj.icon;
            
            return (
              <div
                key={proj.title}
                onMouseMove={(e) => handleMouseMove(e, idx)}
                onMouseLeave={handleMouseLeave}
                onMouseEnter={() => { playHover(); setHoveredIndex(idx); }}
                onClick={playClick}
                className="rounded-[28px] glass-card p-6 border-white/5 flex flex-col justify-between h-[450px] relative select-none cursor-grab active:cursor-grabbing hover:border-white/10"
                style={{
                  transition: 'transform 0.15s ease-out, box-shadow 0.15s ease-out',
                  transformStyle: 'preserve-3d'
                }}
              >
                
                {/* 1. Card Image Mockup Viewport */}
                <div 
                  className={`h-[180px] rounded-2xl bg-gradient-to-br ${proj.color} p-4 flex flex-col justify-between overflow-hidden relative group/mock`}
                  style={{ transform: 'translateZ(20px)' }}
                >
                  {/* Grid Lines inside Mockup */}
                  <div className="absolute inset-0 tech-grid opacity-15 pointer-events-none" />

                  {/* Top Bar details */}
                  <div className="flex justify-between items-center relative z-10">
                    <span className="text-[8px] font-mono bg-black/50 px-2 py-0.5 rounded text-white tracking-widest uppercase">
                      BUILD.LOG
                    </span>
                    <Icon className="w-4 h-4 text-white animate-pulse" />
                  </div>

                  {/* Core Icon illustration */}
                  <div className="flex-1 flex items-center justify-center relative z-10 group-hover/mock:scale-110 transition-transform duration-500">
                    <div className="w-12 h-12 rounded-xl bg-black/60 border border-white/15 flex items-center justify-center shadow-lg">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Bottom details block */}
                  <div className="relative z-10 flex justify-between items-center text-[9px] font-mono text-white/80">
                    <span>STATUS: COMPILED</span>
                    <span>READY</span>
                  </div>

                  {/* Subtle vector lines design */}
                  <div className="absolute -right-4 -bottom-4 w-24 h-24 border border-white/10 rounded-full scale-110 pointer-events-none" />
                </div>

                {/* 2. Text Details */}
                <div className="flex-1 flex flex-col justify-between pt-6 space-y-4" style={{ transform: 'translateZ(30px)' }}>
                  
                  {/* Metadata and Title */}
                  <div className="space-y-1 text-left">
                    <span className="text-[10px] font-mono text-neon-blue uppercase tracking-widest font-bold">
                      {proj.subtitle}
                    </span>
                    <h3 className="text-xl font-bold font-poppins text-white tracking-tight leading-tight">
                      {proj.title}
                    </h3>
                    <p className="text-[11px] text-text-gray leading-relaxed font-sans font-light line-clamp-3">
                      {proj.desc}
                    </p>
                  </div>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tech.map(t => (
                      <span key={t} className="text-[9px] font-mono bg-white/5 border border-white/10 px-2 py-0.5 rounded text-white">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action buttons footer */}
                  <div className="flex justify-between items-center pt-4 border-t border-white/5">
                    
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => { playClick(); e.stopPropagation(); }}
                      onMouseEnter={playHover}
                      className="text-[10px] font-mono text-text-gray hover:text-white flex items-center gap-1.5 transition-colors uppercase tracking-wider"
                    >
                      <Github className="w-3.5 h-3.5" />
                      Repository
                    </a>

                    <a
                      href={proj.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => { playClick(); e.stopPropagation(); }}
                      onMouseEnter={playHover}
                      className="text-[10px] font-mono text-neon-blue font-bold flex items-center gap-1 hover:text-neon-purple transition-colors uppercase tracking-wider"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Live Link
                    </a>

                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
}
