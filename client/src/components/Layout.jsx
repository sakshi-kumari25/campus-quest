import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Celebration from './Celebration';
import {
  LayoutDashboard,
  GraduationCap,
  MessageSquare,
  Sun,
  Moon,
  LogIn,
  LogOut,
  UserPlus,
  X,
  Mail,
  Lock,
  ShieldCheck
} from 'lucide-react';

const links = [
  { to: '/', label: 'HQ', icon: LayoutDashboard, end: true },
  { to: '/learn', label: 'Learn', icon: GraduationCap },
  { to: '/forum', label: 'Study Help', icon: MessageSquare },
  { to: '/lms', label: 'Video Classes', icon: GraduationCap },
  { to: '/arena', label: 'Quiz Arena', icon: GraduationCap },
];

export default function Layout() {
  const location = useLocation();
  const { celebration, setCelebration, toast } = useApp();

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
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-zinc-900 dark:text-slate-100 font-sans transition-colors duration-300">

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

          {/* NAVIGATION LINKS */}
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
              className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-amber-500" />
              ) : (
                <Moon className="w-4 h-4 text-violet-600" />
              )}
            </button>

            {/* LOGIN / LOGOUT CONTROLS */}
            {!isLoggedIn ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setAuthModal('login')}
                  className="px-3 py-1.5 border border-zinc-300 dark:border-zinc-700 rounded-xl text-xs font-bold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all flex items-center gap-1 cursor-pointer"
                >
                  <LogIn size={12} />
                  Log In
                </button>

                <button
                  type="button"
                  onClick={() => setAuthModal('signup')}
                  className="px-3 py-1.5 bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-1 cursor-pointer"
                >
                  <UserPlus size={12} />
                  Sign Up
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-md shadow-violet-500/20 select-none">
                  SK
                </div>

                <button
                  type="button"
                  onClick={() => setIsLoggedIn(false)}
                  aria-label="Log out"
                  title="Log out"
                  className="p-2 text-zinc-400 hover:text-red-500 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all cursor-pointer"
                >
                  <LogOut size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* LOGIN / SIGNUP MODAL */}
      {authModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setAuthModal(null);
            }
          }}
        >
          <div className="w-full max-w-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden transition-colors duration-300">

            {/* CLOSE BUTTON */}
            <button
              type="button"
              onClick={() => setAuthModal(null)}
              aria-label="Close modal"
              className="absolute top-4 right-4 p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* MODAL HEADER */}
            <div className="text-center mb-6 mt-2">
              <div className="w-12 h-12 bg-violet-500/10 rounded-2xl flex items-center justify-center text-violet-500 mx-auto mb-3">
                <ShieldCheck className="w-6 h-6 animate-pulse" />
              </div>

              <h3 className="text-xl font-black text-zinc-950 dark:text-white">
                {authModal === 'login'
                  ? 'Welcome Back'
                  : 'Create Account'}
              </h3>

              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                Access your campus portal dashboard metrics instantly.
              </p>
            </div>

            {/* AUTHENTICATION FORM */}
            <form onSubmit={handleAuthSubmit} className="space-y-4">

              {/* EMAIL FIELD */}
              <div className="text-left">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block mb-1">
                  Email Address
                </label>

                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 w-4 h-4 text-zinc-400" />

                  <input
                    type="email"
                    required
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    placeholder="student@aktu.ac.in"
                    autoComplete="email"
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 pl-10 pr-4 py-2.5 rounded-xl text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>
              </div>

              {/* PASSWORD FIELD */}
              <div className="text-left">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block mb-1">
                  Password
                </label>

                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 w-4 h-4 text-zinc-400" />

                  <input
                    type="password"
                    required
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete={
                      authModal === 'login'
                        ? 'current-password'
                        : 'new-password'
                    }
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 pl-10 pr-4 py-2.5 rounded-xl text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={isAuthenticating}
                className="w-full py-3 bg-violet-600 hover:bg-violet-700 disabled:bg-zinc-400 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-violet-950/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isAuthenticating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Please wait...
                  </>
                ) : authModal === 'login' ? (
                  'Secure Log In'
                ) : (
                  'Register Account'
                )}
              </button>
            </form>

            {/* SWITCH BETWEEN LOGIN AND SIGNUP */}
            <div className="mt-5 pt-3 border-t border-zinc-100 dark:border-zinc-800 text-center text-xs">
              {authModal === 'login' ? (
                <p className="text-zinc-500 dark:text-zinc-400">
                  New to Campus Quest?{' '}
                  <button
                    type="button"
                    onClick={() => setAuthModal('signup')}
                    className="text-violet-600 dark:text-violet-400 font-bold hover:underline cursor-pointer"
                  >
                    Sign up free
                  </button>
                </p>
              ) : (
                <p className="text-zinc-500 dark:text-zinc-400">
                  Already a verified student?{' '}
                  <button
                    type="button"
                    onClick={() => setAuthModal('login')}
                    className="text-violet-600 dark:text-violet-400 font-bold hover:underline cursor-pointer"
                  >
                    Log in
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* DYNAMIC CHILD PAGE CONTENT */}
      <main className="max-w-7xl mx-auto w-full px-4 py-6">
        <Outlet />
      </main>

      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-[60] max-w-sm rounded-2xl border px-4 py-3 text-sm shadow-xl ${
            toast.type === "error"
              ? "border-rose-400/30 bg-rose-950 text-rose-100"
              : "border-emerald-400/30 bg-emerald-950 text-emerald-100"
          }`}
        >
          {toast.text}
        </div>
      )}

      {celebration && (
        <Celebration data={celebration} onClose={() => setCelebration(null)} />
      )}
    </div>
  );
}