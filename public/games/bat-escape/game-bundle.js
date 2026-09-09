/* Bat Escape Unified Bundle - Standalone & Browser Safe */
(() => {

// ==================== storage.js ====================
/**
 * Bat Escape - Storage Manager
 * Handles persistent game data, high scores, statistics, and achievements.
 */

const ACHIEVEMENTS_LIST = [
  {
    id: 'first_flight',
    title: 'FIRST FLIGHT',
    desc: 'Complete your first flight attempt.',
    icon: '🦇',
  },
  {
    id: 'night_flyer',
    title: 'NIGHT FLYER',
    desc: 'Achieve a score of 50 points.',
    icon: '🌙',
  },
  {
    id: 'deep_diver',
    title: 'DEEP DIVER',
    desc: 'Reach Level 3 — Haunted Castle.',
    icon: '🌲',
  },
  {
    id: 'cave_master',
    title: 'CAVE MASTER',
    desc: 'Reach Level 4 — Dark Caves.',
    icon: '🕳️',
  },
  {
    id: 'survivor',
    title: 'SURVIVOR',
    desc: 'Achieve a score of 250 points.',
    icon: '🛡️',
  },
  {
    id: 'demon_slayer',
    title: 'DEMON SLAYER',
    desc: 'Survive the Gargoyle Boss encounter.',
    icon: '⚔️',
  },
  {
    id: 'nightmare',
    title: 'NIGHTMARE',
    desc: 'Ascend into Level 6 — Nightmare Realm.',
    icon: '💀',
  },
  {
    id: 'perfect_pilot',
    title: 'PERFECT PILOT',
    desc: 'Perform 10 Perfect Passes close to obstacles.',
    icon: '⚡',
  },
  {
    id: 'collector',
    title: 'COLLECTOR',
    desc: 'Collect 100 total rewards.',
    icon: '🪙',
  },
  {
    id: 'combo_king',
    title: 'COMBO KING',
    desc: 'Reach a x5 Combo multiplier.',
    icon: '🔥',
  },
];

class StorageManager {
  constructor() {
    this.prefix = 'bat_escape_';
    this.memoryStore = {};
    this.onAchievementUnlocked = null;
  }

  isAvailable() {
    try {
      const testKey = '__test_storage__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }

  get(key, defaultValue) {
    if (this.isAvailable()) {
      try {
        const val = localStorage.getItem(this.prefix + key);
        return val !== null ? JSON.parse(val) : defaultValue;
      } catch {
        return defaultValue;
      }
    }
    return this.memoryStore[key] !== undefined ? this.memoryStore[key] : defaultValue;
  }

  set(key, value) {
    if (this.isAvailable()) {
      try {
        localStorage.setItem(this.prefix + key, JSON.stringify(value));
      } catch (err) {
        console.warn('Storage quota exceeded or error writing:', err);
      }
    }
    this.memoryStore[key] = value;
  }

  getHighScore() {
    return this.get('high_score', 0);
  }

  saveHighScore(score) {
    const currentHigh = this.getHighScore();
    if (score > currentHigh) {
      this.set('high_score', score);
      return true;
    }
    return false;
  }

  getStats() {
    return {
      highScore: this.get('high_score', 0),
      totalGames: this.get('total_games', 0),
      totalRewards: this.get('total_rewards', 0),
      highestLevel: this.get('highest_level', 1),
      bestCombo: this.get('best_combo', 1),
      perfectPasses: this.get('perfect_passes', 0),
      bestStreak: this.get('best_streak', 0),
      audioMuted: this.get('audio_muted', false),
      achievements: this.get('achievements', []),
    };
  }

  recordGameEnd({ score, level, rewardsCollected, obstaclesPassed, combo, perfectPassesCount, streak }) {
    const stats = this.getStats();
    stats.totalGames += 1;
    stats.totalRewards += rewardsCollected;
    if (score > stats.highScore) stats.highScore = score;
    if (level > stats.highestLevel) stats.highestLevel = level;
    if (combo > stats.bestCombo) stats.bestCombo = combo;
    stats.perfectPasses += perfectPassesCount;
    if (streak > stats.bestStreak) stats.bestStreak = streak;

    this.set('total_games', stats.totalGames);
    this.set('total_rewards', stats.totalRewards);
    this.set('high_score', stats.highScore);
    this.set('highest_level', stats.highestLevel);
    this.set('best_combo', stats.bestCombo);
    this.set('perfect_passes', stats.perfectPasses);
    this.set('best_streak', stats.bestStreak);

    // Check achievement triggers
    this.checkAchievement('first_flight');
    if (score >= 50) this.checkAchievement('night_flyer');
    if (level >= 3) this.checkAchievement('deep_diver');
    if (level >= 4) this.checkAchievement('cave_master');
    if (score >= 250) this.checkAchievement('survivor');
    if (level >= 6) this.checkAchievement('nightmare');
    if (stats.perfectPasses >= 10) this.checkAchievement('perfect_pilot');
    if (stats.totalRewards >= 100) this.checkAchievement('collector');
    if (combo >= 5) this.checkAchievement('combo_king');

    return stats;
  }

  checkAchievement(id) {
    const unlocked = this.get('achievements', []);
    if (!unlocked.includes(id)) {
      unlocked.push(id);
      this.set('achievements', unlocked);
      const achievementDef = ACHIEVEMENTS_LIST.find((a) => a.id === id);
      if (achievementDef && typeof this.onAchievementUnlocked === 'function') {
        this.onAchievementUnlocked(achievementDef);
      }
      return true;
    }
    return false;
  }

  isAchievementUnlocked(id) {
    const unlocked = this.get('achievements', []);
    return unlocked.includes(id);
  }

  getMuted() {
    return this.get('audio_muted', false);
  }

  setMuted(muted) {
    this.set('audio_muted', !!muted);
  }
}

const storage = new StorageManager();



// ==================== audio.js ====================
/**
 * Bat Escape - Audio System
 * Uses the Web Audio API to procedurally synthesize 8-bit retro sound effects
 * and dynamic adaptive ambient chiptune background music.
 */



class AudioManager {
  constructor() {
    this.ctx = null;
    this.isMuted = storage.getMuted();
    this.masterGain = null;
    this.musicGain = null;
    this.sfxGain = null;
    this.bgmTimer = null;
    this.currentLevel = 1;
    this.isBossActive = false;
    this.bgmNoteIndex = 0;
    this.tempo = 140; // BPM
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.7, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(0.8, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);

      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.musicGain.connect(this.masterGain);

      this.initialized = true;
    } catch (e) {
      console.warn('Web Audio API not supported or blocked:', e);
    }
  }

  resume() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    storage.setMuted(this.isMuted);
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.7, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  setMuted(muted) {
    this.isMuted = !!muted;
    storage.setMuted(this.isMuted);
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.7, this.ctx.currentTime);
    }
  }

  // Helper to create oscillators with ADSR envelopes
  playTone({ freq, type = 'square', duration = 0.1, gain = 0.3, slideTo = null, decay = true }) {
    if (!this.ctx || this.isMuted) return;
    this.resume();

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    if (slideTo) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(10, slideTo), t + duration);
    }

    g.gain.setValueAtTime(gain, t);
    if (decay) {
      g.gain.exponentialRampToValueAtTime(0.0001, t + duration);
    }

    osc.connect(g);
    g.connect(this.sfxGain);

    osc.start(t);
    osc.stop(t + duration);
  }

  playNoise({ duration = 0.15, gain = 0.25, filterFreq = 1000 }) {
    if (!this.ctx || this.isMuted) return;
    this.resume();

    const t = this.ctx.currentTime;
    const bufferSize = Math.floor(this.ctx.sampleRate * duration);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(filterFreq, t);
    filter.frequency.exponentialRampToValueAtTime(100, t + duration);

    const g = this.ctx.createGain();
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + duration);

    noise.connect(filter);
    filter.connect(g);
    g.connect(this.sfxGain);

    noise.start(t);
    noise.stop(t + duration);
  }

  // --- Sound Effects ---

  playFlap() {
    // Upward pitch bend swoosh (triangle wave)
    this.playTone({
      freq: 180,
      type: 'triangle',
      duration: 0.1,
      gain: 0.28,
      slideTo: 340,
    });
  }

  playCoin() {
    // 2-tone bright arcade chime
    if (!this.ctx || this.isMuted) return;
    this.playTone({ freq: 987.77, type: 'square', duration: 0.08, gain: 0.22 }); // B5
    setTimeout(() => {
      this.playTone({ freq: 1318.51, type: 'square', duration: 0.15, gain: 0.25 }); // E6
    }, 70);
  }

  playCrystal() {
    // 3-tone crystalline arpeggio
    if (!this.ctx || this.isMuted) return;
    [659.25, 880.0, 1174.66].forEach((f, i) => {
      setTimeout(() => {
        this.playTone({ freq: f, type: 'sine', duration: 0.16, gain: 0.28 });
      }, i * 60);
    });
  }

  playGoldenBat() {
    // Triumphant regal fanfare
    if (!this.ctx || this.isMuted) return;
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
      setTimeout(() => {
        this.playTone({ freq: f, type: 'triangle', duration: 0.18, gain: 0.35 });
      }, i * 70);
    });
  }

  playBloodMoon() {
    // Ominous resonant chord
    if (!this.ctx || this.isMuted) return;
    [130.81, 196.0, 261.63, 311.13].forEach((f) => {
      this.playTone({ freq: f, type: 'sawtooth', duration: 0.45, gain: 0.25, slideTo: f * 0.95 });
    });
  }

  playPowerup() {
    // Upward sci-fi sweep
    if (!this.ctx || this.isMuted) return;
    this.playTone({ freq: 300, type: 'sawtooth', duration: 0.28, gain: 0.3, slideTo: 900 });
  }

  playShieldBreak() {
    // Glass/forcefield fracture crunch
    this.playNoise({ duration: 0.25, gain: 0.35, filterFreq: 3200 });
    this.playTone({ freq: 440, type: 'square', duration: 0.18, gain: 0.25, slideTo: 110 });
  }

  playHit() {
    // Low crunch impact
    this.playNoise({ duration: 0.2, gain: 0.45, filterFreq: 800 });
    this.playTone({ freq: 160, type: 'triangle', duration: 0.2, gain: 0.4, slideTo: 40 });
  }

  playPerfectPass() {
    // Crisp double bell
    if (!this.ctx || this.isMuted) return;
    this.playTone({ freq: 1200, type: 'sine', duration: 0.08, gain: 0.3 });
    setTimeout(() => {
      this.playTone({ freq: 1800, type: 'sine', duration: 0.18, gain: 0.35 });
    }, 60);
  }

  playStreak() {
    // Mini victory chime
    if (!this.ctx || this.isMuted) return;
    [587.33, 739.99, 880.0].forEach((f, i) => {
      setTimeout(() => {
        this.playTone({ freq: f, type: 'triangle', duration: 0.12, gain: 0.25 });
      }, i * 50);
    });
  }

  playLevelUp() {
    // Triumphant 8-bit level fanfare
    if (!this.ctx || this.isMuted) return;
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((f, i) => {
      setTimeout(() => {
        this.playTone({ freq: f, type: 'square', duration: 0.2, gain: 0.3 });
      }, i * 90);
    });
  }

  playBossRoar() {
    // Deep rumbling roar
    this.playNoise({ duration: 0.8, gain: 0.5, filterFreq: 450 });
    this.playTone({ freq: 110, type: 'sawtooth', duration: 0.7, gain: 0.45, slideTo: 45 });
  }

  playBossDefeat() {
    // Huge explosion + celebration
    this.playNoise({ duration: 0.9, gain: 0.6, filterFreq: 2200 });
    const fanfares = [440, 554.37, 659.25, 880, 1108.73, 1318.51];
    fanfares.forEach((f, i) => {
      setTimeout(() => {
        this.playTone({ freq: f, type: 'square', duration: 0.25, gain: 0.35 });
      }, i * 80);
    });
  }

  playGameOver() {
    // Melancholy descending game over
    if (!this.ctx || this.isMuted) return;
    const notes = [440, 415.3, 392.0, 369.99, 329.63];
    notes.forEach((f, i) => {
      setTimeout(() => {
        this.playTone({ freq: f, type: 'sawtooth', duration: 0.3, gain: 0.3, slideTo: f * 0.96 });
      }, i * 150);
    });
  }

  playClick() {
    this.playTone({ freq: 800, type: 'triangle', duration: 0.04, gain: 0.2, slideTo: 400 });
  }

  // --- Dynamic Procedural Chiptune Music Engine ---

  startBGM(level = 1, isBoss = false) {
    this.currentLevel = level;
    this.isBossActive = isBoss;
    this.stopBGM();
    this.resume();
    this.scheduleNextNote();
  }

  setLevel(level, isBoss = false) {
    this.currentLevel = level;
    this.isBossActive = isBoss;
  }

  stopBGM() {
    if (this.bgmTimer) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  scheduleNextNote() {
    if (!this.ctx || this.isMuted) {
      this.bgmTimer = setTimeout(() => this.scheduleNextNote(), 250);
      return;
    }

    // Scale patterns per level
    // L1: C minor pentatonic peaceful (C3, Eb3, F3, G3, Bb3, C4)
    // L2: D dorian mystical (D3, F3, G3, A3, C4, D4)
    // L3: Haunted Castle gothic (A2, C3, E3, G3, A3)
    // L4: Dark Caves subterranean metallic (E2, G2, B2, D3, E3)
    // L5: Demon Realm fast infernal (D2, F2, Ab2, A2, D3)
    // L6: Nightmare frantic (C2, Eb2, F#2, G2, B2, C3)
    // Boss: Tension sirens (F#2, G2, C3, Db3)

    const scales = {
      1: [130.81, 155.56, 174.61, 196.0, 233.08, 261.63],
      2: [146.83, 174.61, 196.0, 220.0, 261.63, 293.66],
      3: [110.0, 130.81, 164.81, 196.0, 220.0, 261.63],
      4: [82.41, 98.0, 123.47, 146.83, 164.81, 196.0],
      5: [73.42, 87.31, 103.83, 110.0, 146.83, 174.61],
      6: [65.41, 77.78, 92.5, 98.0, 123.47, 130.81],
      boss: [92.5, 98.0, 130.81, 138.59, 185.0, 196.0],
    };

    const currentScale = this.isBossActive ? scales.boss : scales[this.currentLevel] || scales[1];
    const bpm = this.isBossActive
      ? 165
      : 110 + (this.currentLevel - 1) * 8; // Accelerates from 110 to 150 BPM
    const stepDuration = 60 / bpm / 2; // Eighth note duration in seconds

    // Pick note from arpeggio sequence
    const noteFreq = currentScale[this.bgmNoteIndex % currentScale.length];
    const isDownbeat = this.bgmNoteIndex % 4 === 0;

    // Bass note
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();

    osc.type = this.currentLevel >= 5 || this.isBossActive ? 'sawtooth' : 'triangle';
    osc.frequency.setValueAtTime(noteFreq, t);

    // Filter for muffled retro sound
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(this.isBossActive ? 1800 : 800 + this.currentLevel * 150, t);

    const gainVal = isDownbeat ? 0.22 : 0.12;
    g.gain.setValueAtTime(gainVal, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + stepDuration * 0.9);

    osc.connect(filter);
    filter.connect(g);
    g.connect(this.musicGain);

    osc.start(t);
    osc.stop(t + stepDuration * 0.9);

    // Accent melody tone on alternate beats
    if (this.bgmNoteIndex % 2 === 1 && Math.random() > 0.3) {
      const melodyOsc = this.ctx.createOscillator();
      const melodyGain = this.ctx.createGain();
      melodyOsc.type = 'square';
      const melodyFreq = noteFreq * 2;
      melodyOsc.frequency.setValueAtTime(melodyFreq, t);
      melodyGain.gain.setValueAtTime(0.07, t);
      melodyGain.gain.exponentialRampToValueAtTime(0.0001, t + stepDuration * 0.6);
      melodyOsc.connect(melodyGain);
      melodyGain.connect(this.musicGain);
      melodyOsc.start(t);
      melodyOsc.stop(t + stepDuration * 0.6);
    }

    this.bgmNoteIndex++;
    this.bgmTimer = setTimeout(() => {
      this.scheduleNextNote();
    }, stepDuration * 1000);
  }
}

const audio = new AudioManager();



// ==================== particles.js ====================
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

class ParticleSystem {
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



// ==================== player.js ====================
/**
 * Bat Escape - Player System
 * Pixel-art bat entity with responsive flight physics, wing flapping animation,
 * velocity-based rotation, health/lives management, and power-up states.
 */



class Player {
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



// ==================== difficulty.js ====================
/**
 * Bat Escape - Progressive Difficulty Manager
 * Dynamically scales speed, gap sizes, obstacle frequencies, and environmental events
 * across 6 distinct difficulty levels, boss encounters, and random challenge events.
 */

const DIFFICULTY_LEVELS = [
  {
    level: 1,
    name: 'NIGHT FLIGHT',
    icon: '🌙',
    scoreRange: [0, 25],
    speed: 3.2,
    gapSize: 175,
    minDistanceBetweenObstacles: 280,
    movingObstacleChance: 0.0,
    enemyChance: 0.0,
    hazardChance: 0.0,
    colorScheme: {
      skyTop: '#090d16',
      skyBottom: '#1e1b4b',
      terrain: '#0f172a',
      accent: '#38bdf8',
    },
    description: 'Learn the controls. Calm night sky.',
  },
  {
    level: 2,
    name: 'DEEP FOREST',
    icon: '🌲',
    scoreRange: [25, 75],
    speed: 3.8,
    gapSize: 155,
    minDistanceBetweenObstacles: 260,
    movingObstacleChance: 0.0,
    enemyChance: 0.05,
    hazardChance: 0.05,
    colorScheme: {
      skyTop: '#061a14',
      skyBottom: '#132e27',
      terrain: '#064e3b',
      accent: '#34d399',
    },
    description: 'Tree branches & uneven heights. Subtle forest fog.',
  },
  {
    level: 3,
    name: 'HAUNTED CASTLE',
    icon: '🏰',
    scoreRange: [75, 150],
    speed: 4.4,
    gapSize: 140,
    minDistanceBetweenObstacles: 245,
    movingObstacleChance: 0.2,
    enemyChance: 0.12,
    hazardChance: 0.12,
    colorScheme: {
      skyTop: '#13091f',
      skyBottom: '#2e1065',
      terrain: '#1e1b4b',
      accent: '#c084fc',
    },
    description: 'Stone pillars, hanging chains, and moving obstacles.',
  },
  {
    level: 4,
    name: 'DARK CAVES',
    icon: '🕳️',
    scoreRange: [150, 300],
    speed: 5.0,
    gapSize: 125,
    minDistanceBetweenObstacles: 230,
    movingObstacleChance: 0.35,
    enemyChance: 0.2,
    hazardChance: 0.2,
    colorScheme: {
      skyTop: '#0b1320',
      skyBottom: '#1e293b',
      terrain: '#0f172a',
      accent: '#38bdf8',
    },
    description: 'Stalactites, stalagmites, and narrow ceiling spikes.',
  },
  {
    level: 5,
    name: 'DEMON REALM',
    icon: '🔥',
    scoreRange: [300, 500],
    speed: 5.6,
    gapSize: 112,
    minDistanceBetweenObstacles: 220,
    movingObstacleChance: 0.45,
    enemyChance: 0.3,
    hazardChance: 0.3,
    colorScheme: {
      skyTop: '#1f0707',
      skyBottom: '#450a0a',
      terrain: '#260606',
      accent: '#f97316',
    },
    description: 'Fire hazards, flying demon imps, and falling rocks.',
  },
  {
    level: 6,
    name: 'NIGHTMARE MODE',
    icon: '💀',
    scoreRange: [500, Infinity],
    speed: 6.2,
    gapSize: 102,
    minDistanceBetweenObstacles: 210,
    movingObstacleChance: 0.55,
    enemyChance: 0.4,
    hazardChance: 0.4,
    colorScheme: {
      skyTop: '#180324',
      skyBottom: '#3b0764',
      terrain: '#12021c',
      accent: '#f43f5e',
    },
    description: 'Extreme endgame! Speed lines, rapid sequences, and chaos.',
  },
];

const CHALLENGE_EVENTS = [
  {
    type: 'BAT_STORM',
    name: 'BAT STORM',
    banner: '🦇 BAT STORM IMMINENT! 🦇',
    duration: 8,
    description: 'Silhouette bats sweep across the sky!',
  },
  {
    type: 'FALLING_ROCKS',
    name: 'FALLING ROCKS',
    banner: '⚠️ WARNING: FALLING ROCKS! ⚠️',
    duration: 9,
    description: 'Boulders tumble down from the cavern ceiling!',
  },
  {
    type: 'BLOOD_MOON',
    name: 'BLOOD MOON',
    banner: '🔴 BLOOD MOON RISES! RARE REWARDS! 🔴',
    duration: 10,
    description: 'Rare blood moons and golden relics emerge!',
  },
  {
    type: 'SWARM',
    name: 'SWARM',
    banner: '⚡ ENEMY SWARM APPROACHING! ⚡',
    duration: 8,
    description: 'Phantom predators glide in coordinated waves!',
  },
  {
    type: 'RAPID_FIRE',
    name: 'RAPID FIRE',
    banner: '🔥 RAPID FIRE! HIGH SPEED DRIFT! 🔥',
    duration: 7,
    description: 'Quick-paced rhythmic obstacles with double score!',
  },
];

class DifficultyManager {
  constructor() {
    this.score = 0;
    this.distance = 0;
    this.timeSurvived = 0;
    this.currentLevelIndex = 0;
    this.multiplier = 1.0;

    // Boss state tracking
    this.bossMilestone1Passed = false; // Score 200
    this.bossMilestone2Passed = false; // Score 500
    this.activeBoss = null; // 'mini_boss' or 'nightmare_boss' or null
    this.bossTimer = 0;
    this.bossMaxDuration = 20;

    // Challenge events tracking
    this.activeEvent = null;
    this.eventTimer = 0;
    this.eventCooldown = 25; // Seconds between random events
    this.timeSinceLastEvent = 0;

    // Callbacks
    this.onLevelUp = null;
    this.onBossTrigger = null;
    this.onBossDefeated = null;
    this.onEventStart = null;
    this.onEventEnd = null;
  }

  reset() {
    this.score = 0;
    this.distance = 0;
    this.timeSurvived = 0;
    this.currentLevelIndex = 0;
    this.multiplier = 1.0;
    this.bossMilestone1Passed = false;
    this.bossMilestone2Passed = false;
    this.activeBoss = null;
    this.bossTimer = 0;
    this.activeEvent = null;
    this.eventTimer = 0;
    this.timeSinceLastEvent = 0;
  }

  getCurrentLevel() {
    return DIFFICULTY_LEVELS[this.currentLevelIndex];
  }

  getDangerProgress() {
    const current = this.getCurrentLevel();
    const [minScore, maxScore] = current.scoreRange;
    if (maxScore === Infinity) {
      // In nightmare mode, gauge cycles every 100 points
      return Math.min(1, ((this.score - 500) % 100) / 100);
    }
    const range = maxScore - minScore;
    return Math.max(0, Math.min(1, (this.score - minScore) / range));
  }

  update(dt, currentScore, playerSpeed) {
    this.score = currentScore;
    this.timeSurvived += dt;
    this.distance += playerSpeed * dt * 60;

    // 1. Calculate dynamic multiplier
    // Smooth continuous formula clamped safely to 3.0
    const rawMultiplier = 1.0 + this.score / 450 + this.distance / 5000;
    this.multiplier = Math.min(3.0, Math.max(1.0, rawMultiplier));

    // 2. Check Level Progression
    let newLevelIndex = 0;
    for (let i = DIFFICULTY_LEVELS.length - 1; i >= 0; i--) {
      if (this.score >= DIFFICULTY_LEVELS[i].scoreRange[0]) {
        newLevelIndex = i;
        break;
      }
    }

    if (newLevelIndex > this.currentLevelIndex) {
      this.currentLevelIndex = newLevelIndex;
      if (this.onLevelUp) {
        this.onLevelUp(this.getCurrentLevel());
      }
    }

    // 3. Check Boss Milestones
    if (!this.activeBoss) {
      if (this.score >= 200 && !this.bossMilestone1Passed) {
        this.bossMilestone1Passed = true;
        this.triggerBoss('mini_boss', 18);
      } else if (this.score >= 500 && !this.bossMilestone2Passed) {
        this.bossMilestone2Passed = true;
        this.triggerBoss('nightmare_boss', 24);
      }
    }

    // 4. Update Boss Sequence
    if (this.activeBoss) {
      this.bossTimer -= dt;
      if (this.bossTimer <= 0) {
        this.completeBoss();
      }
    }

    // 5. Update Challenge Events (Only at Level 2+ when no boss is active)
    if (!this.activeBoss && this.currentLevelIndex >= 1) {
      if (this.activeEvent) {
        this.eventTimer -= dt;
        if (this.eventTimer <= 0) {
          const endedEvent = this.activeEvent;
          this.activeEvent = null;
          this.timeSinceLastEvent = 0;
          if (this.onEventEnd) this.onEventEnd(endedEvent);
        }
      } else {
        this.timeSinceLastEvent += dt;
        // Higher difficulty triggers events more reliably
        const interval = Math.max(18, this.eventCooldown - this.currentLevelIndex * 2);
        if (this.timeSinceLastEvent >= interval && Math.random() < 0.35 * dt) {
          this.triggerRandomEvent();
        }
      }
    }
  }

  triggerBoss(bossType, duration = 20) {
    this.activeBoss = bossType;
    this.bossTimer = duration;
    this.bossMaxDuration = duration;
    // Cancel any active event during boss
    if (this.activeEvent && this.onEventEnd) {
      this.onEventEnd(this.activeEvent);
      this.activeEvent = null;
    }
    if (this.onBossTrigger) {
      this.onBossTrigger(bossType);
    }
  }

  completeBoss() {
    const defeatedBoss = this.activeBoss;
    this.activeBoss = null;
    this.timeSinceLastEvent = 0; // Give breathing room after boss
    if (this.onBossDefeated) {
      this.onBossDefeated(defeatedBoss);
    }
  }

  triggerRandomEvent() {
    const randomIndex = Math.floor(Math.random() * CHALLENGE_EVENTS.length);
    const event = CHALLENGE_EVENTS[randomIndex];
    this.activeEvent = event;
    this.eventTimer = event.duration;
    if (this.onEventStart) {
      this.onEventStart(event);
    }
  }

  // --- Dynamic Parameter Getters ---

  getCurrentSpeed() {
    const base = this.getCurrentLevel().speed;
    const bonus = (this.multiplier - 1.0) * 0.8;
    return base + bonus;
  }

  getCurrentGap() {
    const base = this.getCurrentLevel().gapSize;
    const reduction = (this.multiplier - 1.0) * 12;
    // Strict minimum gap ensures fair passage for bat
    return Math.max(98, base - reduction);
  }

  getObstacleSpacing() {
    const base = this.getCurrentLevel().minDistanceBetweenObstacles;
    const reduction = (this.multiplier - 1.0) * 18;
    return Math.max(200, base - reduction);
  }
}



// ==================== world.js ====================
/**
 * Bat Escape - World & Parallax Environment System
 * Handles multi-layered parallax backgrounds, dynamic day/night/biome visual progression,
 * ambient particles, and smooth transitions across all 6 levels.
 */

class World {
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



// ==================== rewards.js ====================
/**
 * Bat Escape - Rewards & Collectibles System
 * Handles Bat Coins, Moon Crystals, Golden Bats, Blood Moons, Power-ups,
 * and high-risk/reward positioning logic with object pooling.
 */



const REWARD_TYPES = {
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

class RewardManager {
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



// ==================== obstacles.js ====================
/**
 * Bat Escape - Procedural Obstacles & Boss System
 * Procedural obstacle generation with 8 distinct obstacle types, 7 advanced patterns,
 * strict fairness validation, moving hazards, and milestone boss battles.
 */

const OBSTACLE_TYPES = {
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
class BossEntity {
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

class ObstacleManager {
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



// ==================== ui.js ====================
/**
 * Bat Escape - UI & HUD System
 * Renders retro pixel-art HUD directly to canvas (Score, Combo, Best, Level, Hearts, Danger bar)
 * and manages DOM overlay modals (Menu, Pause, Game Over, Achievements, How to Play).
 */




class UIManager {
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


// ==================== game.js ====================
/**
 * Bat Escape - Main Game Orchestrator
 * Connects player physics, procedural obstacles, rewards, dynamic difficulty,
 * parallax world rendering, retro audio synthesis, and HUD systems at 60 FPS.
 */











const GAME_STATES = {
  MENU: 'MENU',
  PLAYING: 'PLAYING',
  PAUSED: 'PAUSED',
  GAMEOVER: 'GAMEOVER',
};

class Game {
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


})();
