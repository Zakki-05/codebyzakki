import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, Instagram, ChevronDown, Terminal, Cpu, ShieldAlert, Zap } from 'lucide-react';
import { useSound } from './SoundManager';

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
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden tech-grid">
      
      {/* Cinematic drift blur blobs */}
      <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-neon-blue/10 blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-neon-purple/10 blur-[150px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 relative z-10">
        
        {/* Left Core Text Intro Column (lg:col-span-7) */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-8 text-left">
          
          <div className="space-y-4">
            
            {/* Tiny introductory chip */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono tracking-widest text-text-gray uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-blue animate-pulse"></span>
              HELLO, WELCOME TO MY PORTFOLIO
            </div>

            {/* Giant Title Name */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-poppins tracking-tight text-white leading-none">
              Mohammed <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-blue via-white to-neon-purple text-neon-glow">
                Zakki Adnaan
              </span>
            </h1>

            {/* Sub-role typing engine */}
            <div className="h-10 flex items-center font-mono text-lg md:text-2xl text-neon-blue uppercase tracking-widest">
              <span>{`> `}</span>
              <span className="ml-2 font-bold">{displayedRole}</span>
              <span className="w-2.5 h-6 bg-neon-blue ml-1 animate-pulse"></span>
            </div>

            {/* Summary description paragraph */}
            <p className="text-text-gray max-w-xl text-sm md:text-base font-light leading-relaxed font-sans">
              I craft modern, fully responsive, and highly interactive frontend systems. Focused on engineering visual web wonders with React, Tailwind CSS, GSAP, and Django frameworks.
            </p>
          </div>

          {/* Action Call to Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#reels-showcase"
              onClick={(e) => handleScrollClick(e, '#reels-showcase')}
              onMouseEnter={playHover}
              className="px-8 py-4 rounded-xl bg-neon-blue text-black hover:bg-neon-purple hover:text-white font-mono text-xs font-black tracking-widest transition-all duration-300 flex items-center justify-center gap-2 glowing-ring hover:scale-105"
            >
              EXPLORE REELS
              <ArrowRight className="w-4 h-4" />
            </a>
            
            <a
              href="#contact"
              onClick={(e) => handleScrollClick(e, '#contact')}
              onMouseEnter={playHover}
              className="px-8 py-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-white/30 text-white font-mono text-xs font-bold tracking-widest transition-all duration-300 flex items-center justify-center gap-2 hover:bg-white/5 hover:scale-105"
            >
              HIRE ME
            </a>

            <a
              href="/MOHAMMED_ZAKKI_ADNAAN_P_Resume_2026.pdf"
              download="MOHAMMED_ZAKKI_ADNAAN_P_Resume_2026.pdf"
              onMouseEnter={playHover}
              onClick={playClick}
              className="px-8 py-4 rounded-xl border border-neon-purple/20 bg-neon-purple/5 text-neon-purple font-mono text-xs font-bold tracking-widest hover:bg-neon-purple hover:text-white transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
            >
              DOWNLOAD RESUME
            </a>
          </div>

          {/* Connected Socials Strip */}
          <div className="pt-4 flex items-center gap-6">
            <span className="text-[10px] font-mono text-text-gray uppercase tracking-widest">Connect:</span>
            <div className="flex gap-4">
              <a
                href="https://github.com/Zakki-05"
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                onMouseEnter={playHover}
                className="p-2.5 rounded-lg bg-white/5 hover:bg-neon-blue hover:text-black border border-white/5 hover:border-neon-blue text-text-gray hover:scale-110 transition-all"
                title="Github profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/zakki-adnan-01aa77298"
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                onMouseEnter={playHover}
                className="p-2.5 rounded-lg bg-white/5 hover:bg-neon-blue hover:text-black border border-white/5 hover:border-neon-blue text-text-gray hover:scale-110 transition-all"
                title="LinkedIn profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:zakkibca2023@gmail.com"
                onClick={playClick}
                onMouseEnter={playHover}
                className="p-2.5 rounded-lg bg-white/5 hover:bg-neon-blue hover:text-black border border-white/5 hover:border-neon-blue text-text-gray hover:scale-110 transition-all"
                title="Email direct"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/Zakki-05"
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                onMouseEnter={playHover}
                className="p-2.5 rounded-lg bg-white/5 hover:bg-neon-blue hover:text-black border border-white/5 hover:border-neon-blue text-text-gray hover:scale-110 transition-all"
                title="Instagram portfolio showcase"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Right 3D Visualizer Dashboard Column (lg:col-span-5) */}
        <div className="lg:col-span-5 flex items-center justify-center relative">
          
          {/* Neon particle ring backdrops */}
          <div className="absolute w-[280px] h-[280px] rounded-full border border-dashed border-neon-blue/15 animate-spin-slow pointer-events-none"></div>
          <div className="absolute w-[360px] h-[360px] rounded-full border border-dashed border-neon-purple/10 animate-[spin_20s_linear_infinite] pointer-events-none"></div>

          {/* Interactive Card container */}
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-[280px] h-[400px] xs:w-[320px] xs:h-[440px] rounded-[32px] glass-card p-6 border-white/5 flex flex-col justify-between relative select-none cursor-grab active:cursor-grabbing"
            style={{ 
              transition: 'transform 0.1s ease-out, box-shadow 0.1s ease-out',
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Top dashboard status */}
            <div className="flex justify-between items-center" style={{ transform: 'translateZ(30px)' }}>
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-neon-blue" />
                <span className="text-[10px] font-mono text-white/60 uppercase">CORE_DEV_OS v1.0</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            </div>

            {/* Glowing developer schematic blueprint visual */}
            <div 
              className="flex-1 flex flex-col items-center justify-center relative py-6"
              style={{ transform: 'translateZ(50px)' }}
            >
              
              {/* Central high tech spinning core */}
              <div className="relative w-28 h-28 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-neon-blue/30 animate-spin-slow"></div>
                <div className="absolute w-20 h-20 rounded-full border border-neon-purple/40 animate-[spin_4s_linear_infinite_reverse]"></div>
                
                {/* SVG glowing high-tech logo chip */}
                <div className="w-12 h-12 rounded-2xl bg-black border border-white/20 flex items-center justify-center relative shadow-lg overflow-hidden">
                  <img 
                    src="/my-pic.png" 
                    alt="Mohammed Zakki Adnaan" 
                    className="w-full h-full object-cover relative z-10" 
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  <Zap className="w-5 h-5 text-neon-blue animate-pulse absolute z-0" />
                </div>
              </div>

              {/* Status information text */}
              <div className="text-center mt-6 space-y-1">
                <span className="text-[10px] font-mono text-neon-blue font-bold tracking-widest uppercase">SYSTEM: ONLINE</span>
                <span className="text-[9px] font-mono text-text-gray block">LATENCY: 22ms // CPU: ACTIVE</span>
              </div>

            </div>

            {/* Bottom Dashboard details code preview mock */}
            <div 
              className="p-3 bg-black/60 rounded-xl border border-white/5 font-mono text-[9px] text-text-gray space-y-1 text-left"
              style={{ transform: 'translateZ(40px)' }}
            >
              <div className="flex gap-1.5 items-center pb-1.5 border-b border-white/5">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="text-[8px] text-white/40 ml-1">stack_compiler.js</span>
              </div>
              <p className="text-neon-blue"><span className="text-neon-purple">const</span> Dev = <span className="text-white">"Zakki Adnaan"</span>;</p>
              <p className="text-neon-blue"><span className="text-neon-purple">const</span> Tech = [<span className="text-white">"React"</span>, <span className="text-white">"Django"</span>];</p>
              <p className="text-white/40">// Status: Ready to execute</p>
            </div>

          </div>

        </div>

      </div>

      {/* Floating Bouncing Scroll Chevron at bottom */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center gap-1.5 z-10 pointer-events-none">
        <span className="text-[9px] font-mono tracking-widest text-text-gray uppercase animate-pulse">SCROLL TO CODE</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4 text-neon-blue" />
        </motion.div>
      </div>

    </section>
  );
}
