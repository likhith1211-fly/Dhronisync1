import React, { useState } from 'react';
import {
  CalendarDays,
  Clock,
  Plus,
  Trash2,
  BookOpen,
  Sparkles,
  CheckCircle2,
  Circle,
  Building2,
  UserCheck,
  Phone,
  Calendar,
  Layers,
  GraduationCap
} from 'lucide-react';
import { TimetableSlot, Subject, AllowedBranch } from '../types';
import {
  OFFICIAL_TIMETABLES,
  BRANCH_METADATA,
  FACULTY_BY_BRANCH
} from '../data/timetableData';
import { formatReadableDate, formatDate } from '../utils/storage';

interface TimetableCalendarViewProps {
  timetable: TimetableSlot[];
  subjects: Subject[];
  onAddSlot: (slot: Omit<TimetableSlot, 'id'>) => void;
  onDeleteSlot: (id: string) => void;
  onGenerateAIPlan: () => void;
  activeBranch?: AllowedBranch;
  onSwitchBranch?: (branch: AllowedBranch) => void;
  onUpdateSlotCompletion?: (
    slotId: string,
    updates: {
      completed?: boolean;
      teacherCompleted?: boolean;
      completedDate?: string;
      teacherCompletedDate?: string;
    }
  ) => void;
}

const DAYS: Array<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday'> = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const TimetableCalendarView: React.FC<TimetableCalendarViewProps> = ({
  timetable,
  subjects,
  onAddSlot,
  onDeleteSlot,
  onGenerateAIPlan,
  activeBranch = 'AI/ML',
  onSwitchBranch,
  onUpdateSlotCompletion,
}) => {
  const [selectedBranch, setSelectedBranch] = useState<AllowedBranch>(activeBranch);
  const [selectedDay, setSelectedDay] = useState<
    'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday'
  >('Monday');
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'faculty'>('day');
  const [isAdding, setIsAdding] = useState<boolean>(false);

  // Form states
  const [startTime, setStartTime] = useState<string>('09:00');
  const [endTime, setEndTime] = useState<string>('10:00');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(subjects[0]?.id || '');
  const [slotType, setSlotType] = useState<'lecture' | 'lab' | 'self_study' | 'break'>('lecture');
  const [room, setRoom] = useState<string>('LH - 03');

  // Manual completion local overrides
  const [completionMap, setCompletionMap] = useState<{
    [slotId: string]: {
      completed?: boolean;
      teacherCompleted?: boolean;
      completedDate?: string;
      teacherCompletedDate?: string;
    };
  }>({});

  const meta = BRANCH_METADATA[selectedBranch];
  const facultyList = FACULTY_BY_BRANCH[selectedBranch];

  const handleBranchChange = (b: AllowedBranch) => {
    setSelectedBranch(b);
    if (onSwitchBranch) {
      onSwitchBranch(b);
    }
  };

  // Filter slots for active branch
  const branchSlots = timetable.filter((s) => s.branch === selectedBranch || !s.branch);

  const daySlots = branchSlots
    .filter((slot) => slot.day === selectedDay)
    .sort((a, b) => {
      if (a.periodNumber !== undefined && b.periodNumber !== undefined) {
        return a.periodNumber - b.periodNumber;
      }
      return (a.time || '').localeCompare(b.time || '');
    });

  const handleToggleStudentCompletion = (slotId: string) => {
    const current = completionMap[slotId] || {};
    const nextCompleted = !current.completed;
    const today = formatDate(new Date());

    const updated = {
      ...current,
      completed: nextCompleted,
      completedDate: nextCompleted ? today : undefined,
    };

    setCompletionMap((prev) => ({ ...prev, [slotId]: updated }));
    if (onUpdateSlotCompletion) {
      onUpdateSlotCompletion(slotId, updated);
    }
  };

  const handleToggleTeacherCompletion = (slotId: string) => {
    const current = completionMap[slotId] || {};
    const nextTeacher = !current.teacherCompleted;
    const today = formatDate(new Date());

    const updated = {
      ...current,
      teacherCompleted: nextTeacher,
      teacherCompletedDate: nextTeacher ? today : undefined,
    };

    setCompletionMap((prev) => ({ ...prev, [slotId]: updated }));
    if (onUpdateSlotCompletion) {
      onUpdateSlotCompletion(slotId, updated);
    }
  };

  const handleSetManualDate = (
    slotId: string,
    field: 'completedDate' | 'teacherCompletedDate',
    dateVal: string
  ) => {
    const current = completionMap[slotId] || {};
    const updated = {
      ...current,
      [field]: dateVal || undefined,
      ...(field === 'completedDate' ? { completed: Boolean(dateVal) } : {}),
      ...(field === 'teacherCompletedDate' ? { teacherCompleted: Boolean(dateVal) } : {}),
    };
    setCompletionMap((prev) => ({ ...prev, [slotId]: updated }));
    if (onUpdateSlotCompletion) {
      onUpdateSlotCompletion(slotId, updated);
    }
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const sub = subjects.find((s) => s.id === selectedSubjectId);
    const mappedType =
      slotType === 'lecture'
        ? 'Lecture'
        : slotType === 'lab'
        ? 'Lab'
        : slotType === 'break'
        ? 'Tutorial'
        : 'Self Study';

    onAddSlot({
      day: selectedDay,
      time: `${startTime} - ${endTime}`,
      subjectName: sub?.shortName || 'Engineering',
      subjectCode: sub?.code || '25ENG101',
      type: mappedType as any,
      room,
      branch: selectedBranch,
    });
    setIsAdding(false);
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'lecture':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'lab':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'break':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'self_study':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Official College Header Card */}
      <div className="bg-white border border-slate-200/80 rounded-[28px] p-6 sm:p-7 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center space-x-2 text-indigo-600 font-bold text-xs uppercase tracking-wider mb-1">
              <Building2 className="w-4 h-4" />
              <span>Adichunchanagiri Institute of Technology, Chikkamagaluru</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Class Time Table • 2025–2026 Scheme
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Official schedule for 1st Year Engineering. Switch between branches (CSE-A, CSE-B, AI/ML) and record verified teacher & student completion dates.
            </p>
          </div>

          {/* Branch Switcher: Strictly CSE-A, CSE-B, AI/ML */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-200/80 self-start lg:self-auto">
            <span className="text-xs font-bold text-slate-500 px-2">Branch:</span>
            {(['AI/ML', 'CSE-A', 'CSE-B'] as AllowedBranch[]).map((b) => (
              <button
                key={b}
                onClick={() => handleBranchChange(b)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedBranch === b
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100'
                    : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Division & Class Details Sub-bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-5 text-xs">
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Division / Section</span>
            <span className="text-sm font-bold text-slate-800">{meta.section}</span>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Lecture Hall</span>
            <span className="text-sm font-bold text-indigo-700">{meta.room}</span>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Class Coordinator</span>
            <span className="text-sm font-bold text-slate-800">{meta.coordinator}</span>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Term Duration</span>
            <span className="text-sm font-bold text-emerald-700">{meta.termDates}</span>
          </div>
        </div>
      </div>

      {/* View Switcher & Action Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* View Mode Tabs */}
        <div className="flex items-center space-x-1.5 bg-white border border-slate-200 p-1 rounded-2xl shadow-2xs">
          <button
            onClick={() => setViewMode('day')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'day'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Day Schedule
          </button>
          <button
            onClick={() => setViewMode('week')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'week'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Weekly Grid
          </button>
          <button
            onClick={() => setViewMode('faculty')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'faculty'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Faculty Contacts
          </button>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={onGenerateAIPlan}
            className="px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-2xl text-xs font-bold flex items-center space-x-2 transition-all cursor-pointer shadow-2xs"
          >
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>AI Revision & Doubt Solver</span>
          </button>
          <button
            onClick={() => setIsAdding(true)}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-bold flex items-center space-x-2 transition-all cursor-pointer shadow-md shadow-indigo-100"
          >
            <Plus className="w-4 h-4" />
            <span>Add Slot</span>
          </button>
        </div>
      </div>

      {/* Add Slot Modal */}
      {isAdding && (
        <form
          onSubmit={handleAdd}
          className="bg-white border border-slate-200 rounded-[28px] p-6 sm:p-7 space-y-4 shadow-xl"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Add Schedule Slot for {selectedDay} ({selectedBranch})</h3>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="text-xs text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs text-slate-600 font-semibold">Start Time</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs text-slate-800 font-semibold"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-slate-600 font-semibold">End Time</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs text-slate-800 font-semibold"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-slate-600 font-semibold">Subject</label>
              <select
                value={selectedSubjectId}
                onChange={(e) => setSelectedSubjectId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs text-slate-800 font-semibold"
              >
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.shortName} ({s.code})
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-slate-600 font-semibold">Type</label>
              <select
                value={slotType}
                onChange={(e: any) => setSlotType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs text-slate-800 font-semibold"
              >
                <option value="lecture">Lecture (Theory)</option>
                <option value="lab">Lab / Practical</option>
                <option value="self_study">Self-Study</option>
                <option value="break">Tea / Lunch Break</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-slate-600 font-semibold">Room / Location</label>
            <input
              type="text"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              placeholder="e.g. LH - 03 or Physics Lab"
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400"
            />
          </div>

          <div className="flex justify-end space-x-2.5 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs cursor-pointer"
            >
              Save to Timetable
            </button>
          </div>
        </form>
      )}

      {/* VIEW 1: DAY SCHEDULE */}
      {viewMode === 'day' && (
        <div className="space-y-4">
          {/* Day Selector Pills */}
          <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
            {DAYS.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDay(d)}
                className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  selectedDay === d
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Schedule List */}
          <div className="bg-white border border-slate-200/80 rounded-[28px] p-6 sm:p-7 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <CalendarDays className="w-5 h-5 text-indigo-600" />
                <span>{selectedDay}'s Class Schedule • {selectedBranch}</span>
              </h3>
              <span className="text-xs text-slate-500 font-semibold">{daySlots.length} Periods Scheduled</span>
            </div>

            {daySlots.length === 0 ? (
              <div className="p-10 text-center text-xs text-slate-400">
                No schedule blocks found for {selectedDay}. Click "Add Slot" or switch branch.
              </div>
            ) : (
              <div className="space-y-3">
                {daySlots.map((slot) => {
                  const comp = completionMap[slot.id] || {};
                  const isDone = comp.completed;
                  const isTeacherDone = comp.teacherCompleted;

                  return (
                    <div
                      key={slot.id}
                      className={`p-4 sm:p-5 rounded-[22px] border transition-all ${
                        isDone
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-950 shadow-xs'
                          : 'bg-slate-50 border-slate-200/80 text-slate-900 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        {/* Time & Subject Info */}
                        <div className="flex items-start sm:items-center space-x-4 flex-1">
                          {/* Student Completion Checkbox in Green Block */}
                          <button
                            onClick={() => handleToggleStudentCompletion(slot.id)}
                            className="mt-1 sm:mt-0 transition-transform active:scale-95 cursor-pointer shrink-0"
                            title="Toggle Student Completion (Turns Green Block when completed)"
                          >
                            {isDone ? (
                              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-xs">
                                <CheckCircle2 className="w-5 h-5" />
                              </div>
                            ) : (
                              <div className="w-8 h-8 rounded-xl bg-white border border-slate-300 text-slate-300 hover:border-slate-400 flex items-center justify-center">
                                <Circle className="w-4 h-4" />
                              </div>
                            )}
                          </button>

                          {/* Time */}
                          <div className="text-center font-mono text-xs font-bold text-slate-700 w-28 shrink-0">
                            <div className="text-sm font-bold text-slate-900">{slot.time}</div>
                            {slot.periodNumber ? (
                              <div className="text-[11px] text-slate-400">Period {slot.periodNumber}</div>
                            ) : (
                              <div className="text-[11px] text-slate-400">{slot.type}</div>
                            )}
                          </div>

                          <div className="h-10 w-[1px] bg-slate-200 hidden sm:block" />

                          {/* Subject details */}
                          <div className="space-y-1 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-sm font-bold text-slate-900">{slot.subjectName}</span>
                              {slot.subjectCode && (
                                <span className="text-[10px] px-2 py-0.5 rounded-md font-mono font-bold bg-white text-slate-600 border border-slate-200">
                                  {slot.subjectCode}
                                </span>
                              )}
                              <span
                                className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold border ${getTypeBadge(
                                  slot.type
                                )}`}
                              >
                                {slot.type.toUpperCase()}
                              </span>
                              {isDone && (
                                <span className="text-[10px] px-2 py-0.5 rounded-md font-bold bg-emerald-600 text-white">
                                  DONE 🟩
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-slate-500 font-medium">
                              Room: <span className="font-semibold text-slate-700">{slot.room || meta.room}</span>
                              {slot.instructor && ` • Faculty: ${slot.instructor}`}
                            </div>
                          </div>
                        </div>

                        {/* Manual Date Entry Columns: Teacher Date & Student Date */}
                        <div className="flex flex-wrap items-center space-x-3 text-xs shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-200">
                          {/* Teacher Taught Date (Manual Entry) */}
                          <div className="bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-left min-w-[130px]">
                            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1">
                              <UserCheck className="w-3 h-3 text-blue-500" />
                              <span>Teacher Date</span>
                            </div>
                            <input
                              type="date"
                              value={comp.teacherCompletedDate || ''}
                              onChange={(e) => handleSetManualDate(slot.id, 'teacherCompletedDate', e.target.value)}
                              className="text-[11px] bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 font-medium text-slate-700 mt-1 w-full"
                              placeholder="Leave blank or set"
                            />
                          </div>

                          {/* Student Study Date (Manual Entry) */}
                          <div className="bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-left min-w-[130px]">
                            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1">
                              <GraduationCap className="w-3 h-3 text-emerald-600" />
                              <span>Student Date</span>
                            </div>
                            <input
                              type="date"
                              value={comp.completedDate || ''}
                              onChange={(e) => handleSetManualDate(slot.id, 'completedDate', e.target.value)}
                              className="text-[11px] bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 font-medium text-slate-700 mt-1 w-full"
                              placeholder="Leave blank or set"
                            />
                          </div>

                          <button
                            onClick={() => onDeleteSlot(slot.id)}
                            className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Remove Slot"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW 2: FULL WEEKLY TIMETABLE GRID (Matching the uploaded photos) */}
      {viewMode === 'week' && (
        <div className="bg-white border border-slate-200/80 rounded-[28px] p-6 shadow-sm overflow-x-auto">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Official Weekly Master Grid • {selectedBranch} ({meta.room})
              </h3>
              <p className="text-xs text-slate-500">
                Adichunchanagiri Institute of Technology, Chikkamagaluru • Coordinator: {meta.coordinator}
              </p>
            </div>
            <span className="text-xs px-3 py-1 bg-indigo-50 text-indigo-700 rounded-xl font-bold border border-indigo-100">
              VTU 2025–26
            </span>
          </div>

          <table className="w-full text-xs text-left border-collapse min-w-[760px]">
            <thead>
              <tr className="bg-slate-50 text-slate-700 border-b border-slate-200 font-bold">
                <th className="p-3 border-r border-slate-200">Day</th>
                <th className="p-3 border-r border-slate-200">P1 (09:00 - 10:00)</th>
                <th className="p-3 border-r border-slate-200">P2 (10:00 - 11:00)</th>
                <th className="p-2 border-r border-slate-200 bg-amber-50 text-amber-800 text-center text-[10px]">Tea</th>
                <th className="p-3 border-r border-slate-200">P3 (11:15 - 12:15)</th>
                <th className="p-3 border-r border-slate-200">P4 (12:15 - 01:15)</th>
                <th className="p-2 border-r border-slate-200 bg-amber-50 text-amber-800 text-center text-[10px]">Lunch</th>
                <th className="p-3 border-r border-slate-200">P5 (02:00 - 03:00)</th>
                <th className="p-3 border-r border-slate-200">P6 (03:00 - 04:00)</th>
                <th className="p-3">P7 (04:00 - 05:00)</th>
              </tr>
            </thead>
            <tbody>
              {DAYS.map((day) => {
                const dayItems = branchSlots.filter((s) => s.day === day);
                const getPeriodSlot = (pNum: number) => {
                  return dayItems.find((s) => {
                    if (s.periodNumber === pNum) return true;
                    const t = s.time || '';
                    if (pNum === 1) return t.includes('09.00') || t.includes('09:00');
                    if (pNum === 2) return t.includes('10.00') || t.includes('10:00') || (t.includes('09.00') && t.includes('11.00'));
                    if (pNum === 3) return t.includes('11.15') || t.includes('11:15');
                    if (pNum === 4) return t.includes('12.15') || t.includes('12:15');
                    if (pNum === 5) return t.includes('02.30') || t.includes('02.00') || t.includes('14:00') || t.includes('02:30');
                    if (pNum === 6) return t.includes('03.20') || t.includes('15:00') || (t.includes('02.30') && t.includes('05.00'));
                    if (pNum === 7) return t.includes('04.10') || t.includes('16:00') || (t.includes('02.30') && t.includes('05.00'));
                    return false;
                  });
                };

                return (
                  <tr key={day} className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="p-3 font-bold text-slate-900 border-r border-slate-200 bg-slate-50/30">
                      {day}
                    </td>

                    {/* Periods P1, P2 */}
                    {[1, 2].map((pNum) => {
                      const slot = getPeriodSlot(pNum);
                      return (
                        <td key={pNum} className="p-2.5 border-r border-slate-100 align-top">
                          {slot ? (
                            <div className="space-y-0.5">
                              <div className="font-bold text-slate-800 text-xs">{slot.subjectName}</div>
                              <div className="text-[10px] text-slate-400 font-mono">{slot.subjectCode}</div>
                              {slot.room && <div className="text-[9px] text-indigo-600 font-medium">{slot.room}</div>}
                            </div>
                          ) : (
                            <span className="text-slate-300 italic">—</span>
                          )}
                        </td>
                      );
                    })}

                    <td className="p-1 border-r border-slate-100 bg-amber-50/40 text-center text-[10px] text-amber-700">
                      ☕
                    </td>

                    {/* Periods P3, P4 */}
                    {[3, 4].map((pNum) => {
                      const slot = getPeriodSlot(pNum);
                      return (
                        <td key={pNum} className="p-2.5 border-r border-slate-100 align-top">
                          {slot ? (
                            <div className="space-y-0.5">
                              <div className="font-bold text-slate-800 text-xs">{slot.subjectName}</div>
                              <div className="text-[10px] text-slate-400 font-mono">{slot.subjectCode}</div>
                              {slot.room && <div className="text-[9px] text-indigo-600 font-medium">{slot.room}</div>}
                            </div>
                          ) : (
                            <span className="text-slate-300 italic">—</span>
                          )}
                        </td>
                      );
                    })}

                    <td className="p-1 border-r border-slate-100 bg-amber-50/40 text-center text-[10px] text-amber-700">
                      🍽️
                    </td>

                    {/* Periods P5, P6, P7 */}
                    {[5, 6, 7].map((pNum) => {
                      const slot = getPeriodSlot(pNum);
                      return (
                        <td key={pNum} className="p-2.5 border-r border-slate-100 align-top">
                          {slot ? (
                            <div className="space-y-0.5">
                              <div className="font-bold text-slate-800 text-xs">{slot.subjectName}</div>
                              <div className="text-[10px] text-slate-400 font-mono">{slot.subjectCode}</div>
                              {slot.room && <div className="text-[9px] text-indigo-600 font-medium">{slot.room}</div>}
                            </div>
                          ) : (
                            <span className="text-slate-300 italic">—</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* VIEW 3: FACULTY & COURSE CONTACTS (From timetable photo) */}
      {viewMode === 'faculty' && (
        <div className="bg-white border border-slate-200/80 rounded-[28px] p-6 sm:p-7 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Official Course Instructors & Contact Directory • {selectedBranch}
              </h3>
              <p className="text-xs text-slate-500">
                Department of Engineering, Adichunchanagiri Institute of Technology
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              Coordinator: <strong className="text-slate-800">{meta.coordinator}</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {facultyList.map((f, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 hover:border-slate-300 transition-all shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-700 font-mono px-2 py-0.5 rounded-lg bg-indigo-50 border border-indigo-100">
                    {f.code}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500">
                    {f.credits} Credits ({f.hours} Hrs)
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-900">{f.title}</h4>
                  <p className="text-xs font-semibold text-slate-700 mt-1">{f.faculty}</p>
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                  <div className="flex items-center space-x-1 text-slate-600 font-mono font-medium">
                    <Phone className="w-3 h-3 text-indigo-600" />
                    <span>{f.phone}</span>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-white border border-slate-200 font-bold text-slate-600">
                    {f.short}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
