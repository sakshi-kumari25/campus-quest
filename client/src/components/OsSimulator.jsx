import React, { useState } from 'react';
import { Cpu } from 'lucide-react';

export default function OsSimulator() {
  const [burstTimes, setBurstTimes] = useState("6,8,3");
  const [osResult, setOsResult] = useState(null);

  const runOsSimulation = () => {
    const arr = burstTimes.split(',').map(num => parseInt(num.trim()) || 0);
    let waitingTime = 0;
    let totalWaiting = 0;
    const tracking = [];
    
    arr.forEach((bt, idx) => {
      tracking.push({ process: `P${idx+1}`, burst: bt, wait: waitingTime });
      totalWaiting += waitingTime;
      waitingTime += bt;
    });
    
    setOsResult({
      steps: tracking,
      avgWait: (totalWaiting / arr.length).toFixed(2)
    });
  };

  return (
    <div className="space-y-4 bg-zinc-50 dark:bg-zinc-950 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
      <div className="text-xs font-semibold text-zinc-500 text-left">Enter Process Burst Times (comma-separated):</div>
      <div className="flex gap-2">
        <input 
          type="text" 
          value={burstTimes} 
          onChange={(e) => setBurstTimes(e.target.value)}
          className="flex-1 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 px-3 py-2 rounded-lg text-sm font-mono text-zinc-900 dark:text-white focus:outline-none"
        />
        <button onClick={runOsSimulation} className="bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer">
          <Cpu className="w-3.5 h-3.5" /> Compute Gantt
        </button>
      </div>
      {osResult && (
        <div className="mt-4 space-y-3 animate-in text-left">
          <div className="flex flex-wrap gap-2">
            {osResult.steps.map((p, i) => (
              <div key={i} className="flex flex-col border border-violet-200 dark:border-violet-900 rounded-lg overflow-hidden font-mono text-xs min-w-[70px] bg-white dark:bg-zinc-900">
                <div className="bg-violet-100 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 font-bold p-1.5 text-center">{p.process}</div>
                <div className="p-1.5 text-center text-zinc-500">Wait: {p.wait}s</div>
              </div>
            ))}
          </div>
          <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">🚀 Average Waiting Time: {osResult.avgWait} ms</div>
        </div>
      )}
    </div>
  );
}