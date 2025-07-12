import React, { useState, useEffect, useRef } from 'react';
import { X, Save, User, Mail, Building, Briefcase, Calendar, Camera, Upload } from 'lucide-react';
import { Employee } from '../types/employee';

interface EmployeeFormProps {
  employee?: Employee | null;
  onSave: (employee: Omit<Employee, 'id'>) => void;
  onCancel: () => void;
  isDarkMode: boolean;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  employee,
  onSave,
  onCancel,
  isDarkMode
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    role: '',
    dateOfJoining: '',
    profilePicture: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [previewImage, setPreviewImage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (employee) {
      setFormData({
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        department: employee.department,
        role: employee.role,
        dateOfJoining: employee.dateOfJoining,
        profilePicture: employee.profilePicture || ''
      });
      setPreviewImage(employee.profilePicture || '');
    }
  }, [employee]);

  const departments = [
    'Engineering',
    'Marketing',
    'Design',
    'Finance',
    'Human Resources',
    'Sales',
    'Operations'
  ];

  const rolesByDepartment = {
    'Engineering': [
      'Senior Developer',
      'Frontend Developer',
      'Backend Developer',
      'Full Stack Developer',
      'DevOps Engineer',
      'Data Scientist',
      'Mobile Developer',
      'Software Architect',
      'Tech Lead'
    ],
    'Marketing': [
      'Marketing Manager',
      'Content Creator',
      'Digital Marketing Specialist',
      'Brand Manager',
      'SEO Specialist',
      'Social Media Manager',
      'Marketing Analyst'
    ],
    'Design': [
      'UX Designer',
      'UI Designer',
      'Graphic Designer',
      'Product Designer',
      'Creative Director',
      'Visual Designer'
    ],
    'Finance': [
      'Financial Analyst',
      'Accountant',
      'Finance Manager',
      'Budget Analyst',
      'Financial Controller',
      'Investment Analyst'
    ],
    'Human Resources': [
      'HR Specialist',
      'Recruiter',
      'HR Manager',
      'Training Coordinator',
      'Compensation Analyst',
      'Employee Relations Specialist'
    ],
    'Sales': [
      'Sales Representative',
      'Sales Manager',
      'Account Executive',
      'Business Development Manager',
      'Sales Director',
      'Customer Success Manager'
    ],
    'Operations': [
      'Operations Manager',
      'Project Manager',
      'Process Analyst',
      'Operations Director',
      'Supply Chain Manager',
      'Quality Assurance Manager'
    ]
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreviewImage(result);
        setFormData(prev => ({ ...prev, profilePicture: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.department) {
      newErrors.department = 'Department is required';
    }

    if (!formData.role.trim()) {
      newErrors.role = 'Role is required';
    }

    if (!formData.dateOfJoining) {
      newErrors.dateOfJoining = 'Date of joining is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const availableRoles = formData.department ? rolesByDepartment[formData.department as keyof typeof rolesByDepartment] || [] : [];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto transition-all duration-500 transform ${
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
            <div className={`p-3 rounded-2xl ${
              isDarkMode 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
                : 'bg-gradient-to-r from-blue-500 to-purple-600'
            } shadow-xl`}>
              <User className="h-6 w-6 text-white" />
            </div>
            <h2 className={`text-2xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {employee ? 'Edit Employee' : 'Add New Employee'}
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Profile Picture Upload */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className={`w-32 h-32 rounded-3xl overflow-hidden shadow-2xl ring-4 ${
                isDarkMode 
                  ? 'ring-purple-500/30' 
                  : 'ring-blue-500/30'
              }`}>
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Profile preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className={`w-full h-full flex items-center justify-center ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-purple-600 to-pink-600' 
                      : 'bg-gradient-to-br from-blue-500 to-purple-600'
                  }`}>
                    <Camera className="h-12 w-12 text-white" />
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={`absolute -bottom-2 -right-2 p-3 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-110 ${
                  isDarkMode
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500'
                } text-white`}
              >
                <Upload className="h-4 w-4" />
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <p className={`text-sm ${
              isDarkMode ? 'text-slate-400' : 'text-gray-500'
            }`}>
              Click the upload button to add a profile picture
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label className={`block text-sm font-bold mb-3 ${
                isDarkMode ? 'text-slate-300' : 'text-gray-700'
              }`}>
                <User className="h-4 w-4 inline mr-2" />
                First Name
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                className={`w-full px-6 py-4 rounded-2xl transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:bg-slate-700/80'
                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:bg-white'
                } border-2 focus:ring-4 ${
                  isDarkMode ? 'focus:ring-purple-500/20 focus:border-purple-500' : 'focus:ring-blue-500/20 focus:border-blue-500'
                } ${
                  errors.firstName ? 'border-red-500' : ''
                } backdrop-blur-sm`}
                placeholder="Enter first name"
              />
              {errors.firstName && (
                <p className="mt-2 text-sm text-red-500 font-medium">{errors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className={`block text-sm font-bold mb-3 ${
                isDarkMode ? 'text-slate-300' : 'text-gray-700'
              }`}>
                <User className="h-4 w-4 inline mr-2" />
                Last Name
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                className={`w-full px-6 py-4 rounded-2xl transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:bg-slate-700/80'
                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:bg-white'
                } border-2 focus:ring-4 ${
                  isDarkMode ? 'focus:ring-purple-500/20 focus:border-purple-500' : 'focus:ring-blue-500/20 focus:border-blue-500'
                } ${
                  errors.lastName ? 'border-red-500' : ''
                } backdrop-blur-sm`}
                placeholder="Enter last name"
              />
              {errors.lastName && (
                <p className="mt-2 text-sm text-red-500 font-medium">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className={`block text-sm font-bold mb-3 ${
              isDarkMode ? 'text-slate-300' : 'text-gray-700'
            }`}>
              <Mail className="h-4 w-4 inline mr-2" />
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={`w-full px-6 py-4 rounded-2xl transition-all duration-300 ${
                isDarkMode
                  ? 'bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:bg-slate-700/80'
                  : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:bg-white'
              } border-2 focus:ring-4 ${
                isDarkMode ? 'focus:ring-purple-500/20 focus:border-purple-500' : 'focus:ring-blue-500/20 focus:border-blue-500'
              } ${
                errors.email ? 'border-red-500' : ''
              } backdrop-blur-sm`}
              placeholder="Enter email address"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-500 font-medium">{errors.email}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Department */}
            <div>
              <label className={`block text-sm font-bold mb-3 ${
                isDarkMode ? 'text-slate-300' : 'text-gray-700'
              }`}>
                <Building className="h-4 w-4 inline mr-2" />
                Department
              </label>
              <select
                value={formData.department}
                onChange={(e) => {
                  handleChange('department', e.target.value);
                  handleChange('role', ''); // Reset role when department changes
                }}
                className={`w-full px-6 py-4 rounded-2xl transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-slate-700/50 border-slate-600 text-white focus:bg-slate-700/80'
                    : 'bg-gray-50 border-gray-300 text-gray-900 focus:bg-white'
                } border-2 focus:ring-4 ${
                  isDarkMode ? 'focus:ring-purple-500/20 focus:border-purple-500' : 'focus:ring-blue-500/20 focus:border-blue-500'
                } ${
                  errors.department ? 'border-red-500' : ''
                } backdrop-blur-sm`}
              >
                <option value="">Select a department</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              {errors.department && (
                <p className="mt-2 text-sm text-red-500 font-medium">{errors.department}</p>
              )}
            </div>

            {/* Role */}
            <div>
              <label className={`block text-sm font-bold mb-3 ${
                isDarkMode ? 'text-slate-300' : 'text-gray-700'
              }`}>
                <Briefcase className="h-4 w-4 inline mr-2" />
                Role
              </label>
              <select
                value={formData.role}
                onChange={(e) => handleChange('role', e.target.value)}
                disabled={!formData.department}
                className={`w-full px-6 py-4 rounded-2xl transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-slate-700/50 border-slate-600 text-white focus:bg-slate-700/80'
                    : 'bg-gray-50 border-gray-300 text-gray-900 focus:bg-white'
                } border-2 focus:ring-4 ${
                  isDarkMode ? 'focus:ring-purple-500/20 focus:border-purple-500' : 'focus:ring-blue-500/20 focus:border-blue-500'
                } ${
                  errors.role ? 'border-red-500' : ''
                } backdrop-blur-sm ${
                  !formData.department ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <option value="">
                  {formData.department ? 'Select a role' : 'Select department first'}
                </option>
                {availableRoles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
              {errors.role && (
                <p className="mt-2 text-sm text-red-500 font-medium">{errors.role}</p>
              )}
            </div>
          </div>

          {/* Date of Joining */}
          <div>
            <label className={`block text-sm font-bold mb-3 ${
              isDarkMode ? 'text-slate-300' : 'text-gray-700'
            }`}>
              <Calendar className="h-4 w-4 inline mr-2" />
              Date of Joining
            </label>
            <input
              type="date"
              value={formData.dateOfJoining}
              onChange={(e) => handleChange('dateOfJoining', e.target.value)}
              className={`w-full px-6 py-4 rounded-2xl transition-all duration-300 ${
                isDarkMode
                  ? 'bg-slate-700/50 border-slate-600 text-white focus:bg-slate-700/80'
                  : 'bg-gray-50 border-gray-300 text-gray-900 focus:bg-white'
              } border-2 focus:ring-4 ${
                isDarkMode ? 'focus:ring-purple-500/20 focus:border-purple-500' : 'focus:ring-blue-500/20 focus:border-blue-500'
              } ${
                errors.dateOfJoining ? 'border-red-500' : ''
              } backdrop-blur-sm`}
            />
            {errors.dateOfJoining && (
              <p className="mt-2 text-sm text-red-500 font-medium">{errors.dateOfJoining}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex space-x-4 pt-6">
            <button
              type="button"
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
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white px-6 py-4 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105 shadow-xl shadow-purple-500/30"
            >
              <Save className="h-5 w-5" />
              <span>Save Employee</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;