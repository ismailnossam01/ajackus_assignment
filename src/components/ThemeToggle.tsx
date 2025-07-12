import React from 'react';
import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDarkMode, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`p-3 rounded-2xl transition-all duration-500 transform hover:scale-110 shadow-xl ${
        isDarkMode
          ? 'bg-slate-800/60 hover:bg-slate-700 text-yellow-400 border-2 border-slate-700/50 shadow-yellow-500/20'
          : 'bg-white/60 hover:bg-white/80 text-orange-500 border-2 border-white/50 shadow-orange-500/20'
      } backdrop-blur-xl`}
      title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? (
        <Sun className="h-6 w-6 transition-transform duration-500 rotate-0 hover:rotate-180" />
      ) : (
        <Moon className="h-6 w-6 transition-transform duration-500 rotate-0 hover:-rotate-12" />
      )}
    </button>
  );
};

export default ThemeToggle;