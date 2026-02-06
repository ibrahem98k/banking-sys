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

// Mock Data
const MOCK_ACCOUNTS: Account[] = [
  { id: '1', type: 'Checking', accountNumber: '**** 1234', balance: 12500.50 },
  { id: '2', type: 'Savings', accountNumber: '**** 5678', balance: 50000.00 },
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

  transfer: async (fromId: string, _toAccount: string, amount: number): Promise<{ success: boolean; message: string }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (amount <= 0) {
          reject({ success: false, message: "Invalid amount" });
          return;
        }
        // Simple mock logic: Find account and check balance
        const account = MOCK_ACCOUNTS.find(a => a.id === fromId);
        if (!account) {
          reject({ success: false, message: "Account not found" });
          return;
        }
        if (account.balance < amount) {
          reject({ success: false, message: "Insufficient funds" });
          return;
        }

        // Simulate success
        // In a real mock, we'd update state, but for this stateless mock we just return success
        // We could also simulate a random failure for "security" checks
        resolve({ success: true, message: "Transfer successful" });
      }, 500);
    });
  }
};
