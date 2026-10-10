import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../api";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [badgeCatalog, setBadgeCatalog] = useState([]);
  const [completedQuizzes, setCompletedQuizzes] = useState({});
  const [celebration, setCelebration] = useState(null);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);

  async function refreshMe() {
    const data = await api.me();
    setUser(data.user);
    setBadgeCatalog(data.badgeCatalog);
    setCompletedQuizzes(data.completedQuizzes || {});
  }

  useEffect(() => {
    refreshMe()
      .catch((err) => setToast({ type: "error", text: err.message }))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2800);
    return () => clearTimeout(t);
  }, [toast]);

  const value = useMemo(
    () => ({
      user,
      setUser,
      badgeCatalog,
      completedQuizzes,
      setCompletedQuizzes,
      celebration,
      setCelebration,
      toast,
      setToast,
      loading,
      refreshMe,
    }),
    [user, badgeCatalog, completedQuizzes, celebration, toast, loading]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
