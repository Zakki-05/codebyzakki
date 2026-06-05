import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../ThemeContext';

export default function Background3D() {
  const containerRef = useRef(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);

  // Sync theme changes with animation loop without re-triggering useEffect
  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // 1. Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 25;

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: containerRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 3. Build Particles (Constellation Nodes)
    const particleCount = 120;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];

    // Coordinates bounding box
    const xRange = 40;
    const yRange = 30;
    const zRange = 20;

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * xRange;
      positions[i * 3 + 1] = (Math.random() - 0.5) * yRange;
      positions[i * 3 + 2] = (Math.random() - 0.5) * zRange;

      velocities.push({
        x: (Math.random() - 0.5) * 0.03,
        y: (Math.random() - 0.5) * 0.03,
        z: (Math.random() - 0.5) * 0.03
      });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Circle sprite generator for soft points
    const createDotTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 16;
      canvas.height = 16;
      const ctx = canvas.getContext('2d');
      const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 16, 16);
      return new THREE.CanvasTexture(canvas);
    };

    const dotTexture = createDotTexture();
    const pointsMaterial = new THREE.PointsMaterial({
      size: 0.45,
      map: dotTexture,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const pointCloud = new THREE.Points(geometry, pointsMaterial);
    scene.add(pointCloud);

// Add subtle 3D centerpiece
const torusKnot = new THREE.Mesh(
  new THREE.TorusKnotGeometry(5, 1.5, 100, 16),
  new THREE.MeshStandardMaterial({
    color: themeRef.current === 'light' ? 0xdddddd : 0xffffff,
    metalness: 0.6,
    roughness: 0.4,
    transparent: true,
    opacity: 0.6,
    envMapIntensity: 0.8,
  })
);
scene.add(torusKnot);

// Lighting
const ambient = new THREE.AmbientLight(0xffffff, 0.5);
const directional = new THREE.DirectionalLight(0xffffff, 0.7);
directional.position.set(5, 5, 5);
scene.add(ambient, directional);

    // 4. Connective Lines between Nodes
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.15,
      depthWrite: false
    });

    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(particleCount * particleCount * 6);
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // 5. Parallax Mouse Tilting variables
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX - window.innerWidth / 2) * 0.015;
      targetMouseY = (e.clientY - window.innerHeight / 2) * 0.015;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 6. Handle Resizing
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 7. Animation Loop
    let animationFrameId;
    const posAttribute = geometry.getAttribute('position');

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Interpolate mouse parallax
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Rotate group
      pointCloud.rotation.y = mouseX * 0.05 + 0.01 * performance.now() * 0.001;
      pointCloud.rotation.x = mouseY * 0.05;
      lines.rotation.y = pointCloud.rotation.y;
      lines.rotation.x = pointCloud.rotation.x;

      // Update positions
      const positionsArray = posAttribute.array;
      for (let i = 0; i < particleCount; i++) {
        // Apply velocity
        positionsArray[i * 3] += velocities[i].x;
        positionsArray[i * 3 + 1] += velocities[i].y;
        positionsArray[i * 3 + 2] += velocities[i].z;

        // Boundary reflection
        if (Math.abs(positionsArray[i * 3]) > xRange / 2) velocities[i].x *= -1;
        if (Math.abs(positionsArray[i * 3 + 1]) > yRange / 2) velocities[i].y *= -1;
        if (Math.abs(positionsArray[i * 3 + 2]) > zRange / 2) velocities[i].z *= -1;
      }
      posAttribute.needsUpdate = true;

      // Rebuild lines between close points
      let lineIndex = 0;
      const linePosArray = lineGeometry.getAttribute('position').array;
      const maxDistance = 9;

      for (let i = 0; i < particleCount; i++) {
        const x1 = positionsArray[i * 3];
        const y1 = positionsArray[i * 3 + 1];
        const z1 = positionsArray[i * 3 + 2];

        for (let j = i + 1; j < particleCount; j++) {
          const x2 = positionsArray[j * 3];
          const y2 = positionsArray[j * 3 + 1];
          const z2 = positionsArray[j * 3 + 2];

          const dist = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2);
          if (dist < maxDistance) {
            linePosArray[lineIndex++] = x1;
            linePosArray[lineIndex++] = y1;
            linePosArray[lineIndex++] = z1;

            linePosArray[lineIndex++] = x2;
            linePosArray[lineIndex++] = y2;
            linePosArray[lineIndex++] = z2;
          }
        }
      }

      lineGeometry.getAttribute('position').needsUpdate = true;
      lineGeometry.setDrawRange(0, lineIndex);

      // Theme color mapping adjustment
      if (themeRef.current === 'light') {
        pointsMaterial.color.setHex(0x0284c7); // sky-600
        lineMaterial.color.setHex(0x0284c7);
        lineMaterial.opacity = 0.07;
        pointsMaterial.blending = THREE.NormalBlending;
      } else {
        pointsMaterial.color.setHex(0x38bdf8); // sky-400
        lineMaterial.color.setHex(0x38bdf8);
        lineMaterial.opacity = 0.12;
        pointsMaterial.blending = THREE.AdditiveBlending;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      lineGeometry.dispose();
// Dispose torus knot
torusKnot.geometry.dispose();
torusKnot.material.dispose();
      dotTexture.dispose();
      pointsMaterial.dispose();
      lineMaterial.dispose();
    };
  }, []);

  return (
    <canvas 
      ref={containerRef} 
      className="fixed inset-0 w-full h-full pointer-events-none z-0 block transition-all"
    />
  );
}
