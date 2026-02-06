import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Coffee, Monitor, ArrowDownLeft } from 'lucide-react';

// Mock Data for View (since mockApi currently returns accounts, we'll simulate transaction history here or extend mockApi later)
const MOCK_TRANSACTIONS = [
    { id: '1', merchant: 'Netflix Subscription', amount: -15.99, type: 'debit', icon: Monitor, date: 'Today, 10:42 AM' },
    { id: '2', merchant: 'Freelance Payment', amount: 1250.00, type: 'credit', icon: ArrowDownLeft, date: 'Yesterday, 03:15 PM' },
    { id: '3', merchant: 'Grocery Store', amount: -84.20, type: 'debit', icon: ShoppingBag, date: 'Yesterday, 09:00 AM' },
    { id: '4', merchant: 'Starbucks', amount: -5.50, type: 'debit', icon: Coffee, date: '2 days ago, 08:30 AM' },
];

export const ActivityList: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-pesse-gray rounded-3xl p-6 h-full shadow-lg shadow-black/5"
        >
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-black">Recent Activity</h3>
                <button className="text-sm font-medium text-gray-400 hover:text-black transition-colors">See All</button>
            </div>

            <div className="space-y-4">
                {MOCK_TRANSACTIONS.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-3 hover:bg-pesse-light rounded-2xl transition-colors cursor-pointer group">
                        <div className="flex items-center gap-4">
                            <div className={`
                                w-12 h-12 rounded-full flex items-center justify-center
                                ${tx.type === 'credit' ? 'bg-pesse-lime/20 text-black' : 'bg-black text-white'}
                                group-hover:scale-105 transition-transform
                            `}>
                                <tx.icon size={20} />
                            </div>
                            <div>
                                <p className="font-bold text-black">{tx.merchant}</p>
                                <p className="text-xs text-gray-500">{tx.date}</p>
                            </div>
                        </div>
                        <div className={`font-bold ${tx.type === 'credit' ? 'text-green-600' : 'text-black'}`}>
                            {tx.type === 'credit' ? '+' : '-'}${Math.abs(tx.amount).toFixed(2)}
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};
