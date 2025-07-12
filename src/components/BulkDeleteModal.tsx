import React from 'react';
import { X, Trash2, AlertTriangle, Users } from 'lucide-react';

interface BulkDeleteModalProps {
  count: number;
  onConfirm: () => void;
  onCancel: () => void;
  isDarkMode: boolean;
}

const BulkDeleteModal: React.FC<BulkDeleteModalProps> = ({
  count,
  onConfirm,
  onCancel,
  isDarkMode
}) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className={`w-full max-w-md transition-all duration-500 transform ${
        isDarkMode 
          ? 'bg-slate-800/90 border-slate-700/50' 
          : 'bg-white/90 border-white/50'
      } backdrop-blur-2xl border-2 rounded-3xl shadow-3xl ${
        isDarkMode ? 'shadow-red-500/20' : 'shadow-red-500/20'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b-2 border-opacity-20" style={{
          borderColor: isDarkMode ? 'rgb(148 163 184 / 0.2)' : 'rgb(156 163 175 / 0.2)'
        }}>
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-2xl shadow-xl ${
              isDarkMode 
                ? 'bg-gradient-to-r from-red-600 to-pink-600' 
                : 'bg-gradient-to-r from-red-500 to-red-600'
            }`}>
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <h2 className={`text-2xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Confirm Deletion
            </h2>
          </div>
          <button
            onClick={onCancel}
            className={`p-3 rounded-2xl transition-all duration-300 transform hover:scale-110 ${
              isDarkMode
                ? 'hover:bg-slate-700 text-slate-400 hover:text-white'
                : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
            }`}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          <div className={`p-6 rounded-2xl ${
            isDarkMode 
              ? 'bg-gradient-to-r from-red-600/20 to-pink-600/20 border border-red-500/30' 
              : 'bg-gradient-to-r from-red-50 to-pink-50 border border-red-200'
          } backdrop-blur-sm`}>
            <div className="flex items-center space-x-3 mb-3">
              <Users className={`h-5 w-5 ${
                isDarkMode ? 'text-red-400' : 'text-red-600'
              }`} />
              <span className={`font-bold ${
                isDarkMode ? 'text-red-300' : 'text-red-700'
              }`}>
                Delete {count} Employee{count !== 1 ? 's' : ''}
              </span>
            </div>
            <p className={`text-sm ${
              isDarkMode ? 'text-red-300' : 'text-red-700'
            }`}>
              Are you sure you want to delete {count} employee{count !== 1 ? 's' : ''}? 
              This action cannot be undone and will permanently remove all selected employee records.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex space-x-4 pt-4">
            <button
              onClick={onCancel}
              className={`flex-1 px-6 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 ${
                isDarkMode
                  ? 'bg-slate-700/50 hover:bg-slate-600 text-slate-300 border-2 border-slate-600'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-2 border-gray-200'
              } backdrop-blur-sm`}
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-400 hover:to-pink-400 text-white px-6 py-4 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105 shadow-xl shadow-red-500/30"
            >
              <Trash2 className="h-5 w-5" />
              <span>Delete {count}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkDeleteModal;