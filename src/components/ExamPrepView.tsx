import React, { useState } from 'react';
import {
  Target,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Clock,
  Sparkles,
  BookOpen,
  ArrowRight,
  Flame,
  Award,
  Bell,
  BellRing,
  Plus,
  Edit2,
  Check,
  X,
  CalendarCheck,
  ShieldCheck,
  Info
} from 'lucide-react';
import { Subject, ExamGoal, TopicProgress } from '../types';
import { formatReadableDate, formatDate } from '../utils/storage';

interface ExamPrepViewProps {
  subjects: Subject[];
  activeSemester: 1 | 2;
  examGoals: ExamGoal[];
  progressMap: { [subtopicId: string]: TopicProgress };
  onOpenStudyMode: (subtopicId: string) => void;
  onAskGeminiStrategy: (examTitle: string, subjectName: string) => void;
  onUpdateExamGoals?: (goals: ExamGoal[]) => void;
}

export const ExamPrepView: React.FC<ExamPrepViewProps> = ({
  subjects,
  activeSemester,
  examGoals,
  progressMap,
  onOpenStudyMode,
  onAskGeminiStrategy,
  onUpdateExamGoals,
}) => {
  const currentSemesterExams = examGoals.filter((e) => e.semester === activeSemester);
  const [selectedExamId, setSelectedExamId] = useState<string>(
    currentSemesterExams[0]?.id || ''
  );

  const activeExam =
    currentSemesterExams.find((e) => e.id === selectedExamId) || currentSemesterExams[0];

  const currentSemesterSubjects = subjects.filter((s) => s.semester === activeSemester);

  // Editing state for active assessment date & reminder
  const [isEditingDate, setIsEditingDate] = useState<boolean>(false);
  const [editDateValue, setEditDateValue] = useState<string>(activeExam?.date || formatDate(new Date()));
  const [editReminderEnabled, setEditReminderEnabled] = useState<boolean>(activeExam?.isReminderSet ?? true);
  const [editReminderDays, setEditReminderDays] = useState<number>(activeExam?.reminderDaysBefore || 3);
  const [editNotes, setEditNotes] = useState<string>(activeExam?.notes || '');

  // Add New Assessment Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newDate, setNewDate] = useState<string>(formatDate(new Date()));
  const [newType, setNewType] = useState<'IA-1' | 'IA-2' | 'SEE' | 'Lab Internals' | 'Model Exam' | 'Assignment' | 'Custom'>('IA-1');
  const [newNotes, setNewNotes] = useState<string>('');

  // Keep edit states in sync when activeExam changes
  React.useEffect(() => {
    if (activeExam) {
      setEditDateValue(activeExam.date || formatDate(new Date()));
      setEditReminderEnabled(activeExam.isReminderSet ?? true);
      setEditReminderDays(activeExam.reminderDaysBefore || 3);
      setEditNotes(activeExam.notes || '');
      setIsEditingDate(false);
    }
  }, [activeExam?.id]);

  const handleSaveAssessmentSettings = () => {
    if (!activeExam) return;
    const updatedGoals = examGoals.map((g) => {
      if (g.id === activeExam.id) {
        return {
          ...g,
          date: editDateValue,
          scheduledDate: editDateValue,
          isReminderSet: editReminderEnabled,
          reminderDaysBefore: editReminderDays,
          notes: editNotes,
        };
      }
      return g;
    });
    if (onUpdateExamGoals) {
      onUpdateExamGoals(updatedGoals);
    }
    setIsEditingDate(false);
  };

  const handleAddNewAssessment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newGoal: ExamGoal = {
      id: `custom-exam-${Date.now()}`,
      title: newTitle.trim(),
      date: newDate,
      scheduledDate: newDate,
      semester: activeSemester,
      type: newType,
      isReminderSet: true,
      reminderDaysBefore: 3,
      notes: newNotes.trim(),
      subjectModules: {
        '1BMATS101': newType === 'IA-1' ? [1, 2] : newType === 'IA-2' ? [3, 4] : [1, 2, 3, 4, 5],
        '1BPHYS102': newType === 'IA-1' ? [1, 2] : newType === 'IA-2' ? [3, 4] : [1, 2, 3, 4, 5],
        '1BEIT105': newType === 'IA-1' ? [1, 2] : newType === 'IA-2' ? [3, 4] : [1, 2, 3, 4, 5],
        '1BCEDS103': newType === 'IA-1' ? [1, 2] : newType === 'IA-2' ? [3, 4] : [1, 2, 3, 4, 5],
        '1BESC104A': newType === 'IA-1' ? [1, 2] : newType === 'IA-2' ? [3, 4] : [1, 2, 3, 4, 5],
      },
    };

    const updated = [...examGoals, newGoal];
    if (onUpdateExamGoals) {
      onUpdateExamGoals(updated);
    }
    setSelectedExamId(newGoal.id);
    setIsAddModalOpen(false);
    setNewTitle('');
    setNewNotes('');
  };

  // Compute readiness for active exam based on selected modules
  const examSubjects = currentSemesterSubjects.filter((s) => {
    const rawTarget = (activeExam as any)?.targetSubjects;
    if (rawTarget && Array.isArray(rawTarget)) {
      return rawTarget.includes(s.id);
    }
    return true;
  });

  let targetSubtopicsCount = 0;
  let targetCompletedCount = 0;
  const highPriorityPending: Array<{
    subtopicId: string;
    subtopicTitle: string;
    subjectName: string;
    importance: string;
  }> = [];

  examSubjects.forEach((sub) => {
    const specifiedModules =
      activeExam?.subjectModules?.[sub.id] ||
      activeExam?.subjectModules?.[sub.code];

    const targetModules = specifiedModules
      ? sub.modules.filter((m) => specifiedModules.includes(m.moduleNumber))
      : activeExam?.type === 'IA-1'
      ? sub.modules.slice(0, 2)
      : activeExam?.type === 'IA-2'
      ? sub.modules.slice(2, 4)
      : sub.modules;

    targetModules.forEach((m) => {
      m.topics.forEach((t) => {
        t.subtopics.forEach((st) => {
          targetSubtopicsCount++;
          const p = progressMap[st.id];
          if (p?.status === 'completed') {
            targetCompletedCount++;
          } else {
            if (st.importance === 'Essential' || st.importance === 'High') {
              highPriorityPending.push({
                subtopicId: st.id,
                subtopicTitle: st.title,
                subjectName: sub.shortName,
                importance: st.importance,
              });
            }
          }
        });
      });
    });
  });

  const readinessPercent =
    targetSubtopicsCount > 0 ? Math.round((targetCompletedCount / targetSubtopicsCount) * 100) : 0;

  const examDateObj = activeExam?.date ? new Date(activeExam.date + 'T00:00:00') : new Date();
  const todayObj = new Date();
  todayObj.setHours(0, 0, 0, 0);

  const daysRemaining = Math.ceil(
    (examDateObj.getTime() - todayObj.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200/80 rounded-[28px] p-6 sm:p-7 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div>
          <div className="flex items-center space-x-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1">
            <CalendarCheck className="w-4 h-4" />
            <span>VTU Assessment Command Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Assessment Dates & Reminder Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mt-1 leading-relaxed">
            Schedule official Internal Assessments (IA-1, IA-2), SEE, or custom test dates. Readiness % is calculated live from syllabus completion ticks.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-md shadow-indigo-100 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Assessment Date</span>
          </button>
        </div>
      </div>

      {/* Assessment Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        {currentSemesterExams.map((exam) => (
          <button
            key={exam.id}
            onClick={() => {
              setSelectedExamId(exam.id);
              setIsEditingDate(false);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-2 ${
              activeExam?.id === exam.id
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>{exam.title}</span>
            {exam.isReminderSet && (
              <Bell className={`w-3 h-3 ${activeExam?.id === exam.id ? 'text-white' : 'text-indigo-600'}`} />
            )}
          </button>
        ))}
      </div>

      {activeExam && (
        <>
          {/* Main Assessment Focus Card */}
          <div className="bg-white border border-slate-200/80 rounded-[32px] p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-bold">
                    {activeExam.type || 'Assessment'}
                  </span>

                  {/* Scheduled Date Pill */}
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold flex items-center space-x-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>Scheduled on: <strong>{formatReadableDate(activeExam.date)}</strong></span>
                  </span>

                  {activeExam.isReminderSet ? (
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold flex items-center space-x-1">
                      <BellRing className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Reminder Active ({activeExam.reminderDaysBefore || 3}d before)</span>
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-slate-50 text-slate-500 border border-slate-200 text-xs font-semibold">
                      Reminder Off
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-3">
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">{activeExam.title}</h2>
                  <button
                    onClick={() => setIsEditingDate(!isEditingDate)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-100 transition-colors cursor-pointer"
                    title="Change Assessment Date or Reminders"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-slate-500 max-w-xl leading-relaxed">
                  {activeExam.notes ||
                    (activeExam.type === 'IA-1'
                      ? 'Targeting Modules 1 and 2 across all core subjects. VTU IAs carry 50 marks of CIE (Continuous Internal Evaluation).'
                      : activeExam.type === 'IA-2'
                      ? 'Targeting Modules 3 and 4 across all core subjects. Maximize scores to secure your CIE average.'
                      : 'Semester End Examination (SEE) testing all 5 modules. Requires 40% minimum in SEE and 40% in total.')}
                </p>
              </div>

              {/* Countdown & Readiness Gauge */}
              <div className="flex items-center space-x-6 bg-slate-50 p-5 rounded-2xl border border-slate-200/80 shrink-0">
                <div className="text-center">
                  <div className={`text-3xl font-black ${daysRemaining < 7 ? 'text-rose-600' : 'text-slate-800'}`}>
                    {daysRemaining >= 0 ? daysRemaining : 'Passed'}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                    {daysRemaining >= 0 ? 'Days Left' : 'Completed'}
                  </div>
                </div>
                <div className="h-10 w-[1px] bg-slate-200" />
                <div className="text-center">
                  <div className="text-3xl font-black text-indigo-600">{readinessPercent}%</div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                    Readiness
                  </div>
                </div>
              </div>
            </div>

            {/* Date & Reminder Editor Drawer (Collapsible) */}
            {isEditingDate && (
              <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-indigo-100 pb-2.5">
                  <div className="flex items-center space-x-2 text-indigo-900 font-bold text-xs">
                    <CalendarCheck className="w-4 h-4 text-indigo-600" />
                    <span>Set Custom Assessment Date & Reminders</span>
                  </div>
                  <button
                    onClick={() => setIsEditingDate(false)}
                    className="text-xs text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  {/* Date Input */}
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Scheduled Assessment Date
                    </label>
                    <input
                      type="date"
                      value={editDateValue}
                      onChange={(e) => setEditDateValue(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  {/* Reminder Toggle */}
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Reminder Notification
                    </label>
                    <select
                      value={editReminderEnabled ? 'enabled' : 'disabled'}
                      onChange={(e) => setEditReminderEnabled(e.target.value === 'enabled')}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                    >
                      <option value="enabled">🔔 Reminder Alert: Active</option>
                      <option value="disabled">🔕 Reminder: Off</option>
                    </select>
                  </div>

                  {/* Days Before Alert */}
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Alert Timing
                    </label>
                    <select
                      value={editReminderDays}
                      onChange={(e) => setEditReminderDays(Number(e.target.value))}
                      disabled={!editReminderEnabled}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer disabled:opacity-50"
                    >
                      <option value={1}>1 Day Before</option>
                      <option value={2}>2 Days Before</option>
                      <option value={3}>3 Days Before (Recommended)</option>
                      <option value={5}>5 Days Before</option>
                      <option value={7}>1 Week Before</option>
                      <option value={14}>2 Weeks Before</option>
                    </select>
                  </div>
                </div>

                {/* Notes Input */}
                <div className="text-xs">
                  <label className="font-bold text-slate-700 block mb-1">
                    Assessment Instructions / Syllabus Scope
                  </label>
                  <input
                    type="text"
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    placeholder="e.g. Modules 1 & 2 only, brings scientific calculators, LH-03"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex items-center justify-end space-x-2 pt-2">
                  <button
                    onClick={() => setIsEditingDate(false)}
                    className="px-4 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveAssessmentSettings}
                    className="px-4 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 shadow-xs cursor-pointer flex items-center space-x-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Save Date & Reminders</span>
                  </button>
                </div>
              </div>
            )}

            {/* Target Syllabus Completion Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-600">Target Syllabus Completion (Auto-calculated from ticks)</span>
                <span className="text-indigo-600 font-bold">
                  {targetCompletedCount} of {targetSubtopicsCount} subtopics mastered
                </span>
              </div>
              <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600 transition-all duration-500 rounded-full"
                  style={{ width: `${readinessPercent}%` }}
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-2 text-xs text-slate-600">
                <Flame className="w-4 h-4 text-amber-500" />
                <span>
                  {readinessPercent >= 75
                    ? '🟢 Excellent readiness! Focus on solving previous VTU question papers.'
                    : readinessPercent >= 50
                    ? '🟡 Moderate readiness. Complete remaining essential topics below.'
                    : '⚠️ 0–40% readiness. Start ticking topics in the syllabus to boost your readiness.'}
                </span>
              </div>

              <button
                onClick={() =>
                  onAskGeminiStrategy(activeExam.title, examSubjects[0]?.name || 'VTU 1st Year')
                }
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-bold flex items-center space-x-2 transition-all cursor-pointer shadow-md shadow-indigo-100"
              >
                <Sparkles className="w-4 h-4" />
                <span>Generate Strategy with AI Tutor</span>
              </button>
            </div>
          </div>

          {/* High Priority Unstudied Topics */}
          <div className="bg-white border border-slate-200/80 rounded-[28px] p-6 sm:p-7 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-rose-500" />
                <h3 className="text-base font-bold text-slate-900">
                  Target Topics Requiring Attention ({highPriorityPending.length})
                </h3>
              </div>
              <span className="text-xs text-slate-400">Prioritized for maximum marks in VTU</span>
            </div>

            {highPriorityPending.length === 0 ? (
              <div className="p-8 text-center text-xs text-emerald-600 font-bold bg-emerald-50 rounded-2xl border border-emerald-200">
                🎉 Excellent! All high-priority essential topics for this assessment are marked completed!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {highPriorityPending.slice(0, 6).map((item) => (
                  <div
                    key={item.subtopicId}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-indigo-700 font-bold">{item.subjectName}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-rose-50 text-rose-700 font-bold border border-rose-200">
                          {item.importance}
                        </span>
                      </div>
                      <div className="font-bold text-slate-800">{item.subtopicTitle}</div>
                    </div>

                    <button
                      onClick={() => onOpenStudyMode(item.subtopicId)}
                      className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shrink-0 shadow-xs cursor-pointer"
                    >
                      Study Now
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Modal: Add New Assessment */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 max-w-md w-full space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <CalendarCheck className="w-5 h-5 text-indigo-600" />
                <span>Add New Assessment / Test Date</span>
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddNewAssessment} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Assessment Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Model Exam, Physics Lab Internal, Class Test 1"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Scheduled Date</label>
                  <input
                    type="date"
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="IA-1">IA-1 (Modules 1-2)</option>
                    <option value="IA-2">IA-2 (Modules 3-4)</option>
                    <option value="SEE">SEE (All Modules)</option>
                    <option value="Lab Internals">Lab Internals</option>
                    <option value="Model Exam">Model Exam</option>
                    <option value="Assignment">Assignment</option>
                    <option value="Custom">Custom</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Notes / Description (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Covers CAED isometric projection, 50 marks"
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 shadow-xs cursor-pointer"
                >
                  Save Assessment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
