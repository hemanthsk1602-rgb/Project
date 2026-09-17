'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ComplexitySurface3DProps {
  currentBigO?: string;
  targetBigO?: string;
  className?: string;
}

export function ComplexitySurface3D({
  currentBigO = 'O(n²)',
  targetBigO = 'O(n)',
  className = '',
}: ComplexitySurface3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeView, setActiveView] = useState<'3d' | 'top'>('3d');

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

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 340;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(16, 12, 20);
    camera.lookAt(0, 2, 0);

    const isLightMode = document.documentElement.classList.contains('light');

    // Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 1. Perspective Base Grid
    const gridHelper = new THREE.GridHelper(
      24,
      24,
      isLightMode ? 0x818cf8 : 0x6366f1,
      isLightMode ? 0xd1d5db : 0x1e293b
    );
    gridHelper.position.y = -1.5;
    rootGroup.add(gridHelper);

    // 2. Coordinate Axis Plinths
    const axisGroup = new THREE.Group();
    rootGroup.add(axisGroup);

    // X Axis (Input Size N)
    const xPoints = [new THREE.Vector3(-10, -1.5, 0), new THREE.Vector3(12, -1.5, 0)];
    const xGeo = new THREE.BufferGeometry().setFromPoints(xPoints);
    const xMat = new THREE.LineBasicMaterial({
      color: isLightMode ? 0x4f46e5 : 0xa855f7,
      transparent: true,
      opacity: 0.6,
    });
    axisGroup.add(new THREE.Line(xGeo, xMat));

    // Y Axis (Execution Operations T)
    const yPoints = [new THREE.Vector3(-10, -1.5, 0), new THREE.Vector3(-10, 10, 0)];
    const yGeo = new THREE.BufferGeometry().setFromPoints(yPoints);
    const yMat = new THREE.LineBasicMaterial({
      color: isLightMode ? 0x10b981 : 0x34d399,
      transparent: true,
      opacity: 0.6,
    });
    axisGroup.add(new THREE.Line(yGeo, yMat));

    // 3. Mathematical Curves
    // A) O(1) Constant
    const c1Points: THREE.Vector3[] = [];
    for (let x = -10; x <= 10; x += 0.5) {
      c1Points.push(new THREE.Vector3(x, -1.0, 0));
    }
    const c1Geo = new THREE.BufferGeometry().setFromPoints(c1Points);
    const c1Mat = new THREE.LineBasicMaterial({
      color: 0x10b981,
      linewidth: 2,
    });
    rootGroup.add(new THREE.Line(c1Geo, c1Mat));

    // B) O(log n)
    const cLogPoints: THREE.Vector3[] = [];
    for (let x = -9.5; x <= 10; x += 0.5) {
      const normX = (x + 10) / 20; // 0 to 1
      const yVal = -1.5 + Math.log(1 + normX * 9) * 1.6;
      cLogPoints.push(new THREE.Vector3(x, yVal, -1));
    }
    const cLogGeo = new THREE.BufferGeometry().setFromPoints(cLogPoints);
    const cLogMat = new THREE.LineBasicMaterial({
      color: 0x06b6d4,
      linewidth: 2,
    });
    rootGroup.add(new THREE.Line(cLogGeo, cLogMat));

    // C) O(n) Linear Target
    const cnPoints: THREE.Vector3[] = [];
    for (let x = -10; x <= 10; x += 0.5) {
      const normX = (x + 10) / 20;
      const yVal = -1.5 + normX * 4.5;
      cnPoints.push(new THREE.Vector3(x, yVal, -2));
    }
    const cnGeo = new THREE.BufferGeometry().setFromPoints(cnPoints);
    const cnMat = new THREE.LineBasicMaterial({
      color: 0x8b5cf6,
      linewidth: 3,
    });
    rootGroup.add(new THREE.Line(cnGeo, cnMat));

    // D) O(n log n)
    const cnlognPoints: THREE.Vector3[] = [];
    for (let x = -10; x <= 8; x += 0.5) {
      const normX = (x + 10) / 20;
      const yVal = -1.5 + normX * Math.log2(2 + normX * 14) * 2.2;
      cnlognPoints.push(new THREE.Vector3(x, yVal, -3));
    }
    const cnlognGeo = new THREE.BufferGeometry().setFromPoints(cnlognPoints);
    const cnlognMat = new THREE.LineBasicMaterial({
      color: 0xf59e0b,
      linewidth: 2,
    });
    rootGroup.add(new THREE.Line(cnlognGeo, cnlognMat));

    // E) O(n²) Quadratic Wall
    const cn2Points: THREE.Vector3[] = [];
    for (let x = -10; x <= 6; x += 0.4) {
      const normX = (x + 10) / 16;
      const yVal = -1.5 + Math.pow(normX, 2) * 9.5;
      cn2Points.push(new THREE.Vector3(x, yVal, -4));
    }
    const cn2Geo = new THREE.BufferGeometry().setFromPoints(cn2Points);
    const cn2Mat = new THREE.LineBasicMaterial({
      color: 0xf43f5e,
      linewidth: 3,
    });
    rootGroup.add(new THREE.Line(cn2Geo, cn2Mat));

    // 4. Optimization Transition Spline (Flow from O(n²) to O(n))
    const transitionCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(2, 5.2, -4),
      new THREE.Vector3(3, 3.8, -3),
      new THREE.Vector3(4, 2.2, -2.5),
      new THREE.Vector3(5, 1.8, -2),
    ]);
    const transPoints = transitionCurve.getPoints(50);
    const transGeo = new THREE.BufferGeometry().setFromPoints(transPoints);
    const transMat = new THREE.LineDashedMaterial({
      color: 0x38bdf8,
      dashSize: 0.4,
      gapSize: 0.2,
      transparent: true,
      opacity: 0.85,
    });
    const transLine = new THREE.Line(transGeo, transMat);
    transLine.computeLineDistances();
    rootGroup.add(transLine);

    // 5. Pulsing Particle Nodes
    const particleCount = 70;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleProgress: number[] = [];

    for (let i = 0; i < particleCount; i++) {
      particleProgress.push(Math.random());
      const pt = transitionCurve.getPoint(particleProgress[i]);
      particlePos[i * 3] = pt.x + (Math.random() - 0.5) * 0.3;
      particlePos[i * 3 + 1] = pt.y + (Math.random() - 0.5) * 0.3;
      particlePos[i * 3 + 2] = pt.z + (Math.random() - 0.5) * 0.3;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.25,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const particleMesh = new THREE.Points(particleGeo, particleMat);
    rootGroup.add(particleMesh);

    // 6. Ambient Point Glows
    const targetGlowGeo = new THREE.SphereGeometry(0.35, 16, 16);
    const targetGlowMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.8,
    });
    const targetSphere = new THREE.Mesh(targetGlowGeo, targetGlowMat);
    targetSphere.position.set(5, 1.8, -2);
    rootGroup.add(targetSphere);

    const sourceGlowGeo = new THREE.SphereGeometry(0.35, 16, 16);
    const sourceGlowMat = new THREE.MeshBasicMaterial({
      color: 0xf43f5e,
      transparent: true,
      opacity: 0.8,
    });
    const sourceSphere = new THREE.Mesh(sourceGlowGeo, sourceGlowMat);
    sourceSphere.position.set(2, 5.2, -4);
    rootGroup.add(sourceSphere);

    // Interactive Drag Controls
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotationY = 0.35;
    let targetRotationX = 0.15;

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

      targetRotationY += deltaX * 0.007;
      targetRotationX = Math.max(-0.4, Math.min(0.6, targetRotationX + deltaY * 0.007));

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
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Idle auto-rotation when not interacting
      if (!isDragging) {
        targetRotationY += 0.0025;
      }

      rootGroup.rotation.y += (targetRotationY - rootGroup.rotation.y) * 0.08;
      rootGroup.rotation.x += (targetRotationX - rootGroup.rotation.x) * 0.08;

      // Animate flowing transition particles
      const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i++) {
        particleProgress[i] = (particleProgress[i] + delta * 0.35) % 1;
        const pt = transitionCurve.getPoint(particleProgress[i]);
        posAttr.setXYZ(i, pt.x, pt.y, pt.z);
      }
      posAttr.needsUpdate = true;

      // Pulse targets
      const scale = 1 + Math.sin(elapsedTime * 4) * 0.18;
      targetSphere.scale.set(scale, scale, scale);
      sourceSphere.scale.set(scale, scale, scale);

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

      // Cleanup Geometries and Materials
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
      {/* 3D Visualizer Canvas Mount */}
      <div ref={mountRef} className="w-full h-72 cursor-grab active:cursor-grabbing" />

      {/* Floating 3D Telemetry HUD */}
      <div className="absolute top-3 left-3 z-20 pointer-events-none flex items-center gap-2">
        <div className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/[0.1] text-[11px] font-mono text-zinc-300">
          <span className="text-zinc-500 mr-1.5">Surface:</span>
          <span className="text-brand-400 font-semibold">3D Asymptotic Landscape</span>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Optimal Vector {targetBigO}</span>
        </div>
      </div>

      {/* Complexity Curve Legend & Indicators */}
      <div className="absolute bottom-3 left-3 right-3 z-20 pointer-events-none flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono">
        <div className="flex items-center gap-2 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/[0.08]">
          <span className="flex items-center gap-1 text-rose-400">
            <span className="w-2 h-0.5 bg-rose-500 rounded" />
            <span>{currentBigO} (Unoptimized)</span>
          </span>
          <span className="text-zinc-600">→</span>
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="w-2 h-0.5 bg-emerald-400 rounded" />
            <span>{targetBigO} (Target)</span>
          </span>
        </div>

        <div className="text-zinc-500 bg-black/60 px-2 py-0.5 rounded border border-white/[0.06] hidden sm:block">
          Click & Drag to Orbit Space
        </div>
      </div>
    </div>
  );
}

