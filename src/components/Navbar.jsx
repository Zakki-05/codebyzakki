import React, { useState, useEffect } from 'react';
import { Menu, X, Volume2, VolumeX, Send, Download } from 'lucide-react';
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
  const [activeSection, setActiveSection] = useState('#home');
  
  const { isMuted, toggleMute, playHover, playClick } = useSound();



  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

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

      // 3. Active Section detection
      const scrollPosition = window.scrollY + 250; // offset for better response
      for (const link of NAV_LINKS) {
        const el = document.querySelector(link.href);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.href);
          }
        }
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
      // Small offset for fixed navbar
      const yOffset = -80;
      const y = target.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(href);
    }
  };

  return (
    <>
      {/* 1. Global Page Scroll Progress Line */}
      <div className="fixed top-0 left-0 h-[2.5px] bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink z-[9999] transition-all duration-100" style={{ width: `${scrollProgress}%` }} />

      {/* Mobile Menu Backdrop Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'py-3.5 bg-background-primary/50 backdrop-blur-2xl border-b border-white/[0.04] shadow-[0_4px_30px_rgba(0,0,0,0.5)]' 
          : 'py-6 bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          
          {/* Logo brand */}
          <a 
            href="#home" 
            onClick={(e) => handleLinkClick(e, '#home')}
            onMouseEnter={playHover}
            className="flex items-center gap-1.5 font-poppins text-base font-black tracking-[0.2em] text-white hover:opacity-90 transition-opacity"
            aria-label="Mohammed Zakki Adnaan - Go to home section"
          >
            <span>ZAKKI</span>
            <span className="w-1.5 h-1.5 rounded-full bg-neon-blue animate-pulse-slow"></span>
            <span className="text-[9px] font-mono text-neon-purple font-bold tracking-widest">DEV</span>
          </a>

          {/* Desktop Navigation links */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                onMouseEnter={playHover}
                className={`text-[11px] font-mono uppercase tracking-widest transition-colors duration-300 relative group py-1 ${
                  activeSection === link.href ? 'text-white font-bold' : 'text-text-gray hover:text-white'
                }`}
              >
                {link.label}
                <span className={`absolute bottom-0 left-0 h-[1.5px] bg-neon-blue transition-all duration-300 ${
                  activeSection === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </a>
            ))}
          </nav>

          {/* Action Utilities (Audio, Theme Toggle, Socials, Mobile toggle) */}
          <div className="flex items-center gap-3">
            
            {/* Audio Toggle Synthesizer */}
            <button
              onClick={() => { toggleMute(); playClick(); }}
              onMouseEnter={playHover}
              className={`p-2.5 rounded-full border transition-all duration-300 relative group ${
                !isMuted 
                  ? 'bg-neon-blue/5 border-neon-blue/20 text-neon-blue shadow-[0_0_12px_rgba(0,240,255,0.15)]' 
                  : 'bg-white/5 border-white/5 text-text-gray hover:border-white/10 hover:text-white'
              }`}
              title={isMuted ? 'Unmute Futuristic Synthesizer SFX' : 'Mute Synthesizer SFX'}
              aria-label={isMuted ? 'Unmute background music and sound effects' : 'Mute background music and sound effects'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 animate-pulse" />}
              
              {/* Dynamic Sound Radar Rings */}
              {!isMuted && (
                <span className="absolute -inset-1 rounded-full border border-neon-blue/20 animate-ping pointer-events-none" />
              )}
            </button>




            {/* Mobile Menu Hamburg Toggle */}
            <button
              onClick={() => { playClick(); setIsOpen(!isOpen); }}
              onMouseEnter={playHover}
              className="lg:hidden p-2.5 rounded-lg bg-white/5 border border-white/5 text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
              aria-controls="mobile-nav-menu"
            >
              {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>

          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        <div 
          id="mobile-nav-menu" 
          className={`lg:hidden absolute top-full left-0 w-full transition-all duration-300 origin-top overflow-hidden z-40 ${
            isOpen ? 'scale-y-100 opacity-100 py-6 shadow-[0_10px_40px_rgba(0,0,0,0.8)]' : 'scale-y-0 opacity-0 py-0 pointer-events-none'
          }`} 
          style={{ 
            maxHeight: '85vh',
            backgroundColor: 'rgba(10, 10, 12, 0.96)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)'
          }}
        >
          <div className="flex flex-col items-center gap-5 px-6 font-mono text-xs tracking-widest">
            {NAV_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                onMouseEnter={playHover}
                className="uppercase transition-colors py-1.5 hover:text-white"
                style={{
                  color: activeSection === link.href ? '#a78bfa' : '#8e9196',
                  fontWeight: activeSection === link.href ? '700' : '400'
                }}
              >
                {link.label}
              </a>
            ))}
            
            <a
              href="/New_MOHAMMED_ZAKKI_ADNAAN_P_2026-06-02.pdf"
              download="New_MOHAMMED_ZAKKI_ADNAAN_P_2026-06-02.pdf"
              onMouseEnter={playHover}
              onClick={playClick}
              className="flex items-center gap-2 px-8 py-2.5 rounded-full border transition-all duration-300 w-full max-w-xs justify-center text-[11px] hover:scale-105"
              style={{
                border: '1px solid rgba(139, 92, 246, 0.3)',
                backgroundColor: 'rgba(139, 92, 246, 0.03)',
                color: '#a78bfa',
                fontWeight: '700'
              }}
            >
              <Download className="w-3.5 h-3.5" />
              DOWNLOAD RESUME
            </a>

            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              onMouseEnter={playHover}
              className="flex items-center gap-2 px-8 py-2.5 rounded-full transition-all duration-300 w-full max-w-xs justify-center shadow-lg text-[11px] hover:scale-105"
              style={{
                backgroundImage: 'linear-gradient(to right, #00f0ff, #8b5cf6)',
                color: '#000000',
                fontWeight: '700'
              }}
            >
              <Send className="w-3.5 h-3.5" />
              HIRE ME
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
