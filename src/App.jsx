import React, { useState, useEffect, Suspense } from 'react';
import Lenis from '@studio-freight/lenis';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { SoundProvider } from './components/SoundManager';

// Dynamic lazy loaded chunks for optimal mobile bundle size
const CustomCursor = React.lazy(() => import('./components/CustomCursor'));
const Background3D = React.lazy(() => import('./components/Background3D'));
const About = React.lazy(() => import('./components/About'));
const Skills = React.lazy(() => import('./components/Skills'));
const TechnicalHighlights = React.lazy(() => import('./components/TechnicalHighlights'));
const ReelShowcase = React.lazy(() => import('./components/ReelShowcase'));
const FeaturedProject = React.lazy(() => import('./components/FeaturedProject'));
const Projects = React.lazy(() => import('./components/Projects'));
const GithubContributions = React.lazy(() => import('./components/GithubContributions'));
const Experience = React.lazy(() => import('./components/Experience'));
const Achievements = React.lazy(() => import('./components/Achievements'));
const Services = React.lazy(() => import('./components/Services'));
const Testimonials = React.lazy(() => import('./components/Testimonials'));
const Contact = React.lazy(() => import('./components/Contact'));
const Footer = React.lazy(() => import('./components/Footer'));

// Secondary wrapper component to allow using Sound Context internally
function CoreApp() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);



  // Initialize mobile device viewport checking
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
          <Suspense fallback={null}>
            <CustomCursor />
          </Suspense>
          
          {/* Performance optimized 3D particle landscape backdrop (skipped on mobile) */}
          {!isMobile && (
            <Suspense fallback={null}>
              <Background3D />
            </Suspense>
          )}
          
          {/* Standard Navigation layout */}
          <Navbar />
          
          {/* Scrolling UI Blocks */}
          <main className="relative z-10">
            <Hero />
            <Suspense fallback={<div className="min-h-screen bg-[#030303] flex items-center justify-center font-mono text-[10px] text-text-gray/40">ZAKKI_CORE // LOADING_SECTION...</div>}>
              <About />
              <Skills />
              <TechnicalHighlights />
              <ReelShowcase />
              <FeaturedProject />
              <Projects />
              <GithubContributions />
              <Experience />
              <Achievements />
              <Services />
              <Testimonials />
              <Contact />
            </Suspense>
          </main>
          
          {/* High-end minimalist footer */}
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
          
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
