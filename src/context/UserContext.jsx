import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

// Sample initial values to populate the dashboard with realistic data
const initialProfile = {
  name: "Gunjan",
  college: "National Institute of Technology",
  branch: "Computer Science & Engineering",
  email: "gunjan.student@nit.edu",
  skills: ["React", "JavaScript", "SQL", "Java", "Data Structures", "Operating Systems", "Networking"]
};

const initialNotes = [
  {
    id: "note-1",
    title: "DBMS Normalization rules",
    content: "1NF: No repeating groups (atomic values).\n2NF: 1NF + no partial dependency (non-key fields depend on the entire primary key).\n3NF: 2NF + no transitive dependency.\nBCNF: Strict 3NF, where X is a superkey for every functional dependency X -> Y.",
    date: "2026-07-09"
  },
  {
    id: "note-2",
    title: "TCP 3-Way Handshake mnemonic",
    content: "SYN -> SYN-ACK -> ACK.\n1. Client: 'Hey, let's sync!'\n2. Server: 'Got it, let's sync. Acknowledged.'\n3. Client: 'Acknowledged, let's transmit data!'",
    date: "2026-07-08"
  }
];

const initialMockAttempts = [
  {
    id: "mock-1",
    date: "2026-07-08",
    category: "Java",
    score: 80,
    confidence: 4,
    grammar: 3,
    technical: 5,
    answers: {
      "OOP concepts in Java?": "OOP concepts are inheritance, polymorphism, encapsulation, and abstraction. Inheritance lets us reuse code. Polymorphism allows overloading and overriding. Encapsulation wraps data. Abstraction hides details."
    },
    suggestions: ["Elaborate more on interface vs abstract classes", "Improve grammar in runtime polymorphism explanation"]
  },
  {
    id: "mock-2",
    date: "2026-07-09",
    category: "DBMS",
    score: 88,
    confidence: 5,
    grammar: 4,
    technical: 5,
    answers: {
      "What are ACID properties?": "ACID stands for Atomicity, Consistency, Isolation, and Durability. Atomicity means all or nothing. Consistency means valid state transitions. Isolation keeps transactions independent. Durability ensures changes survive crashes."
    },
    suggestions: ["Add real-world bank transaction scenario for clarity"]
  }
];

const initialAtsHistory = [
  {
    id: "ats-1",
    date: "2026-07-07",
    fileName: "Gunjan_Resume_v1.pdf",
    score: 75,
    suggestions: [
      "Add direct metrics (e.g., 'Improved load times by 20%')",
      "Expand details under project description",
      "List database technologies explicitly (MySQL, MongoDB)"
    ]
  },
  {
    id: "ats-2",
    date: "2026-07-09",
    fileName: "Gunjan_Resume_Final.pdf",
    score: 82,
    suggestions: [
      "Add projects using cloud technologies",
      "Improve spacing in skills section",
      "Include LinkedIn profile link"
    ]
  }
];

export const UserProvider = ({ children }) => {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('user_profile');
    return saved ? JSON.parse(saved) : initialProfile;
  });

  const [solvedQuestions, setSolvedQuestions] = useState(() => {
    const saved = localStorage.getItem('user_solved_questions');
    if (saved) return JSON.parse(saved);
    
    // Seed some dummy solved questions (let's say 120 is the count, but we will seed some specific IDs
    // and store a counter or seed standard list).
    // Let's seed 15 active ones, and add a virtual count offset of 105 for display, 
    // or just list a bunch of virtual solved IDs to reach 120.
    const virtualSolved = [];
    for (let i = 1; i <= 105; i++) {
      virtualSolved.push(`virtual-q-${i}`);
    }
    // Also include a few real question IDs
    virtualSolved.push("dbms-1", "dbms-3", "os-1", "os-3", "cn-1", "cn-4", "java-1", "java-3", "hr-1", "apt-1");
    return virtualSolved;
  });

  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem('user_streak');
    return saved ? parseInt(saved, 10) : 12; // Default 12 days
  });

  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('user_notes');
    return saved ? JSON.parse(saved) : initialNotes;
  });

  const [mockAttempts, setMockAttempts] = useState(() => {
    const saved = localStorage.getItem('user_mock_attempts');
    return saved ? JSON.parse(saved) : initialMockAttempts;
  });

  const [atsHistory, setAtsHistory] = useState(() => {
    const saved = localStorage.getItem('user_ats_history');
    return saved ? JSON.parse(saved) : initialAtsHistory;
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('user_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('user_solved_questions', JSON.stringify(solvedQuestions));
  }, [solvedQuestions]);

  useEffect(() => {
    localStorage.setItem('user_streak', streak.toString());
  }, [streak]);

  useEffect(() => {
    localStorage.setItem('user_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('user_mock_attempts', JSON.stringify(mockAttempts));
  }, [mockAttempts]);

  useEffect(() => {
    localStorage.setItem('user_ats_history', JSON.stringify(atsHistory));
  }, [atsHistory]);

  // Operations
  const toggleQuestionSolved = (questionId) => {
    setSolvedQuestions((prev) => {
      if (prev.includes(questionId)) {
        return prev.filter(id => id !== questionId);
      } else {
        // Increment streak if it's the first solved question of the day (simplified)
        // If not today's action, let's keep streak steady.
        return [...prev, questionId];
      }
    });
  };

  const addNote = (note) => {
    setNotes((prev) => [note, ...prev]);
  };

  const updateNote = (id, updatedNote) => {
    setNotes((prev) => prev.map(note => note.id === id ? { ...note, ...updatedNote } : note));
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter(note => note.id !== id));
  };

  const updateProfile = (newProfile) => {
    setProfile(newProfile);
  };

  const addMockAttempt = (attempt) => {
    setMockAttempts((prev) => [attempt, ...prev]);
    // Increment streak on attempts
    setStreak(prev => prev + 1);
  };

  const addAtsResult = (result) => {
    setAtsHistory((prev) => [result, ...prev]);
  };

  const incrementStreak = () => {
    setStreak(prev => prev + 1);
  };

  return (
    <UserContext.Provider value={{
      profile,
      solvedQuestions,
      streak,
      notes,
      mockAttempts,
      atsHistory,
      toggleQuestionSolved,
      addNote,
      updateNote,
      deleteNote,
      updateProfile,
      addMockAttempt,
      addAtsResult,
      incrementStreak
    }}>
      {children}
    </UserContext.Provider>
  );
};
