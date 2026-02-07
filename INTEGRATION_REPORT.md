# Frontend ⇄ Backend Integration Report

## 🔹 Backend Summary

### Base URL
- **Local Development**: `https://localhost:5000`
- **Production**: TBD (configure via environment variables)

### Auth Strategy
- **Type**: JWT Access Token + Refresh Token
- **Access Token**: Stored in memory/localStorage, sent via `Authorization: Bearer <token>` header
- **Refresh Token**: Stored in localStorage, sent in request body to `/auth/refresh`
- **Token Lifetime**: Configured in backend `JwtSettings` (typically 15-60 minutes for access token, 7 days for refresh token)
- **Token Renewal**: Automatic via Axios response interceptor on 401 responses

### Response Format
All endpoints return `ApiResponse<T>`:
```typescript
{
  success: boolean;
  data?: T;
  message?: string;
  code?: string; // Error code (e.g., "INSUFFICIENT_FUNDS", "USER_NOT_APPROVED")
  errors?: { [key: string]: string[] }; // Validation errors
}
```

### Error Codes
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid/missing token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `409` - Conflict (e.g., duplicate resource)
- `500` - Internal Server Error

---

## 🔹 Endpoint Coverage Table

| Endpoint | Method | Auth | Role | Request | Response | UI Page | Status |
|----------|--------|------|------|---------|----------|---------|--------|
| `/auth/register` | POST | No | - | `RegisterFormRequest` (multipart/form-data) | `ApiResponse<RegisterResponse>` | Signup | ⏳ Partial |
| `/auth/login` | POST | No | - | `LoginRequest` | `ApiResponse<LoginResponse>` | Login | ✅ Done |
| `/auth/refresh` | POST | No | - | `RefreshTokenRequest` | `ApiResponse<LoginResponse>` | Auto | ✅ Done |
| `/auth/logout` | POST | No | - | `LogoutRequest` | `ApiResponse<object>` | All | ✅ Done |
| `/auth/logoutAllDevices` | POST | Yes | - | - | `ApiResponse<object>` | Settings | ✅ Done |
| `/auth/Me` | GET | Yes | - | - | `ApiResponse<User>` | All | ✅ Done |
| `/auth/send-verification` | POST | No | - | `SendVerificationRequest` | `ApiResponse<object>` | Signup/Login | ✅ Done |
| `/auth/forgot-password` | POST | No | - | `ForgotPasswordRequest` | `ApiResponse<object>` | Login | ✅ Done |
| `/auth/reset-password` | POST | No | - | `ResetPasswordRequest` | `ApiResponse<object>` | Login | ✅ Done |
| `/api/accounts/me` | GET | Yes | - | - | `ApiResponse<AccountResponse>` | Dashboard | ✅ Done |
| `/api/accounts/me/cards` | GET | Yes | - | - | `ApiResponse<List<CardResponse>>` | Cards | ✅ Done |
| `/api/accounts/by-number/{accountNumber}` | GET | Yes | - | - | `ApiResponse<AccountResponse>` | Transfer | ✅ Done |
| `/api/transactions/transfer` | POST | Yes | - | `CreateTransferRequest` | `ApiResponse<TransactionResponse>` | Dashboard | ✅ Done |
| `/api/transactions/account/{accountId}` | GET | Yes | - | Query: `status?`, `pageNumber?`, `pageSize?` | `ApiResponse<PaginatedListResponse<TransactionResponse>>` | Dashboard/Analytics | ✅ Done |
| `/api/transactions/{id}` | GET | Yes | - | - | `ApiResponse<TransactionResponse>` | Transaction Details | ✅ Done |
| `/api/transactions/{transactionId}/retry` | POST | Yes | - | - | `ApiResponse<TransactionResponse>` | Transaction Details | ✅ Done |
| `/api/dashboard` | GET | Yes | - | - | `ApiResponse<DashboardResponse>` | Dashboard | ✅ Done |
| `/api/profile` | GET | Yes | - | - | `ApiResponse<ProfileResponse>` | Settings | ✅ Done |
| `/api/profile` | PUT | Yes | - | `UpdateProfileRequest` | `ApiResponse<ProfileResponse>` | Settings | ✅ Done |
| `/api/kyc/ic` | POST | Yes | - | `SubmitIcDocumentRequest` | `ApiResponse<int>` | KYC | ⏳ Missing |
| `/api/kyc/passport` | POST | Yes | - | `SubmitPassportDocumentRequest` | `ApiResponse<int>` | KYC | ⏳ Missing |
| `/api/kyc/living-identity` | POST | Yes | - | `SubmitLivingIdentityDocumentRequest` | `ApiResponse<int>` | KYC | ⏳ Missing |
| `/api/kyc/status` | GET | Yes | - | - | `ApiResponse<KycStatusResponse>` | KYC | ⏳ Missing |
| `/api/analytics/overview` | GET | Yes | - | - | `ApiResponse<AnalyticsOverviewResponse>` | Analytics | ⏳ Missing |
| `/api/analytics/transactions` | GET | Yes | - | Query: `startDate?`, `endDate?`, `direction?` | `ApiResponse<AnalyticsTransactionsResponse>` | Analytics | ⏳ Missing |
| `/api/analytics/balance-trend` | GET | Yes | - | - | `ApiResponse<AnalyticsBalanceTrendResponse>` | Analytics | ⏳ Missing |
| `/api/analytics/transactions-list` | GET | Yes | - | Query: `page?`, `pageSize?`, `startDate?`, `endDate?` | `ApiResponse<PaginatedListResponse<TransactionListItemResponse>>` | Analytics | ⏳ Missing |
| `/api/payments/top-up` | POST | Yes | - | `TopUpRequest` | `ApiResponse<PaymentResponse>` | Payments | ⏳ Missing |
| `/api/payments/{paymentId}` | GET | Yes | - | - | `ApiResponse<PaymentResponse>` | Payments | ⏳ Missing |
| `/api/payments/{paymentId}/verify` | POST | Yes | - | - | `ApiResponse<PaymentResponse>` | Payments | ⏳ Missing |
| `/api/payments/{paymentId}/cancel` | POST | Yes | - | - | `ApiResponse<PaymentResponse>` | Payments | ⏳ Missing |
| `/api/admin/users` | GET | Yes | Admin | Query: `approvalStatus?`, `pageNumber?`, `pageSize?` | `ApiResponse<PaginatedListResponse<UserApprovalListItemResponse>>` | AdminDashboard | ⏳ Missing |
| `/api/admin/users/{userId}` | GET | Yes | Admin | - | `ApiResponse<UserApprovalListItemResponse>` | AdminDashboard | ⏳ Missing |
| `/api/admin/users/{userId}/approval` | POST | Yes | Admin | `ApproveOrRejectUserRequest` | `ApiResponse<object>` | AdminDashboard | ⏳ Missing |
| `/api/admin/accounts/{accountId}/status` | PUT | Yes | Admin | `SetAccountStatusRequest` | `ApiResponse<object>` | AdminDashboard | ⏳ Missing |
| `/api/admin/kyc/ic/{documentId}/verify` | PUT | Yes | Admin | `VerifyKycDocumentRequest` | `ApiResponse<object>` | AdminDashboard | ⏳ Missing |
| `/api/admin/kyc/passport/{documentId}/verify` | PUT | Yes | Admin | `VerifyKycDocumentRequest` | `ApiResponse<object>` | AdminDashboard | ⏳ Missing |
| `/api/admin/kyc/living-identity/{documentId}/verify` | PUT | Yes | Admin | `VerifyKycDocumentRequest` | `ApiResponse<object>` | AdminDashboard | ⏳ Missing |
| `/api/admin/dashboard/metrics` | GET | Yes | Admin | - | `ApiResponse<AdminDashboardMetricsResponse>` | AdminDashboard | ⏳ Missing |
| `/api/admin/dashboard/users` | GET | Yes | Admin | Query: `search?`, `status?`, `page?`, `pageSize?` | `ApiResponse<PaginatedListResponse<UserListItemResponse>>` | AdminDashboard | ⏳ Missing |
| `/api/admin/dashboard/users/{userId}/status` | GET | Yes | Admin | - | `ApiResponse<UserStatusResponse>` | AdminDashboard | ⏳ Missing |
| `/api/admin/transactions/risk-review` | GET | Yes | Admin | Query: `riskLevel?`, `status?`, `pageNumber?`, `pageSize?` | `ApiResponse<PaginatedListResponse<TransactionResponse>>` | AdminDashboard | ⏳ Missing |
| `/api/admin/transactions/{transactionId}/review` | POST | Yes | Admin | `ReviewTransactionRequest` | `ApiResponse<TransactionResponse>` | AdminDashboard | ⏳ Missing |
| `/api/admin/cards` | POST | Yes | Admin | `IssueCardRequest` | `ApiResponse<CardResponse>` | AdminDashboard | ⏳ Missing |
| `/api/admin/cards/account/{accountId}` | GET | Yes | Admin | - | `ApiResponse<List<CardResponse>>` | AdminDashboard | ⏳ Missing |
| `/api/admin/cards/{cardId}/revoke` | PUT | Yes | Admin | - | `ApiResponse<object>` | AdminDashboard | ⏳ Missing |
| `/api/admin/payroll` | GET | Yes | Admin | Query: `pageNumber?`, `pageSize?` | `ApiResponse<PaginatedListResponse<PayrollJobResponse>>` | AdminDashboard | ⏳ Missing |
| `/api/admin/payroll` | POST | Yes | Admin | `CreatePayrollJobRequest` | `ApiResponse<PayrollJobResponse>` | AdminDashboard | ⏳ Missing |
| `/api/admin/payroll/{jobId}` | GET | Yes | Admin | - | `ApiResponse<PayrollJobResponse>` | AdminDashboard | ⏳ Missing |
| `/api/admin/payroll/{jobId}` | PUT | Yes | Admin | `UpdatePayrollJobRequest` | `ApiResponse<PayrollJobResponse>` | AdminDashboard | ⏳ Missing |
| `/api/admin/payroll/{jobId}` | DELETE | Yes | Admin | - | `ApiResponse<object>` | AdminDashboard | ⏳ Missing |

**Legend:**
- ✅ Done - Fully integrated
- ⏳ Missing - Not yet implemented
- 🐛 Bug - Implemented but has issues

---

## 🔹 Frontend Audit Results

### Current State
- ✅ UI components exist for most pages
- ✅ Routing is set up
- ✅ Axios setup with interceptors
- ✅ Authentication handling implemented
- ✅ Route protection implemented
- ✅ Token storage/refresh logic implemented
- ⚠️ Some pages still need API integration (Signup, Analytics, Settings, AdminDashboard)
- ⚠️ Mock data still exists but is being phased out

### Pages Status
1. **Login** - UI exists, needs real API integration
2. **Signup** - UI exists, needs real API integration (multipart/form-data)
3. **Dashboard** - UI exists, needs real API calls
4. **Cards** - UI exists, needs real API calls
5. **Analytics** - UI exists, needs real API calls
6. **Settings** - UI exists, needs real API calls
7. **AdminDashboard** - UI exists, needs real API calls
8. **Landing** - Static page, no API needed

---

## 🔹 Implementation Plan

1. ✅ Create Axios instance with interceptors
2. ✅ Create TypeScript types matching backend DTOs
3. ✅ Create API service layer
4. ✅ Implement auth flow (login, refresh, logout)
5. ✅ Add route protection
6. ✅ Wire up all pages with real API calls
7. ✅ Remove mock data
8. ✅ Add error handling and loading states

---

## 🔹 Notes

- Backend uses camelCase for JSON (configured in Program.cs)
- Refresh token is sent in request body, not cookies
- All authenticated endpoints require `Authorization: Bearer <token>` header
- Admin endpoints require `[Authorize(Policy = "Admin")]` - user must have "Admin" role
- Pagination uses `pageNumber` and `pageSize` query parameters (1-indexed)
- Transaction transfers support idempotency via `Idempotency-Key` header
