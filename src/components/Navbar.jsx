import React, { useState, useEffect } from 'react';
import { Menu, X, Volume2, VolumeX, Github, Linkedin, MessageSquare, Send } from 'lucide-react';
import { useSound } from './SoundManager';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Reels', href: '#reels-showcase' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const { isMuted, toggleMute, playHover, playClick } = useSound();

  useEffect(() => {
    const handleScroll = () => {
      // 1. Detect scroll height for background blurring
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // 2. Scroll Progress calculation
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    playClick();
    setIsOpen(false);
    
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* 1. Global Page Scroll Progress Line */}
      <div className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink z-[9999] transition-all duration-100" style={{ width: `${scrollProgress}%` }} />

      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-4 bg-background-primary/70 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.4)]' 
          : 'py-6 bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          
          {/* Logo brand */}
          <a 
            href="#home" 
            onClick={(e) => handleLinkClick(e, '#home')}
            onMouseEnter={playHover}
            className="flex items-center gap-2 font-poppins text-lg font-black tracking-widest text-white hover:opacity-80 transition-opacity"
          >
            <span>ZAKKI</span>
            <span className="w-1.5 h-1.5 rounded-full bg-neon-blue animate-pulse"></span>
            <span className="text-[10px] font-mono text-neon-purple">DEV</span>
          </a>

          {/* Desktop Navigation links */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                onMouseEnter={playHover}
                className="text-xs font-mono text-text-gray hover:text-white uppercase tracking-wider transition-colors relative group py-1"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-neon-blue transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Action Utilities (Audio, Socials, Mobile toggle) */}
          <div className="flex items-center gap-4">
            
            {/* Audio Toggle Synthesizer */}
            <button
              onClick={() => { toggleMute(); playClick(); }}
              onMouseEnter={playHover}
              className={`p-2 rounded-full border transition-all duration-300 relative group ${
                !isMuted 
                  ? 'bg-neon-blue/10 border-neon-blue/40 text-neon-blue shadow-[0_0_15px_rgba(0,240,255,0.25)]' 
                  : 'bg-white/5 border-white/10 text-text-gray hover:border-white/20 hover:text-white'
              }`}
              title={isMuted ? 'Unmute Futuristic Synthesizer SFX' : 'Mute Synthesizer SFX'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 animate-bounce" />}
              
              {/* Dynamic Sound Radar Rings */}
              {!isMuted && (
                <span className="absolute -inset-1 rounded-full border border-neon-blue/30 animate-ping pointer-events-none" />
              )}
            </button>

            {/* Quick Contact Button */}
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              onMouseEnter={playHover}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:border-neon-blue hover:text-neon-blue text-xs font-mono tracking-widest uppercase transition-all duration-300 hover:scale-105 bg-white/[0.02]"
            >
              <Send className="w-3.5 h-3.5" />
              HIRE ME
            </a>

            {/* Mobile Menu Hamburg Toggle */}
            <button
              onClick={() => { playClick(); setIsOpen(!isOpen); }}
              onMouseEnter={playHover}
              className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`lg:hidden fixed inset-x-0 top-[73px] bg-background-primary/95 border-b border-white/5 backdrop-blur-2xl transition-all duration-300 origin-top overflow-hidden z-40 ${
          isOpen ? 'scale-y-100 opacity-100 py-6' : 'scale-y-0 opacity-0 py-0 pointer-events-none'
        }`} style={{ maxHeight: 'calc(100vh - 73px)' }}>
          <div className="flex flex-col items-center gap-6 px-6 font-mono text-sm tracking-widest">
            {NAV_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                onMouseEnter={playHover}
                className="text-text-gray hover:text-white uppercase transition-colors py-2"
              >
                {link.label}
              </a>
            ))}
            
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              onMouseEnter={playHover}
              className="flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple text-black font-bold tracking-widest uppercase transition-all duration-300 w-full max-w-xs justify-center shadow-lg mt-4"
            >
              <Send className="w-4 h-4" />
              HIRE ME
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
