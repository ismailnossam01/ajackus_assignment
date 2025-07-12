import React, { useState } from 'react';
import { X, Filter, Search, Building, Briefcase, Calendar } from 'lucide-react';
import { FilterCriteria } from '../types/employee';

interface FilterPanelProps {
  filterCriteria: FilterCriteria;
  onApplyFilter: (criteria: FilterCriteria) => void;
  onClose: () => void;
  departments: string[];
  roles: string[];
  isDarkMode: boolean;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filterCriteria,
  onApplyFilter,
  onClose,
  departments,
  roles,
  isDarkMode
}) => {
  const [tempCriteria, setTempCriteria] = useState<FilterCriteria>(filterCriteria);

  const handleApply = () => {
    onApplyFilter(tempCriteria);
    onClose();
  };

  const handleClear = () => {
    setTempCriteria({});
    onApplyFilter({});
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className={`w-full max-w-lg transition-all duration-500 transform ${
        isDarkMode 
          ? 'bg-slate-800/90 border-slate-700/50' 
          : 'bg-white/90 border-white/50'
      } backdrop-blur-2xl border-2 rounded-3xl shadow-3xl ${
        isDarkMode ? 'shadow-purple-500/20' : 'shadow-blue-500/20'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b-2 border-opacity-20" style={{
          borderColor: isDarkMode ? 'rgb(148 163 184 / 0.2)' : 'rgb(156 163 175 / 0.2)'
        }}>
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-2xl shadow-xl ${
              isDarkMode 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
                : 'bg-gradient-to-r from-blue-500 to-purple-600'
            }`}>
              <Filter className="h-6 w-6 text-white" />
            </div>
            <h2 className={`text-2xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Filter Employees
            </h2>
          </div>
          <button
            onClick={onClose}
            className={`p-3 rounded-2xl transition-all duration-300 transform hover:scale-110 ${
              isDarkMode
                ? 'hover:bg-slate-700 text-slate-400 hover:text-white'
                : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
            }`}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <div className="p-8 space-y-6">
          {/* First Name Filter */}
          <div>
            <label className={`block text-sm font-bold mb-3 ${
              isDarkMode ? 'text-slate-300' : 'text-gray-700'
            }`}>
              <Search className="h-4 w-4 inline mr-2" />
              First Name
            </label>
            <input
              type="text"
              value={tempCriteria.firstName || ''}
              onChange={(e) => setTempCriteria(prev => ({
                ...prev,
                firstName: e.target.value
              }))}
              className={`w-full px-6 py-4 rounded-2xl transition-all duration-300 ${
                isDarkMode
                  ? 'bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:bg-slate-700/80'
                  : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:bg-white'
              } border-2 focus:ring-4 ${
                isDarkMode ? 'focus:ring-purple-500/20 focus:border-purple-500' : 'focus:ring-blue-500/20 focus:border-blue-500'
              } backdrop-blur-sm`}
              placeholder="Filter by first name"
            />
          </div>

          {/* Department Filter */}
          <div>
            <label className={`block text-sm font-bold mb-3 ${
              isDarkMode ? 'text-slate-300' : 'text-gray-700'
            }`}>
              <Building className="h-4 w-4 inline mr-2" />
              Department
            </label>
            <select
              value={tempCriteria.department || ''}
              onChange={(e) => setTempCriteria(prev => ({
                ...prev,
                department: e.target.value
              }))}
              className={`w-full px-6 py-4 rounded-2xl transition-all duration-300 ${
                isDarkMode
                  ? 'bg-slate-700/50 border-slate-600 text-white focus:bg-slate-700/80'
                  : 'bg-gray-50 border-gray-300 text-gray-900 focus:bg-white'
              } border-2 focus:ring-4 ${
                isDarkMode ? 'focus:ring-purple-500/20 focus:border-purple-500' : 'focus:ring-blue-500/20 focus:border-blue-500'
              } backdrop-blur-sm`}
            >
              <option value="">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          {/* Role Filter */}
          <div>
            <label className={`block text-sm font-bold mb-3 ${
              isDarkMode ? 'text-slate-300' : 'text-gray-700'
            }`}>
              <Briefcase className="h-4 w-4 inline mr-2" />
              Role
            </label>
            <select
              value={tempCriteria.role || ''}
              onChange={(e) => setTempCriteria(prev => ({
                ...prev,
                role: e.target.value
              }))}
              className={`w-full px-6 py-4 rounded-2xl transition-all duration-300 ${
                isDarkMode
                  ? 'bg-slate-700/50 border-slate-600 text-white focus:bg-slate-700/80'
                  : 'bg-gray-50 border-gray-300 text-gray-900 focus:bg-white'
              } border-2 focus:ring-4 ${
                isDarkMode ? 'focus:ring-purple-500/20 focus:border-purple-500' : 'focus:ring-blue-500/20 focus:border-blue-500'
              } backdrop-blur-sm`}
            >
              <option value="">All Roles</option>
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex space-x-4 pt-6">
            <button
              onClick={handleClear}
              className={`flex-1 px-6 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 ${
                isDarkMode
                  ? 'bg-slate-700/50 hover:bg-slate-600 text-slate-300 border-2 border-slate-600'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-2 border-gray-200'
              } backdrop-blur-sm`}
            >
              Clear All
            </button>
            <button
              onClick={handleApply}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white px-6 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-xl shadow-purple-500/30"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;