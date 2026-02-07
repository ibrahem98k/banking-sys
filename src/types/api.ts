// Common API Response Wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  code?: string;
  errors?: { [key: string]: string[] };
}

// Paginated Response
export interface PaginatedListResponse<T> {
  items: T[];
  totalCount: number;
  pageIndex: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

// Auth Types
export interface LoginRequest {
  phone: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  tokenExpiresAt: string;
  refreshToken: string;
  refreshTokenExpiresAt: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface LogoutRequest {
  refreshToken: string;
}

export interface RegisterRequest {
  fullName: string;
  phone: string;
  password: string;
  verificationCode: string;
  imageUrl?: string;
  icDocument?: RegisterIcDocumentDto;
  passportDocument?: RegisterPassportDocumentDto;
  livingIdentityDocument?: RegisterLivingIdentityDocumentDto;
}

export interface RegisterResponse {
  id: number;
  fullName: string;
  phone: string;
  token: string;
  tokenExpiresAt: string;
  refreshToken: string;
  refreshTokenExpiresAt: string;
}

export interface RegisterIcDocumentDto {
  number: string;
  imageUrl: string;
}

export interface RegisterPassportDocumentDto {
  number: string;
  expiryDate: string;
  imageUrl: string;
}

export interface RegisterLivingIdentityDocumentDto {
  imageUrl: string;
}

export interface SendVerificationRequest {
  phoneNumber: string;
}

export interface ForgotPasswordRequest {
  phone: string;
}

export interface ResetPasswordRequest {
  phone: string;
  verificationCode: string;
  newPassword: string;
}

export interface User {
  id: number;
  fullName: string;
  phone: string;
  passwordHash?: string; // Should not be exposed, but included for completeness
  role: UserRole;
  imageUrl?: string;
  kycStatus: KycStatus;
  kybStatus: KybStatus;
  approvalStatus: ApprovalStatus;
  createdAt: string;
  updatedAt?: string;
}

// Account Types
export interface AccountResponse {
  id: number;
  userId: number;
  accountNumber: string;
  balance: number;
  currency: string;
  status: AccountStatus;
  accountType: AccountType;
  createdAt: string;
}

// Card Types
export interface CardResponse {
  id: number;
  accountId: number;
  numberMasked: string;
  type: CardType;
  expiryDate: string;
  isActive: boolean;
  isExpired: boolean;
  isEmployeeCard: boolean;
  createdAt: string;
}

export interface IssueCardRequest {
  accountId: number;
  cardType: CardType;
  isEmployeeCard?: boolean;
}

// Transaction Types
export interface TransactionResponse {
  id: number;
  fromAccountId: number;
  toAccountNumber: string;
  amount: number;
  transactionType: 'DEBIT' | 'CREDIT';
  status: TransactionStatus;
  purpose?: string;
  idempotencyKey?: string;
  createdAt: string;
  failureReason?: FailureReason;
  retryCount: number;
  riskScore?: number;
  riskLevel?: RiskLevel;
  statusChangedAt?: string;
  retryRecommended?: boolean;
  retryAfterSeconds?: number;
  maxRetries?: number;
}

export interface CreateTransferRequest {
  fromAccountId: number;
  toAccountNumber: string;
  amount: number;
  purpose?: string;
  idempotencyKey?: string;
}

// Dashboard Types
export interface DashboardResponse {
  totalBalance: number;
  totalDebit: number;
  totalCredit: number;
  user: UserInfoDto;
  cards: CardResponse[];
  recentTransactions: TransactionListItemDto[];
}

export interface UserInfoDto {
  id: number;
  name: string;
  phone: string;
  accountCreatedAt: string;
}

export interface TransactionListItemDto {
  id: number;
  amount: number;
  direction: string;
  status: string;
  createdAt: string;
}

// Profile Types
export interface ProfileResponse {
  id: number;
  fullName: string;
  phone: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface UpdateProfileRequest {
  fullName?: string;
  phone?: string;
  profileImageUrl?: string;
}

// KYC Types
export interface KycStatusResponse {
  kycStatus: KycStatus;
  kybStatus: KybStatus;
  documentType?: string;
  documentStatus?: KycDocumentStatus;
}

export interface SubmitIcDocumentRequest {
  number: string;
  imageUrl: string;
}

export interface SubmitPassportDocumentRequest {
  number: string;
  expiryDate: string;
  imageUrl: string;
}

export interface SubmitLivingIdentityDocumentRequest {
  imageUrl: string;
}

// Analytics Types
export interface AnalyticsOverviewResponse {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  transactionCount: number;
  period: string;
}

export interface AnalyticsTransactionsResponse {
  transactions: TransactionListItemDto[];
  totalIncome: number;
  totalExpenses: number;
  period: string;
}

export interface AnalyticsBalanceTrendResponse {
  dataPoints: Array<{
    date: string;
    balance: number;
  }>;
  period: string;
}

export interface TransactionListItemResponse {
  id: number;
  amount: number;
  direction: string;
  status: string;
  createdAt: string;
}

// Payment Types
export interface PaymentResponse {
  id: number;
  paymentGateway: string;
  gatewayPaymentId?: string;
  requestId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  paymentUrl?: string;
  transactionId?: number;
  createdAt: string;
  updatedAt?: string;
}

export interface TopUpRequest {
  accountId: number;
  amount: number;
  currency: string;
  requestId: string;
}

// Admin Types
export interface UserApprovalListItemResponse {
  id: number;
  fullName: string;
  phone: string;
  kycStatus: KycStatus;
  kybStatus: KybStatus;
  approvalStatus: ApprovalStatus;
  accountId?: number;
  accountNumber?: string;
  accountStatus?: AccountStatus;
}

export interface UserListItemResponse {
  id: number;
  fullName: string;
  phone: string;
  role: UserRole;
  approvalStatus: ApprovalStatus;
  createdAt: string;
}

export interface UserStatusResponse {
  userId: number;
  approvalStatus: ApprovalStatus;
  kycStatus: KycStatus;
  kybStatus: KybStatus;
  accountStatus?: AccountStatus;
}

export interface ApproveOrRejectUserRequest {
  approvalStatus: ApprovalStatus;
}

export interface SetAccountStatusRequest {
  status: AccountStatus;
}

export interface VerifyKycDocumentRequest {
  status: KycDocumentStatus;
  rejectionReason?: string;
}

export interface AdminDashboardMetricsResponse {
  totalUsers: number;
  pendingApprovals: number;
  totalAccounts: number;
  totalBalance: number;
  recentActivity: any[];
}

export interface ReviewTransactionRequest {
  action: 'approve' | 'reject';
  reason?: string;
}

// Payroll Types
export interface PayrollJobResponse {
  id: number;
  name: string;
  description?: string;
  accountId: number;
  accountNumber: string;
  amount: number;
  frequency: PayrollFrequency;
  nextRunDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreatePayrollJobRequest {
  name: string;
  description?: string;
  accountId: number;
  amount: number;
  frequency: PayrollFrequency;
  employeeIds: number[];
}

export interface UpdatePayrollJobRequest {
  name?: string;
  description?: string;
  amount?: number;
  frequency?: PayrollFrequency;
  isActive?: boolean;
  employeeIds?: number[];
}

// Enums - using string literal unions due to TypeScript config
export type UserRole = 1 | 2;
export const UserRole = {
  Admin: 1 as UserRole,
  Customer: 2 as UserRole,
};

export type ApprovalStatus = 'PendingApproval' | 'Approved' | 'Rejected';
export const ApprovalStatus = {
  PendingApproval: 'PendingApproval' as ApprovalStatus,
  Approved: 'Approved' as ApprovalStatus,
  Rejected: 'Rejected' as ApprovalStatus,
};

export type KycStatus = 'Pending' | 'Verified' | 'Rejected';
export const KycStatus = {
  Pending: 'Pending' as KycStatus,
  Verified: 'Verified' as KycStatus,
  Rejected: 'Rejected' as KycStatus,
};

export type KybStatus = 'Pending' | 'Verified' | 'Rejected';
export const KybStatus = {
  Pending: 'Pending' as KybStatus,
  Verified: 'Verified' as KybStatus,
  Rejected: 'Rejected' as KybStatus,
};

export type KycDocumentStatus = 'Pending' | 'Verified' | 'Rejected';
export const KycDocumentStatus = {
  Pending: 'Pending' as KycDocumentStatus,
  Verified: 'Verified' as KycDocumentStatus,
  Rejected: 'Rejected' as KycDocumentStatus,
};

export type AccountStatus = 'Active' | 'Suspended' | 'Closed';
export const AccountStatus = {
  Active: 'Active' as AccountStatus,
  Suspended: 'Suspended' as AccountStatus,
  Closed: 'Closed' as AccountStatus,
};

export type AccountType = 'Checking' | 'Savings';
export const AccountType = {
  Checking: 'Checking' as AccountType,
  Savings: 'Savings' as AccountType,
};

export type CardType = 'Debit' | 'Credit';
export const CardType = {
  Debit: 'Debit' as CardType,
  Credit: 'Credit' as CardType,
};

export type TransactionStatus = 'Pending' | 'Sending' | 'Completed' | 'Failed' | 'Cancelled';
export const TransactionStatus = {
  Pending: 'Pending' as TransactionStatus,
  Sending: 'Sending' as TransactionStatus,
  Completed: 'Completed' as TransactionStatus,
  Failed: 'Failed' as TransactionStatus,
  Cancelled: 'Cancelled' as TransactionStatus,
};

export type FailureReason = 'InsufficientFunds' | 'InvalidAccount' | 'RiskBlocked' | 'SystemError' | 'Timeout';
export const FailureReason = {
  InsufficientFunds: 'InsufficientFunds' as FailureReason,
  InvalidAccount: 'InvalidAccount' as FailureReason,
  RiskBlocked: 'RiskBlocked' as FailureReason,
  SystemError: 'SystemError' as FailureReason,
  Timeout: 'Timeout' as FailureReason,
};

export type RiskLevel = 'Low' | 'Medium' | 'High';
export const RiskLevel = {
  Low: 'Low' as RiskLevel,
  Medium: 'Medium' as RiskLevel,
  High: 'High' as RiskLevel,
};

export type PaymentStatus = 'Pending' | 'Processing' | 'Completed' | 'Failed' | 'Cancelled';
export const PaymentStatus = {
  Pending: 'Pending' as PaymentStatus,
  Processing: 'Processing' as PaymentStatus,
  Completed: 'Completed' as PaymentStatus,
  Failed: 'Failed' as PaymentStatus,
  Cancelled: 'Cancelled' as PaymentStatus,
};

export type PayrollFrequency = 'Weekly' | 'BiWeekly' | 'Monthly';
export const PayrollFrequency = {
  Weekly: 'Weekly' as PayrollFrequency,
  BiWeekly: 'BiWeekly' as PayrollFrequency,
  Monthly: 'Monthly' as PayrollFrequency,
};
