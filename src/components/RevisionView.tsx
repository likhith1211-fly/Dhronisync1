import React, { useState } from 'react';
import {
  RotateCcw,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  Clock,
  Sparkles,
  ArrowRight,
  BrainCircuit,
  Check
} from 'lucide-react';
import { Subject, TopicProgress } from '../types';
import { formatDate, formatReadableDate, recordRevisionDone } from '../utils/storage';

interface RevisionViewProps {
  subjects: Subject[];
  progressMap: { [subtopicId: string]: TopicProgress };
  onRefreshProgress: () => void;
  onOpenStudyMode: (subtopicId: string) => void;
  onQuizWithAI: (subtopicTitle: string, subjectName: string) => void;
}

export const RevisionView: React.FC<RevisionViewProps> = ({
  subjects,
  progressMap,
  onRefreshProgress,
  onOpenStudyMode,
  onQuizWithAI,
}) => {
  const [tab, setTab] = useState<'due' | 'upcoming' | 'completed'>('due');

  const todayStr = formatDate(new Date());

  // Find all subtopics with active revision dates
  const subtopicLookup: {
    [id: string]: {
      title: string;
      subjectName: string;
      moduleNumber: number;
    };
  } = {};

  subjects.forEach((sub) => {
    sub.modules.forEach((m) => {
      m.topics.forEach((t) => {
        t.subtopics.forEach((st) => {
          subtopicLookup[st.id] = {
            title: st.title,
            subjectName: sub.shortName,
            moduleNumber: m.moduleNumber,
          };
        });
      });
    });
  });

  interface RevisionItem {
    subtopicId: string;
    subtopicTitle: string;
    subjectName: string;
    moduleNumber: number;
    nextDate: string;
    isDue: boolean;
    isOverdue: boolean;
    revisionsDone: number;
    completedDate?: string;
  }

  const dueItems: RevisionItem[] = [];
  const upcomingItems: RevisionItem[] = [];
  const allCompletedRevisions: Array<{
    subtopicId: string;
    subtopicTitle: string;
    subjectName: string;
    revisionsDone: number;
  }> = [];

  Object.entries(progressMap).forEach(([subtopicId, prog]: [string, TopicProgress]) => {
    const meta = subtopicLookup[subtopicId];
    if (!meta) return;

    if (prog.revisionDates && prog.revisionDates.length > 0) {
      const nextDate = prog.revisionDates[0];
      const isDue = nextDate <= todayStr;
      const isOverdue = nextDate < todayStr;

      const item: RevisionItem = {
        subtopicId,
        subtopicTitle: meta.title,
        subjectName: meta.subjectName,
        moduleNumber: meta.moduleNumber,
        nextDate,
        isDue,
        isOverdue,
        revisionsDone: prog.revisionsCompleted || 0,
        completedDate: prog.completedDate,
      };

      if (isDue) {
        dueItems.push(item);
      } else {
        upcomingItems.push(item);
      }
    } else if (prog.status === 'completed' && (prog.revisionsCompleted || 0) >= 5) {
      allCompletedRevisions.push({
        subtopicId,
        subtopicTitle: meta.title,
        subjectName: meta.subjectName,
        revisionsDone: prog.revisionsCompleted || 5,
      });
    }
  });

  const handleMarkDone = (subtopicId: string) => {
    recordRevisionDone(subtopicId);
    onRefreshProgress();
  };

  const [showAlgorithmGuide, setShowAlgorithmGuide] = useState<boolean>(true);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200/80 rounded-[28px] p-6 sm:p-7 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="space-y-1.5">
          <div className="flex items-center space-x-2 text-indigo-600 text-xs font-bold uppercase tracking-wider">
            <RotateCcw className="w-4 h-4" />
            <span>Spaced Repetition Algorithm</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">VTU Revision Master</h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl leading-relaxed">
            Based on the Ebbinghaus forgetting curve. Revising at Day 1, 3, 7, 14, and 30 cements engineering formulas permanently into long-term memory.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={() => setShowAlgorithmGuide(!showAlgorithmGuide)}
            className="px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold border border-indigo-200 transition-colors cursor-pointer"
          >
            {showAlgorithmGuide ? 'Hide How It Works' : 'Show How It Works'}
          </button>
          <div className="bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-200/80 text-center">
            <div className="text-xl font-bold text-amber-600">{dueItems.length}</div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Due Today</div>
          </div>
          <div className="bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-200/80 text-center">
            <div className="text-xl font-bold text-indigo-600">{upcomingItems.length}</div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Upcoming</div>
          </div>
        </div>
      </div>

      {/* Visual Explanation Card: How Revision Master Works */}
      {showAlgorithmGuide && (
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-[28px] p-6 sm:p-7 border border-indigo-900 shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-indigo-800/80 pb-4">
            <div>
              <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">
                Creator & Student System Guide
              </span>
              <h2 className="text-lg font-bold text-white">How the VTU Revision Master Algorithm Works</h2>
            </div>
            <span className="text-xs px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 rounded-full">
              Hermann Ebbinghaus Memory Model
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-1">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <div className="text-xs font-bold text-amber-400">Interval 1: Day 1</div>
              <div className="text-[11px] text-slate-300 font-medium">Within 24 Hours</div>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                Humans forget ~70% of new engineering concepts in 24 hours. A quick 5-min review arrests the drop immediately.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <div className="text-xs font-bold text-indigo-300">Interval 2: Day 3</div>
              <div className="text-[11px] text-slate-300 font-medium">After 72 Hours</div>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                Consolidates formulas across multiple sleep cycles. Strengthens neural connections in the brain.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <div className="text-xs font-bold text-cyan-300">Interval 3: Day 7</div>
              <div className="text-[11px] text-slate-300 font-medium">1 Week Later</div>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                Transitions knowledge from short-term working memory to medium-term associative memory.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <div className="text-xs font-bold text-purple-300">Interval 4: Day 14</div>
              <div className="text-[11px] text-slate-300 font-medium">2 Weeks Later</div>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                Active recall test: Solve derivation or write code without looking at notes. High cognitive resistance test.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <div className="text-xs font-bold text-emerald-400">Interval 5: Day 30</div>
              <div className="text-[11px] text-slate-300 font-medium">1 Month (Final)</div>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                Locks topic into permanent long-term memory. Ready for VTU SEE and IA exams without last-night panic.
              </p>
            </div>
          </div>

          <div className="bg-indigo-950/80 p-4 rounded-2xl border border-indigo-800 text-xs text-indigo-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="font-bold text-white">How it connects to Syllabus Ticks:</span>
              <p className="text-[11px] text-indigo-300">
                When a student marks a topic <strong>Green (Completed)</strong> in the syllabus, the app automatically calculates these 5 target dates. When today's date reaches any interval, the topic turns <strong>🔔 Due Today</strong>!
              </p>
            </div>
            <div className="shrink-0 font-mono text-[11px] text-emerald-300 bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-800">
              5/5 Revisions = "Mastered" Status
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center space-x-2 bg-white border border-slate-200 p-1.5 rounded-2xl max-w-md shadow-2xs">
        <button
          onClick={() => setTab('due')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
            tab === 'due'
              ? 'bg-amber-50 text-amber-800 border border-amber-200 font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <span>Due Today ({dueItems.length})</span>
        </button>
        <button
          onClick={() => setTab('upcoming')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
            tab === 'upcoming'
              ? 'bg-indigo-50 text-indigo-700 border border-indigo-100 font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <span>Upcoming ({upcomingItems.length})</span>
        </button>
        <button
          onClick={() => setTab('completed')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
            tab === 'completed'
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <span>Mastered ({allCompletedRevisions.length})</span>
        </button>
      </div>

      {/* Content */}
      {tab === 'due' && (
        <div className="space-y-4">
          {dueItems.length === 0 ? (
            <div className="p-12 text-center bg-white border border-slate-200/80 rounded-[28px] space-y-2.5 shadow-sm">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">All caught up! No revisions due today.</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Whenever you complete new topics in the syllabus, their spaced repetition dates will automatically populate here.
              </p>
            </div>
          ) : (
            dueItems.map((item) => (
              <div
                key={item.subtopicId}
                className="bg-white border border-amber-200 rounded-[28px] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
              >
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold border border-amber-300">
                      {item.isOverdue ? '⚠️ Overdue' : '🔔 Due Today'}
                    </span>
                    <span className="text-xs font-bold text-indigo-700">{item.subjectName}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs text-slate-500">Mod {item.moduleNumber}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs text-slate-500">
                      Rev #{item.revisionsDone + 1} of 5
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{item.subtopicTitle}</h3>
                  <div className="text-xs text-slate-400 flex items-center space-x-2">
                    <span>Scheduled for: {formatReadableDate(item.nextDate)}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                  <button
                    onClick={() => onQuizWithAI(item.subtopicTitle, item.subjectName)}
                    className="px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Quick Recall Quiz</span>
                  </button>

                  <button
                    onClick={() => onOpenStudyMode(item.subtopicId)}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer"
                  >
                    <BrainCircuit className="w-3.5 h-3.5 text-slate-600" />
                    <span>Open Study Mode</span>
                  </button>

                  <button
                    onClick={() => handleMarkDone(item.subtopicId)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center space-x-1.5 shadow-xs transition-all cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>Done Revising</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {tab === 'upcoming' && (
        <div className="space-y-3">
          {upcomingItems.length === 0 ? (
            <div className="p-10 text-center bg-white border border-slate-200/80 rounded-[28px] text-xs text-slate-400">
              No upcoming revisions scheduled.
            </div>
          ) : (
            upcomingItems.map((item) => (
              <div
                key={item.subtopicId}
                className="bg-white border border-slate-200/80 rounded-[24px] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="font-bold text-indigo-600">{item.subjectName}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-500">Mod {item.moduleNumber}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-500">Rev #{item.revisionsDone + 1} of 5</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-800">{item.subtopicTitle}</h4>
                </div>

                <div className="flex items-center space-x-4 text-xs text-slate-500">
                  <div className="flex items-center space-x-1.5">
                    <Calendar className="w-4 h-4 text-indigo-500" />
                    <span className="font-bold text-slate-700">
                      {formatReadableDate(item.nextDate)}
                    </span>
                  </div>
                  <button
                    onClick={() => handleMarkDone(item.subtopicId)}
                    className="text-xs text-indigo-600 hover:underline font-bold cursor-pointer"
                  >
                    Mark Early ✓
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {tab === 'completed' && (
        <div className="space-y-3">
          {allCompletedRevisions.length === 0 ? (
            <div className="p-10 text-center bg-white border border-slate-200/80 rounded-[28px] text-xs text-slate-400">
              Complete all 5 spaced revisions for a topic to achieve Mastered status!
            </div>
          ) : (
            allCompletedRevisions.map((item) => (
              <div
                key={item.subtopicId}
                className="bg-white border border-emerald-200 rounded-[24px] p-5 flex items-center justify-between shadow-xs"
              >
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-emerald-700">{item.subjectName}</div>
                  <h4 className="text-sm font-bold text-slate-900">{item.subtopicTitle}</h4>
                </div>
                <div className="flex items-center space-x-2 text-emerald-700 text-xs font-bold bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>5/5 Revisions Mastered</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
