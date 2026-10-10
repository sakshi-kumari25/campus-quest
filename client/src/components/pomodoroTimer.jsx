import React, { useState, useEffect } from 'react';
import { Clock, Play, Pause, RotateCcw } from 'lucide-react';

export default function PomodoroTimer({ setUserXP }) {
  const [timeLeft, setTimeLeft] = useState(1500); // 25 Minutes standard length
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      if (typeof setUserXP === 'function') {
        setUserXP(prev => prev + 5);
      }
      alert("⏱️ Focus Session Complete! +5 XP points added to your score profile.");
      setTimeLeft(1500);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft, setUserXP]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl shadow-xs text-left transition-colors duration-300">
      <div className="flex items-center gap-2 mb-3">
        <Clock className="w-4 h-4 text-violet-500" />
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Pomodoro Focus Timer</h4>
      </div>
      <div className="text-3xl font-black font-mono tracking-tight text-zinc-950 dark:text-white mb-4 bg-zinc-50 dark:bg-zinc-950/60 py-3 rounded-xl border border-zinc-100 dark:border-zinc-800 text-center transition-colors">
        {formatTime(timeLeft)}
      </div>
      <div className="flex gap-2 justify-center">
        <button 
          onClick={() => setIsTimerRunning(!isTimerRunning)} 
          className={`px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-all ${
            isTimerRunning ? 'bg-amber-600 hover:bg-amber-500 text-white' : 'bg-violet-600 hover:bg-violet-500 text-white'
          }`}
        >
          {isTimerRunning ? <Pause size={12} /> : <Play size={12} />} {isTimerRunning ? 'Pause' : 'Start'}
        </button>
        <button 
          onClick={() => { setIsTimerRunning(false); setTimeLeft(1500); }} 
          className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-bold rounded-lg border border-zinc-200 dark:border-zinc-700 cursor-pointer transition-all"
        >
          <RotateCcw size={12} />
        </button>
      </div>
    </div>
  );
}