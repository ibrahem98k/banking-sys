import apiClient from './axios';
import type {
  ApiResponse,
  ProfileResponse,
  UpdateProfileRequest,
} from '../types/api';

export const profileService = {
  // Get profile
  async getProfile(): Promise<ApiResponse<ProfileResponse>> {
    const response = await apiClient.get<ApiResponse<ProfileResponse>>('/api/profile');
    return response.data;
  },

  // Update profile
  async updateProfile(request: UpdateProfileRequest): Promise<ApiResponse<ProfileResponse>> {
    const response = await apiClient.put<ApiResponse<ProfileResponse>>('/api/profile', request);
    return response.data;
  },
};
