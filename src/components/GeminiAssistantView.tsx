import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  Bot,
  User,
  Copy,
  Check,
  HelpCircle,
  BookOpen,
  FileText,
  Compass,
  Code2,
  Cpu,
  BrainCircuit,
  MessageSquare
} from 'lucide-react';
import { Subject, Module, Topic, Subtopic } from '../types';
import { askGemini } from '../utils/geminiClient';

interface GeminiAssistantViewProps {
  subjects: Subject[];
  activeSemester: 1 | 2;
  initialContext?: {
    subject?: Subject;
    module?: Module;
    topic?: Topic;
    subtopic?: Subtopic;
  };
  onSaveDoubt: (doubt: {
    question: string;
    answer?: string;
    subjectId: string;
    subjectName: string;
    topicId: string;
    topicTitle: string;
  }) => void;
  onSaveNoteToTopic: (subtopicId: string, note: string) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'gemini';
  text: string;
  timestamp: string;
  contextTag?: string;
  mode?: string;
}

export const GeminiAssistantView: React.FC<GeminiAssistantViewProps> = ({
  subjects,
  activeSemester,
  initialContext,
  onSaveDoubt,
}) => {
  const semesterSubjects = subjects.filter((s) => s.semester === activeSemester);

  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(
    initialContext?.subject?.id || semesterSubjects[0]?.id || ''
  );
  const selectedSubject = semesterSubjects.find((s) => s.id === selectedSubjectId) || semesterSubjects[0];

  const [selectedModuleId, setSelectedModuleId] = useState<string>(
    initialContext?.module?.id || selectedSubject?.modules[0]?.id || ''
  );
  const selectedModule =
    selectedSubject?.modules.find((m) => m.id === selectedModuleId) || selectedSubject?.modules[0];

  const [selectedTopicId, setSelectedTopicId] = useState<string>(
    initialContext?.topic?.id || selectedModule?.topics[0]?.id || ''
  );
  const selectedTopic =
    selectedModule?.topics.find((t) => t.id === selectedTopicId) || selectedModule?.topics[0];

  const [selectedSubtopicId, setSelectedSubtopicId] = useState<string>(
    initialContext?.subtopic?.id || selectedTopic?.subtopics[0]?.id || ''
  );
  const selectedSubtopic =
    selectedTopic?.subtopics.find((st) => st.id === selectedSubtopicId) || selectedTopic?.subtopics[0];

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'gemini',
      text: `Hello and welcome! 👋 I am your dedicated **Engineering AI Academic Assistant** for 1st Year (AI/ML, CSE-A, and CSE-B streams under VTU 2025–2026 Scheme, AIT Chikkamagaluru).

**How I can help you:**
1. **📘 VTU Syllabus Mastery**: Step-by-step calculus proofs, polar curves, C programming memory models, Applied Physics wave equations, and VTU 6–8–10 mark exam questions.
2. **🚀 Out-of-Syllabus Questions**: Feel free to ask **ANY question** beyond the syllabus—deep learning architectures, transformer attention, LLM internals, competitive programming tricks, computer architecture, or general science doubts. I will answer with full academic rigor, mathematical proofs, and executable code!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputPrompt, setInputPrompt] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [saveSuccessId, setSaveSuccessId] = useState<string | null>(null);

  const sendMessage = async (promptText: string, mode: string = 'custom') => {
    if (!promptText.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      contextTag: `${selectedSubject?.shortName || ''} • Mod ${selectedModule?.moduleNumber || ''}`,
      mode,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setLoading(true);

    const contextPayload = {
      subject: selectedSubject?.name,
      module: `Module ${selectedModule?.moduleNumber}: ${selectedModule?.title}`,
      topic: selectedTopic?.title,
      subtopic: selectedSubtopic?.title,
      mode: mode as any,
    };

    const res = await askGemini({
      prompt: promptText,
      context: contextPayload,
    });

    const aiMsg: ChatMessage = {
      id: `ai-${Date.now()}`,
      sender: 'gemini',
      text: res.text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      contextTag: selectedSubtopic?.title,
    };

    setMessages((prev) => [...prev, aiMsg]);
    setLoading(false);
  };

  const handlePresetClick = (mode: string) => {
    const subName = selectedSubtopic?.title || selectedTopic?.title || 'this topic';
    let prompt = '';
    switch (mode) {
      case 'explain':
        prompt = `Explain "${subName}" thoroughly according to VTU syllabus standards, covering theory, definitions, derivations, and exam marking criteria.`;
        break;
      case 'beginner':
        prompt = `Explain "${subName}" for a first-year student with intuitive everyday real-world engineering analogies.`;
        break;
      case 'formulas':
        prompt = `Provide a comprehensive formula and key theorem sheet for "${subName}" with variable explanations and SI units.`;
        break;
      case 'practice':
        prompt = `Give 3 typical VTU exam questions (6 to 8 marks) on "${subName}" with step-by-step solutions and scoring breakdowns.`;
        break;
      case 'viva':
        prompt = `What are the top 5 laboratory viva-voce questions and answers for "${subName}"?`;
        break;
      case 'out_of_syllabus_ai':
        prompt = `[Out-of-Syllabus Question] How do Modern Deep Neural Networks and Transformers (like GPT and Gemini) actually process language mathematically? Explain with attention mechanism formulas and simple code.`;
        break;
      case 'out_of_syllabus_quantum':
        prompt = `[Out-of-Syllabus Question] What is the mathematical principle behind Quantum Computing qubits and superposition, and how does it differ from classical binary logic?`;
        break;
      case 'out_of_syllabus_dsa':
        prompt = `[Out-of-Syllabus Question] Explain how Red-Black Trees and B-Trees work in modern database indexing, with asymptotic time complexity and rebalancing rules.`;
        break;
      default:
        prompt = `Explain ${subName}`;
    }

    sendMessage(prompt, mode);
  };

  const copyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveDoubtFromMsg = (msg: ChatMessage, prevUserMsg?: ChatMessage) => {
    onSaveDoubt({
      question: prevUserMsg?.text || `Doubt regarding ${selectedSubtopic?.title || 'concept'}`,
      answer: msg.text,
      subjectId: selectedSubject?.id || 'general',
      subjectName: selectedSubject?.shortName || 'VTU 1st Year',
      topicId: selectedTopic?.id || 't1',
      topicTitle: selectedTopic?.title || 'Engineering Topic',
    });
    setSaveSuccessId(msg.id);
    setTimeout(() => setSaveSuccessId(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Syllabus & Out-of-Syllabus Context Bar */}
      <div className="bg-white border border-slate-200/80 rounded-[28px] p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center space-x-2 text-indigo-600 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>AI Academic Assistant • Answers All In-Syllabus & Out-of-Syllabus Doubts</span>
          </div>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
            Cross-Checked Accuracy Active
          </span>
        </div>

        {/* 4 Selectors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Subject */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-500 font-semibold">Subject</label>
            <select
              value={selectedSubjectId}
              onChange={(e) => {
                const subId = e.target.value;
                setSelectedSubjectId(subId);
                const sub = semesterSubjects.find((s) => s.id === subId);
                if (sub) {
                  setSelectedModuleId(sub.modules[0]?.id || '');
                  setSelectedTopicId(sub.modules[0]?.topics[0]?.id || '');
                  setSelectedSubtopicId(sub.modules[0]?.topics[0]?.subtopics[0]?.id || '');
                }
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            >
              {semesterSubjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.shortName} ({s.code})
                </option>
              ))}
            </select>
          </div>

          {/* Module */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-500 font-semibold">Module</label>
            <select
              value={selectedModuleId}
              onChange={(e) => {
                const modId = e.target.value;
                setSelectedModuleId(modId);
                const mod = selectedSubject?.modules.find((m) => m.id === modId);
                if (mod) {
                  setSelectedTopicId(mod.topics[0]?.id || '');
                  setSelectedSubtopicId(mod.topics[0]?.subtopics[0]?.id || '');
                }
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            >
              {selectedSubject?.modules.map((m) => (
                <option key={m.id} value={m.id}>
                  Module {m.moduleNumber}: {m.title}
                </option>
              ))}
            </select>
          </div>

          {/* Topic */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-500 font-semibold">Topic</label>
            <select
              value={selectedTopicId}
              onChange={(e) => {
                const topId = e.target.value;
                setSelectedTopicId(topId);
                const t = selectedModule?.topics.find((item) => item.id === topId);
                if (t) {
                  setSelectedSubtopicId(t.subtopics[0]?.id || '');
                }
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            >
              {selectedModule?.topics.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.title}
                </option>
              ))}
            </select>
          </div>

          {/* Subtopic */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-500 font-semibold">Subtopic</label>
            <select
              value={selectedSubtopicId}
              onChange={(e) => setSelectedSubtopicId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            >
              {selectedTopic?.subtopics.map((st) => (
                <option key={st.id} value={st.id}>
                  {st.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Query Action Chips */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-2">
          <span className="text-[11px] font-bold text-slate-400 self-center mr-1">In-Syllabus:</span>
          <button
            onClick={() => handlePresetClick('explain')}
            className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-indigo-50 text-indigo-700 border border-slate-200 text-xs font-semibold transition-all cursor-pointer"
          >
            📖 Explain Topic
          </button>
          <button
            onClick={() => handlePresetClick('formulas')}
            className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-indigo-50 text-indigo-700 border border-slate-200 text-xs font-semibold transition-all cursor-pointer"
          >
            📐 Key Formulas
          </button>
          <button
            onClick={() => handlePresetClick('practice')}
            className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-indigo-50 text-indigo-700 border border-slate-200 text-xs font-semibold transition-all cursor-pointer"
          >
            🎯 6-8 Mark Questions
          </button>
          <button
            onClick={() => handlePresetClick('viva')}
            className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-indigo-50 text-indigo-700 border border-slate-200 text-xs font-semibold transition-all cursor-pointer"
          >
            🧪 Viva Questions
          </button>

          <span className="text-[11px] font-bold text-purple-600 self-center ml-2 mr-1">Out-of-Syllabus:</span>
          <button
            onClick={() => handlePresetClick('out_of_syllabus_ai')}
            className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-semibold transition-all cursor-pointer"
          >
            🤖 Deep Learning & Transformers
          </button>
          <button
            onClick={() => handlePresetClick('out_of_syllabus_quantum')}
            className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-semibold transition-all cursor-pointer"
          >
            ⚛️ Quantum Computing Qubits
          </button>
          <button
            onClick={() => handlePresetClick('out_of_syllabus_dsa')}
            className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-semibold transition-all cursor-pointer"
          >
            ⚡ Advanced Trees & Indexing
          </button>
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="bg-white border border-slate-200/80 rounded-[28px] p-6 sm:p-7 shadow-sm space-y-5 min-h-[480px] flex flex-col justify-between">
        <div className="space-y-4 overflow-y-auto max-h-[580px] pr-2 scrollbar-thin">
          {messages.map((msg, idx) => {
            const isUser = msg.sender === 'user';
            const prevUserMsg = !isUser ? messages[idx - 1] : undefined;

            return (
              <div
                key={msg.id}
                className={`flex space-x-3.5 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-indigo-100">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-2xl rounded-2xl p-4 sm:p-5 text-xs space-y-2 leading-relaxed ${
                    isUser
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100'
                      : 'bg-slate-50 border border-slate-200/90 text-slate-900 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] opacity-75 mb-1 pb-1 border-b border-black/5 dark:border-white/10">
                    <span className="font-bold">{isUser ? 'You' : 'Gemini Engineering AI'}</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  <div className="prose prose-xs max-w-none text-slate-800 dark:text-slate-100 whitespace-pre-wrap font-sans">
                    {msg.text}
                  </div>

                  {!isUser && (
                    <div className="pt-2 mt-2 border-t border-slate-200 flex items-center justify-between">
                      <button
                        onClick={() => copyMessage(msg.id, msg.text)}
                        className="flex items-center space-x-1 text-[11px] text-slate-500 hover:text-indigo-600 font-semibold cursor-pointer"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-600">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Answer</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleSaveDoubtFromMsg(msg, prevUserMsg)}
                        className="flex items-center space-x-1 text-[11px] text-indigo-600 hover:underline font-bold cursor-pointer"
                      >
                        {saveSuccessId === msg.id ? (
                          <span className="text-emerald-600 font-bold">Saved to Doubts! ✓</span>
                        ) : (
                          <>
                            <HelpCircle className="w-3.5 h-3.5" />
                            <span>Save to Doubt Tracker</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {loading && (
            <div className="flex items-center space-x-3 text-xs text-indigo-600 font-semibold p-4 bg-indigo-50/70 rounded-2xl border border-indigo-100 animate-pulse">
              <Sparkles className="w-4 h-4 animate-spin text-indigo-600" />
              <span>Cross-checking engineering derivations and formulating exact response...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(inputPrompt);
          }}
          className="pt-4 border-t border-slate-100 flex items-center space-x-2.5"
        >
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="Ask any syllabus doubt OR any out-of-syllabus question (e.g. LLM architecture, competitive coding)..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-2xs"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={!inputPrompt.trim() || loading}
            className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-2xl font-bold text-xs flex items-center space-x-1.5 transition-all shadow-md shadow-indigo-100 cursor-pointer"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
