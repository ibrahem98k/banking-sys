import {
    AccountStatus,
    ApprovalStatus,
    KycStatus,
    KybStatus,
    TransactionStatus,
    UserRole,
    RiskLevel,
    PayrollFrequency,
    PayrollJobStatus,
    CardType,
    PaymentStatus,
    KycDocumentStatus
} from '../types/api';

// --- Account Status ---
export const getAccountStatusLabel = (status: AccountStatus): string => {
    switch (status) {
        case AccountStatus.Active: return 'Active';
        case AccountStatus.Suspended: return 'Suspended';
        case AccountStatus.Closed: return 'Closed';
        default: return 'Unknown';
    }
};

export const getAccountStatusColor = (status: AccountStatus): string => {
    switch (status) {
        case AccountStatus.Active: return 'success';
        case AccountStatus.Suspended: return 'warning';
        case AccountStatus.Closed: return 'destructive';
        default: return 'secondary';
    }
};

// --- Approval Status ---
export const getApprovalStatusLabel = (status: ApprovalStatus): string => {
    switch (status) {
        case ApprovalStatus.PendingApproval: return 'Pending Approval';
        case ApprovalStatus.Approved: return 'Approved';
        case ApprovalStatus.Rejected: return 'Rejected';
        default: return 'Unknown';
    }
};

export const getApprovalStatusColor = (status: ApprovalStatus): string => {
    switch (status) {
        case ApprovalStatus.PendingApproval: return 'warning';
        case ApprovalStatus.Approved: return 'success';
        case ApprovalStatus.Rejected: return 'destructive';
        default: return 'secondary';
    }
};

// --- KYC Status ---
export const getKycStatusLabel = (status: KycStatus): string => {
    switch (status) {
        case KycStatus.Pending: return 'Pending';
        case KycStatus.Verified: return 'Verified';
        case KycStatus.Rejected: return 'Rejected';
        default: return 'Unknown';
    }
};

export const getKycStatusColor = (status: KycStatus): string => {
    switch (status) {
        case KycStatus.Pending: return 'warning';
        case KycStatus.Verified: return 'success';
        case KycStatus.Rejected: return 'destructive';
        default: return 'secondary';
    }
};

// --- User Role ---
export const getUserRoleLabel = (role: UserRole): string => {
    switch (role) {
        case UserRole.Admin: return 'Admin';
        case UserRole.Customer: return 'Customer';
        default: return 'User';
    }
};

// --- Transaction Status ---
export const getTransactionStatusLabel = (status: TransactionStatus): string => {
    switch (status) {
        case TransactionStatus.Pending: return 'Pending';
        case TransactionStatus.Sending: return 'Sending';
        case TransactionStatus.Completed: return 'Completed';
        case TransactionStatus.Failed: return 'Failed';
        case TransactionStatus.Cancelled: return 'Cancelled';
        case TransactionStatus.Refunded: return 'Refunded';
        default: return 'Unknown';
    }
};

export const getTransactionStatusColor = (status: TransactionStatus): string => {
    switch (status) {
        case TransactionStatus.Completed: return 'success';
        case TransactionStatus.Pending:
        case TransactionStatus.Sending: return 'warning';
        case TransactionStatus.Failed:
        case TransactionStatus.Cancelled: return 'destructive';
        case TransactionStatus.Refunded: return 'default';
        default: return 'secondary';
    }
};

// --- Card Type ---
export const getCardTypeLabel = (type: CardType): string => {
    switch (type) {
        case CardType.Debit: return 'Debit';
        case CardType.Credit: return 'Credit';
        case CardType.Virtual: return 'Virtual';
        default: return 'Card';
    }
};

// --- Payroll ---
export const getPayrollFrequencyLabel = (freq: PayrollFrequency): string => {
    switch (freq) {
        case PayrollFrequency.Weekly: return 'Weekly';
        case PayrollFrequency.BiWeekly: return 'Bi-Weekly';
        case PayrollFrequency.Monthly: return 'Monthly';
        default: return 'Custom';
    }
};

export const getPayrollJobStatusLabel = (status: PayrollJobStatus): string => {
    switch (status) {
        case PayrollJobStatus.Active: return 'Active';
        case PayrollJobStatus.Paused: return 'Paused';
        case PayrollJobStatus.Cancelled: return 'Cancelled';
        default: return 'Unknown';
    }
};

export const getPayrollJobStatusColor = (status: PayrollJobStatus): string => {
    switch (status) {
        case PayrollJobStatus.Active: return 'success';
        case PayrollJobStatus.Paused: return 'warning';
        case PayrollJobStatus.Cancelled: return 'destructive';
        default: return 'secondary';
    }
};
