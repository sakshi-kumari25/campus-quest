import React, { useState } from 'react';
import {
  HelpCircle,
  MessageSquare,
  X,
  Image,
  ThumbsUp,
  Send
} from 'lucide-react';

export default function Forum() {
  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subjectTag, setSubjectTag] = useState('');
  const [xpReward, setXpReward] = useState('25');
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState(null);

  // Reply input states
  const [replyInputs, setReplyInputs] = useState({});

  // Empty feed initially
  const [questions, setQuestions] = useState([]);

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file.');
      e.target.value = '';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5 MB.');
      e.target.value = '';
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result);
      setError(null);
    };

    reader.readAsDataURL(file);
  };

  // Submit question
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('A question Title is required to post to the feed.');
      return;
    }

    const reward = Number(xpReward);

    const newPost = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim()
        ? description.trim()
        : 'No additional description details provided.',
      tag: subjectTag.trim() || 'General',
      xpReward:
        xpReward.trim() !== '' && Number.isFinite(reward)
          ? Math.max(0, reward)
          : 25,
      image: selectedImage,
      time: 'Just now',
      user: 'Sakshi Kumari (You)',
      likes: 0,
      replies: []
    };

    setQuestions((prev) => [newPost, ...prev]);

    // Reset form
    setTitle('');
    setDescription('');
    setSubjectTag('');
    setXpReward('25');
    setSelectedImage(null);
    setError(null);
  };

  // Like a post
  const handleLike = (id) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id ? { ...q, likes: q.likes + 1 } : q
      )
    );
  };

  // Update reply input
  const handleReplyChange = (id, value) => {
    setReplyInputs((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  // Submit reply
  const handleReplySubmit = (e, id) => {
    e.preventDefault();

    const text = (replyInputs[id] || '').trim();

    if (!text) return;

    const newReply = {
      id: Date.now(),
      user: 'Sakshi Kumari (You)',
      text,
      time: 'Just now'
    };

    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id
          ? { ...q, replies: [...q.replies, newReply] }
          : q
      )
    );

    setReplyInputs((prev) => ({
      ...prev,
      [id]: ''
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-zinc-900 dark:text-slate-100 p-4 transition-colors duration-300 animate-in">
      <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-[1fr_1fr]">

        {/* LEFT COLUMN: QUESTION FORM */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-3xl shadow-sm h-fit transition-colors duration-300">
          <div className="flex items-center gap-2 mb-4 border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <HelpCircle className="w-5 h-5 text-violet-500" />
            <h2 className="text-xl font-black text-zinc-950 dark:text-white">
              Ask the Campus Feed
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Title */}
            <div className="text-left">
              <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block mb-1">
                Title <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What is your doubt about? (Required)"
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>

            {/* Optional description */}
            <div className="text-left">
              <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block mb-1">
                Description{' '}
                <span className="text-[10px] text-zinc-400 normal-case font-normal">
                  (Optional)
                </span>
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide additional details or context..."
                rows={3}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-violet-500 transition-colors resize-none"
              />
            </div>

            {/* Optional photo upload */}
            <div className="text-left">
              <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block mb-1">
                Attach Reference Photo{' '}
                <span className="text-[10px] text-zinc-400 normal-case font-normal">
                  (Optional)
                </span>
              </label>

              <div className="flex items-center justify-between gap-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-3 rounded-xl transition-colors">
                <label className="flex items-center gap-2 px-4 py-2 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-800 dark:text-slate-200 font-bold text-[11px] rounded-lg cursor-pointer transition-all whitespace-nowrap">
                  <Image size={15} />
                  Choose Photo

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>

                {selectedImage ? (
                  <div className="relative w-20 h-12 shrink-0 rounded-lg overflow-hidden border border-zinc-300 dark:border-zinc-700 shadow-sm">
                    <img
                      src={selectedImage}
                      alt="Selected question preview"
                      className="w-full h-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => setSelectedImage(null)}
                      aria-label="Remove selected photo"
                      className="absolute top-0.5 right-0.5 bg-red-600 hover:bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center transition-colors"
                    >
                      <X size={10} />
                    </button>
                  </div>
                ) : (
                  <span className="text-[11px] text-zinc-400 italic pr-2">
                    No photo attached
                  </span>
                )}
              </div>
            </div>

            {/* Subject and XP */}
            <div className="grid gap-3 grid-cols-2 text-left">
              <div>
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block mb-1">
                  Subject / Tag{' '}
                  <span className="text-[10px] text-zinc-400 normal-case font-normal">
                    (Optional)
                  </span>
                </label>

                <input
                  type="text"
                  value={subjectTag}
                  onChange={(e) => setSubjectTag(e.target.value)}
                  placeholder="e.g. OS, DBMS"
                  className="w-full min-w-0 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 px-3 py-2 rounded-xl text-xs focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block mb-1">
                  XP Reward
                </label>

                <input
                  type="number"
                  min="0"
                  step="1"
                  value={xpReward}
                  onChange={(e) => setXpReward(e.target.value)}
                  className="w-full min-w-0 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 px-3 py-2 rounded-xl text-xs text-center font-mono focus:outline-none focus:border-violet-500"
                />
              </div>
            </div>

            {/* Validation error */}
            {error && (
              <p
                role="alert"
                className="text-xs text-red-500 font-semibold text-left"
              >
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-500 via-violet-600 to-fuchsia-500 hover:opacity-95 text-white font-black text-sm rounded-xl transition-all shadow-md shadow-violet-950/20 cursor-pointer"
            >
              Drop it in the feed
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: COMMUNITY FEED */}
        <div className="space-y-4 md:max-h-[85vh] md:overflow-y-auto md:pr-1">

          {/* Feed heading */}
          <div className="flex items-center justify-between px-1">
            <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-violet-500" />
              Active Campus Timeline
            </h3>

            <span className="text-[10px] font-mono font-bold bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 rounded-full text-zinc-500">
              {questions.length} Items
            </span>
          </div>

          {/* Empty state */}
          {questions.length === 0 ? (
            <div className="bg-white dark:bg-zinc-900 border border-dashed border-zinc-200 dark:border-zinc-800 p-12 rounded-3xl text-center text-zinc-400 dark:text-zinc-500 text-xs italic transition-colors">
              The community feed is clear. Ask a question to get the conversation started!
            </div>
          ) : (
            questions.map((q) => (
              <div
                key={q.id}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-3xl shadow-sm text-left transition-colors animate-in"
              >
                {/* Post header */}
                <div className="flex justify-between items-start gap-3 mb-3">
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold font-mono text-violet-600 dark:text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2 py-1 rounded-md uppercase tracking-wider break-words">
                      {q.tag}
                    </span>

                    <span className="text-[10px] text-zinc-400 block font-mono mt-2">
                      {q.user} · {q.time}
                    </span>
                  </div>

                  <span className="text-[11px] shrink-0 font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                    ⚡ {q.xpReward} XP
                  </span>
                </div>

                {/* Post title */}
                <h4 className="text-sm font-bold text-zinc-950 dark:text-slate-100 mb-2 leading-snug break-words">
                  {q.title}
                </h4>

                {/* Post description */}
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3 whitespace-pre-wrap break-words">
                  {q.description}
                </p>

                {/* Attached image */}
                {q.image && (
                  <div className="w-full max-h-64 rounded-xl overflow-hidden mb-4 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
                    <img
                      src={q.image}
                      alt="Question reference"
                      className="w-full max-h-64 object-contain"
                    />
                  </div>
                )}

                {/* Like and reply counts */}
                <div className="flex items-center gap-5 border-b border-zinc-100 dark:border-zinc-800 pb-3 mb-3">
                  <button
                    type="button"
                    onClick={() => handleLike(q.id)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-violet-500 transition-colors"
                  >
                    <ThumbsUp size={15} />
                    {q.likes} Likes
                  </button>

                  <span className="flex items-center gap-1.5 text-xs text-zinc-500">
                    <MessageSquare size={15} />
                    {q.replies.length} Replies
                  </span>
                </div>

                {/* Replies list */}
                {q.replies.length > 0 && (
                  <div className="space-y-3 mb-4">
                    {q.replies.map((r) => (
                      <div
                        key={r.id}
                        className="flex gap-2 bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl"
                      >
                        <div className="w-7 h-7 shrink-0 rounded-full bg-violet-600 flex items-center justify-center text-[9px] font-bold text-white">
                          {r.user.slice(0, 2)}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="text-[11px] font-bold text-zinc-800 dark:text-zinc-200">
                              {r.user}
                            </span>

                            <span className="text-[9px] text-zinc-400">
                              {r.time}
                            </span>
                          </div>

                          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-wrap break-words">
                            {r.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reply form */}
                <form
                  onSubmit={(e) => handleReplySubmit(e, q.id)}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={replyInputs[q.id] || ''}
                    onChange={(e) =>
                      handleReplyChange(q.id, e.target.value)
                    }
                    placeholder="Write a helpful reply..."
                    aria-label={`Reply to ${q.title}`}
                    className="flex-1 min-w-0 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 px-3 py-2.5 rounded-xl text-xs focus:outline-none focus:border-violet-500 transition-colors"
                  />

                  <button
                    type="submit"
                    disabled={!(replyInputs[q.id] || '').trim()}
                    aria-label="Send reply"
                    className="p-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-40 text-white transition-colors"
                  >
                    <Send size={15} />
                  </button>
                </form>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}