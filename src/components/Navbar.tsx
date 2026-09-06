import React, { useState, useEffect } from 'react';
import { Flame, Sparkles, GraduationCap, Clock } from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  profile: UserProfile;
  activeSemester: 1 | 2;
  onSelectSemester: (sem: 1 | 2) => void;
  streakDays: number;
  dueRevisionsCount: number;
  onOpenRevisions: () => void;
  onOpenGemini: () => void;
  onOpenProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  activeSemester,
  onSelectSemester,
  streakDays,
  dueRevisionsCount,
  onOpenRevisions,
  onOpenGemini,
  onOpenProfile,
}) => {
  const displayName = profile.name && profile.name.trim() !== '' ? profile.name : 'Student';
  const initial = profile.name && profile.name.trim() !== '' ? profile.name.charAt(0).toUpperCase() : 'S';

  // Live IST (GMT+5:30) Time and Session Study Timer
  const [istTime, setIstTime] = useState<string>('');
  const [sessionSeconds, setSessionSeconds] = useState<number>(0);

  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Date().toLocaleTimeString('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        });
        setIstTime(timeStr);
      } catch (e) {
        setIstTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      }
    };

    updateTime();
    const interval = setInterval(() => {
      updateTime();
      setSessionSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const sessionMinutes = Math.floor(sessionSeconds / 60);
  const formattedSessionTime =
    sessionMinutes < 60
      ? `${sessionMinutes} ${sessionMinutes === 1 ? 'min' : 'mins'}`
      : `${Math.floor(sessionMinutes / 60)}h ${sessionMinutes % 60}m`;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 text-slate-800 shadow-xs">
      {/* Desktop & Tablet Layout (sm and up) */}
      <div className="hidden sm:flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 items-center justify-between">
        {/* Brand & VTU Identity */}
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-100">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg tracking-tight text-slate-900">VTU Engineering</span>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-semibold border border-indigo-100">
                2025–2026 Scheme
              </span>
            </div>
            <p className="text-xs text-slate-500">AIT Chikkamagaluru • CSE-A, CSE-B & AI/ML</p>
          </div>
        </div>

        {/* Semester Selector Pill */}
        <div className="flex items-center bg-slate-100/90 p-1 rounded-2xl border border-slate-200/80">
          <button
            id="btn-semester-1-desktop"
            onClick={() => onSelectSemester(1)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
              activeSemester === 1
                ? 'bg-white text-indigo-600 shadow-sm border border-slate-200/60 font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Semester 1
          </button>
          <button
            id="btn-semester-2-desktop"
            onClick={() => onSelectSemester(2)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
              activeSemester === 2
                ? 'bg-white text-indigo-600 shadow-sm border border-slate-200/60 font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Semester 2
          </button>
        </div>

        {/* Quick Actions, Stats & Live Timer */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Live IST Time & Active Session Timer */}
          <div
            className="flex items-center space-x-2 bg-slate-50 border border-slate-200/90 px-3 py-1.5 rounded-xl text-slate-700 text-xs font-medium"
            title="Indian Standard Time (IST / GMT+5:30) and active study duration"
          >
            <Clock className="w-3.5 h-3.5 text-indigo-600" />
            <span className="font-semibold text-slate-900">{formattedSessionTime}</span>
            <span className="text-slate-300">|</span>
            <span className="text-[11px] text-slate-500">IST {istTime}</span>
          </div>

          {/* Study Streak */}
          <div
            className="flex items-center space-x-1.5 bg-amber-50 border border-amber-200/80 px-3 py-1.5 rounded-xl text-amber-700 text-xs font-semibold"
            title="Current Daily Study Streak"
          >
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>{streakDays}d Streak</span>
          </div>

          {/* Gemini AI Trigger Button */}
          <button
            id="btn-nav-gemini-ai"
            onClick={onOpenGemini}
            className="hidden md:flex items-center space-x-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-2xl text-xs font-semibold transition-all shadow-md shadow-indigo-100 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
            <span>Ask AI Tutor</span>
          </button>

          {/* Profile Card Trigger */}
          <button
            id="btn-profile-trigger-desktop"
            onClick={onOpenProfile}
            className="flex items-center space-x-2.5 pl-2 border-l border-slate-200 text-left hover:opacity-90 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center text-xs font-bold text-indigo-600 shadow-2xs">
              {initial}
            </div>
            <div className="hidden lg:block">
              <p className="text-xs font-bold text-slate-900 leading-tight">
                {profile.name && profile.name.trim() !== '' ? profile.name : 'Student Portal'}
              </p>
              <p className="text-[11px] text-slate-500">{profile.branch} • Sem {activeSemester}</p>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Dedicated Layout (< sm screens, completely framed & responsive) */}
      <div className="sm:hidden px-3.5 py-2.5 space-y-2.5">
        {/* Mobile Row 1: Brand, Streak & Student Profile Details */}
        <div className="flex items-center justify-between gap-2">
          {/* Brand */}
          <div className="flex items-center space-x-2 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-100 shrink-0">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-sm text-slate-900 tracking-tight truncate">VTU Hub</span>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100 shrink-0">
                  25–26
                </span>
              </div>
              <p className="text-[10px] text-slate-500 truncate">AIT Chikkamagaluru</p>
            </div>
          </div>

          {/* Right items: Streak & Student Details */}
          <div className="flex items-center space-x-2 shrink-0">
            {/* Streak */}
            <div
              className="flex items-center space-x-1 bg-amber-50 border border-amber-200/90 px-2.5 py-1 rounded-xl text-amber-700 text-xs font-bold shrink-0"
              title="Current Daily Study Streak"
            >
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{streakDays}d</span>
            </div>

            {/* Student Details Button */}
            <button
              id="btn-profile-trigger-mobile"
              onClick={onOpenProfile}
              className="flex items-center space-x-1.5 pl-1.5 pr-2.5 py-1 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200/90 text-left transition-colors cursor-pointer shrink-0"
              title="Click to view/edit student details"
            >
              <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold shadow-2xs shrink-0">
                {initial}
              </div>
              <div className="flex flex-col text-left leading-none">
                <span className="text-[11px] font-bold text-slate-800 max-w-[70px] truncate">
                  {displayName.split(' ')[0]}
                </span>
                <span className="text-[9px] font-semibold text-indigo-600">
                  {profile.branch}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Row 2: Semester 1 & Semester 2 Selector + Live Study Timer */}
        <div className="flex items-center justify-between gap-2 pt-0.5">
          {/* Semester Selector Pill spanning comfortably */}
          <div className="flex-1 grid grid-cols-2 bg-slate-100/90 p-0.5 rounded-xl border border-slate-200/90">
            <button
              id="btn-semester-1-mobile"
              onClick={() => onSelectSemester(1)}
              className={`py-1.5 text-xs font-bold rounded-lg transition-all text-center cursor-pointer ${
                activeSemester === 1
                  ? 'bg-white text-indigo-600 shadow-xs border border-slate-200/60'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Semester 1
            </button>
            <button
              id="btn-semester-2-mobile"
              onClick={() => onSelectSemester(2)}
              className={`py-1.5 text-xs font-bold rounded-lg transition-all text-center cursor-pointer ${
                activeSemester === 2
                  ? 'bg-white text-indigo-600 shadow-xs border border-slate-200/60'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Semester 2
            </button>
          </div>

          {/* Live Mobile Timer */}
          <div
            className="flex items-center space-x-1 bg-slate-50 border border-slate-200/90 px-2.5 py-1.5 rounded-xl text-slate-600 text-[10px] font-medium shrink-0"
            title="Active study session duration & IST"
          >
            <Clock className="w-3 h-3 text-indigo-600" />
            <span className="font-bold text-slate-800">{formattedSessionTime}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
