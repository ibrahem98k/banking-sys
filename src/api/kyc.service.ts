import apiClient from './axios';
import type {
  ApiResponse,
  KycStatusResponse,
  SubmitIcDocumentRequest,
  SubmitPassportDocumentRequest,
  SubmitLivingIdentityDocumentRequest,
} from '../types/api';

export const kycService = {
  // Submit IC document
  async submitIcDocument(request: SubmitIcDocumentRequest): Promise<ApiResponse<number>> {
    const response = await apiClient.post<ApiResponse<number>>('/api/kyc/ic', request);
    return response.data;
  },

  // Submit passport document
  async submitPassportDocument(request: SubmitPassportDocumentRequest): Promise<ApiResponse<number>> {
    const response = await apiClient.post<ApiResponse<number>>('/api/kyc/passport', request);
    return response.data;
  },

  // Submit living identity document
  async submitLivingIdentityDocument(
    request: SubmitLivingIdentityDocumentRequest
  ): Promise<ApiResponse<number>> {
    const response = await apiClient.post<ApiResponse<number>>('/api/kyc/living-identity', request);
    return response.data;
  },

  // Get KYC status
  async getStatus(): Promise<ApiResponse<KycStatusResponse>> {
    const response = await apiClient.get<ApiResponse<KycStatusResponse>>('/api/kyc/status');
    return response.data;
  },
};
