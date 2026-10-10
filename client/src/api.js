async function request(path, options = {}) {
  const res = await fetch(path, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || "Request failed");
  }
  return data;
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
