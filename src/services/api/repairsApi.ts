import BaseApiService from './baseApi';
import { Repair, PaginatedResponse } from '../../types';

export interface RepairCreateRequest {
  vehicleId: number;
  description: string;
  estimatedCost?: number;
  technicianId?: number;
}

export interface RepairUpdateRequest {
  description?: string;
  status?: 'REGISTERED' | 'IN_PROGRESS' | 'WAITING_APPROVAL' | 'APPROVED' | 'COMPLETED' | 'CANCELLED';
  estimatedCost?: number;
  actualCost?: number;
  technicianId?: number;
}

export interface RepairSearchParams {
  page?: number;
  limit?: number;
  vehicleId?: number;
  status?: string;
  technicianId?: number;
}

class RepairsApiService extends BaseApiService {
  async getRepairs(params?: RepairSearchParams): Promise<PaginatedResponse<Repair>> {
    return this.get<PaginatedResponse<Repair>>('/repairs', { params });
  }
  
  async getRepairById(id: number): Promise<Repair> {
    return this.get<Repair>(`/repairs/${id}`);
  }
  
  async createRepair(data: RepairCreateRequest): Promise<Repair> {
    return this.post<Repair>('/repairs', data);
  }
  
  async updateRepair(id: number, data: RepairUpdateRequest): Promise<Repair> {
    return this.put<Repair>(`/repairs/${id}`, data);
  }
  
  async deleteRepair(id: number): Promise<void> {
    return this.delete<void>(`/repairs/${id}`);
  }
  
  async getRepairPhotos(repairId: number): Promise<any[]> {
    return this.get<any[]>(`/repairs/${repairId}/photos`);
  }
  
  async getRepairApprovals(repairId: number): Promise<any[]> {
    return this.get<any[]>(`/repairs/${repairId}/approvals`);
  }
}

export const repairsApi = new RepairsApiService();
