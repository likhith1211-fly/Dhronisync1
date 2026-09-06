import React from 'react';
import {
  LayoutDashboard,
  Layers,
  BrainCircuit,
  Bot,
  RotateCcw,
  Target,
  HelpCircle,
  CalendarDays,
  BarChart3,
  Sparkles,
  User,
  CalendarCheck,
} from 'lucide-react';

export type ActiveTab =
  | 'dashboard'
  | 'syllabus'
  | 'study_mode'
  | 'gemini'
  | 'revisions'
  | 'exam_prep'
  | 'doubts'
  | 'timetable'
  | 'analytics'
  | 'creator';

interface SidebarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  dueRevisionsCount: number;
  unresolvedDoubtsCount: number;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  dueRevisionsCount,
  unresolvedDoubtsCount,
  isMobileOpen,
  onCloseMobile,
}) => {
  const navItems: {
    id: ActiveTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number;
    badgeColor?: string;
    highlight?: boolean;
  }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'syllabus', label: 'VTU Syllabus', icon: Layers },
    { id: 'study_mode', label: 'Study Mode', icon: BrainCircuit, highlight: true },
    { id: 'gemini', label: 'Gemini AI Tutor', icon: Bot, highlight: true },
    {
      id: 'revisions',
      label: 'Revision Schedule',
      icon: RotateCcw,
      badge: dueRevisionsCount,
      badgeColor: 'bg-emerald-100 text-emerald-800 font-bold',
    },
    {
      id: 'exam_prep',
      label: 'Assessment Reminders',
      icon: CalendarCheck,
      highlight: true,
    },
    {
      id: 'doubts',
      label: 'Doubt Tracker',
      icon: HelpCircle,
      badge: unresolvedDoubtsCount,
      badgeColor: 'bg-amber-100 text-amber-800 font-bold',
    },
    { id: 'timetable', label: 'Timetable & Plan', icon: CalendarDays },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'creator', label: 'Creator Profile', icon: User },
  ];

  const handleItemClick = (tab: ActiveTab) => {
    onSelectTab(tab);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-xs lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed top-18 bottom-0 left-0 z-30 w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between transition-transform duration-200 lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 space-y-1.5 overflow-y-auto">
          <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Navigation
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 font-semibold border border-indigo-100/80 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive
                        ? 'text-indigo-600'
                        : item.highlight
                        ? 'text-indigo-500'
                        : 'text-slate-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full ${
                      item.badgeColor || 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Creator Profile Card (Likhith.M.H - strictly no heart symbol) */}
        <div className="p-4 border-t border-slate-100 space-y-2.5">
          <button
            onClick={() => handleItemClick('creator')}
            className={`w-full text-left p-3 rounded-2xl transition-all cursor-pointer ${
              activeTab === 'creator'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100'
                : 'bg-indigo-50/70 hover:bg-indigo-100/80 border border-indigo-100/90 text-indigo-900'
            }`}
          >
            <div className="flex items-center justify-between font-bold">
              <div className="flex items-center space-x-2">
                <span className={`w-2 h-2 rounded-full ${activeTab === 'creator' ? 'bg-emerald-400' : 'bg-emerald-500'}`} />
                <span className={activeTab === 'creator' ? 'text-white' : 'text-indigo-900'}>Likhith.M.H</span>
              </div>
              <span className={`text-[10px] font-semibold ${activeTab === 'creator' ? 'text-indigo-200' : 'text-indigo-600'}`}>
                Creator →
              </span>
            </div>
            <p className={`text-[10px] font-medium mt-0.5 ${activeTab === 'creator' ? 'text-indigo-100' : 'text-indigo-600/80'}`}>
              AIT Chikkamagaluru • 2025–2026
            </p>
          </button>
        </div>
      </aside>
    </>
  );
};
