import apiClient from './axios';
import type {
  ApiResponse,
  TransactionResponse,
  CreateTransferRequest,
  PaginatedListResponse,
  TransactionStatus,
} from '../types/api';

export const transactionsService = {
  // Create transfer
  async createTransfer(
    request: CreateTransferRequest,
    idempotencyKey?: string
  ): Promise<ApiResponse<TransactionResponse>> {
    const headers: Record<string, string> = {};
    if (idempotencyKey) {
      headers['Idempotency-Key'] = idempotencyKey;
    }
    const response = await apiClient.post<ApiResponse<TransactionResponse>>(
      '/api/transactions/transfer',
      request,
      { headers }
    );
    return response.data;
  },

  // List transactions by account
  async listByAccount(
    accountId: number,
    status?: TransactionStatus,
    pageNumber: number = 1,
    pageSize: number = 10
  ): Promise<ApiResponse<PaginatedListResponse<TransactionResponse>>> {
    const params = new URLSearchParams();
    params.append('pageNumber', pageNumber.toString());
    params.append('pageSize', pageSize.toString());
    if (status) {
      params.append('status', status);
    }
    const response = await apiClient.get<ApiResponse<PaginatedListResponse<TransactionResponse>>>(
      `/api/transactions/account/${accountId}?${params.toString()}`
    );
    return response.data;
  },

  // Get transaction by ID
  async getById(id: number): Promise<ApiResponse<TransactionResponse>> {
    const response = await apiClient.get<ApiResponse<TransactionResponse>>(`/api/transactions/${id}`);
    return response.data;
  },

  // Retry transaction
  async retryTransaction(transactionId: number): Promise<ApiResponse<TransactionResponse>> {
    const response = await apiClient.post<ApiResponse<TransactionResponse>>(
      `/api/transactions/${transactionId}/retry`
    );
    return response.data;
  },
};
