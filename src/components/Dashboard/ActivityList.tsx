import { motion } from 'framer-motion';
import { useBankStore } from '../../store/useBankStore';
import { ShoppingBag, Coffee, Monitor, ArrowDownLeft, CreditCard } from 'lucide-react';

const getIcon = (merchant: string) => {
    const m = merchant.toLowerCase();
    if (m.includes('netflix')) return Monitor;
    if (m.includes('starbucks') || m.includes('coffee')) return Coffee;
    if (m.includes('salary') || m.includes('deposit')) return ArrowDownLeft;
    if (m.includes('grocery') || m.includes('store')) return ShoppingBag;
    return CreditCard;
};

export const ActivityList: React.FC = () => {
    const transactions = useBankStore((state) => state.transactions);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-pesse-gray rounded-3xl p-6 h-full shadow-lg shadow-black/5"
        >
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-black tracking-tight">Recent Activity.</h3>
                <button className="text-sm font-bold text-pesse-lime uppercase tracking-widest hover:opacity-80 transition-opacity">View All</button>
            </div>

            <div className="space-y-4">
                {transactions.map((tx) => {
                    const Icon = getIcon(tx.merchant);
                    return (
                        <div key={tx.id} className="flex items-center justify-between p-4 hover:bg-pesse-light rounded-2xl transition-all cursor-pointer group border border-transparent hover:border-pesse-gray">
                            <div className="flex items-center gap-4">
                                <div className={`
                                    w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg
                                    ${tx.type === 'credit' ? 'bg-pesse-lime text-black' : 'bg-black text-white'}
                                    group-hover:scale-110 transition-transform
                                `}>
                                    <Icon size={20} />
                                </div>
                                <div>
                                    <p className="font-black text-black uppercase text-sm tracking-tight">{tx.merchant}</p>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{tx.date}</p>
                                </div>
                            </div>
                            <div className={`text-lg font-black tracking-tighter ${tx.type === 'credit' ? 'text-pesse-lime' : 'text-black'}`}>
                                {tx.type === 'credit' ? '+' : '-'}${Math.abs(tx.amount).toFixed(2)}
                            </div>
                        </div>
                    );
                })}
            </div>
        </motion.div>
    );
};
