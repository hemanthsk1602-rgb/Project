/**
 * Bat Escape - UI & HUD System
 * Renders retro pixel-art HUD directly to canvas (Score, Combo, Best, Level, Hearts, Danger bar)
 * and manages DOM overlay modals (Menu, Pause, Game Over, Achievements, How to Play).
 */

import { storage, ACHIEVEMENTS_LIST } from './storage.js';
import { audio } from './audio.js';

export class UIManager {
  constructor() {
    this.bannerText = '';
    this.bannerSubtext = '';
    this.bannerColor = '#facc15';
    this.bannerTimer = 0;
    this.bannerMaxTime = 1;

    // Toast notification for achievements
    this.toastQueue = [];
    this.activeToast = null;
    this.toastTimer = 0;

    // Screen flash effect for Perfect Pass or Level Up
    this.flashColor = '#ffffff';
    this.flashAlpha = 0;

    // DOM containers
    this.menuOverlay = null;
    this.pauseOverlay = null;
    this.gameOverOverlay = null;
    this.howToPlayModal = null;
    this.achievementsModal = null;
  }

  initDOM(callbacks) {
    this.callbacks = callbacks;
    this.menuOverlay = document.getElementById('menu-overlay');
    this.pauseOverlay = document.getElementById('pause-overlay');
    this.gameOverOverlay = document.getElementById('game-over-overlay');
    this.howToPlayModal = document.getElementById('how-to-play-modal');
    this.achievementsModal = document.getElementById('achievements-modal');

    // Attach button listeners
    this.setupListeners();

    // Hook storage achievement unlock listener
    storage.onAchievementUnlocked = (achDef) => {
      this.queueToast(achDef);
    };
  }

  setupListeners() {
    // Menu buttons
    const startBtn = document.getElementById('btn-start-game');
    if (startBtn) startBtn.onclick = () => this.callbacks.onStart();

    const howToBtn = document.getElementById('btn-how-to-play');
    if (howToBtn) howToBtn.onclick = () => this.showHowToPlay(true);

    const closeHowToBtn = document.getElementById('btn-close-how-to');
    if (closeHowToBtn) closeHowToBtn.onclick = () => this.showHowToPlay(false);

    const achBtn = document.getElementById('btn-achievements');
    if (achBtn) achBtn.onclick = () => this.showAchievements(true);

    const closeAchBtn = document.getElementById('btn-close-achievements');
    if (closeAchBtn) closeAchBtn.onclick = () => this.showAchievements(false);

    // Pause buttons
    const resumeBtn = document.getElementById('btn-resume');
    if (resumeBtn) resumeBtn.onclick = () => this.callbacks.onResume();

    const restartBtn = document.getElementById('btn-restart');
    if (restartBtn) restartBtn.onclick = () => this.callbacks.onRestart();

    const menuBtn = document.getElementById('btn-main-menu');
    if (menuBtn) menuBtn.onclick = () => this.callbacks.onMainMenu();

    // Quick / Mobile pause button
    const mobilePauseBtn = document.getElementById('mobile-pause-btn');
    if (mobilePauseBtn) {
      mobilePauseBtn.onclick = (e) => {
        e.stopPropagation();
        if (this.callbacks.onTogglePause) this.callbacks.onTogglePause();
      };
    }

    // Game Over buttons
    const playAgainBtn = document.getElementById('btn-play-again');
    if (playAgainBtn) playAgainBtn.onclick = () => this.callbacks.onRestart();

    const goMenuBtn = document.getElementById('btn-gameover-menu');
    if (goMenuBtn) goMenuBtn.onclick = () => this.callbacks.onMainMenu();

    // Sound toggle buttons
    const soundBtns = document.querySelectorAll('.btn-sound-toggle');
    soundBtns.forEach((btn) => {
      btn.onclick = () => {
        const muted = audio.toggleMute();
        this.updateSoundButtons(muted);
      };
    });
    this.updateSoundButtons(storage.getMuted());
  }

  updateSoundButtons(isMuted) {
    const soundBtns = document.querySelectorAll('.btn-sound-toggle');
    soundBtns.forEach((btn) => {
      btn.innerText = isMuted ? '🔇 SOUND: OFF' : '🔊 SOUND: ON';
    });
  }

  showMainMenu() {
    if (this.menuOverlay) this.menuOverlay.classList.remove('hidden');
    if (this.pauseOverlay) this.pauseOverlay.classList.add('hidden');
    if (this.gameOverOverlay) this.gameOverOverlay.classList.add('hidden');
    this.showHowToPlay(false);
    this.showAchievements(false);

    // Refresh menu high score
    const bestEl = document.getElementById('menu-high-score');
    if (bestEl) {
      bestEl.innerText = String(storage.getHighScore()).padStart(6, '0');
    }
  }

  hideAllOverlays() {
    if (this.menuOverlay) this.menuOverlay.classList.add('hidden');
    if (this.pauseOverlay) this.pauseOverlay.classList.add('hidden');
    if (this.gameOverOverlay) this.gameOverOverlay.classList.add('hidden');
    this.showHowToPlay(false);
    this.showAchievements(false);
  }

  showPause(show = true) {
    if (this.pauseOverlay) {
      if (show) this.pauseOverlay.classList.remove('hidden');
      else this.pauseOverlay.classList.add('hidden');
    }
  }

  showGameOver({ score, highScore, level, obstaclesPassed, rewardsCollected, isNewHigh }) {
    if (this.gameOverOverlay) {
      this.gameOverOverlay.classList.remove('hidden');

      const scoreEl = document.getElementById('gameover-score');
      if (scoreEl) scoreEl.innerText = String(score).padStart(6, '0');

      const bestEl = document.getElementById('gameover-best');
      if (bestEl) bestEl.innerText = String(highScore).padStart(6, '0');

      const levelEl = document.getElementById('gameover-level');
      if (levelEl) levelEl.innerText = `${level.level} (${level.name})`;

      const obsEl = document.getElementById('gameover-obstacles');
      if (obsEl) obsEl.innerText = String(obstaclesPassed);

      const rewEl = document.getElementById('gameover-rewards');
      if (rewEl) rewEl.innerText = String(rewardsCollected);

      const badgeEl = document.getElementById('gameover-new-high');
      if (badgeEl) {
        if (isNewHigh) badgeEl.classList.remove('hidden');
        else badgeEl.classList.add('hidden');
      }
    }
  }

  showHowToPlay(show = true) {
    if (this.howToPlayModal) {
      if (show) this.howToPlayModal.classList.remove('hidden');
      else this.howToPlayModal.classList.add('hidden');
    }
  }

  showAchievements(show = true) {
    if (this.achievementsModal) {
      if (show) {
        this.renderAchievementsList();
        this.achievementsModal.classList.remove('hidden');
      } else {
        this.achievementsModal.classList.add('hidden');
      }
    }
  }

  renderAchievementsList() {
    const listEl = document.getElementById('achievements-container');
    if (!listEl) return;

    listEl.innerHTML = '';
    ACHIEVEMENTS_LIST.forEach((ach) => {
      const isUnlocked = storage.isAchievementUnlocked(ach.id);
      const item = document.createElement('div');
      item.className = `achievement-item ${isUnlocked ? 'unlocked' : 'locked'}`;
      item.innerHTML = `
        <div class="ach-icon">${isUnlocked ? ach.icon : '🔒'}</div>
        <div class="ach-details">
          <div class="ach-title">${ach.title} ${isUnlocked ? '<span class="ach-badge">UNLOCKED</span>' : ''}</div>
          <div class="ach-desc">${ach.desc}</div>
        </div>
      `;
      listEl.appendChild(item);
    });
  }

  // --- Dynamic Canvas Announcements ---

  triggerBanner(title, subtext = '', color = '#facc15', duration = 2.5) {
    this.bannerText = title;
    this.bannerSubtext = subtext;
    this.bannerColor = color;
    this.bannerTimer = duration;
    this.bannerMaxTime = duration;
  }

  triggerFlash(color = '#ffffff', alpha = 0.45) {
    this.flashColor = color;
    this.flashAlpha = alpha;
  }

  queueToast(achievementDef) {
    this.toastQueue.push(achievementDef);
    audio.playStreak();
  }

  update(dt) {
    if (this.bannerTimer > 0) {
      this.bannerTimer -= dt;
    }
    if (this.flashAlpha > 0) {
      this.flashAlpha -= dt * 2.5;
      if (this.flashAlpha < 0) this.flashAlpha = 0;
    }

    // Toast updates
    if (this.activeToast) {
      this.toastTimer -= dt;
      if (this.toastTimer <= 0) {
        this.activeToast = null;
      }
    } else if (this.toastQueue.length > 0) {
      this.activeToast = this.toastQueue.shift();
      this.toastTimer = 3.2;
    }
  }

  drawHUD(ctx, width, height, state) {
    const {
      score = 0,
      highScore = 0,
      level,
      combo = 1,
      comboDecay = 0,
      streak = 0,
      player,
      dangerProgress = 0,
      activeBoss = null,
      bossTimer = 0,
      bossMaxDuration = 20,
    } = state;

    ctx.save();

    // 1. Top Bar Background Bar (Slight dark gradient for contrast)
    const barGrad = ctx.createLinearGradient(0, 0, 0, 75);
    barGrad.addColorStop(0, 'rgba(2, 6, 23, 0.7)');
    barGrad.addColorStop(1, 'rgba(2, 6, 23, 0)');
    ctx.fillStyle = barGrad;
    ctx.fillRect(0, 0, width, 75);

    // 2. Score & Level (Top Left)
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px "Press Start 2P", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('SCORE', 20, 24);

    ctx.font = 'bold 20px "Press Start 2P", monospace';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText(String(score).padStart(6, '0'), 20, 48);

    // Level & Subtitle
    ctx.font = '9px "Press Start 2P", monospace';
    ctx.fillStyle = level.colorScheme.accent;
    ctx.fillText(`LVL ${level.level} ${level.name}`, 20, 64);

    // 3. Combo Display (Top Center)
    if (combo > 1) {
      ctx.textAlign = 'center';
      const bounce = 1 + Math.sin(Date.now() * 0.01) * 0.08;
      ctx.font = `bold ${Math.round(15 * bounce)}px "Press Start 2P", monospace`;
      ctx.fillStyle = combo >= 5 ? '#ef4444' : combo >= 3 ? '#f59e0b' : '#facc15';
      ctx.fillText(`COMBO x${combo}`, width / 2, 28);

      // Combo decay bar
      const decayWidth = 100;
      const fillW = decayWidth * Math.max(0, Math.min(1, comboDecay));
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.fillRect(width / 2 - decayWidth / 2, 36, decayWidth, 4);
      ctx.fillStyle = combo >= 5 ? '#ef4444' : '#facc15';
      ctx.fillRect(width / 2 - decayWidth / 2, 36, fillW, 4);
    }

    // 4. Best Score & Streak (Top Right)
    ctx.textAlign = 'right';
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px "Press Start 2P", monospace';
    ctx.fillText('BEST', width - 20, 22);

    ctx.font = 'bold 15px "Press Start 2P", monospace';
    ctx.fillStyle = '#facc15';
    ctx.fillText(String(highScore).padStart(6, '0'), width - 20, 42);

    if (streak > 2) {
      ctx.font = '9px "Press Start 2P", monospace';
      ctx.fillStyle = '#a855f7';
      ctx.fillText(`STREAK x${streak}`, width - 20, 60);
    }

    // 5. Health Hearts (Under Score, Left)
    const heartX = 20;
    const heartY = 82;
    for (let i = 0; i < player.maxHealth; i++) {
      const isFilled = i < player.health;
      this.drawHeart(ctx, heartX + i * 22, heartY, isFilled);
    }

    // 6. Danger / Difficulty Progress Bar (Bottom Center)
    const gaugeW = 180;
    const gaugeH = 8;
    const gaugeX = width / 2 - gaugeW / 2;
    const gaugeY = height - 26;

    ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
    ctx.fillRect(gaugeX - 1, gaugeY - 1, gaugeW + 2, gaugeH + 2);

    ctx.fillStyle = level.colorScheme.accent;
    ctx.fillRect(gaugeX, gaugeY, gaugeW * dangerProgress, gaugeH);

    ctx.font = '8px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(`DANGER: LEVEL ${level.level}`, width / 2, gaugeY - 5);

    // 7. Active Power-Up Badges (Left side vertical stack)
    this.drawPowerupBadges(ctx, player, 20, 115);

    // 8. Boss Survival Health/Timer Bar (Top Center if active)
    if (activeBoss) {
      const bossBarW = 240;
      const bossBarH = 12;
      const bossBarX = width / 2 - bossBarW / 2;
      const bossBarY = 48;
      const remainProgress = Math.max(0, bossTimer / bossMaxDuration);

      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(bossBarX - 2, bossBarY - 2, bossBarW + 4, bossBarH + 4);

      ctx.fillStyle = activeBoss === 'nightmare_boss' ? '#ef4444' : '#a855f7';
      ctx.fillRect(bossBarX, bossBarY, bossBarW * remainProgress, bossBarH);

      ctx.font = '8px "Press Start 2P", monospace';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.fillText(
        `SURVIVE BOSS: ${Math.ceil(bossTimer)}s`,
        width / 2,
        bossBarY + 9
      );
    }

    // 9. Floating Central Banner Announcement
    if (this.bannerTimer > 0) {
      const alpha = Math.min(1, this.bannerTimer / 0.5);
      ctx.globalAlpha = alpha;
      ctx.textAlign = 'center';

      // Drop shadow banner box
      ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
      ctx.fillRect(0, height * 0.38, width, 70);

      ctx.font = 'bold 20px "Press Start 2P", monospace';
      ctx.fillStyle = this.bannerColor;
      ctx.fillText(this.bannerText, width / 2, height * 0.42);

      if (this.bannerSubtext) {
        ctx.font = '10px "Press Start 2P", monospace';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(this.bannerSubtext, width / 2, height * 0.46);
      }
      ctx.globalAlpha = 1.0;
    }

    // 10. Achievement Unlocked Toast (Top Right Popup)
    if (this.activeToast) {
      const toastW = 260;
      const toastH = 46;
      const toastX = width - toastW - 15;
      const toastY = 70;

      ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 2;
      ctx.fillRect(toastX, toastY, toastW, toastH);
      ctx.strokeRect(toastX, toastY, toastW, toastH);

      ctx.textAlign = 'left';
      ctx.font = '18px sans-serif';
      ctx.fillText(this.activeToast.icon, toastX + 10, toastY + 30);

      ctx.font = 'bold 9px "Press Start 2P", monospace';
      ctx.fillStyle = '#facc15';
      ctx.fillText('ACHIEVEMENT UNLOCKED!', toastX + 38, toastY + 18);

      ctx.font = '8px "Press Start 2P", monospace';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(this.activeToast.title, toastX + 38, toastY + 34);
    }

    // 11. Fullscreen Flash Overlay
    if (this.flashAlpha > 0) {
      ctx.fillStyle = this.flashColor;
      ctx.globalAlpha = this.flashAlpha;
      ctx.fillRect(0, 0, width, height);
      ctx.globalAlpha = 1.0;
    }

    ctx.restore();
  }

  drawHeart(ctx, x, y, filled = true) {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = filled ? '#ef4444' : '#475569';
    // Pixel heart
    ctx.fillRect(-6, -4, 4, 3);
    ctx.fillRect(2, -4, 4, 3);
    ctx.fillRect(-7, -2, 14, 4);
    ctx.fillRect(-5, 2, 10, 3);
    ctx.fillRect(-3, 5, 6, 2);
    ctx.fillRect(-1, 7, 2, 2);
    ctx.restore();
  }

  drawPowerupBadges(ctx, player, startX, startY) {
    let offsetY = 0;
    const items = [
      { active: player.hasShield, icon: '🛡️', name: 'SHIELD', time: null },
      { active: player.magnetTimer > 0, icon: '🧲', name: 'MAGNET', time: player.magnetTimer },
      { active: player.speedTimer > 0, icon: '⚡', name: 'SPEED', time: player.speedTimer },
      { active: player.slowTimer > 0, icon: '🕐', name: 'SLOW', time: player.slowTimer },
      { active: player.ghostTimer > 0, icon: '👻', name: 'GHOST', time: player.ghostTimer },
    ];

    items.forEach((p) => {
      if (p.active) {
        ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
        ctx.fillRect(startX, startY + offsetY, 90, 18);

        ctx.font = '10px sans-serif';
        ctx.fillText(p.icon, startX + 4, startY + offsetY + 13);

        ctx.font = '7px "Press Start 2P", monospace';
        ctx.fillStyle = '#ffffff';
        const label = p.time !== null ? `${p.name} ${Math.ceil(p.time)}s` : p.name;
        ctx.fillText(label, startX + 22, startY + offsetY + 12);

        offsetY += 22;
      }
    });
  }
}
