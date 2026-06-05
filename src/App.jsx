import React, { useState, useEffect, Suspense } from 'react';
import Lenis from '@studio-freight/lenis';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { SoundProvider } from './components/SoundManager';
import { ThemeProvider, useTheme } from './ThemeContext';

// Dynamic lazy loaded chunks for optimal mobile bundle size and performance
const CustomCursor = React.lazy(() => import('./components/CustomCursor'));

const About = React.lazy(() => import('./components/About'));
const Skills = React.lazy(() => import('./components/Skills'));
const Projects = React.lazy(() => import('./components/Projects'));
const Experience = React.lazy(() => import('./components/Experience'));
const Achievements = React.lazy(() => import('./components/Achievements'));
const Contact = React.lazy(() => import('./components/Contact'));
const Footer = React.lazy(() => import('./components/Footer'));

function CoreApp() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { theme } = useTheme();

  // Viewport monitor for mobile checks
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        window.innerWidth < 768
      );
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Track scroll progress percentage
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentPercent = (window.scrollY / totalScroll) * 100;
        setScrollProgress(currentPercent);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize Lenis Liquid Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      smoothTouch: false,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-theme-bg text-theme-text overflow-hidden transition-colors duration-500">
      
      {/* Scroll progress bar */}
      <div 
        className="scroll-progress-bar" 
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Interactive cursor */}
      <Suspense fallback={null}>
        <CustomCursor />
      </Suspense>
      
      {/* Standard Navigation layout */}
      <Navbar />
      
      {/* Scrolling UI Blocks */}
      <main className="relative z-10 linear-grid">
        <Hero />
        
        <Suspense fallback={
          <div className="min-h-screen bg-transparent flex items-center justify-center font-mono text-xs text-theme-textSec">
            // MOUNTING_CORE_COMPONENTS...
          </div>
        }>
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Achievements />
          <Contact />
        </Suspense>
      </main>
      
      {/* High-end minimalist footer */}
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <SoundProvider>
        <Suspense fallback={
          <div className="min-h-screen bg-[#020617] flex items-center justify-center font-mono text-xs text-slate-500">
            // BOOTING_SYSTEM_SHELL...
          </div>
        }>
          <CoreApp />
        </Suspense>
      </SoundProvider>
    </ThemeProvider>
  );
}
