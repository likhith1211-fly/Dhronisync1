import React, { useState } from 'react';
import {
  Search,
  CheckCircle2,
  Clock,
  Circle,
  ChevronDown,
  ChevronRight,
  BrainCircuit,
  Sparkles,
  Calendar,
  FileText,
  UserCheck,
  GraduationCap
} from 'lucide-react';
import { Subject, Module, Topic, Subtopic, TopicProgress, SubtopicStatus } from '../types';
import { formatReadableDate, formatDate } from '../utils/storage';

interface SyllabusViewProps {
  subjects: Subject[];
  activeSemester: 1 | 2;
  progressMap: { [subtopicId: string]: TopicProgress };
  onUpdateStatus: (subtopicId: string, newStatus: SubtopicStatus) => void;
  onUpdateProgressDetails?: (subtopicId: string, updates: Partial<TopicProgress>) => void;
  onOpenStudyMode: (subject: Subject, module: Module, topic: Topic, subtopic: Subtopic) => void;
  onAskGeminiContext: (subject: Subject, module: Module, topic: Topic, subtopic: Subtopic) => void;
}

export const SyllabusView: React.FC<SyllabusViewProps> = ({
  subjects,
  activeSemester,
  progressMap,
  onUpdateStatus,
  onUpdateProgressDetails,
  onOpenStudyMode,
  onAskGeminiContext,
}) => {
  // Filter subjects by active semester
  const semesterSubjects = subjects.filter((s) => s.semester === activeSemester);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(
    semesterSubjects[0]?.id || subjects[0]?.id || ''
  );

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'in_progress' | 'not_started'>('all');
  const [expandedModules, setExpandedModules] = useState<{ [moduleId: string]: boolean }>({
    'mat1-m1': true,
    'pic1-m1': true,
    'phy1-m1': true,
    'caed1-m1': true,
    'mat2-m1': true,
    'py2-m1': true,
    'chem2-m1': true,
  });

  const [expandedNotes, setExpandedNotes] = useState<{ [subtopicId: string]: boolean }>({});
  const [editingDates, setEditingDates] = useState<{ [subtopicId: string]: boolean }>({});

  const activeSubject =
    semesterSubjects.find((s) => s.id === selectedSubjectId) || semesterSubjects[0] || subjects[0];

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  const toggleNotes = (subtopicId: string) => {
    setExpandedNotes((prev) => ({
      ...prev,
      [subtopicId]: !prev[subtopicId],
    }));
  };

  const toggleDateEdit = (subtopicId: string) => {
    setEditingDates((prev) => ({
      ...prev,
      [subtopicId]: !prev[subtopicId],
    }));
  };

  // Calculate subject progress
  const allSubtopicsInSubject: Subtopic[] = [];
  activeSubject?.modules.forEach((mod) => {
    mod.topics.forEach((t) => {
      t.subtopics.forEach((st) => allSubtopicsInSubject.push(st));
    });
  });

  const completedCount = allSubtopicsInSubject.filter(
    (st) => progressMap[st.id]?.status === 'completed'
  ).length;
  const inProgressCount = allSubtopicsInSubject.filter(
    (st) => progressMap[st.id]?.status === 'in_progress'
  ).length;
  const totalCount = allSubtopicsInSubject.length || 1;
  const subjectPercentage = Math.round((completedCount / totalCount) * 100);

  const handleManualDateChange = (
    subtopicId: string,
    field: 'completedDate' | 'teacherCompletedDate',
    val: string
  ) => {
    if (onUpdateProgressDetails) {
      onUpdateProgressDetails(subtopicId, {
        [field]: val || undefined,
        ...(field === 'completedDate' && val ? { status: 'completed' as SubtopicStatus } : {}),
        ...(field === 'teacherCompletedDate' ? { teacherCompleted: Boolean(val) } : {}),
      });
    } else {
      // Fallback
      if (field === 'completedDate') {
        onUpdateStatus(subtopicId, val ? 'completed' : 'not_started');
      }
    }
  };

  const setDateToday = (subtopicId: string, field: 'completedDate' | 'teacherCompletedDate') => {
    const today = formatDate(new Date());
    handleManualDateChange(subtopicId, field, today);
  };

  return (
    <div className="space-y-6">
      {/* Subject Selector Bar */}
      <div className="bg-white border border-slate-200/80 rounded-[28px] p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-xs font-bold tracking-wider text-indigo-600 uppercase">
                VTU 2025–2026 Scheme
              </span>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold border border-slate-200">
                Semester {activeSemester} (AI/ML, CSE-A, CSE-B)
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Academic Syllabus & Topic Tracker</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Accurate syllabus tracking with manual completion dates for teachers and students. Completed topics are ticked in clear green blocks.
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-slate-50 px-3.5 py-1.5 rounded-2xl border border-slate-200/80 self-start sm:self-auto">
            <span className="text-xs text-slate-500 font-medium">Subject Completion:</span>
            <span className="text-sm font-bold text-indigo-600">{subjectPercentage}%</span>
          </div>
        </div>

        {/* Subject Tabs */}
        <div className="flex space-x-2.5 overflow-x-auto pb-1 scrollbar-none">
          {semesterSubjects.map((sub) => {
            const isSelected = sub.id === activeSubject?.id;
            return (
              <button
                key={sub.id}
                id={`subject-tab-${sub.id}`}
                onClick={() => setSelectedSubjectId(sub.id)}
                className={`flex-shrink-0 px-4 py-2.5 rounded-2xl text-xs font-semibold transition-all flex items-center space-x-2 cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100 font-bold'
                    : 'bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                <span>{sub.shortName}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-lg ${
                  isSelected ? 'bg-indigo-700/80 text-white' : 'bg-white text-slate-500 border border-slate-200'
                }`}>
                  {sub.code}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Subject Header Card */}
      {activeSubject && (
        <div className="bg-white border border-slate-200/80 rounded-[28px] p-6 sm:p-7 shadow-sm space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-1 rounded-xl bg-indigo-50 text-indigo-700 text-xs font-mono font-bold border border-indigo-100">
                  {activeSubject.code}
                </span>
                <span className="px-2.5 py-1 rounded-xl bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100">
                  {activeSubject.credits} Credits ({activeSubject.teachingHoursPerWeek || '3L+2T+0P'})
                </span>
                <span className="px-2.5 py-1 rounded-xl bg-purple-50 text-purple-700 text-xs font-semibold border border-purple-100">
                  {activeSubject.category}
                </span>
                <span className="px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-100">
                  VTU 2025–26 Official
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">{activeSubject.name}</h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-3xl mt-1.5 leading-relaxed">
                {activeSubject.description}
              </p>
            </div>

            {/* Quick Stats Badges */}
            <div className="flex items-center space-x-4 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 shrink-0">
              <div className="text-center px-2">
                <div className="text-base font-bold text-emerald-600">{completedCount}</div>
                <div className="text-[10px] text-slate-500 font-semibold">Done 🟩</div>
              </div>
              <div className="h-7 w-[1px] bg-slate-200" />
              <div className="text-center px-2">
                <div className="text-base font-bold text-amber-600">{inProgressCount}</div>
                <div className="text-[10px] text-slate-500 font-semibold">Active 🟨</div>
              </div>
              <div className="h-7 w-[1px] bg-slate-200" />
              <div className="text-center px-2">
                <div className="text-base font-bold text-slate-500">{totalCount - completedCount - inProgressCount}</div>
                <div className="text-[10px] text-slate-500 font-semibold">Pending ⬜</div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5 pt-1">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-500">Syllabus Completion (Total {totalCount} Subtopics)</span>
              <span className="text-indigo-600 font-bold">{subjectPercentage}% ({completedCount}/{totalCount} completed)</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-300 rounded-full"
                style={{ width: `${subjectPercentage}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search topic, derivation or concept..."
            className="w-full bg-white border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-2xs"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center space-x-1.5 bg-white border border-slate-200 p-1 rounded-2xl self-start sm:self-auto shadow-2xs">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              statusFilter === 'all'
                ? 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            All Subtopics
          </button>
          <button
            onClick={() => setStatusFilter('completed')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1 cursor-pointer ${
              statusFilter === 'completed'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <span>Completed 🟩</span>
          </button>
          <button
            onClick={() => setStatusFilter('in_progress')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1 cursor-pointer ${
              statusFilter === 'in_progress'
                ? 'bg-amber-50 text-amber-800 border border-amber-200'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <span>In Progress 🟨</span>
          </button>
          <button
            onClick={() => setStatusFilter('not_started')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1 cursor-pointer ${
              statusFilter === 'not_started'
                ? 'bg-slate-100 text-slate-800 border border-slate-200'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <span>Blank / Pending ⬜</span>
          </button>
        </div>
      </div>

      {/* Modules List */}
      <div className="space-y-4">
        {activeSubject?.modules.map((module) => {
          const isExpanded = expandedModules[module.id] ?? true;

          // Count module completion
          let modTotal = 0;
          let modCompleted = 0;
          module.topics.forEach((t) => {
            t.subtopics.forEach((st) => {
              modTotal++;
              if (progressMap[st.id]?.status === 'completed') modCompleted++;
            });
          });
          const modPercent = modTotal > 0 ? Math.round((modCompleted / modTotal) * 100) : 0;

          // Filter subtopics
          const filteredTopics = module.topics
            .map((t) => {
              const matchingSubtopics = t.subtopics.filter((st) => {
                const prog = progressMap[st.id];
                const currentStatus = prog?.status || 'not_started';

                if (statusFilter !== 'all' && currentStatus !== statusFilter) return false;
                if (searchQuery.trim()) {
                  const q = searchQuery.toLowerCase();
                  return (
                    (st.title || '').toLowerCase().includes(q) ||
                    (st.description || '').toLowerCase().includes(q) ||
                    (t.title || '').toLowerCase().includes(q)
                  );
                }
                return true;
              });

              return { ...t, subtopics: matchingSubtopics };
            })
            .filter((t) => t.subtopics.length > 0);

          if (filteredTopics.length === 0 && (searchQuery.trim() || statusFilter !== 'all')) {
            return null;
          }

          return (
            <div
              key={module.id}
              className="bg-white border border-slate-200/80 rounded-[28px] overflow-hidden shadow-sm transition-all"
            >
              {/* Module Header Accordion Button */}
              <div
                onClick={() => toggleModule(module.id)}
                className="w-full p-5 sm:p-6 flex items-center justify-between bg-white hover:bg-slate-50/80 cursor-pointer transition-colors select-none"
              >
                <div className="flex items-center space-x-4 text-left">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-700 shrink-0 shadow-2xs">
                    M{module.moduleNumber}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">{module.title}</h3>
                      <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
                        ({module.hours || 8} Hours)
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{module.summary}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 shrink-0">
                  {/* Module Mini Bar */}
                  <div className="hidden md:flex flex-col items-end space-y-1">
                    <span className="text-[11px] font-semibold text-slate-600">
                      {modCompleted}/{modTotal} Done ({modPercent}%)
                    </span>
                    <div className="w-28 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 transition-all rounded-full"
                        style={{ width: `${modPercent}%` }}
                      />
                    </div>
                  </div>

                  <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-center text-slate-400">
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-slate-600" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-600" />
                    )}
                  </div>
                </div>
              </div>

              {/* Module Content */}
              {isExpanded && (
                <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 space-y-6">
                  {filteredTopics.map((topic) => (
                    <div key={topic.id} className="space-y-3 pt-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-indigo-600" />
                        <h4 className="text-sm font-bold text-slate-800">
                          {topic.title}
                        </h4>
                      </div>

                      {/* Subtopics Table / Cards */}
                      <div className="space-y-2.5">
                        {topic.subtopics.map((subtopic) => {
                          const prog = progressMap[subtopic.id] || {
                            subtopicId: subtopic.id,
                            status: 'not_started',
                            timeSpentMinutes: 0,
                          };

                          const isDone = prog.status === 'completed';
                          const isInProgress = prog.status === 'in_progress';
                          const isDateEditing = editingDates[subtopic.id];

                          return (
                            <div
                              key={subtopic.id}
                              id={`subtopic-${subtopic.id}`}
                              className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                                isDone
                                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950 shadow-xs'
                                  : isInProgress
                                  ? 'bg-amber-50/70 border-amber-200/90 text-slate-900'
                                  : 'bg-slate-50/80 border-slate-200/80 text-slate-900 hover:bg-white hover:border-slate-300'
                              }`}
                            >
                              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                {/* Status + Title */}
                                <div className="flex items-start space-x-3.5 flex-1 min-w-0">
                                  {/* Status Toggle Button: Ticked in green block when completed */}
                                  <button
                                    id={`status-btn-${subtopic.id}`}
                                    onClick={() => {
                                      const next: SubtopicStatus =
                                        prog.status === 'not_started'
                                          ? 'in_progress'
                                          : prog.status === 'in_progress'
                                          ? 'completed'
                                          : 'not_started';
                                      onUpdateStatus(subtopic.id, next);
                                    }}
                                    className="mt-0.5 shrink-0 transition-transform active:scale-95 cursor-pointer"
                                    title="Click to toggle status: Completed 🟩 / In Progress 🟨 / Blank Space ⬜"
                                  >
                                    {isDone ? (
                                      <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-sm shadow-emerald-200">
                                        <CheckCircle2 className="w-5 h-5" />
                                      </div>
                                    ) : isInProgress ? (
                                      <div className="w-8 h-8 rounded-xl bg-amber-100 border border-amber-300 text-amber-800 flex items-center justify-center font-bold">
                                        <Clock className="w-4 h-4" />
                                      </div>
                                    ) : (
                                      <div className="w-8 h-8 rounded-xl bg-white border border-slate-300 text-slate-300 hover:border-slate-400 flex items-center justify-center">
                                        <Circle className="w-4 h-4" />
                                      </div>
                                    )}
                                  </button>

                                  <div className="space-y-1 flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2">
                                      <span
                                        className={`text-sm font-bold leading-snug ${
                                          isDone ? 'text-emerald-950' : isInProgress ? 'text-amber-950' : 'text-slate-900'
                                        }`}
                                      >
                                        {subtopic.title}
                                      </span>

                                      {isDone && (
                                        <span className="text-[10px] px-2 py-0.5 rounded-md font-bold bg-emerald-600 text-white shadow-2xs">
                                          COMPLETED 🟩
                                        </span>
                                      )}

                                      {subtopic.importance && (
                                        <span
                                          className={`text-[10px] px-2 py-0.5 rounded-lg font-semibold ${
                                            subtopic.importance === 'Essential'
                                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                              : subtopic.importance === 'High'
                                              ? 'bg-amber-50 text-amber-800 border border-amber-200'
                                              : 'bg-slate-100 text-slate-600'
                                          }`}
                                        >
                                          {subtopic.importance}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-xs text-slate-500 leading-relaxed">
                                      {subtopic.description}
                                    </p>
                                  </div>
                                </div>

                                {/* Manual Dates & Action Controls */}
                                <div className="flex flex-wrap items-center justify-between lg:justify-end gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-200/80 shrink-0">
                                  {/* Date Columns: Teacher Date and Student Date (Entered Manually) */}
                                  <div className="flex items-center space-x-3 text-xs">
                                    {/* Teacher Completion Date */}
                                    <div className="bg-white/90 px-3 py-1.5 rounded-xl border border-slate-200 text-left min-w-[125px]">
                                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1">
                                        <UserCheck className="w-3 h-3 text-blue-500" />
                                        <span>Teacher Date</span>
                                      </div>
                                      {isDateEditing ? (
                                        <div className="flex items-center space-x-1 mt-1">
                                          <input
                                            type="date"
                                            value={prog.teacherCompletedDate || ''}
                                            onChange={(e) =>
                                              handleManualDateChange(subtopic.id, 'teacherCompletedDate', e.target.value)
                                            }
                                            className="text-[11px] bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 font-medium text-slate-700"
                                          />
                                          <button
                                            type="button"
                                            onClick={() => setDateToday(subtopic.id, 'teacherCompletedDate')}
                                            className="text-[9px] bg-blue-50 text-blue-700 px-1 py-0.5 rounded font-bold hover:bg-blue-100"
                                            title="Mark Taught Today"
                                          >
                                            Today
                                          </button>
                                        </div>
                                      ) : (
                                        <div
                                          onClick={() => toggleDateEdit(subtopic.id)}
                                          className="text-xs font-semibold text-slate-700 cursor-pointer hover:text-blue-600 mt-0.5"
                                          title="Click to enter manual date"
                                        >
                                          {prog.teacherCompletedDate ? (
                                            <span className="text-blue-700 font-bold">
                                              {formatReadableDate(prog.teacherCompletedDate)}
                                            </span>
                                          ) : (
                                            <span className="text-slate-400 italic">Leave Blank / Set</span>
                                          )}
                                        </div>
                                      )}
                                    </div>

                                    {/* Student Completion Date */}
                                    <div className="bg-white/90 px-3 py-1.5 rounded-xl border border-slate-200 text-left min-w-[125px]">
                                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1">
                                        <GraduationCap className="w-3 h-3 text-emerald-600" />
                                        <span>Student Date</span>
                                      </div>
                                      {isDateEditing ? (
                                        <div className="flex items-center space-x-1 mt-1">
                                          <input
                                            type="date"
                                            value={prog.completedDate || ''}
                                            onChange={(e) =>
                                              handleManualDateChange(subtopic.id, 'completedDate', e.target.value)
                                            }
                                            className="text-[11px] bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 font-medium text-slate-700"
                                          />
                                          <button
                                            type="button"
                                            onClick={() => setDateToday(subtopic.id, 'completedDate')}
                                            className="text-[9px] bg-emerald-50 text-emerald-700 px-1 py-0.5 rounded font-bold hover:bg-emerald-100"
                                            title="Mark Completed Today"
                                          >
                                            Today
                                          </button>
                                        </div>
                                      ) : (
                                        <div
                                          onClick={() => toggleDateEdit(subtopic.id)}
                                          className="text-xs font-semibold text-slate-700 cursor-pointer hover:text-emerald-700 mt-0.5"
                                          title="Click to enter manual date"
                                        >
                                          {prog.completedDate ? (
                                            <span className="text-emerald-700 font-bold">
                                              {formatReadableDate(prog.completedDate)}
                                            </span>
                                          ) : (
                                            <span className="text-slate-400 italic">Leave Blank / Set</span>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  {/* Quick Actions */}
                                  <div className="flex items-center space-x-2">
                                    <button
                                      onClick={() => toggleDateEdit(subtopic.id)}
                                      className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 text-xs font-semibold transition-all cursor-pointer"
                                      title={isDateEditing ? 'Close Date Editor' : 'Manually Enter Dates'}
                                    >
                                      <Calendar className="w-3.5 h-3.5" />
                                    </button>

                                    <button
                                      onClick={() =>
                                        onOpenStudyMode(activeSubject, module, topic, subtopic)
                                      }
                                      className="px-3 py-1.5 rounded-xl bg-white hover:bg-indigo-50 text-indigo-700 border border-slate-200 hover:border-indigo-200 text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-2xs cursor-pointer"
                                      title="Open Dedicated Study Mode"
                                    >
                                      <BrainCircuit className="w-3.5 h-3.5 text-indigo-600" />
                                      <span className="hidden sm:inline">Study Mode</span>
                                    </button>

                                    <button
                                      onClick={() =>
                                        onAskGeminiContext(activeSubject, module, topic, subtopic)
                                      }
                                      className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-xs cursor-pointer"
                                      title="Ask Gemini AI about this subtopic (or any related topic)"
                                    >
                                      <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
                                      <span className="hidden sm:inline">Ask AI</span>
                                    </button>

                                    <button
                                      onClick={() => toggleNotes(subtopic.id)}
                                      className={`p-2 rounded-xl border text-xs transition-all cursor-pointer ${
                                        prog.notes
                                          ? 'bg-amber-50 text-amber-800 border-amber-300 shadow-2xs'
                                          : 'bg-white text-slate-500 border-slate-200 hover:text-slate-900 hover:bg-slate-50'
                                      }`}
                                      title={prog.notes ? 'View Notes' : 'Add Note'}
                                    >
                                      <FileText className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                              </div>

                              {/* Collapsible Notes Preview */}
                              {expandedNotes[subtopic.id] && (
                                <div className="mt-3.5 p-4 rounded-2xl bg-white border border-slate-200 text-xs space-y-1.5 shadow-2xs">
                                  <div className="flex items-center justify-between text-slate-500 font-semibold text-[11px]">
                                    <span className="font-bold text-slate-700">Topic Notes & Formulas:</span>
                                    <button
                                      onClick={() =>
                                        onOpenStudyMode(activeSubject, module, topic, subtopic)
                                      }
                                      className="text-indigo-600 font-bold hover:underline cursor-pointer"
                                    >
                                      Edit in Study Mode →
                                    </button>
                                  </div>
                                  <p className="text-slate-700 whitespace-pre-wrap font-mono text-xs leading-relaxed">
                                    {prog.notes || 'No notes added yet. Click Study Mode to jot down formulas or exam hints!'}
                                  </p>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
