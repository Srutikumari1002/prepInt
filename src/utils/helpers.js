// Generates a mock interview feedback score based on keywords and length
export const generateMockFeedback = (category, question, answer) => {
  if (!answer || answer.trim().length < 10) {
    return {
      confidence: 2,
      grammar: 2,
      technical: 1,
      score: 30,
      suggestions: [
        "Your answer is too short. Try to elaborate with structured points.",
        "Include more technical terminology related to the topic.",
        "Structure your response: state the definition first, then explain, then give an example."
      ]
    };
  }

  const length = answer.trim().length;
  let confidence = 3;
  let grammar = 3;
  let technical = 3;
  const suggestions = [];

  // Keywords checklist based on category/question
  const answerLower = answer.toLowerCase();
  
  if (category === "Java" || answerLower.includes("java")) {
    if (answerLower.includes("polymorphism") || answerLower.includes("inheritance") || answerLower.includes("encapsulation") || answerLower.includes("abstraction")) {
      technical += 1;
    } else {
      suggestions.push("Mention core OOP concepts: Inheritance, Polymorphism, Encapsulation, Abstraction.");
    }
  }

  if (category === "DBMS" || answerLower.includes("database") || answerLower.includes("table")) {
    if (answerLower.includes("normalization") || answerLower.includes("acid") || answerLower.includes("redundancy") || answerLower.includes("key")) {
      technical += 1;
    } else {
      suggestions.push("Use database keywords like 'normalization', 'integrity', 'redundancy', and 'keys'.");
    }
  }

  if (answerLower.includes("example") || answerLower.includes("such as") || answerLower.includes("like")) {
    confidence += 1;
  } else {
    suggestions.push("Always include a practical example or use-case to build interviewer confidence.");
  }

  if (length > 150) {
    confidence += 1;
    technical += 1;
  } else {
    suggestions.push("Expand on the explanation. Explain 'why' and 'how' rather than just 'what'.");
  }

  if (length > 250) {
    grammar += 1;
  }

  // Bound ratings to max 5
  confidence = Math.min(5, confidence);
  grammar = Math.min(5, grammar);
  technical = Math.min(5, technical);

  const averageScore = Math.round(((confidence + grammar + technical) / 15) * 100);

  if (suggestions.length === 0) {
    suggestions.push("Excellent work! Your answer is descriptive, well-structured, and technically solid.");
  }

  return {
    confidence,
    grammar,
    technical,
    score: averageScore,
    suggestions
  };
};

// Generates a mock ATS evaluation based on resume text content
export const calculateAtsScore = (fileName, text = "") => {
  const fileLower = fileName.toLowerCase();
  const textLower = text.toLowerCase();

  let score = 65; // Base score
  const suggestions = [];

  // Simulate file type checks
  if (fileLower.endsWith(".pdf") || fileLower.endsWith(".docx")) {
    score += 5;
  } else {
    suggestions.push("Upload your resume in PDF or DOCX format instead of image/other formats.");
  }

  // Keywords scan simulations
  const keywords = ["project", "react", "javascript", "database", "java", "sql", "git", "optimize", "agile", "experience"];
  let matchedCount = 0;

  keywords.forEach(word => {
    if (textLower.includes(word)) {
      matchedCount++;
    }
  });

  // If there's no pasted text, we check the file name or generate a realistic simulation around 82%
  if (!text) {
    // Return a realistic simulation matching the dashboard
    if (fileLower.includes("final") || fileLower.includes("v2")) {
      return {
        score: 82,
        suggestions: [
          "✔ Add Projects: Your project count looks good, but add more details on system architecture.",
          "✔ Add Metrics: Quantify results using metrics (e.g. 'Improved efficiency by 15%').",
          "✔ Improve Skills Section: Make sure database skills (e.g., SQL, MongoDB) are explicitly listed."
        ]
      };
    } else {
      return {
        score: 68,
        suggestions: [
          "✔ Add Projects: You should include at least 3 detailed projects.",
          "✔ Improve Skills Section: Group your skills into categories (languages, frameworks, databases).",
          "✔ Make it Single-Column: Single-column resumes are parsed better by ATS engines."
        ]
      };
    }
  }

  // If text is provided, calculate based on keywords
  score += matchedCount * 2.5;
  
  if (matchedCount < 4) {
    suggestions.push("Add essential tech stack keywords: 'React', 'JavaScript', 'SQL', or 'Java'.");
  } else {
    suggestions.push("Good job including core technical skills keywords.");
  }

  // Check metrics (digits + %)
  const hasMetrics = /[\d]+%/.test(text) || /[\d]+\s*(hours|days|percent|users|x)/.test(text);
  if (hasMetrics) {
    score += 10;
    suggestions.push("Excellent work using numbers and metrics to quantify achievements.");
  } else {
    score -= 5;
    suggestions.push("Include metrics (e.g., 'scaled users by 30%', 'reduced loading time by 200ms') to show impact.");
  }

  // Keep score between 40 and 98
  score = Math.max(40, Math.min(98, Math.round(score)));

  return {
    score,
    suggestions
  };
};

export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
