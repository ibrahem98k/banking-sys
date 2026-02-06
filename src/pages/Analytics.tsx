import React from 'react';
import { Layout } from '../components/Layout/Layout';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { ArrowUpRight, ArrowDownLeft, Filter, Shield } from 'lucide-react';
import { useBankStore } from '../store/useBankStore';

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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-7xl mx-auto px-6 lg:px-12 py-12 space-y-16"
            >
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 pb-12">
                    <div>
                        <h1 className="text-5xl font-black text-black tracking-tighter uppercase italic leading-none">Intelligence.</h1>
                        <p className="text-gray-400 font-bold mt-3 uppercase text-[10px] tracking-[0.3em] opacity-60">Advanced financial node analytics & audit</p>
                    </div>
                    <button className="flex items-center gap-3 bg-white border border-gray-100 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-sm">
                        <Filter size={14} />
                        <span>Filter: Last 180 Days</span>
                    </button>
                </div>

                {/* Performance Metrics Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-pesse-lime rounded-[32px] p-8 shadow-2xl shadow-pesse-lime/20 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                        <div className="relative z-10">
                            <p className="text-black/40 font-black uppercase text-[10px] tracking-[0.2em] mb-4">Total Outflow</p>
                            <h3 className="text-4xl font-black text-black tracking-tighter italic leading-none">$12,405.00</h3>
                        </div>
                        <ArrowUpRight className="absolute bottom-6 right-6 text-black/10 w-16 h-16 transform rotate-12 group-hover:rotate-0 transition-transform" />
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-black rounded-[32px] p-8 shadow-2xl shadow-black/20 text-white relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-pesse-lime/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                        <div className="relative z-10">
                            <p className="text-white/40 font-black uppercase text-[10px] tracking-[0.2em] mb-4">Total Inflow</p>
                            <h3 className="text-4xl font-black text-white tracking-tighter italic leading-none">$18,200.00</h3>
                        </div>
                        <ArrowDownLeft className="absolute bottom-6 right-6 text-white/10 w-16 h-16 transform -rotate-12 group-hover:rotate-0 transition-transform" />
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm relative overflow-hidden group"
                    >
                        <div className="relative z-10">
                            <p className="text-gray-400 font-black uppercase text-[10px] tracking-[0.2em] mb-4">Net Efficiency</p>
                            <h3 className="text-4xl font-black text-black tracking-tighter italic leading-none">$5,795.00</h3>
                            <div className="mt-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-pesse-lime animate-pulse"></span>
                                <span className="text-[10px] font-black text-pesse-lime uppercase tracking-widest">+12.4% vs Last month</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Visualization Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Analytics Hub */}
                    <div className="lg:col-span-8 bg-white border border-gray-100 rounded-[48px] p-10 shadow-sm relative overflow-hidden">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h3 className="text-2xl font-black text-black tracking-tighter uppercase italic leading-none">Node Flux.</h3>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2">Volume distribution across active nodes</p>
                            </div>
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-black shadow-lg"></div>
                                <div className="w-3 h-3 rounded-full bg-pesse-lime shadow-lg"></div>
                            </div>
                        </div>

                        <div className="h-[400px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={spendingData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 10, fontWeight: 800 }} />
                                    <Tooltip
                                        cursor={{ fill: '#F9FAFB', radius: 20 }}
                                        contentStyle={{ borderRadius: '24px', border: '1px solid #F3F4F6', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '16px' }}
                                        itemStyle={{ fontWeight: 900, fontSize: '12px', textTransform: 'uppercase' }}
                                    />
                                    <Bar dataKey="amount" radius={[20, 20, 20, 20]} barSize={40}>
                                        {spendingData.map((_entry, index) => (
                                            <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#000' : '#bef600'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Sector Distribution */}
                    <div className="lg:col-span-4 bg-white border border-gray-100 rounded-[48px] p-10 shadow-sm flex flex-col">
                        <h3 className="text-xl font-black text-black tracking-tighter uppercase italic leading-none mb-8">Node Sectors.</h3>
                        <div className="flex-1 relative mb-8">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={categoryData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={80}
                                        outerRadius={110}
                                        paddingAngle={8}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {categoryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Primary</span>
                                <span className="text-2xl font-black uppercase italic tracking-tighter">Shop.</span>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {categoryData.map((cat) => (
                                <div key={cat.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }}></div>
                                        <span className="text-[11px] font-black text-black uppercase tracking-widest">{cat.name}</span>
                                    </div>
                                    <span className="text-xs font-black italic">{(cat.value / 10).toFixed(1)}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Audit Log / Transaction History */}
                <div className="bg-white border border-gray-100 rounded-[56px] p-12 lg:p-16 shadow-sm overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gray-50 rounded-full translate-x-1/3 -translate-y-1/3 -z-10"></div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
                        <div>
                            <h3 className="text-4xl font-black text-black tracking-tighter uppercase italic leading-none mb-4">Audit Protocol.</h3>
                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.3em] mt-2">Verified Ledger / Session ID: {Math.random().toString(36).substring(7).toUpperCase()}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl flex items-center gap-3">
                                <Shield size={16} className="text-pesse-lime" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-black">End-to-End Verified</span>
                            </div>
                            <button className="p-4 bg-black text-white rounded-2xl hover:bg-pesse-lime hover:text-black transition-all shadow-xl shadow-black/10">
                                <Filter size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {useBankStore((state: any) => state.transactions).map((tx: any) => (
                            <motion.div
                                key={tx.id}
                                whileHover={{ x: 10 }}
                                className="flex flex-col md:flex-row md:items-center justify-between p-8 bg-white border border-gray-50 rounded-[32px] hover:border-pesse-lime/30 hover:shadow-2xl hover:shadow-black/5 transition-all cursor-pointer group"
                            >
                                <div className="flex items-center gap-8">
                                    <div className={`w-16 h-16 rounded-3xl flex items-center justify-center text-2xl font-black shadow-lg group-hover:scale-110 transition-transform ${tx.type === 'credit' ? 'bg-pesse-lime text-black shadow-pesse-lime/20' : 'bg-black text-white shadow-black/20'}`}>
                                        {tx.merchant[0]}
                                    </div>
                                    <div>
                                        <p className="font-black text-black uppercase text-xl italic tracking-tighter group-hover:text-pesse-lime transition-colors">{tx.merchant}</p>
                                        <div className="flex items-center gap-4 mt-2">
                                            <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">{tx.date}</span>
                                            <span className="w-1.5 h-1.5 bg-gray-100 rounded-full" />
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-pesse-lime shadow-[0_0_8px_#bef600]" />
                                                <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Verified Sequence</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right mt-6 md:mt-0 pt-6 md:pt-0 border-t md:border-t-0 border-gray-50">
                                    <p className={`text-3xl font-black tracking-tighter italic ${tx.type === 'credit' ? 'text-pesse-lime' : 'text-black'}`}>
                                        {tx.type === 'credit' ? '+' : '-'}${Math.abs(tx.amount).toFixed(2)}
                                    </p>
                                    <div className="flex items-center justify-end gap-2 mt-2">
                                        <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Node: {Math.floor(Math.random() * 9000 + 1000)}</span>
                                        <Shield size={10} className="text-gray-200" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-16 flex justify-center">
                        <button className="px-12 py-5 bg-gray-50 border border-gray-100 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:bg-black hover:text-white hover:border-black transition-all">
                            Load Extended Audit Trail
                        </button>
                    </div>
                </div>
            </motion.div>
        </Layout>
    );
};
