import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import PomodoroTimer from './PomodoroTimer';
import OsSimulator from './OsSimulator';
import ThermoCalculator from './ThermoCalculator';
import LabDiscussion from './LabDiscussion';

export default function LMSEngine({ userXP = 250, setUserXP }) {
  const [completedTopics, setCompletedTopics] = useState([]);
  const [currentComment, setCurrentComment] = useState('');
  const [comments, setComments] = useState({
    os_cse: [
      { text: "The CPU scheduling visual calculator made FCFS so easy to understand!", user: "Alex", time: "2 hours ago" },
      { text: "What happens if two processes arrive at the exact same millisecond?", user: "Sam", time: "1 hour ago" }
    ],
    thermo_me: [
      { text: "The efficiency calculator layout is brilliant.", user: "Rahul", time: "Yesterday" }
    ]
  });
  
  const subjects = [
    { id: 'os_cse', name: 'Operating Systems (CSE)', topic: 'CPU Scheduling Algorithm Simulator', type: 'simulator-os', progress: 75 },
    { id: 'thermo_me', name: 'Thermodynamics (ME)', topic: 'Carnot Cycle Efficiency Calculator', type: 'simulator-thermo', progress: 40 },
    { id: 'maths_ee', name: 'Engineering Maths (EE/ECE)', topic: 'Linear System Matrix Solver Matrix', type: 'simulator-maths', progress: 90 }
  ];

  const [activeTopic, setActiveTopic] = useState(subjects[0]);

  const claimTopicXP = (topicId) => {
    if (completedTopics.includes(topicId)) {
      alert("🔒 XP already claimed for this track!");
      return;
    }
    setCompletedTopics([...completedTopics, topicId]);
    if (typeof setUserXP === 'function') {
      setUserXP(prev => prev + 30);
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!currentComment.trim()) return;
    const topicComments = comments[activeTopic.id] || [];
    setComments({
      ...comments,
      [activeTopic.id]: [...topicComments, { text: currentComment, user: 'You', time: 'Just now' }]
    });
    setCurrentComment('');
  };

  return (
    <div className="p-6 bg-slate-50 dark:bg-zinc-950 text-zinc-900 dark:text-slate-100 min-h-screen font-sans max-w-7xl mx-auto transition-colors duration-300 animate-in">
      
      {/* Brand Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4 gap-2 transition-colors duration-300">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-zinc-950 dark:text-white">CampusQuest Labs</h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Interactive B.Tech Playgrounds & Architecture Suites</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-2 rounded-xl flex items-center gap-2 transition-colors duration-300">
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Lab Score:</span>
          <span className="text-sm font-bold text-violet-600 dark:text-violet-400 font-mono">⚡ {userXP} XP</span>
        </div>
      </div>
      
      {/* Navigation Tabs */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {subjects.map((sub) => (
          <div 
            key={sub.id} 
            onClick={() => setActiveTopic(sub)}
            className={`p-4 rounded-xl border text-left cursor-pointer transition-all duration-300 bg-white dark:bg-zinc-900 ${
              activeTopic.id === sub.id 
                ? 'border-violet-500 shadow-md ring-1 ring-violet-500/20 transform -translate-y-0.5' 
                : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
            }`}
          >
            <div className="flex justify-between mb-2 text-sm font-semibold">
              <span className={activeTopic.id === sub.id ? 'text-violet-600 dark:text-violet-400' : 'text-zinc-500 dark:text-zinc-400'}>{sub.name}</span>
              <span className="text-zinc-400 font-mono text-xs">{sub.progress}%</span>
            </div>
            <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-violet-600 h-full transition-all duration-500" style={{ width: `${sub.progress}%` }}></div>
            </div>
          </div>
        ))}
      </div>

      {/* SPLIT LAYOUT GRID */}
      <div className="grid gap-6 lg:grid-cols-3">
        
        {/* LEFT COLUMN: INTERACTIVE WORKBENCH SANDBOX */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between transition-colors duration-300">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-violet-500" />
              <span className="text-xs uppercase font-mono tracking-widest text-violet-600 dark:text-violet-400 font-bold block">Interactive Laboratory Sandbox</span>
            </div>
            <h2 className="text-xl font-bold mb-6 text-zinc-950 dark:text-slate-100">{activeTopic.topic}</h2>
            
            {activeTopic.type === 'simulator-os' && <OsSimulator />}
            {activeTopic.type === 'simulator-thermo' && <ThermoCalculator />}
            {activeTopic.type === 'simulator-maths' && (
              <div className="space-y-2 bg-zinc-50 dark:bg-zinc-950 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 font-mono text-xs text-left transition-colors duration-300">
                <p className="font-sans text-zinc-500 mb-2">Linear System Mesh Solver Matrix Formulation:</p>
                <p className="whitespace-pre">{"[ 4 -1  0 ] [ x1 ]\n[-1  4 -1 ] [ x2 ] =\n[ 0 -1  4 ] [ x3 ]"}</p>
                <p className="text-emerald-600 dark:text-emerald-400 font-bold mt-2">✓ Calculated Roots: x1=3.43, x2=1.71, x3=1.43</p>
              </div>
            )}
          </div>
          
          <button 
            onClick={() => claimTopicXP(activeTopic.id)}
            className={`w-full mt-6 py-3.5 font-bold rounded-xl transition-all text-sm tracking-wide cursor-pointer ${
              completedTopics.includes(activeTopic.id) 
                ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 border border-zinc-200 dark:border-zinc-700 shadow-none cursor-not-allowed' 
                : 'bg-violet-600 hover:bg-violet-700 text-white shadow-violet-900/20'
            }`}
          >
            {completedTopics.includes(activeTopic.id) ? '✓ Lab Challenge Score Claimed' : '🎁 Complete Lab Run & Claim +30 XP'}
          </button>
        </div>

        {/* RIGHT SIDEBAR PANEL COLUMN */}
        <div className="space-y-6 flex flex-col">
          <PomodoroTimer setUserXP={setUserXP} />
          
          <LabDiscussion 
            comments={comments}
            activeTopicId={activeTopic.id}
            currentComment={currentComment}
            setCurrentComment={setCurrentComment}
            onAddComment={handleAddComment}
          />
        </div>

      </div>
    </div>
  );
}