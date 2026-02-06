import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Card {
    id: string;
    number: string;
    holder: string;
    expiry: string;
    type: 'visa' | 'mastercard';
    frozen: boolean;
    cvv: string;
}

interface Transaction {
    id: string;
    merchant: string;
    amount: number;
    type: 'debit' | 'credit';
    date: string;
}

interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: 'user' | 'admin';
    status: 'pending' | 'approved' | 'blocked';
    tier: 'basic' | 'premium' | 'elite';
}

interface BankState {
    user: User | null;
    balance: number;
    isAuthenticated: boolean;
    allUsers: User[];
    cards: Card[];
    transactions: Transaction[];

    // Actions
    login: (userData: User) => void;
    logout: () => void;
    updateBalance: (amount: number) => void;
    setAuthenticated: (status: boolean) => void;
    addTransaction: (tx: Transaction) => void;

    // Card Actions
    addCard: (card: Card) => void;
    toggleCardFreeze: (cardId: string) => void;

    // Admin Actions
    setUsers: (users: User[]) => void;
    updateUserStatus: (userId: string, status: User['status']) => void;
}

export const useBankStore = create<BankState>()(
    persist(
        (set) => ({
            user: null,
            balance: 24500.75,
            isAuthenticated: false,
            allUsers: [],
            cards: [
                { id: 'c1', number: '4582 1290 8831 8910', holder: 'IBRAHIM AL-F', expiry: '12/28', type: 'visa', frozen: false, cvv: '882' },
                { id: 'c2', number: '5521 9902 1120 4432', holder: 'IBRAHIM AL-F', expiry: '05/27', type: 'mastercard', frozen: false, cvv: '121' }
            ],
            transactions: [
                { id: '1', merchant: 'Netflix Subscription', amount: -15.99, type: 'debit', date: 'Today, 10:42 AM' },
                { id: '2', merchant: 'Salary Deposit', amount: 4800.00, type: 'credit', date: 'Yesterday, 03:15 PM' },
                { id: '3', merchant: 'Grocery Store', amount: -84.20, type: 'debit', date: 'Yesterday, 09:00 AM' },
                { id: '4', merchant: 'Starbucks Coffee', amount: -6.50, type: 'debit', date: '2 days ago, 08:30 AM' }
            ],

            login: (userData) => set({
                user: userData,
                isAuthenticated: true
            }),

            logout: () => set({
                user: null,
                isAuthenticated: false
            }),

            updateBalance: (amount) => set((state) => ({
                balance: state.balance + amount
            })),

            setAuthenticated: (status) => set({
                isAuthenticated: status
            }),

            addTransaction: (tx) => set((state) => ({
                transactions: [tx, ...state.transactions]
            })),

            addCard: (card) => set((state) => ({
                cards: [...state.cards, card]
            })),

            toggleCardFreeze: (cardId) => set((state) => ({
                cards: state.cards.map(c => c.id === cardId ? { ...c, frozen: !c.frozen } : c)
            })),

            setUsers: (users) => set({ allUsers: users }),

            updateUserStatus: (userId, status) => set((state) => ({
                allUsers: state.allUsers.map(u => u.id === userId ? { ...u, status } : u)
            })),
        }),
        {
            name: 'pesse-bank-storage',
        }
    )
);
