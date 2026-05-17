import React, { createContext, useContext, useState, useEffect } from 'react';

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(() => {
    const saved = localStorage.getItem('sound_muted');
    return saved ? JSON.parse(saved) : true; // Default to muted for auto-play policy compatibility
  });

  const [audioCtx, setAudioCtx] = useState(null);

  const initCtx = () => {
    if (!audioCtx) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (Ctx) {
        setAudioCtx(new Ctx());
      }
    }
  };

  useEffect(() => {
    localStorage.setItem('sound_muted', JSON.stringify(isMuted));
  }, [isMuted]);

  // Synthetic Hover Sound: High frequency micro-click
  const playHover = () => {
    if (isMuted) return;
    initCtx();
    if (!audioCtx || audioCtx.state === 'suspended') return;

    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1800, audioCtx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.01, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.05);
    } catch (e) {
      console.log('Audio error:', e);
    }
  };

  // Synthetic Click Sound: Clean electronic snap
  const playClick = () => {
    if (isMuted) return;
    initCtx();
    if (!audioCtx || audioCtx.state === 'suspended') return;

    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.08);
    } catch (e) {
      console.log('Audio error:', e);
    }
  };

  // Synthetic Transition Sweep: Sub-bass swell for cinematic feel
  const playTransition = () => {
    if (isMuted) return;
    initCtx();
    if (!audioCtx || audioCtx.state === 'suspended') return;

    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(80, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, audioCtx.currentTime + 0.4);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(200, audioCtx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(80, audioCtx.currentTime + 0.4);

      gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.06, audioCtx.currentTime + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.4);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.4);
    } catch (e) {
      console.log('Audio error:', e);
    }
  };

  // Sound generator for success events (e.g. form submitted)
  const playSuccess = () => {
    if (isMuted) return;
    initCtx();
    if (!audioCtx || audioCtx.state === 'suspended') return;

    try {
      const now = audioCtx.currentTime;
      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
      gain.connect(audioCtx.destination);

      // Play major third ascending
      const osc1 = audioCtx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, now); // C5
      osc1.connect(gain);
      osc1.start(now);
      osc1.stop(now + 0.15);

      const osc2 = audioCtx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(659.25, now + 0.1); // E5
      osc2.connect(gain);
      osc2.start(now + 0.1);
      osc2.stop(now + 0.3);
    } catch (e) {
      console.log('Audio error:', e);
    }
  };

  const toggleMute = () => {
    // If turning sound ON, try to resume suspended Context (browser privacy rules)
    if (isMuted) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (Ctx) {
        const tempCtx = audioCtx || new Ctx();
        if (!audioCtx) setAudioCtx(tempCtx);
        if (tempCtx.state === 'suspended') {
          tempCtx.resume();
        }
      }
    }
    setIsMuted(!isMuted);
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
