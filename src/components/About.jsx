import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Calendar, GraduationCap, Compass, CheckCircle2, Award, Zap } from 'lucide-react';
import { useSound } from './SoundManager';

// Animated Stats Counter component
function Counter({ value, duration = 2.5 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration,
      ease: 'easeOut',
      onUpdate: (latest) => setCount(Math.floor(latest))
    });
    return () => controls.stop();
  }, [value, duration]);

  return <span>{count}</span>;
}

export default function About() {
  const { playHover, playClick } = useSound();

  return (
          <section id="about" className="relative py-20 px-6 overflow-hidden bg-transparent">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] ambient-glow opacity-30 pointer-events-none z-0"></div>

      <div className="max-w-6xl mx-auto relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-mono tracking-[0.25em] text-theme-accent uppercase font-bold"
          >
            01 // ABOUT ME
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-theme-text"
          >
            Design Philosophy & Journey
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xs sm:text-sm text-theme-textSec leading-relaxed"
          >
            Discover the career path, education milestones, and tech objectives driving my design decisions.
          </motion.p>
        </div>

        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Professional Summary (Span 2) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onMouseEnter={playHover}
            className="md:col-span-2 glass-card-premium rounded-2xl p-6 md:p-8 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 text-theme-accent">
                <Compass className="w-5 h-5" />
                <span className="font-mono text-xs uppercase tracking-widest font-bold">PROFESSIONAL SUMMARY</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold tracking-tight text-theme-text">
                Crafting interfaces that bridge technology and users.
              </h3>
              <p className="text-xs md:text-sm text-theme-textSec leading-relaxed font-light">
                As a Frontend Developer specializing in React.js and modern Web Standards, I craft responsive interfaces that make web interactions fluid and delightful. I focus on semantic markup, responsive design principles, and clean CSS architectures to build products that look stunning and perform fast.
              </p>
            </div>
            
            {/* Core Badges */}
            <div className="flex flex-wrap gap-2 pt-6">
              {['Visual Precision', 'Responsive Logic', 'Clean Architectures', 'Git workflows'].map(badge => (
                <span 
                  key={badge}
                  className="px-3 py-1 rounded-full border border-theme-border bg-theme-bgSec text-[10px] font-mono text-theme-textSec"
                >
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Card 2: Quick Stats Counter (Span 1) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            onMouseEnter={playHover}
            className="md:col-span-1 glass-card-premium rounded-2xl p-6 md:p-8 flex flex-col justify-between bg-gradient-to-br from-theme-card to-theme-accentGlow"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-theme-accent">
                <Zap className="w-4 h-4" />
                <span className="font-mono text-xs uppercase tracking-widest font-bold">METRICS</span>
              </div>
              <h3 className="text-sm font-semibold text-theme-textSec">Production Statistics</h3>
            </div>

            <div className="space-y-6 py-4">
              <div className="flex items-baseline justify-between border-b border-theme-border pb-2">
                <span className="text-xs font-mono text-theme-textSec">PROJECTS COMPLETE</span>
                <span className="text-3xl font-black font-mono text-theme-accent">
                  <Counter value={10} />+
                </span>
              </div>

              <div className="flex items-baseline justify-between border-b border-theme-border pb-2">
                <span className="text-xs font-mono text-theme-textSec">SKILLS LEARNED</span>
                <span className="text-3xl font-black font-mono text-theme-accent">
                  <Counter value={15} />+
                </span>
              </div>

              <div className="flex items-baseline justify-between">
                <span className="text-xs font-mono text-theme-textSec">HOURS CODING</span>
                <span className="text-3xl font-black font-mono text-theme-accent">
                  <Counter value={1200} duration={3} />+
                </span>
              </div>
            </div>

            <span className="text-[9px] font-mono text-theme-textMuted uppercase tracking-wider">
              Updated Live from Production Logs
            </span>
          </motion.div>

          {/* Card 3: Education & Timeline (Span 1) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            onMouseEnter={playHover}
            className="md:col-span-1 glass-card-premium rounded-2xl p-6 md:p-8 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 text-theme-accent">
                <GraduationCap className="w-5 h-5" />
                <span className="font-mono text-xs uppercase tracking-widest font-bold">EDUCATION</span>
              </div>

              <div className="space-y-4">
                <div className="border-l-2 border-theme-accent/35 pl-4 relative space-y-1.5">
                  <div className="absolute w-2 h-2 rounded-full bg-theme-accent -left-[5px] top-1.5" />
                  <span className="text-[10px] font-mono text-theme-accent font-bold">2023 - 2026</span>
                  <h4 className="text-xs font-bold text-theme-text uppercase tracking-wider">BCA GRADUATE</h4>
                  <p className="text-[11px] text-theme-textSec font-light">
                    Islamiah College (Autonomous), Vaniyambadi. Completed comprehensive training in application development, database management, and object-oriented architectures.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-mono text-theme-textMuted border-t border-theme-border/60 pt-4 mt-6">
              <Calendar className="w-3.5 h-3.5" />
              <span>BATCH OF 2026</span>
            </div>
          </motion.div>

          {/* Card 4: Career Journey & Goals (Span 2) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            onMouseEnter={playHover}
            className="md:col-span-2 glass-card-premium rounded-2xl p-6 md:p-8 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 text-theme-accent">
                <Award className="w-5 h-5" />
                <span className="font-mono text-xs uppercase tracking-widest font-bold">JOURNEY & GOALS</span>
              </div>
              <h3 className="text-xl font-bold tracking-tight text-theme-text">
                Continuous growth, modern tools, and user experience.
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs md:text-sm text-theme-textSec leading-relaxed font-light">
                <div className="space-y-2.5">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-theme-accent mt-0.5 shrink-0" />
                    <span><strong>Internship:</strong> Gained real-world insights at AspiraSys working on responsive styling and component assembly.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-theme-accent mt-0.5 shrink-0" />
                    <span><strong>API Integration:</strong> Building applications connected to robust Django and REST server backends.</span>
                  </div>
                </div>
                
                <div className="space-y-2.5">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-theme-accent mt-0.5 shrink-0" />
                    <span><strong>Target Roles:</strong> Actively targeting React, Javascript and Frontend developer roles in Bangalore and Chennai.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-theme-accent mt-0.5 shrink-0" />
                    <span><strong>Vision:</strong> Striving to build scalable frontend architectures that scale smoothly.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-[10px] font-mono text-theme-textMuted border-t border-theme-border/60 pt-4 mt-6 flex justify-between">
              <span>LOCATION: BANGALORE / CHENNAI</span>
              <span>DEV_JOURNEY // LEVEL_1</span>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
