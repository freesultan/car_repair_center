import BaseApiService from './baseApi';
import { Vehicle, PaginatedResponse } from '../../types';

export interface VehicleCreateRequest {
  customerId: number;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  vin?: string;
  color?: string;
}

export interface VehicleSearchParams {
  page?: number;
  limit?: number;
  customerId?: number;
  search?: string;
}

class VehiclesApiService extends BaseApiService {
  async getVehicles(params?: VehicleSearchParams): Promise<PaginatedResponse<Vehicle>> {
    return this.get<PaginatedResponse<Vehicle>>('/vehicles', { params });
  }
  
  async getVehicleById(id: number): Promise<Vehicle> {
    return this.get<Vehicle>(`/vehicles/${id}`);
  }
  
  async createVehicle(data: VehicleCreateRequest): Promise<Vehicle> {
    return this.post<Vehicle>('/vehicles', data);
  }
  
  async updateVehicle(id: number, data: VehicleCreateRequest): Promise<Vehicle> {
    return this.put<Vehicle>(`/vehicles/${id}`, data);
  }
  
  async deleteVehicle(id: number): Promise<void> {
    return this.delete<void>(`/vehicles/${id}`);
  }
  
  async getVehicleRepairs(vehicleId: number): Promise<any[]> {
    return this.get<any[]>(`/vehicles/${vehicleId}/repairs`);
  }
}

export const vehiclesApi = new VehiclesApiService();
