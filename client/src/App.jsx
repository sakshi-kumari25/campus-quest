import LMSEngine from './components/LMSEngine';
import QuizBattle from './components/QuizBattle';
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Learn from "./pages/Learn";
import Chapter from "./pages/Chapter";
import Forum from "./pages/Forum";
import QuestionDetail from "./pages/QuestionDetail";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/learn/:id" element={<Chapter />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/forum/:id" element={<QuestionDetail />} />
        <Route path="/lms" element={<LMSEngine />} />
        <Route path="/arena" element={<QuizBattle />} />
      </Route>
    </Routes>
  );
}
