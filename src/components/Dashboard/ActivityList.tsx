import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, Coffee, Monitor, ArrowDownLeft, CreditCard } from 'lucide-react';
import { useEffect, useState } from 'react';
import { dashboardService } from '../../api/dashboard.service';
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

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await dashboardService.getDashboard();
                if (response.success && response.data) {
                    setTransactions(response.data.recentTransactions || []);
                }
            } catch (error) {
                console.error('Failed to fetch transactions', error);
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
                                            {new Date(tx.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <div className={`text-lg font-black tracking-tighter ${isCredit ? 'text-pesse-lime' : 'text-black'}`}>
                                    {isCredit ? '+' : '-'}${Math.abs(tx.amount).toFixed(2)}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </motion.div>
    );
};
