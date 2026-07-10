export const os = [
  {
    id: "os-1",
    category: "Operating System",
    question: "What is an Operating System and what are its core functions?",
    difficulty: "Easy",
    answer: "An Operating System (OS) is system software that acts as an interface between the user and computer hardware. Core functions include: 1) Processor/CPU management, 2) Memory management, 3) Device management, 4) File management, 5) Security, and 6) Job accounting.",
    tips: "Explain it as a resource manager and coordinator."
  },
  {
    id: "os-2",
    category: "Operating System",
    question: "Explain the difference between a Process and a Thread.",
    difficulty: "Easy",
    answer: "A Process is an executing program with its own memory space (code, data, heap, stack). A Thread is a lightweight sub-process; it is the smallest unit of CPU execution. Multiple threads within the same process share the process's code, data, and resources, but have their own registers and stack.",
    tips: "Remember: Processes are independent and heavy-weight; threads share memory and are lightweight."
  },
  {
    id: "os-3",
    category: "Operating System",
    question: "What is Deadlock? What are the four necessary conditions for it to occur?",
    difficulty: "Medium",
    answer: "A Deadlock is a situation where a set of processes are blocked because each process is holding a resource and waiting for another resource held by some other process. The four necessary Coffman conditions are: \n1) Mutual Exclusion (only one process can use a resource at a time), \n2) Hold and Wait (process holding resources can request new ones), \n3) No Preemption (resources cannot be forcibly taken from a process), and \n4) Circular Wait (processes form a circular chain where each waits for a resource held by the next).",
    tips: "Mention the 'Coffman conditions' by name to show deep knowledge."
  },
  {
    id: "os-4",
    category: "Operating System",
    question: "What is Virtual Memory? How does Paging work?",
    difficulty: "Medium",
    answer: "Virtual Memory is a memory management technique that allows the execution of processes that may not be completely in physical memory, by using secondary storage as an extension of RAM. Paging divides virtual memory into fixed-size blocks called 'pages' and physical memory into 'frames'. The OS maps pages to frames using a Page Table.",
    tips: "Be prepared to explain 'page fault' and thrashing if asked to expand."
  },
  {
    id: "os-5",
    category: "Operating System",
    question: "What is a Page Fault? How is it resolved?",
    difficulty: "Medium",
    answer: "A Page Fault occurs when a program attempts to access data in virtual memory that is not currently mapped into physical memory (RAM). Resolution: 1) The CPU traps to the OS, 2) OS finds the desired page on disk, 3) OS finds a free frame in RAM, 4) OS reads the page into the frame, 5) OS updates the Page Table, and 6) CPU restarts the instruction.",
    tips: "Summarize this as a trap, fetch, swap, update, and restart loop."
  },
  {
    id: "os-6",
    category: "Operating System",
    question: "What is Semaphore? Explain the difference between Binary and Counting Semaphore.",
    difficulty: "Hard",
    answer: "A Semaphore is an integer variable used for signaling and solving critical section problems. \n- Binary Semaphore: Can take values 0 and 1 only (similar to a Mutex, used for mutual exclusion). \n- Counting Semaphore: Can take any non-negative integer value, used to control access to a resource pool with multiple instances.",
    tips: "Explain wait() and signal() operations (also known as P and V)."
  }
];
