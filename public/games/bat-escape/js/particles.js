/**
 * Bat Escape - Particle & Screen FX System
 * High-performance object-pooled particle engine with screen shake,
 * environmental ambient particles, and floating text popups.
 */

class Particle {
  constructor() {
    this.active = false;
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.size = 2;
    this.color = '#ffffff';
    this.alpha = 1;
    this.life = 1;
    this.maxLife = 1;
    this.type = 'dust';
    this.shape = 'square'; // 'square', 'circle', 'star', 'line'
    this.rotation = 0;
    this.vRot = 0;
    this.gravity = 0;
  }

  init({
    x,
    y,
    vx = 0,
    vy = 0,
    size = 3,
    color = '#ffffff',
    life = 0.5,
    type = 'dust',
    shape = 'square',
    gravity = 0,
    vRot = 0,
  }) {
    this.active = true;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.size = size;
    this.color = color;
    this.life = life;
    this.maxLife = life;
    this.alpha = 1;
    this.type = type;
    this.shape = shape;
    this.gravity = gravity;
    this.rotation = Math.random() * Math.PI * 2;
    this.vRot = vRot;
  }

  update(dt) {
    if (!this.active) return;
    this.life -= dt;
    if (this.life <= 0) {
      this.active = false;
      return;
    }

    this.alpha = Math.max(0, this.life / this.maxLife);
    this.vy += this.gravity * dt * 60;
    this.x += this.vx * dt * 60;
    this.y += this.vy * dt * 60;
    this.rotation += this.vRot * dt * 60;
  }

  draw(ctx) {
    if (!this.active || this.alpha <= 0) return;
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;

    if (this.shape === 'line') {
      ctx.lineWidth = this.size;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x - this.vx * 3, this.y);
      ctx.stroke();
    } else if (this.shape === 'circle') {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.shape === 'star') {
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      const s = this.size;
      ctx.fillRect(-s / 2, -s / 2, s, s);
      ctx.fillRect(-s, -s / 4, s * 2, s / 2);
      ctx.fillRect(-s / 4, -s, s / 2, s * 2);
    } else {
      // Default retro pixel square
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
    }

    ctx.restore();
  }
}

class FloatingText {
  constructor() {
    this.active = false;
    this.x = 0;
    this.y = 0;
    this.text = '';
    this.color = '#ffd700';
    this.scale = 1;
    this.alpha = 1;
    this.life = 1;
    this.maxLife = 1;
    this.vy = -1.2;
  }

  init({ x, y, text, color = '#ffd700', life = 0.8, scale = 1 }) {
    this.active = true;
    this.x = x;
    this.y = y;
    this.text = text;
    this.color = color;
    this.life = life;
    this.maxLife = life;
    this.alpha = 1;
    this.scale = scale;
    this.vy = -1.5;
  }

  update(dt) {
    if (!this.active) return;
    this.life -= dt;
    if (this.life <= 0) {
      this.active = false;
      return;
    }
    const progress = 1 - this.life / this.maxLife;
    this.y += this.vy * dt * 60;
    this.alpha = Math.max(0, this.life / this.maxLife);
    // Bouncing pop-in scale
    if (progress < 0.2) {
      this.scale = 1 + Math.sin((progress / 0.2) * Math.PI) * 0.4;
    } else {
      this.scale = 1;
    }
  }

  draw(ctx) {
    if (!this.active || this.alpha <= 0) return;
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.font = `bold ${Math.round(14 * this.scale)}px "Press Start 2P", monospace, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Black stroke shadow for readability
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#000000';
    ctx.strokeText(this.text, this.x, this.y);

    ctx.fillStyle = this.color;
    ctx.fillText(this.text, this.x, this.y);
    ctx.restore();
  }
}

export class ParticleSystem {
  constructor(poolSize = 400, textPoolSize = 40) {
    this.particles = [];
    for (let i = 0; i < poolSize; i++) {
      this.particles.push(new Particle());
    }

    this.texts = [];
    for (let i = 0; i < textPoolSize; i++) {
      this.texts.push(new FloatingText());
    }

    this.shakeDuration = 0;
    this.shakeIntensity = 0;
    this.shakeOffsetX = 0;
    this.shakeOffsetY = 0;
  }

  getParticle() {
    for (let i = 0; i < this.particles.length; i++) {
      if (!this.particles[i].active) return this.particles[i];
    }
    // Recycle oldest if pool full
    return this.particles[0];
  }

  getText() {
    for (let i = 0; i < this.texts.length; i++) {
      if (!this.texts[i].active) return this.texts[i];
    }
    return this.texts[0];
  }

  // --- Particle Emitters ---

  emitFlap(x, y) {
    for (let i = 0; i < 4; i++) {
      const p = this.getParticle();
      p.init({
        x: x - 10 + (Math.random() * 6 - 3),
        y: y + (Math.random() * 8 - 4),
        vx: -1.5 - Math.random() * 1.5,
        vy: 1.0 + Math.random() * 1.5,
        size: 2 + Math.random() * 2,
        color: Math.random() > 0.5 ? '#d8b4fe' : '#ffffff',
        life: 0.25 + Math.random() * 0.15,
        shape: 'square',
        vRot: (Math.random() - 0.5) * 0.2,
      });
    }
  }

  emitSparkles(x, y, color = '#ffd700', count = 12) {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
      const speed = 1.5 + Math.random() * 3.5;
      const p = this.getParticle();
      p.init({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 3 + Math.random() * 3,
        color,
        life: 0.45 + Math.random() * 0.35,
        shape: 'star',
        gravity: 0.05,
        vRot: 0.15,
      });
    }
  }

  emitPerfectPass(x, y) {
    this.emitSparkles(x, y, '#38bdf8', 16);
    this.emitSparkles(x, y, '#facc15', 16);
    this.addFloatingText(x, y - 20, 'PERFECT! +10', '#facc15', 1.2);
  }

  emitHit(x, y) {
    for (let i = 0; i < 20; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 5;
      const p = this.getParticle();
      p.init({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 3 + Math.random() * 4,
        color: Math.random() > 0.5 ? '#ef4444' : '#ffffff',
        life: 0.35 + Math.random() * 0.3,
        shape: 'square',
        gravity: 0.1,
      });
    }
  }

  emitDebris(x, y, color = '#78716c', count = 10) {
    for (let i = 0; i < count; i++) {
      const angle = (Math.random() - 0.5) * Math.PI;
      const speed = 1.5 + Math.random() * 4;
      const p = this.getParticle();
      p.init({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        size: 2 + Math.random() * 4,
        color,
        life: 0.6 + Math.random() * 0.4,
        shape: 'square',
        gravity: 0.2,
      });
    }
  }

  emitEmbers(width, height, count = 2) {
    for (let i = 0; i < count; i++) {
      const p = this.getParticle();
      p.init({
        x: Math.random() * width,
        y: height + 5,
        vx: -1.5 - Math.random() * 2,
        vy: -1.5 - Math.random() * 2.5,
        size: 2 + Math.random() * 2,
        color: Math.random() > 0.4 ? '#f97316' : '#ef4444',
        life: 1.5 + Math.random() * 1.5,
        shape: 'square',
      });
    }
  }

  emitSpeedLines(width, height, count = 2) {
    for (let i = 0; i < count; i++) {
      const p = this.getParticle();
      p.init({
        x: width + 20,
        y: Math.random() * height,
        vx: -12 - Math.random() * 8,
        vy: 0,
        size: 2 + Math.random() * 3,
        color: 'rgba(168, 85, 247, 0.4)',
        life: 0.3 + Math.random() * 0.2,
        shape: 'line',
      });
    }
  }

  addFloatingText(x, y, text, color = '#ffd700', scale = 1) {
    const t = this.getText();
    t.init({ x, y, text, color, scale });
  }

  shake(duration = 0.3, intensity = 8) {
    this.shakeDuration = duration;
    this.shakeIntensity = intensity;
  }

  update(dt) {
    // Screen shake countdown
    if (this.shakeDuration > 0) {
      this.shakeDuration -= dt;
      const currentIntensity = this.shakeIntensity * Math.max(0, this.shakeDuration / 0.3);
      this.shakeOffsetX = (Math.random() * 2 - 1) * currentIntensity;
      this.shakeOffsetY = (Math.random() * 2 - 1) * currentIntensity;
    } else {
      this.shakeOffsetX = 0;
      this.shakeOffsetY = 0;
    }

    // Update particles
    for (let i = 0; i < this.particles.length; i++) {
      if (this.particles[i].active) {
        this.particles[i].update(dt);
      }
    }

    // Update floating texts
    for (let i = 0; i < this.texts.length; i++) {
      if (this.texts[i].active) {
        this.texts[i].update(dt);
      }
    }
  }

  draw(ctx) {
    for (let i = 0; i < this.particles.length; i++) {
      if (this.particles[i].active) {
        this.particles[i].draw(ctx);
      }
    }
    for (let i = 0; i < this.texts.length; i++) {
      if (this.texts[i].active) {
        this.texts[i].draw(ctx);
      }
    }
  }

  reset() {
    this.particles.forEach((p) => (p.active = false));
    this.texts.forEach((t) => (t.active = false));
    this.shakeDuration = 0;
    this.shakeOffsetX = 0;
    this.shakeOffsetY = 0;
  }
}

