export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type CodeLanguage = 'cpp' | 'python' | 'java' | 'javascript';

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  isHidden?: boolean;
  explanation?: string;
}

export interface TestCaseResult {
  testCaseId: string;
  passed: boolean;
  actualOutput: string;
  expectedOutput: string;
  executionTimeMs: number;
  memoryMb: number;
  error?: string;
}

export type ExecutionStatus = 
  | 'Accepted' 
  | 'Wrong Answer' 
  | 'Time Limit Exceeded' 
  | 'Runtime Error' 
  | 'Compilation Error';

export interface ExecutionResult {
  status: ExecutionStatus;
  totalPassed: number;
  totalCases: number;
  executionTimeMs: number;
  memoryMb: number;
  testCaseResults: TestCaseResult[];
  compileOutput?: string;
  isDemoMode: boolean;
}

export interface ProblemExample {
  input: string;
  output: string;
  explanation?: string;
}

export interface Problem {
  id: string;
  slug: string;
  title: string;
  difficulty: Difficulty;
  category: string;
  acceptanceRate: string;
  timeComplexityOptimal: string;
  spaceComplexityOptimal: string;
  description: string;
  examples: ProblemExample[];
  constraints: string[];
  starterCode: Record<CodeLanguage, string>;
  solutionCode?: Record<CodeLanguage, string>;
  testCases: TestCase[];
  hints: string[];
  tags: string[];
  solved?: boolean;
  estimatedMinutes: number;
}

export interface Submission {
  id: string;
  problemId: string;
  problemTitle: string;
  language: CodeLanguage;
  code: string;
  status: ExecutionStatus;
  runtimeMs: number;
  memoryMb: number;
  submittedAt: string;
}

export type RoadmapStatus = 'completed' | 'in-progress' | 'locked';

export interface RoadmapTopic {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: RoadmapStatus;
  description: string;
  prerequisites: string[];
  problemSlugs: string[];
  estimatedHours: number;
  solvedCount: number;
  totalCount: number;
  order: number;
  branch: 'core' | 'advanced' | 'tree-graph' | 'dp';
}

export type ContestStatus = 'upcoming' | 'live' | 'ended';

export interface ContestProblem {
  id: string;
  label: 'A' | 'B' | 'C' | 'D';
  problemSlug: string;
  title: string;
  points: number;
  solvedCount: number;
  status?: 'solved' | 'attempted' | 'unsolved';
}

export interface ContestStanding {
  rank: number;
  username: string;
  handle: string;
  avatarUrl: string;
  country: string;
  rating: number;
  score: number;
  penaltyMinutes: number;
  problemStatus: Record<'A' | 'B' | 'C' | 'D', { solved: boolean; timeMinutes?: number; attempts: number }>;
}

export interface Contest {
  id: string;
  title: string;
  slug: string;
  description: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  status: ContestStatus;
  registeredCount: number;
  problems: ContestProblem[];
}

export type RankTier = 
  | 'Grandmaster' 
  | 'Master' 
  | 'Candidate Master' 
  | 'Expert' 
  | 'Specialist';

export interface LeaderboardEntry {
  rank: number;
  username: string;
  handle: string;
  avatarUrl: string;
  rating: number;
  tier: RankTier;
  solvedCount: number;
  streak: number;
  xp: number;
  college?: string;
  isCurrentUser?: boolean;
}

export interface AIReviewIssue {
  severity: 'high' | 'medium' | 'low';
  category: 'Correctness' | 'Complexity' | 'Readability' | 'Edge Case';
  message: string;
  suggestion: string;
}

export interface AIReviewResult {
  score: number;
  verdict: string;
  correctnessScore: number;
  edgeCasesScore: number;
  readabilityScore: number;
  currentComplexity: {
    time: string;
    space: string;
  };
  suggestedComplexity: {
    time: string;
    space: string;
  };
  summary: string;
  strengths: string[];
  issues: AIReviewIssue[];
  optimizedCode: string;
  optimizationRationale: string;
}

export interface AITutorMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  codeSnippet?: string;
  followUpSuggestions?: string[];
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlockedAt?: string;
  tier: 'bronze' | 'silver' | 'gold' | 'diamond';
}

export interface UserProfile {
  name: string;
  handle: string;
  headline: string;
  bio: string;
  location: string;
  github: string;
  level: number;
  xp: number;
  nextLevelXp: number;
  streak: number;
  accuracy: number;
  contestRating: number;
  globalRank: number;
  solvedStats: {
    total: number;
    easy: number;
    medium: number;
    hard: number;
  };
  languages: {
    language: string;
    problemsSolved: number;
    percentage: number;
  }[];
  topicMastery: {
    topic: string;
    mastery: number; // 0 - 100
    solved: number;
    total: number;
  }[];
  badges: AchievementBadge[];
  recentSubmissions: Submission[];
}

