import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState('default');
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Position coordinates of mouse
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring settings for the smooth trailing effect
  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Detect mobile/touch devices
    const checkDevice = () => {
      const mobile = 
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        window.matchMedia('(max-width: 768px)').matches ||
        ('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0);
      setIsMobile(mobile);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(prev => {
        if (!prev) return true;
        return prev;
      });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Dynamic Hover listeners for special elements
    const handleMouseOver = (e) => {
      // Traverse up to find if parent has cursor settings
      let target = e.target;
      let cursorAttr = null;
      let textAttr = null;

      while (target && target !== document.body) {
        if (target.getAttribute('data-cursor')) {
          cursorAttr = target.getAttribute('data-cursor');
          textAttr = target.getAttribute('data-cursor-text') || '';
          break;
        }
        target = target.parentElement;
      }

      if (cursorAttr) {
        setCursorType(cursorAttr);
        setCursorText(textAttr);
      } else {
        // Match standard links or buttons
        const isClickable = 
          e.target.tagName === 'A' || 
          e.target.tagName === 'BUTTON' || 
          e.target.closest('a') || 
          e.target.closest('button') ||
          e.target.getAttribute('role') === 'button';
          
        if (isClickable) {
          setCursorType('pointer');
          setCursorText('');
        } else {
          setCursorType('default');
          setCursorText('');
        }
      }
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (isMobile) return null;

  // Custom Cursor styling definitions based on active hover states
  const variants = {
    default: {
      width: 32,
      height: 32,
      backgroundColor: 'rgba(0, 0, 0, 0)',
      borderColor: 'rgba(0, 240, 255, 0.4)',
      borderWidth: 2,
    },
    pointer: {
      width: 48,
      height: 48,
      backgroundColor: 'rgba(0, 240, 255, 0.08)',
      borderColor: 'rgba(139, 92, 246, 0.8)',
      borderWidth: 1,
      scale: 1.2
    },
    view: {
      width: 80,
      height: 80,
      backgroundColor: 'rgba(0, 240, 255, 0.95)',
      borderColor: 'rgba(255, 255, 255, 1)',
      borderWidth: 0,
      mixBlendMode: 'difference'
    },
    play: {
      width: 90,
      height: 90,
      backgroundColor: 'rgba(139, 92, 246, 0.9)',
      borderColor: 'rgba(255, 255, 255, 0.8)',
      borderWidth: 0,
    },
    contact: {
      width: 70,
      height: 70,
      backgroundColor: 'rgba(236, 72, 153, 0.1)',
      borderColor: 'rgba(236, 72, 153, 0.8)',
      borderWidth: 2,
      borderStyle: 'dashed'
    }
  };

  const activeVariant = variants[cursorType] || variants.default;

  return (
    <>
      {/* 1. Core cursor tracking dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-neon-blue rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2"
        style={{ x: cursorX, y: cursorY, display: isVisible ? 'block' : 'none' }}
      />

      {/* 2. Trailing glowing interactive ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center -translate-x-1/2 -translate-y-1/2 border-solid"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          display: isVisible ? 'flex' : 'none',
        }}
        animate={{
          width: activeVariant.width,
          height: activeVariant.height,
          backgroundColor: activeVariant.backgroundColor,
          borderColor: activeVariant.borderColor,
          borderWidth: activeVariant.borderWidth,
          borderStyle: activeVariant.borderStyle || 'solid',
          scale: activeVariant.scale || 1
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25, mass: 0.5 }}
      >
        {/* Dynamic Interactive text indicator inside the cursor */}
        {cursorText && (
          <span 
            className={`text-[10px] font-bold tracking-[0.2em] font-poppins text-center select-none uppercase ${
              cursorType === 'view' ? 'text-black' : 'text-white'
            }`}
          >
            {cursorText}
          </span>
        )}
      </motion.div>
    </>
  );
}
