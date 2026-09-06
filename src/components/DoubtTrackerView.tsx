import React, { useState } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  Clock,
  Plus,
  Sparkles,
  Trash2,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Search
} from 'lucide-react';
import { DoubtItem, Subject } from '../types';
import { askGemini } from '../utils/geminiClient';

interface DoubtTrackerViewProps {
  doubts: DoubtItem[];
  subjects: Subject[];
  onAddDoubt: (doubt: Omit<DoubtItem, 'id' | 'createdAt'>) => void;
  onResolveDoubt: (doubtId: string, answer?: string) => void;
  onDeleteDoubt: (doubtId: string) => void;
}

export const DoubtTrackerView: React.FC<DoubtTrackerViewProps> = ({
  doubts,
  subjects,
  onAddDoubt,
  onResolveDoubt,
  onDeleteDoubt,
}) => {
  const [filter, setFilter] = useState<'all' | 'unresolved' | 'resolved'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isAdding, setIsAdding] = useState<boolean>(false);

  // New doubt form state
  const [newQuestion, setNewQuestion] = useState<string>('');
  const [newSubjectId, setNewSubjectId] = useState<string>(subjects[0]?.id || '');
  const [newTopicTitle, setNewTopicTitle] = useState<string>('');

  // Resolving with AI state
  const [aiSolvingId, setAiSolvingId] = useState<string | null>(null);
  const [expandedAnswers, setExpandedAnswers] = useState<{ [doubtId: string]: boolean }>({});

  const unresolvedCount = doubts.filter((d) => d.status === 'unresolved').length;
  const resolvedCount = doubts.filter((d) => d.status === 'resolved').length;

  const filteredDoubts = doubts.filter((d) => {
    if (filter === 'unresolved' && d.status !== 'unresolved') return false;
    if (filter === 'resolved' && d.status !== 'resolved') return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        (d.question || '').toLowerCase().includes(q) ||
        (d.subjectName || '').toLowerCase().includes(q) ||
        (d.topicTitle || '').toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleCreateDoubt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    const selectedSub = subjects.find((s) => s.id === newSubjectId);

    onAddDoubt({
      subjectId: newSubjectId,
      subjectName: selectedSub?.shortName || 'VTU Subject',
      topicId: 'custom-topic',
      topicTitle: newTopicTitle || 'General Theory',
      question: newQuestion.trim(),
      status: 'unresolved',
    });

    setNewQuestion('');
    setNewTopicTitle('');
    setIsAdding(false);
  };

  const handleAskGeminiToSolve = async (doubt: DoubtItem) => {
    setAiSolvingId(doubt.id);
    const res = await askGemini({
      prompt: `Please answer and clarify this specific academic doubt for VTU 1st Year Engineering student Likki:
"${doubt.question}"
Topic: ${doubt.topicTitle} in ${doubt.subjectName}.
Give a clear, definitive, exam-ready explanation with mathematical derivations or code if relevant.`,
      context: {
        subject: doubt.subjectName,
        topic: doubt.topicTitle,
        mode: 'doubt',
      },
    });

    setAiSolvingId(null);
    onResolveDoubt(doubt.id, res.text);
    setExpandedAnswers((prev) => ({ ...prev, [doubt.id]: true }));
  };

  const toggleExpand = (id: string) => {
    setExpandedAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      {/* Header & Stats Banner */}
      <div className="bg-white border border-slate-200/80 rounded-[28px] p-6 sm:p-7 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Doubt Management System
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Engineering Doubt Tracker</h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mt-1 leading-relaxed">
            Never leave a conceptual hurdle unresolved. Log your doubts while studying and let Gemini AI provide instant, step-by-step clarity.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <div className="bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-200/80 text-center">
            <div className="text-base font-bold text-amber-600">🟡 {unresolvedCount}</div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Unresolved</div>
          </div>
          <div className="bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-200/80 text-center">
            <div className="text-base font-bold text-emerald-600">🟢 {resolvedCount}</div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Resolved</div>
          </div>
          <button
            onClick={() => setIsAdding(true)}
            className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-bold flex items-center space-x-2 shadow-md shadow-indigo-100 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Doubt</span>
          </button>
        </div>
      </div>

      {/* Add Doubt Form Modal/Card */}
      {isAdding && (
        <form
          onSubmit={handleCreateDoubt}
          className="bg-white border border-slate-200 rounded-[28px] p-6 sm:p-7 space-y-4 shadow-xl"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <HelpCircle className="w-4 h-4 text-indigo-600" />
              <span>Log a New Engineering Doubt</span>
            </h3>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="text-xs text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs text-slate-600 font-semibold">Subject</label>
              <select
                value={newSubjectId}
                onChange={(e) => setNewSubjectId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs text-slate-800 font-medium"
              >
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.shortName} ({s.code})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-600 font-semibold">Topic / Concept</label>
              <input
                type="text"
                value={newTopicTitle}
                onChange={(e) => setNewTopicTitle(e.target.value)}
                placeholder="e.g. Gauss Elimination or Pointers in C"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-slate-600 font-semibold">What is your question / doubt?</label>
            <textarea
              rows={3}
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="e.g. Why do we need the condition rt - s² > 0 for maxima/minima in two variables?"
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-sans leading-relaxed"
              required
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
              Save Doubt
            </button>
          </div>
        </form>
      )}

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center space-x-1.5 bg-white border border-slate-200 p-1 rounded-2xl shadow-2xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            All Doubts ({doubts.length})
          </button>
          <button
            onClick={() => setFilter('unresolved')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 cursor-pointer ${
              filter === 'unresolved'
                ? 'bg-amber-50 text-amber-800 border border-amber-200 font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>🟡 Unresolved ({unresolvedCount})</span>
          </button>
          <button
            onClick={() => setFilter('resolved')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 cursor-pointer ${
              filter === 'resolved'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>🟢 Resolved ({resolvedCount})</span>
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search doubt question or topic..."
            className="w-full bg-white border border-slate-200 rounded-2xl pl-10 pr-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-2xs"
          />
        </div>
      </div>

      {/* Doubts List */}
      <div className="space-y-4">
        {filteredDoubts.length === 0 ? (
          <div className="p-10 text-center bg-white border border-slate-200/80 rounded-[28px] text-xs text-slate-400">
            No doubts found in this category. Click "Add Doubt" to log any engineering question!
          </div>
        ) : (
          filteredDoubts.map((doubt) => {
            const isResolved = doubt.status === 'resolved';
            const isExpanded = expandedAnswers[doubt.id] ?? false;
            const isSolving = aiSolvingId === doubt.id;

            return (
              <div
                key={doubt.id}
                className={`bg-white border rounded-[28px] p-6 space-y-4 transition-all shadow-sm ${
                  isResolved ? 'border-slate-200/80 hover:border-slate-300' : 'border-amber-200 bg-amber-50/30'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                          isResolved
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}
                      >
                        {isResolved ? '🟢 Resolved' : '🟡 Unresolved'}
                      </span>
                      <span className="text-xs font-bold text-slate-800">{doubt.subjectName}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs text-slate-500">{doubt.topicTitle}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {doubt.question}
                    </h3>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 shrink-0 self-end sm:self-start">
                    {!isResolved && (
                      <button
                        onClick={() => handleAskGeminiToSolve(doubt)}
                        disabled={isSolving}
                        className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center space-x-1.5 shadow-xs transition-all cursor-pointer"
                      >
                        {isSolving ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>Solving with AI...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Solve with AI</span>
                          </>
                        )}
                      </button>
                    )}

                    {doubt.answer && (
                      <button
                        onClick={() => toggleExpand(doubt.id)}
                        className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center space-x-1 transition-all cursor-pointer"
                      >
                        <span>{isExpanded ? 'Hide Solution' : 'View Solution'}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    )}

                    <button
                      onClick={() => onDeleteDoubt(doubt.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Delete Doubt"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Expanded Answer Box */}
                {(isExpanded || !isResolved) && doubt.answer && (
                  <div className="p-5 rounded-[22px] bg-indigo-950 text-indigo-100 border border-indigo-900 text-xs sm:text-sm space-y-2 shadow-sm">
                    <div className="flex items-center space-x-2 text-indigo-300 font-bold text-xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Gemini AI Solution / Explanation:</span>
                    </div>
                    <div className="whitespace-pre-wrap leading-relaxed font-sans text-indigo-100">
                      {doubt.answer}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
