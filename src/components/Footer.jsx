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
    <footer className="relative bg-[#030303] border-t border-white/[0.03] py-16 px-6 overflow-hidden">
      
      {/* 1. Subtle premium glowing accent */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-purple/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Core elements grid */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pb-8 border-b border-white/[0.03]">
          
          {/* Logo brand */}
          <div className="flex flex-col items-center md:items-start space-y-2 text-center md:text-left">
            <h3 className="font-poppins text-lg font-extrabold text-white tracking-wide uppercase">
              Mohammad Zakki Adnaan
            </h3>
            <p className="text-[10px] font-mono text-neon-blue font-bold uppercase tracking-wider">
              Frontend Developer | React.js Developer
            </p>
            <a 
              href="mailto:zakkibca2023@gmail.com" 
              onClick={playClick}
              className="text-xs text-text-gray hover:text-white transition-colors font-mono"
            >
              Email: zakkibca2023@gmail.com
            </a>
          </div>

          {/* Quick social links */}
          <div className="flex gap-3">
            <a
              href="https://github.com/Zakki-05"
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClick}
              onMouseEnter={playHover}
              className="p-3 rounded-xl bg-white/[0.01] hover:bg-neon-blue hover:text-black border border-white/5 hover:border-neon-blue text-text-gray hover:scale-105 transition-all duration-300"
              title="Github direct"
              aria-label="Mohammed Zakki Adnaan's GitHub profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/mohammed-zakki-adnan-p/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClick}
              onMouseEnter={playHover}
              className="p-3 rounded-xl bg-white/[0.01] hover:bg-neon-blue hover:text-black border border-white/5 hover:border-neon-blue text-text-gray hover:scale-105 transition-all duration-300"
              title="LinkedIn direct"
              aria-label="Mohammed Zakki Adnaan's LinkedIn profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:zakkibca2023@gmail.com"
              onClick={playClick}
              onMouseEnter={playHover}
              className="p-3 rounded-xl bg-white/[0.01] hover:bg-neon-blue hover:text-black border border-white/5 hover:border-neon-blue text-text-gray hover:scale-105 transition-all duration-300"
              title="Email direct"
              aria-label="Send direct email to Mohammed Zakki Adnaan"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/mr_zakki_05/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClick}
              onMouseEnter={playHover}
              className="p-3 rounded-xl bg-white/[0.01] hover:bg-neon-blue hover:text-black border border-white/5 hover:border-neon-blue text-text-gray hover:scale-105 transition-all duration-300"
              title="Instagram direct"
              aria-label="Mohammed Zakki Adnaan's Instagram profile"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>

        </div>

        {/* Navigation list */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 font-mono text-[10px] tracking-widest uppercase">
          {NAV_LINKS.map(link => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              onMouseEnter={playHover}
              className="text-text-gray hover:text-neon-blue transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Copyright and scroll top bottom row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-6 text-[9px] font-mono text-text-gray/60 uppercase tracking-widest">
          
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-neon-blue animate-spin-slow" />
            <span>© 2026 All Rights Reserved</span>
          </div>

          <a
            href="#home"
            onClick={handleScrollTop}
            onMouseEnter={playHover}
            className="flex items-center gap-1.5 hover:text-white transition-colors duration-200"
          >
            <span>BACK TO SYSTEM ROOT</span>
            <ArrowUp className="w-3.5 h-3.5 animate-bounce" />
          </a>

        </div>

      </div>

    </footer>
  );
}
