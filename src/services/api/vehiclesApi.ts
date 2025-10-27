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

export interface VehicleUpdateRequest extends Partial<VehicleCreateRequest> {}

export interface VehicleSearchParams {
  page?: number;
  limit?: number;
  customerId?: number;
  search?: string;
}

class VehiclesApiService extends BaseApiService {
  /**
   * Get a paginated list of vehicles
   * @param params Search and pagination parameters
   */
  async getVehicles(params?: VehicleSearchParams): Promise<PaginatedResponse<Vehicle>> {
    return this.get<PaginatedResponse<Vehicle>>('/vehicles', { params });
  }
  
  /**
   * Get a single vehicle by ID
   * @param id Vehicle ID
   */
  async getVehicleById(id: number): Promise<Vehicle> {
    return this.get<Vehicle>(`/vehicles/${id}`);
  }
  
  /**
   * Create a new vehicle
   * @param data Vehicle creation data
   */
  async createVehicle(data: VehicleCreateRequest): Promise<Vehicle> {
    return this.post<Vehicle>('/vehicles', data);
  }
  
  /**
   * Update an existing vehicle
   * @param id Vehicle ID
   * @param data Partial vehicle data to update
   */
  async updateVehicle(id: number, data: VehicleUpdateRequest): Promise<Vehicle> {
    return this.patch<Vehicle>(`/vehicles/${id}`, data);
  }
  
  /**
   * Delete a vehicle
   * @param id Vehicle ID
   */
  async deleteVehicle(id: number): Promise<void> {
    return this.delete<void>(`/vehicles/${id}`);
  }
  
  /**
   * Get repairs for a specific vehicle
   * @param vehicleId Vehicle ID
   */
  async getVehicleRepairs(vehicleId: number): Promise<any[]> {
    return this.get<any[]>(`/vehicles/${vehicleId}/repairs`);
  }
}

export const vehiclesApi = new VehiclesApiService();