import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

// Sample initial values to populate the dashboard with realistic data
const initialProfile = {
  name: "Gunjan",
  college: "National Institute of Technology",
  branch: "Computer Science & Engineering",
  email: "demo@interviewace.com",
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

// Helper to get or initialize the multi-user database from localStorage
const getUsersDb = () => {
  try {
    const raw = localStorage.getItem('app_users_db');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') return parsed;
    }
  } catch (e) {
    console.error("Error reading app_users_db", e);
  }

  // Pre-seed default demo account so anyone reviewing can immediately test login!
  const defaultVirtualSolved = [];
  for (let i = 1; i <= 105; i++) {
    defaultVirtualSolved.push(`virtual-q-${i}`);
  }
  defaultVirtualSolved.push("dbms-1", "dbms-3", "os-1", "os-3", "cn-1", "cn-4", "java-1", "java-3", "hr-1", "apt-1");

  const seeded = {
    "demo@interviewace.com": {
      email: "demo@interviewace.com",
      password: "password123",
      profile: initialProfile,
      solvedQuestions: defaultVirtualSolved,
      streak: 12,
      notes: initialNotes,
      mockAttempts: initialMockAttempts,
      atsHistory: initialAtsHistory
    }
  };

  try {
    localStorage.setItem('app_users_db', JSON.stringify(seeded));
  } catch (e) {
    console.error("Error writing app_users_db", e);
  }

  return seeded;
};

export const UserProvider = ({ children }) => {
  const [usersDb, setUsersDb] = useState(() => getUsersDb());
  const [activeEmail, setActiveEmail] = useState(() => {
    return localStorage.getItem('active_user_email') || null;
  });

  const currentRecord = activeEmail && usersDb[activeEmail] ? usersDb[activeEmail] : null;

  const [profile, setProfile] = useState(() => currentRecord?.profile || null);
  const [solvedQuestions, setSolvedQuestions] = useState(() => currentRecord?.solvedQuestions || []);
  const [streak, setStreak] = useState(() => currentRecord?.streak || 0);
  const [notes, setNotes] = useState(() => currentRecord?.notes || []);
  const [mockAttempts, setMockAttempts] = useState(() => currentRecord?.mockAttempts || []);
  const [atsHistory, setAtsHistory] = useState(() => currentRecord?.atsHistory || []);

  // Sync active user state changes back to their saved account record in usersDb
  useEffect(() => {
    if (!activeEmail || !profile) {
      localStorage.removeItem('active_user_email');
      localStorage.removeItem('user_profile');
      return;
    }

    localStorage.setItem('active_user_email', activeEmail);
    localStorage.setItem('user_profile', JSON.stringify(profile));

    setUsersDb(prevDb => {
      const existing = prevDb[activeEmail] || {};
      const updatedUser = {
        ...existing,
        email: activeEmail,
        profile,
        solvedQuestions,
        streak,
        notes,
        mockAttempts,
        atsHistory
      };
      const newDb = { ...prevDb, [activeEmail]: updatedUser };
      try {
        localStorage.setItem('app_users_db', JSON.stringify(newDb));
      } catch (err) {
        console.error("Failed to sync to usersDb", err);
      }
      return newDb;
    });
  }, [activeEmail, profile, solvedQuestions, streak, notes, mockAttempts, atsHistory]);

  // Operations
  const toggleQuestionSolved = (questionId) => {
    setSolvedQuestions((prev) => {
      if (prev.includes(questionId)) {
        return prev.filter(id => id !== questionId);
      } else {
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
    setStreak(prev => prev + 1);
  };

  const addAtsResult = (result) => {
    setAtsHistory((prev) => [result, ...prev]);
  };

  const incrementStreak = () => {
    setStreak(prev => prev + 1);
  };

  // Auth Operations
  const loginUser = (email, password) => {
    const norm = email.trim().toLowerCase();
    const currentDb = getUsersDb();
    const user = currentDb[norm];

    if (!user) {
      return { 
        success: false, 
        message: "No account found with this email. Please switch to the Sign Up tab to create one." 
      };
    }

    if (user.password && password && user.password !== password) {
      return { 
        success: false, 
        message: "Incorrect password. Please try again." 
      };
    }

    setActiveEmail(norm);
    setProfile(user.profile);
    setSolvedQuestions(user.solvedQuestions || []);
    setStreak(user.streak || 1);
    setNotes(user.notes || []);
    setMockAttempts(user.mockAttempts || []);
    setAtsHistory(user.atsHistory || []);

    localStorage.setItem('active_user_email', norm);
    localStorage.setItem('user_profile', JSON.stringify(user.profile));

    return { success: true, user: user.profile };
  };

  const registerUser = ({ name, email, password, college, branch, skills }) => {
    const norm = email.trim().toLowerCase();
    const currentDb = getUsersDb();

    if (currentDb[norm]) {
      return { 
        success: false, 
        message: "An account with this email already exists. Please switch to Log In." 
      };
    }

    const newProfile = {
      name: name.trim(),
      email: norm,
      college: college ? college.trim() : '',
      branch: branch ? branch.trim() : '',
      skills: skills || []
    };

    const newUser = {
      email: norm,
      password: password || 'password123',
      profile: newProfile,
      solvedQuestions: [],
      streak: 1,
      notes: [],
      mockAttempts: [],
      atsHistory: []
    };

    const nextDb = { ...currentDb, [norm]: newUser };
    try {
      localStorage.setItem('app_users_db', JSON.stringify(nextDb));
    } catch (e) {
      console.error(e);
    }

    setUsersDb(nextDb);
    setActiveEmail(norm);
    setProfile(newProfile);
    setSolvedQuestions([]);
    setStreak(1);
    setNotes([]);
    setMockAttempts([]);
    setAtsHistory([]);

    localStorage.setItem('active_user_email', norm);
    localStorage.setItem('user_profile', JSON.stringify(newProfile));

    return { success: true, user: newProfile };
  };

  const logoutUser = () => {
    setActiveEmail(null);
    setProfile(null);
    setSolvedQuestions([]);
    setStreak(0);
    setNotes([]);
    setMockAttempts([]);
    setAtsHistory([]);
    localStorage.removeItem('active_user_email');
    localStorage.removeItem('user_profile');
    return { success: true };
  };

  const deleteAccount = () => {
    if (!activeEmail) return;
    const currentDb = getUsersDb();
    const nextDb = { ...currentDb };
    delete nextDb[activeEmail];
    try {
      localStorage.setItem('app_users_db', JSON.stringify(nextDb));
    } catch (e) {
      console.error(e);
    }
    setUsersDb(nextDb);
    logoutUser();
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
      incrementStreak,
      loginUser,
      registerUser,
      logoutUser,
      deleteAccount
    }}>
      {children}
    </UserContext.Provider>
  );
};
