import { useState, useMemo, useEffect } from 'react';
import { Users, Plus, Search, Filter, Download, Trash2, UserCheck, Menu, X, BarChart3 } from 'lucide-react';
import { mockEmployees } from './data/employees';
import { Employee, FilterCriteria, SortOption } from './types/employee';
import EmployeeCard from './components/EmployeeCard';
import EmployeeForm from './components/EmployeeForm';
import FilterPanel from './components/FilterPanel';
import ExportModal from './components/ExportModal';
import BulkDeleteModal from './components/BulkDeleteModal';
import Pagination from './components/Pagination';
import ThemeToggle from './components/ThemeToggle';
import Analytics from './components/Analytics';

function App() {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>({});
  const [sortBy, setSortBy] = useState<SortOption>('firstName');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isBulkDeleteOpen, setIsBulkDeleteOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [selectedEmployees, setSelectedEmployees] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const filteredAndSortedEmployees = useMemo(() => {
    let filtered = employees.filter(employee => {
      const searchMatch = !searchTerm || 
        employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase());

      const filterMatch = (!filterCriteria.department || employee.department === filterCriteria.department) &&
        (!filterCriteria.role || employee.role === filterCriteria.role) &&
        (!filterCriteria.firstName || employee.firstName.toLowerCase().includes(filterCriteria.firstName.toLowerCase()));

      return searchMatch && filterMatch;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'firstName':
          return a.firstName.localeCompare(b.firstName);
        case 'lastName':
          return a.lastName.localeCompare(b.lastName);
        case 'department':
          return a.department.localeCompare(b.department);
        case 'role':
          return a.role.localeCompare(b.role);
        case 'dateOfJoining':
          return new Date(a.dateOfJoining).getTime() - new Date(b.dateOfJoining).getTime();
        default:
          return 0;
      }
    });

    return filtered;
  }, [employees, searchTerm, filterCriteria, sortBy]);

  const paginatedEmployees = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedEmployees.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedEmployees, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredAndSortedEmployees.length / itemsPerPage);

  const handleAddEmployee = (employeeData: Omit<Employee, 'id'>) => {
    const newEmployee: Employee = {
      ...employeeData,
      id: Math.max(...employees.map(emp => emp.id)) + 1
    };
    setEmployees([...employees, newEmployee]);
    setIsFormOpen(false);
  };

  const handleEditEmployee = (employeeData: Omit<Employee, 'id'>) => {
    if (editingEmployee) {
      setEmployees(employees.map(emp => 
        emp.id === editingEmployee.id ? { ...employeeData, id: editingEmployee.id } : emp
      ));
      setEditingEmployee(null);
      setIsFormOpen(false);
    }
  };

  const handleDeleteEmployee = (id: number) => {
    setEmployees(employees.filter(emp => emp.id !== id));
    setSelectedEmployees(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const handleBulkDelete = () => {
    setEmployees(employees.filter(emp => !selectedEmployees.has(emp.id)));
    setSelectedEmployees(new Set());
    setIsBulkDeleteOpen(false);
  };

  const openEditForm = (employee: Employee) => {
    setEditingEmployee(employee);
    setIsFormOpen(true);
  };

  const toggleEmployeeSelection = (id: number) => {
    setSelectedEmployees(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleSelectAll = () => {
    if (selectedEmployees.size === paginatedEmployees.length) {
      setSelectedEmployees(new Set());
    } else {
      setSelectedEmployees(new Set(paginatedEmployees.map(emp => emp.id)));
    }
  };

  const departments = [...new Set(employees.map(emp => emp.department))];
  const roles = [...new Set(employees.map(emp => emp.role))];

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      {/* Header */}
      <header className={`backdrop-blur-xl border-b transition-all duration-300 sticky top-0 z-40 ${
        isDarkMode 
          ? 'bg-slate-900/70 border-slate-700/50 shadow-2xl shadow-purple-500/10' 
          : 'bg-white/70 border-white/50 shadow-2xl shadow-blue-500/10'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-2xl shadow-xl transform hover:scale-110 transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-purple-500/30' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 shadow-blue-500/30'
              }`}>
                <Users className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className={`text-2xl font-bold bg-gradient-to-r ${
                  isDarkMode 
                    ? 'from-white to-purple-200 text-transparent bg-clip-text' 
                    : 'from-gray-900 to-purple-600 text-transparent bg-clip-text'
                }`}>
                  Employee Directory
                </h1>
                <p className={`text-sm font-medium ${
                  isDarkMode ? 'text-purple-300' : 'text-blue-600'
                }`}>
                  {filteredAndSortedEmployees.length} employees
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-3">
              <ThemeToggle isDarkMode={isDarkMode} onToggle={() => setIsDarkMode(!isDarkMode)} />
              
              {selectedEmployees.size > 0 && (
                <button
                  onClick={() => setIsBulkDeleteOpen(true)}
                  className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center space-x-2 transform hover:scale-105 shadow-xl ${
                    isDarkMode
                      ? 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white shadow-red-500/30'
                      : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white shadow-red-500/30'
                  } backdrop-blur-sm`}
                >
                  <Trash2 className="h-5 w-5" />
                  <span>Delete ({selectedEmployees.size})</span>
                </button>
              )}

              <button
                onClick={() => setIsAnalyticsOpen(true)}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center space-x-2 transform hover:scale-105 shadow-xl ${
                  isDarkMode
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white shadow-green-500/30'
                    : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white shadow-green-500/30'
                } backdrop-blur-sm`}
              >
                <BarChart3 className="h-5 w-5" />
                <span>Analytics</span>
              </button>

              <button
                onClick={() => setIsExportOpen(true)}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center space-x-2 transform hover:scale-105 shadow-xl ${
                  isDarkMode
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-blue-500/30'
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white shadow-blue-500/30'
                } backdrop-blur-sm`}
              >
                <Download className="h-5 w-5" />
                <span>Export</span>
              </button>

              <button
                onClick={() => {
                  setEditingEmployee(null);
                  setIsFormOpen(true);
                }}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center space-x-2 transform hover:scale-105 shadow-xl ${
                  isDarkMode
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-purple-500/30'
                    : 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white shadow-purple-500/30'
                } backdrop-blur-sm`}
              >
                <Plus className="h-5 w-5" />
                <span>Add Employee</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-3">
              <ThemeToggle isDarkMode={isDarkMode} onToggle={() => setIsDarkMode(!isDarkMode)} />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-3 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl ${
                  isDarkMode
                    ? 'bg-slate-800/80 hover:bg-slate-700 text-white shadow-slate-500/30'
                    : 'bg-white/80 hover:bg-gray-50 text-gray-900 shadow-gray-500/30'
                } backdrop-blur-sm border ${
                  isDarkMode ? 'border-slate-700/50' : 'border-white/50'
                }`}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className={`lg:hidden py-4 space-y-3 border-t ${
              isDarkMode ? 'border-slate-700/50' : 'border-white/50'
            }`}>
              {selectedEmployees.size > 0 && (
                <button
                  onClick={() => {
                    setIsBulkDeleteOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-xl ${
                    isDarkMode
                      ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-red-500/30'
                      : 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-red-500/30'
                  }`}
                >
                  <Trash2 className="h-5 w-5" />
                  <span>Delete ({selectedEmployees.size})</span>
                </button>
              )}

              <button
                onClick={() => {
                  setIsAnalyticsOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-xl ${
                  isDarkMode
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-green-500/30'
                    : 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-green-500/30'
                }`}
              >
                <BarChart3 className="h-5 w-5" />
                <span>Analytics</span>
              </button>

              <button
                onClick={() => {
                  setIsExportOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-xl ${
                  isDarkMode
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-blue-500/30'
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-blue-500/30'
                }`}
              >
                <Download className="h-5 w-5" />
                <span>Export</span>
              </button>

              <button
                onClick={() => {
                  setEditingEmployee(null);
                  setIsFormOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-xl ${
                  isDarkMode
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-purple-500/30'
                    : 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-purple-500/30'
                }`}
              >
                <Plus className="h-5 w-5" />
                <span>Add Employee</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Search and Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* Enhanced Search Bar */}
          <div className="flex-1">
            <div className="relative group">
              <div className={`absolute inset-0 rounded-3xl blur-xl transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20' 
                  : 'bg-gradient-to-r from-blue-500/20 to-purple-500/20'
              } group-hover:blur-2xl`}></div>
              <div className="relative">
                <Search className={`absolute left-6 top-1/2 transform -translate-y-1/2 h-6 w-6 transition-colors duration-300 ${
                  isDarkMode ? 'text-purple-400' : 'text-blue-500'
                }`} />
                <input
                  type="text"
                  placeholder="Search employees by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-16 pr-6 py-5 rounded-3xl font-medium transition-all duration-300 text-lg ${
                    isDarkMode
                      ? 'bg-slate-800/60 border-slate-700/50 text-white placeholder-slate-400 focus:bg-slate-800/80 focus:border-purple-500/50'
                      : 'bg-white/60 border-white/50 text-gray-900 placeholder-gray-500 focus:bg-white/80 focus:border-blue-500/50'
                  } backdrop-blur-xl border-2 focus:ring-4 ${
                    isDarkMode ? 'focus:ring-purple-500/20' : 'focus:ring-blue-500/20'
                  } shadow-2xl ${
                    isDarkMode ? 'shadow-purple-500/10' : 'shadow-blue-500/10'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setIsFilterOpen(true)}
              className={`px-6 py-5 rounded-3xl font-semibold transition-all duration-300 flex items-center space-x-3 transform hover:scale-105 shadow-xl ${
                isDarkMode
                  ? 'bg-slate-800/60 hover:bg-slate-800/80 text-white border-slate-700/50 shadow-slate-500/30'
                  : 'bg-white/60 hover:bg-white/80 text-gray-900 border-white/50 shadow-gray-500/30'
              } backdrop-blur-xl border-2`}
            >
              <Filter className="h-5 w-5" />
              <span>Filter</span>
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className={`px-6 py-5 rounded-3xl font-semibold transition-all duration-300 shadow-xl ${
                isDarkMode
                  ? 'bg-slate-800/60 hover:bg-slate-800/80 text-white border-slate-700/50 shadow-slate-500/30'
                  : 'bg-white/60 hover:bg-white/80 text-gray-900 border-white/50 shadow-gray-500/30'
              } backdrop-blur-xl border-2 focus:ring-4 ${
                isDarkMode ? 'focus:ring-purple-500/20 focus:border-purple-500/50' : 'focus:ring-blue-500/20 focus:border-blue-500/50'
              }`}
            >
              <option value="firstName">Sort by First Name</option>
              <option value="lastName">Sort by Last Name</option>
              <option value="department">Sort by Department</option>
              <option value="role">Sort by Role</option>
              <option value="dateOfJoining">Sort by Date of Joining</option>
            </select>

            {paginatedEmployees.length > 0 && (
              <button
                onClick={toggleSelectAll}
                className={`px-6 py-5 rounded-3xl font-semibold transition-all duration-300 flex items-center space-x-3 transform hover:scale-105 shadow-xl ${
                  isDarkMode
                    ? 'bg-slate-800/60 hover:bg-slate-800/80 text-white border-slate-700/50 shadow-slate-500/30'
                    : 'bg-white/60 hover:bg-white/80 text-gray-900 border-white/50 shadow-gray-500/30'
                } backdrop-blur-xl border-2`}
              >
                <UserCheck className="h-5 w-5" />
                <span className="hidden sm:inline">
                  {selectedEmployees.size === paginatedEmployees.length ? 'Deselect All' : 'Select All'}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Employee Grid */}
        {paginatedEmployees.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
              {paginatedEmployees.map(employee => (
                <EmployeeCard
                  key={employee.id}
                  employee={employee}
                  onEdit={openEditForm}
                  onDelete={handleDeleteEmployee}
                  isSelected={selectedEmployees.has(employee.id)}
                  onToggleSelect={toggleEmployeeSelection}
                  isDarkMode={isDarkMode}
                />
              ))}
            </div>

          </>
        ) : (
          <div className={`text-center py-20 ${
            isDarkMode ? 'text-slate-400' : 'text-gray-600'
          }`}>
            <div className={`w-32 h-32 mx-auto mb-8 rounded-full flex items-center justify-center ${
              isDarkMode 
                ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20' 
                : 'bg-gradient-to-r from-blue-500/20 to-purple-500/20'
            } backdrop-blur-xl`}>
              <Users className="h-16 w-16 opacity-50" />
            </div>
            <h3 className="text-2xl font-bold mb-4">No employees found</h3>
            <p className="text-lg">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Always visible pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            totalItems={filteredAndSortedEmployees.length}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
            isDarkMode={isDarkMode}
          />
        )}
      </div>

      {/* Modals */}
      {isFormOpen && (
        <EmployeeForm
          employee={editingEmployee}
          onSave={editingEmployee ? handleEditEmployee : handleAddEmployee}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingEmployee(null);
          }}
          isDarkMode={isDarkMode}
        />
      )}

      {isFilterOpen && (
        <FilterPanel
          filterCriteria={filterCriteria}
          onApplyFilter={setFilterCriteria}
          onClose={() => setIsFilterOpen(false)}
          departments={departments}
          roles={roles}
          isDarkMode={isDarkMode}
        />
      )}

      {isAnalyticsOpen && (
        <Analytics
          employees={filteredAndSortedEmployees}
          onClose={() => setIsAnalyticsOpen(false)}
          isDarkMode={isDarkMode}
        />
      )}

      {isExportOpen && (
        <ExportModal
          employees={filteredAndSortedEmployees}
          onClose={() => setIsExportOpen(false)}
          isDarkMode={isDarkMode}
        />
      )}

      {isBulkDeleteOpen && (
        <BulkDeleteModal
          count={selectedEmployees.size}
          onConfirm={handleBulkDelete}
          onCancel={() => setIsBulkDeleteOpen(false)}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
}

export default App;