import React from 'react';
import { Github, Linkedin, Mail, Instagram, ArrowUp, Sparkles } from 'lucide-react';
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

export default function Footer() {
  const { playHover, playClick } = useSound();

  const handleScrollTop = (e) => {
    e.preventDefault();
    playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    playClick();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-[#050505] border-t border-white/5 py-12 px-6 overflow-hidden">
      
      {/* 1. Futuristic top glowing line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-blue to-transparent opacity-60 shadow-[0_0_15px_rgba(0,240,255,0.4)] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        
        {/* Core elements grid */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Logo brand */}
          <div className="flex flex-col items-center md:items-start space-y-2">
            <a 
              href="#home"
              onClick={handleScrollTop}
              onMouseEnter={playHover}
              className="flex items-center gap-2 font-poppins text-lg font-black tracking-widest text-white uppercase"
            >
              <span>ZAKKI</span>
              <span className="w-1.5 h-1.5 rounded-full bg-neon-blue animate-pulse"></span>
              <span className="text-[10px] font-mono text-neon-purple">DEV</span>
            </a>
            <p className="text-[10px] font-mono text-text-gray uppercase tracking-widest">
              Pernambut, Tamil Nadu, India
            </p>
          </div>

          {/* Quick social links */}
          <div className="flex gap-4">
            <a
              href="https://github.com/Zakki-05"
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClick}
              onMouseEnter={playHover}
              className="p-2.5 rounded-lg bg-white/5 hover:bg-neon-blue hover:text-black border border-white/5 hover:border-neon-blue text-text-gray hover:scale-110 transition-all"
              title="Github direct"
            >
              <Github className="w-4.5 h-4.5" />
            </a>
            <a
              href="https://www.linkedin.com/in/mohammed-zakki-adnan-p/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClick}
              onMouseEnter={playHover}
              className="p-2.5 rounded-lg bg-white/5 hover:bg-neon-blue hover:text-black border border-white/5 hover:border-neon-blue text-text-gray hover:scale-110 transition-all"
              title="LinkedIn direct"
            >
              <Linkedin className="w-4.5 h-4.5" />
            </a>
            <a
              href="mailto:zakkibca2023@gmail.com"
              onClick={playClick}
              onMouseEnter={playHover}
              className="p-2.5 rounded-lg bg-white/5 hover:bg-neon-blue hover:text-black border border-white/5 hover:border-neon-blue text-text-gray hover:scale-110 transition-all"
              title="Email direct"
            >
              <Mail className="w-4.5 h-4.5" />
            </a>
            <a
              href="https://www.instagram.com/mr_zakki_05/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClick}
              onMouseEnter={playHover}
              className="p-2.5 rounded-lg bg-white/5 hover:bg-neon-blue hover:text-black border border-white/5 hover:border-neon-blue text-text-gray hover:scale-110 transition-all"
              title="Instagram direct"
            >
              <Instagram className="w-4.5 h-4.5" />
            </a>
          </div>

        </div>

        {/* Navigation list */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 pt-6 border-t border-white/5 font-mono text-[10px] tracking-wider uppercase">
          {NAV_LINKS.map(link => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              onMouseEnter={playHover}
              className="text-text-gray hover:text-neon-blue transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Copyright and scroll top bottom row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-6 text-[10px] font-mono text-text-gray uppercase tracking-wider">
          
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-neon-blue animate-spin-slow" />
            <span>Designed & Developed by Mohammed Zakki Adnaan P</span>
          </div>

          <a
            href="#home"
            onClick={handleScrollTop}
            onMouseEnter={playHover}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 animate-bounce" />
          </a>

        </div>

      </div>

    </footer>
  );
}
