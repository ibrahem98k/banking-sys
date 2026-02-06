import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { mockApi, type Account } from '../../api/mockApi';
import { Button } from '../UI/Button';
import { DollarSign } from 'lucide-react'; // Removing unused ArrowRight

interface TransferWidgetProps {
    accounts: Account[];
    onTransferSuccess: () => void;
}

export const TransferWidget: React.FC<TransferWidgetProps> = ({ accounts, onTransferSuccess }) => {
    const [amount, setAmount] = useState('');
    const [fromAccount, setFromAccount] = useState(accounts[0]?.id || '');
    const [toAccount, setToAccount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleTransfer = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setIsLoading(true);

        // Local Validation (Zero Trust)
        const numAmount = parseFloat(amount);
        if (!numAmount || numAmount <= 0) {
            setError("Please enter a valid positive amount.");
            setIsLoading(false);
            return;
        }
        if (!toAccount) {
            setError("Please enter a recipient account.");
            setIsLoading(false);
            return;
        }

        try {
            await mockApi.transfer(fromAccount, toAccount, numAmount);
            setSuccess(`Successfully transferred $${numAmount} to ${toAccount}`);
            setAmount('');
            setToAccount('');
            onTransferSuccess();
        } catch (err: any) {
            setError(err.message || "Transfer failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white border border-pesse-gray p-6 h-fit rounded-3xl shadow-lg shadow-black/5"
        >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-black">
                Quick Transfer
            </h3>

            <form onSubmit={handleTransfer} className="space-y-6">
                <div>
                    <label className="block text-sm text-gray-500 mb-2">From</label>
                    <div className="relative">
                        <select
                            value={fromAccount}
                            onChange={(e) => setFromAccount(e.target.value)}
                            className="w-full bg-pesse-light border-none rounded-xl py-4 px-4 text-black focus:ring-2 focus:ring-pesse-lime transition-all appearance-none font-medium"
                        >
                            {accounts.map(acc => (
                                <option key={acc.id} value={acc.id} className="bg-white text-black">
                                    {acc.type} (...{acc.accountNumber.slice(-4)})
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm text-gray-500 mb-2">To</label>
                    <input
                        type="text"
                        placeholder="Recipient"
                        value={toAccount}
                        onChange={(e) => setToAccount(e.target.value)}
                        className="w-full bg-pesse-light border-none rounded-xl py-4 px-4 text-black placeholder-gray-400 focus:ring-2 focus:ring-pesse-lime transition-all font-medium"
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-500 mb-2">Amount</label>
                    <div className="relative">
                        <DollarSign className="absolute left-4 top-4 text-gray-400" size={20} />
                        <input
                            type="number"
                            placeholder="0.00"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full bg-pesse-light border-none rounded-xl py-4 pl-12 pr-4 text-2xl font-bold text-black placeholder-gray-300 focus:ring-2 focus:ring-pesse-lime transition-all"
                        />
                    </div>
                </div>

                {error && <div className="text-red-400 text-sm bg-red-500/10 p-3 rounded-xl">{error}</div>}
                {success && <div className="text-neuro-success text-sm bg-green-500/10 p-3 rounded-xl">{success}</div>}

                <Button
                    type="submit"
                    isLoading={isLoading}
                    className="w-full mt-4 h-14 text-lg rounded-full shadow-xl shadow-pesse-lime/20 hover:shadow-pesse-lime/40"
                    size="lg"
                >
                    {isLoading ? 'Processing...' : 'Send Money'}
                </Button>
            </form>
        </motion.div>
    );
};
