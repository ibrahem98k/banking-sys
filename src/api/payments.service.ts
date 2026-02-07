import apiClient from './axios';
import type {
  ApiResponse,
  PaymentResponse,
  TopUpRequest,
} from '../types/api';

export const paymentsService = {
  // Top up
  async topUp(request: TopUpRequest): Promise<ApiResponse<PaymentResponse>> {
    const response = await apiClient.post<ApiResponse<PaymentResponse>>('/api/payments/top-up', request);
    return response.data;
  },

  // Get payment by ID
  async getPayment(paymentId: number): Promise<ApiResponse<PaymentResponse>> {
    const response = await apiClient.get<ApiResponse<PaymentResponse>>(`/api/payments/${paymentId}`);
    return response.data;
  },

  // Verify payment
  async verifyPayment(paymentId: number): Promise<ApiResponse<PaymentResponse>> {
    const response = await apiClient.post<ApiResponse<PaymentResponse>>(
      `/api/payments/${paymentId}/verify`
    );
    return response.data;
  },

  // Cancel payment
  async cancelPayment(paymentId: number): Promise<ApiResponse<PaymentResponse>> {
    const response = await apiClient.post<ApiResponse<PaymentResponse>>(
      `/api/payments/${paymentId}/cancel`
    );
    return response.data;
  },
};
