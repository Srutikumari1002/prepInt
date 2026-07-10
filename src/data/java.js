export const java = [
  {
    id: "java-1",
    category: "Java",
    question: "What are the OOP concepts in Java?",
    difficulty: "Easy",
    answer: "The four main Object-Oriented Programming (OOP) pillars are: \n1. Inheritance: Acquiring properties/behaviors of a parent class (using `extends`). \n2. Polymorphism: Performing a single action in different ways (Method Overloading - compile time, Method Overriding - runtime). \n3. Encapsulation: Wrapping data (variables) and code (methods) together into a single unit (using private variables and getters/setters). \n4. Abstraction: Hiding implementation details and showing only functionality (using interfaces and abstract classes).",
    tips: "Explain how these principles are implemented in Java syntax (e.g. interfaces, abstract classes, extends, overrides)."
  },
  {
    id: "java-2",
    category: "Java",
    question: "Explain the difference between JDK, JRE, and JVM.",
    difficulty: "Easy",
    answer: "- JVM (Java Virtual Machine): An abstract machine that executes Java bytecode. It is platform-dependent. \n- JRE (Java Runtime Environment): Contains the JVM + libraries + helper files required to run Java applications. \n- JDK (Java Development Kit): Full development environment containing the JRE + compiler (`javac`), debugger, and other dev tools.",
    tips: "Remember: JDK is for developing, JRE is for running, JVM is for executing the bytecode."
  },
  {
    id: "java-3",
    category: "Java",
    question: "Why is String immutable in Java?",
    difficulty: "Medium",
    answer: "Strings are immutable (cannot be modified after creation) for: \n1. String Pool: Memory optimization by sharing identical string literals. \n2. Security: Strings are widely used for databases, file paths, and network connections; changing them mid-flight could lead to security risks. \n3. Thread Safety: Safe for concurrent access without synchronization. \n4. Caching Hashcode: Safe to use as keys in HashMaps since the hashcode never changes.",
    tips: "Refer to the 'String Constant Pool' specifically when discussing memory efficiency."
  },
  {
    id: "java-4",
    category: "Java",
    question: "What is the difference between Method Overloading and Method Overriding?",
    difficulty: "Easy",
    answer: "- Method Overloading (Compile-time Polymorphism): Multiple methods in the same class have the same name but different signatures (parameter lists). \n- Method Overriding (Runtime Polymorphism): A subclass provides a specific implementation of a method already declared in its superclass, with the exact same name, return type, and signature.",
    tips: "Overloading: same class, different parameters. Overriding: different classes, same parameters."
  },
  {
    id: "java-5",
    category: "Java",
    question: "Explain Exception Handling in Java. What is the difference between Checked and Unchecked Exceptions?",
    difficulty: "Medium",
    answer: "- Checked Exceptions: Checked at compile-time. Code will not compile if not handled (either caught using try-catch or declared using `throws`). E.g., `IOException`, `SQLException`. \n- Unchecked (Runtime) Exceptions: Checked at runtime, usually due to programming errors. Do not need to be caught explicitly. E.g., `NullPointerException`, `ArrayIndexOutOfBoundsException`.",
    tips: "Mention that all exceptions inherit from the `Throwable` class."
  },
  {
    id: "java-6",
    category: "Java",
    question: "What is the difference between Interface and Abstract Class in Java?",
    difficulty: "Medium",
    answer: "- Abstract Class: Can have abstract and concrete methods. Supports single inheritance only. Can have instance variables. Can have constructors. \n- Interface: By default, methods are public abstract (Java 8+ allows default and static methods). Supports multiple inheritance. Variables are implicitly public static final. Cannot have constructors.",
    tips: "Say that Java 8 introduced default methods in interfaces, blurring the line but inheritance rules remain."
  },
  {
    id: "java-7",
    category: "Java",
    question: "What is the Java Garbage Collector? How does it work?",
    difficulty: "Hard",
    answer: "Garbage Collection (GC) in Java is an automatic process managed by the JVM to reclaim heap memory occupied by unreachable objects. It runs on a daemon thread. It uses algorithms like Mark-and-Sweep. It divides heap memory into generations: Young Generation (Eden, S0, S1), Old Generation (Tenured), and Permanent/Metaspace.",
    tips: "Be sure to mention that `System.gc()` suggests GC to run but does not guarantee it."
  }
];
