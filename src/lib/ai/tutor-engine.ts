import { AITutorMessage } from '@/lib/types';

export interface TutorContext {
  topic: string;
  problemTitle?: string;
  difficulty?: string;
}

export function generateTutorResponse(
  userQuery: string,
  context: TutorContext,
  history: AITutorMessage[] = []
): AITutorMessage {
  const q = userQuery.toLowerCase().trim();
  const id = `msg-${Date.now()}`;
  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Quiz intent
  if (q.includes('quiz') || q.includes('test me')) {
    return {
      id,
      role: 'assistant',
      timestamp,
      content: `Here is a quick concept check on **${context.topic}**:

**Question:** 
Suppose you have an array with both positive and negative numbers, and you need to find the contiguous subarray with the maximum sum.

1. What is the optimal time complexity achievable?
2. Which algorithmic technique allows you to solve this in a single pass without storing all previous subarray sums?

Take a shot at answering, or ask for a clue!`,
      followUpSuggestions: [
        'Is it Kadane\'s Algorithm in O(n)?',
        'Can we use Divide & Conquer in O(n log n)?',
        'Show me the recurrence relation.',
      ],
    };
  }

  // Explain concept intent
  if (q.includes('explain') || q.includes('concept') || q.includes('intuition')) {
    return {
      id,
      role: 'assistant',
      timestamp,
      content: `Let's break down the intuition behind **${context.topic}**:

### 1. The Core Bottleneck
In naive brute-force approaches, algorithms re-evaluate overlapping states repeatedly. For instance, testing every possible pair or window creates unnecessary repetitive operations.

### 2. The Invariant
With **${context.topic}**, we establish a mathematical invariant:
* At any point in the iteration, we only retain the minimal state required to make the next decision.
* If a subproblem has already been solved, we either retrieve its cached answer in $O(1)$ or eliminate entire regions of the search space.

### 3. Space-Time Tradeoff
* **Brute force:** $O(n^2)$ or $O(2^n)$ Time, $O(1)$ Space
* **Optimized:** $O(n)$ Time, $O(n)$ or $O(1)$ Space`,
      codeSnippet: `// Canonical Pattern for ${context.topic}
int left = 0;
for (int right = 0; right < n; ++right) {
    // 1. Expand window with right pointer
    add(nums[right]);
    
    // 2. Shrink window while invalid
    while (conditionViolated()) {
        remove(nums[left++]);
    }
    
    // 3. Record valid state
    ans = max(ans, right - left + 1);
}`,
      followUpSuggestions: [
        'Give a concrete numerical example',
        'What edge cases break this pattern?',
        'Quiz me on this concept',
      ],
    };
  }

  // Give example intent
  if (q.includes('example') || q.includes('walkthrough')) {
    return {
      id,
      role: 'assistant',
      timestamp,
      content: `Here is a step-by-step trace on **${context.topic}**:

Consider input: \`nums = [2, 7, 11, 15]\`, \`target = 9\`.

| Step | Current Element | Target - Element (Complement) | Lookup Map State | Action |
| :--- | :--- | :--- | :--- | :--- |
| **i = 0** | \`2\` | \`9 - 2 = 7\` | \`{}\` | \`7\` not in map. Store \`{2: 0}\`. |
| **i = 1** | \`7\` | \`9 - 7 = 2\` | \`{2: 0}\` | **Hit!** \`2\` exists at index \`0\`. |

**Result:** Return indices \`[0, 1]\`. Total steps: **2 operations** instead of 6 pairs.`,
      followUpSuggestions: [
        'Why not sort the array first?',
        'How does this generalize to 3Sum?',
        'Let\'s practice a problem on this',
      ],
    };
  }

  // Hint intent
  if (q.includes('hint') || q.includes('clue') || q.includes('stuck')) {
    return {
      id,
      role: 'assistant',
      timestamp,
      content: `Here is a Socratic hint to nudge your thinking without giving away the complete code:

> Notice what information you are repeatedly searching for. Every time you consider an element, what *complementary property* would satisfy the goal?
> Can you trade a small amount of memory ($O(n)$ space) so you never have to iterate backwards?`,
      followUpSuggestions: [
        'Should I use a Hash Map or Two Pointers?',
        'Explain the time complexity tradeoff',
        'Show starter template',
      ],
    };
  }

  // Default intelligent technical response
  return {
    id,
    role: 'assistant',
    timestamp,
    content: `Great question regarding **${context.topic}**. 

When approaching this class of problems, always ask three questions:
1. **Can the array be sorted without destroying required index relationships?** (If yes, two-pointer or binary search becomes viable).
2. **Are there monotonic properties?** (Does expanding the right boundary monotonically increase the window sum or property?).
3. **What is the worst-case input?** (Empty list, all duplicates, negative numbers, or integer overflow).

Would you like an algorithmic blueprint, an interactive quiz, or a code review of your current draft?`,
    followUpSuggestions: [
      'Explain concept in depth',
      'Give me an example walkthrough',
      'Quiz me on edge cases',
      'Give me a progressive hint',
    ],
  };
}

