// Core entity types
export interface User {
  id: number;
  username: string;
  fullName: string;
  role: 'admin' | 'service_advisor' | 'technician';
  active: boolean;
}

export interface Customer {
  id: number;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Vehicle {
  id: number;
  customerId: number;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  vin?: string;
  color?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Repair {
  id: number;
  vehicleId: number;
  description: string;
  status: 'registered' | 'in_progress' | 'waiting_approval' | 'approved' | 'completed' | 'cancelled';
  estimatedCost?: number;
  actualCost?: number;
  technicianId?: number;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface Photo {
  id: number;
  repairId: number;
  filePath: string;
  category: 'pre_repair' | 'during_repair' | 'post_repair' | 'damaged_parts';
  description?: string;
  createdAt: string;
  createdBy: number;
}

export interface Approval {
  id: number;
  repairId: number;
  type: 'signature' | 'voice' | 'text';
  contentPath: string;
  timestamp: string;
  createdBy: number;
  createdAt: string;
}

// UI related types
export interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  autoHide?: boolean;
  duration?: number;
}

export interface ThemeSettings {
  mode: 'light' | 'dark';
  direction: 'rtl' | 'ltr';
}

// API related types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  [key: string]: any;
}
