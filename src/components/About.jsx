import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { User, Award, Shield, CheckCircle, Cpu, Network, Compass, Sparkles } from 'lucide-react';
import { useSound } from './SoundManager';

const STATS = [
  { label: 'Projects Completed', value: 15, suffix: '+', icon: CheckCircle, color: 'text-neon-blue' },
  { label: 'Technologies Learned', value: 12, suffix: '+', icon: Cpu, color: 'text-neon-purple' },
  { label: 'Frontend Experience', value: 2, suffix: ' Years', icon: Award, color: 'text-neon-pink' },
  { label: 'Full Stack Projects', value: 5, suffix: '+', icon: Network, color: 'text-emerald-400' }
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
    <section id="about" className="relative py-28 px-6 overflow-hidden">
      
      {/* Background blur highlight */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-neon-purple/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Side: Cinematic Developer HUD Panel (lg:col-span-5) */}
        <div className="lg:col-span-5 flex justify-center">
          <div
            ref={leftPanelRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full max-w-sm rounded-[32px] glass-card p-6 border-white/5 relative overflow-hidden select-none cursor-grab active:cursor-grabbing"
            style={{ 
              transition: 'transform 0.15s ease-out',
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Top diagnostic line */}
            <div className="flex justify-between items-center pb-4 border-b border-white/5" style={{ transform: 'translateZ(20px)' }}>
              <div className="flex items-center gap-1.5 font-mono text-[9px] text-text-gray uppercase">
                <Compass className="w-3.5 h-3.5 text-neon-blue animate-spin-slow" />
                <span>USER_METADATA // ENCRYPTION</span>
              </div>
              <span className="text-[8px] font-mono text-neon-purple uppercase">VERIFIED</span>
            </div>

            {/* Simulated interactive HUD graphic mapping */}
            <div 
              className="py-10 flex flex-col items-center justify-center relative space-y-4"
              style={{ transform: 'translateZ(40px)' }}
            >
              
              {/* Spinning technical coordinate lines */}
              <div className="relative w-36 h-36 flex items-center justify-center bg-white/[0.01] rounded-full border border-white/5">
                <div className="absolute inset-2 rounded-full border border-dashed border-neon-purple/20 animate-spin-slow"></div>
                <div className="absolute inset-6 rounded-full border border-dashed border-neon-blue/30 animate-[spin_6s_linear_infinite_reverse]"></div>
                
                {/* Tech Icon */}
                <div className="w-16 h-16 rounded-3xl bg-[#050505] border border-white/10 flex items-center justify-center shadow-lg relative group">
                  <User className="w-6 h-6 text-white group-hover:text-neon-blue transition-colors" />
                </div>
              </div>

              {/* Status information and metadata logs */}
              <div className="text-center space-y-1">
                <h4 className="text-sm font-black font-poppins text-white uppercase tracking-wider">Mohammed Zakki Adnaan</h4>
                <span className="text-[9px] font-mono text-text-gray block uppercase">COLLEGE: Islamiah College (Autonomous), Vaniyambadi</span>
                <span className="text-[9px] font-mono text-neon-blue block uppercase font-bold">DEGREE: BCA (Final Year)</span>
              </div>

            </div>

            {/* Bottom mini status block */}
            <div 
              className="p-3.5 bg-black/60 rounded-2xl border border-white/5 font-mono text-[9px] text-text-gray space-y-2 text-left"
              style={{ transform: 'translateZ(30px)' }}
            >
              <div className="flex justify-between text-white/50 text-[8px] uppercase border-b border-white/5 pb-1">
                <span>SYSTEM_LOG</span>
                <span className="text-emerald-400">ACTIVE</span>
              </div>
              <div className="flex justify-between">
                <span>LOCAL_TIME:</span>
                <span className="text-white">Pernambut, TN, IN</span>
              </div>
              <div className="flex justify-between">
                <span>DEVELOPMENT_SPEED:</span>
                <span className="text-white">EXCEPTIONAL</span>
              </div>
              <div className="flex justify-between">
                <span>MAIN_ATTRACT:</span>
                <span className="text-neon-purple font-bold">CREATIVE_LOGIC</span>
              </div>
            </div>

          </div>
        </div>

        {/* Right Side: Text & Stats Bento Layout (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-10 text-left">
          
          {/* Section title block */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-purple/20 bg-neon-purple/5 text-neon-purple text-xs font-mono tracking-widest uppercase animate-pulse-slow">
              <Sparkles className="w-3.5 h-3.5" />
              IDENTIFICATION
            </div>
            <h2 className="text-4xl md:text-6xl font-black font-poppins tracking-tight text-white uppercase">
              ABOUT ME
            </h2>
            <p className="text-text-gray text-base font-light leading-relaxed font-sans max-w-2xl">
              I am a passionate frontend developer focused on building responsive, interactive, and visually impressive web applications. I enjoy creating smooth user experiences with modern UI design, animations, and clean frontend architecture.
            </p>
          </div>

          {/* Stats grid section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {STATS.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, type: 'spring', stiffness: 200 }}
                  onClick={playClick}
                  onMouseEnter={playHover}
                  className="p-5 rounded-2xl glass-card border-white/5 flex items-start gap-4 group cursor-pointer relative"
                >
                  
                  {/* Subtle hover glow ring inside */}
                  <div className="absolute inset-0 rounded-2xl border border-neon-blue/0 group-hover:border-neon-blue/20 transition-all duration-300" />
                  
                  {/* Stat Icon badge */}
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-white group-hover:bg-neon-blue group-hover:text-black group-hover:border-neon-blue transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Stat details */}
                  <div className="space-y-1">
                    <div className="flex items-baseline">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="text-xs font-sans text-text-gray tracking-wider uppercase font-semibold">
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
