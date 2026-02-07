import apiClient from './axios';
import type {
  ApiResponse,
  AnalyticsOverviewResponse,
  AnalyticsTransactionsResponse,
  AnalyticsBalanceTrendResponse,
  PaginatedListResponse,
  TransactionListItemResponse,
} from '../types/api';

export const analyticsService = {
  // Get overview
  async getOverview(): Promise<ApiResponse<AnalyticsOverviewResponse>> {
    const response = await apiClient.get<ApiResponse<AnalyticsOverviewResponse>>('/api/analytics/overview');
    return response.data;
  },

  // Get transactions
  async getTransactions(
    startDate?: string,
    endDate?: string,
    direction?: string
  ): Promise<ApiResponse<AnalyticsTransactionsResponse>> {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    if (direction) params.append('direction', direction);
    const response = await apiClient.get<ApiResponse<AnalyticsTransactionsResponse>>(
      `/api/analytics/transactions?${params.toString()}`
    );
    return response.data;
  },

  // Get balance trend
  async getBalanceTrend(): Promise<ApiResponse<AnalyticsBalanceTrendResponse>> {
    const response = await apiClient.get<ApiResponse<AnalyticsBalanceTrendResponse>>(
      '/api/analytics/balance-trend'
    );
    return response.data;
  },

  // Get transactions list (paginated)
  async getTransactionsList(
    page: number = 1,
    pageSize: number = 10,
    startDate?: string,
    endDate?: string
  ): Promise<ApiResponse<PaginatedListResponse<TransactionListItemResponse>>> {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('pageSize', pageSize.toString());
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    const response = await apiClient.get<ApiResponse<PaginatedListResponse<TransactionListItemResponse>>>(
      `/api/analytics/transactions-list?${params.toString()}`
    );
    return response.data;
  },
};
