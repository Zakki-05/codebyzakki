import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Terminal } from 'lucide-react';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Booting system core...');

  useEffect(() => {
    // Stage-based message updates to feel like a high-tech terminal booting up
    const textInterval = setInterval(() => {
      if (progress < 25) {
        setLoadingText('Initializing portfolio assets...');
      } else if (progress < 50) {
        setLoadingText('Loading cinematic rendering engines...');
      } else if (progress < 75) {
        setLoadingText('Compiling Full-Stack credentials...');
      } else if (progress < 95) {
        setLoadingText('Establishing secure network pathways...');
      } else {
        setLoadingText('Welcome to Zakki\'s universe.');
      }
    }, 200);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          clearInterval(textInterval);
          setTimeout(() => {
            onComplete();
          }, 600); // Small pause at 100% for impact
          return 100;
        }
        
        // Non-linear progress increment to feel organic & authentic
        const diff = Math.random() * 8 + 2;
        return Math.min(Math.floor(prev + diff), 100);
      });
    }, 80);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, [progress, onComplete]);

  return (
    <div className="fixed inset-0 bg-[#050505] z-[99999] flex flex-col items-center justify-center p-6">
      
      {/* Cinematic grid overlay for the loader */}
      <div className="absolute inset-0 tech-grid opacity-10 pointer-events-none"></div>

      <div className="w-full max-w-md space-y-8 text-center relative z-10">
        
        {/* Glowing Central Badge */}
        <div className="relative inline-flex items-center justify-center">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
            className="absolute inset-0 w-24 h-24 rounded-full border border-dashed border-neon-blue/40"
          />
          <motion.div 
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-16 h-16 rounded-full bg-white/[0.02] border border-white/10 flex items-center justify-center shadow-[0_0_30px_rgba(0,240,255,0.1)]"
          >
            <Terminal className="w-6 h-6 text-neon-blue" />
          </motion.div>
        </div>

        {/* Loading Titles */}
        <div className="space-y-3">
          <h1 className="text-3xl font-black font-poppins tracking-[0.25em] text-white uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
            M Z A
          </h1>
          <p className="text-xs font-mono tracking-widest text-neon-blue uppercase animate-pulse">
            {loadingText}
          </p>
        </div>

        {/* Loading Progress Bar & Percentage Indicators */}
        <div className="space-y-2">
          
          {/* Progress numeric track */}
          <div className="flex justify-between items-center text-[10px] font-mono text-text-gray">
            <span>CORE.LOG // LOAD_SYSTEM</span>
            <span className="text-white font-bold">{progress}%</span>
          </div>

          {/* Core progress line container */}
          <div className="h-1.5 w-full bg-white/[0.04] border border-white/5 rounded-full overflow-hidden p-[2px]">
            <motion.div 
              className="h-full bg-gradient-to-r from-neon-blue to-neon-purple rounded-full relative"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut' }}
            >
              {/* Glowing leading light dot */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_#fff,0_0_20px_#00f0ff]" />
            </motion.div>
          </div>
        </div>

        {/* Bottom system credentials label */}
        <div className="pt-8 flex items-center justify-center gap-1.5 text-[9px] font-mono text-text-gray tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-neon-purple animate-spin-slow" />
          <span>PORTFOLIO_OS // INITIALIZING EXPERIENCE...</span>
        </div>

      </div>

    </div>
  );
}
