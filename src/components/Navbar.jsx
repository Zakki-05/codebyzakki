import React, { useState, useEffect } from 'react';
import { Menu, X, Volume2, VolumeX, Send, Sun, Moon, Download } from 'lucide-react';
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

  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('light') ? 'light' : 'dark';
    }
    return 'dark';
  });

  const toggleTheme = () => {
    playClick();
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (nextTheme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  };

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

            {/* Dark/Light Mode Switcher */}
            <button
              onClick={toggleTheme}
              onMouseEnter={playHover}
              className="p-2.5 rounded-full border border-white/5 bg-white/5 text-text-gray hover:border-white/10 hover:text-white transition-all duration-300"
              title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>

            {/* Resume Button */}
            <a
              href="/New_MOHAMMED_ZAKKI_ADNAAN_P_2026-06-02.pdf"
              download="New_MOHAMMED_ZAKKI_ADNAAN_P_2026-06-02.pdf"
              onMouseEnter={playHover}
              onClick={playClick}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-neon-purple/20 bg-neon-purple/[0.03] text-neon-purple text-[10px] font-mono tracking-widest uppercase transition-all duration-300 hover:scale-105 hover:bg-neon-purple hover:text-white"
              aria-label="Download Resume PDF"
            >
              <Download className="w-3 h-3" />
              RESUME
            </a>

            {/* Quick Contact Button */}
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              onMouseEnter={playHover}
              className="hidden sm:flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-white/5 hover:border-neon-blue/30 hover:text-neon-blue text-[10px] font-mono tracking-widest uppercase transition-all duration-300 hover:scale-105 bg-white/[0.01]"
              aria-label="Send a direct message - contact section"
            >
              <Send className="w-3 h-3" />
              HIRE ME
            </a>

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
        <div id="mobile-nav-menu" className={`lg:hidden fixed inset-x-0 top-[60px] bg-background-primary/95 border-b border-white/5 backdrop-blur-3xl transition-all duration-300 origin-top overflow-hidden z-40 ${
          isOpen ? 'scale-y-100 opacity-100 py-6' : 'scale-y-0 opacity-0 py-0 pointer-events-none'
        }`} style={{ maxHeight: 'calc(100vh - 60px)' }}>
          <div className="flex flex-col items-center gap-5 px-6 font-mono text-xs tracking-widest">
            {NAV_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                onMouseEnter={playHover}
                className={`uppercase transition-colors py-1.5 ${
                  activeSection === link.href ? 'text-white font-bold' : 'text-text-gray hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
            
            <a
              href="/New_MOHAMMED_ZAKKI_ADNAAN_P_2026-06-02.pdf"
              download="New_MOHAMMED_ZAKKI_ADNAAN_P_2026-06-02.pdf"
              onMouseEnter={playHover}
              onClick={playClick}
              className="flex items-center gap-2 px-8 py-2.5 rounded-full border border-neon-purple/20 bg-neon-purple/[0.03] text-neon-purple font-bold tracking-widest uppercase transition-all duration-300 w-full max-w-xs justify-center text-[11px] hover:bg-neon-purple hover:text-white"
            >
              <Download className="w-3.5 h-3.5" />
              DOWNLOAD RESUME
            </a>

            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              onMouseEnter={playHover}
              className="flex items-center gap-2 px-8 py-2.5 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple text-black font-bold tracking-widest uppercase transition-all duration-300 w-full max-w-xs justify-center shadow-lg text-[11px]"
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
