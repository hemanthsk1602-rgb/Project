'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface LeaderboardGlobe3DProps {
  className?: string;
  totalCompetitors?: number;
}

export function LeaderboardGlobe3D({
  className = '',
  totalCompetitors = 14820,
}: LeaderboardGlobe3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

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

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 260;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 2, 16);

    const isLightMode = document.documentElement.classList.contains('light');

    // Root Group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 1. Holographic Wireframe Core Sphere
    const sphereRadius = 4.2;
    const sphereGeo = new THREE.SphereGeometry(sphereRadius, 20, 20);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: isLightMode ? 0x6366f1 : 0x818cf8,
      wireframe: true,
      transparent: true,
      opacity: isLightMode ? 0.2 : 0.25,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(sphereMesh);

    // 2. Inner Glowing Core
    const innerCoreGeo = new THREE.IcosahedronGeometry(2.2, 2);
    const innerCoreMat = new THREE.MeshBasicMaterial({
      color: isLightMode ? 0x4f46e5 : 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: isLightMode ? 0.35 : 0.45,
    });
    const innerCoreMesh = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    globeGroup.add(innerCoreMesh);

    // 3. Latitude and Longitude Rings
    const ringMat = new THREE.LineBasicMaterial({
      color: isLightMode ? 0x4f46e5 : 0x38bdf8,
      transparent: true,
      opacity: 0.35,
    });

    const createCircle = (radius: number, yOffset: number) => {
      const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, 2 * Math.PI, false, 0);
      const points = curve.getPoints(48);
      const geo = new THREE.BufferGeometry().setFromPoints(
        points.map((p) => new THREE.Vector3(p.x, yOffset, p.y))
      );
      return new THREE.Line(geo, ringMat);
    };

    globeGroup.add(createCircle(sphereRadius * 0.98, 0));
    globeGroup.add(createCircle(sphereRadius * 0.85, 2.0));
    globeGroup.add(createCircle(sphereRadius * 0.85, -2.0));

    // 4. Competitor Node Pins Scattered Around Globe
    const pinCount = 80;
    const pinGroup = new THREE.Group();
    globeGroup.add(pinGroup);

    const pinColors = [
      0xf43f5e, // Grandmaster Rose
      0xf59e0b, // Master Amber
      0xc084fc, // Candidate Master Purple
      0x38bdf8, // Expert Cyan
      0x34d399, // Specialist Emerald
    ];

    const pinGeos: THREE.BufferGeometry[] = [];
    const pinMats: THREE.Material[] = [];

    for (let i = 0; i < pinCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / pinCount);
      const theta = Math.sqrt(pinCount * Math.PI) * phi;

      const r = sphereRadius + 0.15;
      const x = r * Math.cos(theta) * Math.sin(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.cos(phi);

      const color = pinColors[i % pinColors.length];
      const pinMat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.85,
      });
      pinMats.push(pinMat);

      const pinGeo = new THREE.SphereGeometry(0.12, 8, 8);
      pinGeos.push(pinGeo);

      const pinMesh = new THREE.Mesh(pinGeo, pinMat);
      pinMesh.position.set(x, y, z);
      pinGroup.add(pinMesh);

      // Radial connecting spike
      const spikePts = [new THREE.Vector3(x * 0.9, y * 0.9, z * 0.9), new THREE.Vector3(x, y, z)];
      const spikeGeo = new THREE.BufferGeometry().setFromPoints(spikePts);
      pinGeos.push(spikeGeo);
      const spikeMat = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.4,
      });
      pinMats.push(spikeMat);
      pinGroup.add(new THREE.Line(spikeGeo, spikeMat));
    }

    // 5. Orbiting Astrolabe Rings
    const orbitRingGeo = new THREE.TorusGeometry(6.0, 0.04, 16, 80);
    const orbitRingMat = new THREE.MeshBasicMaterial({
      color: isLightMode ? 0x6366f1 : 0xa855f7,
      transparent: true,
      opacity: 0.5,
    });
    const orbitRing = new THREE.Mesh(orbitRingGeo, orbitRingMat);
    orbitRing.rotation.x = Math.PI / 3;
    globeGroup.add(orbitRing);

    // Orbiting Satellite Node
    const satGeo = new THREE.SphereGeometry(0.24, 12, 12);
    const satMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.95,
    });
    const satellite = new THREE.Mesh(satGeo, satMat);
    orbitRing.add(satellite);

    // 6. Ambient Particle Cloud
    const cloudCount = 120;
    const cloudGeo = new THREE.BufferGeometry();
    const cloudPos = new Float32Array(cloudCount * 3);

    for (let i = 0; i < cloudCount * 3; i += 3) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 2.5 + 4.5;
      const sinPhi = Math.sin(phi);

      cloudPos[i] = r * sinPhi * Math.cos(theta);
      cloudPos[i + 1] = r * sinPhi * Math.sin(theta);
      cloudPos[i + 2] = r * Math.cos(phi);
    }

    cloudGeo.setAttribute('position', new THREE.BufferAttribute(cloudPos, 3));
    const cloudMat = new THREE.PointsMaterial({
      color: isLightMode ? 0x818cf8 : 0xc084fc,
      size: 0.12,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const cloudPoints = new THREE.Points(cloudGeo, cloudMat);
    scene.add(cloudPoints);

    // Interactive Drag Controls
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotationY = 0;
    let targetRotationX = 0.2;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousMousePosition = { x: clientX, y: clientY };
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - previousMousePosition.x;
      const deltaY = clientY - previousMousePosition.y;

      targetRotationY += deltaX * 0.008;
      targetRotationX = Math.max(-0.5, Math.min(0.5, targetRotationX + deltaY * 0.008));

      previousMousePosition = { x: clientX, y: clientY };
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    dom.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (!isDragging) {
        targetRotationY += 0.004;
      }

      globeGroup.rotation.y += (targetRotationY - globeGroup.rotation.y) * 0.08;
      globeGroup.rotation.x += (targetRotationX - globeGroup.rotation.x) * 0.08;

      innerCoreMesh.rotation.y -= 0.006;
      innerCoreMesh.rotation.z += 0.004;

      // Orbit satellite position
      const satAngle = elapsedTime * 1.5;
      satellite.position.x = Math.cos(satAngle) * 6.0;
      satellite.position.y = Math.sin(satAngle) * 6.0;

      // Ambient cloud counter-rotation
      cloudPoints.rotation.y -= 0.001;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      dom.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Line || obj instanceof THREE.Points) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material?.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div className={`relative rounded-xl overflow-hidden border border-white/[0.08] bg-[#070A12] ${className}`}>
      <div ref={mountRef} className="w-full h-64 cursor-grab active:cursor-grabbing" />

      {/* 3D Telemetry Overlays */}
      <div className="absolute top-3 left-3 z-20 pointer-events-none flex items-center gap-2">
        <div className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/[0.1] text-[11px] font-mono text-zinc-300">
          <span className="text-zinc-500 mr-1.5">Globe:</span>
          <span className="text-brand-400 font-semibold">Live Competitor Mesh</span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-brand-500/10 border border-brand-500/20 text-[10px] font-mono text-brand-300">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
          <span>{totalCompetitors.toLocaleString()} Global Nodes</span>
        </div>
      </div>

      <div className="absolute bottom-3 left-3 right-3 z-20 pointer-events-none flex items-center justify-between text-[10px] font-mono text-zinc-500">
        <div className="flex items-center gap-2 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/[0.08]">
          <span className="flex items-center gap-1 text-rose-400">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> GM
          </span>
          <span className="flex items-center gap-1 text-amber-400">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Master
          </span>
          <span className="flex items-center gap-1 text-purple-400">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> CM
          </span>
          <span className="flex items-center gap-1 text-cyan-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" /> Expert
          </span>
        </div>
        <span className="bg-black/60 px-2 py-0.5 rounded border border-white/[0.06] hidden sm:inline">
          Drag to Rotate Orb
        </span>
      </div>
    </div>
  );
}

