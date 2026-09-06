export type SubtopicStatus = 'not_started' | 'in_progress' | 'completed';

export interface Subtopic {
  id: string;
  title: string;
  description: string;
  keyConcepts?: string[];
  estimatedMinutes?: number;
  importance?: 'High' | 'Medium' | 'Essential';
}

export interface Topic {
  id: string;
  title: string;
  description?: string;
  subtopics: Subtopic[];
}

export interface Module {
  id: string;
  moduleNumber: number;
  title: string;
  summary: string;
  hours?: number;
  topics: Topic[];
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  shortName: string;
  semester: 1 | 2;
  credits: number;
  category: 'Basic Science' | 'Engineering Science' | 'Emerging Technology' | 'Humanities & Social Sciences' | 'Skill Oriented' | 'Laboratory';
  stream?: 'CSE/AI-ML';
  description: string;
  iconName: string;
  modules: Module[];
}

export interface TopicProgress {
  subtopicId: string;
  status: SubtopicStatus;
  startedDate?: string;
  completedDate?: string; // Student completion date (can be entered manually)
  teacherCompletedDate?: string; // Teacher taught date (entered manually)
  teacherCompleted?: boolean;
  timeSpentMinutes: number;
  revisionDates?: string[];
  revisionsCompleted?: number;
  lastRevisionDate?: string;
  conceptUnderstood?: boolean;
  examplesSolved?: boolean;
  practiceCompleted?: boolean;
  notes?: string;
}

export interface DoubtItem {
  id: string;
  subjectId: string;
  subjectName: string;
  topicId: string;
  topicTitle: string;
  subtopicTitle?: string;
  question: string;
  answer?: string;
  status: 'unresolved' | 'resolved';
  createdAt: string;
  resolvedAt?: string;
}

export interface ExamGoal {
  id: string;
  title: string;
  date: string; // Target / Scheduled date (entered manually by student/teacher)
  scheduledDate?: string;
  isReminderSet?: boolean;
  reminderDaysBefore?: number;
  notes?: string;
  semester: 1 | 2;
  type?: 'IA-1' | 'IA-2' | 'SEE' | 'Lab Internals' | 'Model Exam' | 'Assignment' | 'Custom';
  targetSubjects?: string[];
  subjectModules?: {
    [subjectId: string]: number[]; // Module numbers included, e.g. [1, 2]
  };
}

export interface StreakInfo {
  currentStreak: number;
  startDate?: string;
  lastStudyDate?: string;
  loggedDates?: string[];
}

export type AllowedBranch = 'AI/ML' | 'CSE-A' | 'CSE-B';

export interface TimetableSlot {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  time: string;
  periodNumber?: number;
  subjectCode: string;
  subjectName: string;
  type: 'Lecture' | 'Lab' | 'Tutorial' | 'Self Study';
  room?: string;
  instructor?: string;
  instructorPhone?: string;
  branch?: AllowedBranch;
}

export interface UserProfile {
  name: string;
  usn: string;
  branch: AllowedBranch;
  division?: string;
  college: string;
  activeSemester: 1 | 2;
  dailyGoalMinutes: number;
}
