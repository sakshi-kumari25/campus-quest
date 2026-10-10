const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { createInitialState, BADGE_CATALOG } = require("./seed");

const PORT = process.env.PORT || 4000;
const DATA_FILE = path.join(__dirname, "data.json");
const CURRENT_USER_ID = "u1";

const app = express();
app.use(cors());
app.use(express.json());

function loadState() {
  if (!fs.existsSync(DATA_FILE)) {
    const initial = createInitialState();
    saveState(initial);
    return initial;
  }
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}

function saveState(state) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(state, null, 2));
}

function uid(prefix) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

function levelFor(xp) {
  return Math.floor(xp / 120) + 1;
}

function awardBadges(user, extra = {}) {
  const earned = new Set(user.badges);
  if (user.xp >= 10) earned.add("first-spark");
  if (user.streak >= 7) earned.add("week-warrior");
  if (user.xp >= 100) earned.add("century-club");
  if ((extra.chaptersCompleted || 0) >= 3) earned.add("scholar");
  if (extra.helpedPeer) earned.add("campus-hero");
  if (extra.postedQuestion) earned.add("curious-mind");
  if (user.xp >= 500) earned.add("campus-legend");
  user.badges = [...earned];
}

function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    handle: user.handle,
    avatar: user.avatar,
    accent: user.accent,
    xp: user.xp,
    streak: user.streak,
    level: levelFor(user.xp),
    badges: user.badges,
    major: user.major,
  };
}

function chaptersCompletedCount(user) {
  return Object.values(user.completedQuizzes || {}).filter(
    (ids, _, arr) => ids && ids.length > 0
  ).length;
}

app.get("/api/me", (req, res) => {
  const db = loadState();
  const me = db.users.find((u) => u.id === CURRENT_USER_ID);
  res.json({
    user: publicUser(me),
    completedQuizzes: me.completedQuizzes,
    badgeCatalog: BADGE_CATALOG,
  });
});

app.get("/api/leaderboard", (req, res) => {
  const db = loadState();
  const ranked = [...db.users]
    .sort((a, b) => b.weeklyXp - a.weeklyXp || b.xp - a.xp)
    .map((u, i) => ({
      rank: i + 1,
      weeklyXp: u.weeklyXp,
      isYou: u.id === CURRENT_USER_ID,
      ...publicUser(u),
    }));
  res.json(ranked);
});

app.get("/api/chapters", (req, res) => {
  const db = loadState();
  const me = db.users.find((u) => u.id === CURRENT_USER_ID);
  const list = db.chapters.map((ch) => {
    const done = me.completedQuizzes[ch.id] || [];
    return {
      id: ch.id,
      title: ch.title,
      subject: ch.subject,
      blurb: ch.blurb,
      minutes: ch.minutes,
      accent: ch.accent,
      questionCount: ch.questions.length,
      completedCount: done.length,
    };
  });
  res.json(list);
});

app.get("/api/chapters/:id", (req, res) => {
  const db = loadState();
  const chapter = db.chapters.find((c) => c.id === req.params.id);
  if (!chapter) return res.status(404).json({ error: "Chapter not found" });
  const me = db.users.find((u) => u.id === CURRENT_USER_ID);
  const answered = me.completedQuizzes[chapter.id] || [];
  res.json({
    ...chapter,
    questions: chapter.questions.map((q) => ({
      id: q.id,
      prompt: q.prompt,
      options: q.options,
      answered: answered.includes(q.id),
    })),
  });
});

app.post("/api/chapters/:id/answer", (req, res) => {
  const { questionId, optionIndex } = req.body;
  const db = loadState();
  const chapter = db.chapters.find((c) => c.id === req.params.id);
  if (!chapter) return res.status(404).json({ error: "Chapter not found" });
  const question = chapter.questions.find((q) => q.id === questionId);
  if (!question) return res.status(404).json({ error: "Question not found" });

  const me = db.users.find((u) => u.id === CURRENT_USER_ID);
  me.completedQuizzes[chapter.id] = me.completedQuizzes[chapter.id] || [];

  if (me.completedQuizzes[chapter.id].includes(questionId)) {
    return res.json({
      correct: optionIndex === question.correctIndex,
      alreadyAwarded: true,
      xpGained: 0,
      user: publicUser(me),
    });
  }

  const correct = optionIndex === question.correctIndex;
  let xpGained = 0;
  if (correct) {
    xpGained = 10;
    me.xp += 10;
    me.weeklyXp += 10;
    me.completedQuizzes[chapter.id].push(questionId);
    const today = new Date().toISOString().slice(0, 10);
    if (me.lastActive !== today) {
      me.streak += 1;
      me.lastActive = today;
    }
    awardBadges(me, { chaptersCompleted: chaptersCompletedCount(me) });
    saveState(db);
  }

  res.json({
    correct,
    alreadyAwarded: false,
    xpGained,
    explanation: question.explanation,
    user: publicUser(me),
    completedQuizzes: me.completedQuizzes,
  });
});

app.get("/api/forum", (req, res) => {
  const db = loadState();
  const posts = db.forum
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .map((p) => {
      const author = db.users.find((u) => u.id === p.authorId);
      return {
        id: p.id,
        title: p.title,
        description: p.description,
        tag: p.tag,
        xpReward: p.xpReward,
        createdAt: p.createdAt,
        acceptedAnswerId: p.acceptedAnswerId,
        answerCount: p.answers.length,
        author: publicUser(author),
        isMine: p.authorId === CURRENT_USER_ID,
      };
    });
  res.json(posts);
});

app.post("/api/forum", (req, res) => {
  const { title, description, tag, xpReward } = req.body;
  if (!title?.trim() || !description?.trim() || !tag?.trim()) {
    return res.status(400).json({ error: "Title, description, and subject are required." });
  }
  const reward = Math.max(10, Math.min(200, Number(xpReward) || 25));
  const db = loadState();
  const post = {
    id: uid("q"),
    authorId: CURRENT_USER_ID,
    title: title.trim(),
    description: description.trim(),
    tag: tag.trim(),
    xpReward: reward,
    createdAt: new Date().toISOString(),
    acceptedAnswerId: null,
    answers: [],
  };
  db.forum.unshift(post);
  const me = db.users.find((u) => u.id === CURRENT_USER_ID);
  awardBadges(me, { postedQuestion: true, chaptersCompleted: chaptersCompletedCount(me) });
  saveState(db);
  res.status(201).json({ id: post.id });
});

app.get("/api/forum/:id", (req, res) => {
  const db = loadState();
  const post = db.forum.find((p) => p.id === req.params.id);
  if (!post) return res.status(404).json({ error: "Question not found" });
  const author = db.users.find((u) => u.id === post.authorId);
  res.json({
    id: post.id,
    title: post.title,
    description: post.description,
    tag: post.tag,
    xpReward: post.xpReward,
    createdAt: post.createdAt,
    acceptedAnswerId: post.acceptedAnswerId,
    isMine: post.authorId === CURRENT_USER_ID,
    author: publicUser(author),
    answers: post.answers.map((a) => {
      const u = db.users.find((x) => x.id === a.authorId);
      return {
        ...a,
        author: publicUser(u),
        isMine: a.authorId === CURRENT_USER_ID,
        accepted: post.acceptedAnswerId === a.id,
      };
    }),
  });
});

app.post("/api/forum/:id/answers", (req, res) => {
  const { body } = req.body;
  if (!body?.trim()) return res.status(400).json({ error: "Answer cannot be empty." });
  const db = loadState();
  const post = db.forum.find((p) => p.id === req.params.id);
  if (!post) return res.status(404).json({ error: "Question not found" });
  if (post.authorId === CURRENT_USER_ID) {
    return res.status(400).json({ error: "You cannot answer your own question." });
  }
  const answer = {
    id: uid("a"),
    authorId: CURRENT_USER_ID,
    body: body.trim(),
    createdAt: new Date().toISOString(),
  };
  post.answers.push(answer);
  saveState(db);
  res.status(201).json({ id: answer.id });
});

app.post("/api/forum/:id/accept", (req, res) => {
  const { answerId } = req.body;
  const db = loadState();
  const post = db.forum.find((p) => p.id === req.params.id);
  if (!post) return res.status(404).json({ error: "Question not found" });
  if (post.authorId !== CURRENT_USER_ID) {
    return res.status(403).json({ error: "Only the original poster can accept a solution." });
  }
  if (post.acceptedAnswerId) {
    return res.status(400).json({ error: "A solution was already accepted." });
  }
  const answer = post.answers.find((a) => a.id === answerId);
  if (!answer) return res.status(404).json({ error: "Answer not found" });

  const helper = db.users.find((u) => u.id === answer.authorId);
  const me = db.users.find((u) => u.id === CURRENT_USER_ID);
  const previousLevel = levelFor(helper.xp);
  const transfer = post.xpReward;
  const bonus = 50;
  const total = transfer + bonus;

  helper.xp += total;
  helper.weeklyXp += total;
  awardBadges(helper, { helpedPeer: true, chaptersCompleted: chaptersCompletedCount(helper) });
  awardBadges(me, { chaptersCompleted: chaptersCompletedCount(me) });
  post.acceptedAnswerId = answerId;
  saveState(db);

  const newLevel = levelFor(helper.xp);
  res.json({
    helper: publicUser(helper),
    user: publicUser(me),
    celebration: {
      title: newLevel > previousLevel ? `${helper.name} leveled up!` : "Solution accepted",
      subtitle: `You transferred ${transfer} XP and a +${bonus} hero bonus to ${helper.name}.`,
      xpGained: total,
      helperName: helper.name,
      helperAvatar: helper.avatar,
      leveledUp: newLevel > previousLevel,
      newLevel,
    },
  });
});

app.listen(PORT, () => {
  loadState();
  console.log(`Campus Quest API running on http://localhost:${PORT}`);
});
