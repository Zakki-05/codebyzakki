import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Sparkles, Check, Database, Server, Cpu, ShieldCheck } from 'lucide-react';
import { useSound } from './SoundManager';

const FEATURES = [
  { name: 'Full Stack Architecture', desc: 'Secure React client integrated with Python Django REST endpoints.' },
  { name: 'Authentication System', desc: 'Token-based authentication middleware with session persistence.' },
  { name: 'Live API Integration', desc: 'High-speed data queries with custom caching layer.' },
  { name: 'Responsive Dashboard', desc: 'Fluid layout adjustments accommodating mobile, tablet, and desktops.' },
  { name: 'Modern UI/UX Designs', desc: 'Glassmorphic card networks with curated animated feedbacks.' },
  { name: 'Optimized Animations', desc: 'Sub-60fps fluid transitions utilizing GPU hardware accelerations.' }
];

export default function FeaturedProject() {
  const { playHover, playClick } = useSound();
  const showcaseRef = useRef(null);

  // High performance custom 3D card tilt handler
  const handleMouseMove = (e) => {
    if (!showcaseRef.current) return;
    const card = showcaseRef.current;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    const factorX = x / (box.width / 2);
    const factorY = y / (box.height / 2);

    card.style.transform = `perspective(1000px) rotateX(${-factorY * 10}deg) rotateY(${factorX * 10}deg) scale3d(1.01, 1.01, 1.01)`;
  };

  const handleMouseLeave = () => {
    if (!showcaseRef.current) return;
    showcaseRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <section id="featured-project" className="relative py-28 px-6 overflow-hidden">
      
      {/* Cinematic drift light glow in center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-blue/5 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        
        {/* Flagship Header */}
        <div className="text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-blue/20 bg-neon-blue/5 text-neon-blue text-xs font-mono tracking-widest uppercase mb-4 animate-pulse-slow">
            <Sparkles className="w-3.5 h-3.5" />
            FLAGSHIP_SHOWCASE
          </div>
          <h2 className="text-4xl md:text-6xl font-black font-poppins tracking-tight text-white uppercase leading-none">
            Featured Masterpiece
          </h2>
        </div>

        {/* Core Showcase Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Side: Technical Info & Details (lg:col-span-6) */}
          <div className="lg:col-span-6 space-y-8 text-left">
            
            <div className="space-y-4">
              <span className="text-xs font-mono text-neon-purple font-bold uppercase tracking-widest block">FULL-STACK WEB PLATFORM</span>
              <h3 className="text-3xl md:text-4xl font-extrabold font-poppins text-white uppercase tracking-tight">
                Pernambut Connection
              </h3>
              
              <p className="text-text-gray font-light leading-relaxed font-sans text-sm md:text-base">
                A modern full-stack community connection platform built using React JS, Tailwind CSS, and Django. It integrates fully responsive user dashboards, authentication structures, custom backend REST queries, and real-time community notification boards.
              </p>
            </div>

            {/* Technical list grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {FEATURES.map((feat) => (
                <div key={feat.name} className="space-y-1">
                  <div className="flex items-center gap-2 text-white">
                    <div className="w-4 h-4 rounded-full bg-neon-blue/10 border border-neon-blue/30 flex items-center justify-center text-neon-blue flex-shrink-0">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span className="text-xs font-bold font-poppins tracking-wide">{feat.name}</span>
                  </div>
                  <p className="text-[11px] text-text-gray pl-6 leading-normal font-sans font-light">{feat.desc}</p>
                </div>
              ))}
            </div>

            {/* Technical stack badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              {['React JS', 'Tailwind CSS', 'Django REST', 'SQL Database', 'REST APIs', 'JWT Security'].map(tag => (
                <span key={tag} className="text-[10px] font-mono bg-white/5 border border-white/10 px-3 py-1 rounded-full text-white">
                  {tag}
                </span>
              ))}
            </div>

            {/* Call to buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="https://pernambut-connection.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                onMouseEnter={playHover}
                className="px-6 py-3.5 rounded-xl bg-neon-blue text-black hover:bg-neon-purple hover:text-white font-mono text-xs font-black tracking-widest transition-all duration-300 flex items-center gap-2 glowing-ring hover:scale-105"
              >
                <ExternalLink className="w-4 h-4" />
                LIVE PLATFORM
              </a>
              
              <a
                href="https://github.com/Zakki-05/pernambut-connect-ui"
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                onMouseEnter={playHover}
                className="px-6 py-3.5 rounded-xl border border-white/10 bg-white/[0.02] hover:border-white/30 text-white font-mono text-xs font-bold tracking-widest transition-all duration-300 flex items-center gap-2 hover:bg-white/5 hover:scale-105"
              >
                <Github className="w-4 h-4" />
                FRONTEND REPO
              </a>

              <a
                href="https://github.com/Zakki-05/pernambut-connect-server"
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                onMouseEnter={playHover}
                className="px-6 py-3.5 rounded-xl border border-neon-purple/20 bg-neon-purple/5 text-neon-purple font-mono text-xs font-bold tracking-widest transition-all duration-300 flex items-center gap-2 hover:bg-neon-purple hover:text-white hover:scale-105"
              >
                <Server className="w-4 h-4" />
                BACKEND API REPO
              </a>
            </div>

          </div>

          {/* Right Side: Floating Interactive IDE Mockup (lg:col-span-6) */}
          <div className="lg:col-span-6 flex items-center justify-center relative">
            
            {/* Pulsing ring backdrop */}
            <div className="absolute w-[360px] h-[360px] rounded-full border border-dashed border-neon-blue/15 animate-spin-slow pointer-events-none" />

            {/* Interactive Browser Frame container */}
            <div
              ref={showcaseRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="w-full max-w-lg h-[340px] rounded-3xl glass-card border-white/5 overflow-hidden flex flex-col relative select-none cursor-grab active:cursor-grabbing"
              style={{
                transition: 'transform 0.15s ease-out',
                transformStyle: 'preserve-3d'
              }}
            >
              
              {/* Browser bar */}
              <div className="h-10 bg-black/60 border-b border-white/5 flex items-center justify-between px-4" style={{ transform: 'translateZ(20px)' }}>
                <div className="flex gap-1.5 items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
                <span className="text-[9px] font-mono text-white/40 tracking-wider">pernambut-connection.netlify.app</span>
                <span className="w-4" />
              </div>

              {/* Inside Interactive Graphics Viewport */}
              <div className="flex-1 bg-[#0b0b0b] p-6 flex flex-col justify-between relative overflow-hidden">
                
                {/* Tech vector coordinate grids */}
                <div className="absolute inset-0 tech-grid opacity-10 pointer-events-none" />

                {/* Floating data status chip left */}
                <div 
                  className="absolute left-6 top-8 p-3 rounded-xl bg-[#0e0e0e]/90 border border-white/5 font-mono text-[9px] text-text-gray space-y-1 z-10 shadow-lg"
                  style={{ transform: 'translateZ(40px)' }}
                >
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold uppercase text-[8px]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Auth Verified
                  </div>
                  <span className="text-white block">Token: JWT_256k</span>
                </div>

                {/* Floating server status chip right */}
                <div 
                  className="absolute right-6 top-16 p-3 rounded-xl bg-[#0e0e0e]/90 border border-white/5 font-mono text-[9px] text-text-gray space-y-1 z-10 shadow-lg"
                  style={{ transform: 'translateZ(50px)' }}
                >
                  <div className="flex items-center gap-1.5 text-neon-blue font-bold uppercase text-[8px]">
                    <Database className="w-3.5 h-3.5" />
                    Django API
                  </div>
                  <span className="text-white block">Query Latency: 12ms</span>
                </div>

                {/* Floating analytical bar charts inside mockup */}
                <div 
                  className="mt-auto p-4 bg-black/60 rounded-2xl border border-white/5 space-y-3 relative z-10"
                  style={{ transform: 'translateZ(30px)' }}
                >
                  <div className="flex justify-between items-center text-[8px] font-mono text-white/50 uppercase border-b border-white/5 pb-1.5">
                    <span>Database Node Loads</span>
                    <span className="text-neon-purple">Active</span>
                  </div>
                  
                  {/* Glowing charts bars network */}
                  <div className="flex items-end justify-between h-16 px-2 pt-2">
                    {[40, 75, 55, 90, 65, 80, 50, 95, 70, 85].map((h, i) => (
                      <div key={i} className="w-2.5 bg-white/5 rounded-t-sm h-full flex flex-col justify-end">
                        <motion.div
                          initial={{ height: 0 }}
                          whileInView={{ height: `${h}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + i * 0.05, duration: 0.8, ease: 'easeOut' }}
                          className="w-full bg-gradient-to-t from-neon-purple to-neon-blue rounded-t-sm"
                        />
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
