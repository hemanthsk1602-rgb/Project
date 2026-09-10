/**
 * Bat Escape - Player System
 * Pixel-art bat entity with responsive flight physics, wing flapping animation,
 * velocity-based rotation, health/lives management, and power-up states.
 */

import { audio } from './audio.js';

export class Player {
  constructor(x = 120, y = 250) {
    this.startX = x;
    this.startY = y;
    this.x = x;
    this.y = y;
    this.vy = 0;
    this.width = 38;
    this.height = 26;
    this.hitRadius = 12; // Core collision radius for fair gameplay

    // Physics parameters
    this.gravity = 0.38;
    this.flapImpulse = -7.6;
    this.maxFallSpeed = 9.0;
    this.maxRiseSpeed = -8.5;
    this.rotation = 0;

    // Wing animation
    this.animFrame = 0;
    this.animTimer = 0;
    this.animSpeed = 0.12;
    this.flapBoostTimer = 0;

    // Health and state
    this.maxHealth = 3;
    this.health = 3;
    this.invulnerableTimer = 0;
    this.isDead = false;

    // Power-up states
    this.hasShield = false;
    this.magnetTimer = 0;
    this.speedTimer = 0;
    this.slowTimer = 0;
    this.ghostTimer = 0;

    // Motion trail for speed burst
    this.trail = [];
  }

  reset(x = 120, y = 250) {
    this.x = x;
    this.y = y;
    this.vy = 0;
    this.rotation = 0;
    this.animFrame = 0;
    this.health = this.maxHealth;
    this.invulnerableTimer = 0;
    this.isDead = false;
    this.hasShield = false;
    this.magnetTimer = 0;
    this.speedTimer = 0;
    this.slowTimer = 0;
    this.ghostTimer = 0;
    this.trail = [];
  }

  flap(particles) {
    if (this.isDead) return;
    this.vy = this.flapImpulse;
    this.flapBoostTimer = 0.25;
    this.animSpeed = 0.06; // Flap vigorously

    if (particles) {
      particles.emitFlap(this.x, this.y);
    }
    audio.playFlap();
  }

  update(dt, particles, worldHeight = 600) {
    // Handle power-up timers
    if (this.magnetTimer > 0) this.magnetTimer -= dt;
    if (this.speedTimer > 0) {
      this.speedTimer -= dt;
      // Record trail
      this.trail.push({ x: this.x, y: this.y, rotation: this.rotation, alpha: 0.6 });
      if (this.trail.length > 5) this.trail.shift();
    } else {
      this.trail = [];
    }
    if (this.slowTimer > 0) this.slowTimer -= dt;
    if (this.ghostTimer > 0) this.ghostTimer -= dt;
    if (this.invulnerableTimer > 0) this.invulnerableTimer -= dt;

    if (this.flapBoostTimer > 0) {
      this.flapBoostTimer -= dt;
      if (this.flapBoostTimer <= 0) {
        this.animSpeed = 0.13;
      }
    }

    // Apply gravity
    this.vy += this.gravity * dt * 60;
    if (this.vy > this.maxFallSpeed) this.vy = this.maxFallSpeed;
    if (this.vy < this.maxRiseSpeed) this.vy = this.maxRiseSpeed;

    this.y += this.vy * dt * 60;

    // Target rotation based on vertical velocity
    // Tilts up when rising, dives down when falling
    const targetRotation = Math.max(-0.45, Math.min(1.05, this.vy * 0.08));
    this.rotation += (targetRotation - this.rotation) * 0.2;

    // Wing flapping frame cycle
    this.animTimer += dt;
    if (this.animTimer >= this.animSpeed) {
      this.animTimer = 0;
      this.animFrame = (this.animFrame + 1) % 4; // 0, 1, 2, 1
    }

    // Screen boundary bounds
    if (this.y < 15) {
      this.y = 15;
      if (this.vy < 0) this.vy = 0;
    }
    if (this.y > worldHeight - 15) {
      this.y = worldHeight - 15;
      if (!this.isDead) {
        this.takeDamage(1, particles);
        this.vy = -5; // Bounce off ground slightly
      }
    }
  }

  takeDamage(amount = 1, particles = null) {
    if (this.invulnerableTimer > 0 || this.ghostTimer > 0 || this.isDead) return false;

    // Check if shield absorbs hit
    if (this.hasShield) {
      this.hasShield = false;
      this.invulnerableTimer = 0.8;
      audio.playShieldBreak();
      if (particles) {
        particles.shake(0.2, 5);
        particles.emitSparkles(this.x, this.y, '#38bdf8', 20);
        particles.addFloatingText(this.x, this.y - 25, 'SHIELD SAVED!', '#38bdf8', 1.0);
      }
      return false; // Did not lose heart
    }

    this.health -= amount;
    audio.playHit();

    if (particles) {
      particles.shake(0.35, 10);
      particles.emitHit(this.x, this.y);
    }

    if (this.health <= 0) {
      this.health = 0;
      this.isDead = true;
      audio.playGameOver();
      return true; // Fatal damage
    }

    // Invulnerability frames
    this.invulnerableTimer = 1.6;
    return false;
  }

  applyPowerup(type, duration = 5, particles = null) {
    audio.playPowerup();
    if (type === 'shield') {
      this.hasShield = true;
      if (particles) {
        particles.emitSparkles(this.x, this.y, '#38bdf8', 16);
        particles.addFloatingText(this.x, this.y - 20, '🛡 SHADOW SHIELD!', '#38bdf8', 1.1);
      }
    } else if (type === 'magnet') {
      this.magnetTimer = duration;
      if (particles) {
        particles.emitSparkles(this.x, this.y, '#c084fc', 16);
        particles.addFloatingText(this.x, this.y - 20, '🧲 MOON MAGNET!', '#c084fc', 1.1);
      }
    } else if (type === 'speed') {
      this.speedTimer = duration;
      if (particles) {
        particles.emitSparkles(this.x, this.y, '#facc15', 16);
        particles.addFloatingText(this.x, this.y - 20, '⚡ SPEED BURST!', '#facc15', 1.1);
      }
    } else if (type === 'slow') {
      this.slowTimer = duration;
      if (particles) {
        particles.emitSparkles(this.x, this.y, '#2dd4bf', 16);
        particles.addFloatingText(this.x, this.y - 20, '🕐 SLOW TIME!', '#2dd4bf', 1.1);
      }
    } else if (type === 'ghost') {
      this.ghostTimer = duration;
      if (particles) {
        particles.emitSparkles(this.x, this.y, '#a78bfa', 16);
        particles.addFloatingText(this.x, this.y - 20, '👻 GHOST MODE!', '#a78bfa', 1.1);
      }
    }
  }

  draw(ctx) {
    // Draw motion shadow trail if speed active
    if (this.trail.length > 0) {
      for (let i = 0; i < this.trail.length; i++) {
        const t = this.trail[i];
        t.alpha -= 0.08;
        if (t.alpha > 0) {
          ctx.save();
          ctx.globalAlpha = t.alpha * 0.4;
          ctx.translate(t.x, t.y);
          ctx.rotate(t.rotation);
          this.renderBatSprite(ctx, 1, '#facc15');
          ctx.restore();
        }
      }
    }

    // Handle i-frames blinking
    if (this.invulnerableTimer > 0 && Math.floor(Date.now() / 80) % 2 === 0) {
      return; // Skip rendering frame for flash effect
    }

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);

    // Ghost mode translucency
    if (this.ghostTimer > 0) {
      ctx.globalAlpha = 0.55;
    }

    // Render procedural pixel bat
    this.renderBatSprite(ctx, this.animFrame);

    // Draw active shield forcefield
    if (this.hasShield) {
      const pulse = 1 + Math.sin(Date.now() * 0.008) * 0.08;
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(0, 0, 22 * pulse, 0, Math.PI * 2);
      ctx.stroke();

      // Inner faint glow
      ctx.fillStyle = 'rgba(56, 189, 248, 0.15)';
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // Draw magnetic field aura
    if (this.magnetTimer > 0) {
      ctx.strokeStyle = 'rgba(192, 132, 252, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(0, 0, 26, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Draw ghost halo
    if (this.ghostTimer > 0) {
      ctx.strokeStyle = 'rgba(167, 139, 250, 0.7)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(0, 0, 24, 18, 0, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.restore();
  }

  /**
   * Procedural Pixel Art Bat Renderer
   * Wing phases:
   * 0 = Up, 1 = Mid, 2 = Down, 3 = Mid
   */
  renderBatSprite(ctx, frameIndex = 0, tint = null) {
    const wingPhase = frameIndex === 3 ? 1 : frameIndex; // 0: Up, 1: Mid, 2: Down

    const bodyColor = tint || '#1e1b4b'; // Deep dark violet-black fur
    const bellyColor = tint || '#312e81'; // Slightly lighter purple chest
    const wingColor = tint || '#0f172a'; // Dark leathery wing
    const wingRibColor = tint || '#4338ca'; // Wing bone ribbing
    const eyeColor = this.isDead ? '#64748b' : this.speedTimer > 0 ? '#fbbf24' : '#ef4444'; // Glowing ruby eyes
    const fangColor = '#ffffff';

    ctx.imageSmoothingEnabled = false;

    // --- 1. Wings (drawn behind body) ---
    ctx.fillStyle = wingColor;
    ctx.strokeStyle = wingRibColor;
    ctx.lineWidth = 1.5;

    // Left Wing
    ctx.beginPath();
    if (wingPhase === 0) {
      // Wings UP
      ctx.moveTo(-4, -2);
      ctx.lineTo(-14, -14);
      ctx.lineTo(-24, -12);
      ctx.lineTo(-20, -3);
      ctx.lineTo(-12, 0);
    } else if (wingPhase === 1) {
      // Wings MID (Glide)
      ctx.moveTo(-4, 0);
      ctx.lineTo(-16, -6);
      ctx.lineTo(-25, 0);
      ctx.lineTo(-18, 6);
      ctx.lineTo(-10, 4);
    } else {
      // Wings DOWN
      ctx.moveTo(-4, 2);
      ctx.lineTo(-14, 10);
      ctx.lineTo(-24, 14);
      ctx.lineTo(-18, 6);
      ctx.lineTo(-10, 4);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Right Wing
    ctx.beginPath();
    if (wingPhase === 0) {
      // Wings UP
      ctx.moveTo(4, -2);
      ctx.lineTo(14, -14);
      ctx.lineTo(24, -12);
      ctx.lineTo(20, -3);
      ctx.lineTo(12, 0);
    } else if (wingPhase === 1) {
      // Wings MID (Glide)
      ctx.moveTo(4, 0);
      ctx.lineTo(16, -6);
      ctx.lineTo(25, 0);
      ctx.lineTo(18, 6);
      ctx.lineTo(10, 4);
    } else {
      // Wings DOWN
      ctx.moveTo(4, 2);
      ctx.lineTo(14, 10);
      ctx.lineTo(24, 14);
      ctx.lineTo(18, 6);
      ctx.lineTo(10, 4);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // --- 2. Ears ---
    ctx.fillStyle = bodyColor;
    // Left Ear
    ctx.beginPath();
    ctx.moveTo(-6, -6);
    ctx.lineTo(-10, -15);
    ctx.lineTo(-4, -10);
    ctx.fill();

    // Right Ear
    ctx.beginPath();
    ctx.moveTo(6, -6);
    ctx.lineTo(10, -15);
    ctx.lineTo(4, -10);
    ctx.fill();

    // Ear inner pink tint
    ctx.fillStyle = '#db2777';
    ctx.fillRect(-8, -12, 2, 4);
    ctx.fillRect(6, -12, 2, 4);

    // --- 3. Bat Body & Head ---
    ctx.fillStyle = bodyColor;
    ctx.beginPath();
    ctx.ellipse(0, 0, 9, 12, 0, 0, Math.PI * 2);
    ctx.fill();

    // Chest fur highlight
    ctx.fillStyle = bellyColor;
    ctx.beginPath();
    ctx.ellipse(0, 2, 5, 7, 0, 0, Math.PI * 2);
    ctx.fill();

    // Head
    ctx.fillStyle = bodyColor;
    ctx.beginPath();
    ctx.arc(0, -6, 7, 0, Math.PI * 2);
    ctx.fill();

    // --- 4. Eyes ---
    ctx.fillStyle = eyeColor;
    ctx.fillRect(-4, -8, 2.5, 3);
    ctx.fillRect(2, -8, 2.5, 3);

    // Eye glow glint
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-3.5, -8, 1, 1);
    ctx.fillRect(2.5, -8, 1, 1);

    // --- 5. Snout & Fangs ---
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-1.5, -5, 3, 2); // Tiny nose

    ctx.fillStyle = fangColor;
    ctx.fillRect(-3, -3, 1.5, 2); // Left fang
    ctx.fillRect(1.5, -3, 1.5, 2); // Right fang
  }
}

