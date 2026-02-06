import React from 'react';
import { Layout } from '../components/Layout/Layout';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { ArrowUpRight, ArrowDownLeft, Filter } from 'lucide-react';

const spendingData = [
    { name: 'Jan', amount: 2400 },
    { name: 'Feb', amount: 1398 },
    { name: 'Mar', amount: 9800 },
    { name: 'Apr', amount: 3908 },
    { name: 'May', amount: 4800 },
    { name: 'Jun', amount: 3800 },
];

const categoryData = [
    { name: 'Shopping', value: 400, color: '#bef600' }, // Lime
    { name: 'Bills', value: 300, color: '#000000' },    // Black
    { name: 'Food', value: 300, color: '#E5E7EB' },     // Gray
];

export const Analytics: React.FC = () => {
    return (
        <Layout>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-7xl mx-auto px-4 lg:px-8 pt-6 pb-24"
            >
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-black tracking-tight">Analytics.</h1>
                        <p className="text-gray-500 mt-1">Track your financial health.</p>
                    </div>
                    <button className="flex items-center gap-2 bg-white border border-pesse-gray px-4 py-2 rounded-full text-sm font-bold shadow-sm hover:bg-pesse-light transition-colors">
                        <Filter size={16} />
                        <span>Last 6 Months</span>
                    </button>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-pesse-lime rounded-3xl p-6 shadow-lg shadow-pesse-lime/20 relative overflow-hidden">
                        <div className="relative z-10">
                            <p className="text-black/60 font-bold uppercase text-xs tracking-wider mb-1">Total Spent</p>
                            <h3 className="text-3xl font-extrabold text-black">$12,405.00</h3>
                        </div>
                        <ArrowUpRight className="absolute top-6 right-6 text-black/20 transform scale-150" />
                    </div>

                    <div className="bg-black rounded-3xl p-6 shadow-lg shadow-black/20 text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <p className="text-white/60 font-bold uppercase text-xs tracking-wider mb-1">Income</p>
                            <h3 className="text-3xl font-extrabold text-white">$18,200.00</h3>
                        </div>
                        <ArrowDownLeft className="absolute top-6 right-6 text-white/20 transform scale-150" />
                    </div>

                    <div className="bg-white border border-pesse-gray rounded-3xl p-6 shadow-sm relative overflow-hidden">
                        <div className="relative z-10">
                            <p className="text-gray-500 font-bold uppercase text-xs tracking-wider mb-1">Net Savings</p>
                            <h3 className="text-3xl font-extrabold text-black">$5,795.00</h3>
                        </div>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Main Bar Chart */}
                    <div className="lg:col-span-2 bg-white border border-pesse-gray rounded-3xl p-6 shadow-sm h-80">
                        <h3 className="font-bold text-lg mb-4">Monthly Trends</h3>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={spendingData}>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF' }} />
                                <Tooltip
                                    cursor={{ fill: '#F3F4F6' }}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="amount" radius={[4, 4, 4, 4]}>
                                    {spendingData.map((_entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#000' : '#bef600'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Category Pie Chart */}
                    <div className="lg:col-span-1 bg-white border border-pesse-gray rounded-3xl p-6 shadow-sm h-80 flex flex-col">
                        <h3 className="font-bold text-lg mb-4">Categories</h3>
                        <div className="flex-1 relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={categoryData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {categoryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                            {/* Center Text */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-sm text-gray-400 font-medium">Top</span>
                                <span className="text-xl font-bold">Shop</span>
                            </div>
                        </div>
                        <div className="flex justify-center gap-4 mt-2">
                            {categoryData.map((cat) => (
                                <div key={cat.name} className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }}></div>
                                    <span className="text-xs font-bold text-gray-600">{cat.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </Layout>
    );
};
