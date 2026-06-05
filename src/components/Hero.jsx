import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, Instagram, ChevronDown, Terminal, Cpu, ShieldAlert, Zap, Download, Database } from 'lucide-react';
import { useSound } from './SoundManager';

// Profile image path — uses Vite's base URL resolution
const PROFILE_IMG = new URL('/my-pic.jpg', import.meta.url).href;

const ROLES = [
  'Frontend Developer',
  'Creative Coder',
  'UI/UX Designer',
  'React Developer'
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);
  
  const { playHover, playClick } = useSound();
  const cardRef = useRef(null);

  // 1. Dynamic typing simulator
  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    let timer;

    if (isDeleting) {
      // Deleting characters
      timer = setTimeout(() => {
        setDisplayedRole(currentRole.substring(0, displayedRole.length - 1));
        setTypingSpeed(40);
      }, typingSpeed);
    } else {
      // Typing characters
      timer = setTimeout(() => {
        setDisplayedRole(currentRole.substring(0, displayedRole.length + 1));
        setTypingSpeed(100);
      }, typingSpeed);
    }

    if (!isDeleting && displayedRole === currentRole) {
      // Pause at full text
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 1500);
    } else if (isDeleting && displayedRole === '') {
      // Move to next word
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }

    return () => clearTimeout(timer);
  }, [displayedRole, isDeleting, roleIndex, typingSpeed]);

  // 2. High-performance custom 3D card tilt handler
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    
    // Normalize coordinates (-0.5 to 0.5)
    const factorX = x / (box.width / 2);
    const factorY = y / (box.height / 2);
    
    // Max rotation angles (degrees)
    const rotateY = factorX * 15;
    const rotateX = -factorY * 15;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.boxShadow = `${-factorX * 15}px ${-factorY * 15}px 30px rgba(0, 240, 255, 0.25), 0 10px 40px rgba(0,0,0,0.5)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    card.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.37)';
  };

  const handleScrollClick = (e, targetId) => {
    e.preventDefault();
    playClick();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden tech-grid">
      
      {/* Cinematic drift blur blobs */}
      <div className="absolute top-[15%] left-[-5%] w-[450px] h-[450px] rounded-full bg-neon-blue/[0.04] blur-[130px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[15%] right-[-5%] w-[450px] h-[450px] rounded-full bg-neon-purple/[0.03] blur-[130px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-10 relative z-10">
        
        {/* Left Core Text Intro Column */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-8 text-left">
          
          <div className="space-y-5">
            
            {/* Tiny introductory chip */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.04] bg-white/[0.02] text-[9px] font-mono tracking-[0.2em] text-text-gray/80 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-blue animate-pulse"></span>
              PORTFOLIO // ESTABLISH_SYSTEM_v1
            </div>

            {/* Giant Title Name */}
            <h1 className="text-5xl sm:text-7xl font-extrabold font-poppins tracking-tight text-white leading-[1.05]">
              Mohammad <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-neon-blue to-neon-purple drop-shadow-sm font-black">
                Zakki Adnaan
              </span>
            </h1>

            {/* Professional Tagline */}
            <div className="space-y-2 text-left">
              <h2 className="font-mono text-xs sm:text-sm text-neon-blue uppercase tracking-[0.2em] font-bold">
                Frontend Developer | React Developer
              </h2>
              <p className="font-poppins text-lg sm:text-2xl text-white font-extrabold tracking-wide uppercase leading-tight">
                Building Responsive and Modern Web Applications
              </p>
            </div>

            {/* Summary description paragraph */}
            <p className="text-text-gray/90 max-w-xl text-xs md:text-sm font-light leading-relaxed font-sans">
              I engineer next-generation responsive systems and robust client interfaces. Focused on crafting highly modular, pixel-perfect, and high-performance frontend visual wonderlands utilizing React, Tailwind CSS, Framer Motion, and Django REST APIs.
            </p>
          </div>

          {/* Action Call to Buttons */}
          <div className="flex flex-wrap gap-3.5">
            <a
              href="#projects"
              onClick={(e) => handleScrollClick(e, '#projects')}
              onMouseEnter={playHover}
              className="px-6 py-3 rounded-full bg-white text-black hover:bg-neon-blue hover:text-black font-mono text-[10px] font-bold tracking-widest transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
            >
              VIEW PROJECTS
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            
            <a
              href="#contact"
              onClick={(e) => handleScrollClick(e, '#contact')}
              onMouseEnter={playHover}
              className="px-6 py-3 rounded-full border border-white/5 bg-white/[0.01] hover:border-white/10 text-white font-mono text-[10px] font-bold tracking-widest transition-all duration-300 flex items-center justify-center gap-2 hover:bg-white/[0.03] hover:scale-105"
            >
              CONTACT ME
            </a>

            <a
              href="/New_MOHAMMED_ZAKKI_ADNAAN_P_2026-06-02.pdf"
              download="New_MOHAMMED_ZAKKI_ADNAAN_P_2026-06-02.pdf"
              onMouseEnter={playHover}
              onClick={playClick}
              className="px-6 py-3 rounded-full border border-neon-purple/20 bg-neon-purple/[0.03] text-neon-purple font-mono text-[10px] font-bold tracking-widest hover:bg-neon-purple hover:text-white transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
            >
              <Download className="w-3 h-3" />
              DOWNLOAD RESUME (PDF)
            </a>
          </div>

          {/* Connected Socials Strip */}
          <div className="pt-4 flex items-center gap-4.5">
            <span className="text-[9px] font-mono text-text-gray/50 uppercase tracking-widest">Connect // Logs:</span>
            <div className="flex gap-2.5">
              <a
                href="https://github.com/Zakki-05"
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                onMouseEnter={playHover}
                className="p-2.5 rounded-xl bg-white/[0.01] hover:bg-neon-blue hover:text-black border border-white/5 hover:border-neon-blue text-text-gray hover:scale-105 transition-all duration-300"
                title="Github profile"
                aria-label="Mohammed Zakki Adnaan's GitHub profile"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.linkedin.com/in/mohammed-zakki-adnan-p/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                onMouseEnter={playHover}
                className="p-2.5 rounded-xl bg-white/[0.01] hover:bg-neon-blue hover:text-black border border-white/5 hover:border-neon-blue text-text-gray hover:scale-105 transition-all duration-300"
                title="LinkedIn profile"
                aria-label="Mohammed Zakki Adnaan's LinkedIn profile"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href="mailto:zakkibca2023@gmail.com"
                onClick={playClick}
                onMouseEnter={playHover}
                className="p-2.5 rounded-xl bg-white/[0.01] hover:bg-neon-blue hover:text-black border border-white/5 hover:border-neon-blue text-text-gray hover:scale-105 transition-all duration-300"
                title="Email direct"
                aria-label="Send email to Mohammed Zakki Adnaan"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.instagram.com/mr_zakki_05/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                onMouseEnter={playHover}
                className="p-2.5 rounded-xl bg-white/[0.01] hover:bg-neon-blue hover:text-black border border-white/5 hover:border-neon-blue text-text-gray hover:scale-105 transition-all duration-300"
                title="Instagram profile"
                aria-label="Mohammed Zakki Adnaan's Instagram profile"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Right 3D Visualizer Dashboard Column */}
        <div className="lg:col-span-5 flex items-center justify-center relative">
          
          {/* Subtle decoration backdrops */}
          <div className="absolute w-[240px] h-[240px] rounded-full border border-dashed border-neon-blue/5 animate-spin-slow pointer-events-none"></div>
          <div className="absolute w-[320px] h-[320px] rounded-full border border-dashed border-neon-purple/5 animate-[spin_30s_linear_infinite] pointer-events-none"></div>

          {/* Floating Tech Badges */}
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className="absolute -top-6 -right-6 p-2.5 rounded-2xl glass-panel border-white/5 z-20 flex items-center gap-1.5 shadow-lg select-none pointer-events-none"
            style={{ transform: 'translateZ(60px)' }}
          >
            <Cpu className="w-3.5 h-3.5 text-[#61dafb]" />
            <span className="text-[8px] font-mono font-bold tracking-widest">REACT</span>
          </motion.div>

          <motion.div
            animate={{ y: [8, -8, 8] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
            className="absolute top-12 -left-10 p-2.5 rounded-2xl glass-panel border-white/5 z-20 flex items-center gap-1.5 shadow-lg select-none pointer-events-none"
            style={{ transform: 'translateZ(50px)' }}
          >
            <Terminal className="w-3.5 h-3.5 text-[#f7df1e]" />
            <span className="text-[8px] font-mono font-bold tracking-widest">JS</span>
          </motion.div>

          <motion.div
            animate={{ y: [-6, 6, -6] }}
            transition={{ repeat: Infinity, duration: 3.8, ease: 'easeInOut' }}
            className="absolute -bottom-6 -left-6 p-2.5 rounded-2xl glass-panel border-white/5 z-20 flex items-center gap-1.5 shadow-lg select-none pointer-events-none"
            style={{ transform: 'translateZ(40px)' }}
          >
            <Zap className="w-3.5 h-3.5 text-[#06b6d4]" />
            <span className="text-[8px] font-mono font-bold tracking-widest">TAILWIND</span>
          </motion.div>

          <motion.div
            animate={{ y: [6, -6, 6] }}
            transition={{ repeat: Infinity, duration: 4.2, ease: 'easeInOut' }}
            className="absolute bottom-12 -right-10 p-2.5 rounded-2xl glass-panel border-white/5 z-20 flex items-center gap-1.5 shadow-lg select-none pointer-events-none"
            style={{ transform: 'translateZ(55px)' }}
          >
            <Database className="w-3.5 h-3.5 text-[#092e20]" />
            <span className="text-[8px] font-mono font-bold tracking-widest">DJANGO</span>
          </motion.div>

          {/* Interactive Card container */}
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-[290px] h-[390px] rounded-[24px] glass-card p-5 border-white/[0.03] flex flex-col justify-between relative select-none cursor-grab active:cursor-grabbing"
            style={{ 
              transition: 'transform 0.15s ease-out, box-shadow 0.15s ease-out',
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Top dashboard status */}
            <div className="flex justify-between items-center" style={{ transform: 'translateZ(20px)' }}>
              <div className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-neon-blue" />
                <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">system_monitor.sh</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[8px] font-mono text-white/40 uppercase">LIVE</span>
              </div>
            </div>

            {/* Glowing developer schematic blueprint visual */}
            <div 
              className="flex-1 flex flex-col items-center justify-center relative py-4"
              style={{ transform: 'translateZ(40px)' }}
            >
              
              {/* Central high tech spinning core */}
              <div className="relative w-36 h-36 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-dashed border-neon-blue/10 animate-spin-slow"></div>
                <div className="absolute w-28 h-28 rounded-full border border-neon-purple/10 animate-[spin_5s_linear_infinite_reverse]"></div>
                
                {/* SVG profile picture avatar */}
                <div className="w-24 h-24 aspect-square rounded-full bg-[#050505] border border-white/5 flex items-center justify-center relative shadow-lg overflow-hidden glowing-ring shrink-0 flex-shrink-0">
                  <img 
                    src={PROFILE_IMG} 
                    alt="Mohammad Zakki Adnaan" 
                    className="w-full h-full object-cover rounded-full relative z-10" 
                    loading="eager"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <Zap className="w-6 h-6 text-neon-blue animate-pulse absolute z-0" />
                </div>
              </div>

              {/* Status information text */}
              <div className="text-center mt-4 space-y-0.5">
                <span className="text-[9px] font-mono text-neon-blue font-bold tracking-widest uppercase">PLATFORM OS: STABLE</span>
                <span className="text-[8px] font-mono text-text-gray/60 block">120 FPS // SYSTEM COMPILING...</span>
              </div>

            </div>

            {/* Bottom Dashboard details code preview mock */}
            <div 
              className="p-3 bg-black/40 rounded-xl border border-white/5 font-mono text-[9px] text-text-gray space-y-1.5 text-left"
              style={{ transform: 'translateZ(30px)' }}
            >
              <div className="flex gap-1.5 items-center pb-1.5 border-b border-white/5">
                <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                <span className="text-[7.5px] text-white/30 ml-1">react_kernel.json</span>
              </div>
              <p className="text-text-gray/80"><span className="text-neon-purple">const</span> developer = <span className="text-white">"Mohammad Zakki"</span>;</p>
              <p className="text-text-gray/80"><span className="text-neon-purple">const</span> stack = [<span className="text-neon-blue">"React"</span>, <span className="text-neon-blue">"Tailwind"</span>, <span className="text-neon-blue">"Django"</span>];</p>
              <p className="text-white/20">// Connection established successfully</p>
            </div>

          </div>

        </div>

      </div>

      {/* Floating Bouncing Scroll Chevron at bottom */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center gap-1 z-10 pointer-events-none">
        <span className="text-[8px] font-mono tracking-[0.2em] text-text-gray/40 uppercase animate-pulse">SCROLL_DOWN</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-3.5 h-3.5 text-neon-blue/60" />
        </motion.div>
      </div>

    </section>
  );
}
