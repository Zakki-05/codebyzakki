import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { User, Award, Shield, CheckCircle, Cpu, Network, Compass, Sparkles } from 'lucide-react';
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
                  src="/my-pic.png" 
                  alt="Mohammed Zakki Adnaan" 
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
                <h4 className="text-sm font-extrabold font-poppins text-white uppercase tracking-wide">Mohammed Zakki Adnaan P</h4>
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

        {/* Right Side: Text & Stats Bento Layout */}
        <div className="lg:col-span-7 space-y-8 text-left">
          
          {/* Section title block */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neon-purple/20 bg-neon-purple/[0.02] text-neon-purple text-[10px] font-mono tracking-widest uppercase">
              <Sparkles className="w-3 h-3" />
              BIOGRAPHICAL_DOSSIER
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold font-poppins tracking-tight text-white uppercase">
              ABOUT ME
            </h2>
            <p className="text-text-gray text-xs md:text-sm font-light leading-relaxed font-sans max-w-2xl">
              I am an engineered Frontend Developer specializing in translating creative visual wireframes into fast, secure, and clean web applications. With my Bachelor of Computer Applications (BCA) foundation, a complete AspiraSys frontend internship, and extensive training in Chennai, I create bulletproof React user spaces and integrate highly performant Python Django REST APIs.
            </p>
          </div>

          {/* Stats grid section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {STATS.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, type: 'spring', stiffness: 200, damping: 20 }}
                  onClick={playClick}
                  onMouseEnter={playHover}
                  className="p-5 rounded-2xl glass-card border-white/5 flex items-center gap-4 group cursor-pointer relative"
                >
                  
                  {/* Subtle hover glow ring inside */}
                  <div className="absolute inset-0 rounded-2xl border border-neon-blue/0 group-hover:border-white/5 transition-all duration-300" />
                  
                  {/* Stat Icon badge */}
                  <div className="p-2.5 rounded-xl bg-white/[0.01] border border-white/5 text-text-gray group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300">
                    <Icon className="w-4.5 h-4.5" />
                  </div>

                  {/* Stat details */}
                  <div className="space-y-0.5 text-left">
                    <div className="flex items-baseline">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="text-[10px] font-mono text-text-gray/60 tracking-wider uppercase font-semibold">
                      {stat.label}
                    </p>
                  </div>

                </motion.div>
              );
            })}
          </div>

        </div>

      </div>

    </section>
  );
}
