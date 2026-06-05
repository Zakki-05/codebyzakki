import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState('default');
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 35, stiffness: 380, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
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
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    const handleMouseOver = (e) => {
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
  }, [isVisible]);

  if (isMobile) return null;

  const variants = {
    default: {
      width: 28,
      height: 28,
      backgroundColor: 'rgba(0, 0, 0, 0)',
      borderColor: 'var(--accent)',
      borderWidth: 1.5,
    },
    pointer: {
      width: 44,
      height: 44,
      backgroundColor: 'var(--accent-glow)',
      borderColor: 'var(--accent-secondary)',
      borderWidth: 1,
      scale: 1.15
    },
    view: {
      width: 76,
      height: 76,
      backgroundColor: 'var(--accent)',
      borderColor: '#ffffff',
      borderWidth: 0,
      mixBlendMode: 'difference'
    },
    play: {
      width: 80,
      height: 80,
      backgroundColor: 'var(--accent-secondary)',
      borderColor: '#ffffff',
      borderWidth: 0,
    }
  };

  const activeVariant = variants[cursorType] || variants.default;

  return (
    <>
      {/* 1. Core tracking dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-theme-accent rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2"
        style={{ x: cursorX, y: cursorY, display: isVisible ? 'block' : 'none' }}
      />

      {/* 2. Trailing ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
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
          borderStyle: 'solid',
          scale: activeVariant.scale || 1
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25, mass: 0.5 }}
      >
        {cursorText && (
          <span 
            className={`text-[9px] font-mono tracking-widest text-center select-none uppercase font-bold ${
              cursorType === 'view' ? 'text-black' : 'text-theme-text'
            }`}
          >
            {cursorText}
          </span>
        )}
      </motion.div>
    </>
  );
}
