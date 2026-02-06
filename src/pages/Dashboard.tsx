import React, { useEffect, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Layout } from '../components/Layout/Layout';
import { BalanceHero } from '../components/Dashboard/BalanceHero';
import { CreditCardVisual } from '../components/Dashboard/CreditCard';
import { AnalyticsChart } from '../components/Dashboard/AnalyticsChart';
import { ActivityList } from '../components/Dashboard/ActivityList';
import { TransferWidget } from '../components/Dashboard/TransferWidget';
import { UserInfoWidget } from '../components/Dashboard/UserInfoWidget';
import { mockApi, type Account } from '../api/mockApi';
import { Loader2 } from 'lucide-react';
import { useBankStore } from '../store/useBankStore';

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
    const { user, balance } = useBankStore();

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
                className="max-w-7xl mx-auto px-6 lg:px-8 py-8 space-y-8"
            >
                {/* Clean Header */}
                <motion.div variants={itemVariants} className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-black text-black tracking-tighter uppercase italic leading-none">NODE DASH.</h1>
                        <p className="text-gray-400 font-bold mt-2 uppercase text-[10px] tracking-[0.2em] opacity-70">Secured terminal for {user?.firstName}</p>
                    </div>
                </motion.div>

                {/* ROW 1: Balance & Credit Card */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <motion.div variants={itemVariants} className="lg:col-span-8">
                        <div className="h-full bg-white border border-gray-100 rounded-[32px] p-2 shadow-sm">
                            <BalanceHero totalBalance={balance} />
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="lg:col-span-4 rounded-[32px] overflow-hidden">
                        <CreditCardVisual />
                    </motion.div>
                </div>

                {/* ROW 2: Profile, Transfer, Activity */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <motion.div variants={itemVariants}>
                        <UserInfoWidget />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <TransferWidget accounts={accounts} onTransferSuccess={fetchData} />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <ActivityList />
                    </motion.div>
                </div>

                {/* ROW 3: Analytics - High visibility */}
                <motion.div
                    variants={itemVariants}
                    className="bg-white border border-gray-100 rounded-[32px] p-10 shadow-sm"
                >
                    <div className="mb-8">
                        <h3 className="text-lg font-black text-black tracking-tight uppercase italic">Spending Analytics.</h3>
                        <p className="text-xs text-gray-400 font-bold">Historical data visualization across all nodes</p>
                    </div>
                    <div className="h-[350px] w-full">
                        <AnalyticsChart />
                    </div>
                </motion.div>
            </motion.div>
        </Layout>
    );
};
