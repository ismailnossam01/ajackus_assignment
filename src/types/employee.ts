export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  role: string;
  dateOfJoining: string;
  profilePicture?: string;
}

export interface FilterCriteria {
  firstName?: string;
  department?: string;
  role?: string;
  dateOfJoining?: string;
}

export type SortOption = 'firstName' | 'lastName' | 'department' | 'role' | 'dateOfJoining';