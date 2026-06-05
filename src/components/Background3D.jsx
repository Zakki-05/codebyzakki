import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Background3D() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Core Variables & Dimensions
    const width = window.innerWidth;
    const height = window.innerHeight;

    // 2. Setup Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 30;

    // 3. Setup WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ 
      canvas: containerRef.current, 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 4. Generate Glowing Dot Particle Texture in-memory (to avoid external file loading)
    const createCircleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.2, 'rgba(0, 240, 255, 0.8)');
      gradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.4)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
      
      const texture = new THREE.CanvasTexture(canvas);
      texture.premultiplyAlpha = false;
      return texture;
    };

    const particleTexture = createCircleTexture();

    // 5. Generate Particles
    const particleCount = 1800;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const initialY = new Float32Array(particleCount); // For wave animation oscillation
    const speed = new Float32Array(particleCount); // Speeds for individual waves

    const colorCyan = new THREE.Color('#00f0ff');
    const colorPurple = new THREE.Color('#8b5cf6');
    const colorPink = new THREE.Color('#ec4899');

    for (let i = 0; i < particleCount; i++) {
      // Coordinate generation within a box bounds
      const x = (Math.random() - 0.5) * 80;
      const y = (Math.random() - 0.5) * 60;
      const z = (Math.random() - 0.5) * 50;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      initialY[i] = y;
      speed[i] = 0.5 + Math.random() * 2;

      // Dynamic Color blending based on placement
      const mixRatio = Math.random();
      let finalColor;
      if (mixRatio < 0.4) {
        finalColor = colorCyan;
      } else if (mixRatio < 0.8) {
        finalColor = colorPurple;
      } else {
        finalColor = colorPink;
      }

      colors[i * 3] = finalColor.r;
      colors[i * 3 + 1] = finalColor.g;
      colors[i * 3 + 2] = finalColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // 6. Particle Shader Material
    const material = new THREE.PointsMaterial({
      size: 0.65,
      sizeAttenuation: true,
      map: particleTexture,
      transparent: true,
      alphaTest: 0.001,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // 7. Mouse and Scroll Interactions
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let scrollY = 0;
    let targetScrollY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    // 8. Animation Loop
    const clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow (lerping)
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;
      
      // Smooth scroll follow (lerping)
      scrollY += (targetScrollY - scrollY) * 0.05;

      // Apply rotation based on mouse coordinates & scroll progress
      particles.rotation.y = elapsedTime * 0.02 + targetX * 0.12;
      particles.rotation.x = elapsedTime * 0.01 + targetY * 0.12;
      
      // Parallax upward slide during page scroll + ultra-lightweight GPU floating effect
      particles.position.y = (scrollY * 0.015) + (Math.sin(elapsedTime * 0.3) * 1.2);
      particles.position.x = Math.cos(elapsedTime * 0.2) * 0.8;



      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 9. Window Resize Management
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      
      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    // 10. Clean-up WebGL instances on Unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      
      geometry.dispose();
      material.dispose();
      particleTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas 
      ref={containerRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[1] opacity-60 bg-transparent"
    />
  );
}
