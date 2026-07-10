import { dbms } from '../data/dbms';
import { os } from '../data/os';
import { cn } from '../data/cn';
import { java } from '../data/java';
import { hr } from '../data/hr';
import { aptitude } from '../data/aptitude';
import { dsa } from '../data/dsa';

export const CATEGORIES = {
  DBMS: dbms,
  "Operating System": os,
  "Computer Network": cn,
  Java: java,
  HR: hr,
  Aptitude: aptitude,
  DSA: dsa
};

export const SUBJECT_COLORS = {
  DBMS: "from-blue-500 to-indigo-600",
  "Operating System": "from-purple-500 to-pink-600",
  "Computer Network": "from-teal-500 to-cyan-600",
  Java: "from-orange-500 to-amber-600",
  HR: "from-rose-500 to-red-600",
  Aptitude: "from-emerald-500 to-green-600",
  DSA: "from-violet-500 to-purple-700"
};

export const MOCK_INTERVIEW_QUESTIONS = {
  HR: [
    "Tell me about yourself.",
    "What are your greatest strengths and weaknesses?",
    "Why do you want to work for our company?",
    "Describe a conflict you faced in a team and how you resolved it.",
    "Where do you see yourself in 5 years?"
  ],
  Java: [
    "What are the OOP concepts in Java?",
    "Explain the difference between JDK, JRE, and JVM.",
    "Why is String immutable in Java?",
    "What is the difference between Method Overloading and Method Overriding?",
    "Explain Checked and Unchecked Exceptions."
  ],
  DBMS: [
    "What is Normalization? Explain 1NF, 2NF, 3NF, and BCNF.",
    "What are ACID properties in a database?",
    "What are Joins in SQL? Explain the different types.",
    "What is the difference between Primary Key, Unique Key, and Foreign Key?"
  ],
  "Operating System": [
    "Explain the difference between a Process and a Thread.",
    "What is Deadlock? What are the four necessary conditions?",
    "What is Virtual Memory? How does Paging work?",
    "What is a Semaphore? Explain Binary vs Counting."
  ],
  "Computer Network": [
    "What is the OSI model? Explain its seven layers.",
    "Explain the difference between TCP and UDP.",
    "Explain the TCP Three-Way Handshake mechanism.",
    "What is the difference between IPv4 and IPv6?"
  ],
  DSA: [
    "What is the difference between Array and Linked List?",
    "Explain the difference between Stack and Queue.",
    "What is a Hash Map? How are collisions resolved?",
    "Explain Binary Search and its time complexity."
  ]
};

export const ATS_FEEDBACK_TEMPLATES = {
  low: {
    scoreRange: [50, 65],
    suggestions: [
      "Improve resume layout: Use a single-column format for better machine readability.",
      "Add technical skills: Include key languages and databases like SQL, Java, or JavaScript.",
      "Expand projects: Provide at least two technical projects with detailed descriptions.",
      "Remove buzzwords: Replace empty adjectives with actionable metrics."
    ]
  },
  medium: {
    scoreRange: [66, 80],
    suggestions: [
      "Add Action Verbs: Start your bullet points with verbs like 'Developed', 'Led', or 'Optimized'.",
      "Incorporate Metrics: Quantify accomplishments (e.g., 'reduced runtime by 15%', 'gained 100+ active users').",
      "Improve Skills Section: Categorize skills into Languages, Frameworks, Databases, and Tools.",
      "Link Profiles: Ensure your GitHub and LinkedIn profiles are linked correctly."
    ]
  },
  high: {
    scoreRange: [81, 95],
    suggestions: [
      "Tailor to Role: Align project descriptions more closely with specific job listings.",
      "Refine Layout: Ensure spacing and typography are perfectly uniform.",
      "Update Certifications: Include recent online courses or professional certifications."
    ]
  }
};
