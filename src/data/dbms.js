export const dbms = [
  {
    id: "dbms-1",
    category: "DBMS",
    question: "What is DBMS? What are its advantages?",
    difficulty: "Easy",
    answer: "A Database Management System (DBMS) is software used to manage databases. It allows users to store, retrieve, define, and manage data. Advantages include: 1) Minimal data redundancy, 2) Data sharing and security, 3) Data integration, 4) Easy access and query processing, and 5) Automated backup and recovery.",
    tips: "Focus on how databases are superior to traditional file-processing systems."
  },
  {
    id: "dbms-2",
    category: "DBMS",
    question: "Explain the difference between DBMS and RDBMS.",
    difficulty: "Easy",
    answer: "DBMS stores data as files, while RDBMS stores data in tabular format (rows and columns). RDBMS enforces integrity constraints, supports relationships between tables, handles primary and foreign keys, and supports ACID properties, which simpler flat-file DBMS systems do not.",
    tips: "Emphasize key terms like tabular format, relationships, keys, and integrity constraints."
  },
  {
    id: "dbms-3",
    category: "DBMS",
    question: "What is Normalization? Explain 1NF, 2NF, 3NF, and BCNF.",
    difficulty: "Medium",
    answer: "Normalization is the process of organizing data in a database to reduce redundancy and dependency. \n- 1NF: Atomic values only; no repeating groups. \n- 2NF: In 1NF + no partial dependency (non-prime attributes must depend on the whole primary key). \n- 3NF: In 2NF + no transitive dependency (non-prime attributes must not depend on other non-prime attributes). \n- BCNF (Boyce-Codd Normal Form): A stronger 3NF; for every functional dependency A -> B, A must be a super key.",
    tips: "Be ready to explain transitive dependencies and partial dependencies with simple table examples if asked."
  },
  {
    id: "dbms-4",
    category: "DBMS",
    question: "What are ACID properties in a database?",
    difficulty: "Medium",
    answer: "ACID properties ensure reliable database transactions: \n- Atomicity: The entire transaction succeeds or fails (All or Nothing). \n- Consistency: Transaction transforms database from one valid state to another valid state. \n- Isolation: Transactions execute concurrently without interfering with one another. \n- Durability: Once committed, changes survive system failures.",
    tips: "Think of a bank transfer example (withdrawing from A and depositing to B) to illustrate Atomicity and Consistency."
  },
  {
    id: "dbms-5",
    category: "DBMS",
    question: "What are Joins in SQL? Explain the different types.",
    difficulty: "Medium",
    answer: "Joins combine rows from two or more tables based on a related column. \n- INNER JOIN: Returns records with matching values in both tables. \n- LEFT (OUTER) JOIN: Returns all records from the left table, and matching records from the right. \n- RIGHT (OUTER) JOIN: Returns all records from the right table, and matching records from the left. \n- FULL (OUTER) JOIN: Returns all records when there is a match in either left or right table.",
    tips: "Use Venn diagrams mentally to describe the intersections and outer regions."
  },
  {
    id: "dbms-6",
    category: "DBMS",
    question: "What is the difference between Primary Key, Unique Key, and Foreign Key?",
    difficulty: "Easy",
    answer: "- Primary Key: Uniquely identifies a record in a table. Cannot contain NULL values. Only one primary key per table. \n- Unique Key: Uniquely identifies a record. Can contain NULL values. Multiple unique keys allowed. \n- Foreign Key: A column that establishes a link between data in two tables, referencing the primary key of another table to maintain referential integrity.",
    tips: "Mention that a Unique key allows NULLs, whereas a Primary key strictly does not."
  },
  {
    id: "dbms-7",
    category: "DBMS",
    question: "What is a Transaction? What are the states of a transaction?",
    difficulty: "Hard",
    answer: "A transaction is a logical unit of processing that performs database operations. The states of a transaction are: 1) Active (initial state), 2) Partially Committed (after final statement executes), 3) Committed (successfully completed), 4) Failed (after discovering operations can't proceed), and 5) Aborted (rolled back to original state).",
    tips: "Draw a mental state transition diagram starting from Active and leading to Committed or Aborted."
  }
];
