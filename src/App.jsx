import React, { useState, useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import Background3D from './components/Background3D';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import TechnicalHighlights from './components/TechnicalHighlights';
import ReelShowcase from './components/ReelShowcase';
import FeaturedProject from './components/FeaturedProject';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer';
import { SoundProvider } from './components/SoundManager';

// Secondary wrapper component to allow using Sound Context internally
function CoreApp() {
  const [isLoading, setIsLoading] = useState(true);

  // Initialize Lenis Liquid Smooth Scroll on mount
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard easeOutExpo
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
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
    <>
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <div className="relative min-h-screen bg-background-primary overflow-hidden transition-opacity duration-700 opacity-100">
          
          {/* Awwwards-level interactive cursor indicator */}
          <CustomCursor />
          
          {/* Performance optimized 3D particle landscape backdrop */}
          <Background3D />
          
          {/* Standard Navigation layout */}
          <Navbar />
          
          {/* Scrolling UI Blocks */}
          <main className="relative z-10">
            <Hero />
            <About />
            <Skills />
            <TechnicalHighlights />
            <ReelShowcase />
            <FeaturedProject />
            <Projects />
            <Experience />
            <Services />
            <Testimonials />
            <Contact />
          </main>
          
          {/* High-end minimalist footer */}
          <Footer />
          
        </div>
      )}
    </>
  );
}

export default function App() {
  return (
    <SoundProvider>
      <CoreApp />
    </SoundProvider>
  );
}
