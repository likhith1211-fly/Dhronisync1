import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, BrainCircuit } from 'lucide-react';
import { VTU_SYLLABUS_DATA } from './data/vtuSyllabus';
import {
  Subject,
  Module,
  Topic,
  Subtopic,
  TopicProgress,
  UserProfile,
  DoubtItem,
  ExamGoal,
  TimetableSlot,
  SubtopicStatus
} from './types';
import {
  loadProgressMap,
  saveProgressMap,
  updateSubtopicStatus,
  updateSubtopicProgress,
  loadUserProfile,
  saveUserProfile,
  loadDoubts,
  saveDoubts,
  loadExamGoals,
  saveExamGoals,
  loadTimetable,
  saveTimetable,
  getStudyStreak,
  getDueRevisions,
  formatDate
} from './utils/storage';

import { Navbar } from './components/Navbar';
import { Sidebar, ActiveTab } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { SyllabusView } from './components/SyllabusView';
import { StudyModeModal } from './components/StudyModeModal';
import { GeminiAssistantView } from './components/GeminiAssistantView';
import { DoubtTrackerView } from './components/DoubtTrackerView';
import { RevisionView } from './components/RevisionView';
import { ExamPrepView } from './components/ExamPrepView';
import { TimetableCalendarView } from './components/TimetableCalendarView';
import { AnalyticsView } from './components/AnalyticsView';
import { ProfileModal } from './components/ProfileModal';
import { CreatorView } from './components/CreatorView';

export default function App() {
  // Main state
  const [profile, setProfile] = useState<UserProfile>(loadUserProfile());
  const [activeSemester, setActiveSemester] = useState<1 | 2>(profile.currentSemester || 1);
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Persistence maps
  const [progressMap, setProgressMap] = useState<{ [subtopicId: string]: TopicProgress }>(
    loadProgressMap()
  );
  const [doubts, setDoubts] = useState<DoubtItem[]>(loadDoubts());
  const [examGoals, setExamGoals] = useState<ExamGoal[]>(loadExamGoals());
  const [timetable, setTimetable] = useState<TimetableSlot[]>(loadTimetable());

  // Streak & Due Revisions
  const [streakDays, setStreakDays] = useState<number>(getStudyStreak());
  const [dueRevisions, setDueRevisions] = useState<any[]>([]);

  // Modals & Contextual states
  const [activeStudyTarget, setActiveStudyTarget] = useState<{
    subject: Subject;
    module: Module;
    topic: Topic;
    subtopic: Subtopic;
  } | null>(null);

  const [geminiContext, setGeminiContext] = useState<{
    subject?: Subject;
    module?: Module;
    topic?: Topic;
    subtopic?: Subtopic;
  } | undefined>(undefined);

  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);

  // Sync revisions & streak whenever progressMap updates
  useEffect(() => {
    setDueRevisions(getDueRevisions(VTU_SYLLABUS_DATA, progressMap));
    setStreakDays(getStudyStreak());
  }, [progressMap]);

  // Helper to find full entity hierarchy by subtopicId
  const findEntitiesBySubtopicId = (subtopicId: string) => {
    for (const sub of VTU_SYLLABUS_DATA) {
      for (const mod of sub.modules) {
        for (const top of mod.topics) {
          for (const st of top.subtopics) {
            if (st.id === subtopicId) {
              return { subject: sub, module: mod, topic: top, subtopic: st };
            }
          }
        }
      }
    }
    return null;
  };

  // Status updates from Syllabus View
  const handleUpdateStatus = (subtopicId: string, newStatus: SubtopicStatus) => {
    const updated = updateSubtopicStatus(subtopicId, newStatus);
    setProgressMap((prev) => ({
      ...prev,
      [subtopicId]: updated,
    }));
  };

  // Open Study Mode
  const handleOpenStudyMode = (
    subject: Subject,
    module: Module,
    topic: Topic,
    subtopic: Subtopic
  ) => {
    setActiveStudyTarget({ subject, module, topic, subtopic });
  };

  const handleOpenStudyModeById = (subtopicId: string) => {
    const found = findEntitiesBySubtopicId(subtopicId);
    if (found) {
      setActiveStudyTarget(found);
    }
  };

  // Open Gemini with Syllabus context
  const handleAskGeminiContext = (
    subject: Subject,
    module: Module,
    topic: Topic,
    subtopic: Subtopic
  ) => {
    setGeminiContext({ subject, module, topic, subtopic });
    setActiveTab('gemini');
  };

  // Save doubt from anywhere (Study Mode, Gemini, or Doubt View)
  const handleAddDoubt = (newDoubtData: Omit<DoubtItem, 'id' | 'createdAt'>) => {
    const newDoubt: DoubtItem = {
      ...newDoubtData,
      id: `doubt-${Date.now()}`,
      createdAt: formatDate(new Date()),
    };
    const updated = [newDoubt, ...doubts];
    setDoubts(updated);
    saveDoubts(updated);
  };

  const handleResolveDoubt = (doubtId: string, answer?: string) => {
    const updated = doubts.map((d) =>
      d.id === doubtId ? { ...d, status: 'resolved' as const, answer: answer || d.answer } : d
    );
    setDoubts(updated);
    saveDoubts(updated);
  };

  const handleDeleteDoubt = (doubtId: string) => {
    const updated = doubts.filter((d) => d.id !== doubtId);
    setDoubts(updated);
    saveDoubts(updated);
  };

  // Timetable
  const handleAddTimetableSlot = (slotData: Omit<TimetableSlot, 'id'>) => {
    const newSlot: TimetableSlot = {
      ...slotData,
      id: `slot-${Date.now()}`,
    };
    const updated = [...timetable, newSlot];
    setTimetable(updated);
    saveTimetable(updated);
  };

  const handleDeleteTimetableSlot = (id: string) => {
    const updated = timetable.filter((s) => s.id !== id);
    setTimetable(updated);
    saveTimetable(updated);
  };

  const handleSaveProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
    saveUserProfile(newProfile);
  };

  const unresolvedDoubtsCount = doubts.filter((d) => d.status === 'unresolved').length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col selection:bg-indigo-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        profile={profile}
        activeSemester={activeSemester}
        onSelectSemester={setActiveSemester}
        streakDays={streakDays}
        dueRevisionsCount={dueRevisions.length}
        onOpenRevisions={() => setActiveTab('revisions')}
        onOpenGemini={() => setActiveTab('gemini')}
        onOpenProfile={() => setIsProfileModalOpen(true)}
      />

      {/* Mobile Top Sub-bar */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200/80 text-xs">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center space-x-2 text-slate-700 hover:text-slate-900 font-semibold cursor-pointer"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5 text-indigo-600" /> : <Menu className="w-5 h-5 text-indigo-600" />}
          <span className="capitalize">{activeTab.replace('_', ' ')}</span>
        </button>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab('gemini')}
            className="px-3 py-1.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-xl text-xs font-bold flex items-center space-x-1 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Tutor</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Left Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          dueRevisionsCount={dueRevisions.length}
          unresolvedDoubtsCount={unresolvedDoubtsCount}
          isMobileOpen={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />

        {/* Main Content Area */}
        <main className="flex-1 lg:pl-64 p-4 sm:p-6 lg:p-8 min-w-0">
          {activeTab === 'dashboard' && (
            <DashboardView
              profile={profile}
              activeSemester={activeSemester}
              subjects={VTU_SYLLABUS_DATA}
              progressMap={progressMap}
              streakDays={streakDays}
              dueRevisions={dueRevisions}
              examGoals={examGoals}
              onNavigateToSyllabus={(subjectId) => {
                setActiveTab('syllabus');
              }}
              onNavigateToStudyMode={(subtopicId) => {
                handleOpenStudyModeById(subtopicId);
              }}
              onNavigateToGemini={() => setActiveTab('gemini')}
              onNavigateToRevisions={() => setActiveTab('revisions')}
              onNavigateToExamPrep={() => setActiveTab('exam_prep')}
              onNavigateToTimetable={() => setActiveTab('timetable')}
              onNavigateToAnalytics={() => setActiveTab('analytics')}
              onRefreshStreak={() => setStreakDays(getStudyStreak())}
            />
          )}

          {activeTab === 'syllabus' && (
            <SyllabusView
              subjects={VTU_SYLLABUS_DATA}
              activeSemester={activeSemester}
              progressMap={progressMap}
              onUpdateStatus={handleUpdateStatus}
              onUpdateProgressDetails={(subtopicId, details) => {
                const updated = updateSubtopicProgress(subtopicId, details);
                setProgressMap((prev) => ({
                  ...prev,
                  [subtopicId]: updated,
                }));
              }}
              onOpenStudyMode={handleOpenStudyMode}
              onAskGeminiContext={handleAskGeminiContext}
            />
          )}

          {activeTab === 'study_mode' && (
            <div className="space-y-6">
              <div className="bg-white border border-slate-200/80 rounded-[28px] p-6 sm:p-7 shadow-sm">
                <div className="flex items-center space-x-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1.5">
                  <BrainCircuit className="w-4 h-4" />
                  <span>Focused Deep Study Mode</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Dedicated Topic Study Environment</h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
                  Select any topic below or directly from the VTU Syllabus to enter focused learning with live focus timers, interactive checklists, personal notes, and contextual Gemini AI tutoring.
                </p>

                <div className="pt-4 flex flex-wrap gap-2.5">
                  <button
                    onClick={() => handleOpenStudyModeById('st-m1-1')}
                    className="px-4 py-2 rounded-xl bg-slate-50 hover:bg-indigo-50 text-xs font-semibold text-slate-700 hover:text-indigo-700 border border-slate-200 hover:border-indigo-200 flex items-center space-x-1.5 transition-all cursor-pointer shadow-2xs"
                  >
                    <span>📐 Polar Coordinates (Maths-I)</span>
                  </button>
                  <button
                    onClick={() => handleOpenStudyModeById('st-c-1')}
                    className="px-4 py-2 rounded-xl bg-slate-50 hover:bg-indigo-50 text-xs font-semibold text-slate-700 hover:text-indigo-700 border border-slate-200 hover:border-indigo-200 flex items-center space-x-1.5 transition-all cursor-pointer shadow-2xs"
                  >
                    <span>💻 C Program Structure & Compilation</span>
                  </button>
                  <button
                    onClick={() => handleOpenStudyModeById('st-ec-2')}
                    className="px-4 py-2 rounded-xl bg-slate-50 hover:bg-indigo-50 text-xs font-semibold text-slate-700 hover:text-indigo-700 border border-slate-200 hover:border-indigo-200 flex items-center space-x-1.5 transition-all cursor-pointer shadow-2xs"
                  >
                    <span>⚡ Zener Diode Voltage Regulator</span>
                  </button>
                  <button
                    onClick={() => handleOpenStudyModeById('st-phys-1')}
                    className="px-4 py-2 rounded-xl bg-slate-50 hover:bg-indigo-50 text-xs font-semibold text-slate-700 hover:text-indigo-700 border border-slate-200 hover:border-indigo-200 flex items-center space-x-1.5 transition-all cursor-pointer shadow-2xs"
                  >
                    <span>🔬 Laser Principles & Einstein's Coeffs</span>
                  </button>
                </div>
              </div>

              {/* Embedded Syllabus selector */}
              <SyllabusView
                subjects={VTU_SYLLABUS_DATA}
                activeSemester={activeSemester}
                progressMap={progressMap}
                onUpdateStatus={handleUpdateStatus}
                onUpdateProgressDetails={(subtopicId, details) => {
                  const updated = updateSubtopicProgress(subtopicId, details);
                  setProgressMap((prev) => ({
                    ...prev,
                    [subtopicId]: updated,
                  }));
                }}
                onOpenStudyMode={handleOpenStudyMode}
                onAskGeminiContext={handleAskGeminiContext}
              />
            </div>
          )}

          {activeTab === 'gemini' && (
            <GeminiAssistantView
              subjects={VTU_SYLLABUS_DATA}
              activeSemester={activeSemester}
              initialContext={geminiContext}
              onSaveDoubt={handleAddDoubt}
              onSaveNoteToTopic={(subtopicId, note) => {
                setProgressMap((prev) => ({
                  ...prev,
                  [subtopicId]: { ...prev[subtopicId], notes: note },
                }));
              }}
            />
          )}

          {activeTab === 'revisions' && (
            <RevisionView
              subjects={VTU_SYLLABUS_DATA}
              progressMap={progressMap}
              onRefreshProgress={() => setProgressMap(loadProgressMap())}
              onOpenStudyMode={handleOpenStudyModeById}
              onQuizWithAI={(topicTitle, subjectName) => {
                const found = VTU_SYLLABUS_DATA.find((s) => s.shortName === subjectName);
                setGeminiContext({ subject: found });
                setActiveTab('gemini');
              }}
            />
          )}

          {activeTab === 'exam_prep' && (
            <ExamPrepView
              subjects={VTU_SYLLABUS_DATA}
              activeSemester={activeSemester}
              examGoals={examGoals}
              progressMap={progressMap}
              onOpenStudyMode={handleOpenStudyModeById}
              onAskGeminiStrategy={(examTitle, subjectName) => {
                setActiveTab('gemini');
              }}
              onUpdateExamGoals={(goals) => {
                setExamGoals(goals);
                saveExamGoals(goals);
              }}
            />
          )}

          {activeTab === 'doubts' && (
            <DoubtTrackerView
              doubts={doubts}
              subjects={VTU_SYLLABUS_DATA}
              onAddDoubt={handleAddDoubt}
              onResolveDoubt={handleResolveDoubt}
              onDeleteDoubt={handleDeleteDoubt}
            />
          )}

          {activeTab === 'timetable' && (
            <TimetableCalendarView
              timetable={timetable}
              subjects={VTU_SYLLABUS_DATA}
              activeBranch={profile.branch}
              onSwitchBranch={(b) => handleSaveProfile({ ...profile, branch: b })}
              onAddSlot={handleAddTimetableSlot}
              onDeleteSlot={handleDeleteTimetableSlot}
              onGenerateAIPlan={() => {
                setActiveTab('gemini');
              }}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsView
              subjects={VTU_SYLLABUS_DATA}
              activeSemester={activeSemester}
              progressMap={progressMap}
              streakDays={streakDays}
              profile={profile}
            />
          )}

          {activeTab === 'creator' && (
            <CreatorView onNavigateTab={(tab) => setActiveTab(tab)} />
          )}
        </main>
      </div>

      {/* Sleek Minimalist Footer with Corner Identity (Likhith.M.H - strictly no heart symbol) */}
      <footer className="py-4 border-t border-slate-200/80 bg-white text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-slate-700">VTU 1st-Year Academic Portal</span>
            <span>•</span>
            <span>2025–2026 Scheme</span>
            <span>•</span>
            <span className="text-indigo-600 font-medium">CSE-A, CSE-B & AI/ML Only</span>
          </div>

          <div className="flex items-center space-x-2 text-slate-600">
            <span className="text-slate-400">Curated & Managed:</span>
            <button
              onClick={() => setActiveTab('creator')}
              className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 font-bold text-slate-900 tracking-wide transition-colors cursor-pointer"
            >
              Likhith.M.H
            </button>
          </div>
        </div>
      </footer>

      {/* Global Study Mode Modal */}
      {activeStudyTarget && (
        <StudyModeModal
          subject={activeStudyTarget.subject}
          module={activeStudyTarget.module}
          topic={activeStudyTarget.topic}
          subtopic={activeStudyTarget.subtopic}
          progress={
            progressMap[activeStudyTarget.subtopic.id] || {
              subtopicId: activeStudyTarget.subtopic.id,
              status: 'not_started',
              timeSpentMinutes: 0,
              revisionDates: [],
              revisionsCompleted: 0,
            }
          }
          onClose={() => setActiveStudyTarget(null)}
          onProgressUpdated={(updated) => {
            setProgressMap((prev) => ({
              ...prev,
              [updated.subtopicId]: updated,
            }));
          }}
          onSaveDoubt={({ question, answer }) => {
            handleAddDoubt({
              subjectId: activeStudyTarget.subject.id,
              subjectName: activeStudyTarget.subject.shortName,
              topicId: activeStudyTarget.topic.id,
              topicTitle: activeStudyTarget.subtopic.title,
              question,
              answer,
              status: answer ? 'resolved' : 'unresolved',
            });
          }}
        />
      )}

      {/* Profile & Settings Modal */}
      {isProfileModalOpen && (
        <ProfileModal
          profile={profile}
          onSaveProfile={handleSaveProfile}
          onClose={() => setIsProfileModalOpen(false)}
        />
      )}
    </div>
  );
}
