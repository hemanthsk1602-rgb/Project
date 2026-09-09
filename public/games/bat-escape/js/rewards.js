/**
 * Bat Escape - Rewards & Collectibles System
 * Handles Bat Coins, Moon Crystals, Golden Bats, Blood Moons, Power-ups,
 * and high-risk/reward positioning logic with object pooling.
 */

import { audio } from './audio.js';

export const REWARD_TYPES = {
  COIN: {
    type: 'COIN',
    points: 5,
    radius: 11,
    color: '#fbbf24',
    name: 'Bat Coin',
  },
  CRYSTAL: {
    type: 'CRYSTAL',
    points: 15,
    radius: 13,
    color: '#38bdf8',
    name: 'Moon Crystal',
  },
  GOLDEN_BAT: {
    type: 'GOLDEN_BAT',
    points: 30,
    radius: 15,
    color: '#facc15',
    name: 'Golden Bat',
  },
  BLOOD_MOON: {
    type: 'BLOOD_MOON',
    points: 100,
    radius: 18,
    color: '#ef4444',
    name: 'Blood Moon',
  },
  FAKE_COIN: {
    type: 'FAKE_COIN',
    points: -5,
    radius: 11,
    color: '#a855f7',
    name: 'Cursed Coin',
  },
  POWERUP_SHIELD: {
    type: 'POWERUP_SHIELD',
    points: 10,
    radius: 14,
    color: '#38bdf8',
    name: 'Shadow Shield',
    powerupType: 'shield',
    icon: '🛡️',
  },
  POWERUP_MAGNET: {
    type: 'POWERUP_MAGNET',
    points: 10,
    radius: 14,
    color: '#c084fc',
    name: 'Moon Magnet',
    powerupType: 'magnet',
    icon: '🧲',
  },
  POWERUP_SPEED: {
    type: 'POWERUP_SPEED',
    points: 10,
    radius: 14,
    color: '#facc15',
    name: 'Speed Burst',
    powerupType: 'speed',
    icon: '⚡',
  },
  POWERUP_SLOW: {
    type: 'POWERUP_SLOW',
    points: 10,
    radius: 14,
    color: '#2dd4bf',
    name: 'Slow Time',
    powerupType: 'slow',
    icon: '🕐',
  },
  POWERUP_GHOST: {
    type: 'POWERUP_GHOST',
    points: 10,
    radius: 14,
    color: '#c084fc',
    name: 'Ghost Mode',
    powerupType: 'ghost',
    icon: '👻',
  },
};

class RewardItem {
  constructor() {
    this.active = false;
    this.x = 0;
    this.y = 0;
    this.baseY = 0;
    this.typeDef = REWARD_TYPES.COIN;
    this.isHighRisk = false;
    this.bobPhase = Math.random() * Math.PI * 2;
    this.rotation = 0;
    this.collected = false;
  }

  init(x, y, typeDef, isHighRisk = false) {
    this.active = true;
    this.x = x;
    this.y = y;
    this.baseY = y;
    this.typeDef = typeDef;
    this.isHighRisk = isHighRisk;
    this.bobPhase = Math.random() * Math.PI * 2;
    this.rotation = 0;
    this.collected = false;
  }

  update(dt, speed, player) {
    if (!this.active) return;

    // Normal scrolling
    this.x -= speed * dt * 60;
    this.bobPhase += dt * 3.5;
    this.rotation += dt * 2.0;
    this.y = this.baseY + Math.sin(this.bobPhase) * 4;

    // Magnet attraction towards player
    if (player && player.magnetTimer > 0 && this.typeDef.type !== 'FAKE_COIN') {
      const dx = player.x - this.x;
      const dy = player.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const magnetRadius = 220;

      if (dist < magnetRadius && dist > 1) {
        const pullSpeed = (1 - dist / magnetRadius) * 12;
        this.x += (dx / dist) * pullSpeed;
        this.baseY += (dy / dist) * pullSpeed;
        this.y = this.baseY;
      }
    }

    // Deactivate when off screen
    if (this.x < -40) {
      this.active = false;
    }
  }

  checkCollision(player) {
    if (!this.active || player.isDead) return false;
    const dx = player.x - this.x;
    const dy = player.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    return dist < player.hitRadius + this.typeDef.radius;
  }

  collect(player, particles) {
    this.active = false;
    this.collected = true;

    // Play SFX & trigger power-up
    if (this.typeDef.type === 'COIN') {
      audio.playCoin();
      if (particles) {
        particles.emitSparkles(this.x, this.y, '#facc15', 12);
        particles.addFloatingText(this.x, this.y - 12, '+5', '#facc15', 0.9);
      }
    } else if (this.typeDef.type === 'CRYSTAL') {
      audio.playCrystal();
      if (particles) {
        particles.emitSparkles(this.x, this.y, '#38bdf8', 16);
        particles.addFloatingText(this.x, this.y - 14, '+15', '#38bdf8', 1.1);
      }
    } else if (this.typeDef.type === 'GOLDEN_BAT') {
      audio.playGoldenBat();
      if (particles) {
        particles.emitSparkles(this.x, this.y, '#f59e0b', 22);
        particles.addFloatingText(this.x, this.y - 16, '+30 GOLDEN BAT!', '#f59e0b', 1.25);
      }
    } else if (this.typeDef.type === 'BLOOD_MOON') {
      audio.playBloodMoon();
      if (particles) {
        particles.shake(0.25, 6);
        particles.emitSparkles(this.x, this.y, '#ef4444', 28);
        particles.addFloatingText(this.x, this.y - 20, '+100 BLOOD MOON!', '#ef4444', 1.4);
      }
    } else if (this.typeDef.type === 'FAKE_COIN') {
      audio.playHit();
      if (particles) {
        particles.shake(0.2, 5);
        particles.emitHit(this.x, this.y);
        particles.addFloatingText(this.x, this.y - 15, 'CURSED! -5', '#a855f7', 1.0);
      }
    } else if (this.typeDef.powerupType) {
      player.applyPowerup(this.typeDef.powerupType, 5.0, particles);
    }

    return this.typeDef;
  }

  draw(ctx) {
    if (!this.active) return;
    ctx.save();
    ctx.translate(this.x, this.y);

    const r = this.typeDef.radius;

    // High risk outer warning pulse
    if (this.isHighRisk) {
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.75)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 0, r + 5 + Math.sin(this.bobPhase * 2) * 2, 0, Math.PI * 2);
      ctx.stroke();
    }

    switch (this.typeDef.type) {
      case 'COIN':
        // Golden Bat Coin
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#fde047';
        ctx.beginPath();
        ctx.arc(0, 0, r - 2, 0, Math.PI * 2);
        ctx.fill();

        // Tiny bat icon stamped on coin
        ctx.fillStyle = '#78350f';
        ctx.beginPath();
        ctx.moveTo(0, 2);
        ctx.lineTo(-5, -3);
        ctx.lineTo(-2, 0);
        ctx.lineTo(0, -2);
        ctx.lineTo(2, 0);
        ctx.lineTo(5, -3);
        ctx.closePath();
        ctx.fill();
        break;

      case 'CRYSTAL':
        // Glowing cyan crystal
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 12;
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.moveTo(0, -r);
        ctx.lineTo(r * 0.75, 0);
        ctx.lineTo(0, r);
        ctx.lineTo(-r * 0.75, 0);
        ctx.closePath();
        ctx.fill();

        // Inner facet highlight
        ctx.fillStyle = '#e0f2fe';
        ctx.beginPath();
        ctx.moveTo(0, -r * 0.7);
        ctx.lineTo(r * 0.35, 0);
        ctx.lineTo(0, r * 0.7);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;
        break;

      case 'GOLDEN_BAT':
        // Golden winged bat idol
        ctx.shadowColor = '#facc15';
        ctx.shadowBlur = 14;
        ctx.fillStyle = '#eab308';
        // Wings
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-r, -r * 0.6);
        ctx.lineTo(-r * 0.7, r * 0.4);
        ctx.lineTo(0, 2);
        ctx.lineTo(r * 0.7, r * 0.4);
        ctx.lineTo(r, -r * 0.6);
        ctx.closePath();
        ctx.fill();

        // Core
        ctx.fillStyle = '#fef08a';
        ctx.beginPath();
        ctx.arc(0, 0, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        break;

      case 'BLOOD_MOON':
        // Pulsing crimson blood moon
        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = 18;
        ctx.fillStyle = '#b91c1c';
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#f87171';
        ctx.beginPath();
        ctx.arc(-2, -2, r * 0.65, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(-3, -3, 2, 2);
        ctx.shadowBlur = 0;
        break;

      case 'FAKE_COIN':
        // Purple cursed skull coin
        ctx.fillStyle = '#7e22ce';
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.fill();
        // Skull eyes
        ctx.fillStyle = '#1e1b4b';
        ctx.fillRect(-3, -2, 2, 2);
        ctx.fillRect(1, -2, 2, 2);
        break;

      default:
        // Power-ups with icon badge
        ctx.shadowColor = this.typeDef.color;
        ctx.shadowBlur = 12;
        ctx.fillStyle = this.typeDef.color;
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.fill();

        // White border
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.shadowBlur = 0;
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.typeDef.icon || '★', 0, 0);
        break;
    }

    ctx.restore();
  }
}

export class RewardManager {
  constructor(poolSize = 50) {
    this.pool = [];
    for (let i = 0; i < poolSize; i++) {
      this.pool.push(new RewardItem());
    }
  }

  getAvailableItem() {
    for (let i = 0; i < this.pool.length; i++) {
      if (!this.pool[i].active) return this.pool[i];
    }
    return this.pool[0];
  }

  spawnReward(x, y, level, isHighRisk = false) {
    const item = this.getAvailableItem();

    // Determine type based on probability and level
    const rand = Math.random();
    let typeDef = REWARD_TYPES.COIN;

    if (level === 6 && rand < 0.12) {
      // Fake coin trap in Nightmare Mode
      typeDef = REWARD_TYPES.FAKE_COIN;
    } else if (rand < 0.05) {
      // Rare power-up!
      const powerups = [
        REWARD_TYPES.POWERUP_SHIELD,
        REWARD_TYPES.POWERUP_MAGNET,
        REWARD_TYPES.POWERUP_SPEED,
        REWARD_TYPES.POWERUP_SLOW,
        REWARD_TYPES.POWERUP_GHOST,
      ];
      typeDef = powerups[Math.floor(Math.random() * powerups.length)];
    } else if (rand < 0.12 && level >= 3) {
      // Blood Moon (Rare)
      typeDef = REWARD_TYPES.BLOOD_MOON;
    } else if (rand < 0.25 && level >= 2) {
      // Golden Bat
      typeDef = REWARD_TYPES.GOLDEN_BAT;
    } else if (rand < 0.55) {
      // Moon Crystal
      typeDef = REWARD_TYPES.CRYSTAL;
    }

    // In high-risk slots, upgrade reward tier
    if (isHighRisk && typeDef === REWARD_TYPES.COIN) {
      typeDef = Math.random() > 0.4 ? REWARD_TYPES.CRYSTAL : REWARD_TYPES.GOLDEN_BAT;
    }

    item.init(x, y, typeDef, isHighRisk);
    return item;
  }

  update(dt, speed, player) {
    for (let i = 0; i < this.pool.length; i++) {
      if (this.pool[i].active) {
        this.pool[i].update(dt, speed, player);
      }
    }
  }

  draw(ctx) {
    for (let i = 0; i < this.pool.length; i++) {
      if (this.pool[i].active) {
        this.pool[i].draw(ctx);
      }
    }
  }

  reset() {
    this.pool.forEach((item) => (item.active = false));
  }
}

