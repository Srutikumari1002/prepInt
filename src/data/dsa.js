export const dsa = [
  {
    id: "dsa-1",
    category: "DSA",
    question: "What is the difference between Array and Linked List?",
    difficulty: "Easy",
    answer: "- Array: Contiguous memory allocation. Search is O(1) by index. Insertion/Deletion at beginning/middle is O(n) because elements must be shifted. Fixed size (in standard arrays). \n- Linked List: Non-contiguous memory allocation; elements (nodes) are linked via pointers. Search is O(n). Insertion/Deletion is O(1) if pointer is given (no shifting needed). Dynamic size.",
    tips: "Mention cache friendliness: arrays are cache-friendly due to contiguous memory, linked lists are not."
  },
  {
    id: "dsa-2",
    category: "DSA",
    question: "Explain the difference between Stack and Queue.",
    difficulty: "Easy",
    answer: "- Stack: LIFO (Last In First Out) structure. Operations: push() to insert, pop() to remove. Used in function calls, recursion, and undo mechanisms. \n- Queue: FIFO (First In First Out) structure. Operations: enqueue() to insert, dequeue() to remove. Used in CPU scheduling, spooling, and breadth-first search (BFS).",
    tips: "Explain both using real-life examples (e.g. stack of plates vs queue at a ticket counter)."
  },
  {
    id: "dsa-3",
    category: "DSA",
    question: "What is a Hash Map? How are collisions resolved?",
    difficulty: "Medium",
    answer: "A Hash Map is a data structure that stores key-value pairs. It uses a hash function to compute an index. Collision resolution techniques: \n1. Separate Chaining: Each bucket holds a linked list (or self-balancing tree) of entries. \n2. Open Addressing: Finds another empty slot using probing (Linear probing, Quadratic probing, or Double hashing).",
    tips: "Be prepared to explain the worst-case search complexity of HashMap (O(n) for linked lists, O(log n) for red-black trees in Java 8)."
  },
  {
    id: "dsa-4",
    category: "DSA",
    question: "Explain Binary Search and its time complexity.",
    difficulty: "Easy",
    answer: "Binary Search is an efficient algorithm for finding an item in a sorted list. It works by repeatedly dividing the search interval in half: \n1. Compare target with middle element. \n2. If equal, target found. \n3. If target is smaller, search left half. \n4. If target is larger, search right half. \nTime complexity is O(log n), space complexity is O(1) for iterative implementation.",
    tips: "Crucial detail: The list MUST be sorted for Binary Search to work."
  },
  {
    id: "dsa-5",
    category: "DSA",
    question: "What is the difference between BFS and DFS in a Graph?",
    difficulty: "Medium",
    answer: "- BFS (Breadth-First Search): Explores neighbors layer-by-layer. Uses a Queue. Find shortest path in unweighted graphs. \n- DFS (Depth-First Search): Explores as deep as possible along each branch before backtracking. Uses a Stack (or recursion). Used for cycle detection, topological sorting, and solving puzzles (like mazes).",
    tips: "Mention time complexity for both: O(V + E) where V is vertices and E is edges."
  },
  {
    id: "dsa-6",
    category: "DSA",
    question: "What is Dynamic Programming? Give examples.",
    difficulty: "Hard",
    answer: "Dynamic Programming (DP) is an algorithmic technique for solving problems by breaking them down into overlapping subproblems, solving each subproblem once, and storing their solutions (memoization or tabulation) to avoid redundant computations. Examples: Fibonacci sequence, Knapsack problem, Longest Common Subsequence (LCS), and Shortest Path (Floyd-Warshall).",
    tips: "Explain the two key requirements: Overlapping Subproblems and Optimal Substructure."
  }
];
