/**
 * Bat Escape - Progressive Difficulty Manager
 * Dynamically scales speed, gap sizes, obstacle frequencies, and environmental events
 * across 6 distinct difficulty levels, boss encounters, and random challenge events.
 */

export const DIFFICULTY_LEVELS = [
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

export const CHALLENGE_EVENTS = [
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

export class DifficultyManager {
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

