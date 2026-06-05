import React from 'react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { useSound } from './SoundManager';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Achievements', href: '#achievements' },
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
      const yOffset = -70;
      const y = target.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-transparent border-t border-theme-border/60 py-16 px-6 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-theme-accent/25 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        
        {/* Core elements grid */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pb-8 border-b border-theme-border/60">
          
          {/* Logo brand */}
          <div className="flex flex-col items-center md:items-start space-y-2 text-center md:text-left">
            <h3 className="text-base font-extrabold text-theme-text font-sans uppercase">
              Mohammad Zakki Adnaan
            </h3>
            <p className="text-[10px] font-mono text-theme-accent font-bold uppercase tracking-wider">
              Frontend Developer & React Developer
            </p>
            <a 
              href="mailto:zakkibca2023@gmail.com" 
              onClick={playClick}
              className="text-xs text-theme-textSec hover:text-theme-text transition-colors font-mono"
            >
              zakkibca2023@gmail.com
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
              className="p-2.5 rounded-full bg-theme-bgSec border border-theme-border text-theme-textSec hover:text-theme-accent hover:border-theme-borderHover transition-all duration-300"
              title="Github"
              aria-label="GitHub profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/mohammed-zakki-adnan-p/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClick}
              onMouseEnter={playHover}
              className="p-2.5 rounded-full bg-theme-bgSec border border-theme-border text-theme-textSec hover:text-theme-accent hover:border-theme-borderHover transition-all duration-300"
              title="LinkedIn"
              aria-label="LinkedIn profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:zakkibca2023@gmail.com"
              onClick={playClick}
              onMouseEnter={playHover}
              className="p-2.5 rounded-full bg-theme-bgSec border border-theme-border text-theme-textSec hover:text-theme-accent hover:border-theme-borderHover transition-all duration-300"
              title="Email"
              aria-label="Email address"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

        </div>

        {/* Bottom copyright details and Scroll top */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 font-mono text-[9px] text-theme-textMuted uppercase tracking-widest">
          
          <div className="flex flex-wrap justify-center gap-6">
            {NAV_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                onMouseEnter={playHover}
                className="hover:text-theme-text transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} ZAKKI_DEV // ALL LOGS SECURED</span>
            
            <button
              onClick={handleScrollTop}
              onMouseEnter={playHover}
              className="p-2 rounded-full border border-theme-border hover:border-theme-borderHover text-theme-textSec hover:text-theme-text transition-all duration-300"
              title="Scroll to Top"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
}
