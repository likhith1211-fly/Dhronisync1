import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Clock,
  Flame,
  Calendar,
  Sparkles,
  BookOpen,
  ArrowRight,
  RotateCcw,
  Target,
  BrainCircuit,
  CheckSquare,
  AlertCircle,
  GraduationCap,
  CalendarCheck,
  Bell,
  HelpCircle,
  Layers,
  Calculator,
  ChevronDown,
  ChevronUp,
  CalendarDays,
  Check,
  Compass,
  Info
} from 'lucide-react';
import { Subject, TopicProgress, UserProfile, ExamGoal } from '../types';
import { formatReadableDate, formatDate, logManualStudyDate, setStreakStartDate } from '../utils/storage';

interface DashboardViewProps {
  profile: UserProfile;
  activeSemester: 1 | 2;
  subjects: Subject[];
  progressMap: { [subtopicId: string]: TopicProgress };
  streakDays: number;
  dueRevisions: Array<{
    subtopicId: string;
    subtopicTitle: string;
    subjectName: string;
    moduleNumber: number;
    completedDate?: string;
  }>;
  examGoals: ExamGoal[];
  onNavigateToSyllabus: (subjectId?: string) => void;
  onNavigateToStudyMode: (subtopicId: string) => void;
  onNavigateToGemini: () => void;
  onNavigateToRevisions: () => void;
  onNavigateToExamPrep: () => void;
  onNavigateToTimetable: () => void;
  onNavigateToAnalytics: () => void;
  onRefreshStreak?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  profile,
  activeSemester,
  subjects,
  progressMap,
  streakDays,
  dueRevisions,
  examGoals,
  onNavigateToSyllabus,
  onNavigateToStudyMode,
  onNavigateToGemini,
  onNavigateToRevisions,
  onNavigateToExamPrep,
  onNavigateToTimetable,
  onNavigateToAnalytics,
  onRefreshStreak,
}) => {
  const currentSemesterSubjects = subjects.filter((s) => s.semester === activeSemester);

  // Overall calculations (100% student-controlled from ticks)
  let totalSubtopics = 0;
  let completedSubtopics = 0;
  let inProgressSubtopics = 0;

  currentSemesterSubjects.forEach((sub) => {
    sub.modules.forEach((m) => {
      m.topics.forEach((t) => {
        t.subtopics.forEach((st) => {
          totalSubtopics++;
          const p = progressMap[st.id];
          if (p?.status === 'completed') completedSubtopics++;
          if (p?.status === 'in_progress') inProgressSubtopics++;
        });
      });
    });
  });

  const overallPercent =
    totalSubtopics > 0 ? Math.round((completedSubtopics / totalSubtopics) * 100) : 0;

  // Upcoming assessment: check active semester goals
  const todayStr = formatDate(new Date());
  const sortedExams = [...examGoals]
    .filter((g) => g.semester === activeSemester)
    .sort((a, b) => (a.date || '').localeCompare(b.date || ''));

  const upcomingExam = sortedExams.find((g) => (g.date || '') >= todayStr) || sortedExams[0];

  const daysToExam = upcomingExam?.date
    ? Math.ceil(
        (new Date(upcomingExam.date + 'T00:00:00').getTime() - new Date().setHours(0, 0, 0, 0)) /
          (1000 * 60 * 60 * 24)
      )
    : null;

  // Active session timer & IST Clock
  const [sessionSeconds, setSessionSeconds] = useState<number>(0);
  const [istTimeString, setIstTimeString] = useState<string>('');
  const [showTutorials, setShowTutorials] = useState<boolean>(true);

  // Manual Streak Start Date State
  const [isSettingStreakDate, setIsSettingStreakDate] = useState<boolean>(false);
  const [customStreakDate, setCustomStreakDate] = useState<string>(todayStr);

  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Date().toLocaleTimeString('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        });
        setIstTimeString(timeStr);
      } catch (e) {
        setIstTimeString(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
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

  const handleManualStreakLog = () => {
    logManualStudyDate(todayStr);
    if (onRefreshStreak) onRefreshStreak();
  };

  const handleSaveStreakStartDate = () => {
    if (!customStreakDate) return;
    setStreakStartDate(customStreakDate);
    setIsSettingStreakDate(false);
    if (onRefreshStreak) onRefreshStreak();
  };

  // Recently completed topics
  const recentlyCompleted: Array<{
    subtopicId: string;
    subtopicTitle: string;
    subjectName: string;
    completedDate: string;
  }> = [];

  currentSemesterSubjects.forEach((s) => {
    s.modules.forEach((m) => {
      m.topics.forEach((t) => {
        t.subtopics.forEach((st) => {
          const p = progressMap[st.id];
          if (p?.status === 'completed' && p.completedDate) {
            recentlyCompleted.push({
              subtopicId: st.id,
              subtopicTitle: st.title,
              subjectName: s.shortName,
              completedDate: p.completedDate,
            });
          }
        });
      });
    });
  });

  recentlyCompleted.sort((a, b) => b.completedDate.localeCompare(a.completedDate));

  return (
    <div className="space-y-7">
      {/* Top Header & Context */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-indigo-600 font-bold text-xs uppercase tracking-wider mb-1.5">
            <GraduationCap className="w-4 h-4" />
            <span>Adichunchanagiri Institute of Technology (AIT) • VTU 2025–2026</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Academic Command Center
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            Semester {activeSemester} • Division: <strong>{profile.branch}</strong>. Student-directed syllabus mastery, automated spaced revision, and official schedules.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Assessment Date & Reminders Banner Button */}
          {upcomingExam && (
            <button
              onClick={onNavigateToExamPrep}
              className="px-4 py-2.5 bg-white border border-indigo-200 text-slate-800 rounded-2xl font-semibold shadow-xs hover:bg-indigo-50/60 transition-all text-xs flex items-center space-x-2.5 cursor-pointer group"
              title="Open Assessment Reminders to schedule dates and alerts"
            >
              <div className="w-7 h-7 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
                <CalendarCheck className="w-3.5 h-3.5" />
              </div>
              <div className="text-left">
                <div className="text-[10px] uppercase font-bold text-indigo-700 tracking-wider">
                  Assessment Schedule
                </div>
                <div className="text-xs font-bold text-slate-900">
                  {upcomingExam.title}:{' '}
                  <span className="text-amber-600 font-extrabold">
                    {daysToExam !== null ? (daysToExam >= 0 ? `${daysToExam}d left` : 'Completed') : 'Set Date'}
                  </span>
                  {' • '}
                  <span className="text-slate-500 font-medium">
                    Scheduled: {formatReadableDate(upcomingExam.date)}
                  </span>
                </div>
              </div>
            </button>
          )}

          {/* AI Tutor Launch */}
          <button
            onClick={onNavigateToGemini}
            className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100 text-xs flex items-center space-x-2 transition-all cursor-pointer"
          >
            <BrainCircuit className="w-4 h-4" />
            <span>Launch AI Tutor</span>
          </button>
        </div>
      </header>

      {/* Website Overview & Beginner Tutorial Section (Expandable/Toggleable) */}
      <section className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-[32px] p-6 sm:p-8 text-white shadow-xl shadow-indigo-950/20 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-800/80 pb-5">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/40 text-[11px] font-bold">
                Student & Teacher Orientation
              </span>
              <span className="text-xs text-indigo-300">• Beginner Guide</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              About VTU Engineering Academic Hub & How It Works
            </h2>
            <p className="text-xs sm:text-sm text-indigo-200 max-w-3xl leading-relaxed">
              Designed specifically for 1st Year Engineering students at AIT Chikkamagaluru across <strong>AI/ML, CSE-A, and CSE-B</strong> cohorts. All syllabus coverage percentages start strictly at 0% — filling and mastering is 100% in the hands of the student.
            </p>
          </div>

          <button
            onClick={() => setShowTutorials(!showTutorials)}
            className="px-4 py-2 rounded-xl bg-indigo-800 hover:bg-indigo-700 text-xs font-bold text-white flex items-center space-x-2 transition-colors cursor-pointer shrink-0 self-start sm:self-center"
          >
            <Info className="w-4 h-4 text-indigo-300" />
            <span>{showTutorials ? 'Collapse Tutorials' : 'Read Full Tutorial'}</span>
            {showTutorials ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {showTutorials && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-xs animate-in fade-in duration-300">
            {/* Tutorial Card 1: Syllabus Mastery */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-sm">1. Syllabus Completion Ticks</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Clicking any subtopic status button cycles through 3 clean states:
              </p>
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center space-x-2">
                  <span className="w-3.5 h-3.5 rounded-md bg-white border border-slate-300 shrink-0" />
                  <span className="text-slate-200"><strong>White (Pending):</strong> Unstudied topic (0% pre-filled).</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3.5 h-3.5 rounded-md bg-amber-400 shrink-0" />
                  <span className="text-slate-200"><strong>Yellow (Active):</strong> Currently preparing or practicing.</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3.5 h-3.5 rounded-md bg-emerald-500 shrink-0" />
                  <span className="text-slate-200"><strong>Green (Completed):</strong> Concept mastered & derivation solved.</span>
                </div>
              </div>
            </div>

            {/* Tutorial Card 2: VTU Revision Master */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
              <div className="flex items-center space-x-2 text-indigo-300 font-bold">
                <RotateCcw className="w-4 h-4 text-indigo-400" />
                <span className="text-sm">2. How VTU Revision Master Works</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                The moment you tick a topic <strong>Green (Completed)</strong>, Revision Master activates <strong>5-Stage Spaced Repetition</strong>:
              </p>
              <div className="bg-indigo-950/60 p-2.5 rounded-xl border border-indigo-800 text-[11px] text-indigo-200 space-y-1">
                <div>• <strong>Intervals:</strong> Day 1 → Day 3 → Day 7 → Day 14 → Day 30.</div>
                <div>• Prevents the forgetting curve before semester exams.</div>
                <div>• Topics due today appear on your dashboard with one-click revision tests.</div>
              </div>
            </div>

            {/* Tutorial Card 3: Assessment Reminders */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
              <div className="flex items-center space-x-2 text-amber-300 font-bold">
                <Bell className="w-4 h-4 text-amber-400" />
                <span className="text-sm">3. Assessment Dates & Reminders</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Switch to the new <strong>Assessment Reminders</strong> tab to set dates manually for IA-1, IA-2, SEE, or Lab tests:
              </p>
              <div className="bg-indigo-950/60 p-2.5 rounded-xl border border-indigo-800 text-[11px] text-indigo-200 space-y-1">
                <div>• <strong>Manual Dates:</strong> Enter scheduled date directly (student/teacher controlled).</div>
                <div>• <strong>Reminders:</strong> Turn alerts ON/OFF & set lead time (1, 3, 7 days before).</div>
                <div>• <strong>Readiness %:</strong> Automatically calculated from your syllabus ticks for that exam.</div>
              </div>
            </div>

            {/* Tutorial Card 4: Timetables for AI/ML, CSE-A & CSE-B */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
              <div className="flex items-center space-x-2 text-cyan-300 font-bold">
                <CalendarDays className="w-4 h-4 text-cyan-400" />
                <span className="text-sm">4. Multi-Branch Timetables</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Seamless schedules for all 3 first-year cohorts at AIT:
              </p>
              <div className="bg-indigo-950/60 p-2.5 rounded-xl border border-indigo-800 text-[11px] text-indigo-200 space-y-1">
                <div>• <strong>AI/ML:</strong> Room LH-01 (Mathematics, Physics, CAED).</div>
                <div>• <strong>CSE-A:</strong> Room LH-02 (Mathematics, Physics, Chemistry).</div>
                <div>• <strong>CSE-B:</strong> Room LH-03 with full lab batch assignments.</div>
              </div>
            </div>

            {/* Tutorial Card 5: CBCS Credits & SGPA */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
              <div className="flex items-center space-x-2 text-rose-300 font-bold">
                <Calculator className="w-4 h-4 text-rose-400" />
                <span className="text-sm">5. VTU 21 Credits & SGPA Calculator</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                1st Year Semester 1 comprises <strong>21 Total Credits</strong> under the CBCS Scheme:
              </p>
              <div className="bg-indigo-950/60 p-2.5 rounded-xl border border-indigo-800 text-[11px] text-indigo-200 space-y-1">
                <div>• 50% CIE (Continuous Internal Evaluation) + 50% SEE.</div>
                <div>• O (10), A+ (9), A (8), B+ (7) grade rubric.</div>
                <div>• Open the <strong>Analytics</strong> tab to calculate live SGPA.</div>
              </div>
            </div>

            {/* Tutorial Card 6: AI STEM Tutor */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
              <div className="flex items-center space-x-2 text-purple-300 font-bold">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-sm">6. AI Tutor with Clean Math Symbols</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                The Gemini AI Tutor provides step-by-step mathematical derivations with clear symbols:
              </p>
              <div className="bg-indigo-950/60 p-2.5 rounded-xl border border-indigo-800 text-[11px] text-indigo-200 space-y-1">
                <div>• Standard Unicode notation: θ, φ, λ, π, √, ∫, ∑, ∂, ², ³, ±.</div>
                <div>• Fully answers both in-syllabus and out-of-syllabus questions.</div>
                <div>• Explains C programming, engineering physics, and VTU scoring criteria.</div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Spaced Repetition Due Banner (If any) */}
      {dueRevisions.length > 0 && (
        <div className="p-5 rounded-[28px] bg-amber-50/90 border border-amber-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-amber-900">
                🔔 {dueRevisions.length} Spaced Repetition {dueRevisions.length === 1 ? 'Topic' : 'Topics'} Due Today!
              </h3>
              <p className="text-xs text-amber-700/90">
                Reviewing within scheduled intervals solidifies your memory retention for VTU exams.
              </p>
            </div>
          </div>
          <button
            onClick={onNavigateToRevisions}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer"
          >
            Review Due Topics Now →
          </button>
        </div>
      )}

      {/* 4 Sleek Metric Cards + Time & Streak Controller */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Syllabus Covered */}
        <div className="bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-3">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <p className="text-slate-500 font-medium text-xs">Total Syllabus Covered</p>
            <h3 className="text-3xl font-bold text-slate-900 tracking-tight mt-0.5">{overallPercent}%</h3>
          </div>
          <div className="flex items-center gap-2 text-blue-600 text-xs font-semibold pt-3 border-t border-slate-50 mt-3">
            <span className="bg-blue-50 px-2 py-0.5 rounded-md">
              {completedSubtopics} / {totalSubtopics}
            </span>
            <span className="text-[11px] text-slate-500">ticked by student</span>
          </div>
        </div>

        {/* Mastered Subtopics */}
        <div className="bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-3">
              <CheckSquare className="w-5 h-5" />
            </div>
            <p className="text-slate-500 font-medium text-xs">Mastered Topics (Green)</p>
            <h3 className="text-3xl font-bold text-slate-900 tracking-tight mt-0.5">{completedSubtopics}</h3>
          </div>
          <div className="flex items-center gap-2 text-emerald-600 text-xs font-semibold pt-3 border-t border-slate-50 mt-3">
            <span className="bg-emerald-50 px-2 py-0.5 rounded-md">Revision Master</span>
            <span className="text-[11px] text-slate-500">auto-scheduled</span>
          </div>
        </div>

        {/* Currently Studying (Yellow) */}
        <div className="bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-3">
              <Clock className="w-5 h-5" />
            </div>
            <p className="text-slate-500 font-medium text-xs">Currently Studying (Yellow)</p>
            <h3 className="text-3xl font-bold text-slate-900 tracking-tight mt-0.5">{inProgressSubtopics}</h3>
          </div>
          <div className="flex items-center gap-2 text-amber-600 text-xs font-semibold pt-3 border-t border-slate-50 mt-3">
            <span className="bg-amber-50 px-2 py-0.5 rounded-md">In Progress</span>
            <span className="text-[11px] text-slate-500">under review</span>
          </div>
        </div>

        {/* Study Streak & Manual Controller */}
        <div className="bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                <Flame className="w-5 h-5" />
              </div>
              <button
                onClick={() => setIsSettingStreakDate(!isSettingStreakDate)}
                className="text-[11px] text-indigo-600 font-bold hover:underline cursor-pointer"
              >
                {isSettingStreakDate ? 'Close' : 'Set Start Date'}
              </button>
            </div>
            <p className="text-slate-500 font-medium text-xs">Study Streak</p>
            <h3 className="text-3xl font-bold text-slate-900 tracking-tight mt-0.5">{streakDays} Days</h3>
          </div>

          {isSettingStreakDate ? (
            <div className="pt-2 border-t border-slate-100 mt-2 space-y-1.5">
              <input
                type="date"
                value={customStreakDate}
                onChange={(e) => setCustomStreakDate(e.target.value)}
                className="w-full text-xs px-2 py-1 border border-slate-200 rounded-lg"
              />
              <button
                onClick={handleSaveStreakStartDate}
                className="w-full py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold"
              >
                Save Start Date
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between pt-3 border-t border-slate-50 mt-3">
              <button
                onClick={handleManualStreakLog}
                className="text-xs text-purple-700 font-bold bg-purple-50 hover:bg-purple-100 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
              >
                + Log Today's Study
              </button>
              <span className="text-[10px] text-slate-400 font-semibold">Student-logged</span>
            </div>
          )}
        </div>
      </section>

      {/* Live Study Session & Indian Standard Time Bar */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2 text-slate-700">
          <Clock className="w-4 h-4 text-indigo-600" />
          <span>Active Study Time: <strong>{formattedSessionTime}</strong> (timer started on entering portal)</span>
        </div>
        <div className="flex items-center space-x-3 text-slate-500">
          <span>Indian Standard Time (IST / GMT+5:30): <strong className="text-slate-800">{istTimeString}</strong></span>
          <span>•</span>
          <span className="text-indigo-600 font-semibold cursor-pointer hover:underline" onClick={onNavigateToAnalytics}>
            View Detailed CBCS Credits & SGPA →
          </span>
        </div>
      </div>

      {/* Subject-Wise Progress Cards */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Semester {activeSemester} Syllabus Courses</h2>
            <p className="text-xs text-slate-500">Click any subject to mark topics completed, active, or pending</p>
          </div>
          <button
            onClick={() => onNavigateToSyllabus()}
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center space-x-1 cursor-pointer"
          >
            <span>View Full Syllabus</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentSemesterSubjects.map((sub) => {
            let subTotal = 0;
            let subDone = 0;
            sub.modules.forEach((m) => {
              m.topics.forEach((t) => {
                t.subtopics.forEach((st) => {
                  subTotal++;
                  if (progressMap[st.id]?.status === 'completed') subDone++;
                });
              });
            });

            const percent = subTotal > 0 ? Math.round((subDone / subTotal) * 100) : 0;

            return (
              <div
                key={sub.id}
                onClick={() => onNavigateToSyllabus(sub.id)}
                className="group bg-white rounded-[28px] border border-slate-100 shadow-sm hover:border-indigo-200 hover:shadow-md transition-all p-6 space-y-4 cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1.5">
                    <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-xl border border-indigo-100">
                      {sub.code}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {sub.shortName}
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-xl">
                    {percent}%
                  </span>
                </div>

                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 transition-all rounded-full group-hover:bg-indigo-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                  <span>
                    {subDone} of {subTotal} Subtopics Done
                  </span>
                  <span className="text-indigo-600 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center space-x-1">
                    <span>Explore Modules</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2-Column: Recent Verified Activity & VTU Priority Highlights */}
      <section className="grid grid-cols-12 gap-6 items-stretch">
        {/* Left: Recent Activity Log */}
        <div className="col-span-12 lg:col-span-7 bg-white rounded-[32px] border border-slate-100 shadow-sm p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Student Progress Log</h2>
                <p className="text-xs text-slate-500">Verified completed subtopics and spaced revision queue</p>
              </div>
              <span
                onClick={() => onNavigateToSyllabus()}
                className="text-sm text-indigo-600 font-semibold cursor-pointer hover:underline"
              >
                Go to Syllabus
              </span>
            </div>

            {recentlyCompleted.length === 0 ? (
              <div className="text-center py-10 text-xs sm:text-sm text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200 p-6">
                No completed topics recorded yet. Open the syllabus and check off topics as you finish them!
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {recentlyCompleted.slice(0, 4).map((item) => (
                  <div
                    key={item.subtopicId}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100/80 hover:bg-slate-100/60 transition-colors"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-9 h-9 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center font-bold text-xs shrink-0">
                        ✓
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{item.subtopicTitle}</p>
                        <p className="text-xs text-slate-500">
                          {item.subjectName} • Mastered on {formatReadableDate(item.completedDate)}
                        </p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
                      MASTERED
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Quick Links & Timetable Preview */}
        <div className="col-span-12 lg:col-span-5 bg-indigo-900 rounded-[32px] p-6 sm:p-8 text-white flex flex-col justify-between shadow-xl shadow-indigo-950/20">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold">AIT Timetables & Plans</h2>
              <span className="text-xs bg-indigo-800 text-indigo-200 font-bold px-2.5 py-1 rounded-full border border-indigo-700">
                AI/ML, CSE-A & B
              </span>
            </div>
            <p className="text-indigo-200 text-xs sm:text-sm">
              Current cohort: <strong>{profile.branch}</strong>. View lecture periods, practical lab slots, faculty in charge, and room assignments.
            </p>

            <div className="mt-6 space-y-3">
              <div className="p-3.5 rounded-2xl bg-indigo-800/60 border border-indigo-700/80 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">Full Weekly Class Schedule</p>
                  <p className="text-[11px] text-indigo-300">Mon–Sat • 9:00 AM to 5:00 PM</p>
                </div>
                <button
                  onClick={onNavigateToTimetable}
                  className="px-3.5 py-1.5 bg-white text-indigo-900 rounded-xl font-bold text-xs hover:bg-slate-100 transition-colors shrink-0 cursor-pointer"
                >
                  View Timetable
                </button>
              </div>

              <div className="p-3.5 rounded-2xl bg-indigo-800/60 border border-indigo-700/80 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">Assessment Reminders Tab</p>
                  <p className="text-[11px] text-indigo-300">Set IA-1, IA-2, SEE dates & alert lead time</p>
                </div>
                <button
                  onClick={onNavigateToExamPrep}
                  className="px-3.5 py-1.5 bg-amber-400 text-amber-950 rounded-xl font-bold text-xs hover:bg-amber-300 transition-colors shrink-0 cursor-pointer"
                >
                  Reminders
                </button>
              </div>

              <div className="p-3.5 rounded-2xl bg-indigo-800/60 border border-indigo-700/80 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">VTU CBCS Credit Matrix</p>
                  <p className="text-[11px] text-indigo-300">21 Credits • SGPA Calculator</p>
                </div>
                <button
                  onClick={onNavigateToAnalytics}
                  className="px-3.5 py-1.5 bg-white text-indigo-900 rounded-xl font-bold text-xs hover:bg-slate-100 transition-colors shrink-0 cursor-pointer"
                >
                  Analytics
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-indigo-800/50 p-4 rounded-2xl border border-indigo-700">
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-300 mb-1">
              Active Retention Rule
            </p>
            <p className="text-xs text-indigo-200 leading-relaxed mb-3">
              Practicing VTU derivations on paper without looking at solutions boosts memory retention by 3x.
            </p>
            <button
              onClick={onNavigateToGemini}
              className="w-full py-2.5 bg-white text-indigo-900 rounded-xl font-bold text-xs hover:bg-slate-100 transition-all cursor-pointer"
            >
              Generate Practice Problems with AI Tutor
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
