import React, { useEffect, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Layout } from '../components/Layout/Layout';
import { BalanceHero } from '../components/Dashboard/BalanceHero';
import { CreditCardVisual } from '../components/Dashboard/CreditCard';
import { AnalyticsChart } from '../components/Dashboard/AnalyticsChart';
import { ActivityList } from '../components/Dashboard/ActivityList';
import { TransferWidget } from '../components/Dashboard/TransferWidget';
import { mockApi, type Account } from '../api/mockApi';
import { Loader2 } from 'lucide-react';

// Animation variants for staggered children
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" }
    }
};

export const Dashboard: React.FC = () => {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const data = await mockApi.getAccounts();
            setAccounts(data);
        } catch (error) {
            console.error("Failed to fetch accounts", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

    if (loading) {
        return (
            <Layout>
                <div className="flex h-screen items-center justify-center bg-pesse-light text-black">
                    <Loader2 className="animate-spin text-pesse-lime" size={48} />
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-24 lg:pb-8 max-w-7xl mx-auto px-4 lg:px-8 pt-6"
            >
                {/* Header */}
                <motion.div variants={itemVariants} className="col-span-1 lg:col-span-3 mb-4">
                    <h1 className="text-3xl font-extrabold text-black tracking-tight">Dashboard.</h1>
                    <p className="text-gray-500 text-sm font-medium mt-1">Welcome back, Ibrahim.</p>
                </motion.div>

                {/* TOP ROW: Balance (2/3) + Credit Card (1/3) */}
                <motion.div variants={itemVariants} className="lg:col-span-2 min-h-[240px]">
                    <div className="h-full bg-white border border-pesse-gray rounded-3xl p-1 overflow-hidden shadow-lg shadow-black/5">
                        {/* Reusing BalanceHero but wrapping it in new Bento style or letting it fill */}
                        <BalanceHero totalBalance={totalBalance} />
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className="lg:col-span-1 min-h-[240px]">
                    <CreditCardVisual />
                </motion.div>

                {/* MIDDLE ROW: Analytics Chart (Full Width) */}
                <motion.div variants={itemVariants} className="lg:col-span-3 min-h-[350px] bg-white border border-pesse-gray rounded-3xl p-8 shadow-lg shadow-black/5">
                    <AnalyticsChart />
                </motion.div>

                {/* BOTTOM ROW: Activity List (2/3) + Transfer Widget (1/3) */}
                <motion.div variants={itemVariants} className="lg:col-span-2">
                    <ActivityList />
                </motion.div>

                <motion.div variants={itemVariants} className="lg:col-span-1">
                    <TransferWidget accounts={accounts} onTransferSuccess={fetchData} />
                </motion.div>

            </motion.div>
        </Layout>
    );
};
