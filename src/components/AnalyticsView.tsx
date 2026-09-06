import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Award,
  CheckCircle2,
  Clock,
  RotateCcw,
  GraduationCap,
  Calculator,
  Info,
  CalendarCheck,
  Check
} from 'lucide-react';
import { Subject, TopicProgress, UserProfile } from '../types';
import {
  VTU_FIRST_YEAR_COURSES,
  VTU_GRADE_POINTS,
  TOTAL_VTU_SEMESTER_CREDITS,
  calculateSGPA
} from '../utils/storage';

interface AnalyticsViewProps {
  subjects: Subject[];
  activeSemester: 1 | 2;
  progressMap: { [subtopicId: string]: TopicProgress };
  streakDays: number;
  profile: UserProfile;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  subjects,
  activeSemester,
  progressMap,
  streakDays,
  profile,
}) => {
  const currentSemesterSubjects = subjects.filter((s) => s.semester === activeSemester);

  let totalMinutesStudied = 0;
  let totalCompleted = 0;
  let totalSubtopics = 0;

  currentSemesterSubjects.forEach((sub) => {
    sub.modules.forEach((m) => {
      m.topics.forEach((t) => {
        t.subtopics.forEach((st) => {
          totalSubtopics++;
          const p = progressMap[st.id];
          if (p?.status === 'completed') totalCompleted++;
          totalMinutesStudied += p?.timeSpentMinutes || 0;
        });
      });
    });
  });

  const overallPercent =
    totalSubtopics > 0 ? Math.round((totalCompleted / totalSubtopics) * 100) : 0;
  const hoursStudied = Math.floor(totalMinutesStudied / 60);
  const remainingMinutes = totalMinutesStudied % 60;

  // Interactive CBCS SGPA Predictor State
  const [courseGrades, setCourseGrades] = useState<Record<string, string>>({
    '1BMATS101': 'A+',
    '1BPHYS102': 'A+',
    '1BCEDS103': 'A',
    '1BESC104A': 'A',
    '1BEIT105': 'O',
    '1BSKS106': 'O',
    '1BPOPL107': 'O',
    '1BIDTL158': 'A+',
    '1BKSK/BK109': 'O',
  });

  const sgpaItems = VTU_FIRST_YEAR_COURSES.map((c) => {
    const gradeKey = courseGrades[c.code] || 'A+';
    const point = VTU_GRADE_POINTS[gradeKey]?.points ?? 9;
    return { credits: c.credits, points: point };
  });

  const currentPredictedSGPA = calculateSGPA(sgpaItems);

  // Calculate real credits unlocked based on completed syllabus topics
  const completedSubjectCredits = currentSemesterSubjects.reduce((acc, sub) => {
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
    const subCourse = VTU_FIRST_YEAR_COURSES.find((c) => c.code === sub.code);
    const subCredits = subCourse ? subCourse.credits : 4;
    const proportion = subTotal > 0 ? subDone / subTotal : 0;
    return acc + proportion * subCredits;
  }, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200/80 rounded-[28px] p-6 sm:p-7 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Performance & Insights
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Academic Analytics & Study Velocity</h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mt-1 leading-relaxed">
            Objective metrics on syllabus coverage, learning pace, and VTU CBCS credit mastery for {profile.name || 'Student'}.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <div className="bg-slate-50 px-5 py-3 rounded-2xl border border-slate-200/80 text-center">
            <div className="text-xl font-bold text-indigo-600">{hoursStudied}h {remainingMinutes}m</div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Time Logged</div>
          </div>
          <div className="bg-slate-50 px-5 py-3 rounded-2xl border border-slate-200/80 text-center">
            <div className="text-xl font-bold text-amber-600">{streakDays} Days</div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Active Streak</div>
          </div>
        </div>
      </div>

      {/* Functional VTU CBCS Credit & SGPA Calculator */}
      <div className="bg-white border border-slate-200/80 rounded-[28px] p-6 sm:p-7 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center space-x-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1">
              <Calculator className="w-4 h-4" />
              <span>VTU 2025–2026 CBCS Credit Matrix</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">SGPA & Credit Point Calculator</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
              1st Year Semester 1 encompasses <strong>{TOTAL_VTU_SEMESTER_CREDITS} Credits</strong>. Adjust expected course letter grades below to calculate real-time VTU SGPA.
            </p>
          </div>

          <div className="flex items-center space-x-4 shrink-0 bg-indigo-50/80 border border-indigo-100 px-5 py-3.5 rounded-2xl">
            <div>
              <div className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">Predicted SGPA</div>
              <div className="text-3xl font-extrabold text-indigo-900 tracking-tight">{currentPredictedSGPA} <span className="text-sm font-semibold text-indigo-600">/ 10.0</span></div>
            </div>
            <div className="border-l border-indigo-200 pl-4">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Syllabus Unlocked</div>
              <div className="text-lg font-bold text-slate-800">{completedSubjectCredits.toFixed(1)} / {TOTAL_VTU_SEMESTER_CREDITS} Cr</div>
            </div>
          </div>
        </div>

        {/* 9 VTU Courses Grid with live grade selector */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {VTU_FIRST_YEAR_COURSES.map((course) => {
            const currentGrade = courseGrades[course.code] || 'A+';
            const gradeInfo = VTU_GRADE_POINTS[currentGrade];

            return (
              <div
                key={course.code}
                className="p-4 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:border-indigo-200 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                      {course.code}
                    </span>
                    <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                      {course.credits} Credits
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{course.title}</h4>
                  <div className="text-[11px] text-slate-500 mt-0.5 flex items-center space-x-2">
                    <span>{course.type}</span>
                    <span>•</span>
                    <span>CIE 50 + SEE 50</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                  <div className="text-xs">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Grade Point</span>
                    <span className="font-bold text-slate-800">{gradeInfo?.points ?? 0} pts</span>
                  </div>

                  <select
                    value={currentGrade}
                    onChange={(e) =>
                      setCourseGrades((prev) => ({ ...prev, [course.code]: e.target.value }))
                    }
                    className="text-xs font-bold px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  >
                    {Object.keys(VTU_GRADE_POINTS).map((g) => (
                      <option key={g} value={g}>
                        {g} ({VTU_GRADE_POINTS[g].points} pts)
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Subject-Wise Completion Progress */}
      <div className="bg-white border border-slate-200/80 rounded-[28px] p-6 sm:p-7 space-y-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-indigo-600" />
            <span>Subject Syllabus Completion (Semester {activeSemester})</span>
          </h3>
          <span className="text-xs text-slate-400 font-semibold">Ticked manually by student/teacher</span>
        </div>

        <div className="space-y-4">
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

            const pct = subTotal > 0 ? Math.round((subDone / subTotal) * 100) : 0;

            return (
              <div key={sub.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-indigo-600 font-bold">{sub.code}</span>
                    <span className="font-bold text-slate-800">{sub.name}</span>
                  </div>
                  <span className="font-bold text-slate-700">
                    {pct}% ({subDone}/{subTotal} subtopics)
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 transition-all duration-500 rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2-Column: VTU Grading Reference & Student Academic Health Audit */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* VTU Grading System Reference */}
        <div className="bg-white border border-slate-200/80 rounded-[28px] p-6 space-y-3 shadow-sm">
          <div className="flex items-center space-x-2 text-slate-900 font-bold text-base">
            <GraduationCap className="w-5 h-5 text-indigo-600" />
            <span>VTU CBCS Credit & Grading Rubric</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            VTU evaluates courses with a 50% CIE (Continuous Internal Evaluation) + 50% SEE (Semester End Exam) formula. Passing requires minimum 40% in SEE and 40% overall.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="text-emerald-700 font-bold">O Grade (10 Points)</div>
              <div className="text-[11px] text-slate-500">90% to 100% Marks</div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="text-indigo-700 font-bold">A+ Grade (9 Points)</div>
              <div className="text-[11px] text-slate-500">80% to 89% Marks</div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="text-blue-700 font-bold">A Grade (8 Points)</div>
              <div className="text-[11px] text-slate-500">70% to 79% Marks</div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="text-amber-800 font-bold">B+ Grade (7 Points)</div>
              <div className="text-[11px] text-slate-500">60% to 69% Marks</div>
            </div>
          </div>
        </div>

        {/* Academic Study Health & Consistency (Replaced "Likki's Engineering Study Health") */}
        <div className="bg-white border border-slate-200/80 rounded-[28px] p-6 space-y-3 shadow-sm">
          <div className="flex items-center space-x-2 text-slate-900 font-bold text-base">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
            <span>Academic Study Health & Consistency</span>
          </div>

          <div className="space-y-3 pt-1 text-xs">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-slate-600 font-medium">Daily Study Regularity</span>
              <span className="text-emerald-700 font-bold">
                {streakDays > 0 ? `🔥 Active (${streakDays}d Streak)` : '🗓️ Not started yet'}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-slate-600 font-medium">Retention Mechanism</span>
              <span className="text-indigo-700 font-bold">5-Stage Spaced Repetition Active</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-slate-600 font-medium">Syllabus Pacing</span>
              <span className="text-slate-800 font-bold">
                {overallPercent === 0
                  ? 'Ready to begin'
                  : overallPercent > 40
                  ? 'Ahead of Schedule'
                  : 'In Progress'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
