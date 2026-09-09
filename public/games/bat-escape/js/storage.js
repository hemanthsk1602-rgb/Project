/**
 * Bat Escape - Storage Manager
 * Handles persistent game data, high scores, statistics, and achievements.
 */

export const ACHIEVEMENTS_LIST = [
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

export const storage = new StorageManager();

