import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_LOGS = [
  { text: 'SYSTEM: Initializing boot sequence...', delay: 100 },
  { text: 'SYSTEM: Loading kernel variables...', delay: 350 },
  { text: 'SYSTEM: Fetching environment portfolio data...', delay: 600 },
  { text: 'PROFILE: Mohammad Zakki Adnaan // BCA Graduate', delay: 850 },
  { text: 'SKILLS: HTML5 | CSS3 | JS | React.js | Tailwind | Django', delay: 1100 },
  { text: 'RENDER: Compiling Three.js 3D constellation grid...', delay: 1350 },
  { text: 'PORTFOLIO: Preparing Apple & Vercel design nodes...', delay: 1600 },
  { text: 'SYSTEM: Boot sequence complete. Entering interface...', delay: 1850 },
];

export default function LoadingScreen({ onComplete }) {
  const [logs, setLogs] = useState([]);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    // Percentage counter
    const startTime = Date.now();
    const duration = 2100;

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / duration) * 100, 100);
      setPercent(Math.floor(progress));

      if (progress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          onComplete();
        }, 300);
      }
    }, 16);

    // Logs output trigger
    BOOT_LOGS.forEach((log) => {
      const timeout = setTimeout(() => {
        setLogs((prev) => [...prev, log.text]);
      }, log.delay);

      return () => clearTimeout(timeout);
    });

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-[#020617] z-[99999] flex flex-col items-center justify-center p-6 select-none font-mono">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 linear-grid opacity-[0.05] pointer-events-none"></div>

      <div className="w-full max-w-lg space-y-6 relative z-10">
        
        {/* Terminal Header */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-md overflow-hidden shadow-2xl">
          <div className="px-4 py-3 bg-slate-950 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-[10px] tracking-widest text-slate-500 font-bold uppercase">ZAKKI_CORE // OS_BOOT</span>
            <div className="w-10"></div>
          </div>
          
          {/* Terminal Console Logs */}
          <div className="p-5 min-h-[180px] flex flex-col justify-start text-[11px] leading-relaxed text-slate-400 space-y-1.5 max-h-[220px] overflow-y-auto no-scrollbar font-mono">
            {logs.map((log, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
                className={idx === BOOT_LOGS.length - 1 ? 'text-sky-400 font-bold' : ''}
              >
                <span className="text-slate-600 mr-2">&gt;</span>
                {log}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Progress Bar & Percentage */}
        <div className="space-y-3 px-1">
          <div className="flex justify-between items-center text-xs text-slate-500 font-medium">
            <span className="tracking-widest uppercase">system_ready // loading</span>
            <span className="text-sky-400 font-semibold">{percent}%</span>
          </div>

          <div className="h-[2px] w-full bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-sky-400 to-violet-600"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
