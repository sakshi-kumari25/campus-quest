async function request(path, options = {}) {
  const isLocalEnvironment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

  // Scenario A: Running locally on your machine -> interact with the Express server node
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

  // Scenario B: Live on Vercel -> Data matrix perfectly synchronized with your Leaderboard props
  const mockData = {
    me: { name: "Sakshi Kumari (You)", streaks: 12, xp: 250, badges: "4/7" },
    leaderboard: [
      {
        id: "u5",
        name: "Shraddha",
        major: "B.Tech × Electronics & Comm.",
        xp: 512,
        weeklyXp: 140,
        streak: 18,
        avatar: "SR",
        accent: "#fbbf24",
        badges: ["first-spark", "week-warrior", "century-club", "scholar", "campus-legend"]
      },
      {
        id: "u2",
        name: "Vaibhav",
        major: "B.Tech × Mechanical Engineering",
        xp: 410,
        weeklyXp: 124,
        streak: 9,
        avatar: "VB",
        accent: "#a78bfa",
        badges: ["first-spark", "week-warrior", "century-club", "scholar"]
      },
      {
        id: "u1",
        name: "Sakshi Kumari (You)",
        major: "B.Tech × Computer Science",
        xp: 250,
        weeklyXp: 96,
        streak: 12,
        avatar: "SK",
        accent: "#22d3ee",
        badges: ["first-spark", "week-warrior", "century-club", "scholar"]
      },
      {
        id: "u3",
        name: "Rabindra",
        major: "B.Tech × Electrical Engineering",
        xp: 355,
        weeklyXp: 101,
        streak: 21,
        avatar: "RB",
        accent: "#f472b6",
        badges: ["first-spark", "week-warrior", "century-club", "campus-hero"]
      },
      {
        id: "u4",
        name: "Shashi",
        major: "B.Tech × Civil Engineering",
        xp: 198,
        weeklyXp: 72,
        streak: 4,
        avatar: "SS",
        accent: "#34d399",
        badges: ["first-spark", "century-club"]
      }
    ],
    chapters: [
      { id: "1", title: "Data Structures & Types", description: "Master Arrays, Stacks, Queues, and Linked Lists.", xp: 100 },
      { id: "2", title: "Algorithm Complexities", description: "Understand Big O notation and time complexity analyses.", xp: 120 }
    ],
    forum: [
      { id: "1", title: "How to reverse a doubly linked list?", author: "Sakshi Kumari (You)", answers: 3, views: 42, accepted: true },
      { id: "2", title: "Understanding quicksort worst-case partition choices", author: "Shraddha", answers: 1, views: 18, accepted: false }
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
        resolve(found || {});
        return;
      }
      if (path === '/api/forum') {
        resolve(mockData.forum);
        return;
      }
      if (path.startsWith('/api/forum/')) {
        const id = path.split('/').pop();
        const found = mockData.forum.find(q => String(q.id) === String(id));
        resolve(found || {});
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
