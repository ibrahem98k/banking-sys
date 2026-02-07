import React, { useEffect, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Layout } from '../components/Layout/Layout';
import { BalanceHero } from '../components/Dashboard/BalanceHero';
import { CreditCardVisual } from '../components/Dashboard/CreditCard';
import { AnalyticsChart } from '../components/Dashboard/AnalyticsChart';
import { ActivityList } from '../components/Dashboard/ActivityList';
import { TransferWidget } from '../components/Dashboard/TransferWidget';
import { UserInfoWidget } from '../components/Dashboard/UserInfoWidget';
import { Loader2 } from 'lucide-react';
import { useBankStore } from '../store/useBankStore';
import { dashboardService } from '../api/dashboard.service';
import { accountsService } from '../api/accounts.service';
import type { DashboardResponse, AccountResponse } from '../types/api';

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
    const [dashboardData, setDashboardData] = useState<DashboardResponse | null>(null);
    const [account, setAccount] = useState<AccountResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user } = useBankStore();

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            
            // First check if account exists to avoid unnecessary dashboard calls
            const accountResponse = await accountsService.getMyAccount();
            if (accountResponse.success && accountResponse.data) {
                setAccount(accountResponse.data);
                
                // Only fetch dashboard data if account exists
                const dashboardResponse = await dashboardService.getDashboard();
                if (dashboardResponse.success && dashboardResponse.data) {
                    setDashboardData(dashboardResponse.data);
                } else {
                    const errorMsg = dashboardResponse.message || 'Failed to load dashboard';
                    if (!errorMsg.toLowerCase().includes('account not found')) {
                        setError(errorMsg);
                    }
                }
            } else {
                // Account not found - this is expected for new users
                const errorMsg = accountResponse.message || '';
                if (errorMsg.toLowerCase().includes('account not found')) {
                    setError('Your account is being set up. Please wait for admin approval.');
                } else {
                    setError(errorMsg || 'Account not available');
                }
            }
        } catch (err: any) {
            const errorMsg = err.response?.data?.message || 'An error occurred';
            // Handle "Account not found" specifically - don't log as error
            if (errorMsg.toLowerCase().includes('account not found')) {
                setError('Your account is being set up. Please wait for admin approval.');
            } else {
                // Only log unexpected errors
                console.error("Failed to fetch dashboard data", err);
                setError(errorMsg);
            }
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

                {error && (
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-6 rounded-2xl border ${
                            error.toLowerCase().includes('account is being set up') 
                                ? 'bg-yellow-50 border-yellow-200 text-yellow-800' 
                                : 'bg-red-50 border-red-200 text-red-700'
                        }`}
                    >
                        <div className="flex items-start gap-3">
                            <div className="flex-1">
                                <p className="font-bold text-sm mb-1">{error}</p>
                                {error.toLowerCase().includes('account is being set up') && (
                                    <p className="text-xs opacity-80 mt-2">
                                        Your registration is complete. An account will be created once your documents are verified and approved by an administrator.
                                    </p>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* ROW 1: Balance & Credit Card */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <motion.div variants={itemVariants} className="lg:col-span-7">
                        <div className="h-full bg-white border border-gray-100 rounded-[32px] p-2 shadow-sm">
                            <BalanceHero totalBalance={dashboardData?.totalBalance || account?.balance || 0} />
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="lg:col-span-5">
                        <div className="h-full bg-white border border-gray-100 rounded-[32px] p-6 shadow-sm flex items-center justify-center">
                            <div className="w-full max-w-[460px]">
                                <CreditCardVisual />
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* ROW 2: Profile, Transfer, Activity */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <motion.div variants={itemVariants}>
                        <UserInfoWidget />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <TransferWidget 
                            accounts={account ? [{
                                id: account.id.toString(),
                                type: account.accountType as 'Checking' | 'Savings',
                                accountNumber: account.accountNumber,
                                balance: account.balance
                            }] : []} 
                            onTransferSuccess={fetchData} 
                        />
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
                    <div className="w-full" style={{ height: '350px', minHeight: '350px', position: 'relative' }}>
                        <AnalyticsChart />
                    </div>
                </motion.div>
            </motion.div>
        </Layout>
    );
};
