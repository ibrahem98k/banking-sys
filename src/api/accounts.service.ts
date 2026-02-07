import apiClient from './axios';
import type {
  ApiResponse,
  AccountResponse,
  CardResponse,
} from '../types/api';

export const accountsService = {
  // Get my account
  async getMyAccount(): Promise<ApiResponse<AccountResponse>> {
    const response = await apiClient.get<ApiResponse<AccountResponse>>('/api/accounts/me');
    return response.data;
  },

  // Get my cards
  async getMyCards(): Promise<ApiResponse<CardResponse[]>> {
    const response = await apiClient.get<ApiResponse<CardResponse[]>>('/api/accounts/me/cards');
    return response.data;
  },

  // Get account by number
  async getByAccountNumber(accountNumber: string): Promise<ApiResponse<AccountResponse>> {
    const response = await apiClient.get<ApiResponse<AccountResponse>>(
      `/api/accounts/by-number/${encodeURIComponent(accountNumber)}`
    );
    return response.data;
  },
};
