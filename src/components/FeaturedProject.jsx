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
    <section id="featured-project" className="relative py-28 px-6 overflow-hidden bg-[#030303]">
      
      {/* Cinematic drift light glow in center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-neon-blue/[0.02] rounded-full blur-[140px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        
        {/* Flagship Header */}
        <div className="text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neon-blue/20 bg-neon-blue/[0.02] text-neon-blue text-[10px] font-mono tracking-widest uppercase mb-4 animate-pulse-slow">
            <Sparkles className="w-3.5 h-3.5" />
            FLAGSHIP_SHOWCASE // FULLSTACK
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold font-poppins tracking-tight text-white uppercase leading-none">
            Featured Masterpiece
          </h2>
        </div>

        {/* Core Showcase Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Side: Technical Info & Details */}
          <div className="lg:col-span-6 space-y-8 text-left">
            
            <div className="space-y-4">
              <span className="text-[10px] font-mono text-neon-purple font-bold uppercase tracking-widest block">// COMMUNITY HUB INFRASTRUCTURE</span>
              <h3 className="text-2xl md:text-3xl font-extrabold font-poppins text-white uppercase tracking-tight">
                Pernambut Connection
              </h3>
              
              <p className="text-text-gray/90 font-light leading-relaxed font-sans text-xs md:text-sm">
                A highly secure community coordination engine built with React and Django. This portal bridges regional announcements, golden-credential verification loops, citizen support networks, and dynamic municipal schedules on a fully custom, lightning-fast UI directory.
              </p>
            </div>

            {/* Technical list grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
              {FEATURES.map((feat) => (
                <div key={feat.name} className="space-y-1">
                  <div className="flex items-center gap-2 text-white">
                    <div className="w-3.5 h-3.5 rounded-full bg-white/[0.02] border border-white/10 flex items-center justify-center text-neon-blue flex-shrink-0">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span className="text-[11px] font-bold font-poppins tracking-wide">{feat.name}</span>
                  </div>
                  <p className="text-[10px] text-text-gray/70 pl-5.5 leading-normal font-sans font-light">{feat.desc}</p>
                </div>
              ))}
            </div>

            {/* Technical stack badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              {['React.js', 'Tailwind CSS', 'Django REST', 'SQLite', 'JSON Web Tokens', 'CI/CD Pipelines'].map(tag => (
                <span key={tag} className="text-[9px] font-mono bg-white/[0.01] border border-white/5 px-2.5 py-1 rounded-full text-white/80">
                  {tag}
                </span>
              ))}
            </div>

            {/* Call to buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="https://pernambut-connection.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                onMouseEnter={playHover}
                className="px-5 py-2.5 rounded-full bg-white text-black hover:bg-neon-blue hover:text-black font-mono text-[10px] font-bold tracking-widest transition-all duration-300 flex items-center gap-1.5 hover:scale-105"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                LIVE APPLICATION
              </a>
              
              <a
                href="https://github.com/Zakki-05/pernambut-connect-ui"
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                onMouseEnter={playHover}
                className="px-5 py-2.5 rounded-full border border-white/5 bg-white/[0.01] hover:border-white/10 text-white font-mono text-[10px] font-bold tracking-widest transition-all duration-300 flex items-center gap-1.5 hover:bg-white/[0.03] hover:scale-105"
              >
                <Github className="w-3.5 h-3.5" />
                CLIENT CODE
              </a>

              <a
                href="https://github.com/Zakki-05/pernambut-connect-server"
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                onMouseEnter={playHover}
                className="px-5 py-2.5 rounded-full border border-neon-purple/20 bg-neon-purple/[0.01] text-neon-purple font-mono text-[10px] font-bold tracking-widest transition-all duration-300 flex items-center gap-1.5 hover:bg-neon-purple hover:text-white hover:scale-105"
              >
                <Server className="w-3.5 h-3.5" />
                BACKEND REPO
              </a>
            </div>

          </div>

          {/* Right Side: Floating Interactive IDE Mockup */}
          <div className="lg:col-span-6 flex items-center justify-center relative">
            
            {/* Pulsing ring backdrop */}
            <div className="absolute w-[320px] h-[320px] rounded-full border border-dashed border-neon-blue/5 animate-spin-slow pointer-events-none" />

            {/* Interactive Browser Frame container */}
            <div
              ref={showcaseRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="w-full max-w-lg h-[330px] rounded-[24px] glass-card border-white/[0.03] overflow-hidden flex flex-col relative select-none cursor-grab active:cursor-grabbing"
              style={{
                transition: 'transform 0.15s ease-out',
                transformStyle: 'preserve-3d'
              }}
            >
              
              {/* Browser bar */}
              <div className="h-9 bg-black/40 border-b border-white/5 flex items-center justify-between px-4" style={{ transform: 'translateZ(20px)' }}>
                <div className="flex gap-1.5 items-center">
                  <div className="w-2 h-2 rounded-full bg-white/10" />
                  <div className="w-2 h-2 rounded-full bg-white/10" />
                  <div className="w-2 h-2 rounded-full bg-white/10" />
                </div>
                <span className="text-[8px] font-mono text-white/30 tracking-widest">pernambut-connection.netlify.app</span>
                <span className="w-4" />
              </div>

              {/* Inside Interactive Graphics Viewport */}
              <div className="flex-1 bg-[#050508] p-5 flex flex-col justify-between relative overflow-hidden">
                
                {/* Tech vector coordinate grids */}
                <div className="absolute inset-0 tech-grid opacity-10 pointer-events-none" />

                {/* Floating data status chip left */}
                <div 
                  className="absolute left-5 top-6 p-2.5 rounded-xl bg-[#09090c]/90 border border-white/5 font-mono text-[8px] text-text-gray space-y-1 z-10 shadow-lg"
                  style={{ transform: 'translateZ(40px)' }}
                >
                  <div className="flex items-center gap-1 text-emerald-500 font-bold uppercase text-[7.5px]">
                    <ShieldCheck className="w-3 h-3" />
                    Auth Verified
                  </div>
                  <span className="text-white block font-bold font-sans">Token // JWT_SECURE_256</span>
                </div>

                {/* Floating server status chip right */}
                <div 
                  className="absolute right-5 top-14 p-2.5 rounded-xl bg-[#09090c]/90 border border-white/5 font-mono text-[8px] text-text-gray space-y-1 z-10 shadow-lg"
                  style={{ transform: 'translateZ(50px)' }}
                >
                  <div className="flex items-center gap-1 text-neon-blue font-bold uppercase text-[7.5px]">
                    <Database className="w-3 h-3" />
                    Django API
                  </div>
                  <span className="text-white block font-bold font-sans">Latency // 12ms</span>
                </div>

                {/* Floating analytical bar charts inside mockup */}
                <div 
                  className="mt-auto p-3.5 bg-[#09090c]/80 rounded-xl border border-white/5 space-y-2 relative z-10"
                  style={{ transform: 'translateZ(30px)' }}
                >
                  <div className="flex justify-between items-center text-[7.5px] font-mono text-white/30 uppercase border-b border-white/5 pb-1">
                    <span>Database Node Loads</span>
                    <span className="text-neon-purple font-bold">ACTIVE</span>
                  </div>
                  
                  {/* Glowing charts bars network */}
                  <div className="flex items-end justify-between h-14 px-1 pt-1.5">
                    {[40, 75, 55, 90, 65, 80, 50, 95, 70, 85].map((h, i) => (
                      <div key={i} className="w-2 bg-white/5 rounded-t-sm h-full flex flex-col justify-end">
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
