import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
  isDarkMode: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPageChange,
  onItemsPerPageChange,
  isDarkMode
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between gap-6 ${
      isDarkMode 
        ? 'bg-slate-800/40 border-slate-700/30' 
        : 'bg-white/40 border-white/30'
    } backdrop-blur-2xl border-2 rounded-3xl p-6 shadow-2xl ${
      isDarkMode ? 'shadow-purple-500/10' : 'shadow-blue-500/10'
    }`}>
      {/* Items per page */}
      <div className="flex items-center space-x-3">
        <span className={`text-sm font-semibold ${
          isDarkMode ? 'text-slate-300' : 'text-gray-700'
        }`}>
          Show
        </span>
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className={`px-4 py-2 rounded-2xl text-sm font-semibold transition-all duration-300 ${
            isDarkMode
              ? 'bg-slate-700/50 border-slate-600 text-white'
              : 'bg-white/50 border-gray-300 text-gray-900'
          } border-2 focus:ring-4 ${
            isDarkMode ? 'focus:ring-purple-500/20 focus:border-purple-500' : 'focus:ring-blue-500/20 focus:border-blue-500'
          } backdrop-blur-sm`}
        >
          <option value={12}>12</option>
          <option value={24}>24</option>
          <option value={48}>48</option>
          <option value={96}>96</option>
        </select>
        <span className={`text-sm font-semibold ${
          isDarkMode ? 'text-slate-300' : 'text-gray-700'
        }`}>
          per page
        </span>
      </div>

      {/* Page info and navigation */}
      <div className="flex items-center space-x-6">
        <span className={`text-sm font-semibold ${
          isDarkMode ? 'text-slate-300' : 'text-gray-700'
        }`}>
          {startItem}-{endItem} of {totalItems}
        </span>

        <div className="flex items-center space-x-2">
          {/* Previous button */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-3 rounded-2xl transition-all duration-300 transform hover:scale-110 ${
              currentPage === 1
                ? isDarkMode
                  ? 'text-slate-600 cursor-not-allowed bg-slate-800/30'
                  : 'text-gray-400 cursor-not-allowed bg-gray-100/50'
                : isDarkMode
                  ? 'text-slate-300 hover:bg-slate-700/50 hover:text-white shadow-lg'
                  : 'text-gray-600 hover:bg-white/50 hover:text-gray-900 shadow-lg'
            } backdrop-blur-sm`}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Page numbers */}
          {getPageNumbers().map(page => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-300 transform hover:scale-110 ${
                page === currentPage
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-xl shadow-purple-500/30'
                  : isDarkMode
                    ? 'text-slate-300 hover:bg-slate-700/50 hover:text-white shadow-lg'
                    : 'text-gray-600 hover:bg-white/50 hover:text-gray-900 shadow-lg'
              } backdrop-blur-sm`}
            >
              {page}
            </button>
          ))}

          {/* Next button */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-3 rounded-2xl transition-all duration-300 transform hover:scale-110 ${
              currentPage === totalPages
                ? isDarkMode
                  ? 'text-slate-600 cursor-not-allowed bg-slate-800/30'
                  : 'text-gray-400 cursor-not-allowed bg-gray-100/50'
                : isDarkMode
                  ? 'text-slate-300 hover:bg-slate-700/50 hover:text-white shadow-lg'
                  : 'text-gray-600 hover:bg-white/50 hover:text-gray-900 shadow-lg'
            } backdrop-blur-sm`}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;