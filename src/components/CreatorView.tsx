import React from 'react';
import {
  User,
  GraduationCap,
  Building2,
  Code2,
  Sparkles,
  CalendarDays,
  Layers,
  Bot,
  ShieldCheck,
  Award,
  ArrowRight,
  MapPin,
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import { ActiveTab } from './Sidebar';

interface CreatorViewProps {
  onNavigateTab: (tab: ActiveTab) => void;
}

export const CreatorView: React.FC<CreatorViewProps> = ({ onNavigateTab }) => {
  return (
    <div className="space-y-6">
      {/* Creator Profile Header Card */}
      <div className="bg-white border border-slate-200/80 rounded-[28px] p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-slate-100 pb-6">
          <div className="flex items-start sm:items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-indigo-100 shrink-0">
              L
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">
                  Student Contributor
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Likhith.M.H
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 flex items-center space-x-1.5">
                <Building2 className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Adichunchanagiri Institute of Technology (AIT), Chikkamagaluru</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onNavigateTab('syllabus')}
              className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
              <span>Explore Syllabus</span>
            </button>
            <button
              onClick={() => onNavigateTab('timetable')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors shadow-md shadow-indigo-100 cursor-pointer"
            >
              <CalendarDays className="w-3.5 h-3.5" />
              <span>View Timetable</span>
            </button>
          </div>
        </div>

        {/* Academic Details Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 text-xs">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Institution</span>
            <span className="text-sm font-bold text-slate-800 mt-0.5 block">AIT Chikkamagaluru</span>
            <span className="text-[11px] text-slate-500">Autonomous Engineering College</span>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Curriculum Scheme</span>
            <span className="text-sm font-bold text-indigo-700 mt-0.5 block">VTU 2025–2026 Scheme</span>
            <span className="text-[11px] text-slate-500">1st Year B.E. Degree Program</span>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Target Branches</span>
            <span className="text-sm font-bold text-slate-800 mt-0.5 block">AI/ML, CSE-A & CSE-B</span>
            <span className="text-[11px] text-slate-500">Strictly focused division cohorts</span>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Academic Focus</span>
            <span className="text-sm font-bold text-emerald-700 mt-0.5 block">Academic Mastery & IA Prep</span>
            <span className="text-[11px] text-slate-500">CIE Tests (IA-1, IA-2) & SEE</span>
          </div>
        </div>
      </div>

      {/* About the Creator & Mission */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-[28px] p-6 sm:p-7 shadow-sm space-y-5">
          <div className="flex items-center space-x-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
            <Code2 className="w-4 h-4" />
            <span>About The Creator & Purpose</span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <p>
              This portal was conceived and engineered by <strong className="text-slate-900 font-bold">Likhith.M.H</strong>, a dedicated engineering student at <strong className="text-slate-900 font-semibold">Adichunchanagiri Institute of Technology (AIT)</strong>, Chikkamagaluru.
            </p>
            <p>
              With the rollout of the updated <strong className="text-indigo-700 font-semibold">VTU 2025–2026 academic scheme</strong>, first-year students in computing fields face rigorous new course outcomes, specialized lab requirements, and tight internal assessment schedules across <strong className="text-slate-800 font-semibold">Artificial Intelligence & Machine Learning (AI/ML)</strong> and <strong className="text-slate-800 font-semibold">Computer Science & Engineering (Sections A & B)</strong>.
            </p>
            <p>
              To eliminate the confusion of fragmented PDFs and scattered schedules, Likhith designed this unified portal to provide:
            </p>

            <div className="space-y-2.5 pt-1">
              <div className="flex items-start space-x-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">Accurate Scheme Digitization</h4>
                  <p className="text-slate-500 text-xs mt-0.5">
                    Every module, topic, subtopic, and credit distribution of Mathematics, Physics, C Programming, and Engineering Mechanics is mapped verbatim to the official syllabus.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">Official College Schedules & Faculty Directory</h4>
                  <p className="text-slate-500 text-xs mt-0.5">
                    Direct integration of the official timetable for AIT Chikkamagaluru—covering Lecture Halls LH-03, LH-01, and LH-02, period intervals, tea/lunch breaks, and instructor phone contacts.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">Dual Progress Verification</h4>
                  <p className="text-slate-500 text-xs mt-0.5">
                    Separate tracking for what the teacher has completed in class versus what the student has self-studied, accompanied by manual date logs and high-visibility green completion indicators.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">Curriculum & Beyond-Syllabus AI Intelligence</h4>
                  <p className="text-slate-500 text-xs mt-0.5">
                    Powered by Gemini AI to solve calculus derivations, explain memory models, and resolve out-of-syllabus questions on modern deep learning, quantum computing, and advanced data structures.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Summary Card */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200/80 rounded-[28px] p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>Creator Credentials</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="text-slate-400 font-semibold block text-[10px] uppercase tracking-wider">Creator</span>
                <span className="font-bold text-slate-900 text-sm">Likhith.M.H</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="text-slate-400 font-semibold block text-[10px] uppercase tracking-wider">Department</span>
                <span className="font-bold text-slate-900">Engineering & Computer Sciences</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="text-slate-400 font-semibold block text-[10px] uppercase tracking-wider">College</span>
                <span className="font-bold text-slate-900">Adichunchanagiri Institute of Technology</span>
                <span className="text-slate-500 block text-[11px]">Chikkamagaluru, Karnataka</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="text-slate-400 font-semibold block text-[10px] uppercase tracking-wider">University</span>
                <span className="font-bold text-slate-900">Visvesvaraya Technological University (VTU)</span>
              </div>
            </div>
          </div>

          <div className="bg-indigo-50 border border-indigo-100 rounded-[28px] p-6 space-y-3 text-xs">
            <div className="flex items-center space-x-2 text-indigo-900 font-bold">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Vision for Peers</span>
            </div>
            <p className="text-indigo-950/80 leading-relaxed font-medium">
              "Every engineering concept becomes intuitive with systematic practice, clear schedules, and immediate doubt resolution. Use this portal daily to achieve top marks in your internal assessments and semester exams."
            </p>
            <div className="pt-2 text-indigo-800 font-bold text-[11px]">
              — Likhith.M.H
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
