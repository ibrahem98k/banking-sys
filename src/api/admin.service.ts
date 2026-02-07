import apiClient from './axios';
import type {
  ApiResponse,
  PaginatedListResponse,
  UserApprovalListItemResponse,
  UserListItemResponse,
  UserStatusResponse,
  ApproveOrRejectUserRequest,
  SetAccountStatusRequest,
  VerifyKycDocumentRequest,
  AdminDashboardMetricsResponse,
  TransactionResponse,
  ReviewTransactionRequest,
  CardResponse,
  IssueCardRequest,
  PayrollJobResponse,
  CreatePayrollJobRequest,
  UpdatePayrollJobRequest,
  TransactionStatus,
  ApprovalStatus,
  RiskLevel
} from '../types/api';

export const adminService = {
  // List users by approval status
  async listUsers(
    approvalStatus?: ApprovalStatus,
    pageNumber: number = 1,
    pageSize: number = 10
  ): Promise<ApiResponse<PaginatedListResponse<UserApprovalListItemResponse>>> {
    const params = new URLSearchParams();
    params.append('pageNumber', pageNumber.toString());
    params.append('pageSize', pageSize.toString());
    if (approvalStatus !== undefined) {
      params.append('approvalStatus', approvalStatus.toString());
    }
    const response = await apiClient.get<ApiResponse<PaginatedListResponse<UserApprovalListItemResponse>>>(
      `/api/admin/users?${params.toString()}`
    );
    return response.data;
  },

  // Get user by ID
  async getUser(userId: number): Promise<ApiResponse<UserApprovalListItemResponse>> {
    const response = await apiClient.get<ApiResponse<UserApprovalListItemResponse>>(
      `/api/admin/users/${userId}`
    );
    return response.data;
  },

  // Approve or reject user
  async approveOrRejectUser(
    userId: number,
    request: ApproveOrRejectUserRequest
  ): Promise<ApiResponse<object>> {
    const response = await apiClient.post<ApiResponse<object>>(
      `/api/admin/users/${userId}/approval`,
      request
    );
    return response.data;
  },

  // Set account status
  async setAccountStatus(
    accountId: number,
    request: SetAccountStatusRequest
  ): Promise<ApiResponse<object>> {
    const response = await apiClient.put<ApiResponse<object>>(
      `/api/admin/accounts/${accountId}/status`,
      request
    );
    return response.data;
  },

  // Verify IC document
  async verifyIcDocument(
    documentId: number,
    request: VerifyKycDocumentRequest
  ): Promise<ApiResponse<object>> {
    const response = await apiClient.put<ApiResponse<object>>(
      `/api/admin/kyc/ic/${documentId}/verify`,
      request
    );
    return response.data;
  },

  // Verify passport document
  async verifyPassportDocument(
    documentId: number,
    request: VerifyKycDocumentRequest
  ): Promise<ApiResponse<object>> {
    const response = await apiClient.put<ApiResponse<object>>(
      `/api/admin/kyc/passport/${documentId}/verify`,
      request
    );
    return response.data;
  },

  // Verify living identity document
  async verifyLivingIdentityDocument(
    documentId: number,
    request: VerifyKycDocumentRequest
  ): Promise<ApiResponse<object>> {
    const response = await apiClient.put<ApiResponse<object>>(
      `/api/admin/kyc/living-identity/${documentId}/verify`,
      request
    );
    return response.data;
  },

  // Get dashboard metrics
  async getDashboardMetrics(): Promise<ApiResponse<AdminDashboardMetricsResponse>> {
    const response = await apiClient.get<ApiResponse<AdminDashboardMetricsResponse>>(
      '/api/admin/dashboard/metrics'
    );
    return response.data;
  },

  // Get users (dashboard)
  async getUsers(
    search?: string,
    status?: string,
    page: number = 1,
    pageSize: number = 10
  ): Promise<ApiResponse<PaginatedListResponse<UserListItemResponse>>> {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('pageSize', pageSize.toString());
    if (search) params.append('search', search);
    if (status) params.append('status', status);
    const response = await apiClient.get<ApiResponse<PaginatedListResponse<UserListItemResponse>>>(
      `/api/admin/dashboard/users?${params.toString()}`
    );
    return response.data;
  },

  // Get user status
  async getUserStatus(userId: number): Promise<ApiResponse<UserStatusResponse>> {
    const response = await apiClient.get<ApiResponse<UserStatusResponse>>(
      `/api/admin/dashboard/users/${userId}/status`
    );
    return response.data;
  },

  // Get risk review transactions
  async getRiskReviewTransactions(
    riskLevel?: RiskLevel,
    status?: TransactionStatus,
    pageNumber: number = 1,
    pageSize: number = 20
  ): Promise<ApiResponse<PaginatedListResponse<TransactionResponse>>> {
    const params = new URLSearchParams();
    if (riskLevel !== undefined) {
      params.append('riskLevel', riskLevel.toString());
    } else {
      // Default to high risk if not specified? Or let backend handle valid defaults.
      // Spec usually implies query params are optional.
    }
    if (status !== undefined) params.append('status', status.toString());

    params.append('pageNumber', pageNumber.toString());
    params.append('pageSize', pageSize.toString());
    const response = await apiClient.get<ApiResponse<PaginatedListResponse<TransactionResponse>>>(
      `/api/admin/transactions/risk-review?${params.toString()}`
    );
    return response.data;
  },

  // Review transaction
  async reviewTransaction(
    transactionId: number,
    request: ReviewTransactionRequest
  ): Promise<ApiResponse<TransactionResponse>> {
    const response = await apiClient.post<ApiResponse<TransactionResponse>>(
      `/api/admin/transactions/${transactionId}/review`,
      request
    );
    return response.data;
  },

  // Issue card
  async issueCard(request: IssueCardRequest): Promise<ApiResponse<CardResponse>> {
    const response = await apiClient.post<ApiResponse<CardResponse>>('/api/admin/cards', request);
    return response.data;
  },

  // List cards by account
  async listCardsByAccount(accountId: number): Promise<ApiResponse<CardResponse[]>> {
    const response = await apiClient.get<ApiResponse<CardResponse[]>>(
      `/api/admin/cards/account/${accountId}`
    );
    return response.data;
  },

  // Revoke card
  async revokeCard(cardId: number): Promise<ApiResponse<object>> {
    const response = await apiClient.put<ApiResponse<object>>(`/api/admin/cards/${cardId}/revoke`);
    return response.data;
  },

  // List payroll jobs
  async listPayrollJobs(
    pageNumber: number = 1,
    pageSize: number = 10
  ): Promise<ApiResponse<PaginatedListResponse<PayrollJobResponse>>> {
    const params = new URLSearchParams();
    params.append('pageNumber', pageNumber.toString());
    params.append('pageSize', pageSize.toString());
    const response = await apiClient.get<ApiResponse<PaginatedListResponse<PayrollJobResponse>>>(
      `/api/admin/payroll?${params.toString()}`
    );
    return response.data;
  },

  // Create payroll job (Single user per request)
  async createPayrollJob(request: CreatePayrollJobRequest): Promise<ApiResponse<PayrollJobResponse>> {
    const response = await apiClient.post<ApiResponse<PayrollJobResponse>>('/api/admin/payroll', request);
    return response.data;
  },

  // Get payroll job by ID
  async getPayrollJob(jobId: number): Promise<ApiResponse<PayrollJobResponse>> {
    const response = await apiClient.get<ApiResponse<PayrollJobResponse>>(`/api/admin/payroll/${jobId}`);
    return response.data;
  },

  // Update payroll job
  async updatePayrollJob(
    jobId: number,
    request: UpdatePayrollJobRequest
  ): Promise<ApiResponse<PayrollJobResponse>> {
    const response = await apiClient.put<ApiResponse<PayrollJobResponse>>(
      `/api/admin/payroll/${jobId}`,
      request
    );
    return response.data;
  },

  // Delete payroll job
  async deletePayrollJob(jobId: number): Promise<ApiResponse<object>> {
    const response = await apiClient.delete<ApiResponse<object>>(`/api/admin/payroll/${jobId}`);
    return response.data;
  },
};
