'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export function Hero3DScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 600;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 24;
    camera.position.y = 1;

    // Detect theme for dynamic material colors
    const isLightMode = document.documentElement.classList.contains('light');

    // 1. Central Algorithmic Crystal Group
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Primary Icosahedron (Outer Wireframe)
    const outerGeo = new THREE.IcosahedronGeometry(4.2, 1);
    const outerWireMat = new THREE.MeshBasicMaterial({
      color: isLightMode ? 0x6366f1 : 0x818cf8,
      wireframe: true,
      transparent: true,
      opacity: isLightMode ? 0.35 : 0.45,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerWireMat);
    coreGroup.add(outerMesh);

    // Inner Dodecahedron (Secondary Structure)
    const innerGeo = new THREE.DodecahedronGeometry(2.6, 0);
    const innerWireMat = new THREE.MeshBasicMaterial({
      color: isLightMode ? 0x4f46e5 : 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: isLightMode ? 0.5 : 0.65,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerWireMat);
    coreGroup.add(innerMesh);

    // Luminous Nucleus Core
    const coreSphereGeo = new THREE.SphereGeometry(1.2, 24, 24);
    const coreSphereMat = new THREE.MeshBasicMaterial({
      color: isLightMode ? 0x4338ca : 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: isLightMode ? 0.6 : 0.8,
    });
    const coreSphere = new THREE.Mesh(coreSphereGeo, coreSphereMat);
    coreGroup.add(coreSphere);

    // Vertex Halo Points
    const vertGeo = new THREE.IcosahedronGeometry(4.2, 1);
    const vertMat = new THREE.PointsMaterial({
      color: isLightMode ? 0x4338ca : 0xc084fc,
      size: isLightMode ? 0.18 : 0.22,
      transparent: true,
      opacity: 0.9,
    });
    const vertPoints = new THREE.Points(vertGeo, vertMat);
    coreGroup.add(vertPoints);

    // 2. Dual Orbiting Astrolabe Data Rings
    const ring1Geo = new THREE.TorusGeometry(6.2, 0.04, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: isLightMode ? 0x6366f1 : 0xa855f7,
      transparent: true,
      opacity: isLightMode ? 0.4 : 0.5,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(7.2, 0.03, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: isLightMode ? 0x0284c7 : 0x38bdf8,
      transparent: true,
      opacity: isLightMode ? 0.35 : 0.45,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = Math.PI / 6;
    coreGroup.add(ring2);

    // 3. Floating 3D Data Constellation (Graph Nodes)
    const particleCount = 280;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      const radius = 6 + Math.random() * 14;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);

      particleSpeeds.push({
        x: (Math.random() - 0.5) * 0.004,
        y: (Math.random() - 0.5) * 0.004,
        z: (Math.random() - 0.5) * 0.004,
      });
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: isLightMode ? 0x6366f1 : 0x818cf8,
      size: isLightMode ? 0.12 : 0.14,
      transparent: true,
      opacity: isLightMode ? 0.5 : 0.75,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 4. Mouse Interactive Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (e.clientX - windowHalfX) * 0.0008;
      mouseY = (e.clientY - windowHalfY) * 0.0008;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 5. Resize Handling
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 600;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 6. Animation Loop with smooth LERP damping
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow
      targetRotationY += (mouseX - targetRotationY) * 0.05;
      targetRotationX += (mouseY - targetRotationX) * 0.05;

      coreGroup.rotation.y = elapsedTime * 0.18 + targetRotationY * 2;
      coreGroup.rotation.x = Math.sin(elapsedTime * 0.12) * 0.2 + targetRotationX * 1.5;
      coreGroup.rotation.z = Math.cos(elapsedTime * 0.15) * 0.1;

      // Pulse the nucleus slightly
      const pulse = 1 + Math.sin(elapsedTime * 2.5) * 0.08;
      coreSphere.scale.set(pulse, pulse, pulse);

      // Rotate counter-rings
      ring1.rotation.z = elapsedTime * 0.25;
      ring2.rotation.x = Math.PI / 6 + elapsedTime * 0.2;

      // Drift particles gently
      particleSystem.rotation.y = elapsedTime * 0.03;
      particleSystem.rotation.x = Math.sin(elapsedTime * 0.02) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      outerGeo.dispose();
      outerWireMat.dispose();
      innerGeo.dispose();
      innerWireMat.dispose();
      coreSphereGeo.dispose();
      coreSphereMat.dispose();
      vertGeo.dispose();
      vertMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  if (!mounted) return null;

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-80 dark:opacity-90 transition-opacity duration-700"
      style={{ perspective: 1200 }}
      aria-hidden="true"
    />
  );
}

