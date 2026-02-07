import { motion } from 'framer-motion';
import { type AccountResponse } from '../../types/api';
import { CreditCard, Wallet } from 'lucide-react';

interface AccountsListProps {
    accounts: AccountResponse[];
}

export const AccountsList: React.FC<AccountsListProps> = ({ accounts }) => {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">Your Accounts</h3>
                <button className="text-sm text-neuro-accent hover:text-white transition-colors">View All</button>
            </div>

            <div className="
        flex flex-row overflow-x-auto gap-4 pb-4 snap-x
        lg:grid lg:grid-cols-2 lg:gap-4 lg:overflow-visible lg:pb-0
      ">
                {accounts.map((account, index) => (
                    <motion.div
                        key={account.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="
              glass-card p-5 min-w-[280px] snap-center flex flex-col justify-between
              hover:border-neuro-accent/50 transition-colors cursor-pointer group
            "
                    >
                        <div className="flex justify-between items-start">
                            <div className={`p-3 rounded-full ${account.accountType === 'Checking' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'}`}>
                                {account.accountType === 'Checking' ? <CreditCard size={20} /> : <Wallet size={20} />}
                            </div>
                            <span className="text-xs text-gray-500 font-mono bg-white/5 px-2 py-1 rounded">
                                ●●●● {account.accountNumber.slice(-4)}
                            </span>
                        </div>

                        <div className="mt-6">
                            <div className="text-sm text-gray-400 mb-1">{account.accountType} Account</div>
                            <div className="text-2xl font-bold text-white group-hover:text-neuro-accent transition-colors">
                                ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
