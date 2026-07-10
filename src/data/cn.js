export const cn = [
  {
    id: "cn-1",
    category: "Computer Network",
    question: "What is the OSI model? Explain its seven layers.",
    difficulty: "Easy",
    answer: "The OSI (Open Systems Interconnection) model is a conceptual framework that standardizes network communication. The seven layers (bottom to top) are: \n1. Physical (raw bit streams), \n2. Data Link (node-to-node framing & MAC addresses), \n3. Network (routing & IP packets), \n4. Transport (segmentation & end-to-end reliability - TCP/UDP), \n5. Session (dialogue control & session maintenance), \n6. Presentation (data formatting & encryption), \n7. Application (network services to user applications).",
    tips: "Remember the mnemonic: 'Please Do Not Throw Sausage Pizza Away'."
  },
  {
    id: "cn-2",
    category: "Computer Network",
    question: "Explain the difference between TCP and UDP.",
    difficulty: "Easy",
    answer: "TCP (Transmission Control Protocol) is connection-oriented, reliable, guarantees packet ordering, handles flow/congestion control, but is slower. UDP (User Datagram Protocol) is connectionless, unreliable (best-effort), does not guarantee ordering, has no congestion control, but is much faster and lightweight.",
    tips: "Provide application examples: Web browsing & email use TCP; video streaming & gaming use UDP."
  },
  {
    id: "cn-3",
    category: "Computer Network",
    question: "What happens when you type a URL (like google.com) in your browser and press Enter?",
    difficulty: "Medium",
    answer: "1. Browser checks cache for DNS records, then queries a DNS server to resolve 'google.com' to an IP address. \n2. Browser initiates a TCP 3-way handshake with the server's IP address. \n3. A TLS handshake is performed for HTTPS security. \n4. Browser sends an HTTP/HTTPS request (GET). \n5. Server processes request and responds with HTML/CSS/JS. \n6. Browser renders the web page.",
    tips: "Be ready to explain this step-by-step: DNS -> TCP -> HTTP -> Render."
  },
  {
    id: "cn-4",
    category: "Computer Network",
    question: "Explain the TCP Three-Way Handshake mechanism.",
    difficulty: "Medium",
    answer: "The TCP 3-way handshake establishes a reliable connection: \n1. SYN: Client sends a SYN (Synchronize) packet to the server with a random sequence number. \n2. SYN-ACK: Server responds with a SYN-ACK packet, acknowledging client's sequence number and sending its own. \n3. ACK: Client sends an ACK (Acknowledge) packet back, confirming connection setup. Data transmission can now begin.",
    tips: "Explain how sequence numbers are synchronized to guarantee ordering."
  },
  {
    id: "cn-5",
    category: "Computer Network",
    question: "What is the difference between IPv4 and IPv6?",
    difficulty: "Medium",
    answer: "- IPv4: Uses a 32-bit address (e.g. 192.168.1.1), providing ~4.3 billion addresses. Written in decimal format. \n- IPv6: Uses a 128-bit address (e.g. 2001:0db8:85a3:0000:0000:8a2e:0370:7334), providing a virtually unlimited number of addresses. Written in hexadecimal format, supports built-in IP security (IPSec), and simplified headers.",
    tips: "Specify address sizes (32-bit vs 128-bit) as the primary differentiator."
  },
  {
    id: "cn-6",
    category: "Computer Network",
    question: "Explain the difference between a Hub, Switch, and Router.",
    difficulty: "Medium",
    answer: "- Hub: Operates at Layer 1 (Physical). Broadcasts all incoming packets to all ports. High collision rate, insecure. \n- Switch: Operates at Layer 2 (Data Link). Directs packets to specific devices using MAC addresses, maintaining a MAC address table. \n- Router: Operates at Layer 3 (Network). Forwards data packets between different networks based on IP addresses.",
    tips: "Focus on the layer they operate on: Layer 1 (Hub), Layer 2 (Switch), Layer 3 (Router)."
  }
];
