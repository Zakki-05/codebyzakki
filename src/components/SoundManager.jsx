import React, { createContext, useContext, useState, useEffect } from 'react';

const SoundContext = createContext();

// Global persistent AudioContext to completely bypass React's asynchronous state delays
let globalAudioCtx = null;

const initCtx = () => {
  if (!globalAudioCtx) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (Ctx) {
      globalAudioCtx = new Ctx();
    }
  }
  // Synchronously resume if suspended by browser auto-play policy
  if (globalAudioCtx && globalAudioCtx.state === 'suspended') {
    globalAudioCtx.resume();
  }
  return globalAudioCtx;
};

export const SoundProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(() => {
    const saved = localStorage.getItem('sound_muted');
    // Default to true (muted) to comply with browser automatic-noise prevention rules
    return saved ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('sound_muted', JSON.stringify(isMuted));
    
    // If user has unmuted, initialize audio context on first screen interaction
    if (!isMuted) {
      const handleFirstInteraction = () => {
        initCtx();
        window.removeEventListener('mousedown', handleFirstInteraction);
        window.removeEventListener('keydown', handleFirstInteraction);
      };
      window.addEventListener('mousedown', handleFirstInteraction);
      window.addEventListener('keydown', handleFirstInteraction);
      return () => {
        window.removeEventListener('mousedown', handleFirstInteraction);
        window.removeEventListener('keydown', handleFirstInteraction);
      };
    }
  }, [isMuted]);

  // Synthetic Hover Sound: Futuristic high-frequency pop (clean and subtle)
  const playHover = () => {
    if (isMuted) return;
    const ctx = initCtx();
    if (!ctx || ctx.state === 'suspended') return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(900, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.006, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch (e) {
      console.log('Audio synthesis error:', e);
    }
  };

  // Synthetic Click Sound: Clean structural metal-electronic snap
  const playClick = () => {
    if (isMuted) return;
    const ctx = initCtx();
    if (!ctx || ctx.state === 'suspended') return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(450, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch (e) {
      console.log('Audio synthesis error:', e);
    }
  };

  // Synthetic Transition Sweep: Low-pass cinematic sub-bass sweep
  const playTransition = () => {
    if (isMuted) return;
    const ctx = initCtx();
    if (!ctx || ctx.state === 'suspended') return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(65, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.35);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(160, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(65, ctx.currentTime + 0.35);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.045, ctx.currentTime + 0.12);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch (e) {
      console.log('Audio synthesis error:', e);
    }
  };

  // Synthetic Success Arpeggio: Ascending major third (plays on forms/likes)
  const playSuccess = () => {
    if (isMuted) return;
    const ctx = initCtx();
    if (!ctx || ctx.state === 'suspended') return;

    try {
      const now = ctx.currentTime;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);
      gain.connect(ctx.destination);

      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, now); // C5
      osc1.connect(gain);
      osc1.start(now);
      osc1.stop(now + 0.12);

      const osc2 = ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(659.25, now + 0.08); // E5
      osc2.connect(gain);
      osc2.start(now + 0.08);
      osc2.stop(now + 0.28);
    } catch (e) {
      console.log('Audio synthesis error:', e);
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    if (!nextMuted) {
      initCtx();
    }
    setIsMuted(nextMuted);
  };

  return (
    <SoundContext.Provider value={{ isMuted, toggleMute, playHover, playClick, playTransition, playSuccess }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) throw new Error('useSound must be used within a SoundProvider');
  return context;
};
