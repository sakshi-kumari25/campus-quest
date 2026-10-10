import React, { useState } from 'react';

export default function QuizBattle({ userXP, setUserXP }) {
  const [battleMode, setBattleMode] = useState(null);
  const [difficulty, setDifficulty] = useState('Easy');
  const [queueStatus, setQueueStatus] = useState('Looking for opponents...');
  const [score, setScore] = useState(0);

  // Solo Practice Mode States
  const [currentSoloIndex, setCurrentSoloIndex] = useState(0);
  const [selectedSoloOption, setSelectedSoloOption] = useState(null);
  const [hasSubmittedSolo, setHasSubmittedSolo] = useState(false);

  // Engineering Questions
  const soloQuestions = [
    {
      subject: "Operating Systems (CSE)",
      prompt: "Which data structure operates on a strict First-In, First-Out (FIFO) pipeline mechanism?",
      options: [
        "Stack Frame",
        "Queue Segment",
        "Binary Max-Heap Tree",
        "Directed Acyclic Graph"
      ],
      correctIndex: 1,
      explanation:
        "Queues process elements strictly in the order they arrive (First-In, First-Out)."
    },
    {
      subject: "Thermodynamics (ME)",
      prompt: "Which law of thermodynamics mathematically defines and establishes the parameter of Entropy?",
      options: [
        "Zeroth Law",
        "First Law",
        "Second Law",
        "Third Law"
      ],
      correctIndex: 2,
      explanation:
        "The Second Law of Thermodynamics explains the behavior of entropy in physical processes."
    },
    {
      subject: "Network Theory (EE/ECE)",
      prompt: "Kirchhoff's Current Law (KCL) is a direct functional consequence of the conservation of which metric?",
      options: [
        "Total Energy",
        "Linear Momentum",
        "Mass",
        "Electric Charge"
      ],
      correctIndex: 3,
      explanation:
        "KCL relies on the conservation of electric charge at a circuit node."
    },
    {
      subject: "Mechanics of Solids (CE)",
      prompt: "What parameter is calculated by taking the ratio of lateral strain to longitudinal strain under a uniform axial load?",
      options: [
        "Young's Modulus",
        "Poisson's Ratio",
        "Bulk Modulus",
        "Shear Modulus"
      ],
      correctIndex: 1,
      explanation:
        "Poisson's Ratio relates lateral strain to longitudinal strain."
    }
  ];

  const startMatchmaking = (mode) => {
    setBattleMode('matchmaking');
    setQueueStatus(`Searching for a balanced ${mode} duel...`);

    setTimeout(() => {
      setQueueStatus('Opponent matched! Loading Arena...');

      setTimeout(() => {
        setBattleMode('active-battle');
      }, 1500);
    }, 2500);
  };

  // Live Arena Answer Handler
  const handleLiveAnswerSubmit = (isCorrect) => {
    if (isCorrect) {
      const xpReward =
        difficulty === 'Easy' ? 10 :
        difficulty === 'Medium' ? 25 : 50;

      if (typeof setUserXP === 'function') {
        setUserXP((prev) => prev + xpReward);
      }

      setScore((prev) => prev + 1);
      alert(`🎯 Correct Answer! Earned +${xpReward} XP to your dashboard stats.`);
    } else {
      alert('❌ Incorrect! Try reading the chapter documentation.');
    }

    setBattleMode(null);
  };

  // Solo Practice Handlers
  const handleSoloOptionSelect = (optionIndex) => {
    if (hasSubmittedSolo) return;
    setSelectedSoloOption(optionIndex);
  };

  const submitSoloAnswer = () => {
    if (selectedSoloOption === null || hasSubmittedSolo) return;

    setHasSubmittedSolo(true);

    const currentQ = soloQuestions[currentSoloIndex];
    const isCorrect = selectedSoloOption === currentQ.correctIndex;

    if (isCorrect) {
      if (typeof setUserXP === 'function') {
        setUserXP((prev) => prev + 15);
      }

      setScore((prev) => prev + 1);
    }
  };

  const handleNextSoloQuestion = () => {
    setSelectedSoloOption(null);
    setHasSubmittedSolo(false);

    if (currentSoloIndex + 1 < soloQuestions.length) {
      setCurrentSoloIndex((prev) => prev + 1);
    } else {
      alert(
        `🎉 Practice Session Complete! You answered ${score} questions successfully.`
      );

      setCurrentSoloIndex(0);
      setScore(0);
      setBattleMode(null);
    }
  };

  const activeSoloQuestion = soloQuestions[currentSoloIndex];

  return (
    <div className="p-6 bg-slate-50 dark:bg-zinc-950 text-zinc-900 dark:text-slate-100 min-h-[85vh] font-sans flex flex-col justify-center items-center w-full transition-colors duration-300">

      {/* 1. MAIN ARENA DASHBOARD MENU */}
      {!battleMode && (
        <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-3xl text-center shadow-xl transition-colors duration-300 animate-in">

          <h2 className="text-3xl font-extrabold mb-2 text-violet-600 dark:text-violet-400">
            Quiz Battle Arena
          </h2>

          <p className="text-zinc-600 dark:text-zinc-400 mb-8 text-sm">
            Test your limits solo or match against live peer bots for double metrics payouts.
          </p>

          <div className="flex justify-center gap-3 mb-8 bg-zinc-100 dark:bg-zinc-950 p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 w-fit mx-auto transition-colors duration-300">
            {['Easy', 'Medium', 'Hard'].map((diff) => (
              <button
                key={diff}
                onClick={() => setDifficulty(diff)}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                  difficulty === diff
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-slate-200'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <button
              onClick={() => setBattleMode('solo')}
              className="p-6 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-violet-500 rounded-2xl group transition-all text-center shadow-xs cursor-pointer"
            >
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                🛡️
              </div>
              <h4 className="font-bold mb-1 text-sm">Solo Practice</h4>
              <p className="text-xs text-zinc-500">
                Practice at your own pace.
              </p>
            </button>

            <button
              onClick={() => startMatchmaking('1v1')}
              className="p-6 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-violet-500 rounded-2xl group transition-all text-center shadow-xs cursor-pointer"
            >
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                ⚔️
              </div>
              <h4 className="font-bold mb-1 text-sm">1v1 Peer Duel</h4>
              <p className="text-xs text-zinc-500">
                Compete for rank scoring.
              </p>
            </button>

            <button
              onClick={() => startMatchmaking('2v2')}
              className="p-6 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-violet-500 rounded-2xl group transition-all text-center shadow-xs cursor-pointer"
            >
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                🔮
              </div>
              <h4 className="font-bold mb-1 text-sm">2v2 Squad Clash</h4>
              <p className="text-xs text-zinc-500">
                Team up with study bots.
              </p>
            </button>
          </div>
        </div>
      )}

      {/* 2. SOLO PRACTICE */}
      {battleMode === 'solo' && (
        <div className="w-full max-w-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-3xl shadow-xl transition-colors duration-300 animate-in">

          <div className="flex justify-between items-center mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-3">
            <span className="text-[10px] font-bold px-2 py-1 bg-violet-100 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-900/60 rounded-md tracking-wider">
              {activeSoloQuestion.subject}
            </span>

            <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
              Question {currentSoloIndex + 1} of {soloQuestions.length}
            </span>
          </div>

          <h3 className="text-lg font-bold mb-6 leading-snug">
            {activeSoloQuestion.prompt}
          </h3>

          <div className="space-y-3 mb-6">
            {activeSoloQuestion.options.map((option, idx) => {
              let btnStyle =
                "bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60";

              if (!hasSubmittedSolo && selectedSoloOption === idx) {
                btnStyle =
                  "bg-violet-50 dark:bg-violet-950/40 border-2 border-violet-500 text-violet-600 dark:text-violet-400 font-medium";
              } else if (hasSubmittedSolo) {
                if (idx === activeSoloQuestion.correctIndex) {
                  btnStyle =
                    "bg-emerald-100 dark:bg-emerald-950/40 border-2 border-emerald-500 text-emerald-700 dark:text-emerald-400 font-semibold";
                } else if (
                  selectedSoloOption === idx &&
                  idx !== activeSoloQuestion.correctIndex
                ) {
                  btnStyle =
                    "bg-red-100 dark:bg-red-950/40 border-2 border-red-500 text-red-700 dark:text-red-400 line-through";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSoloOptionSelect(idx)}
                  disabled={hasSubmittedSolo}
                  className={`w-full text-left p-4 rounded-xl transition-all text-sm cursor-pointer ${btnStyle}`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {/* Academic Explanation Window */}
          {hasSubmittedSolo && (
            <div className="mb-6 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <h4
                className={`text-xs font-bold uppercase tracking-wider mb-2 ${
                  selectedSoloOption === activeSoloQuestion.correctIndex
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-red-500"
                }`}
              >
                {selectedSoloOption === activeSoloQuestion.correctIndex
                  ? "✓ Correct! (+15 XP Awarded)"
                  : "✗ Incorrect Answer"}
              </h4>

              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {activeSoloQuestion.explanation}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            {!hasSubmittedSolo ? (
              <button
                onClick={submitSoloAnswer}
                disabled={selectedSoloOption === null}
                className={`px-5 py-2.5 font-bold text-xs rounded-xl transition-all shadow-sm ${
                  selectedSoloOption === null
                    ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 cursor-not-allowed'
                    : 'bg-violet-600 hover:bg-violet-500 text-white cursor-pointer transform hover:scale-102 active:scale-98'
                }`}
              >
                Check Answer
              </button>
            ) : (
              <button
                onClick={handleNextSoloQuestion}
                className="px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
              >
                {currentSoloIndex + 1 === soloQuestions.length
                  ? "Finish Practice"
                  : "Next Question →"}
              </button>
            )}

            <button
              onClick={() => {
                setBattleMode(null);
                setSelectedSoloOption(null);
                setHasSubmittedSolo(false);
                setCurrentSoloIndex(0);
                setScore(0);
              }}
              className="px-5 py-2.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold text-xs rounded-xl transition-all border border-zinc-200 dark:border-zinc-700 cursor-pointer"
            >
              Exit Arena
            </button>
          </div>
        </div>
      )}

      {/* 3. MATCHMAKING QUEUE */}
      {battleMode === 'matchmaking' && (
        <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-3xl text-center shadow-xl">
          <div className="text-4xl mb-4 animate-pulse">⚔️</div>
          <h2 className="text-2xl font-extrabold mb-3 text-violet-600 dark:text-violet-400">
            Matchmaking Queue
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {queueStatus}
          </p>
        </div>
      )}

      {/* 4. ACTIVE BOT MATCH ARENA */}
      {battleMode === 'active-battle' && (
        <div className="w-full max-w-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-3xl shadow-xl">
          <h2 className="text-2xl font-extrabold mb-2 text-violet-600 dark:text-violet-400">
            LIVE DUEL MATCH
          </h2>

          <p className="text-xs text-zinc-500 mb-6">
            Tier Difficulty: {difficulty}
          </p>

          <h3 className="text-lg font-bold mb-6">
            Which data structure operates on a strict First-In, First-Out (FIFO) pipeline execution mechanism?
          </h3>

          <div className="space-y-3">
            <button
              onClick={() => handleLiveAnswerSubmit(false)}
              className="w-full text-left p-4 bg-zinc-50 dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-800 rounded-xl transition-all text-sm cursor-pointer"
            >
              A) Stack Configuration Frame
            </button>

            <button
              onClick={() => handleLiveAnswerSubmit(true)}
              className="w-full text-left p-4 bg-zinc-50 dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-800 rounded-xl transition-all text-sm cursor-pointer"
            >
              B) Queue Distribution Segment (FIFO)
            </button>

            <button
              onClick={() => handleLiveAnswerSubmit(false)}
              className="w-full text-left p-4 bg-zinc-50 dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-800 rounded-xl transition-all text-sm cursor-pointer"
            >
              C) Binary Max-Heap Tree
            </button>

            <button
              onClick={() => handleLiveAnswerSubmit(false)}
              className="w-full text-left p-4 bg-zinc-50 dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-800 rounded-xl transition-all text-sm cursor-pointer"
            >
              D) Directed Acyclic Graph Node
            </button>
          </div>
        </div>
      )}
    </div>
  );
}