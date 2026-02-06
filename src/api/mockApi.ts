export interface Account {
  id: string;
  type: 'Checking' | 'Savings';
  accountNumber: string;
  balance: number;
}

export interface Transaction {
  id: string;
  amount: number;
  type: 'DEBIT' | 'CREDIT';
  date: string;
}

export interface MockUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'user' | 'admin';
  status: 'pending' | 'approved' | 'blocked';
  joinDate: string;
}

// Mock Data
const MOCK_ACCOUNTS: Account[] = [
  { id: '1', type: 'Checking', accountNumber: '**** 1234', balance: 12500.50 },
  { id: '2', type: 'Savings', accountNumber: '**** 5678', balance: 50000.00 },
];

const MOCK_USERS: MockUser[] = [
  { id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com', role: 'user', status: 'approved', joinDate: '2026-01-15' },
  { id: '2', firstName: 'Ahmed', lastName: 'Ali', email: 'ahmed@example.com', role: 'user', status: 'pending', joinDate: '2026-02-01' },
  { id: '3', firstName: 'Sara', lastName: 'Omer', email: 'sara@example.com', role: 'user', status: 'blocked', joinDate: '2025-12-10' },
  { id: '4', firstName: 'Admin', lastName: 'Pesse', email: 'admin@pesse.com', role: 'admin', status: 'approved', joinDate: '2025-01-01' },
];

export const mockApi = {
  login: async (_email: string, _password: string): Promise<{ token: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ token: 'fake-jwt-token-123' });
      }, 500);
    });
  },
  getAccounts: async (): Promise<Account[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_ACCOUNTS);
      }, 500);
    });
  },

  getAllUsers: async (): Promise<MockUser[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_USERS);
      }, 800);
    });
  },

  updateUserStatus: async (userId: string, status: MockUser['status']): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = MOCK_USERS.find(u => u.id === userId);
        if (user) user.status = status;
        resolve(true);
      }, 500);
    });
  },

  transfer: async (fromId: string, _toAccount: string, amount: number): Promise<{ success: boolean; message: string }> => {
    // ... logic ...
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (amount <= 0) {
          reject({ success: false, message: "Invalid amount" });
          return;
        }
        const account = MOCK_ACCOUNTS.find(a => a.id === fromId);
        if (!account) {
          reject({ success: false, message: "Account not found" });
          return;
        }
        if (account.balance < amount) {
          reject({ success: false, message: "Insufficient funds" });
          return;
        }
        resolve({ success: true, message: "Transfer successful" });
      }, 500);
    });
  }
};
