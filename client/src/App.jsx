async function request(path, options = {}) {
  const isLocalEnvironment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

  if (isLocalEnvironment) {
    const fullPath = `http://localhost:4000${path}`;
    const res = await fetch(fullPath, {
      headers: { "Content-Type": "application/json", ...(options.headers || {}) },
      ...options,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || "Request failed");
    return data;
  }

  // COMPLETE ENRICHED CLOUD DATA CORE: Loaded with nested quiz objects and forum reply threads
  const mockData = {
    me: { name: "Sakshi Kumari (You)", streaks: 12, xp: 250, badges: "4/7" },
    leaderboard: [
      { id: "u5", name: "Shraddha", major: "B.Tech × Electronics & Comm.", xp: 512, weeklyXp: 140, streak: 18, avatar: "SR", accent: "#fbbf24", badges: ["first-spark", "week-warrior", "century-club", "scholar", "campus-legend"] },
      { id: "u2", name: "Vaibhav", major: "B.Tech × Mechanical Engineering", xp: 410, weeklyXp: 124, streak: 9, avatar: "VB", accent: "#a78bfa", badges: ["first-spark", "week-warrior", "century-club", "scholar"] },
      { id: "u1", name: "Sakshi Kumari (You)", major: "B.Tech × Computer Science", xp: 250, weeklyXp: 96, streak: 12, avatar: "SK", accent: "#22d3ee", badges: ["first-spark", "week-warrior", "century-club", "scholar"] },
      { id: "u3", name: "Rabindra", major: "B.Tech × Electrical Engineering", xp: 355, weeklyXp: 101, streak: 21, avatar: "RB", accent: "#f472b6", badges: ["first-spark", "week-warrior", "century-club", "campus-hero"] },
      { id: "u04", name: "Shashi", major: "B.Tech × Civil Engineering", xp: 198, weeklyXp: 72, streak: 4, avatar: "SS", accent: "#34d399", badges: ["first-spark", "century-club"] }
    ],
    chapters: [
      { 
        id: "1", 
        title: "CPU Scheduling Algorithms & Core Concurrency", 
        description: "Master how kernels prioritize active process execution streams, calculate turnaround metrics, and handle multithreading cycles.", 
        xp: 100,
        quizzes: [
          { id: "q1_1", question: "Which CPU scheduling algorithm can result in the 'convoy effect'?", options: ["First-Come, First-Served (FCFS)", "Round Robin", "Shortest Job First (SJF)", "Priority Scheduling"], correctAnswer: 0 },
          { id: "q1_2", question: "What metric measures the total elapsed time from process submission to its complete termination?", options: ["Waiting Time", "Response Time", "Turnaround Time", "Throughput"], correctAnswer: 2 }
        ]
      },
      { 
        id: "2", 
        title: "Mesh Analysis, Nodal Laws, & Circuit Network Theorems", 
        description: "Deconstructing active current distribution vectors, impedance tracking parameters, and complex bridge loops.", 
        xp: 120,
        quizzes: [
          { id: "q2_1", question: "Mesh analysis is direct application of which fundamental electrical law?", options: ["Ohm's Law", "Kirchhoff's Current Law (KCL)", "Kirchhoff's Voltage Law (KVL)", "Norton's Theorem"], correctAnswer: 2 },
          { id: "q2_2", question: "In a circuit with 'n' independent nodes, how many essential nodal equations are required?", options: ["n", "n - 1", "n + 1", "2n"], correctAnswer: 1 }
        ]
      },
      {
        id: "3",
        title: "Laws of Thermodynamics & Closed-Loop Energy Cycles",
        description: "An intuitive deep dive into energy preservation transformations, entropy thresholds, and cyclic heat engine work metrics.",
        xp: 110,
        quizzes: [
          { id: "q3_1", question: "Which thermodynamic framework states that entropy of an isolated system always increases over time?", options: ["Zeroth Law", "First Law", "Second Law", "Third Law"], correctAnswer: 2 }
        ]
      },
      {
        id: "4",
        title: "Stress-Strain Dynamics & Structural Mechanics",
        description: "Mastering internal load distribution mechanics, shear force vectors, bending moments, and structural load metrics.",
        xp: 135,
        quizzes: [
          { id: "q4_1", question: "What is the ratio of lateral strain to linear axial strain within elastic limits called?", options: ["Modulus of Elasticity", "Poisson's Ratio", "Bulk Modulus", "Shear Modulus"], correctAnswer: 1 }
        ]
      }
    ],
    forum: [
      { 
        id: "1", 
        title: "How to reverse a doubly linked list?", 
        body: "I am having trouble swapping the next and prev pointers correctly without losing my node references. Any clean boilerplate loop examples?",
        author: "Sakshi Kumari (You)", 
        views: 42, 
        accepted: true,
        answers: [
          { id: "a1", body: "You need to maintain a temporary pointer to swap the links inside a simple while loop. Make sure you adjust the final head marker!", author: "Vaibhav", accepted: true },
          { id: "a2", body: "Don't forget to update the old tail element to be your new head at the very end of your pointer swap sequences.", author: "Shraddha", accepted: false }
        ]
      },
      { 
        id: "2", 
        title: "Understanding quicksort worst-case partition choices", 
        body: "Why does picking the first element as a pivot lead to O(n^2) runtime on arrays that are already fully sorted?",
        author: "Shraddha", 
        views: 18, 
        accepted: false,
        answers: [
          { id: "a3", body: "Because it produces completely unbalanced splits (0 elements on one side, n-1 elements on the other) every single cycle. Consider using randomized quicksort instead!", author: "Rabindra", accepted: false }
        ]
      }
    ]
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      if (path === '/api/chapters') {
        resolve(mockData.chapters);
        return;
      }
      if (path.startsWith('/api/chapters/')) {
        const id = path.split('/').pop();
        const found = mockData.chapters.find(c => String(c.id) === String(id));
        resolve(found || { title: "Chapter Module", description: "", quizzes: [] });
        return;
      }
      if (path === '/api/forum') {
        resolve(mockData.forum.map(f => ({ ...f, answers: f.answers.length })));
        return;
      }
      if (path.startsWith('/api/forum/')) {
        const id = path.split('/').pop();
        const found = mockData.forum.find(q => String(q.id) === String(id));
        resolve(found || { title: "Discussion Post", body: "", author: "Anonymous", answers: [] });
        return;
      }
      if (path === '/api/leaderboard') {
        resolve(mockData.leaderboard);
        return;
      }
      if (path === '/api/me') {
        resolve(mockData.me);
        return;
      }
      resolve({});
    }, 50);
  });
}

export const api = {
  me: () => request("/api/me"),
  leaderboard: () => request("/api/leaderboard"),
  chapters: () => request("/api/chapters"),
  chapter: (id) => request(`/api/chapters/${id}`),
  answerQuiz: (chapterId, payload) =>
    request(`/api/chapters/${chapterId}/answer`, {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  forum: () => request("/api/forum"),
  createQuestion: (payload) =>
    request("/api/forum", { method: "POST", body: JSON.stringify(payload) }),
  question: (id) => request(`/api/forum/${id}`),
  answerQuestion: (id, body) =>
    request(`/api/forum/${id}/answers`, {
      method: "POST",
      body: JSON.stringify({ body }),
    }),
  acceptAnswer: (id, answerId) =>
    request(`/api/forum/${id}/accept`, {
      method: "POST",
      body: JSON.stringify({ answerId }),
    }),
};
