import React from 'react';
import { LandingLayout } from '../../components/Layout/LandingLayout';
import { motion } from 'framer-motion';
import {
    BarChart3,
    CreditCard,
    Users,
    ArrowRight,
    Zap,
    Shield,
    Building2,
    Globe,
    Layers,
    PieChart,
    Timer
} from 'lucide-react';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
} as const;



export const Business: React.FC = () => {
    return (
        <LandingLayout>
            <div className="relative overflow-hidden min-h-screen bg-white">
                {/* Hero Wrapper - Dark Theme Container */}
                <div className="max-w-7xl mx-auto px-4 lg:px-6 pt-8 pb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative bg-[#0F0F0F] rounded-[4rem] overflow-hidden shadow-2xl shadow-black/20"
                    >
                        {/* Background Effects */}
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#bef600] rounded-full blur-[150px] opacity-[0.03] -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#bef600] rounded-full blur-[120px] opacity-[0.02] translate-y-1/2 -translate-x-1/2" />

                        <div className="relative z-10 grid lg:grid-cols-2 gap-12 p-8 lg:p-20 items-center">
                            {/* Left Content */}
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-pesse-lime text-black px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-8 shadow-lg shadow-pesse-lime/20">
                                    <Building2 size={14} />
                                    Pesse Business
                                </motion.div>

                                <motion.h1 variants={itemVariants} className="text-5xl lg:text-[6.5rem] font-black tracking-tight text-white mb-8 leading-[0.9]">
                                    Scale faster <br />
                                    <span className="text-gray-400">with better tools.</span>
                                </motion.h1>

                                <motion.p variants={itemVariants} className="text-gray-400 text-lg lg:text-xl max-w-lg mb-12 font-medium leading-relaxed">
                                    Corporate cards, expense management, and automated bookkeeping—all in one high-performance platform.
                                </motion.p>

                                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                                    <button className="bg-pesse-lime text-black px-8 py-4 rounded-2xl font-black text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-xl shadow-pesse-lime/10">
                                        Start Business Trial <ArrowRight size={20} />
                                    </button>
                                    <button className="bg-white/5 text-white backdrop-blur-md border border-white/10 px-8 py-4 rounded-2xl font-black text-lg hover:bg-white/10 transition-colors">
                                        Contact Sales
                                    </button>
                                </motion.div>

                            </motion.div>

                            {/* Right Content - Dashboard Visualization */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5, duration: 1 }}
                                className="relative lg:ml-auto w-full max-w-md"
                            >
                                <div className="bg-[#1A1A1A] border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
                                    <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-6">
                                        <div>
                                            <h3 className="text-white font-bold text-lg italic uppercase tracking-tighter">Latest Expenses</h3>
                                        </div>
                                        <button className="text-[10px] font-black uppercase tracking-widest bg-pesse-lime text-black px-3 py-1.5 rounded-lg">
                                            Export CSV
                                        </button>
                                    </div>

                                    <div className="space-y-6">
                                        {[
                                            { name: "AWS Cloud Services", time: "2m ago", amount: "-$12,450.00", icon: <Globe size={18} /> },
                                            { name: "Linear Subscription", time: "1h ago", amount: "-$240.00", icon: <Layers size={18} />, active: true },
                                            { name: "WeWork Monthly", time: "4h ago", amount: "-$4,200.00", icon: <Building2 size={18} /> },
                                        ].map((item, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.8 + (idx * 0.1) }}
                                                className="flex items-center justify-between group/item"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${item.active ? 'bg-pesse-lime text-black' : 'bg-white/5 text-pesse-lime group-hover/item:bg-pesse-lime group-hover/item:text-black'}`}>
                                                        {item.icon}
                                                    </div>
                                                    <div>
                                                        <p className="text-white text-sm font-bold">{item.name}</p>
                                                        <p className="text-white/40 text-[10px] uppercase font-black tracking-widest">{item.time}</p>
                                                    </div>
                                                </div>
                                                <div className="text-white font-black text-right">
                                                    <div className="text-sm">{item.amount}</div>
                                                    <div className="text-[10px] text-pesse-lime opacity-0 group-hover/item:opacity-100 transition-opacity">APPROVED</div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>


                                    <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                                        <div className="flex -space-x-2">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#1A1A1A] bg-gray-600 flex items-center justify-center text-[10px] font-black text-white">U{i}</div>
                                            ))}
                                            <div className="w-8 h-8 rounded-full border-2 border-[#1A1A1A] bg-pesse-lime flex items-center justify-center text-[10px] font-black text-black">+2</div>
                                        </div>
                                        <div className="bg-white/5 px-3 py-1 rounded-full flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-pesse-lime rounded-full animate-pulse" />
                                            <span className="text-[10px] text-white/60 font-black uppercase">Live Sync</span>
                                        </div>
                                    </div>

                                </div>

                                {/* Floating Stat Card */}
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -bottom-6 -left-12 bg-white rounded-2xl p-6 shadow-2xl hidden lg:block"
                                >
                                    <div className="flex items-center gap-4 mb-2">
                                        <div className="p-2 bg-black rounded-lg text-[#bef600]"><PieChart size={20} /></div>
                                        <div className="text-black font-black text-sm uppercase tracking-tighter">Current Burn</div>
                                    </div>
                                    <div className="text-3xl font-black text-black">$84.2k <span className="text-xs text-gray-400 font-bold">/ MONTH</span></div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Trusted By Section */}
                    <div className="mt-24">
                        <p className="text-center text-gray-400 text-[10px] font-black uppercase tracking-[0.5em] mb-12">Trusted by 2,000+ Teams</p>
                        <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
                            {["VELOCITY", "QUANTUM", "SYNAPSE", "ORBIT", "NEXUS"].map(company => (
                                <div key={company} className="text-3xl font-black tracking-tighter text-black italic">{company}</div>
                            ))}
                        </div>
                    </div>


                    {/* Bento Grid */}
                    <div className="mt-32 grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[250px]">
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="md:col-span-8 bg-[#F8F9FA] border border-gray-100 rounded-[2.5rem] p-12 flex flex-col justify-between group overflow-hidden relative"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#bef600]/10 blur-[100px] rounded-full" />
                            <div className="w-16 h-16 bg-black text-[#bef600] rounded-2xl flex items-center justify-center mb-6 lg:mb-0">
                                <CreditCard size={32} />
                            </div>
                            <div className="grid lg:grid-cols-2 gap-8 items-end">
                                <div>
                                    <h3 className="text-4xl font-black mb-4 tracking-tighter italic uppercase">Zero-Fee <br />Corporate Cards.</h3>
                                    <p className="text-gray-500 font-medium leading-tight">Unlimited physical and virtual cards for your entire team with smart spend controls.</p>
                                </div>
                                <div className="flex justify-end pr-8">
                                    <div className="w-56 h-32 bg-black rounded-xl shadow-2xl flex flex-col justify-between p-4 rotate-6 group-hover:rotate-0 transition-transform duration-500">
                                        <div className="w-10 h-10 bg-[#bef600] rounded-lg opacity-80" />
                                        <div className="text-white/20 text-[8px] font-black">PESSE BUSINESS PLATINUM</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            whileHover={{ y: -5 }}
                            className="md:col-span-4 bg-black rounded-[2.5rem] p-12 flex flex-col justify-between text-white group"
                        >
                            <div className="w-16 h-16 bg-[#bef600] text-black rounded-2xl flex items-center justify-center">
                                <Zap size={32} />
                            </div>
                            <div>
                                <h3 className="text-3xl font-black mb-4 tracking-tighter italic uppercase text-[#bef600]">Auto-Sync.</h3>
                                <p className="text-gray-400 font-medium leading-tight">Real-time integrations with Xero, Quickbooks, and NetSuite.</p>
                            </div>
                        </motion.div>

                        <motion.div
                            whileHover={{ y: -5 }}
                            className="md:col-span-4 bg-[#bef600] rounded-[2.5rem] p-12 flex flex-col justify-between group"
                        >
                            <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center">
                                <Shield size={32} />
                            </div>
                            <div>
                                <h3 className="text-3xl font-black mb-4 tracking-tighter italic uppercase">Bank-Grade.</h3>
                                <p className="text-black/60 font-black leading-tight">AES-256 encryption and SOC2 Type II compliance as standard.</p>
                            </div>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 0.98 }}
                            className="md:col-span-8 bg-gray-50 border border-gray-100 rounded-[2.5rem] p-12 flex flex-col md:flex-row gap-12 items-center"
                        >
                            <div className="flex-1">
                                <h3 className="text-4xl font-black mb-4 tracking-tighter italic uppercase">Global Reach.</h3>
                                <p className="text-gray-500 font-medium text-lg leading-tight">Send payments to 180+ countries with mid-market rates and zero hidden markups.</p>
                                <div className="mt-8 flex gap-4">
                                    {["USD", "EUR", "GBP", "SGD"].map(curr => (
                                        <span key={curr} className="px-3 py-1 bg-black text-white rounded-md text-[10px] font-black">{curr}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex-1 flex justify-center">
                                <div className="relative">
                                    <div className="w-32 h-32 bg-[#bef600] rounded-full animate-ping opacity-20 absolute" />
                                    <div className="w-32 h-32 bg-black rounded-full flex items-center justify-center text-[#bef600] relative">
                                        <Globe size={48} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Features List Section */}
                    <div className="mt-48 grid lg:grid-cols-2 gap-24 items-center">
                        <div className="space-y-12">
                            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase italic">Control every <br /> penny spent.</h2>
                            <div className="space-y-8">
                                {[
                                    { title: "Smart Limits", desc: "Set granular limits by category, merchant, or individual team member.", icon: <Timer /> },
                                    { title: "Instant Receipts", desc: "Employees snap a photo and AI handles the categorization instantly.", icon: <Zap /> },
                                    { title: "Team Approvals", desc: "Custom workflows for requests over any threshold you define.", icon: <Users /> }
                                ].map((feature, i) => (
                                    <div key={i} className="flex gap-6 group">
                                        <div className="mt-1 w-12 h-12 bg-black text-[#bef600] rounded-xl flex-shrink-0 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            {feature.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-black uppercase italic mb-2 tracking-tight">{feature.title}</h4>
                                            <p className="text-gray-500 font-medium leading-snug">{feature.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-square bg-black rounded-[3rem] overflow-hidden relative shadow-2xl">
                                <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-[#bef600]/10" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-4/5 h-1/2 bg-[#1A1A1A] border border-white/10 rounded-2xl items-center p-8">
                                        <div className="w-full h-2 bg-white/5 rounded-full mb-6">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: "70%" }}
                                                className="h-full bg-[#bef600] rounded-full"
                                            />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="text-white font-black">Monthly Budget</div>
                                            <div className="text-[#bef600] font-black">$70,000 / $100,000</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#bef600] rounded-[2rem] p-8 flex flex-col justify-between text-black shadow-xl hidden lg:flex">
                                <BarChart3 size={32} />
                                <div className="font-black leading-tight text-xl uppercase italic">Real-time <br />Insights.</div>
                            </div>
                        </div>
                    </div>

                    {/* Final CTA Overlay */}
                    <div className="mt-48">
                        <motion.div
                            whileInView={{ scale: [0.95, 1] }}
                            className="bg-black rounded-[3rem] p-12 lg:p-32 text-center relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-full bg-[#bef600] opacity-[0.02] blur-[150px]" />
                            <h2 className="text-5xl lg:text-8xl font-black text-white mb-12 tracking-tighter uppercase italic relative z-10">
                                Ready for the <br /> <span className="text-[#bef600]">next level?</span>
                            </h2>
                            <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
                                <button className="bg-[#bef600] text-black px-12 py-6 rounded-2xl font-black text-2xl hover:scale-105 transition-transform">
                                    Open Your Account
                                </button>
                                <button className="bg-white/10 text-white backdrop-blur-md px-12 py-6 rounded-2xl font-black text-2xl hover:bg-white/20 transition-colors">
                                    Talk to Sales
                                </button>
                            </div>
                            <p className="mt-12 text-white/30 font-black uppercase tracking-widest text-sm">Join 2,500+ high-growth companies already scaling with Pesse.</p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </LandingLayout>
    );
};
