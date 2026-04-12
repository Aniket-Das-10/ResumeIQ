const sampleResume = {
  personalInfo: {
    fullName: "ANIKET DAS",
    email: "aniketdas810144@gmail.com",
    phone: "+91 8101773934",
    location: "Kolkata, India",
    linkedin: "linkedin.com/in/aniket-das-829751288/",
    github: "github.com/Aniket-Das-10"
  },
  summary: "Aspiring Software Development Engineer and current B.Tech student with strong fundamentals in Data Structures and Algorithms (100+ LeetCode, 100+ GFG problems solved). Experienced in building responsive web architectures with Tailwind CSS and React.js, and designing robust backend services with Node.js and MongoDB. A competitive participant in hackathons like Code Frost, dedicated to delivering scalable, user-centric ed-tech and real-time tracking solutions.",
  experience: [
    {
      company: "Where is my bus - Real-Time Bus Tracking System",
      role: "Full-Stack Developer",
      duration: "Aug 2025 - Oct 2025",
      description: [
        "Built a real-time tracking system integrating ESP32 and NEO-M8 GPS modules to stream live location data.",
        "Developed an interactive frontend using React.js and Tailwind CSS with Google Maps API for live route visualization.",
        "Designed and implemented RESTful APIs using Node.js, Express.js, and MongoDB to manage real-time data flow."
      ]
    },
    {
      company: "GrowUp - EdTech Platform",
      role: "UI/UX Designer & Frontend Developer",
      duration: "Feb 2026 - Present",
      description: [
        "Conceptualized and designed the brand identity and UI/UX for a modern educational technology platform.",
        "Developing the frontend architecture focusing on user-centric design and responsive layouts."
      ]
    }
  ],
  education: [
    {
      institution: "B. P. Poddar Institute of Management and Technology",
      degree: "Bachelor of Technology (B.Tech)",
      year: "Till 5th semester",
      grade: "CGPA: 6.9"
    },
    {
      institution: "Moula Netaji Vidhalay | WBCHSE",
      degree: "Higher Secondary (Class XII)",
      year: "2020",
      grade: "74%"
    },
    {
      institution: "Khurigachi High School | WBBSE",
      degree: "Secondary (Class X)",
      year: "2018",
      grade: "63%"
    }
  ],
  skills: [
    "React.js", "Node.js", "Express.js", "Tailwind CSS", "HTML5", "CSS3",
    "MongoDB", "RESTful APIs", "Google Maps API",
    "C++ (OOP)", "JavaScript", "MATLAB",
    "ESP32", "NEO-6M GPS Modules", "Arduino", "IR/PIR Sensors",
    "Git/GitHub", "Postman", "Tome AI"
  ],
  achievements: [
    "Solved 100+ problems on LeetCode and 100+ problems on GeeksforGeeks, focusing on Data Structures and Algorithms (DSA).",
    "Code Frost Hackathon: Built a functional prototype as part of a team, applying full-stack development concepts and competitive problem-solving.",
    "Educ-A-Thon: Developed an education-based solution focusing on usability, scalability, and practical implementation."
  ],
  additionalInformation: {
    languages: ["English", "Bengali", "Hindi"],
    interests: ["IoT Innovation", "Open Source Contribution"]
  }
};

const sampleSelfDescription = `I am an aspiring Software Development Engineer and current B.Tech student with strong fundamentals in Data Structures and Algorithms. I have experience building responsive web architectures with Tailwind CSS and React.js, and designing robust backend services with Node.js and MongoDB. I am passionate about IoT innovation and real-time systems, as demonstrated by my project 'Where is my bus'. I enjoy participating in hackathons and am dedicated to delivering scalable, user-centric solutions.`;

const sampleJobDescription = `
**Position: Senior Full Stack Developer**
**Company: FutureLink Systems**
**Location: Remote / Bangalore**

**About the Role:**
We are looking for a Senior Full Stack Developer to join our core engineering team. You will be responsible for designing and developing the next generation of our flagship SaaS product. You will work closely with product managers and other engineers to deliver high-quality features that serve thousands of users.

**Key Responsibilities:**
- Design, develop, and maintain scalable web applications using React and Node.js.
- Architect robust backend services and optimize database queries for performance.
- Mentor junior developers and provide technical leadership on complex projects.
- Ensure the technical feasibility of UI/UX designs.
- Participate in code reviews and contribute to engineering best practices.

**Required Qualifications:**
- 5+ years of experience in professional software development.
- Strong proficiency in JavaScript (React/Node.js).
- Experience with cloud platforms (AWS/GCP/Azure).
- Solid understanding of NoSQL and SQL databases.
- Experience with containerization technologies like Docker and Kubernetes.
- Excellent problem-solving skills and communication abilities.

**Preferred Skills:**
- Experience with Next.js or GraphQL.
- Knowledge of DevOps practices and CI/CD pipelines.
- Interest in AI/ML integrations.
`;

module.exports = {
  sampleResume,
  sampleSelfDescription,
  sampleJobDescription
};
