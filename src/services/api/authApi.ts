import BaseApiService from './baseApi';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: number;
    username: string;
    fullName: string;
    role: string;
    active: boolean;
  };
  token: string;
}

export interface ChangePasswordRequest {
  userId: number;
  currentPassword: string;
  newPassword: string;
}

class AuthApiService extends BaseApiService {
  async login(data: LoginRequest): Promise<LoginResponse> {
    return this.post<LoginResponse>('/auth/login', data);
  }
  
  async changePassword(data: ChangePasswordRequest): Promise<{ message: string }> {
    return this.post<{ message: string }>('/auth/change-password', data);
  }
}

export const authApi = new AuthApiService();
