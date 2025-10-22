import BaseApiService from './baseApi';
import { Customer, PaginatedResponse } from '../../types';

export interface CustomerCreateRequest {
  name: string;
  phone: string;
  email?: string;
  address?: string;
}

export interface CustomerSearchParams {
  page?: number;
  limit?: number;
  search?: string;
}

class CustomersApiService extends BaseApiService {
  async getCustomers(params?: CustomerSearchParams): Promise<PaginatedResponse<Customer>> {
    return this.get<PaginatedResponse<Customer>>('/customers', { params });
  }
  
  async getCustomerById(id: number): Promise<Customer> {
    return this.get<Customer>(`/customers/${id}`);
  }
  
  async createCustomer(data: CustomerCreateRequest): Promise<Customer> {
    return this.post<Customer>('/customers', data);
  }
  
  async updateCustomer(id: number, data: CustomerCreateRequest): Promise<Customer> {
    return this.put<Customer>(`/customers/${id}`, data);
  }
  
  async deleteCustomer(id: number): Promise<void> {
    return this.delete<void>(`/customers/${id}`);
  }
  
  async getCustomerVehicles(customerId: number): Promise<any[]> {
    return this.get<any[]>(`/customers/${customerId}/vehicles`);
  }
}

export const customersApi = new CustomersApiService();
