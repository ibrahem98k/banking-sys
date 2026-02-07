import apiClient from './axios';
import type {
  ApiResponse,
  DashboardResponse,
} from '../types/api';

export const dashboardService = {
  // Get dashboard data
  async getDashboard(): Promise<ApiResponse<DashboardResponse>> {
    const response = await apiClient.get<ApiResponse<DashboardResponse>>('/api/dashboard');
    return response.data;
  },
};
