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
  // Global Shared App Infrastructure States
  const [user, setUser] = useState({
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
      blurb: "Master how kernels prioritize active process execution streams and turnaround times.",
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
      blurb: "Deconstructing active current distribution vectors and complex network topologies.",
      reading: [
        "Mesh analysis provides a procedural technique to determine unknown branch currents flowing across closed loop paths using fundamental planar circuit rules.",
        "Nodal analysis calculates relative node voltages by modeling current entrance and exit distributions applying Kirchhoff's Current Law boundaries explicitly."
      ],
      questions: [
        { id: "q2_1", question: "Mesh analysis is direct application of which fundamental electrical law?", options: ["Ohm's Law", "Kirchhoff's Current Law (KCL)", "Kirchhoff's Voltage Law (KVL)", "Norton's Theorem"], correctAnswer: 2 },
        { id: "q2_2", question: "In a circuit with 'n' independent nodes, how many essential nodal equations are required?", options: ["n", "n - 1", "n + 1", "2n"], correctAnswer: 1 }
      ]
    }
  ]);

  const [forumData] = useState([
    { 
      id: "1", 
      title: "How to reverse a doubly linked list?", 
      body: "I am having trouble swapping the next and prev pointers correctly without losing my node references.",
      author: "Sakshi Kumari (You)", 
      views: 42, 
      accepted: true,
      answers: [
        { id: "a1", body: "You need to maintain a temporary pointer to swap the links inside a simple while loop.", author: "Vaibhav", accepted: true },
        { id: "a2", body: "Don't forget to update the head pointer at the very end of your swap sequences!", author: "Shraddha", accepted: false }
      ]
    }
  ]);

  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Pass downstream state data parameters cleanly through component boundaries */}
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
