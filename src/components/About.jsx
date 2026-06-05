import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { User, Award, Shield, CheckCircle, Cpu, Network, Compass, Sparkles, GraduationCap, Briefcase, Zap, BookOpen } from 'lucide-react';
import { useSound } from './SoundManager';

const STATS = [
  { label: 'Projects Completed', value: 12, suffix: '+', icon: CheckCircle, color: 'text-neon-blue' },
  { label: 'Technologies Learned', value: 10, suffix: '+', icon: Cpu, color: 'text-neon-purple' },
  { label: 'Internships Completed', value: 1, suffix: ' (AspiraSys)', icon: Award, color: 'text-neon-pink' },
  { label: 'Symposium Prizes Won', value: 2, suffix: '', icon: Network, color: 'text-emerald-400' }
];

// Reusable Counter component that ticks up when entering the viewport
function Counter({ value, suffix, duration = 1.5 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    if (start === end) return;

    const totalMiliseconds = duration * 1000;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 20);

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
        clearInterval(timer);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="font-mono text-3xl font-black text-white">
      {count}{suffix}
    </span>
  );
}

export default function About() {
  const { playHover, playClick } = useSound();
  const leftPanelRef = useRef(null);

  // High performance custom 3D card tilt handler for the left HUD graphic
  const handleMouseMove = (e) => {
    if (!leftPanelRef.current) return;
    const card = leftPanelRef.current;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    const factorX = x / (box.width / 2);
    const factorY = y / (box.height / 2);

    card.style.transform = `perspective(800px) rotateX(${-factorY * 12}deg) rotateY(${factorX * 12}deg) scale3d(1.01, 1.01, 1.01)`;
  };

  const handleMouseLeave = () => {
    if (!leftPanelRef.current) return;
    leftPanelRef.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <section id="about" className="relative py-28 px-6 overflow-hidden bg-[#030303]">
      
      {/* Background blur highlight */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-neon-purple/[0.02] rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Side: Cinematic Developer HUD Panel */}
        <div className="lg:col-span-5 flex justify-center">
          <div
            ref={leftPanelRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full max-w-sm rounded-[24px] glass-card p-5 border-white/[0.03] relative overflow-hidden select-none cursor-grab active:cursor-grabbing"
            style={{ 
              transition: 'transform 0.15s ease-out',
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Top diagnostic line */}
            <div className="flex justify-between items-center pb-3 border-b border-white/5" style={{ transform: 'translateZ(20px)' }}>
              <div className="flex items-center gap-1.5 font-mono text-[8px] text-text-gray/50 uppercase tracking-widest">
                <Compass className="w-3 h-3 text-neon-blue animate-spin-slow" />
                <span>metadata // diagnostics</span>
              </div>
              <span className="text-[8px] font-mono text-neon-purple font-bold tracking-widest uppercase">ENCRYPTED</span>
            </div>

            {/* Simulated interactive HUD graphic mapping */}
            <div 
              className="py-8 flex flex-col items-center justify-center relative space-y-4"
              style={{ transform: 'translateZ(40px)' }}
            >
              
              {/* High-tech vertical Card Photo Frame */}
              <div className="relative w-52 h-64 rounded-[20px] bg-[#050505] border border-white/5 flex items-center justify-center shadow-2xl overflow-hidden group glowing-ring">
                {/* Tech corner brackets */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-white/10 z-20"></div>
                <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-white/10 z-20"></div>
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-white/10 z-20"></div>
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-white/10 z-20"></div>
                
                {/* Cyber laser scanner animation line */}
                <div className="absolute w-full h-[1.5px] bg-white/20 shadow-[0_0_8px_rgba(255,255,255,0.3)] top-0 left-0 laser-scan-line z-20 pointer-events-none"></div>

                <img 
                  src="/my-pic.jpg" 
                  alt="Mohammad Zakki Adnaan" 
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 relative z-10" 
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                
                {/* Fallback structural avatar view */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/[0.01] z-0">
                  <User className="w-12 h-12 text-white/10 group-hover:text-neon-blue/20 transition-colors" />
                  <span className="text-[8px] font-mono text-text-gray/40 mt-2 tracking-widest">COMPILE_AVATAR</span>
                </div>
              </div>

              {/* Status information and metadata logs */}
              <div className="text-center space-y-1">
                <h3 className="text-sm font-extrabold font-poppins text-white uppercase tracking-wide">Mohammad Zakki Adnaan</h3>
                <span className="text-[8.5px] font-mono text-text-gray/60 block uppercase tracking-wide">Islamiah College (Autonomous), Vaniyambadi</span>
                <span className="text-[9px] font-mono text-neon-blue block uppercase font-bold tracking-widest">BCA DEGREE // BATCH OF 2026</span>
              </div>

            </div>

            {/* Bottom mini status block */}
            <div 
              className="p-3 bg-black/40 rounded-xl border border-white/5 font-mono text-[9px] text-text-gray space-y-1.5 text-left"
              style={{ transform: 'translateZ(30px)' }}
            >
              <div className="flex justify-between text-white/30 text-[8px] uppercase tracking-widest border-b border-white/5 pb-1">
                <span>SYSTEM_DIAGNOSTICS</span>
                <span className="text-emerald-500 font-bold">ONLINE</span>
              </div>
              <div className="flex justify-between">
                <span>ORIGIN:</span>
                <span className="text-white">Pernambut, Tamil Nadu, IN</span>
              </div>
              <div className="flex justify-between">
                <span>DEV_INDEX:</span>
                <span className="text-white">EXCEPTIONAL</span>
              </div>
              <div className="flex justify-between">
                <span>CORE_DRIVE:</span>
                <span className="text-neon-purple font-bold">CREATIVE_INTELLIGENCE</span>
              </div>
            </div>

          </div>
        </div>

        {/* Right Side: Bento Grid Layout */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          {/* Section header */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neon-purple/20 bg-neon-purple/[0.02] text-neon-purple text-[10px] font-mono tracking-widest uppercase">
              <Sparkles className="w-3 h-3 animate-pulse" />
              BIOGRAPHICAL_DOSSIER
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold font-poppins tracking-tight text-white uppercase leading-none">
              ABOUT ME
            </h2>
          </div>

          {/* Bento Cards Container */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
            
            {/* Card 1: Professional Intro & Career Objective (Span 4) */}
            <div className="md:col-span-4 p-6 rounded-[24px] glass-card space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-neon-blue font-mono text-[9px] tracking-wider uppercase font-bold">
                  <User className="w-3.5 h-3.5" />
                  // CAREER_OBJECTIVE
                </div>
                <h3 className="font-poppins text-lg font-bold text-white tracking-wide">
                  Frontend & React Developer
                </h3>
                <p className="text-text-gray text-xs md:text-sm font-light leading-relaxed font-sans">
                  I specialize in translating creative visual wireframes into fast, secure, and clean web applications. With my Bachelor of Computer Applications foundation, a completed AspiraSys frontend internship, and intensive training, I build bulletproof React user spaces and integrate highly performant Python Django REST APIs.
                </p>
              </div>
              <p className="text-neon-purple/90 text-xs font-medium font-sans">
                Target Roles: Frontend Developer, React Developer in Bangalore & Chennai.
              </p>
            </div>

            {/* Card 2: Quick Metrics / Stats Grid (Span 2) */}
            <div className="md:col-span-2 p-5 rounded-[24px] glass-card grid grid-cols-2 gap-4 items-center">
              {STATS.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="space-y-1">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.02] border border-white/5 text-text-gray flex items-center justify-center">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-left">
                      <Counter value={stat.value} suffix={stat.suffix} />
                      <p className="text-[7.5px] font-mono text-text-gray/50 tracking-wider uppercase leading-tight mt-0.5 animate-pulse">
                        {stat.label.split(' ')[0]}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Card 3: Education Timeline (Span 3) */}
            <div className="md:col-span-3 p-6 rounded-[24px] glass-card space-y-4 text-left">
              <div className="flex items-center gap-2 text-neon-blue font-mono text-[9px] tracking-wider uppercase font-bold">
                <GraduationCap className="w-3.5 h-3.5" />
                // EDUCATION_TIMELINE
              </div>
              <div className="space-y-3">
                <div className="relative pl-4 border-l border-white/10">
                  <div className="absolute -left-[4.5px] top-1 w-2 h-2 rounded-full bg-neon-purple" />
                  <span className="text-[9px] font-mono text-neon-purple font-bold">2023 - 2026</span>
                  <h4 className="text-xs font-bold text-white font-poppins tracking-wide">BCA Graduate</h4>
                  <p className="text-[10px] text-text-gray font-light mt-0.5 leading-normal">
                    Islamiah College (Autonomous), Vaniyambadi. Completed BCA with strong fundamentals in software engineering & web systems.
                  </p>
                </div>
                <div className="relative pl-4 border-l border-white/0">
                  <div className="absolute -left-[4.5px] top-1 w-2 h-2 rounded-full bg-white/20" />
                  <span className="text-[9px] font-mono text-white/40">2023</span>
                  <h4 className="text-xs font-bold text-white/40 font-poppins tracking-wide">Class XII Graduate</h4>
                  <p className="text-[10px] text-white/30 font-light mt-0.5">
                    Islamiah Higher Secondary School, Pernambut.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 4: Personal Strengths (Span 3) */}
            <div className="md:col-span-3 p-6 rounded-[24px] glass-card space-y-4 text-left">
              <div className="flex items-center gap-2 text-neon-blue font-mono text-[9px] tracking-wider uppercase font-bold">
                <Zap className="w-3.5 h-3.5" />
                // CORE_STRENGTHS
              </div>
              <div className="grid grid-cols-2 gap-2 text-[10px] text-text-gray font-sans font-light">
                {[
                  'Visual Precision',
                  'Modular Systems',
                  'REST Integration',
                  'Fast Adaptability',
                  'Git Collaboration',
                  'Responsive Design'
                ].map((point) => (
                  <div key={point} className="flex items-center gap-1.5 p-2 rounded-xl bg-white/[0.01] border border-white/5 hover:border-white/10 transition-colors">
                    <span className="text-neon-purple font-bold">✓</span>
                    <span className="text-white/80 font-medium">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 5: Experience Highlights (Span 6) */}
            <div className="md:col-span-6 p-6 rounded-[24px] glass-card space-y-4 text-left">
              <div className="flex items-center gap-2 text-neon-purple font-mono text-[9px] tracking-wider uppercase font-bold">
                <Briefcase className="w-3.5 h-3.5" />
                // EXPERIENCE_HIGHLIGHTS
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-3.5 rounded-xl bg-white/[0.01] border border-white/5 hover:border-white/10 transition-all">
                  <span className="text-[9px] font-mono text-neon-blue font-bold">JULY 2025</span>
                  <h4 className="text-xs font-bold text-white font-poppins mt-1">AspiraSys Internship</h4>
                  <p className="text-[10px] text-text-gray mt-1 leading-normal font-sans font-light">
                    Built interactive layouts, responsive web components and handled Git reviews.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.01] border border-white/5 hover:border-white/10 transition-all">
                  <span className="text-[9px] font-mono text-neon-purple font-bold">SEP - OCT 2025</span>
                  <h4 className="text-xs font-bold text-white font-poppins mt-1">Industrial Training</h4>
                  <p className="text-[10px] text-text-gray mt-1 leading-normal font-sans font-light">
                    6-week intensive web dev, AI integration & deployment training in Chennai.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.01] border border-white/5 hover:border-white/10 transition-all">
                  <span className="text-[9px] font-mono text-emerald-400 font-bold">DECEMBER 2025</span>
                  <h4 className="text-xs font-bold text-white font-poppins mt-1">Symposium Laurels</h4>
                  <p className="text-[10px] text-text-gray mt-1 leading-normal font-sans font-light">
                    Won 1st Place in Pirates Pursuits & 3rd Prize in ADZ-AP IT Symposiums.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
