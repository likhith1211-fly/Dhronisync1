import { DoubtItem, ExamGoal, TimetableSlot, TopicProgress, UserProfile, AllowedBranch } from '../types';
import { OFFICIAL_TIMETABLES } from '../data/timetableData';

const STORAGE_KEYS = {
  PROGRESS: 'vtu_tracker_progress_v3', // v3 ensures fresh, un-prefilled student/teacher controlled state
  DOUBTS: 'vtu_tracker_doubts_v2',
  EXAM_GOALS: 'vtu_tracker_exam_goals_v3',
  TIMETABLE: 'vtu_tracker_timetable_v3',
  PROFILE: 'vtu_tracker_profile_v2',
  STREAK: 'vtu_tracker_streak_v3',
};

// Format date YYYY-MM-DD
export function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function formatReadableDate(dateStr?: string): string {
  if (!dateStr || dateStr.trim() === '') return '—';
  try {
    const d = new Date(dateStr + 'T00:00:00');
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return dateStr;
  }
}

// Indian Standard Time (IST, GMT+5:30) live clock helper
export function getISTNow(): { timeStr: string; dateStr: string; fullStr: string } {
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  const dateStr = now.toLocaleDateString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  return { timeStr, dateStr, fullStr: `${timeStr}, ${dateStr} (IST GMT+5:30)` };
}

// Default progress: Empty object by default. All completion ticks (green), in-progress (yellow),
// and pending (white) are 100% in the hands of the student and teacher!
const DEFAULT_PROGRESS: { [subtopicId: string]: TopicProgress } = {};

// Default profile with blank space for name and allowed branches (AI/ML, CSE-A, CSE-B)
const DEFAULT_PROFILE: UserProfile = {
  name: '', // Blank space for user/student to manually enter or leave blank
  usn: '',
  branch: 'AI/ML',
  division: 'LH - 03 (Administrative Block)',
  college: 'Adichunchanagiri Institute of Technology, Chikkamagaluru',
  activeSemester: 1,
  dailyGoalMinutes: 120,
};

const DEFAULT_DOUBTS: DoubtItem[] = [
  {
    id: 'd-1',
    subjectId: '1BMATS101',
    subjectName: 'Calculus and Linear Algebra',
    topicId: 'mat1-m1-t1',
    topicTitle: 'Angle Between Tangent and Radius Vector',
    subtopicTitle: 'Angle of intersection of two polar curves',
    question: 'How do we handle cases when tan φ becomes undefined (infinite) while calculating angle of intersection in polar curves?',
    answer: 'When tan φ is undefined (e.g. at φ = π/2), it means the tangent is perpendicular to the radius vector. In that case, use cot φ = (1/r)·(dr/dθ) = 0. The angle between curves becomes |π/2 - φ2| or using trigonometric identities.',
    status: 'resolved',
    createdAt: '2026-09-04T10:30:00Z',
    resolvedAt: '2026-09-04T10:35:00Z',
  },
  {
    id: 'd-2',
    subjectId: '1BEIT105',
    subjectName: 'Programming in C',
    topicId: 'pic1-m1-t2',
    topicTitle: 'Operators, Precedence & Associativity',
    subtopicTitle: 'Operators, Precedence and Associativity rules',
    question: 'What is the exact order of evaluation in expressions like i = ++i + i++ in C?',
    answer: 'In standard C, modifying a variable multiple times without an intervening sequence point leads to Undefined Behavior (UB). Avoid such expressions in practical programming and VTU exams.',
    status: 'resolved',
    createdAt: '2026-09-04T16:15:00Z',
    resolvedAt: '2026-09-04T16:20:00Z',
  }
];

const DEFAULT_EXAM_GOALS: ExamGoal[] = [
  {
    id: 'ia-1',
    title: 'Internal Assessment 1 (IA-1)',
    date: '2026-09-28',
    scheduledDate: '2026-09-28',
    isReminderSet: true,
    reminderDaysBefore: 3,
    notes: 'Covers Modules 1 & 2 across all subjects. 50 Marks internal test.',
    semester: 1,
    type: 'IA-1',
    subjectModules: {
      '1BMATS101': [1, 2],
      '1BPHYS102': [1, 2],
      '1BEIT105': [1, 2],
      '1BCEDS103': [1, 2],
      '1BESC104A': [1, 2],
    }
  },
  {
    id: 'ia-2',
    title: 'Internal Assessment 2 (IA-2)',
    date: '2026-11-15',
    scheduledDate: '2026-11-15',
    isReminderSet: true,
    reminderDaysBefore: 3,
    notes: 'Covers Modules 3 & 4. Mandatory 50 Marks assessment for VTU CIE calculation.',
    semester: 1,
    type: 'IA-2',
    subjectModules: {
      '1BMATS101': [3, 4],
      '1BPHYS102': [3, 4],
      '1BEIT105': [3, 4],
      '1BCEDS103': [3, 4],
      '1BESC104A': [3, 4],
    }
  },
  {
    id: 'see-1',
    title: 'Semester End Examination (SEE)',
    date: '2026-12-20',
    scheduledDate: '2026-12-20',
    isReminderSet: true,
    reminderDaysBefore: 7,
    notes: 'Official VTU 100 Marks (50 Marks weighted) University Theory Examination.',
    semester: 1,
    type: 'SEE',
    subjectModules: {
      '1BMATS101': [1, 2, 3, 4, 5],
      '1BPHYS102': [1, 2, 3, 4, 5],
      '1BEIT105': [1, 2, 3, 4, 5],
      '1BCEDS103': [1, 2, 3, 4, 5],
      '1BESC104A': [1, 2, 3, 4, 5],
    }
  }
];

export function getStoredProgress(): { [subtopicId: string]: TopicProgress } {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(DEFAULT_PROGRESS));
      return DEFAULT_PROGRESS;
    }
    return JSON.parse(data);
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function saveStoredProgress(progress: { [subtopicId: string]: TopicProgress }) {
  try {
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
  } catch (err) {
    console.error('Failed to save progress to localStorage', err);
  }
}

// Allows updating teacher date and student date manually
export function updateSubtopicProgress(
  subtopicId: string,
  updates: Partial<TopicProgress>
): TopicProgress {
  const current = getStoredProgress();
  const existing = current[subtopicId] || {
    subtopicId,
    status: 'not_started',
    timeSpentMinutes: 0,
    revisionsCompleted: 0,
  };

  const updated: TopicProgress = {
    ...existing,
    ...updates,
  };

  // Keep consistency with status if completedDate is set or cleared
  if (updates.status === 'completed' && !updated.completedDate) {
    updated.completedDate = formatDate(new Date());
  } else if (updates.status === 'not_started') {
    updated.completedDate = undefined;
    updated.startedDate = undefined;
    updated.revisionDates = [];
  }

  // If newly completed, automatically generate spaced repetition revision schedule
  if (updated.status === 'completed' && (!updated.revisionDates || updated.revisionDates.length === 0)) {
    const intervals = [1, 3, 7, 14, 30];
    const today = new Date();
    updated.revisionDates = intervals.map((days) => {
      const d = new Date(today);
      d.setDate(d.getDate() + days);
      return formatDate(d);
    });
  }

  current[subtopicId] = updated;
  saveStoredProgress(current);
  if (updated.status === 'completed') {
    updateStreak();
  }
  return updated;
}

export function updateSubtopicStatus(
  subtopicId: string,
  newStatus: 'not_started' | 'in_progress' | 'completed',
  timeSpentDelta: number = 0
): TopicProgress {
  const current = getStoredProgress();
  const existing = current[subtopicId] || {
    subtopicId,
    status: 'not_started',
    timeSpentMinutes: 0,
    revisionsCompleted: 0,
  };

  const today = formatDate(new Date());
  let started = existing.startedDate;
  let completed = existing.completedDate;
  let revisionDates = existing.revisionDates ? [...existing.revisionDates] : [];

  if (newStatus === 'in_progress' && !started) {
    started = today;
  }

  if (newStatus === 'completed') {
    if (!started) started = today;
    if (!completed) completed = today;
    // Auto schedule spaced repetition revisions: Day 1, Day 3, Day 7, Day 14, Day 30
    if (revisionDates.length === 0) {
      const intervals = [1, 3, 7, 14, 30];
      const now = new Date();
      revisionDates = intervals.map((days) => {
        const d = new Date(now);
        d.setDate(d.getDate() + days);
        return formatDate(d);
      });
    }
  } else if (newStatus === 'not_started') {
    completed = undefined;
    started = undefined;
    revisionDates = [];
  }

  const updatedItem: TopicProgress = {
    ...existing,
    status: newStatus,
    startedDate: started,
    completedDate: completed,
    revisionDates,
    timeSpentMinutes: (existing.timeSpentMinutes || 0) + timeSpentDelta,
  };

  current[subtopicId] = updatedItem;
  saveStoredProgress(current);
  if (newStatus === 'completed') {
    updateStreak();
  }
  return updatedItem;
}

// Manually add any topic to Revision Master schedule
export function addTopicToRevisionSchedule(subtopicId: string): TopicProgress {
  const current = getStoredProgress();
  const existing = current[subtopicId] || {
    subtopicId,
    status: 'completed' as const,
    timeSpentMinutes: 0,
    revisionsCompleted: 0,
    revisionDates: [],
  };

  const intervals = [1, 3, 7, 14, 30];
  const now = new Date();
  const revisionDates = intervals.map((days) => {
    const d = new Date(now);
    d.setDate(d.getDate() + days);
    return formatDate(d);
  });

  const updatedItem: TopicProgress = {
    ...existing,
    status: 'completed',
    completedDate: existing.completedDate || formatDate(now),
    revisionDates,
  };

  current[subtopicId] = updatedItem;
  saveStoredProgress(current);
  return updatedItem;
}

export function updateTopicDetails(
  subtopicId: string,
  details: Partial<TopicProgress>
): TopicProgress {
  return updateSubtopicProgress(subtopicId, details);
}

export function getStoredDoubts(): DoubtItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DOUBTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.DOUBTS, JSON.stringify(DEFAULT_DOUBTS));
      return DEFAULT_DOUBTS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_DOUBTS;
  }
}

export function saveStoredDoubts(doubts: DoubtItem[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.DOUBTS, JSON.stringify(doubts));
  } catch (err) {
    console.error('Failed to save doubts', err);
  }
}

export function getStoredExamGoals(): ExamGoal[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.EXAM_GOALS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.EXAM_GOALS, JSON.stringify(DEFAULT_EXAM_GOALS));
      return DEFAULT_EXAM_GOALS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_EXAM_GOALS;
  }
}

export function saveStoredExamGoals(goals: ExamGoal[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.EXAM_GOALS, JSON.stringify(goals));
  } catch (err) {
    console.error('Failed to save exam goals', err);
  }
}

export function getStoredTimetable(branch?: AllowedBranch): TimetableSlot[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TIMETABLE);
    const allOfficial: TimetableSlot[] = [
      ...OFFICIAL_TIMETABLES['AI/ML'],
      ...OFFICIAL_TIMETABLES['CSE-A'],
      ...OFFICIAL_TIMETABLES['CSE-B'],
    ];

    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.TIMETABLE, JSON.stringify(allOfficial));
      return allOfficial;
    }
    const parsed: TimetableSlot[] = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEYS.TIMETABLE, JSON.stringify(allOfficial));
      return allOfficial;
    }

    // Ensure slots for all three branches exist (if missing, merge official slots)
    const hasAiml = parsed.some((s) => s.branch === 'AI/ML');
    const hasCseA = parsed.some((s) => s.branch === 'CSE-A');
    const hasCseB = parsed.some((s) => s.branch === 'CSE-B');

    let combined = [...parsed];
    if (!hasAiml) combined.push(...OFFICIAL_TIMETABLES['AI/ML']);
    if (!hasCseA) combined.push(...OFFICIAL_TIMETABLES['CSE-A']);
    if (!hasCseB) combined.push(...OFFICIAL_TIMETABLES['CSE-B']);

    if (combined.length !== parsed.length) {
      localStorage.setItem(STORAGE_KEYS.TIMETABLE, JSON.stringify(combined));
    }
    return combined;
  } catch {
    return [
      ...OFFICIAL_TIMETABLES['AI/ML'],
      ...OFFICIAL_TIMETABLES['CSE-A'],
      ...OFFICIAL_TIMETABLES['CSE-B'],
    ];
  }
}

export function saveStoredTimetable(slots: TimetableSlot[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.TIMETABLE, JSON.stringify(slots));
  } catch (err) {
    console.error('Failed to save timetable', err);
  }
}

export function switchTimetableBranch(branch: AllowedBranch): TimetableSlot[] {
  const profile = getStoredProfile();
  profile.branch = branch;
  saveStoredProfile(profile);
  return getStoredTimetable(branch);
}

export function getStoredProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(DEFAULT_PROFILE));
      return DEFAULT_PROFILE;
    }
    const parsed = JSON.parse(raw);
    if (parsed.name === 'Likki') {
      parsed.name = '';
    }
    const allowed: AllowedBranch[] = ['AI/ML', 'CSE-A', 'CSE-B'];
    if (!allowed.includes(parsed.branch)) {
      parsed.branch = 'AI/ML';
    }
    if (!parsed.college || typeof parsed.college !== 'string' || parsed.college.includes('VTU Affiliated')) {
      parsed.college = 'Adichunchanagiri Institute of Technology, Chikkamagaluru';
    }
    return parsed;
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function saveStoredProfile(profile: UserProfile) {
  try {
    if (profile.name === 'Likki') {
      profile.name = '';
    }
    const allowed: AllowedBranch[] = ['AI/ML', 'CSE-A', 'CSE-B'];
    if (!allowed.includes(profile.branch)) {
      profile.branch = 'AI/ML';
    }
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  } catch (err) {
    console.error('Failed to save profile', err);
  }
}

export interface StreakData {
  currentStreak: number;
  startDate?: string;
  lastDate?: string;
  loggedDates: string[];
}

// Student-controlled study streak: starts only when entered manually by the student or upon study activity
export function getStreak(): StreakData {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STREAK);
    if (!raw) {
      const initial: StreakData = {
        currentStreak: 0,
        loggedDates: [],
      };
      localStorage.setItem(STORAGE_KEYS.STREAK, JSON.stringify(initial));
      return initial;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed.loggedDates)) {
      parsed.loggedDates = parsed.lastDate ? [parsed.lastDate] : [];
    }
    return parsed;
  } catch {
    return { currentStreak: 0, loggedDates: [] };
  }
}

// Manually set or adjust the streak start date by the student
export function setStreakStartDate(startDateStr: string): StreakData {
  const streak = getStreak();
  streak.startDate = startDateStr;
  if (!streak.loggedDates.includes(startDateStr)) {
    streak.loggedDates.push(startDateStr);
  }
  if (streak.currentStreak === 0) {
    streak.currentStreak = 1;
    streak.lastDate = startDateStr;
  }
  localStorage.setItem(STORAGE_KEYS.STREAK, JSON.stringify(streak));
  return streak;
}

// Record a manual study day log by the student
export function logManualStudyDate(dateStr: string): StreakData {
  const streak = getStreak();
  if (!streak.startDate) {
    streak.startDate = dateStr;
  }
  if (!streak.loggedDates.includes(dateStr)) {
    streak.loggedDates.push(dateStr);
    streak.loggedDates.sort();
  }
  streak.lastDate = dateStr;
  streak.currentStreak = streak.loggedDates.length;
  localStorage.setItem(STORAGE_KEYS.STREAK, JSON.stringify(streak));
  return streak;
}

export function updateStreak(): StreakData {
  const today = formatDate(new Date());
  const streak = getStreak();

  if (!streak.loggedDates.includes(today)) {
    streak.loggedDates.push(today);
    streak.loggedDates.sort();
  }
  if (!streak.startDate) {
    streak.startDate = today;
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yStr = formatDate(yesterday);

  if (streak.lastDate === today) {
    // Already updated today
    return streak;
  } else if (streak.lastDate === yStr) {
    streak.currentStreak = (streak.currentStreak || 0) + 1;
  } else if (!streak.lastDate) {
    streak.currentStreak = 1;
  } else {
    // Check if consecutive from logged dates
    streak.currentStreak = Math.max(1, streak.currentStreak);
  }

  streak.lastDate = today;
  localStorage.setItem(STORAGE_KEYS.STREAK, JSON.stringify(streak));
  return streak;
}

// VTU CBCS Credit Structure (2025-2026 Scheme, 1st Year)
export interface VTUCourseCredit {
  code: string;
  title: string;
  credits: number;
  type: 'Theory' | 'Integrated' | 'Lab' | 'AEC';
  cieMarksMax: number;
  seeMarksMax: number;
}

export const VTU_FIRST_YEAR_COURSES: VTUCourseCredit[] = [
  { code: '1BMATS101', title: 'Calculus and Linear Algebra (MAT)', credits: 4, type: 'Theory', cieMarksMax: 50, seeMarksMax: 50 },
  { code: '1BPHYS102', title: 'Quantum Physics & Semiconductor Devices', credits: 4, type: 'Integrated', cieMarksMax: 50, seeMarksMax: 50 },
  { code: '1BCEDS103', title: 'Computer-Aided Engg Drawing (CAED)', credits: 3, type: 'Theory', cieMarksMax: 50, seeMarksMax: 50 },
  { code: '1BESC104A', title: 'Building Sciences & Mechanics (BSM)', credits: 3, type: 'Theory', cieMarksMax: 50, seeMarksMax: 50 },
  { code: '1BEIT105', title: 'Programming in C (PIC)', credits: 3, type: 'Theory', cieMarksMax: 50, seeMarksMax: 50 },
  { code: '1BSKS106', title: 'Soft Skills (SS)', credits: 1, type: 'AEC', cieMarksMax: 50, seeMarksMax: 50 },
  { code: '1BPOPL107', title: 'Programming Laboratory (C Lab)', credits: 1, type: 'Lab', cieMarksMax: 50, seeMarksMax: 50 },
  { code: '1BIDTL158', title: 'Innovation & Design Thinking Lab (IDTL)', credits: 1, type: 'Lab', cieMarksMax: 50, seeMarksMax: 50 },
  { code: '1BKSK/BK109', title: 'Samskrutika / Balake Kannada', credits: 1, type: 'AEC', cieMarksMax: 50, seeMarksMax: 50 },
];

export const TOTAL_VTU_SEMESTER_CREDITS = 21;

// Grade Point mapping according to VTU regulations
export const VTU_GRADE_POINTS: Record<string, { grade: string; points: number; markRange: string }> = {
  O: { grade: 'O (Outstanding)', points: 10, markRange: '90 - 100%' },
  'A+': { grade: 'A+ (Excellent)', points: 9, markRange: '80 - 89%' },
  A: { grade: 'A (Very Good)', points: 8, markRange: '70 - 79%' },
  'B+': { grade: 'B+ (Good)', points: 7, markRange: '60 - 69%' },
  B: { grade: 'B (Above Average)', points: 6, markRange: '55 - 59%' },
  C: { grade: 'C (Average)', points: 5, markRange: '50 - 54%' },
  P: { grade: 'P (Pass)', points: 4, markRange: '40 - 49%' },
  F: { grade: 'F (Fail)', points: 0, markRange: '< 40%' },
};

export function calculateSGPA(grades: Array<{ credits: number; points: number }>): number {
  const totalCredits = grades.reduce((acc, cur) => acc + cur.credits, 0);
  if (totalCredits === 0) return 0;
  const weightedSum = grades.reduce((acc, cur) => acc + cur.credits * cur.points, 0);
  return Number((weightedSum / totalCredits).toFixed(2));
}

export function resetAllData() {
  localStorage.clear();
  localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(DEFAULT_PROGRESS));
  localStorage.setItem(STORAGE_KEYS.DOUBTS, JSON.stringify(DEFAULT_DOUBTS));
  localStorage.setItem(STORAGE_KEYS.EXAM_GOALS, JSON.stringify(DEFAULT_EXAM_GOALS));
  localStorage.setItem(STORAGE_KEYS.TIMETABLE, JSON.stringify(OFFICIAL_TIMETABLES['AI/ML']));
  localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(DEFAULT_PROFILE));
}

// Aliases for intuitive caller API
export const loadProgressMap = getStoredProgress;
export const saveProgressMap = saveStoredProgress;
export const loadUserProfile = getStoredProfile;
export const saveUserProfile = saveStoredProfile;
export const loadDoubts = getStoredDoubts;
export const saveDoubts = saveStoredDoubts;
export const loadExamGoals = getStoredExamGoals;
export const saveExamGoals = saveStoredExamGoals;
export const loadTimetable = getStoredTimetable;
export const saveTimetable = saveStoredTimetable;
export const clearAllProgress = resetAllData;

export function getStudyStreak(): number {
  return getStreak().currentStreak;
}

export function getDueRevisions(
  subjects: any[],
  progressMap: { [subtopicId: string]: TopicProgress }
): Array<{
  subtopicId: string;
  subtopicTitle: string;
  subjectName: string;
  moduleNumber: number;
  completedDate?: string;
}> {
  const today = formatDate(new Date());
  const due: Array<{
    subtopicId: string;
    subtopicTitle: string;
    subjectName: string;
    moduleNumber: number;
    completedDate?: string;
  }> = [];

  subjects.forEach((sub) => {
    sub.modules.forEach((m: any) => {
      m.topics.forEach((t: any) => {
        t.subtopics.forEach((st: any) => {
          const p = progressMap[st.id];
          if (!p) return;
          if (p.revisionDates && p.revisionDates.length > 0) {
            const nextDate = p.revisionDates[0];
            if (nextDate <= today) {
              due.push({
                subtopicId: st.id,
                subtopicTitle: st.title,
                subjectName: sub.shortName,
                moduleNumber: m.moduleNumber,
                completedDate: p.completedDate,
              });
            }
          }
        });
      });
    });
  });

  return due;
}

export function recordRevisionDone(subtopicId: string): TopicProgress {
  const current = getStoredProgress();
  const existing = current[subtopicId] || {
    subtopicId,
    status: 'completed' as const,
    timeSpentMinutes: 0,
    revisionsCompleted: 0,
    revisionDates: [],
  };

  const completedCount = (existing.revisionsCompleted || 0) + 1;
  const remainingDates = existing.revisionDates ? [...existing.revisionDates] : [];
  remainingDates.shift();

  // If no remaining dates, add next interval
  if (remainingDates.length === 0 && completedCount < 5) {
    const nextIntervalDays = [1, 3, 7, 14, 30][completedCount] || 30;
    const nextD = new Date();
    nextD.setDate(nextD.getDate() + nextIntervalDays);
    remainingDates.push(formatDate(nextD));
  }

  const updated: TopicProgress = {
    ...existing,
    revisionsCompleted: completedCount,
    revisionDates: remainingDates,
    lastRevisionDate: formatDate(new Date()),
  };

  current[subtopicId] = updated;
  saveStoredProgress(current);
  updateStreak();
  return updated;
}
