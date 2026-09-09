/**
 * Bat Escape - Main Game Orchestrator
 * Connects player physics, procedural obstacles, rewards, dynamic difficulty,
 * parallax world rendering, retro audio synthesis, and HUD systems at 60 FPS.
 */

import { Player } from './player.js';
import { World } from './world.js';
import { ObstacleManager } from './obstacles.js';
import { RewardManager } from './rewards.js';
import { ParticleSystem } from './particles.js';
import { DifficultyManager } from './difficulty.js';
import { UIManager } from './ui.js';
import { audio } from './audio.js';
import { storage } from './storage.js';

export const GAME_STATES = {
  MENU: 'MENU',
  PLAYING: 'PLAYING',
  PAUSED: 'PAUSED',
  GAMEOVER: 'GAMEOVER',
};

export class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');

    // Virtual resolution (16:9 responsive arcade ratio)
    this.width = 800;
    this.height = 500;

    // State machine
    this.state = GAME_STATES.MENU;
    this.score = 0;
    this.combo = 1;
    this.comboCount = 0;
    this.comboDecayTimer = 0;
    this.comboDecayMax = 3.5;
    this.streak = 0;
    this.obstaclesPassed = 0;
    this.rewardsCollected = 0;
    this.perfectPassesCount = 0;

    // Subsystems
    this.player = new Player(120, this.height / 2);
    this.world = new World(this.width, this.height);
    this.obstacles = new ObstacleManager(45);
    this.rewards = new RewardManager(50);
    this.particles = new ParticleSystem(400, 40);
    this.difficulty = new DifficultyManager();
    this.ui = new UIManager();

    // Spawning timer
    this.spawnDistanceCounter = 0;

    // Time tracking
    this.lastTime = performance.now();
    this.isTouchDevice = false;

    this.init();
  }

  init() {
    this.handleResize();
    window.addEventListener('resize', () => this.handleResize());

    // Connect UI callbacks
    this.ui.initDOM({
      onStart: () => this.startGame(),
      onResume: () => this.resumeGame(),
      onRestart: () => this.startGame(),
      onMainMenu: () => this.toMainMenu(),
      onTogglePause: () => this.togglePause(),
    });

    // Difficulty hooks
    this.difficulty.onLevelUp = (level) => {
      this.world.setLevel(level, this.difficulty.activeEvent?.type === 'BLOOD_MOON');
      audio.setLevel(level.level, !!this.difficulty.activeBoss);
      audio.playLevelUp();
      this.ui.triggerFlash(level.colorScheme.accent, 0.4);
      this.ui.triggerBanner(`LEVEL UP!`, `${level.level} — ${level.name}`, level.colorScheme.accent, 2.5);
    };

    this.difficulty.onBossTrigger = (bossType) => {
      this.obstacles.boss.init(bossType, this.width);
      audio.setLevel(this.difficulty.currentLevelIndex + 1, true);
      const bossTitle = bossType === 'nightmare_boss' ? '💀 NIGHTMARE OVERLORD 💀' : '🦇 GARGOYLE CREATURE 🦇';
      this.ui.triggerFlash('#ef4444', 0.5);
      this.ui.triggerBanner('WARNING: BOSS ENCOUNTER!', bossTitle, '#ef4444', 3.0);
    };

    this.difficulty.onBossDefeated = (bossType) => {
      this.obstacles.boss.active = false;
      audio.setLevel(this.difficulty.currentLevelIndex + 1, false);
      audio.playBossDefeat();
      const bonusPts = bossType === 'nightmare_boss' ? 500 : 250;
      this.score += bonusPts;
      this.particles.shake(0.6, 12);
      this.particles.emitSparkles(this.width / 2, this.height / 2, '#facc15', 40);
      this.ui.triggerFlash('#facc15', 0.6);
      this.ui.triggerBanner('YOU SURVIVED!', `+${bonusPts} BOSS BONUS!`, '#facc15', 3.0);

      if (bossType === 'mini_boss') {
        storage.checkAchievement('demon_slayer');
      }
    };

    this.difficulty.onEventStart = (event) => {
      this.ui.triggerBanner(event.banner, event.description, '#f97316', 2.8);
      if (event.type === 'BLOOD_MOON') {
        this.world.setLevel(this.difficulty.getCurrentLevel(), true);
      }
    };

    this.difficulty.onEventEnd = (event) => {
      if (event.type === 'BLOOD_MOON') {
        this.world.setLevel(this.difficulty.getCurrentLevel(), false);
      }
    };

    // Input handlers
    this.setupInputHandlers();

    // Start in menu state
    this.toMainMenu();

    // Launch 60 FPS animation loop
    requestAnimationFrame((t) => this.loop(t));
  }

  handleResize() {
    const container = this.canvas.parentElement || document.body;
    const contW = container.clientWidth || window.innerWidth;
    const contH = container.clientHeight || window.innerHeight;

    // Calculate aspect ratio fit (16:10 or 16:9 arcade)
    const targetRatio = this.width / this.height;
    let renderW = contW;
    let renderH = contW / targetRatio;

    if (renderH > contH) {
      renderH = contH;
      renderW = contH * targetRatio;
    }

    // High DPI Canvas backing store
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = Math.round(this.width * dpr);
    this.canvas.height = Math.round(this.height * dpr);

    this.canvas.style.width = `${Math.round(renderW)}px`;
    this.canvas.style.height = `${Math.round(renderH)}px`;

    // Scale canvas context
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.ctx.imageSmoothingEnabled = false;

    this.world.resize(this.width, this.height);
    this.obstacles.worldHeight = this.height;
  }

  setupInputHandlers() {
    // Keyboard inputs
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        this.handleActionInput();
      } else if (e.code === 'KeyP' || e.code === 'Escape') {
        e.preventDefault();
        this.togglePause();
      }
    });

    // Pointer / Touch inputs on canvas
    const handlePointer = (e) => {
      e.preventDefault();
      this.isTouchDevice = true;
      audio.resume();
      this.handleActionInput();
    };

    this.canvas.addEventListener('pointerdown', handlePointer, { passive: false });
    this.canvas.addEventListener('touchstart', handlePointer, { passive: false });
  }

  handleActionInput() {
    if (this.state === GAME_STATES.PLAYING) {
      this.player.flap(this.particles);
    } else if (this.state === GAME_STATES.MENU) {
      this.startGame();
    } else if (this.state === GAME_STATES.GAMEOVER) {
      // Optional quick restart on tap after short delay
    }
  }

  togglePause() {
    if (this.state === GAME_STATES.PLAYING) {
      this.state = GAME_STATES.PAUSED;
      audio.stopBGM();
      this.ui.showPause(true);
    } else if (this.state === GAME_STATES.PAUSED) {
      this.resumeGame();
    }
  }

  resumeGame() {
    if (this.state === GAME_STATES.PAUSED) {
      this.state = GAME_STATES.PLAYING;
      this.lastTime = performance.now();
      this.ui.showPause(false);
      audio.startBGM(this.difficulty.currentLevelIndex + 1, !!this.difficulty.activeBoss);
    }
  }

  toMainMenu() {
    this.state = GAME_STATES.MENU;
    audio.stopBGM();
    this.ui.showMainMenu();
    this.resetEntities();
  }

  startGame() {
    this.resetEntities();
    this.state = GAME_STATES.PLAYING;
    this.lastTime = performance.now();
    this.ui.hideAllOverlays();
    audio.startBGM(1, false);
    this.ui.triggerBanner('FLIGHT BEGINS!', 'DODGE • COLLECT • SURVIVE', '#38bdf8', 1.8);
  }

  resetEntities() {
    this.score = 0;
    this.combo = 1;
    this.comboCount = 0;
    this.comboDecayTimer = 0;
    this.streak = 0;
    this.obstaclesPassed = 0;
    this.rewardsCollected = 0;
    this.perfectPassesCount = 0;
    this.spawnDistanceCounter = 0;

    this.player.reset(120, this.height / 2);
    this.obstacles.reset();
    this.rewards.reset();
    this.particles.reset();
    this.difficulty.reset();
    this.world.setLevel(this.difficulty.getCurrentLevel(), false);
  }

  // --- Main Game Loop ---

  loop(timestamp) {
    const rawDt = (timestamp - this.lastTime) / 1000;
    this.lastTime = timestamp;
    const dt = Math.min(rawDt, 0.05); // Cap to prevent large frame jumps

    this.update(dt);
    this.draw();

    requestAnimationFrame((t) => this.loop(t));
  }

  update(dt) {
    if (this.state === GAME_STATES.PLAYING) {
      // 1. Difficulty & Speed
      const currentSpeed = this.player.slowTimer > 0 ? this.difficulty.getCurrentSpeed() * 0.55 : this.difficulty.getCurrentSpeed();
      this.difficulty.update(dt, this.score, currentSpeed);

      // 2. Player Update
      this.player.update(dt, this.particles, this.height);

      if (this.player.isDead) {
        this.gameOver();
        return;
      }

      // 3. World & Particles
      this.world.update(dt, currentSpeed, this.particles);
      this.particles.update(dt);

      // 4. Procedural Obstacle Spawning
      // When boss is active, normal obstacle spawning is paused or spaced wide
      const spacing = this.difficulty.getObstacleSpacing();
      this.spawnDistanceCounter += currentSpeed * dt * 60;

      if (!this.difficulty.activeBoss && this.spawnDistanceCounter >= spacing) {
        this.spawnDistanceCounter = 0;
        this.obstacles.spawnPattern({
          spawnX: this.width + 50,
          level: this.difficulty.getCurrentLevel(),
          gapSize: this.difficulty.getCurrentGap(),
          currentSpeed,
          rewardManager: this.rewards,
        });
      }

      // 5. Update Obstacles & Boss
      this.obstacles.update(dt, currentSpeed, this.player, this.particles, audio);

      // 6. Update Rewards
      this.rewards.update(dt, currentSpeed, this.player);

      // 7. Collision & Near-Miss Detection
      this.checkCollisionsAndPasses();

      // 8. Combo Decay
      if (this.combo > 1) {
        this.comboDecayTimer -= dt;
        if (this.comboDecayTimer <= 0) {
          this.combo = 1;
          this.comboCount = 0;
        }
      }

      // 9. UI Announcement updates
      this.ui.update(dt);
    } else if (this.state === GAME_STATES.GAMEOVER) {
      this.particles.update(dt);
      this.ui.update(dt);
    }
  }

  checkCollisionsAndPasses() {
    // Check obstacle segments
    for (let i = 0; i < this.obstacles.pool.length; i++) {
      const seg = this.obstacles.pool[i];
      if (!seg.active) continue;

      // Obstacle collision
      if (seg.checkCollision(this.player)) {
        const fatal = this.player.takeDamage(1, this.particles);
        this.combo = 1;
        this.comboCount = 0;
        this.streak = 0;
        if (fatal) {
          this.gameOver();
          return;
        }
      }

      // Perfect Pass check (grazing close to edge)
      if (seg.checkPerfectPass(this.player)) {
        this.perfectPassesCount += 1;
        this.score += 10 * this.combo;
        this.increaseCombo();
        audio.playPerfectPass();
        this.ui.triggerFlash('#facc15', 0.25);
        this.particles.emitPerfectPass(this.player.x, this.player.y);
      }

      // Passed obstacle successfully
      if (!seg.passed && seg.x + seg.width < this.player.x) {
        seg.passed = true;
        // Only count once per vertical pair (isTop)
        if (seg.isTop) {
          this.obstaclesPassed += 1;
          this.streak += 1;
          this.score += 1 * this.combo;

          // Streak notifications
          if (this.streak > 0 && this.streak % 10 === 0) {
            audio.playStreak();
            this.particles.addFloatingText(this.player.x, this.player.y - 30, `STREAK x${this.streak}!`, '#a855f7', 1.2);
          }
        }
      }
    }

    // Check rewards pickup
    for (let i = 0; i < this.rewards.pool.length; i++) {
      const item = this.rewards.pool[i];
      if (!item.active) continue;

      if (item.checkCollision(this.player)) {
        const typeDef = item.collect(this.player, this.particles);
        if (typeDef.points > 0) {
          this.score += typeDef.points * this.combo;
          this.rewardsCollected += 1;
          this.increaseCombo();
        } else if (typeDef.points < 0) {
          // Fake cursed coin penalty
          this.score = Math.max(0, this.score + typeDef.points);
          this.combo = 1;
          this.comboCount = 0;
        }
      }
    }
  }

  increaseCombo() {
    this.comboCount += 1;
    this.comboDecayTimer = this.comboDecayMax;

    if (this.comboCount >= 10) {
      this.combo = 5;
    } else if (this.comboCount >= 5) {
      this.combo = 3;
    } else if (this.comboCount >= 2) {
      this.combo = 2;
    }
  }

  gameOver() {
    this.state = GAME_STATES.GAMEOVER;
    audio.stopBGM();
    this.particles.shake(0.5, 14);
    this.particles.emitHit(this.player.x, this.player.y);

    const isNewHigh = storage.saveHighScore(this.score);
    storage.recordGameEnd({
      score: this.score,
      level: this.difficulty.getCurrentLevel().level,
      rewardsCollected: this.rewardsCollected,
      obstaclesPassed: this.obstaclesPassed,
      combo: this.combo,
      perfectPassesCount: this.perfectPassesCount,
      streak: this.streak,
    });

    setTimeout(() => {
      this.ui.showGameOver({
        score: this.score,
        highScore: storage.getHighScore(),
        level: this.difficulty.getCurrentLevel(),
        obstaclesPassed: this.obstaclesPassed,
        rewardsCollected: this.rewardsCollected,
        isNewHigh,
      });
    }, 600);
  }

  draw() {
    const ctx = this.ctx;
    ctx.save();

    // Apply Screen Shake offset
    ctx.translate(this.particles.shakeOffsetX, this.particles.shakeOffsetY);

    // 1. World & Parallax Environment
    this.world.draw(ctx);

    // 2. Obstacles & Hazards
    this.obstacles.draw(ctx);

    // 3. Rewards & Collectibles
    this.rewards.draw(ctx);

    // 4. Player Bat Entity
    this.player.draw(ctx);

    // 5. Particles & Floating Texts
    this.particles.draw(ctx);

    // 6. HUD (Only during active gameplay or boss)
    if (this.state === GAME_STATES.PLAYING || this.state === GAME_STATES.PAUSED) {
      this.ui.drawHUD(ctx, this.width, this.height, {
        score: this.score,
        highScore: storage.getHighScore(),
        level: this.difficulty.getCurrentLevel(),
        combo: this.combo,
        comboDecay: this.comboDecayTimer / this.comboDecayMax,
        streak: this.streak,
        player: this.player,
        dangerProgress: this.difficulty.getDangerProgress(),
        activeBoss: this.difficulty.activeBoss,
        bossTimer: this.difficulty.bossTimer,
        bossMaxDuration: this.difficulty.bossMaxDuration,
      });
    }

    ctx.restore();
  }
}

// Auto-boot game when DOM is ready or immediately if already loaded
function bootBatEscape() {
  if (!window.batGameInstance) {
    window.batGameInstance = new Game('game-canvas');
  }
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', bootBatEscape);
} else {
  bootBatEscape();
}
