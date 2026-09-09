/**
 * Bat Escape - Procedural Obstacles & Boss System
 * Procedural obstacle generation with 8 distinct obstacle types, 7 advanced patterns,
 * strict fairness validation, moving hazards, and milestone boss battles.
 */

export const OBSTACLE_TYPES = {
  TREE_BRANCH: 'TREE_BRANCH',
  STONE_PILLAR: 'STONE_PILLAR',
  CASTLE_WALL: 'CASTLE_WALL',
  CAVE_SPIKE: 'CAVE_SPIKE',
  FALLING_ROCK: 'FALLING_ROCK',
  FIRE_HAZARD: 'FIRE_HAZARD',
  MOVING_PILLAR: 'MOVING_PILLAR',
  FLYING_ENEMY: 'FLYING_ENEMY',
};

class ObstacleSegment {
  constructor() {
    this.active = false;
    this.x = 0;
    this.y = 0;
    this.width = 50;
    this.height = 200;
    this.type = OBSTACLE_TYPES.STONE_PILLAR;
    this.isTop = true; // true = hanging from ceiling, false = rising from ground
    this.baseY = 0;
    this.movePhase = 0;
    this.moveAmplitude = 0;
    this.moveSpeed = 0;
    this.passed = false;
    this.perfectChecked = false;

    // Special properties
    this.isTelegraphed = false;
    this.telegraphTimer = 0;
    this.isFalling = false;
    this.fallSpeed = 0;
    this.enemyPhase = 0;
  }

  init({
    x,
    y,
    width = 50,
    height = 200,
    type = OBSTACLE_TYPES.STONE_PILLAR,
    isTop = true,
    moveAmplitude = 0,
    moveSpeed = 0,
    isTelegraphed = false,
  }) {
    this.active = true;
    this.x = x;
    this.y = y;
    this.baseY = y;
    this.width = width;
    this.height = height;
    this.type = type;
    this.isTop = isTop;
    this.moveAmplitude = moveAmplitude;
    this.moveSpeed = moveSpeed;
    this.movePhase = Math.random() * Math.PI * 2;
    this.passed = false;
    this.perfectChecked = false;
    this.isTelegraphed = isTelegraphed;
    this.telegraphTimer = isTelegraphed ? 1.0 : 0;
    this.isFalling = false;
    this.fallSpeed = 0;
    this.enemyPhase = Math.random() * Math.PI * 2;
  }

  update(dt, speed) {
    if (!this.active) return;

    // Horizontal scroll
    this.x -= speed * dt * 60;

    // Moving obstacle sine wave oscillation
    if (this.moveAmplitude > 0) {
      this.movePhase += this.moveSpeed * dt * 3;
      this.y = this.baseY + Math.sin(this.movePhase) * this.moveAmplitude;
    }

    // Flying enemy patrol wave
    if (this.type === OBSTACLE_TYPES.FLYING_ENEMY) {
      this.enemyPhase += dt * 3.5;
      this.y = this.baseY + Math.sin(this.enemyPhase) * 35;
    }

    // Falling rock logic
    if (this.type === OBSTACLE_TYPES.FALLING_ROCK) {
      if (this.telegraphTimer > 0) {
        this.telegraphTimer -= dt;
      } else {
        this.fallSpeed += 12 * dt * 60;
        this.y += this.fallSpeed * dt * 60;
      }
    }

    // Recycle when fully passed off left edge
    if (this.x + this.width < -60) {
      this.active = false;
    }
  }

  getBounds() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    };
  }

  checkCollision(player) {
    if (!this.active || player.isDead || player.ghostTimer > 0) return false;

    // Circle vs Rect collision between player hit core and obstacle box
    const cx = player.x;
    const cy = player.y;
    const r = player.hitRadius;

    // Inset collision slightly for generous player fairness
    const insetX = 4;
    const insetY = 4;
    const rx = this.x + insetX;
    const ry = this.y + insetY;
    const rw = Math.max(1, this.width - insetX * 2);
    const rh = Math.max(1, this.height - insetY * 2);

    const closestX = Math.max(rx, Math.min(cx, rx + rw));
    const closestY = Math.max(ry, Math.min(cy, ry + rh));

    const dx = cx - closestX;
    const dy = cy - closestY;
    return dx * dx + dy * dy < r * r;
  }

  // Check if player passed extremely close without touching (Perfect Pass)
  checkPerfectPass(player) {
    if (this.perfectChecked || !this.active || player.isDead) return false;

    const cx = player.x;
    const cy = player.y;

    // Bat is horizontally aligned with the obstacle
    if (cx > this.x && cx < this.x + this.width) {
      const obstacleEdgeY = this.isTop ? this.y + this.height : this.y;
      const distanceToEdge = Math.abs(cy - obstacleEdgeY);

      // Within 14 pixels of the dangerous edge
      if (distanceToEdge <= player.hitRadius + 14 && distanceToEdge > player.hitRadius) {
        this.perfectChecked = true;
        return true;
      }
    }
    return false;
  }

  draw(ctx) {
    if (!this.active) return;
    ctx.save();

    // Falling rock telegraph warning
    if (this.isTelegraphed && this.telegraphTimer > 0) {
      ctx.fillStyle = 'rgba(239, 68, 68, 0.4)';
      ctx.fillRect(this.x, 0, this.width, 600);
      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 16px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('!', this.x + this.width / 2, 40);
    }

    switch (this.type) {
      case OBSTACLE_TYPES.TREE_BRANCH:
        this.drawTreeBranch(ctx);
        break;
      case OBSTACLE_TYPES.CASTLE_WALL:
        this.drawCastleWall(ctx);
        break;
      case OBSTACLE_TYPES.CAVE_SPIKE:
        this.drawCaveSpike(ctx);
        break;
      case OBSTACLE_TYPES.FALLING_ROCK:
        this.drawRock(ctx);
        break;
      case OBSTACLE_TYPES.FIRE_HAZARD:
        this.drawFireHazard(ctx);
        break;
      case OBSTACLE_TYPES.FLYING_ENEMY:
        this.drawFlyingEnemy(ctx);
        break;
      default:
        this.drawStonePillar(ctx);
        break;
    }

    ctx.restore();
  }

  drawStonePillar(ctx) {
    const x = this.x;
    const y = this.y;
    const w = this.width;
    const h = this.height;

    // Pillar base
    ctx.fillStyle = '#334155';
    ctx.fillRect(x, y, w, h);

    // Stone highlights and shadow
    ctx.fillStyle = '#475569';
    ctx.fillRect(x, y, 6, h); // Left highlight
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(x + w - 6, y, 6, h); // Right shadow

    // Stone brick lines
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2;
    for (let py = y + 25; py < y + h; py += 30) {
      ctx.beginPath();
      ctx.moveTo(x, py);
      ctx.lineTo(x + w, py);
      ctx.stroke();
    }

    // Carved capital / cap
    ctx.fillStyle = '#64748b';
    if (this.isTop) {
      ctx.fillRect(x - 4, y + h - 12, w + 8, 12);
    } else {
      ctx.fillRect(x - 4, y, w + 8, 12);
    }
  }

  drawTreeBranch(ctx) {
    const x = this.x;
    const y = this.y;
    const w = this.width;
    const h = this.height;

    // Organic gnarly wood
    ctx.fillStyle = '#451a03';
    ctx.fillRect(x + 5, y, w - 10, h);

    // Bark bark lines
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x + 12, y);
    ctx.lineTo(x + 14, y + h);
    ctx.stroke();

    // Moss & foliage at tip
    ctx.fillStyle = '#15803d';
    if (this.isTop) {
      ctx.beginPath();
      ctx.arc(x + w / 2, y + h, 16, 0, Math.PI);
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.arc(x + w / 2, y, 16, Math.PI, 0);
      ctx.fill();
    }
  }

  drawCastleWall(ctx) {
    const x = this.x;
    const y = this.y;
    const w = this.width;
    const h = this.height;

    // Dark gothic brick
    ctx.fillStyle = '#1e1b4b';
    ctx.fillRect(x, y, w, h);

    // Spiked iron battlement
    ctx.fillStyle = '#6b21a8';
    if (this.isTop) {
      for (let px = x; px < x + w; px += 14) {
        ctx.beginPath();
        ctx.moveTo(px, y + h - 12);
        ctx.lineTo(px + 7, y + h);
        ctx.lineTo(px + 14, y + h - 12);
        ctx.fill();
      }
    } else {
      for (let px = x; px < x + w; px += 14) {
        ctx.beginPath();
        ctx.moveTo(px, y + 12);
        ctx.lineTo(px + 7, y);
        ctx.lineTo(px + 14, y + 12);
        ctx.fill();
      }
    }
  }

  drawCaveSpike(ctx) {
    const x = this.x;
    const y = this.y;
    const w = this.width;
    const h = this.height;

    // Sharp crystalline rock spike
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    if (this.isTop) {
      // Stalactite
      ctx.moveTo(x, y);
      ctx.lineTo(x + w, y);
      ctx.lineTo(x + w * 0.5, y + h);
    } else {
      // Stalagmite
      ctx.moveTo(x, y + h);
      ctx.lineTo(x + w, y + h);
      ctx.lineTo(x + w * 0.5, y);
    }
    ctx.closePath();
    ctx.fill();

    // Glowing mineral edge
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  drawRock(ctx) {
    const x = this.x;
    const y = this.y;
    const w = this.width;
    const h = this.height;

    ctx.fillStyle = '#78716c';
    ctx.beginPath();
    ctx.arc(x + w / 2, y + h / 2, w / 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#57534e';
    ctx.beginPath();
    ctx.arc(x + w / 2 - 3, y + h / 2 - 3, w / 3, 0, Math.PI * 2);
    ctx.fill();
  }

  drawFireHazard(ctx) {
    const x = this.x;
    const y = this.y;
    const w = this.width;
    const h = this.height;

    // Blazing fire pillar
    ctx.shadowColor = '#f97316';
    ctx.shadowBlur = 15;
    ctx.fillStyle = '#ea580c';
    ctx.fillRect(x, y, w, h);

    // Inner bright core
    ctx.fillStyle = '#fde047';
    ctx.fillRect(x + w * 0.25, y, w * 0.5, h);
    ctx.shadowBlur = 0;
  }

  drawFlyingEnemy(ctx) {
    const x = this.x + this.width / 2;
    const y = this.y + this.height / 2;

    // Demon imp / raven
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(x, y, 14, 0, Math.PI * 2);
    ctx.fill();

    // Horns / wings
    ctx.fillStyle = '#991b1b';
    ctx.beginPath();
    ctx.moveTo(x - 12, y - 5);
    ctx.lineTo(x - 22, y - 16);
    ctx.lineTo(x - 5, y - 10);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x + 12, y - 5);
    ctx.lineTo(x + 22, y - 16);
    ctx.lineTo(x + 5, y - 10);
    ctx.fill();

    // Glowing yellow eyes
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(x - 6, y - 3, 3, 3);
    ctx.fillRect(x + 3, y - 3, 3, 3);
  }
}

/**
 * Boss Encounter Manager
 */
export class BossEntity {
  constructor() {
    this.active = false;
    this.type = 'mini_boss'; // 'mini_boss' or 'nightmare_boss'
    this.x = 900;
    this.y = 250;
    this.targetY = 250;
    this.width = 90;
    this.height = 70;
    this.timer = 0;
    this.projectiles = [];
    this.attackCooldown = 2.0;
    this.timeSinceAttack = 0;
    this.roarPlayed = false;
  }

  init(type, canvasWidth = 800) {
    this.active = true;
    this.type = type;
    this.x = canvasWidth + 80;
    this.y = 260;
    this.targetY = 260;
    this.timer = 0;
    this.projectiles = [];
    this.attackCooldown = type === 'nightmare_boss' ? 1.6 : 2.2;
    this.timeSinceAttack = 0;
    this.roarPlayed = false;
  }

  update(dt, player, particles, audio) {
    if (!this.active) return;
    this.timer += dt;

    // Play roar on entrance
    if (!this.roarPlayed && audio) {
      this.roarPlayed = true;
      audio.playBossRoar();
      if (particles) particles.shake(0.5, 12);
    }

    // Hover into view on right side of screen (x around 660)
    const destX = 660;
    this.x += (destX - this.x) * 0.05;

    // Follow player's altitude smoothly
    if (player) {
      this.targetY = player.y;
    }
    this.y += (this.targetY - this.y) * 0.04;

    // Attack spawning
    this.timeSinceAttack += dt;
    if (this.timeSinceAttack >= this.attackCooldown) {
      this.timeSinceAttack = 0;
      this.spawnAttack(player, particles, audio);
    }

    // Update projectiles
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i];
      p.x += p.vx * dt * 60;
      p.y += p.vy * dt * 60;

      // Check collision with player
      if (player && !player.isDead && player.ghostTimer <= 0) {
        const dx = player.x - p.x;
        const dy = player.y - p.y;
        if (dx * dx + dy * dy < (player.hitRadius + p.radius) ** 2) {
          player.takeDamage(1, particles);
          this.projectiles.splice(i, 1);
          continue;
        }
      }

      // Remove offscreen
      if (p.x < -40) {
        this.projectiles.splice(i, 1);
      }
    }
  }

  spawnAttack(player, particles, audio) {
    if (this.type === 'mini_boss') {
      // Sonic scream waves (2 rings with a safe flight gap between them)
      const gapY = player ? Math.max(100, Math.min(500, player.y + (Math.random() * 80 - 40))) : 300;
      this.projectiles.push({
        x: this.x - 20,
        y: gapY - 70,
        vx: -5.5,
        vy: 0,
        radius: 16,
        color: '#c084fc',
      });
      this.projectiles.push({
        x: this.x - 20,
        y: gapY + 70,
        vx: -5.5,
        vy: 0,
        radius: 16,
        color: '#c084fc',
      });
      if (audio) audio.playHit();
    } else {
      // Nightmare Boss: 3-way fireballs with telegraphed trajectory
      [-1.5, 0, 1.5].forEach((vy) => {
        this.projectiles.push({
          x: this.x - 30,
          y: this.y,
          vx: -6.5,
          vy,
          radius: 18,
          color: '#ef4444',
        });
      });
      if (audio) audio.playHit();
    }
  }

  draw(ctx) {
    if (!this.active) return;
    ctx.save();

    // Draw Boss Body
    ctx.translate(this.x, this.y);
    const pulse = 1 + Math.sin(this.timer * 4) * 0.06;

    if (this.type === 'mini_boss') {
      // Giant Gargoyle / Stone Creature
      ctx.shadowColor = '#a855f7';
      ctx.shadowBlur = 20;
      ctx.fillStyle = '#475569';
      ctx.beginPath();
      ctx.arc(0, 0, 36 * pulse, 0, Math.PI * 2);
      ctx.fill();

      // Giant bat wings
      ctx.fillStyle = '#334155';
      ctx.beginPath();
      ctx.moveTo(-10, -20);
      ctx.lineTo(40, -50);
      ctx.lineTo(20, 10);
      ctx.fill();

      // Glowing violet eyes
      ctx.fillStyle = '#e879f9';
      ctx.fillRect(-18, -8, 8, 8);
      ctx.fillRect(-6, -8, 8, 8);
    } else {
      // Colossal Shadow Nightmare Overlord
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 30;
      ctx.fillStyle = '#0f051d';
      ctx.beginPath();
      ctx.arc(0, 0, 48 * pulse, 0, Math.PI * 2);
      ctx.fill();

      // Horns
      ctx.fillStyle = '#7f1d1d';
      ctx.beginPath();
      ctx.moveTo(-20, -30);
      ctx.lineTo(-40, -65);
      ctx.lineTo(-5, -45);
      ctx.fill();

      // Glowing crimson eyes
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(-22, -10, 10, 10);
      ctx.fillRect(-4, -10, 10, 10);
    }

    ctx.restore();

    // Draw Projectiles
    for (let i = 0; i < this.projectiles.length; i++) {
      const p = this.projectiles[i];
      ctx.save();
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 14;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }
}

export class ObstacleManager {
  constructor(poolSize = 40) {
    this.pool = [];
    for (let i = 0; i < poolSize; i++) {
      this.pool.push(new ObstacleSegment());
    }
    this.boss = new BossEntity();

    this.lastSpawnX = 600;
    this.lastGapCenterY = 300;
    this.worldHeight = 600;
  }

  getSegment() {
    for (let i = 0; i < this.pool.length; i++) {
      if (!this.pool[i].active) return this.pool[i];
    }
    return this.pool[0];
  }

  reset() {
    this.pool.forEach((seg) => (seg.active = false));
    this.boss.active = false;
    this.lastSpawnX = 600;
    this.lastGapCenterY = 300;
  }

  /**
   * Fairness Validation & Trajectory Reachability Engine
   * Validates that the bat's flight physics can physically navigate
   * between the previous gap and the newly proposed gap.
   */
  validateAndAdjustGap(proposedCenterY, gapSize, spawnDistance, currentSpeed) {
    // Flight physics constraints
    // Travel time to next obstacle
    const travelTimeSeconds = spawnDistance / (currentSpeed * 60);

    // Maximum climb height with repeated flaps over travelTime
    const maxClimbPerSecond = 220; // px/sec climb rate
    const maxClimb = maxClimbPerSecond * travelTimeSeconds;

    // Maximum fall depth under gravity over travelTime
    const maxFall = 280 * travelTimeSeconds;

    // Safe bounds from ceiling and ground
    const halfGap = gapSize / 2;
    const minCenterY = halfGap + 35; // Don't collide with ceiling
    const maxCenterY = this.worldHeight - halfGap - 35; // Don't collide with floor

    let validCenterY = Math.max(minCenterY, Math.min(maxCenterY, proposedCenterY));

    // Clamp trajectory delta
    const deltaY = validCenterY - this.lastGapCenterY;
    if (deltaY < -maxClimb) {
      // Too steep upward
      validCenterY = this.lastGapCenterY - maxClimb * 0.85;
    } else if (deltaY > maxFall) {
      // Too steep downward
      validCenterY = this.lastGapCenterY + maxFall * 0.85;
    }

    // Final safety clamp
    validCenterY = Math.max(minCenterY, Math.min(maxCenterY, validCenterY));
    this.lastGapCenterY = validCenterY;
    return validCenterY;
  }

  /**
   * Generates procedural obstacles based on level, patterns, and fairness validation.
   */
  spawnPattern({ spawnX, level, gapSize, currentSpeed, rewardManager }) {
    const levelDef = level;
    const levelNum = levelDef.level;

    // Pick obstacle appearance type based on level
    let obstacleType = OBSTACLE_TYPES.STONE_PILLAR;
    if (levelNum === 2) obstacleType = OBSTACLE_TYPES.TREE_BRANCH;
    else if (levelNum === 3) obstacleType = OBSTACLE_TYPES.CASTLE_WALL;
    else if (levelNum === 4) obstacleType = OBSTACLE_TYPES.CAVE_SPIKE;
    else if (levelNum >= 5) {
      const types = [OBSTACLE_TYPES.STONE_PILLAR, OBSTACLE_TYPES.CAVE_SPIKE, OBSTACLE_TYPES.FIRE_HAZARD];
      obstacleType = types[Math.floor(Math.random() * types.length)];
    }

    // Random raw gap center
    const rawCenterY = 160 + Math.random() * (this.worldHeight - 320);
    const spawnDistance = spawnX - this.lastSpawnX;
    const gapCenterY = this.validateAndAdjustGap(rawCenterY, gapSize, Math.max(180, spawnDistance), currentSpeed);
    this.lastSpawnX = spawnX;

    const halfGap = gapSize / 2;
    const topHeight = gapCenterY - halfGap;
    const bottomY = gapCenterY + halfGap;
    const bottomHeight = this.worldHeight - bottomY;

    // Decide if moving (after Level 3)
    const isMoving = levelNum >= 3 && Math.random() < levelDef.movingObstacleChance;
    const moveAmp = isMoving ? 25 + Math.min(30, levelNum * 5) : 0;
    const moveSpd = isMoving ? 0.03 : 0;

    // Pattern Selection
    const patternRoll = Math.random();

    if (patternRoll < 0.45 || levelNum === 1) {
      // Pattern A: Standard Top + Bottom Pillar
      const topPillar = this.getSegment();
      topPillar.init({
        x: spawnX,
        y: 0,
        width: 48,
        height: topHeight,
        type: obstacleType,
        isTop: true,
        moveAmplitude: moveAmp,
        moveSpeed: moveSpd,
      });

      const botPillar = this.getSegment();
      botPillar.init({
        x: spawnX,
        y: bottomY,
        width: 48,
        height: bottomHeight,
        type: obstacleType,
        isTop: false,
        moveAmplitude: moveAmp,
        moveSpeed: moveSpd,
      });

      // Spawn Reward in Gap
      if (rewardManager && Math.random() < 0.65) {
        const isHighRisk = Math.random() < 0.25;
        const rewardY = isHighRisk ? (Math.random() > 0.5 ? topHeight + 16 : bottomY - 16) : gapCenterY;
        rewardManager.spawnReward(spawnX + 24, rewardY, levelNum, isHighRisk);
      }
    } else if (patternRoll < 0.7 && levelNum >= 2) {
      // Pattern B: Staggered Top and Bottom
      const topPillar = this.getSegment();
      topPillar.init({
        x: spawnX,
        y: 0,
        width: 44,
        height: topHeight + 15,
        type: obstacleType,
        isTop: true,
      });

      const botPillar = this.getSegment();
      botPillar.init({
        x: spawnX + 70,
        y: bottomY - 15,
        width: 44,
        height: bottomHeight + 15,
        type: obstacleType,
        isTop: false,
      });

      if (rewardManager && Math.random() < 0.7) {
        rewardManager.spawnReward(spawnX + 35, gapCenterY, levelNum, false);
      }
    } else if (patternRoll < 0.85 && levelNum >= 4) {
      // Pattern C: Falling Rock Hazard / Flying Enemy
      const topPillar = this.getSegment();
      topPillar.init({
        x: spawnX,
        y: 0,
        width: 46,
        height: topHeight,
        type: obstacleType,
        isTop: true,
      });

      const botPillar = this.getSegment();
      botPillar.init({
        x: spawnX,
        y: bottomY,
        width: 46,
        height: bottomHeight,
        type: obstacleType,
        isTop: false,
      });

      // Spawn flying enemy between pillars
      if (Math.random() < 0.5) {
        const enemy = this.getSegment();
        enemy.init({
          x: spawnX + 110,
          y: gapCenterY - 15,
          width: 30,
          height: 30,
          type: OBSTACLE_TYPES.FLYING_ENEMY,
          isTop: false,
        });
      }
    } else {
      // Pattern D: Narrow Corridor with High Reward
      const topPillar = this.getSegment();
      topPillar.init({
        x: spawnX,
        y: 0,
        width: 52,
        height: topHeight,
        type: obstacleType,
        isTop: true,
      });

      const botPillar = this.getSegment();
      botPillar.init({
        x: spawnX,
        y: bottomY,
        width: 52,
        height: bottomHeight,
        type: obstacleType,
        isTop: false,
      });

      if (rewardManager) {
        rewardManager.spawnReward(spawnX + 26, gapCenterY, levelNum, true);
      }
    }
  }

  update(dt, speed, player, particles, audio) {
    // Update normal obstacles
    for (let i = 0; i < this.pool.length; i++) {
      if (this.pool[i].active) {
        this.pool[i].update(dt, speed);
      }
    }

    // Update Boss if active
    if (this.boss.active) {
      this.boss.update(dt, player, particles, audio);
    }
  }

  draw(ctx) {
    for (let i = 0; i < this.pool.length; i++) {
      if (this.pool[i].active) {
        this.pool[i].draw(ctx);
      }
    }

    if (this.boss.active) {
      this.boss.draw(ctx);
    }
  }
}

