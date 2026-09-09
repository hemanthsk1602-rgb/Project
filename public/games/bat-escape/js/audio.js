/**
 * Bat Escape - Audio System
 * Uses the Web Audio API to procedurally synthesize 8-bit retro sound effects
 * and dynamic adaptive ambient chiptune background music.
 */

import { storage } from './storage.js';

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

export const audio = new AudioManager();

