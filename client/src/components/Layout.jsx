import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  GraduationCap,
  MessageSquare,
  Video,
  Swords,
  Sun,
  Moon,
  LogIn,
  LogOut,
  UserPlus,
  X,
  Mail,
  Lock,
  ShieldCheck,
  Menu
} from 'lucide-react';

// FIXED: Assigned completely unique visual anchors to prevent layout path blocks
const links = [
  { to: '/', label: 'HQ', icon: LayoutDashboard, end: true },
  { to: '/learn', label: 'Learn', icon: GraduationCap },
  { to: '/forum', label: 'Study Help', icon: MessageSquare },
  { to: '/lms', label: 'Video Classes', icon: Video },
  { to: '/arena', label: 'Quiz Arena', icon: Swords },
];

export default function Layout() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });

  // Authentication management states
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [authModal, setAuthModal] = useState(null);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Fallback state trackers to protect downstream custom hooks if undefined
  const [toast, setToast] = useState(null);
  const [celebration, setCelebration] = useState(null);

  // Apply theme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Handle login and signup
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (!authEmail.trim() || !authPassword.trim()) {
      alert('Please enter valid credentials.');
      return;
    }
    setIsAuthenticating(true);

    // Demo authentication delay
    setTimeout(() => {
      setIsLoggedIn(true);
      setAuthModal(null);
      setIsAuthenticating(false);
      setAuthEmail('');
      setAuthPassword('');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-zinc-900 dark:text-slate-100 font-sans transition-colors duration-300 flex flex-col">

      {/* GLOBAL HEADER NAVBAR */}
      <header className="sticky top-0 z-50 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

          {/* APP BRANDING */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center font-bold text-white shadow-md shadow-violet-500/20">
              CQ
            </div>
            <div className="flex flex-col text-left">
              <span className="font-extrabold text-sm tracking-tight block bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent select-none">
                Campus Quest
              </span>
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500 block">
                Learn. Help. Level up.
              </span>
            </div>
          </Link>

          {/* NAVIGATION LINKS (DESKTOP) */}
          <nav className="hidden md:flex items-center gap-2">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = link.end
                ? location.pathname === link.to
                : location.pathname.startsWith(link.to);

              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 transform hover:scale-105 active:scale-95 origin-center ${
                    isActive
                      ? 'bg-zinc-200/60 dark:bg-zinc-800 text-violet-600 dark:text-violet-400 shadow-sm'
                      : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-slate-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/40'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT ACTION BAR */}
          <div className="flex items-center gap-3">
            {/* THEME SWITCH */}
            <button
              type="button"
              onClick={() => setDarkMode((prev) => !prev)}
              aria-label="Toggle theme"
              className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all shadow-sm cursor-pointer"
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-amber-500" />
              ) : (
                <Moon className="w-4 h-4 text-violet-600" />
              )}
            </button>

            {/* LOGIN / LOGOUT CONTROLS */}
            {isLoggedIn ? (
              <button
                onClick={() => setIsLoggedIn(false)}
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs font-bold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" /> Log Out
              </button>
            ) : (
              <button
                onClick={() => setAuthModal('login')}
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 text-white text-xs font-bold hover:bg-violet-700 transition-all shadow-sm cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" /> Sign In
              </button>
            )}

            {/* MOBILE MENU TOGGLE */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* MOBILE NAVIGATION DROPDOWN */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-3 space-y-1">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </div>
        )}
      </header>

      {/* DYNAMIC CHILD PAGE CONTENT */}
      <main className="max-w-7xl mx-auto w-full px-4 py-6 flex-1">
        <Outlet />
      </main>

      {/* TOAST SYSTEM ACCENTS */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-[60] max-w-sm rounded-2xl border px-4 py-3 text-sm shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-200 ${
            toast.type === "error"
              ? "border-rose-400/30 bg-rose-950 text-rose-100"
              : "border-emerald-400/30 bg-emerald-950 text-emerald-100"
          }`}
        >
          {toast.text}
        </div>
      )}
    </div>
  );
}
