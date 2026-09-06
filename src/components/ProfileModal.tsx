import React, { useState } from 'react';
import { X, User, Building2, Save, RotateCcw, ShieldCheck } from 'lucide-react';
import { UserProfile, AllowedBranch } from '../types';
import { clearAllProgress } from '../utils/storage';

interface ProfileModalProps {
  profile: UserProfile;
  onSaveProfile: (profile: UserProfile) => void;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  profile,
  onSaveProfile,
  onClose,
}) => {
  const [name, setName] = useState<string>(profile.name || '');
  const [college, setCollege] = useState<string>(
    profile.college || 'Adichunchanagiri Institute of Technology, Chikkamagaluru'
  );
  const [branch, setBranch] = useState<AllowedBranch>(profile.branch || 'AI/ML');
  const [activeSemester, setActiveSemester] = useState<1 | 2>(profile.activeSemester || 1);
  const [division, setDivision] = useState<string>(profile.division || 'LH - 03');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile({
      ...profile,
      name, // blank space allowed
      college,
      branch,
      activeSemester,
      division,
    });
    onClose();
  };

  const handleResetData = () => {
    if (
      window.confirm(
        'Are you sure you want to reset all progress, syllabus tracking, and timetable to initial defaults?'
      )
    ) {
      clearAllProgress();
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white border border-slate-200/80 w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-2.5 text-slate-900 font-bold text-base">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <User className="w-4 h-4" />
            </div>
            <span>Student Profile & Branch Settings</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="text-slate-600 font-semibold flex items-center justify-between">
              <span>Student Name</span>
              <span className="text-[10px] text-slate-400 font-normal">Optional (leave blank if desired)</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Leave blank space or enter your name"
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-slate-600 font-semibold">Engineering Branch (Strictly Restricted)</label>
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value as AllowedBranch)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            >
              <option value="AI/ML">Artificial Intelligence & Machine Learning (AI/ML)</option>
              <option value="CSE-A">Computer Science & Engineering - Section A (CSE-A)</option>
              <option value="CSE-B">Computer Science & Engineering - Section B (CSE-B)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-slate-600 font-semibold">College / Institute</label>
            <input
              type="text"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-slate-600 font-semibold">Active Semester</label>
            <div className="flex space-x-4 pt-1">
              <label className="flex items-center space-x-2 text-slate-700 font-medium cursor-pointer">
                <input
                  type="radio"
                  name="sem"
                  checked={activeSemester === 1}
                  onChange={() => setActiveSemester(1)}
                  className="accent-indigo-600"
                />
                <span>Semester 1 (2025–2026 Scheme)</span>
              </label>
              <label className="flex items-center space-x-2 text-slate-700 font-medium cursor-pointer">
                <input
                  type="radio"
                  name="sem"
                  checked={activeSemester === 2}
                  onChange={() => setActiveSemester(2)}
                  className="accent-indigo-600"
                />
                <span>Semester 2</span>
              </label>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={handleResetData}
              className="text-rose-600 hover:text-rose-700 font-semibold flex items-center space-x-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Data</span>
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold flex items-center space-x-2 shadow-md shadow-indigo-100 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
