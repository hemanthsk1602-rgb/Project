'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoadmapTopic } from '@/lib/types';

interface SkillGalaxy3DProps {
  topics: RoadmapTopic[];
  selectedTopicId: string;
  onSelectTopic: (topic: RoadmapTopic) => void;
  className?: string;
}

export function SkillGalaxy3D({
  topics,
  selectedTopicId,
  onSelectTopic,
  className = '',
}: SkillGalaxy3DProps) {
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

    const width = container.clientWidth || 700;
    const height = container.clientHeight || 480;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 12, 28);
    camera.lookAt(0, 0, 0);

    const isLightMode = document.documentElement.classList.contains('light');

    const galaxyGroup = new THREE.Group();
    scene.add(galaxyGroup);

    // 1. Spatial Coordinates for 12 Nodes along an Archimedean Galaxy Spiral
    const nodeObjects: { mesh: THREE.Mesh; topic: RoadmapTopic; pos: THREE.Vector3 }[] = [];
    const nodePositions: THREE.Vector3[] = [];

    const spiralRadiusStep = 1.1;
    const spiralAngleStep = 0.55;

    topics.forEach((topic, idx) => {
      const angle = idx * spiralAngleStep;
      const radius = 3.5 + idx * spiralRadiusStep;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = Math.sin(idx * 0.8) * 1.8;

      const pos = new THREE.Vector3(x, y, z);
      nodePositions.push(pos);

      // Node Geometry & Color based on Status
      const isSelected = topic.id === selectedTopicId;
      const isCompleted = topic.status === 'completed';
      const isInProgress = topic.status === 'in-progress';

      const color = isCompleted
        ? 0x10b981
        : isInProgress
        ? 0x8b5cf6
        : isLightMode
        ? 0x64748b
        : 0x475569;

      const nodeRadius = isSelected ? 0.9 : isCompleted ? 0.75 : isInProgress ? 0.7 : 0.5;
      const nodeGeo = new THREE.IcosahedronGeometry(nodeRadius, 1);
      const nodeMat = new THREE.MeshBasicMaterial({
        color,
        wireframe: !isCompleted && !isInProgress,
        transparent: true,
        opacity: isSelected ? 1 : 0.8,
      });

      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.copy(pos);
      nodeMesh.userData = { topicId: topic.id, topic };
      galaxyGroup.add(nodeMesh);

      // Orbital Halo for active/selected
      if (isSelected || isInProgress) {
        const ringGeo = new THREE.TorusGeometry(nodeRadius * 1.6, 0.04, 12, 32);
        const ringMat = new THREE.MeshBasicMaterial({
          color: isSelected ? 0xa855f7 : 0x38bdf8,
          transparent: true,
          opacity: 0.7,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2;
        nodeMesh.add(ring);
      }

      nodeObjects.push({ mesh: nodeMesh, topic, pos });
    });

    // 2. Luminous Vector Splines connecting consecutive prerequisites
    const splineGeo = new THREE.BufferGeometry();
    const splinePoints: THREE.Vector3[] = [];

    for (let i = 0; i < nodePositions.length - 1; i++) {
      const p1 = nodePositions[i];
      const p2 = nodePositions[i + 1];

      // Intermediate arc control point
      const mid = new THREE.Vector3()
        .addVectors(p1, p2)
        .multiplyScalar(0.5)
        .add(new THREE.Vector3(0, 0.8, 0));

      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
      splinePoints.push(...curve.getPoints(12));
    }

    splineGeo.setFromPoints(splinePoints);
    const splineMat = new THREE.LineBasicMaterial({
      color: isLightMode ? 0x6366f1 : 0x818cf8,
      transparent: true,
      opacity: 0.45,
    });
    const splineLine = new THREE.Line(splineGeo, splineMat);
    galaxyGroup.add(splineLine);

    // 3. Stardust Particle Field
    const stardustCount = 200;
    const stardustGeo = new THREE.BufferGeometry();
    const stardustPos = new Float32Array(stardustCount * 3);

    for (let i = 0; i < stardustCount * 3; i += 3) {
      stardustPos[i] = (Math.random() - 0.5) * 36;
      stardustPos[i + 1] = (Math.random() - 0.5) * 16;
      stardustPos[i + 2] = (Math.random() - 0.5) * 36;
    }

    stardustGeo.setAttribute('position', new THREE.BufferAttribute(stardustPos, 3));
    const stardustMat = new THREE.PointsMaterial({
      color: isLightMode ? 0x818cf8 : 0xc084fc,
      size: 0.12,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const stardust = new THREE.Points(stardustGeo, stardustMat);
    scene.add(stardust);

    // 4. Raycasting & Interactive Hover/Selection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const getRaycastIntersection = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const meshes = nodeObjects.map((n) => n.mesh);
      return raycaster.intersectObjects(meshes);
    };

    const handleClick = (e: MouseEvent) => {
      const intersects = getRaycastIntersection(e);
      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        if (hit.userData?.topic) {
          onSelectTopic(hit.userData.topic);
        }
      }
    };

    // Drag Orbit
    let isDragging = false;
    let hasMoved = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotationY = 0;
    let targetRotationX = 0.3;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      hasMoved = false;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousMousePosition = { x: clientX, y: clientY };
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      hasMoved = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - previousMousePosition.x;
      const deltaY = clientY - previousMousePosition.y;

      targetRotationY += deltaX * 0.007;
      targetRotationX = Math.max(-0.2, Math.min(0.8, targetRotationX + deltaY * 0.007));

      previousMousePosition = { x: clientX, y: clientY };
    };

    const handlePointerUp = (e: MouseEvent | TouchEvent) => {
      isDragging = false;
      if (!hasMoved && 'clientX' in e) {
        handleClick(e as MouseEvent);
      }
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
        targetRotationY += 0.002;
      }

      galaxyGroup.rotation.y += (targetRotationY - galaxyGroup.rotation.y) * 0.08;
      galaxyGroup.rotation.x += (targetRotationX - galaxyGroup.rotation.x) * 0.08;

      // Rotate individual node meshes
      nodeObjects.forEach(({ mesh }, idx) => {
        mesh.rotation.y += 0.01 + idx * 0.001;
        mesh.rotation.x += 0.005;
      });

      stardust.rotation.y -= 0.0005;

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
  }, [topics, selectedTopicId, onSelectTopic]);

  return (
    <div className={`relative rounded-2xl overflow-hidden border border-white/[0.09] bg-[#080C14] ${className}`}>
      <div ref={mountRef} className="w-full h-[460px] cursor-grab active:cursor-grabbing" />

      {/* Floating 3D Telemetry HUD */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none flex items-center gap-2">
        <div className="px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/[0.1] text-xs font-mono text-zinc-300">
          <span className="text-zinc-500 mr-1.5">View:</span>
          <span className="text-brand-400 font-semibold">3D Spatial Skill Galaxy</span>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-zinc-400">
          <span>Click any 3D node to inspect</span>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-none flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-3 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/[0.08]">
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" /> Mastered
          </span>
          <span className="flex items-center gap-1 text-brand-400">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse shadow-[0_0_8px_rgba(139,92,246,0.5)]" /> In Progress
          </span>
          <span className="flex items-center gap-1 text-zinc-500">
            <span className="w-2 h-2 rounded-full bg-zinc-600" /> Locked
          </span>
        </div>
        <span className="bg-black/60 px-2.5 py-1 rounded-lg border border-white/[0.06] text-[11px] text-zinc-500 hidden sm:inline">
          Drag to Orbit 360°
        </span>
      </div>
    </div>
  );
}

