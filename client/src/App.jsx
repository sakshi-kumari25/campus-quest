import React, { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Learn from "./pages/Learn";
import Chapter from "./pages/Chapter";
import Forum from "./pages/Forum";
import QuestionDetail from "./pages/QuestionDetail";
import LMSEngine from './components/LMSEngine';
import QuizBattle from './components/QuizBattle';

export default function App() {
  const [user] = useState({
    name: "Sakshi Kumari (You)",
    xp: 250,
    level: 3,
    streak: 12,
    badges: ["first-spark", "week-warrior", "century-club", "scholar"]
  });

  const [badgeCatalog] = useState([
    { id: "first-spark", name: "First Spark" },
    { id: "week-warrior", name: "Week Warrior" },
    { id: "century-club", name: "Century Club" },
    { id: "scholar", name: "Scholar" },
    { id: "campus-legend", name: "Campus Legend" },
    { id: "campus-hero", name: "Campus Hero" }
  ]);

  const [leaderboardData] = useState([
    { id: "u5", name: "Shraddha", major: "B.Tech × Electronics & Comm.", xp: 512, weeklyXp: 140, streak: 18, avatar: "SR", accent: "#fbbf24", badges: ["first-spark", "week-warrior", "century-club", "scholar", "campus-legend"] },
    { id: "u2", name: "Vaibhav", major: "B.Tech × Mechanical Engineering", xp: 410, weeklyXp: 124, streak: 9, avatar: "VB", accent: "#a78bfa", badges: ["first-spark", "week-warrior", "century-club", "scholar"] },
    { id: "u1", name: "Sakshi Kumari (You)", major: "B.Tech × Computer Science", xp: 250, weeklyXp: 96, streak: 12, avatar: "SK", accent: "#22d3ee", badges: ["first-spark", "week-warrior", "century-club", "scholar"] },
    { id: "u3", name: "Rabindra", major: "B.Tech × Electrical Engineering", xp: 355, weeklyXp: 101, streak: 21, avatar: "RB", accent: "#f472b6", badges: ["first-spark", "week-warrior", "century-club", "campus-hero"] },
    { id: "u04", name: "Shashi", major: "B.Tech × Civil Engineering", xp: 198, weeklyXp: 72, streak: 4, avatar: "SS", accent: "#34d399", badges: ["first-spark", "century-club"] }
  ]);

  const [chaptersData] = useState([
    { 
      id: "1", 
      title: "CPU Scheduling Algorithms & Core Concurrency", 
      subject: "OPERATING SYSTEMS (CSE)",
      accent: "#22d3ee",
      blurb: "Master how kernels prioritize active process execution streams, calculate turnaround metrics, and handle multithreading cycles.",
      reading: [
        "CPU scheduling is the process by which the operating system decides which process will execute on the CPU while another process is on hold.",
        "The primary metrics utilized to analyze scheduling performance profiles include Turnaround Time, Waiting Time, Response Time, and total system Throughput efficiency patterns."
      ],
      questions: [
        { id: "q1_1", question: "Which CPU scheduling algorithm can result in the 'convoy effect'?", options: ["First-Come, First-Served (FCFS)", "Round Robin", "Shortest Job First (SJF)", "Priority Scheduling"], correctAnswer: 0 },
        { id: "q1_2", question: "What metric measures the total elapsed time from process submission to its complete termination?", options: ["Waiting Time", "Response Time", "Turnaround Time", "Throughput"], correctAnswer: 2 }
      ]
    },
    { 
      id: "2", 
      title: "Mesh Analysis, Nodal Laws, & Circuit Network Theorems", 
      subject: "NETWORK THEORY (EE/ECE)",
      accent: "#a78bfa",
      blurb: "Deconstructing active current distribution vectors, impedance tracking parameters, and complex bridge loops.",
      reading: [
        "Mesh analysis provides a procedural technique to determine unknown branch currents flowing across closed loop paths using fundamental planar circuit rules.",
        "Nodal analysis calculates relative node voltages by modeling current entrance and exit distributions applying Kirchhoff's Current Law boundaries explicitly."
      ],
      questions: [
        { id: "q2_1", question: "Mesh analysis is direct application of which fundamental electrical law?", options: ["Ohm's Law", "Kirchhoff's Current Law (KCL)", "Kirchhoff's Voltage Law (KVL)", "Norton's Theorem"], correctAnswer: 2 },
        { id: "q2_2", question: "In a circuit with 'n' independent nodes, how many essential nodal equations are required?", options: ["n", "n - 1", "n + 1", "2n"], correctAnswer: 1 }
      ]
    },
    {
      id: "3",
      title: "Laws of Thermodynamics & Closed-Loop Energy Cycles",
      subject: "THERMODYNAMICS (ME)",
      accent: "#f59e0b",
      blurb: "An intuitive deep dive into energy preservation transformations, entropy thresholds, and cyclic heat engine work metrics.",
      reading: [
        "Thermodynamics deconstructs energy transformations, heat transfers, and mechanical work systems within isolated and closed thermodynamic boundary envelopes.",
        "Entropy maps structural disorder parameters across expanding macro-states, enforcing directional work thresholds."
      ],
      questions: [
        { id: "q3_1", question: "Which thermodynamic framework states that entropy of an isolated system always increases over time?", options: ["Zeroth Law", "First Law", "Second Law", "Third Law"], correctAnswer: 2 }
      ]
    },
    {
      id: "4",
      title: "Stress-Strain Dynamics & Structural Mechanics",
      subject: "MECHANICS OF SOLIDS (CE)",
      accent: "#10b981",
      blurb: "Mastering internal load distribution mechanics, shear force vectors, bending moments, and structural load metrics.",
      reading: [
        "Structural solid mechanics analyze internal vector distributions, compression deformation profiles, and torque deflection thresholds when materials encounter static loads.",
        "Strain maps material length extension percentages against baseline natural state indicators."
      ],
      questions: [
        { id: "q4_1", question: "What is the ratio of lateral strain to linear axial strain within elastic limits called?", options: ["Modulus of Elasticity", "Poisson's Ratio", "Bulk Modulus", "Shear Modulus"], correctAnswer: 1 }
      ]
    }
  ]);

  // PERFECTLY MATCHING YOUR EXACT CORE DISCUSSION TOPICS MATRIX
  const [forumData] = useState([
    { 
      id: "forum_1", 
      title: "Why is ΔU zero for isothermal expansion of an ideal gas?", 
      body: "Stuck on the first-law write-up. If the gas does work, where does that energy come from if internal energy does not change?",
      author: "Vaibhav", 
      subject: "THERMODYNAMICS",
      bounty: 30,
      timeLabel: "2d ago",
      views: 24, 
      accepted: false,
      answers: []
    },
    { 
      id: "forum_2", 
      title: "SJF vs Round Robin: when does starvation actually happen?", 
      body: "I get that SJF picks the shortest ready job, but I am not sure how a stream of short jobs can starve a long one in a real lab scheduler. Looking for a walkthrough with a tiny Gantt-chart example.",
      author: "Sakshi Kumari (You)", 
      subject: "OPERATING SYSTEMS",
      bounty: 40,
      timeLabel: "3d ago",
      views: 57, 
      accepted: true,
      answers: [
        { id: "ans_1", body: "If new short processes keep entering the ready queue continuously, the scheduler will repeatedly pick them over the long process, indefinitely postponing its execution. This is starvation.", author: "Shraddha", accepted: true }
      ]
    }
  ]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard user={user} badgeCatalog={badgeCatalog} leaderboard={leaderboardData} />} />
        <Route path="/learn" element={<Learn chapters={chaptersData} />} />
        <Route path="/learn/:id" element={<Chapter chapters={chaptersData} />} />
        <Route path="/forum" element={<Forum questions={forumData} />} />
        <Route path="/forum/:id" element={<QuestionDetail questions={forumData} />} />
        <Route path="/lms" element={<LMSEngine />} />
        <Route path="/arena" element={<QuizBattle />} />
      </Route>
    </Routes>
  );
}
