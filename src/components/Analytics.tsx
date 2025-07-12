import React from 'react';
import { X, BarChart3, Users, Building, TrendingUp, Calendar, PieChart } from 'lucide-react';
import { Employee } from '../types/employee';

interface AnalyticsProps {
  employees: Employee[];
  onClose: () => void;
  isDarkMode: boolean;
}

const Analytics: React.FC<AnalyticsProps> = ({
  employees,
  onClose,
  isDarkMode
}) => {
  // Calculate analytics data
  const totalEmployees = employees.length;
  
  const departmentStats = employees.reduce((acc, emp) => {
    acc[emp.department] = (acc[emp.department] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const roleStats = employees.reduce((acc, emp) => {
    acc[emp.role] = (acc[emp.role] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const currentYear = new Date().getFullYear();
  const joiningYearStats = employees.reduce((acc, emp) => {
    const year = new Date(emp.dateOfJoining).getFullYear();
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const recentJoinees = employees.filter(emp => {
    const joinDate = new Date(emp.dateOfJoining);
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    return joinDate >= sixMonthsAgo;
  }).length;

  const getDepartmentColor = (department: string) => {
    const colors = {
      'Engineering': 'from-blue-500 to-cyan-500',
      'Marketing': 'from-green-500 to-emerald-500',
      'Design': 'from-purple-500 to-pink-500',
      'Finance': 'from-yellow-500 to-orange-500',
      'Human Resources': 'from-pink-500 to-rose-500',
      'Sales': 'from-indigo-500 to-blue-500',
      'Operations': 'from-red-500 to-pink-500',
    };
    return colors[department as keyof typeof colors] || 'from-gray-500 to-slate-500';
  };

  const maxDeptCount = Math.max(...Object.values(departmentStats));
  const maxRoleCount = Math.max(...Object.values(roleStats));

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className={`w-full max-w-6xl max-h-[90vh] overflow-y-auto transition-all duration-500 transform ${
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
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <h2 className={`text-2xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Employee Analytics
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

        {/* Analytics Content */}
        <div className="p-8 space-y-8">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className={`p-6 rounded-3xl ${
              isDarkMode 
                ? 'bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30' 
                : 'bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200'
            } backdrop-blur-sm transform hover:scale-105 transition-all duration-300`}>
              <div className="flex items-center space-x-3">
                <Users className={`h-8 w-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                    Total Employees
                  </p>
                  <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {totalEmployees}
                  </p>
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-3xl ${
              isDarkMode 
                ? 'bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30' 
                : 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200'
            } backdrop-blur-sm transform hover:scale-105 transition-all duration-300`}>
              <div className="flex items-center space-x-3">
                <Building className={`h-8 w-8 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                    Departments
                  </p>
                  <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {Object.keys(departmentStats).length}
                  </p>
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-3xl ${
              isDarkMode 
                ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30' 
                : 'bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200'
            } backdrop-blur-sm transform hover:scale-105 transition-all duration-300`}>
              <div className="flex items-center space-x-3">
                <TrendingUp className={`h-8 w-8 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                    Recent Hires (6m)
                  </p>
                  <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {recentJoinees}
                  </p>
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-3xl ${
              isDarkMode 
                ? 'bg-gradient-to-r from-orange-600/20 to-red-600/20 border border-orange-500/30' 
                : 'bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200'
            } backdrop-blur-sm transform hover:scale-105 transition-all duration-300`}>
              <div className="flex items-center space-x-3">
                <Calendar className={`h-8 w-8 ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                    Avg. Tenure
                  </p>
                  <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {Math.round(employees.reduce((acc, emp) => {
                      const years = (new Date().getTime() - new Date(emp.dateOfJoining).getTime()) / (1000 * 60 * 60 * 24 * 365);
                      return acc + years;
                    }, 0) / employees.length * 10) / 10}y
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Department Distribution */}
            <div className={`p-8 rounded-3xl ${
              isDarkMode 
                ? 'bg-slate-800/40 border-slate-700/30' 
                : 'bg-white/40 border-white/30'
            } backdrop-blur-2xl border-2 shadow-2xl`}>
              <div className="flex items-center space-x-3 mb-6">
                <PieChart className={`h-6 w-6 ${isDarkMode ? 'text-purple-400' : 'text-blue-600'}`} />
                <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Department Distribution
                </h3>
              </div>
              <div className="space-y-4">
                {Object.entries(departmentStats).map(([dept, count]) => (
                  <div key={dept} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className={`font-medium ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                        {dept}
                      </span>
                      <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {count} ({Math.round((count / totalEmployees) * 100)}%)
                      </span>
                    </div>
                    <div className={`w-full h-3 rounded-full ${
                      isDarkMode ? 'bg-slate-700' : 'bg-gray-200'
                    } overflow-hidden`}>
                      <div
                        className={`h-full bg-gradient-to-r ${getDepartmentColor(dept)} rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${(count / maxDeptCount) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Roles */}
            <div className={`p-8 rounded-3xl ${
              isDarkMode 
                ? 'bg-slate-800/40 border-slate-700/30' 
                : 'bg-white/40 border-white/30'
            } backdrop-blur-2xl border-2 shadow-2xl`}>
              <div className="flex items-center space-x-3 mb-6">
                <BarChart3 className={`h-6 w-6 ${isDarkMode ? 'text-purple-400' : 'text-blue-600'}`} />
                <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Role Distribution
                </h3>
              </div>
              <div className="space-y-4">
                {Object.entries(roleStats)
                  .sort(([,a], [,b]) => b - a)
                  .slice(0, 8)
                  .map(([role, count]) => (
                  <div key={role} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className={`font-medium text-sm ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                        {role}
                      </span>
                      <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {count}
                      </span>
                    </div>
                    <div className={`w-full h-2 rounded-full ${
                      isDarkMode ? 'bg-slate-700' : 'bg-gray-200'
                    } overflow-hidden`}>
                      <div
                        className={`h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${(count / maxRoleCount) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hiring Trends */}
          <div className={`p-8 rounded-3xl ${
            isDarkMode 
              ? 'bg-slate-800/40 border-slate-700/30' 
              : 'bg-white/40 border-white/30'
          } backdrop-blur-2xl border-2 shadow-2xl`}>
            <div className="flex items-center space-x-3 mb-6">
              <TrendingUp className={`h-6 w-6 ${isDarkMode ? 'text-purple-400' : 'text-blue-600'}`} />
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Hiring Trends by Year
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Object.entries(joiningYearStats)
                .sort(([a], [b]) => Number(b) - Number(a))
                .map(([year, count]) => (
                <div key={year} className={`p-4 rounded-2xl text-center ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30' 
                    : 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200'
                } backdrop-blur-sm transform hover:scale-105 transition-all duration-300`}>
                  <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {count}
                  </p>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                    {year}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;