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
  email?: string;
  phone?: string;
  role: 'user' | 'admin';
  status: 'pending' | 'approved' | 'blocked';
  joinDate: string;
  selfie?: string; // Base64 or URL
  documents?: {
    main?: string;
    secondary?: string;
    residenceFront?: string;
    residenceBack?: string;
  };
}

// Mock Data
const MOCK_ACCOUNTS: Account[] = [
  { id: '1', type: 'Checking', accountNumber: '**** 1234', balance: 12500.50 },
  { id: '2', type: 'Savings', accountNumber: '**** 5678', balance: 50000.00 },
];

const MOCK_USERS: MockUser[] = [
  { id: '1', firstName: 'John', lastName: 'Doe', phone: '+9647701234567', email: 'john@example.com', role: 'user', status: 'approved', joinDate: '2026-01-15' },
  {
    id: '2', firstName: 'Ahmed', lastName: 'Ali', phone: '+9647809876543', email: 'ahmed@example.com', role: 'user',
    status: 'pending',
    joinDate: '2024-02-15',
    selfie: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    documents: {
      main: 'https://images.unsplash.com/photo-1633533452097-9e7975f7dd56?w=600&h=400&fit=crop',
      secondary: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?w=600&h=400&fit=crop',
      residenceFront: 'https://images.unsplash.com/photo-1586041828039-b8d712e584c6?w=600&h=400&fit=crop',
      residenceBack: 'https://images.unsplash.com/photo-1586041828039-b8d712e584c6?w=600&h=400&fit=crop'
    }
  },
  {
    id: '3',
    firstName: 'Sarah', lastName: 'Omer', phone: '+9647501112233', email: 'sara@example.com', role: 'user', status: 'blocked', joinDate: '2025-12-10',
    selfie: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop',
    documents: {
      main: 'https://images.unsplash.com/photo-1633533452097-9e7975f7dd56?w=600&h=400&fit=crop'
    }
  },
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

  deleteUser: async (userId: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = MOCK_USERS.findIndex(u => u.id === userId);
        if (index !== -1) MOCK_USERS.splice(index, 1);
        resolve(true);
      }, 500);
    });
  },

  updateUser: async (userId: string, data: any): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = MOCK_USERS.findIndex(u => u.id === userId);
        if (index !== -1) {
          MOCK_USERS[index] = { ...MOCK_USERS[index], ...data };
        }
        resolve(true);
      }, 500);
    });
  },

  processSalaries: async (employees: any[]): Promise<{ success: boolean; count: number }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Processing salaries for:", employees);
        resolve({ success: true, count: employees.length });
      }, 2000);
    });
  },

  registerUser: async (user: MockUser): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        MOCK_USERS.push(user);
        resolve(true);
      }, 800);
    });
  }
};
