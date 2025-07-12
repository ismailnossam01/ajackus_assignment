import React, { useState } from 'react';
import { X, Download, FileText, FileSpreadsheet, Users } from 'lucide-react';
import { Employee } from '../types/employee';

interface ExportModalProps {
  employees: Employee[];
  onClose: () => void;
  isDarkMode: boolean;
}

const ExportModal: React.FC<ExportModalProps> = ({
  employees,
  onClose,
  isDarkMode
}) => {
  const [exportFormat, setExportFormat] = useState<'csv' | 'json'>('csv');

  const exportToCSV = () => {
    const headers = ['ID', 'First Name', 'Last Name', 'Email', 'Department', 'Role', 'Date of Joining'];
    const csvContent = [
      headers.join(','),
      ...employees.map(emp => [
        emp.id,
        emp.firstName,
        emp.lastName,
        emp.email,
        emp.department,
        emp.role,
        emp.dateOfJoining
      ].map(field => `"${field}"`).join(','))
    ].join('\n');

    downloadFile(csvContent, 'employees.csv', 'text/csv');
  };

  const exportToJSON = () => {
    const jsonContent = JSON.stringify(employees, null, 2);
    downloadFile(jsonContent, 'employees.json', 'application/json');
  };

  const downloadFile = (content: string, filename: string, contentType: string) => {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    onClose();
  };

  const handleExport = () => {
    if (exportFormat === 'csv') {
      exportToCSV();
    } else {
      exportToJSON();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className={`w-full max-w-lg transition-all duration-500 transform ${
        isDarkMode 
          ? 'bg-slate-800/90 border-slate-700/50' 
          : 'bg-white/90 border-white/50'
      } backdrop-blur-2xl border-2 rounded-3xl shadow-3xl ${
        isDarkMode ? 'shadow-blue-500/20' : 'shadow-blue-500/20'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b-2 border-opacity-20" style={{
          borderColor: isDarkMode ? 'rgb(148 163 184 / 0.2)' : 'rgb(156 163 175 / 0.2)'
        }}>
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-2xl shadow-xl ${
              isDarkMode 
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600' 
                : 'bg-gradient-to-r from-blue-500 to-cyan-500'
            }`}>
              <Download className="h-6 w-6 text-white" />
            </div>
            <h2 className={`text-2xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Export Employees
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

        {/* Content */}
        <div className="p-8 space-y-8">
          <div className={`p-6 rounded-2xl ${
            isDarkMode 
              ? 'bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30' 
              : 'bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200'
          } backdrop-blur-sm`}>
            <div className="flex items-center space-x-3 mb-2">
              <Users className={`h-5 w-5 ${
                isDarkMode ? 'text-blue-400' : 'text-blue-600'
              }`} />
              <span className={`font-bold ${
                isDarkMode ? 'text-blue-300' : 'text-blue-700'
              }`}>
                Export Summary
              </span>
            </div>
            <p className={`text-sm ${
              isDarkMode ? 'text-slate-300' : 'text-gray-600'
            }`}>
              Export {employees.length} employee{employees.length !== 1 ? 's' : ''} in your preferred format.
            </p>
          </div>

          {/* Format Selection */}
          <div className="space-y-4">
            <label className={`block text-sm font-bold ${
              isDarkMode ? 'text-slate-300' : 'text-gray-700'
            }`}>
              Export Format
            </label>
            
            <div className="space-y-3">
              <button
                onClick={() => setExportFormat('csv')}
                className={`w-full p-6 rounded-2xl border-2 transition-all duration-300 flex items-center space-x-4 transform hover:scale-105 ${
                  exportFormat === 'csv'
                    ? isDarkMode
                      ? 'border-purple-500 bg-gradient-to-r from-purple-600/20 to-pink-600/20 shadow-xl shadow-purple-500/20'
                      : 'border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 shadow-xl shadow-blue-500/20'
                    : isDarkMode
                      ? 'border-slate-600 hover:border-slate-500 bg-slate-700/30'
                      : 'border-gray-300 hover:border-gray-400 bg-white/50'
                } backdrop-blur-sm`}
              >
                <div className={`p-3 rounded-2xl ${
                  exportFormat === 'csv'
                    ? isDarkMode 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
                      : 'bg-gradient-to-r from-blue-500 to-purple-500'
                    : isDarkMode 
                      ? 'bg-slate-600' 
                      : 'bg-gray-400'
                } shadow-lg`}>
                  <FileSpreadsheet className="h-6 w-6 text-white" />
                </div>
                <div className="text-left flex-1">
                  <div className={`font-bold text-lg ${
                    exportFormat === 'csv'
                      ? isDarkMode ? 'text-purple-300' : 'text-blue-700'
                      : isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    CSV Format
                  </div>
                  <div className={`text-sm ${
                    isDarkMode ? 'text-slate-400' : 'text-gray-600'
                  }`}>
                    Compatible with Excel and Google Sheets
                  </div>
                </div>
              </button>

              <button
                onClick={() => setExportFormat('json')}
                className={`w-full p-6 rounded-2xl border-2 transition-all duration-300 flex items-center space-x-4 transform hover:scale-105 ${
                  exportFormat === 'json'
                    ? isDarkMode
                      ? 'border-purple-500 bg-gradient-to-r from-purple-600/20 to-pink-600/20 shadow-xl shadow-purple-500/20'
                      : 'border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 shadow-xl shadow-blue-500/20'
                    : isDarkMode
                      ? 'border-slate-600 hover:border-slate-500 bg-slate-700/30'
                      : 'border-gray-300 hover:border-gray-400 bg-white/50'
                } backdrop-blur-sm`}
              >
                <div className={`p-3 rounded-2xl ${
                  exportFormat === 'json'
                    ? isDarkMode 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
                      : 'bg-gradient-to-r from-blue-500 to-purple-500'
                    : isDarkMode 
                      ? 'bg-slate-600' 
                      : 'bg-gray-400'
                } shadow-lg`}>
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div className="text-left flex-1">
                  <div className={`font-bold text-lg ${
                    exportFormat === 'json'
                      ? isDarkMode ? 'text-purple-300' : 'text-blue-700'
                      : isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    JSON Format
                  </div>
                  <div className={`text-sm ${
                    isDarkMode ? 'text-slate-400' : 'text-gray-600'
                  }`}>
                    Machine-readable data format
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex space-x-4 pt-6">
            <button
              onClick={onClose}
              className={`flex-1 px-6 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 ${
                isDarkMode
                  ? 'bg-slate-700/50 hover:bg-slate-600 text-slate-300 border-2 border-slate-600'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-2 border-gray-200'
              } backdrop-blur-sm`}
            >
              Cancel
            </button>
            <button
              onClick={handleExport}
              className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white px-6 py-4 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105 shadow-xl shadow-blue-500/30"
            >
              <Download className="h-5 w-5" />
              <span>Export Data</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;