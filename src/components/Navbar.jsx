import React, { useState, useEffect } from 'react';
import { Menu, X, Volume2, VolumeX, Sun, Moon } from 'lucide-react';
import { useSound } from './SoundManager';
import { useTheme } from '../ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');
  
  const { isMuted, toggleMute, playHover, playClick } = useSound();
  const { theme, toggleTheme } = useTheme();

  // Handle body scroll locking
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }
    return () => {
      document.body.classList.remove('mobile-menu-open');
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Detect active section on scroll
      const scrollPosition = window.scrollY + 120;
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
      const yOffset = -70;
      const y = target.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(href);
    }
  };

  return (
    <>
      {/* Floating Pill Nav Container */}
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 py-4 px-4 md:px-8`}
      >
        <div 
          className={`max-w-5xl mx-auto px-6 py-2.5 rounded-full flex justify-between items-center transition-all duration-300 ${
            scrolled 
              ? 'glass-panel shadow-[0_10px_30px_rgba(0,0,0,0.15)] scale-[0.98]' 
              : 'bg-transparent'
          }`}
        >
          {/* Logo brand */}
          <a 
            href="#home" 
            onClick={(e) => handleLinkClick(e, '#home')}
            onMouseEnter={playHover}
            className="flex items-center gap-1.5 font-sans text-sm font-black tracking-widest text-theme-text"
          >
            <span>ZAKKI</span>
            <span className="w-1.5 h-1.5 rounded-full bg-theme-accent animate-pulse-slow"></span>
            <span className="text-[9px] font-mono text-theme-textSec tracking-tighter">DEV</span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                onMouseEnter={playHover}
                className={`text-[10px] font-mono uppercase tracking-widest transition-colors py-1 ${
                  activeSection === link.href ? 'text-theme-accent font-bold' : 'text-theme-textSec hover:text-theme-text'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Utilities (Audio, Theme Toggle, Mobile Toggle) */}
          <div className="flex items-center gap-2">
            
            {/* Audio Toggle */}
            <button
              onClick={() => { toggleMute(); playClick(); }}
              onMouseEnter={playHover}
              className={`p-2 rounded-full border transition-all duration-300 relative ${
                !isMuted 
                  ? 'bg-theme-accent/5 border-theme-accent/20 text-theme-accent' 
                  : 'bg-theme-card border-theme-border text-theme-textMuted hover:border-theme-borderHover hover:text-theme-text'
              }`}
              title={isMuted ? 'Unmute BGM & SFX' : 'Mute BGM & SFX'}
              aria-label="Toggle music"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 animate-pulse" />}
            </button>

            {/* Theme Toggle Switch */}
            <button
              onClick={() => { toggleTheme(); playClick(); }}
              onMouseEnter={playHover}
              className="p-2 rounded-full border bg-theme-card border-theme-border text-theme-textSec hover:text-theme-text hover:border-theme-borderHover transition-all duration-300"
              title={theme === 'dark' ? 'Activate Light Mode' : 'Activate Dark Mode'}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-yellow-500" /> : <Moon className="w-3.5 h-3.5 text-indigo-500" />}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => { playClick(); setIsOpen(!isOpen); }}
              onMouseEnter={playHover}
              className="md:hidden p-2 rounded-full bg-theme-card border border-theme-border text-theme-text hover:bg-theme-cardHover transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
            </button>

          </div>
        </div>
      </header>

      {/* Full-screen Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-theme-bg/95 backdrop-blur-xl z-40 flex flex-col justify-center items-center md:hidden"
          >
            {/* Fine Grid Background */}
            <div className="absolute inset-0 linear-grid opacity-10 pointer-events-none"></div>

            <nav className="flex flex-col items-center gap-6 z-10 text-center font-mono">
              {NAV_LINKS.map((link, idx) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.3 }}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  onMouseEnter={playHover}
                  className={`text-sm uppercase tracking-[0.2em] transition-colors py-2 ${
                    activeSection === link.href ? 'text-theme-accent font-bold text-lg' : 'text-theme-textSec hover:text-theme-text'
                  }`}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
