import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useSound } from './SoundManager';

const TESTIMONIALS = [
  {
    quote: "Working with Mohammed Zakki Adnaan was an absolute game changer. He took our outdated community directory requirements and engineered 'Pernambut Connection'—a highly animated, lightning-fast platform that our town loves. His React work is clean, robust, and beautiful.",
    name: "Ahmed Kareem",
    role: "Founder & Community Lead",
    org: "Pernambut local Commerce Hub"
  },
  {
    quote: "Zakki has an exceptional talent for blending high-fidelity designs with clean frontend engineering. His mastery over animations using Tailwind and Framer Motion makes websites feel alive and highly engaging. Recruiters are going to fight over this developer.",
    name: "Dr. Syed Farooq",
    role: "Lead Software Architect",
    org: "Vaniyambadi Tech Labs"
  },
  {
    quote: "As an open-source contributor, I look for clean codebase structuring. Zakki's Library System and Ecommerce UI show a meticulous attention to state management, clean routing paths, and elegant responsive dashboard setups. An absolute creative coder.",
    name: "Sarah Jenkins",
    role: "Senior Frontend Engineer",
    org: "DevStream open Source"
  }
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const { playHover, playClick } = useSound();

  // Auto slide interval
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % TESTIMONIALS.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    playClick();
    setIndex(prev => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    playClick();
    setIndex(prev => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[index];

  return (
    <section id="testimonials" className="relative py-28 px-6 overflow-hidden">
      
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-purple/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto relative z-10 space-y-16">
        
        {/* Title details */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-purple/20 bg-neon-purple/5 text-neon-purple text-xs font-mono tracking-widest uppercase mb-4 animate-pulse-slow">
            <Sparkles className="w-3.5 h-3.5" />
            ENDORSEMENTS_LOG
          </div>
          <h2 className="text-4xl md:text-6xl font-black font-poppins tracking-tight text-white mb-4 uppercase">
            TESTIMONIALS
          </h2>
          <p className="text-text-gray max-w-xl mx-auto text-sm md:text-base font-light font-sans">
            Authentic feedback from technical advisors, regional business sponsors, and peers praising development capabilities.
          </p>
        </div>

        {/* Carousel slide container */}
        <div className="relative min-h-[300px] flex items-center justify-center">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 220, damping: 24 }}
              className="w-full rounded-[32px] glass-card p-8 md:p-12 border-white/5 relative overflow-hidden flex flex-col justify-between"
            >
              
              {/* Glowing decorative Quote Icon in corner */}
              <div className="absolute -left-4 -top-4 text-white/[0.02] pointer-events-none">
                <Quote className="w-40 h-40 transform rotate-180" />
              </div>

              {/* Quote details */}
              <div className="relative z-10 space-y-6 text-left">
                <Quote className="w-10 h-10 text-neon-blue animate-pulse" />
                <p className="text-sm md:text-lg font-light leading-relaxed font-sans text-white/90 italic">
                  "{current.quote}"
                </p>
              </div>

              {/* Client author footer info */}
              <div className="relative z-10 flex justify-between items-end pt-8 border-t border-white/5 mt-6">
                <div className="text-left space-y-0.5">
                  <h4 className="text-base font-bold font-poppins text-white tracking-wide">
                    {current.name}
                  </h4>
                  <p className="text-[10px] font-mono text-neon-purple uppercase font-semibold">
                    {current.role}
                  </p>
                  <p className="text-[9px] font-mono text-text-gray uppercase">
                    {current.org}
                  </p>
                </div>

                {/* Left/Right manual buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={handlePrev}
                    onMouseEnter={playHover}
                    className="p-2.5 rounded-xl border border-white/10 hover:border-neon-blue bg-white/[0.01] hover:bg-neon-blue hover:text-black transition-all duration-300"
                    aria-label="Previous quote"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    onMouseEnter={playHover}
                    className="p-2.5 rounded-xl border border-white/10 hover:border-neon-blue bg-white/[0.01] hover:bg-neon-blue hover:text-black transition-all duration-300"
                    aria-label="Next quote"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </motion.div>
          </AnimatePresence>

        </div>

      </div>

    </section>
  );
}
