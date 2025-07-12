import React from 'react';
import { Edit, Trash2, Mail, Building, User, Check, Calendar } from 'lucide-react';
import { Employee } from '../types/employee';

interface EmployeeCardProps {
  employee: Employee;
  onEdit: (employee: Employee) => void;
  onDelete: (id: number) => void;
  isSelected: boolean;
  onToggleSelect: (id: number) => void;
  isDarkMode: boolean;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  employee,
  onEdit,
  onDelete,
  isSelected,
  onToggleSelect,
  isDarkMode
}) => {
  const getDepartmentColor = (department: string) => {
    const colors = {
      'Engineering': {
        light: 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-200',
        dark: 'bg-gradient-to-r from-blue-600/20 to-cyan-600/20 text-blue-300 border-blue-500/30'
      },
      'Marketing': {
        light: 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200',
        dark: 'bg-gradient-to-r from-green-600/20 to-emerald-600/20 text-green-300 border-green-500/30'
      },
      'Design': {
        light: 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-purple-200',
        dark: 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-purple-300 border-purple-500/30'
      },
      'Finance': {
        light: 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border-yellow-200',
        dark: 'bg-gradient-to-r from-yellow-600/20 to-orange-600/20 text-yellow-300 border-yellow-500/30'
      },
      'Human Resources': {
        light: 'bg-gradient-to-r from-pink-100 to-rose-100 text-pink-800 border-pink-200',
        dark: 'bg-gradient-to-r from-pink-600/20 to-rose-600/20 text-pink-300 border-pink-500/30'
      },
      'Sales': {
        light: 'bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-800 border-indigo-200',
        dark: 'bg-gradient-to-r from-indigo-600/20 to-blue-600/20 text-indigo-300 border-indigo-500/30'
      },
      'Operations': {
        light: 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border-red-200',
        dark: 'bg-gradient-to-r from-red-600/20 to-pink-600/20 text-red-300 border-red-500/30'
      },
    };
    const colorSet = colors[department as keyof typeof colors];
    if (!colorSet) {
      return isDarkMode 
        ? 'bg-gradient-to-r from-gray-600/20 to-slate-600/20 text-gray-300 border-gray-500/30' 
        : 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200';
    }
    return isDarkMode ? colorSet.dark : colorSet.light;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className={`relative group transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 ${
      isDarkMode 
        ? 'bg-slate-800/40 hover:bg-slate-800/60 border-slate-700/30' 
        : 'bg-white/40 hover:bg-white/60 border-white/30'
    } backdrop-blur-2xl border-2 rounded-3xl p-8 shadow-2xl hover:shadow-3xl ${
      isDarkMode ? 'shadow-purple-500/10 hover:shadow-purple-500/20' : 'shadow-blue-500/10 hover:shadow-blue-500/20'
    } ${
      isSelected ? (isDarkMode ? 'ring-4 ring-purple-500/50 border-purple-500/50' : 'ring-4 ring-blue-500/50 border-blue-500/50') : ''
    }`}>
      {/* Gradient Background Effect */}
      <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-purple-600/10 via-pink-600/5 to-blue-600/10' 
          : 'bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10'
      }`}></div>

      {/* Selection Checkbox */}
      <button
        onClick={() => onToggleSelect(employee.id)}
        className={`absolute top-6 right-6 w-8 h-8 rounded-2xl border-2 transition-all duration-300 flex items-center justify-center transform hover:scale-110 shadow-lg z-10 ${
          isSelected
            ? isDarkMode 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-purple-400 shadow-purple-500/30'
              : 'bg-gradient-to-r from-blue-500 to-purple-500 border-blue-400 shadow-blue-500/30'
            : isDarkMode
              ? 'border-slate-600 hover:border-purple-400 bg-slate-800/50'
              : 'border-gray-300 hover:border-blue-400 bg-white/50'
        } backdrop-blur-sm`}
      >
        {isSelected && <Check className="h-5 w-5 text-white" />}
      </button>

      {/* Department Color Strip */}
      <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${getDepartmentColor(employee.department).replace('bg-gradient-to-r', '').split(' ').slice(0, 2).join(' ')} rounded-t-3xl`} />

      {/* Profile Picture */}
      <div className="relative mb-6">
        <div className={`w-24 h-24 rounded-3xl overflow-hidden mx-auto shadow-2xl ring-4 transition-all duration-300 ${
          isDarkMode 
            ? 'ring-purple-500/30 shadow-purple-500/20' 
            : 'ring-blue-500/30 shadow-blue-500/20'
        }`}>
          {employee.profilePicture ? (
            <img
              src={employee.profilePicture}
              alt={`${employee.firstName} ${employee.lastName}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className={`w-full h-full flex items-center justify-center ${
              isDarkMode 
                ? 'bg-gradient-to-br from-purple-600 to-pink-600' 
                : 'bg-gradient-to-br from-blue-500 to-purple-600'
            }`}>
              <User className="h-12 w-12 text-white" />
            </div>
          )}
        </div>
        
        {/* Department Badge */}
        <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold border-2 ${getDepartmentColor(employee.department)} backdrop-blur-sm`}>
          {employee.department.slice(0, 3).toUpperCase()}
        </div>
      </div>

      {/* Employee Info */}
      <div className="space-y-4 relative z-10">
        <div className="text-center">
          <h3 className={`text-xl font-bold mb-2 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {employee.firstName} {employee.lastName}
          </h3>
          <p className={`text-sm font-semibold px-3 py-1 rounded-full inline-block ${
            isDarkMode ? 'bg-slate-700/50 text-slate-300' : 'bg-gray-100 text-gray-600'
          }`}>
            ID: {employee.id}
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Mail className={`h-5 w-5 flex-shrink-0 ${
              isDarkMode ? 'text-purple-400' : 'text-blue-500'
            }`} />
            <span className={`text-sm font-medium truncate ${
              isDarkMode ? 'text-slate-300' : 'text-gray-700'
            }`}>
              {employee.email}
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <Building className={`h-5 w-5 flex-shrink-0 ${
              isDarkMode ? 'text-purple-400' : 'text-blue-500'
            }`} />
            <span className={`inline-flex px-3 py-2 rounded-2xl text-xs font-bold border-2 ${getDepartmentColor(employee.department)}`}>
              {employee.department}
            </span>
          </div>

          <div className={`text-sm font-semibold text-center py-2 px-4 rounded-2xl ${
            isDarkMode 
              ? 'bg-slate-700/50 text-slate-200' 
              : 'bg-gray-50 text-gray-700'
          }`}>
            {employee.role}
          </div>

          <div className="flex items-center justify-center space-x-2">
            <Calendar className={`h-4 w-4 ${
              isDarkMode ? 'text-purple-400' : 'text-blue-500'
            }`} />
            <span className={`text-xs font-medium ${
              isDarkMode ? 'text-slate-400' : 'text-gray-500'
            }`}>
              Joined {formatDate(employee.dateOfJoining)}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t-2 border-opacity-20 relative z-10" style={{
        borderColor: isDarkMode ? 'rgb(148 163 184 / 0.2)' : 'rgb(156 163 175 / 0.2)'
      }}>
        <button
          onClick={() => onEdit(employee)}
          className={`flex items-center space-x-2 px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-300 transform hover:scale-105 shadow-lg ${
            isDarkMode
              ? 'bg-gradient-to-r from-blue-600/30 to-cyan-600/30 text-blue-300 hover:from-blue-600/50 hover:to-cyan-600/50 border border-blue-500/30 shadow-blue-500/20'
              : 'bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 hover:from-blue-100 hover:to-cyan-100 border border-blue-200 shadow-blue-500/20'
          } backdrop-blur-sm`}
        >
          <Edit className="h-4 w-4" />
          <span>Edit</span>
        </button>

        <button
          onClick={() => onDelete(employee.id)}
          className={`flex items-center space-x-2 px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-300 transform hover:scale-105 shadow-lg ${
            isDarkMode
              ? 'bg-gradient-to-r from-red-600/30 to-pink-600/30 text-red-300 hover:from-red-600/50 hover:to-pink-600/50 border border-red-500/30 shadow-red-500/20'
              : 'bg-gradient-to-r from-red-50 to-pink-50 text-red-600 hover:from-red-100 hover:to-pink-100 border border-red-200 shadow-red-500/20'
          } backdrop-blur-sm`}
        >
          <Trash2 className="h-4 w-4" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};

export default EmployeeCard;