import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, Coffee, Monitor, ArrowDownLeft, CreditCard } from 'lucide-react';
import { useEffect, useState } from 'react';
import { dashboardService } from '../../api/dashboard.service';
import { accountsService } from '../../api/accounts.service';
import { useBankStore } from '../../store/useBankStore';
import type { TransactionListItemDto } from '../../types/api';

const getIcon = (merchant: string) => {
    const m = merchant.toLowerCase();
    if (m.includes('netflix')) return Monitor;
    if (m.includes('starbucks') || m.includes('coffee')) return Coffee;
    if (m.includes('salary') || m.includes('deposit')) return ArrowDownLeft;
    if (m.includes('grocery') || m.includes('store')) return ShoppingBag;
    return CreditCard;
};

export const ActivityList: React.FC = () => {
    const [transactions, setTransactions] = useState<TransactionListItemDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                // Check if user is authenticated
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    setLoading(false);
                    return;
                }

                // Check if account exists first to avoid unnecessary calls
                try {
                    const accountCheck = await accountsService.getMyAccount();
                    if (!accountCheck.success || accountCheck.message?.toLowerCase().includes('account not found')) {
                        setError('Your account is being set up. Please wait for approval.');
                        setLoading(false);
                        return;
                    }
                } catch (accountError: any) {
                    if (accountError.response?.data?.message?.toLowerCase().includes('account not found')) {
                        setError('Your account is being set up. Please wait for approval.');
                        setLoading(false);
                        return;
                    }
                }

                const response = await dashboardService.getDashboard();
                if (response.success && response.data) {
                    setTransactions(response.data.recentTransactions || []);
                    setError(null);
                } else {
                    // If account not found, show a specific message
                    if (response.message?.toLowerCase().includes('account not found')) {
                        setError('Your account is being set up. Please wait for approval.');
                    } else {
                        setError(response.message || 'Failed to load transactions');
                    }
                    // Use fallback data from store if available
                    const storeTransactions = useBankStore.getState().transactions;
                    if (storeTransactions && storeTransactions.length > 0) {
                        setTransactions(storeTransactions.map(tx => ({
                            id: parseInt(tx.id) || 0,
                            amount: tx.amount,
                            direction: tx.type === 'credit' ? 'Credit' : 'Debit',
                            status: 'Completed',
                            createdAt: tx.date
                        })));
                    }
                }
            } catch (error: any) {
                console.error('Failed to fetch transactions', error);
                // Log detailed error information for debugging
                if (error.response) {
                    console.error('Error response:', {
                        status: error.response.status,
                        data: error.response.data,
                        message: error.response.data?.message || error.message
                    });
                    
                    // Handle specific error cases
                    const errorMessage = error.response.data?.message || '';
                    if (errorMessage.toLowerCase().includes('account not found')) {
                        setError('Your account is being set up. Please wait for approval.');
                    } else {
                        setError(errorMessage || `Unable to load transactions (${error.response.status})`);
                    }
                } else {
                    setError('Unable to load transactions');
                }
                
                // Fallback to store data if API fails
                try {
                    const storeTransactions = useBankStore.getState().transactions;
                    if (storeTransactions && storeTransactions.length > 0) {
                        setTransactions(storeTransactions.map(tx => ({
                            id: parseInt(tx.id) || 0,
                            amount: tx.amount,
                            direction: tx.type === 'credit' ? 'Credit' : 'Debit',
                            status: 'Completed',
                            createdAt: tx.date
                        })));
                        setError(null);
                    }
                } catch (fallbackError) {
                    console.error('Fallback also failed', fallbackError);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchTransactions();
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-pesse-gray rounded-3xl p-6 h-full shadow-lg shadow-black/5"
        >
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-black tracking-tight">Recent Activity.</h3>
                <Link to="/analytics" className="text-sm font-bold text-pesse-lime uppercase tracking-widest hover:opacity-80 transition-opacity">View All</Link>
            </div>

            <div className="space-y-4">
                {loading ? (
                    <div className="text-center py-8 text-gray-400 text-sm">Loading...</div>
                ) : error && transactions.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-400 text-sm mb-2">{error}</p>
                        <p className="text-gray-300 text-xs">Transactions will appear here once available</p>
                    </div>
                ) : transactions.length === 0 ? (
                    <div className="text-center py-8 text-gray-400 text-sm">No recent transactions</div>
                ) : (
                    transactions.map((tx) => {
                        const Icon = getIcon(tx.direction || '');
                        const isCredit = tx.direction?.toLowerCase() === 'credit';
                        return (
                            <div key={tx.id} className="flex items-center justify-between p-4 hover:bg-pesse-light rounded-2xl transition-all cursor-pointer group border border-transparent hover:border-pesse-gray">
                                <div className="flex items-center gap-4">
                                    <div className={`
                                        w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg
                                        ${isCredit ? 'bg-pesse-lime text-black' : 'bg-black text-white'}
                                        group-hover:scale-110 transition-transform
                                    `}>
                                        <Icon size={20} />
                                    </div>
                                    <div>
                                        <p className="font-black text-black uppercase text-sm tracking-tight">{tx.direction || 'Transaction'}</p>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                            {tx.createdAt ? new Date(tx.createdAt).toLocaleDateString() : 'N/A'}
                                        </p>
                                    </div>
                                </div>
                                <div className={`text-lg font-black tracking-tighter ${isCredit ? 'text-pesse-lime' : 'text-black'}`}>
                                    {isCredit ? '+' : '-'}${Math.abs(tx.amount || 0).toFixed(2)}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </motion.div>
    );
};
