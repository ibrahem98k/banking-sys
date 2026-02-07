import apiClient from './axios';
import type {
  ApiResponse,
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  LogoutRequest,
  RegisterResponse,
  SendVerificationRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  User,
} from '../types/api';

export const authService = {
  // Login
  async login(request: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    const response = await apiClient.post<ApiResponse<LoginResponse>>('/auth/login', request);
    if (response.data.success && response.data.data) {
      localStorage.setItem('accessToken', response.data.data.token);
      localStorage.setItem('refreshToken', response.data.data.refreshToken);
      localStorage.setItem('tokenExpiresAt', response.data.data.tokenExpiresAt);
      localStorage.setItem('refreshTokenExpiresAt', response.data.data.refreshTokenExpiresAt);
    }
    return response.data;
  },

  // Register (multipart/form-data)
  async register(formData: FormData): Promise<ApiResponse<RegisterResponse>> {
    // The interceptor will detect FormData and remove the default Content-Type header
    // Axios will then automatically set Content-Type: multipart/form-data with boundary
    const response = await apiClient.post<ApiResponse<RegisterResponse>>('/auth/register', formData);
    if (response.data.success && response.data.data) {
      localStorage.setItem('accessToken', response.data.data.token);
      localStorage.setItem('refreshToken', response.data.data.refreshToken);
      localStorage.setItem('tokenExpiresAt', response.data.data.tokenExpiresAt);
      localStorage.setItem('refreshTokenExpiresAt', response.data.data.refreshTokenExpiresAt);
    }
    return response.data;
  },

  // Refresh token
  async refresh(request: RefreshTokenRequest): Promise<ApiResponse<LoginResponse>> {
    const response = await apiClient.post<ApiResponse<LoginResponse>>('/auth/refresh', request);
    if (response.data.success && response.data.data) {
      localStorage.setItem('accessToken', response.data.data.token);
      localStorage.setItem('refreshToken', response.data.data.refreshToken);
      localStorage.setItem('tokenExpiresAt', response.data.data.tokenExpiresAt);
      localStorage.setItem('refreshTokenExpiresAt', response.data.data.refreshTokenExpiresAt);
    }
    return response.data;
  },

  // Logout
  async logout(request: LogoutRequest): Promise<ApiResponse<object>> {
    const response = await apiClient.post<ApiResponse<object>>('/auth/logout', request);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('tokenExpiresAt');
    localStorage.removeItem('refreshTokenExpiresAt');
    return response.data;
  },

  // Logout all devices
  async logoutAllDevices(): Promise<ApiResponse<object>> {
    const response = await apiClient.post<ApiResponse<object>>('/auth/logoutAllDevices');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('tokenExpiresAt');
    localStorage.removeItem('refreshTokenExpiresAt');
    return response.data;
  },

  // Get current user
  async me(): Promise<ApiResponse<User>> {
    const response = await apiClient.get<ApiResponse<User>>('/auth/Me');
    return response.data;
  },

  // Send verification code
  async sendVerification(request: SendVerificationRequest): Promise<ApiResponse<object>> {
    const response = await apiClient.post<ApiResponse<object>>('/auth/send-verification', request);
    return response.data;
  },

  // Forgot password
  async forgotPassword(request: ForgotPasswordRequest): Promise<ApiResponse<object>> {
    const response = await apiClient.post<ApiResponse<object>>('/auth/forgot-password', request);
    return response.data;
  },

  // Reset password
  async resetPassword(request: ResetPasswordRequest): Promise<ApiResponse<object>> {
    const response = await apiClient.post<ApiResponse<object>>('/auth/reset-password', request);
    return response.data;
  },
};
