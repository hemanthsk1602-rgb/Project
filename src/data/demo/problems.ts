import { Problem } from '@/lib/types';

export const DEMO_PROBLEMS: Problem[] = [
  {
    id: 'p-1',
    slug: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    acceptanceRate: '54.2%',
    timeComplexityOptimal: 'O(n)',
    spaceComplexityOptimal: 'O(n)',
    estimatedMinutes: 15,
    solved: true,
    tags: ['Array', 'Hash Table'],
    description: `Given an array of integers \`nums\` and an integer \`target\`, return *indices of the two numbers such that they add up to \`target\`*.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      {
        input: 'nums = [2, 7, 11, 15], target = 9',
        output: '[0, 1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
      },
      {
        input: 'nums = [3, 2, 4], target = 6',
        output: '[1, 2]',
        explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].',
      },
      {
        input: 'nums = [3, 3], target = 6',
        output: '[0, 1]',
      },
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.',
    ],
    starterCode: {
      cpp: `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your solution here
        return {};
    }
};`,
      python: `from typing import List

class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # Write your solution here
        pass`,
      java: `import java.util.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
        return new int[]{};
    }
}`,
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    // Write your solution here
    return [];
}`,
    },
    solutionCode: {
      cpp: `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> seen;
        for (int i = 0; i < nums.size(); ++i) {
            int complement = target - nums[i];
            if (seen.find(complement) != seen.end()) {
                return {seen[complement], i};
            }
            seen[nums[i]] = i;
        }
        return {};
    }
};`,
      python: `from typing import List

class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        seen = {}
        for i, n in enumerate(nums):
            diff = target - n
            if diff in seen:
                return [seen[diff], i]
            seen[n] = i
        return []`,
      java: `import java.util.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[]{};
    }
}`,
      javascript: `function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}`,
    },
    testCases: [
      {
        id: 'tc-1',
        input: '[2, 7, 11, 15]\n9',
        expectedOutput: '[0, 1]',
        explanation: 'nums[0] + nums[1] = 2 + 7 = 9',
      },
      {
        id: 'tc-2',
        input: '[3, 2, 4]\n6',
        expectedOutput: '[1, 2]',
        explanation: 'nums[1] + nums[2] = 2 + 4 = 6',
      },
      {
        id: 'tc-3',
        input: '[3, 3]\n6',
        expectedOutput: '[0, 1]',
        explanation: 'nums[0] + nums[1] = 3 + 3 = 6',
      },
      {
        id: 'tc-4',
        input: '[-1, -2, -3, -4, -5]\n-8',
        expectedOutput: '[2, 4]',
        isHidden: true,
        explanation: 'Negative numbers edge case.',
      },
    ],
    hints: [
      'Think about how you can remember values you have already encountered during traversal.',
      'Consider using a hash map to look up whether the target complement exists in constant O(1) time.',
      'Store each number as the key and its index as the value. For each element x, check if (target - x) is already present.',
    ],
  },
  {
    id: 'p-2',
    slug: 'longest-substring-without-repeating-characters',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    category: 'Sliding Window',
    acceptanceRate: '35.8%',
    timeComplexityOptimal: 'O(n)',
    spaceComplexityOptimal: 'O(min(n, m))',
    estimatedMinutes: 25,
    solved: true,
    tags: ['Hash Table', 'String', 'Sliding Window'],
    description: `Given a string \`s\`, find the length of the **longest substring** without duplicate characters.`,
    examples: [
      {
        input: 's = "abcabcbb"',
        output: '3',
        explanation: 'The answer is "abc", with the length of 3.',
      },
      {
        input: 's = "bbbbb"',
        output: '1',
        explanation: 'The answer is "b", with the length of 1.',
      },
      {
        input: 's = "pwwkew"',
        output: '3',
        explanation: 'The answer is "wke", with the length of 3. Notice that "pwke" is a subsequence and not a substring.',
      },
    ],
    constraints: [
      '0 <= s.length <= 5 * 10^4',
      's consists of English letters, digits, symbols and spaces.',
    ],
    starterCode: {
      cpp: `#include <string>
#include <unordered_map>
using namespace std;

class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        // Write your solution here
        return 0;
    }
};`,
      python: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        # Write your solution here
        pass`,
      java: `import java.util.*;

class Solution {
    public int lengthOfLongestSubstring(String s) {
        // Write your solution here
        return 0;
    }
}`,
      javascript: `function lengthOfLongestSubstring(s) {
    // Write your solution here
    return 0;
}`,
    },
    testCases: [
      {
        id: 'tc-1',
        input: '"abcabcbb"',
        expectedOutput: '3',
      },
      {
        id: 'tc-2',
        input: '"bbbbb"',
        expectedOutput: '1',
      },
      {
        id: 'tc-3',
        input: '"pwwkew"',
        expectedOutput: '3',
      },
      {
        id: 'tc-4',
        input: '""',
        expectedOutput: '0',
        isHidden: true,
      },
    ],
    hints: [
      'Can you check all substrings with two pointers defining the window bounds?',
      'Use a sliding window [left, right] where you dynamically expand the right pointer and shrink left when a duplicate character is detected.',
      'Maintain the last seen index of each character in a hash map to advance the left pointer in a single leap.',
    ],
  },
  {
    id: 'p-3',
    slug: 'trapping-rain-water',
    title: 'Trapping Rain Water',
    difficulty: 'Hard',
    category: 'Two Pointers',
    acceptanceRate: '61.4%',
    timeComplexityOptimal: 'O(n)',
    spaceComplexityOptimal: 'O(1)',
    estimatedMinutes: 40,
    solved: false,
    tags: ['Array', 'Two Pointers', 'Dynamic Programming', 'Stack'],
    description: `Given \`n\` non-negative integers representing an elevation map where the width of each bar is \`1\`, compute how much water it can trap after raining.`,
    examples: [
      {
        input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]',
        output: '6',
        explanation: 'The above elevation map is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water are trapped.',
      },
      {
        input: 'height = [4,2,0,3,2,5]',
        output: '9',
      },
    ],
    constraints: [
      'n == height.length',
      '1 <= n <= 2 * 10^4',
      '0 <= height[i] <= 10^5',
    ],
    starterCode: {
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    int trap(vector<int>& height) {
        // Write your solution here
        return 0;
    }
};`,
      python: `from typing import List

class Solution:
    def trap(self, height: List[int]) -> int:
        # Write your solution here
        pass`,
      java: `class Solution {
    public int trap(int[] height) {
        // Write your solution here
        return 0;
    }
}`,
      javascript: `function trap(height) {
    // Write your solution here
    return 0;
}`,
    },
    testCases: [
      {
        id: 'tc-1',
        input: '[0,1,0,2,1,0,1,3,2,1,2,1]',
        expectedOutput: '6',
      },
      {
        id: 'tc-2',
        input: '[4,2,0,3,2,5]',
        expectedOutput: '9',
      },
    ],
    hints: [
      'The water trapped above any index i is determined by min(max_left, max_right) - height[i].',
      'Notice that if leftMax < rightMax, the boundary is constrained by leftMax, regardless of bars in between.',
      'Use two pointers starting at both ends. Move the pointer with the smaller maximum bound inwards while accumulating trapped volume.',
    ],
  },
  {
    id: 'p-4',
    slug: 'reverse-linked-list',
    title: 'Reverse Linked List',
    difficulty: 'Easy',
    category: 'Linked Lists',
    acceptanceRate: '76.1%',
    timeComplexityOptimal: 'O(n)',
    spaceComplexityOptimal: 'O(1)',
    estimatedMinutes: 15,
    solved: true,
    tags: ['Linked List', 'Recursion'],
    description: `Given the \`head\` of a singly linked list, reverse the list, and return *the reversed list*.`,
    examples: [
      {
        input: 'head = [1,2,3,4,5]',
        output: '[5,4,3,2,1]',
      },
      {
        input: 'head = [1,2]',
        output: '[2,1]',
      },
      {
        input: 'head = []',
        output: '[]',
      },
    ],
    constraints: [
      'The number of nodes in the list is the range [0, 5000].',
      '-5000 <= Node.val <= 5000',
    ],
    starterCode: {
      cpp: `/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        // Write your solution here
        return nullptr;
    }
};`,
      python: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        # Write your solution here
        pass`,
      java: `class Solution {
    public ListNode reverseList(ListNode head) {
        // Write your solution here
        return null;
    }
}`,
      javascript: `function reverseList(head) {
    // Write your solution here
    return null;
}`,
    },
    testCases: [
      {
        id: 'tc-1',
        input: '[1,2,3,4,5]',
        expectedOutput: '[5,4,3,2,1]',
      },
      {
        id: 'tc-2',
        input: '[1,2]',
        expectedOutput: '[2,1]',
      },
    ],
    hints: [
      'Iterative approach: Maintain three pointers — prev, current, and next.',
      'Before adjusting current.next = prev, preserve the next node in a temporary pointer.',
      'Advance prev to current, and current to the saved next node until current is null.',
    ],
  },
  {
    id: 'p-5',
    slug: 'coin-change',
    title: 'Coin Change',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    acceptanceRate: '43.2%',
    timeComplexityOptimal: 'O(amount * coins.length)',
    spaceComplexityOptimal: 'O(amount)',
    estimatedMinutes: 30,
    solved: false,
    tags: ['Array', 'Dynamic Programming', 'Breadth-First Search'],
    description: `You are given an integer array \`coins\` representing coins of different denominations and an integer \`amount\` representing a total amount of money.

Return *the fewest number of coins that you need to make up that amount*. If that amount of money cannot be made up by any combination of the coins, return \`-1\`.

You may assume that you have an infinite number of each kind of coin.`,
    examples: [
      {
        input: 'coins = [1,2,5], amount = 11',
        output: '3',
        explanation: '11 = 5 + 5 + 1',
      },
      {
        input: 'coins = [2], amount = 3',
        output: '-1',
      },
      {
        input: 'coins = [1], amount = 0',
        output: '0',
      },
    ],
    constraints: [
      '1 <= coins.length <= 12',
      '1 <= coins[i] <= 2^31 - 1',
      '0 <= amount <= 10^4',
    ],
    starterCode: {
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        // Write your solution here
        return -1;
    }
};`,
      python: `from typing import List

class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        # Write your solution here
        pass`,
      java: `class Solution {
    public int coinChange(int[] coins, int amount) {
        // Write your solution here
        return -1;
    }
}`,
      javascript: `function coinChange(coins, amount) {
    // Write your solution here
    return -1;
}`,
    },
    testCases: [
      {
        id: 'tc-1',
        input: '[1,2,5]\n11',
        expectedOutput: '3',
      },
      {
        id: 'tc-2',
        input: '[2]\n3',
        expectedOutput: '-1',
      },
      {
        id: 'tc-3',
        input: '[1]\n0',
        expectedOutput: '0',
      },
    ],
    hints: [
      'Consider formulating a DP array where dp[i] denotes minimum coins needed to make amount i.',
      'For each subproblem i from 1 to amount, test every coin c: dp[i] = min(dp[i], dp[i - c] + 1) if i >= c.',
      'Initialize dp array with infinity (or amount + 1) and dp[0] = 0.',
    ],
  },
  {
    id: 'p-6',
    slug: 'course-schedule',
    title: 'Course Schedule',
    difficulty: 'Medium',
    category: 'Graphs',
    acceptanceRate: '46.9%',
    timeComplexityOptimal: 'O(V + E)',
    spaceComplexityOptimal: 'O(V + E)',
    estimatedMinutes: 35,
    solved: false,
    tags: ['Depth-First Search', 'Breadth-First Search', 'Graph', 'Topological Sort'],
    description: `There are a total of \`numCourses\` courses you have to take, labeled from \`0\` to \`numCourses - 1\`. You are given an array \`prerequisites\` where \`prerequisites[i] = [ai, bi]\` indicates that you **must** take course \`bi\` first if you want to take course \`ai\`.

For example, the pair \`[0, 1]\`, indicates that to take course \`0\` you have to first take \`1\`.

Return \`true\` if you can finish all courses. Otherwise, return \`false\`.`,
    examples: [
      {
        input: 'numCourses = 2, prerequisites = [[1,0]]',
        output: 'true',
        explanation: 'There are a total of 2 courses to take. To take course 1 you should have finished course 0. So it is possible.',
      },
      {
        input: 'numCourses = 2, prerequisites = [[1,0],[0,1]]',
        output: 'false',
        explanation: 'There are 2 courses to take. Course 1 requires course 0 and course 0 requires course 1. Cycle exists.',
      },
    ],
    constraints: [
      '1 <= numCourses <= 2000',
      '0 <= prerequisites.length <= 5000',
      'prerequisites[i].length == 2',
      '0 <= ai, bi < numCourses',
      'All the pairs prerequisites[i] are unique.',
    ],
    starterCode: {
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        // Write your solution here
        return false;
    }
};`,
      python: `from typing import List

class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        # Write your solution here
        pass`,
      java: `class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        // Write your solution here
        return false;
    }
}`,
      javascript: `function canFinish(numCourses, prerequisites) {
    // Write your solution here
    return false;
}`,
    },
    testCases: [
      {
        id: 'tc-1',
        input: '2\n[[1,0]]',
        expectedOutput: 'true',
      },
      {
        id: 'tc-2',
        input: '2\n[[1,0],[0,1]]',
        expectedOutput: 'false',
      },
    ],
    hints: [
      'This problem is equivalent to detecting if a directed graph contains a cycle.',
      'Use Kahn algorithm (BFS with in-degree tracking) or 3-color DFS (unvisited, visiting, visited).',
      'If the count of nodes processed by topological sort matches numCourses, no cycle exists.',
    ],
  },
  {
    id: 'p-7',
    slug: 'binary-tree-maximum-path-sum',
    title: 'Binary Tree Maximum Path Sum',
    difficulty: 'Hard',
    category: 'Trees',
    acceptanceRate: '39.8%',
    timeComplexityOptimal: 'O(n)',
    spaceComplexityOptimal: 'O(h)',
    estimatedMinutes: 45,
    solved: false,
    tags: ['Dynamic Programming', 'Tree', 'Depth-First Search', 'Binary Tree'],
    description: `A **path** in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence **at most once**. Note that the path does not need to pass through the root.

The **path sum** of a path is the sum of the node's values in the path.

Given the \`root\` of a binary tree, return *the maximum **path sum** of any **non-empty** path*.`,
    examples: [
      {
        input: 'root = [1,2,3]',
        output: '6',
        explanation: 'The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6.',
      },
      {
        input: 'root = [-10,9,20,null,null,15,7]',
        output: '42',
        explanation: 'The optimal path is 15 -> 20 -> 7 with a path sum of 15 + 20 + 7 = 42.',
      },
    ],
    constraints: [
      'The number of nodes in the tree is in the range [1, 3 * 10^4].',
      '-1000 <= Node.val <= 1000',
    ],
    starterCode: {
      cpp: `class Solution {
public:
    int maxPathSum(TreeNode* root) {
        // Write your solution here
        return 0;
    }
};`,
      python: `class Solution:
    def maxPathSum(self, root: Optional[TreeNode]) -> int:
        # Write your solution here
        pass`,
      java: `class Solution {
    public int maxPathSum(TreeNode root) {
        // Write your solution here
        return 0;
    }
}`,
      javascript: `function maxPathSum(root) {
    // Write your solution here
    return 0;
}`,
    },
    testCases: [
      {
        id: 'tc-1',
        input: '[1,2,3]',
        expectedOutput: '6',
      },
      {
        id: 'tc-2',
        input: '[-10,9,20,null,null,15,7]',
        expectedOutput: '42',
      },
    ],
    hints: [
      'For each node, compute the maximum gain that can be contributed to its parent (must take at most one child branch).',
      'Simultaneously, update the global maximum path sum using node.val + max(0, leftGain) + max(0, rightGain).',
      'Negative branch gains should be clamped to 0 so they do not reduce the maximum path sum.',
    ],
  },
  {
    id: 'p-8',
    slug: 'valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    category: 'Stacks',
    acceptanceRate: '41.1%',
    timeComplexityOptimal: 'O(n)',
    spaceComplexityOptimal: 'O(n)',
    estimatedMinutes: 10,
    solved: true,
    tags: ['String', 'Stack'],
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      {
        input: 's = "()"',
        output: 'true',
      },
      {
        input: 's = "()[]{}"',
        output: 'true',
      },
      {
        input: 's = "(]"',
        output: 'false',
      },
    ],
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of parentheses only \'()[]{}\'.',
    ],
    starterCode: {
      cpp: `#include <string>
#include <stack>
using namespace std;

class Solution {
public:
    bool isValid(string s) {
        // Write your solution here
        return false;
    }
};`,
      python: `class Solution:
    def isValid(self, s: str) -> bool:
        # Write your solution here
        pass`,
      java: `class Solution {
    public boolean isValid(String s) {
        // Write your solution here
        return false;
    }
}`,
      javascript: `function isValid(s) {
    // Write your solution here
    return false;
}`,
    },
    testCases: [
      {
        id: 'tc-1',
        input: '"()"',
        expectedOutput: 'true',
      },
      {
        id: 'tc-2',
        input: '"()[]{}"',
        expectedOutput: 'true',
      },
      {
        id: 'tc-3',
        input: '"(]"',
        expectedOutput: 'false',
      },
    ],
    hints: [
      'A stack data structure naturally enforces Last-In-First-Out (LIFO) matching.',
      'Push opening brackets onto the stack. When encountering a closing bracket, verify that the top element matches.',
      'At the end of string traversal, the stack must be empty for the string to be valid.',
    ],
  },
  {
    id: 'p-9',
    slug: 'search-in-rotated-sorted-array',
    title: 'Search in Rotated Sorted Array',
    difficulty: 'Medium',
    category: 'Binary Search',
    acceptanceRate: '40.6%',
    timeComplexityOptimal: 'O(log n)',
    spaceComplexityOptimal: 'O(1)',
    estimatedMinutes: 25,
    solved: false,
    tags: ['Array', 'Binary Search'],
    description: `There is an integer array \`nums\` sorted in ascending order (with **distinct** values).

Prior to being passed to your function, \`nums\` is **possibly rotated** at an unknown pivot index \`k\` (\`1 <= k < nums.length\`).

Given the array \`nums\` after the possible rotation and an integer \`target\`, return *the index of \`target\` if it is in \`nums\`, or \`-1\` if it is not in \`nums\`*.

You must write an algorithm with \`O(log n)\` runtime complexity.`,
    examples: [
      {
        input: 'nums = [4,5,6,7,0,1,2], target = 0',
        output: '4',
      },
      {
        input: 'nums = [4,5,6,7,0,1,2], target = 3',
        output: '-1',
      },
      {
        input: 'nums = [1], target = 0',
        output: '-1',
      },
    ],
    constraints: [
      '1 <= nums.length <= 5000',
      '-10^4 <= nums[i] <= 10^4',
      'All values of nums are unique.',
      'nums is an ascending array that is possibly rotated.',
      '-10^4 <= target <= 10^4',
    ],
    starterCode: {
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    int search(vector<int>& nums, int target) {
        // Write your solution here
        return -1;
    }
};`,
      python: `from typing import List

class Solution:
    def search(self, nums: List[int], target: int) -> int:
        # Write your solution here
        pass`,
      java: `class Solution {
    public int search(int[] nums, int target) {
        // Write your solution here
        return -1;
    }
}`,
      javascript: `function search(nums, target) {
    // Write your solution here
    return -1;
}`,
    },
    testCases: [
      {
        id: 'tc-1',
        input: '[4,5,6,7,0,1,2]\n0',
        expectedOutput: '4',
      },
      {
        id: 'tc-2',
        input: '[4,5,6,7,0,1,2]\n3',
        expectedOutput: '-1',
      },
    ],
    hints: [
      'Notice that in any rotated sorted array, at least one half (left to mid or mid to right) is always normally sorted.',
      'Check whether nums[left] <= nums[mid]. If true, the left half is sorted. Otherwise, the right half is sorted.',
      'Use the bounds of the sorted half to determine whether target lies inside it, adjusting left or right accordingly.',
    ],
  },
  {
    id: 'p-10',
    slug: 'lru-cache',
    title: 'LRU Cache',
    difficulty: 'Medium',
    category: 'Linked Lists & Design',
    acceptanceRate: '42.8%',
    timeComplexityOptimal: 'O(1) average',
    spaceComplexityOptimal: 'O(capacity)',
    estimatedMinutes: 35,
    solved: false,
    tags: ['Hash Table', 'Linked List', 'Design', 'Doubly-Linked List'],
    description: `Design a data structure that follows the constraints of a **Least Recently Used (LRU) cache**.

Implement the \`LRUCache\` class:
* \`LRUCache(int capacity)\` Initialize the LRU cache with positive size capacity.
* \`int get(int key)\` Return the value of the \`key\` if the key exists, otherwise return \`-1\`.
* \`void put(int key, int value)\` Update the value of the \`key\` if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the \`capacity\` from this operation, **evict** the least recently used key.

The functions \`get\` and \`put\` must each run in \`O(1)\` average time complexity.`,
    examples: [
      {
        input: '["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]\n[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]',
        output: '[null, null, null, 1, null, -1, null, -1, 3, 4]',
      },
    ],
    constraints: [
      '1 <= capacity <= 3000',
      '0 <= key <= 10^4',
      '0 <= value <= 10^5',
      'At most 2 * 10^5 calls will be made to get and put.',
    ],
    starterCode: {
      cpp: `#include <unordered_map>
using namespace std;

class LRUCache {
public:
    LRUCache(int capacity) {
        // Initialize LRU cache
    }
    
    int get(int key) {
        return -1;
    }
    
    void put(int key, int value) {
        
    }
};`,
      python: `class LRUCache:
    def __init__(self, capacity: int):
        pass

    def get(self, key: int) -> int:
        return -1

    def put(self, key: int, value: int) -> None:
        pass`,
      java: `class LRUCache {
    public LRUCache(int capacity) {
        
    }
    
    public int get(int key) {
        return -1;
    }
    
    public void put(int key, int value) {
        
    }
}`,
      javascript: `class LRUCache {
    constructor(capacity) {
        
    }
    get(key) {
        return -1;
    }
    put(key, value) {
        
    }
}`,
    },
    testCases: [
      {
        id: 'tc-1',
        input: '["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]\n[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]',
        expectedOutput: '[null, null, null, 1, null, -1, null, -1, 3, 4]',
      },
    ],
    hints: [
      'To achieve O(1) eviction and insertion, use a Doubly Linked List with dummy Head and Tail nodes.',
      'Combine the Doubly Linked List with a Hash Map that maps keys directly to Doubly Linked List node pointers.',
      'Whenever a key is accessed or updated, remove its node and push it to the front (Most Recently Used).',
    ],
  },
];

export function getProblemBySlug(slug: string): Problem | undefined {
  return DEMO_PROBLEMS.find((p) => p.slug === slug);
}

