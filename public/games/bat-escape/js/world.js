/**
 * Bat Escape - World & Parallax Environment System
 * Handles multi-layered parallax backgrounds, dynamic day/night/biome visual progression,
 * ambient particles, and smooth transitions across all 6 levels.
 */

export class World {
  constructor(width = 800, height = 600) {
    this.width = width;
    this.height = height;

    // Parallax scroll offsets
    this.offsetLayer0 = 0; // Sky / Stars / Celestial
    this.offsetLayer1 = 0; // Distant mountains / fortress
    this.offsetLayer2 = 0; // Mid-ground trees / ruins
    this.offsetLayer3 = 0; // Foreground terrain

    // Ambient stars
    this.stars = [];
    for (let i = 0; i < 75; i++) {
      this.stars.push({
        x: Math.random() * width,
        y: Math.random() * (height * 0.7),
        size: Math.random() > 0.8 ? 2.5 : 1.5,
        twinkleSpeed: 1 + Math.random() * 3,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }

    // Ambient fireflies (Forest)
    this.fireflies = [];
    for (let i = 0; i < 20; i++) {
      this.fireflies.push({
        x: Math.random() * width,
        y: height * 0.4 + Math.random() * (height * 0.5),
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.4,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Biome color state with smooth transition interpolation
    this.currentColor = {
      skyTop: [9, 13, 22],
      skyBottom: [30, 27, 75],
      accent: [56, 189, 248],
    };
    this.targetColor = {
      skyTop: [9, 13, 22],
      skyBottom: [30, 27, 75],
      accent: [56, 189, 248],
    };

    this.currentLevel = 1;
    this.bloodMoonActive = false;
  }

  resize(width, height) {
    this.width = width;
    this.height = height;
  }

  setLevel(levelDef, bloodMoonActive = false) {
    this.currentLevel = levelDef.level;
    this.bloodMoonActive = bloodMoonActive;

    if (bloodMoonActive) {
      this.targetColor = {
        skyTop: [40, 5, 5],
        skyBottom: [90, 10, 10],
        accent: [239, 68, 68],
      };
      return;
    }

    // Hex to RGB parser
    const hexToRgb = (hex) => {
      const bigint = parseInt(hex.replace('#', ''), 16);
      return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
    };

    this.targetColor = {
      skyTop: hexToRgb(levelDef.colorScheme.skyTop),
      skyBottom: hexToRgb(levelDef.colorScheme.skyBottom),
      accent: hexToRgb(levelDef.colorScheme.accent),
    };
  }

  update(dt, speed, particles) {
    // Parallax scrolling
    this.offsetLayer0 = (this.offsetLayer0 + speed * 0.1) % this.width;
    this.offsetLayer1 = (this.offsetLayer1 + speed * 0.3) % this.width;
    this.offsetLayer2 = (this.offsetLayer2 + speed * 0.6) % this.width;
    this.offsetLayer3 = (this.offsetLayer3 + speed * 1.0) % this.width;

    // Smooth color interpolation
    const lerpSpeed = 0.04;
    for (const key of ['skyTop', 'skyBottom', 'accent']) {
      for (let i = 0; i < 3; i++) {
        this.currentColor[key][i] += (this.targetColor[key][i] - this.currentColor[key][i]) * lerpSpeed;
      }
    }

    // Update fireflies
    for (let i = 0; i < this.fireflies.length; i++) {
      const f = this.fireflies[i];
      f.phase += dt * 3;
      f.x += f.vx - speed * 0.15;
      f.y += f.vy + Math.sin(f.phase) * 0.2;
      if (f.x < -10) f.x = this.width + 10;
      if (f.y < this.height * 0.3) f.y = this.height * 0.8;
      if (f.y > this.height - 20) f.y = this.height * 0.4;
    }

    // Emit environment particles per biome
    if (particles) {
      if (this.currentLevel === 5) {
        // Demon Realm embers
        particles.emitEmbers(this.width, this.height, 1);
      } else if (this.currentLevel === 6) {
        // Nightmare Realm speed lines & embers
        particles.emitSpeedLines(this.width, this.height, 1);
        particles.emitEmbers(this.width, this.height, 1);
      }
    }
  }

  draw(ctx) {
    const w = this.width;
    const h = this.height;

    // --- 1. Dynamic Sky Gradient ---
    const topRgb = this.currentColor.skyTop.map(Math.round).join(',');
    const botRgb = this.currentColor.skyBottom.map(Math.round).join(',');
    const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
    skyGrad.addColorStop(0, `rgb(${topRgb})`);
    skyGrad.addColorStop(1, `rgb(${botRgb})`);
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, h);

    // --- 2. Celestial Body (Moon, Blood Moon, or Void Portal) ---
    this.drawCelestial(ctx, w, h);

    // --- 3. Distant Stars ---
    if (this.currentLevel <= 3) {
      ctx.fillStyle = '#ffffff';
      const time = Date.now() * 0.002;
      for (let i = 0; i < this.stars.length; i++) {
        const s = this.stars[i];
        const alpha = 0.3 + 0.7 * Math.abs(Math.sin(time * s.twinkleSpeed + s.twinklePhase));
        ctx.globalAlpha = alpha;
        ctx.fillRect(s.x, s.y, s.size, s.size);
      }
      ctx.globalAlpha = 1.0;
    }

    // --- 4. Layer 1: Distant Mountains / Castle Silhouette (Slow Parallax) ---
    this.drawDistantSilhouettes(ctx, w, h);

    // --- 5. Layer 2: Midground Trees / Gothic Ramparts / Stalagmites ---
    this.drawMidground(ctx, w, h);

    // --- 6. Layer 3: Foreground Ceiling & Ground Bounds ---
    this.drawForegroundBounds(ctx, w, h);

    // --- 7. Biome Ambient Overlays ---
    this.drawBiomeOverlays(ctx, w, h);
  }

  drawCelestial(ctx, w, h) {
    const moonX = w * 0.75 - (this.offsetLayer0 * 0.2) % (w * 0.5);
    const moonY = 90;
    const moonRadius = 38;

    ctx.save();
    if (this.bloodMoonActive || this.currentLevel === 5) {
      // Blood Moon
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 30;
      ctx.fillStyle = '#b91c1c';
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
      ctx.fill();

      // Inner crater details
      ctx.fillStyle = '#7f1d1d';
      ctx.beginPath();
      ctx.arc(moonX - 8, moonY - 6, 8, 0, Math.PI * 2);
      ctx.arc(moonX + 12, moonY + 10, 12, 0, Math.PI * 2);
      ctx.arc(moonX - 10, moonY + 14, 6, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.currentLevel === 6) {
      // Nightmare Vortex
      ctx.shadowColor = '#c084fc';
      ctx.shadowBlur = 35;
      const gradient = ctx.createRadialGradient(moonX, moonY, 10, moonX, moonY, moonRadius * 1.4);
      gradient.addColorStop(0, '#0f051d');
      gradient.addColorStop(0.5, '#581c87');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonRadius * 1.4, 0, Math.PI * 2);
      ctx.fill();

      // Swirling core
      ctx.strokeStyle = '#e879f9';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(moonX, moonY, 18, 0, Math.PI * 1.5);
      ctx.stroke();
    } else if (this.currentLevel === 4) {
      // Underground Cave - no moon, glowing mineral ceiling veins
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 40);
      ctx.lineTo(w * 0.3, 35);
      ctx.lineTo(w * 0.6, 50);
      ctx.lineTo(w, 30);
      ctx.stroke();
    } else {
      // Standard Serene / Gothic Moon
      ctx.shadowColor = '#fef08a';
      ctx.shadowBlur = 24;
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
      ctx.fill();

      // Moon craters
      ctx.fillStyle = '#fde047';
      ctx.beginPath();
      ctx.arc(moonX - 10, moonY - 8, 9, 0, Math.PI * 2);
      ctx.arc(moonX + 12, moonY + 8, 11, 0, Math.PI * 2);
      ctx.arc(moonX - 6, moonY + 14, 7, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  drawDistantSilhouettes(ctx, w, h) {
    ctx.save();
    const color =
      this.currentLevel === 5
        ? '#1f0707'
        : this.currentLevel === 6
        ? '#180324'
        : this.currentLevel === 2
        ? '#041f18'
        : '#0a1026';
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.55;

    // Repeating ridge silhouette
    const step = 80;
    const offset = -(this.offsetLayer1 % step);
    ctx.beginPath();
    ctx.moveTo(-step, h);
    for (let x = -step + offset; x <= w + step; x += step) {
      const peakY = h * 0.65 + Math.sin(x * 0.015) * 45;
      ctx.lineTo(x, peakY);
      ctx.lineTo(x + step * 0.5, peakY - 20);
    }
    ctx.lineTo(w + step, h);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  drawMidground(ctx, w, h) {
    ctx.save();
    const color =
      this.currentLevel === 5
        ? '#3b0a0a'
        : this.currentLevel === 6
        ? '#2e0844'
        : this.currentLevel === 2
        ? '#064e3b'
        : '#131b38';
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.85;

    const step = 60;
    const offset = -(this.offsetLayer2 % step);

    if (this.currentLevel === 2) {
      // Pine Trees for Forest
      for (let x = -step + offset; x <= w + step; x += step) {
        const treeY = h * 0.72 + (Math.sin(x * 0.02) * 20);
        ctx.beginPath();
        ctx.moveTo(x, h);
        ctx.lineTo(x, treeY);
        ctx.lineTo(x - 16, treeY + 15);
        ctx.lineTo(x, treeY - 35); // Tree tip
        ctx.lineTo(x + 16, treeY + 15);
        ctx.lineTo(x, treeY);
        ctx.closePath();
        ctx.fill();
      }
    } else if (this.currentLevel === 3) {
      // Castle Ramparts & Turrets
      for (let x = -step + offset; x <= w + step; x += step * 1.5) {
        const castleY = h * 0.68;
        ctx.fillRect(x, castleY, 50, h - castleY);
        // Battlements
        ctx.fillRect(x, castleY - 10, 12, 10);
        ctx.fillRect(x + 20, castleY - 10, 12, 10);
        ctx.fillRect(x + 38, castleY - 10, 12, 10);
      }
    } else {
      // Standard hills / crags
      ctx.beginPath();
      ctx.moveTo(-step, h);
      for (let x = -step + offset; x <= w + step; x += step) {
        const ridgeY = h * 0.78 + Math.sin(x * 0.03) * 25;
        ctx.lineTo(x, ridgeY);
      }
      ctx.lineTo(w + step, h);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  }

  drawForegroundBounds(ctx, w, h) {
    ctx.save();
    const terrainColor =
      this.currentLevel === 5
        ? '#1a0303'
        : this.currentLevel === 4
        ? '#090d16'
        : '#020617';
    ctx.fillStyle = terrainColor;

    // Ground line (18px high)
    ctx.fillRect(0, h - 18, w, 18);

    // Ceiling boundary for Dark Caves
    if (this.currentLevel >= 4) {
      ctx.fillRect(0, 0, w, 14);
      // Jagged ceiling spikes
      ctx.beginPath();
      for (let x = 0; x <= w; x += 25) {
        ctx.lineTo(x, 14);
        ctx.lineTo(x + 12.5, 22);
      }
      ctx.lineTo(w, 0);
      ctx.lineTo(0, 0);
      ctx.closePath();
      ctx.fill();
    }

    // Ground edge grass / rocky texture
    ctx.fillStyle =
      this.currentLevel === 2
        ? '#10b981'
        : this.currentLevel === 5
        ? '#ef4444'
        : '#334155';
    ctx.fillRect(0, h - 18, w, 2.5);

    ctx.restore();
  }

  drawBiomeOverlays(ctx, w, h) {
    // Forest: Draw ambient glowing fireflies
    if (this.currentLevel === 2) {
      ctx.save();
      for (let i = 0; i < this.fireflies.length; i++) {
        const f = this.fireflies[i];
        const alpha = 0.3 + 0.7 * Math.abs(Math.sin(f.phase));
        ctx.fillStyle = `rgba(167, 243, 208, ${alpha})`;
        ctx.shadowColor = '#6ee7b7';
        ctx.shadowBlur = 8;
        ctx.fillRect(f.x, f.y, 3, 3);
      }
      ctx.restore();

      // Subtle Forest Fog layer
      ctx.save();
      const fogGrad = ctx.createLinearGradient(0, h * 0.6, 0, h);
      fogGrad.addColorStop(0, 'rgba(6, 78, 59, 0)');
      fogGrad.addColorStop(1, 'rgba(6, 78, 59, 0.25)');
      ctx.fillStyle = fogGrad;
      ctx.fillRect(0, h * 0.6, w, h * 0.4);
      ctx.restore();
    }

    // Demon Realm: Lava glow from bottom
    if (this.currentLevel === 5) {
      ctx.save();
      const lavaGrad = ctx.createLinearGradient(0, h - 60, 0, h);
      lavaGrad.addColorStop(0, 'rgba(239, 68, 68, 0)');
      lavaGrad.addColorStop(1, 'rgba(239, 68, 68, 0.3)');
      ctx.fillStyle = lavaGrad;
      ctx.fillRect(0, h - 60, w, 60);
      ctx.restore();
    }
  }
}

