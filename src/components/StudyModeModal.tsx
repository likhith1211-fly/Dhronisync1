import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  BookOpen,
  HelpCircle,
  Clock,
  Save,
  FileText,
  CheckSquare,
  Square,
  Layers,
  ChevronRight,
  Flame,
  AlertCircle,
  Copy,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Subject, Module, Topic, Subtopic, TopicProgress } from '../types';
import { askGemini } from '../utils/geminiClient';
import { updateSubtopicStatus, updateTopicDetails } from '../utils/storage';

interface StudyModeModalProps {
  subject: Subject;
  module: Module;
  topic: Topic;
  subtopic: Subtopic;
  progress: TopicProgress;
  onClose: () => void;
  onProgressUpdated: (updated: TopicProgress) => void;
  onSaveDoubt: (doubt: { question: string; answer?: string }) => void;
}

export const StudyModeModal: React.FC<StudyModeModalProps> = ({
  subject,
  module,
  topic,
  subtopic,
  progress,
  onClose,
  onProgressUpdated,
  onSaveDoubt,
}) => {
  // Timer state
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const timerRef = useRef<any>(null);

  // Checkbox states
  const [conceptUnderstood, setConceptUnderstood] = useState<boolean>(!!progress.conceptUnderstood);
  const [examplesSolved, setExamplesSolved] = useState<boolean>(!!progress.examplesSolved);
  const [practiceCompleted, setPracticeCompleted] = useState<boolean>(!!progress.practiceCompleted);
  const [notesText, setNotesText] = useState<string>(progress.notes || '');
  const [notesSavedAlert, setNotesSavedAlert] = useState<boolean>(false);

  // AI query & response states
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const [aiResponse, setAiResponse] = useState<string>('');
  const [aiMode, setAiMode] = useState<string>('');
  const [customAiQuery, setCustomAiQuery] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  // Timer loop
  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning]);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Checkbox toggles
  const handleToggleCheck = (field: 'concept' | 'examples' | 'practice') => {
    let newConcept = conceptUnderstood;
    let newExamples = examplesSolved;
    let newPractice = practiceCompleted;

    if (field === 'concept') newConcept = !conceptUnderstood;
    if (field === 'examples') newExamples = !examplesSolved;
    if (field === 'practice') newPractice = !practiceCompleted;

    setConceptUnderstood(newConcept);
    setExamplesSolved(newExamples);
    setPracticeCompleted(newPractice);

    const updated = updateTopicDetails(subtopic.id, {
      conceptUnderstood: newConcept,
      examplesSolved: newExamples,
      practiceCompleted: newPractice,
    });
    onProgressUpdated(updated);
  };

  // Mark Completed
  const handleMarkCompleted = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
    setConceptUnderstood(true);
    setExamplesSolved(true);
    setPracticeCompleted(true);
    const updated = updateSubtopicStatus(subtopic.id, 'completed');
    onProgressUpdated(updated);
  };

  // Save Notes
  const handleSaveNotes = () => {
    const updated = updateTopicDetails(subtopic.id, { notes: notesText });
    onProgressUpdated(updated);
    setNotesSavedAlert(true);
    setTimeout(() => setNotesSavedAlert(false), 3000);
  };

  // Handle Ask Gemini
  const handleAskAI = async (mode: string, customPrompt?: string) => {
    setAiLoading(true);
    setAiMode(mode);
    setAiResponse('');

    let prompt = '';
    if (mode === 'explain') {
      prompt = `Provide a clear, high-scoring explanation of the VTU topic: "${subtopic.title}" from ${subject.name} (Module ${module.moduleNumber}: ${module.title}). Include definition, working principle, and key exam derivation/diagram pointers.`;
    } else if (mode === 'beginner') {
      prompt = `Explain the VTU topic "${subtopic.title}" (${subject.name}) in extremely simple, intuitive language as if I am a complete beginner or first-year engineering student. Use a real-world analogy.`;
    } else if (mode === 'formulas') {
      prompt = `Provide a comprehensive formula cheat-sheet, key standard notations, and numerical constants for the VTU topic: "${subtopic.title}" (${subject.name}). Highlight which formula is most frequently asked in VTU semester exams.`;
    } else if (mode === 'examples') {
      prompt = `Provide 2 classic, step-by-step solved numerical or analytical examples on "${subtopic.title}" in ${subject.name} adhering to VTU exam marking scheme (8 to 10 marks format).`;
    } else if (mode === 'quiz') {
      prompt = `Generate 4 challenging Multiple Choice Questions (MCQs) with answers and brief explanations for the VTU topic "${subtopic.title}" in ${subject.name}.`;
    } else if (mode === 'practice') {
      prompt = `List 4 frequently asked VTU previous year questions (with year/marks indication like [7 Marks, Jan 2023]) on the topic "${subtopic.title}" from ${subject.name}.`;
    } else if (mode === 'viva') {
      prompt = `List 5 essential viva-voce and conceptual interview questions with concise answers on "${subtopic.title}" (${subject.name}).`;
    } else if (mode === 'mistake') {
      prompt = `What are the top 3 common mistakes and pitfalls engineering students make in VTU exams when solving or answering "${subtopic.title}"?`;
    } else if (mode === 'custom' && customPrompt) {
      prompt = `Regarding VTU 1st Year ${subject.name} (Module ${module.moduleNumber}, Topic "${subtopic.title}"): ${customPrompt}`;
    }

    try {
      const resp = await askGemini({
        prompt,
        context: {
          subject: subject.name,
          module: `Module ${module.moduleNumber}: ${module.title}`,
          topic: topic.title,
          subtopic: subtopic.title,
          mode: mode as any,
        },
      });
      setAiResponse(resp.text);
    } catch (err: any) {
      setAiResponse(`Sorry, an error occurred while connecting to Gemini AI: ${err.message}`);
    } finally {
      setAiLoading(false);
    }
  };

  const handleCopyAi = () => {
    navigator.clipboard.writeText(aiResponse);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddAsDoubt = () => {
    onSaveDoubt({
      question: `Doubt regarding ${subtopic.title} (${subject.shortName})`,
      answer: aiResponse || undefined,
    });
    alert('Doubt saved to your Doubt Tracker!');
  };

  const completionPercent =
    ([conceptUnderstood, examplesSolved, practiceCompleted].filter(Boolean).length / 3) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/40 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white border border-slate-200/80 w-full max-w-4xl rounded-[32px] shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header Bar */}
        <div className="p-5 sm:p-6 border-b border-slate-100 bg-white flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
              <span className="text-indigo-600 font-bold">{subject.code}</span>
              <ChevronRight className="w-3 h-3 text-slate-400" />
              <span>Mod {module.moduleNumber}</span>
              <ChevronRight className="w-3 h-3 text-slate-400" />
              <span className="truncate max-w-[200px] sm:max-w-[300px]">{topic.title}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center space-x-2.5">
              <span>{subtopic.title}</span>
              {progress.status === 'completed' && (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                  Completed 🟩
                </span>
              )}
            </h2>
          </div>

          <div className="flex items-center space-x-3">
            {/* Timer Box */}
            <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200/80 px-3.5 py-1.5 rounded-2xl text-slate-800 text-xs font-mono">
              <Clock className="w-3.5 h-3.5 text-indigo-600" />
              <span className="font-bold text-slate-900">{formatTimer(timerSeconds)}</span>
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="p-1 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors cursor-pointer"
                title={isTimerRunning ? 'Pause timer' : 'Start study timer'}
              >
                {isTimerRunning ? <Pause className="w-3.5 h-3.5 text-amber-600" /> : <Play className="w-3.5 h-3.5 text-emerald-600" />}
              </button>
              <button
                onClick={() => {
                  setIsTimerRunning(false);
                  setTimerSeconds(0);
                }}
                className="p-1 hover:text-slate-800 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors cursor-pointer"
                title="Reset timer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-2xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
          {/* Progress Bar & Description */}
          <div className="p-5 rounded-[24px] bg-slate-50 border border-slate-200/80 space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800 flex items-center space-x-1.5">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <span>Learning Checklist</span>
              </span>
              <span className="text-indigo-600 font-bold">{Math.round(completionPercent)}% Completed</span>
            </div>

            <div className="w-full h-2 bg-slate-200/80 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 transition-all duration-300 rounded-full"
                style={{ width: `${completionPercent}%` }}
              />
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{subtopic.description}</p>

            {/* Step Checkboxes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <button
                type="button"
                onClick={() => handleToggleCheck('concept')}
                className={`flex items-center space-x-3 p-3.5 rounded-2xl border text-left text-xs transition-all cursor-pointer ${
                  conceptUnderstood
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800 font-bold'
                    : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {conceptUnderstood ? <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" /> : <Square className="w-4 h-4 text-slate-400 shrink-0" />}
                <span>1. Understood Concept</span>
              </button>

              <button
                type="button"
                onClick={() => handleToggleCheck('examples')}
                className={`flex items-center space-x-3 p-3.5 rounded-2xl border text-left text-xs transition-all cursor-pointer ${
                  examplesSolved
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800 font-bold'
                    : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {examplesSolved ? <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" /> : <Square className="w-4 h-4 text-slate-400 shrink-0" />}
                <span>2. Solved Step Examples</span>
              </button>

              <button
                type="button"
                onClick={() => handleToggleCheck('practice')}
                className={`flex items-center space-x-3 p-3.5 rounded-2xl border text-left text-xs transition-all cursor-pointer ${
                  practiceCompleted
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800 font-bold'
                    : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {practiceCompleted ? <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" /> : <Square className="w-4 h-4 text-slate-400 shrink-0" />}
                <span>3. Completed Practice</span>
              </button>
            </div>

            {/* Mark as Completed Button */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/80">
              <span className="text-[11px] text-slate-500">
                Marking complete automatically schedules 5 spaced-repetition revision dates (Day 1, 3, 7, 14, 30).
              </span>
              <button
                id="btn-mark-topic-completed"
                onClick={handleMarkCompleted}
                className="flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-100 transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Mark Topic as Completed 🟩</span>
              </button>
            </div>
          </div>

          {/* AI Study Accelerator Chips */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Ask Gemini AI (Context: {subtopic.title})</span>
              </span>
              {aiLoading && <span className="text-xs text-indigo-600 font-semibold animate-pulse">Generating with Gemini...</span>}
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleAskAI('explain')}
                disabled={aiLoading}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-indigo-50 border border-slate-200 text-slate-700 hover:text-indigo-700 text-xs font-semibold transition-all shadow-2xs cursor-pointer"
              >
                📘 Explain Topic
              </button>
              <button
                onClick={() => handleAskAI('beginner')}
                disabled={aiLoading}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-indigo-50 border border-slate-200 text-slate-700 hover:text-indigo-700 text-xs font-semibold transition-all shadow-2xs cursor-pointer"
              >
                🐣 Explain Like I'm a Beginner
              </button>
              <button
                onClick={() => handleAskAI('formulas')}
                disabled={aiLoading}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-indigo-50 border border-slate-200 text-slate-700 hover:text-indigo-700 text-xs font-semibold transition-all shadow-2xs cursor-pointer"
              >
                📐 Formula Sheet
              </button>
              <button
                onClick={() => handleAskAI('examples')}
                disabled={aiLoading}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-indigo-50 border border-slate-200 text-slate-700 hover:text-indigo-700 text-xs font-semibold transition-all shadow-2xs cursor-pointer"
              >
                💡 Solved Examples
              </button>
              <button
                onClick={() => handleAskAI('practice')}
                disabled={aiLoading}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-indigo-50 border border-slate-200 text-slate-700 hover:text-indigo-700 text-xs font-semibold transition-all shadow-2xs cursor-pointer"
              >
                📝 VTU Exam Questions
              </button>
              <button
                onClick={() => handleAskAI('quiz')}
                disabled={aiLoading}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-indigo-50 border border-slate-200 text-slate-700 hover:text-indigo-700 text-xs font-semibold transition-all shadow-2xs cursor-pointer"
              >
                🎯 Quiz Me (4 MCQs)
              </button>
              <button
                onClick={() => handleAskAI('viva')}
                disabled={aiLoading}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-indigo-50 border border-slate-200 text-slate-700 hover:text-indigo-700 text-xs font-semibold transition-all shadow-2xs cursor-pointer"
              >
                🗣️ Viva Questions
              </button>
              <button
                onClick={() => handleAskAI('mistake')}
                disabled={aiLoading}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-indigo-50 border border-slate-200 text-slate-700 hover:text-indigo-700 text-xs font-semibold transition-all shadow-2xs cursor-pointer"
              >
                ⚡ Common Mistakes
              </button>
            </div>

            {/* Custom Query Input */}
            <div className="flex gap-2 pt-1">
              <input
                type="text"
                value={customAiQuery}
                onChange={(e) => setCustomAiQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && customAiQuery.trim()) {
                    handleAskAI('custom', customAiQuery);
                  }
                }}
                placeholder={`Ask any doubt regarding ${subtopic.title}...`}
                className="flex-1 bg-white border border-slate-200 rounded-2xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-2xs"
              />
              <button
                onClick={() => {
                  if (customAiQuery.trim()) handleAskAI('custom', customAiQuery);
                }}
                disabled={aiLoading || !customAiQuery.trim()}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold rounded-2xl transition-all shadow-xs cursor-pointer"
              >
                Ask
              </button>
            </div>
          </div>

          {/* AI Response Card */}
          {aiResponse && (
            <div className="p-6 rounded-[28px] bg-indigo-950 text-white border border-indigo-900 space-y-4 shadow-xl shadow-indigo-950/20">
              <div className="flex items-center justify-between border-b border-indigo-800 pb-3">
                <div className="flex items-center space-x-2 text-indigo-300 text-xs font-bold">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span>Gemini Tutor Output</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleCopyAi}
                    className="px-2.5 py-1.5 text-indigo-200 hover:text-white hover:bg-indigo-800 rounded-xl text-xs flex items-center space-x-1 cursor-pointer transition-colors"
                    title="Copy response"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span className="text-[11px] font-semibold">{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                  <button
                    onClick={handleAddAsDoubt}
                    className="px-2.5 py-1.5 text-indigo-200 hover:text-amber-300 hover:bg-indigo-800 rounded-xl text-xs flex items-center space-x-1 cursor-pointer transition-colors"
                    title="Save to Doubt Tracker"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-semibold">Save as Doubt</span>
                  </button>
                </div>
              </div>

              {/* Pre-wrap formatted text */}
              <div className="prose prose-invert prose-sm max-w-none text-xs sm:text-sm leading-relaxed font-sans whitespace-pre-wrap text-indigo-100">
                {aiResponse}
              </div>
            </div>
          )}

          {/* Topic Notes Box */}
          <div className="p-5 rounded-[24px] bg-white border border-slate-200/80 space-y-3 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-800">
                <FileText className="w-4 h-4 text-amber-500" />
                <span>My Personal Notes for this Subtopic</span>
              </div>
              <div className="flex items-center space-x-2">
                {notesSavedAlert && <span className="text-xs text-emerald-600 font-bold">Notes Saved! ✓</span>}
                <button
                  onClick={handleSaveNotes}
                  className="flex items-center space-x-1 px-3.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Notes</span>
                </button>
              </div>
            </div>
            <textarea
              rows={3}
              value={notesText}
              onChange={(e) => setNotesText(e.target.value)}
              placeholder="Jot down important formulas, shortcuts, doubts, or VTU exam tricks..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-sans leading-relaxed"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
