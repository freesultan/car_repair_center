// Common types
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
  };
}

// User related types
export enum UserRole {
  ADMIN = 'ADMIN',
  SERVICE_ADVISOR = 'SERVICE_ADVISOR',
  TECHNICIAN = 'TECHNICIAN'
}

export interface User {
  id: number;
  username: string;
  fullName: string;
  role: UserRole;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

// Customer related types
export interface Customer {
  id: number;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
}

// Vehicle related types
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
  customer?: Customer;
}

// Repair related types
export enum RepairStatus {
  REGISTERED = 'REGISTERED',
  IN_PROGRESS = 'IN_PROGRESS',
  WAITING_APPROVAL = 'WAITING_APPROVAL',
  APPROVED = 'APPROVED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface Repair {
  id: number;
  vehicleId: number;
  description: string;
  status: RepairStatus;
  estimatedCost?: number;
  actualCost?: number;
  technicianId?: number;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  vehicle?: Vehicle;
  technician?: Technician;
  photos?: Photo[];
}

// Technician related types
export interface Technician {
  id: number;
  userId: number;
  specialization?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  user?: User;
}

// Photo related types
export enum PhotoCategory {
  PRE_REPAIR = 'PRE_REPAIR',
  DURING_REPAIR = 'DURING_REPAIR',
  POST_REPAIR = 'POST_REPAIR',
  DAMAGED_PARTS = 'DAMAGED_PARTS'
}

export interface Photo {
  id: number;
  repairId: number;
  filePath: string;
  category: PhotoCategory;
  description?: string;
  createdAt: string;
  userId: number;
  thumbnailUrl?: string; // For frontend use
}
