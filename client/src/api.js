import mockData from "../../server/data.json";

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

  return new Promise((resolve) => {
    setTimeout(() => {
      // 1. Chapters & Nested Units Mapping
      if (path === '/api/chapters') {
        resolve(mockData.courses || mockData.chapters || []);
        return;
      }
      if (path.startsWith('/api/chapters/')) {
        const id = path.split('/').pop();
        const items = mockData.courses || mockData.chapters || [];
        const found = items.find(c => String(c.id) === String(id));
        resolve(found || {});
        return;
      }
      
      // 2. Forums & Discussions Mapping
      if (path === '/api/forum') {
        resolve(mockData.forum || mockData.questions || []);
        return;
      }
      if (path.startsWith('/api/forum/')) {
        const id = path.split('/').pop();
        const items = mockData.forum || mockData.questions || [];
        const found = items.find(q => String(q.id) === String(id));
        resolve(found || {});
        return;
      }

      // 3. Leaderboards & User States Default Fallback
      if (path === '/api/leaderboard') {
        resolve(mockData.leaderboard || []);
        return;
      }
      if (path === '/api/me') {
        resolve(mockData.me || { name: "Sakshi Kumari", streaks: 12, xp: 450, badges: [] });
        return;
      }

      // Default safe recovery state object
      resolve({});
    }, 100);
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