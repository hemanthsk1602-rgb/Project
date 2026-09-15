import { AIReviewResult, CodeLanguage, Problem } from '@/lib/types';

export function analyzeCodeLocally(
  code: string,
  language: CodeLanguage,
  problem?: Problem
): AIReviewResult {
  const isNestedLoop = /for\s*\(.*?\)\s*\{[\s\S]*?for\s*\(/.test(code) || 
                       /for\s+\w+\s+in\s+[\s\S]*?:[\s\S]*?for\s+\w+\s+in/.test(code);
  const hasHashMap = /unordered_map|Map<|dict\(\)|\{\}|seen|map\.has/.test(code);
  const hasTwoPointers = /left\s*<|low\s*<|left\s*\+\+|right\s*--/.test(code);
  const hasSorting = /sort\(|sorted\(|Arrays\.sort/.test(code);

  let score = 84;
  let correctnessScore = 90;
  let edgeCasesScore = 80;
  let readabilityScore = 85;
  let timeComplexity = 'O(n)';
  let spaceComplexity = 'O(n)';
  const strengths: string[] = [];
  const issues = [];

  if (isNestedLoop && !hasTwoPointers) {
    score = 64;
    correctnessScore = 85;
    edgeCasesScore = 70;
    timeComplexity = 'O(n²)';
    spaceComplexity = 'O(1)';
    issues.push({
      severity: 'high' as const,
      category: 'Complexity' as const,
      message: 'Quadratic Time Complexity detected via nested loops.',
      suggestion: 'Replace the inner linear search with a Hash Map or Two-Pointer approach to reduce runtime from O(n²) to O(n) or O(n log n).',
    });
  } else if (hasHashMap) {
    score = 92;
    correctnessScore = 95;
    edgeCasesScore = 90;
    readabilityScore = 90;
    timeComplexity = 'O(n)';
    spaceComplexity = 'O(n)';
    strengths.push('Optimal O(1) average lookup time achieved using hash table.');
    strengths.push('Clean single-pass traversal without redundant state.');
  } else if (hasTwoPointers) {
    score = 94;
    correctnessScore = 95;
    edgeCasesScore = 92;
    timeComplexity = 'O(n)';
    spaceComplexity = 'O(1)';
    strengths.push('In-place two-pointer traversal minimizes auxiliary memory allocations to O(1).');
  }

  if (hasSorting) {
    timeComplexity = 'O(n log n)';
    strengths.push('Sorting establishes monotonic properties, simplifying search logic.');
  }

  // Check edge cases
  if (!code.includes('.empty()') && !code.includes('.length') && !code.includes('len(') && !code.includes('== 0')) {
    edgeCasesScore = Math.max(60, edgeCasesScore - 15);
    issues.push({
      severity: 'medium' as const,
      category: 'Edge Case' as const,
      message: 'Missing explicit boundary checks for empty or single-element inputs.',
      suggestion: 'Add guard conditions: if (nums.empty() || nums.size() < 2) return default.',
    });
  }

  // Check naming and readability
  if (/(\b[a-z]\b|\b[a-z][0-9]\b)/.test(code) && !code.includes('int i = 0')) {
    readabilityScore = Math.max(65, readabilityScore - 10);
    issues.push({
      severity: 'low' as const,
      category: 'Readability' as const,
      message: 'Single-letter variable identifiers degrade long-term code clarity.',
      suggestion: 'Rename single-letter identifiers to semantic names like complement, currentIndex, or targetDiff.',
    });
  }

  strengths.push('Idiomatic use of language standard library containers.');

  // Build optimized code candidate
  const optimalCode = problem?.solutionCode?.[language] || 
`// CodeArena AI Optimized Solution [O(n) Time, O(n) Space]
#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> lookup;
        for (int i = 0; i < static_cast<int>(nums.size()); ++i) {
            int complement = target - nums[i];
            auto it = lookup.find(complement);
            if (it != lookup.end()) {
                return {it->second, i};
            }
            lookup[nums[i]] = i;
        }
        return {};
    }
};`;

  return {
    score,
    verdict: score >= 85 ? 'Highly Optimized' : score >= 70 ? 'Passable with Optimization Potential' : 'Sub-Optimal Asymptotics',
    correctnessScore,
    edgeCasesScore,
    readabilityScore,
    currentComplexity: {
      time: timeComplexity,
      space: spaceComplexity,
    },
    suggestedComplexity: {
      time: problem?.timeComplexityOptimal || 'O(n)',
      space: problem?.spaceComplexityOptimal || 'O(n)',
    },
    summary: score >= 85
      ? 'Strong algorithmic implementation with appropriate data structure selection and linear scaling.'
      : 'Working logic, but susceptible to Time Limit Exceeded (TLE) under large competitive test inputs due to quadratic operations.',
    strengths,
    issues,
    optimizedCode: optimalCode,
    optimizationRationale: 'By caching elements in an associative hash table during a single forward pass, lookups for the target complement take O(1) amortized time instead of O(n) repetitive linear scans.',
  };
}

