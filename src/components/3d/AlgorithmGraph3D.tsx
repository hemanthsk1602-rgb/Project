'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface AlgorithmGraph3DProps {
  className?: string;
}

export function AlgorithmGraph3D({ className = '' }: AlgorithmGraph3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<string>('Root: Balance O(log n)');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
    } catch {
      return;
    }

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 320;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.z = 14;

    const isLightMode = document.documentElement.classList.contains('light');

    // 3D Tree / Graph Data Structure Nodes
    const graphGroup = new THREE.Group();
    scene.add(graphGroup);

    // Node definitions: balanced AVL / Red-Black Tree in 3D
    const nodes = [
      { id: 1, label: 'Root (42)', pos: [0, 3, 0], color: isLightMode ? 0x4f46e5 : 0x818cf8 },
      { id: 2, label: 'Left (21)', pos: [-2.8, 1, 1], color: isLightMode ? 0x047857 : 0x34d399 },
      { id: 3, label: 'Right (68)', pos: [2.8, 1, -1], color: isLightMode ? 0x4f46e5 : 0x818cf8 },
      { id: 4, label: 'L-L (12)', pos: [-4.2, -1.2, 1.8], color: isLightMode ? 0x047857 : 0x34d399 },
      { id: 5, label: 'L-R (30)', pos: [-1.4, -1.2, 0.2], color: isLightMode ? 0x047857 : 0x34d399 },
      { id: 6, label: 'R-L (55)', pos: [1.4, -1.2, -0.2], color: isLightMode ? 0xb45309 : 0xfbbf24 },
      { id: 7, label: 'R-R (89)', pos: [4.2, -1.2, -1.8], color: isLightMode ? 0xbe123c : 0xf43f5e },
    ];

    const edges = [
      [1, 2], [1, 3],
      [2, 4], [2, 5],
      [3, 6], [3, 7],
    ];

    // Create edge lines with glowing glow
    const edgeMaterial = new THREE.LineBasicMaterial({
      color: isLightMode ? 0x6366f1 : 0xa5b4fc,
      transparent: true,
      opacity: isLightMode ? 0.45 : 0.6,
      linewidth: 2,
    });

    edges.forEach(([fromId, toId]) => {
      const fromNode = nodes.find((n) => n.id === fromId)!;
      const toNode = nodes.find((n) => n.id === toId)!;

      const points = [
        new THREE.Vector3(...fromNode.pos as [number, number, number]),
        new THREE.Vector3(...toNode.pos as [number, number, number]),
      ];
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(lineGeo, edgeMaterial);
      graphGroup.add(line);
    });

    // Create 3D node spheres and outer rings
    const sphereGeo = new THREE.SphereGeometry(0.5, 24, 24);
    const ringGeo = new THREE.RingGeometry(0.65, 0.75, 24);

    nodes.forEach((node) => {
      const nodeMat = new THREE.MeshBasicMaterial({
        color: node.color,
      });
      const sphere = new THREE.Mesh(sphereGeo, nodeMat);
      sphere.position.set(...node.pos as [number, number, number]);
      graphGroup.add(sphere);

      // Orbital Halo ring around each node
      const ringMat = new THREE.MeshBasicMaterial({
        color: node.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(...node.pos as [number, number, number]);
      ring.rotation.x = Math.PI / 2;
      graphGroup.add(ring);
    });

    // Interactive Dragging & Parallax
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      graphGroup.rotation.y += deltaX * 0.008;
      graphGroup.rotation.x += deltaY * 0.008;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Animation Loop
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      if (!isDragging) {
        graphGroup.rotation.y = Math.sin(time * 0.4) * 0.35;
        graphGroup.rotation.x = Math.cos(time * 0.3) * 0.15;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 320;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      sphereGeo.dispose();
      ringGeo.dispose();
      edgeMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className={`relative rounded-2xl bg-[#080C14] border border-white/[0.08] overflow-hidden ${className}`}>
      {/* 3D Header Bar */}
      <div className="h-10 px-4 border-b border-white/[0.07] bg-[#060910] flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono text-zinc-300 font-medium">
            3D Balanced AVL Tree Spatial Graph
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500">
          <span>Click & Drag to Rotate</span>
        </div>
      </div>

      {/* WebGL Canvas Container */}
      <div 
        ref={mountRef} 
        className="w-full h-80 cursor-grab active:cursor-grabbing relative"
      />

      {/* Floating 3D Telemetry Overlay Badge */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-2 rounded-lg bg-[#070B13]/85 backdrop-blur-sm border border-white/[0.08] text-[11px] font-mono text-zinc-400">
        <div className="flex items-center gap-3">
          <span className="text-brand-400 font-semibold">Nodes: 7</span>
          <span>Depth: 3</span>
          <span className="text-emerald-400">Invariant: Balanced</span>
        </div>
        <span className="text-zinc-500 text-[10px]">Rotations: 0 (Optimal)</span>
      </div>
    </div>
  );
}

