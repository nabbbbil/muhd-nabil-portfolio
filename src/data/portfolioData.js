export const portfolioData = {
  personal: {
    name: "Muhammad Nabil",
    fullName: "Muhammad Nabil bin Ariffudin",
    initials: "MN",
    role: "Game Technology & Web Systems Engineer",
    location: "Johor, Malaysia",
    email: "muhammadnabil030505@gmail.com",
    phone: "+60 11-5186 3842",
    website: "https://muhdnabil.site",
    resumeUrl: "/resume.pdf",
    linkedin: "https://www.linkedin.com/in/muhammad-nabil-bin-ariffudin-234b18430",
    github: "https://github.com/nabbbbil",
    degree: "Bachelor of IT (Game Technology) with Honours (BITE)",
    institution: "Universiti Teknikal Malaysia Melaka (UTeM)",
    cgpa: "3.32",
    honors: "Dean's List (Semester 3 & 5)",
    status: "Internship Placement: 28 Sep 2026 – 12 Mar 2027",
    placementWindow: "28th September 2026 – 12th March 2027",
    tagline: "Ships web systems. Also ships games.",
    statement: "The interesting gameplay problems usually turn out to be data problems wearing a costume.",
    leadBio: "My work sits between game engines and the systems underneath them: network programming, databases, and server infrastructure. A stealth game that reads a smartwatch over UDP and a booking platform that refuses to double-book are closer relatives than they look. Both are about state you cannot afford to get wrong."
  },
  
  stats: [
    { num: "5+", label: "Shipped & production builds across web, engines, & systems" },
    { num: "01", label: "Final year game tech degree (BITE) at UTeM (CGPA 3.32)" },
    { num: "03", label: "Core Game Engines: UE5, Unity, Godot" }
  ],

  projects: [
    {
      id: "vintara-united",
      index: "01",
      title: "Vintara United",
      subtitle: "Official Club Platform & Editorial Web Experience",
      category: "Web Engineering",
      year: "2026",
      status: "LIVE IN PRODUCTION",
      role: "Full-Stack Design & Architecture",
      leadText: "A bespoke Monday night football club platform based in Johor Bahru. Features pre-paint veil choreography, 3D crest space-tilt physics, fixture results feed, and dark/light luxury editorial themes.",
      fullDescription: "Built from the ground up with pure performance and editorial craftsmanship in mind. No heavy framework bloat—engineered with zero-dependency CSS custom properties, pre-paint DOM state restoration for zero theme flash, and responsive dynamic touch handling. Includes match results registry with responsive card viewports.",
      stack: ["HTML5 / CSS3", "JavaScript (ESNext)", "3D Space-Tilt", "Vercel Edge", "Custom Motion"],
      liveUrl: "https://vintara-united.vercel.app/",
      githubUrl: null,
      sticker: "sunburst",
      featured: true,
      ratio: "landscape",
      visualType: "vintara",
      images: [
        "/images/projects/vintara-united-1.png",
        "/images/projects/vintara-united-2.png"
      ]
    },
    {
      id: "vault-runner",
      index: "02",
      title: "Vault Runner: Midnight Heist",
      subtitle: "Bio-Adaptive Stealth Infiltration System",
      category: "Game Technology",
      year: "2026",
      status: "FINAL YEAR PROJECT",
      role: "Lead Gameplay & Network Programmer",
      leadText: "A stealth heist experience in Unreal Engine 5 that listens to real-time biometric telemetry from a WearOS smartwatch over a custom low-latency UDP socket. Heart rate drives dynamic Zen vs Panic AI state machine.",
      fullDescription: "A stealth game in Unreal Engine 5 that listens to a WearOS smartwatch over a custom UDP socket. Real heart rate drives a Zen/Panic state machine, and guard AI perception adapts to whichever state you are in. When the player's pulse accelerates under pressure, security patrol perception radii widen and laser grid frequency multiplies. Keep calm and they lose you.",
      stack: ["Unreal Engine 5", "C++ / Blueprints", "WearOS Telemetry", "UDP Sockets", "Dynamic AI"],
      liveUrl: "https://youtu.be/geQvLD_CuiA?si=yYP0b6Woys1Z4j-9",
      githubUrl: null,
      sticker: "electric-blue",
      featured: true,
      ratio: "portrait",
      visualType: "vault",
      images: [
        "/images/projects/vault-runner-1.png",
        "/images/projects/vault-runner-2.png",
        "/images/projects/vault-runner-3.png"
      ]
    },
    {
      id: "car-booking",
      index: "03",
      title: "Company Fleet Reservation Engine",
      subtitle: "Enterprise Car Booking Platform (Internship Project)",
      category: "Web Engineering",
      year: "2026",
      status: "IN PRODUCTION (LIVE)",
      role: "Full-Stack Developer (IT Intern)",
      leadText: "A mission-critical enterprise car reservation system engineered during my IT Support internship for the company. Eliminates vehicle scheduling collisions with deterministic server-side concurrency locks.",
      fullDescription: "A car booking system for the company fleet, built during my IT Support internship for the company. Staff request a car, an administrator approves or rejects it, and both sides are emailed at every step. Overlapping requests are refused server side, pending and approved alike, with the exact clash quoted back, and a car that has booking history can never be deleted, only retired, so no booking is ever orphaned.",
      stack: ["PHP (Modern)", "MySQL Engine", "CSRF Defense", "Session Auth", "Mail Engine"],
      liveUrl: "https://carbookingtcsb.freedev.app/",
      githubUrl: null,
      sticker: "ember",
      featured: true,
      ratio: "tall",
      visualType: "car",
      images: [
        "/images/projects/car-booking-1.png",
        "/images/projects/car-booking-2.png",
        "/images/projects/car-booking-3.png"
      ]
    },
    {
      id: "football-booking",
      index: "04",
      title: "Football Field Booking Platform",
      subtitle: "Concurrency-Safe Sports Venue Engine",
      category: "Web Engineering",
      year: "2025",
      status: "OPEN SOURCE",
      role: "Full-Stack Engineer",
      leadText: "Full-stack sports venue booking platform in Laravel. Features role-based RBAC admin controls, venue slot availability grids, and transactional double-booking prevention that holds under concurrent race conditions.",
      fullDescription: "A full-stack booking platform in Laravel: authentication, a role-based admin panel for fields and bookings, and double-booking prevention that holds when two people hit submit at once. Built on MySQL with atomic database transactions to ensure zero split-second slot collision. The demo video walks through the full booking and admin flow.",
      stack: ["Laravel 11", "PHP", "MySQL", "Tailwind CSS", "Railway Cloud"],
      liveUrl: "https://youtu.be/6yYOuqcfvEc",
      liveLabel: "Watch Demo Video ↗",
      githubUrl: "https://github.com/nabbbbil/football-field-booking",
      sticker: "mint-pop",
      featured: true,
      ratio: "landscape",
      visualType: "pitch",
      images: [
        "/images/projects/football-booking-1.jpeg",
        "/images/projects/football-booking-2.jpeg",
        "/images/projects/football-booking-3.jpeg"
      ]
    },
    {
      id: "last-vanguard",
      index: "05",
      title: "Last Vanguard",
      subtitle: "3D Sci-Fi Action RPG & Boss Mechanics",
      category: "Game Technology",
      year: "2025",
      status: "SHIPPED",
      role: "3D Asset Artist & Co-Designer",
      leadText: "A high-octane 3D sci-fi action RPG in Unreal Engine featuring real-time combat choreography, six-slot loadout progression, persistent hub stations, and custom Niagara visual particle effects.",
      fullDescription: "A 3D sci-fi action RPG in Unreal Engine with real-time combat, a headquarters hub, six-slot loadouts and two kinds of save point. Built 3D environment assets and multi-stage boss combat encounters, optimizing poly counts and level of detail (LOD) cascades for smooth 60fps frame rates.",
      stack: ["Unreal Engine", "Action RPG", "Niagara VFX", "3D Art", "Combat Trees"],
      liveUrl: null,
      githubUrl: null,
      sticker: "voltage-violet",
      featured: true,
      ratio: "square",
      visualType: "vanguard",
      images: [
        "/images/projects/last-vanguard-1.jpeg",
        "/images/projects/last-vanguard-2.jpeg"
      ]
    },
    {
      id: "securevault",
      index: "06",
      title: "SecureVault Portal",
      subtitle: "Hardened Dual-VM Enterprise Server Cluster",
      category: "Systems & Security",
      year: "2025",
      status: "SHIPPED ARCHITECTURE",
      role: "Server Administrator & Network Engineer",
      leadText: "A secure web portal architecture isolated across two virtual machines on a hardened LAMP stack. Features isolated SSH/SFTP perimeters, strict UFW firewall policies, and MariaDB replication.",
      fullDescription: "A secure web portal across two virtual machines on a LAMP stack. HTTPS, SSH and SFTP access, and a UFW firewall, all configured from a bare Ubuntu install. Required synchronized debugging across physical networking, virtual bridge layers, and database socket permissions.",
      stack: ["Ubuntu Server", "Apache2", "MariaDB", "UFW Firewall", "OpenSSL"],
      liveUrl: null,
      githubUrl: null,
      sticker: "lavender",
      featured: false,
      ratio: "landscape",
      visualType: "securevault",
      images: [
        "/images/projects/securevault-1.jpeg",
        "/images/projects/securevault-2.jpeg",
        "/images/projects/securevault-3.jpeg"
      ]
    },
    {
      id: "city-chase",
      index: "07",
      title: "City Chase: Urban Rooftop Runner",
      subtitle: "Physics-Driven Endless Rooftop Platformer",
      category: "Game Technology",
      year: "2024",
      status: "SHIPPED",
      role: "Gameplay & Physics Programmer",
      leadText: "A high-speed 3D rooftop runner developed in Unity. Programmed character momentum curves, procedural building obstacle hazards, dynamic camera framing, and state management.",
      fullDescription: "A rooftop runner built in Unity. Worked as gameplay programmer on the movement system, obstacle logic and run-state management. Constructed snappy velocity curves with coyote-time jump buffers, ensuring gameplay feels responsive on keyboard and controller.",
      stack: ["Unity Engine", "C#", "Custom Physics", "Cinemachine", "Run-State Manager"],
      liveUrl: null,
      githubUrl: null,
      sticker: "sunburst",
      featured: false,
      ratio: "landscape",
      visualType: "citychase",
      images: [
        "/images/projects/city-chase-1.jpeg",
        "/images/projects/city-chase-2.jpeg",
        "/images/projects/city-chase-3.jpeg"
      ]
    },
    {
      id: "math-quiz",
      index: "08",
      title: "Math Quiz Arcade",
      subtitle: "Interactive Educational Micro-Game",
      category: "Game Technology",
      year: "2024",
      status: "SHIPPED",
      role: "Solo Developer",
      leadText: "An arcade-inspired educational game in Godot Engine that transforms arithmetic drills into an engaging experience with snappy feedback audio and visual particle rewards.",
      fullDescription: "An educational quiz game that tries to make basic math worth sitting through: multiple choice questions, scoring, and plain feedback after every answer. Programmed dynamic difficulty scaling in GDScript.",
      stack: ["Godot Engine", "GDScript", "UI Component System", "Audio Engine"],
      liveUrl: null,
      githubUrl: null,
      sticker: "mint-pop",
      featured: false,
      ratio: "landscape",
      visualType: "mathquiz",
      images: [
        "/images/projects/math-quiz-1.jpeg"
      ]
    },
    {
      id: "mencari-kamu",
      index: "09",
      title: "Mencari Kamu",
      subtitle: "Strategic Physical Tabletop Board Game",
      category: "Game Design",
      year: "2024",
      status: "PHYSICAL PROTOTYPE SHIPPED",
      role: "Game Concept, Rules & Visual Design",
      leadText: "A tabletop board game centered around social deduction and anticipation. Paper prototyping taught me how player psychology, incomplete information, and rule systems interact long before writing a line of code.",
      fullDescription: "A physical board game built to get people talking and thinking a few moves ahead. Concept, rules, visual layout and playtesting, all of it mine. Paper prototypes teach you faster than any engine.",
      stack: ["System Design", "Rules Topology", "Playtesting", "Physical Prototyping"],
      liveUrl: null,
      githubUrl: null,
      sticker: "electric-blue",
      featured: false,
      ratio: "landscape",
      visualType: "mencarikamu",
      images: [
        "/images/projects/mencari-kamu-1.jpeg",
        "/images/projects/mencari-kamu-2.jpeg",
        "/images/projects/mencari-kamu-3.jpeg"
      ]
    }
  ],

  toolkit: [
    {
      group: "Game Engines & 3D",
      count: "03 Engines",
      desc: "Architecting interactive worlds, real-time gameplay loops, and AI systems.",
      items: ["Unreal Engine 5", "Unity", "Godot Engine", "Niagara VFX", "Blueprints / C++", "Gameplay Programming"]
    },
    {
      group: "Programming Languages",
      count: "05 Core Languages",
      desc: "Low-level system logic, modern web backend, and game scripting.",
      items: ["C++", "C#", "PHP 8.x", "JavaScript (ESNext)", "GDScript", "SQL"]
    },
    {
      group: "Web & API Architecture",
      count: "Production Ready",
      desc: "Full-stack platforms built for concurrency, resilience, and clean UX.",
      items: ["Laravel", "Tailwind CSS", "RESTful APIs", "Session Authentication", "Responsive Motion", "Vite"]
    },
    {
      group: "Data, Networks & Infrastructure",
      count: "DevOps & Sockets",
      desc: "Databases, network protocols, and secure Linux server administration.",
      items: ["MySQL", "MariaDB", "UDP Sockets", "Ubuntu Linux", "Apache2 Server", "UFW Firewall"]
    },
    {
      group: "3D Art & Creative Media",
      count: "Asset Pipeline",
      desc: "Creating 3D game models, environmental props, textures, and video production.",
      items: ["Blender", "Adobe Photoshop", "Adobe Premiere Pro", "After Effects", "CapCut", "Canva"]
    }
  ]
};
