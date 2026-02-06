import React from 'react';
import { LandingLayout } from '../../components/Layout/LandingLayout';
import { motion } from 'framer-motion';
import { Shield, Zap, Globe, BarChart3, RefreshCw, CreditCard } from 'lucide-react';

export const Features: React.FC = () => {
    return (
        <LandingLayout>
            <div className="relative overflow-hidden min-h-screen">
                {/* Background Watermark */}
                <div className="absolute top-[10%] left-1/2 -translate-x-1/2 text-[20vw] font-black text-gray-50 pointer-events-none select-none z-0 tracking-tighter uppercase whitespace-nowrap">
                    Features
                </div>

                <div className="relative z-10 pt-24 pb-32 px-4 lg:px-12 max-w-7xl mx-auto">
                    {/* Hero Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-32 max-w-4xl mx-auto"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 bg-gray-50 border border-gray-100 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-10"
                        >
                            <span className="w-2 h-2 rounded-full bg-[#bef600] shadow-[0_0_10px_#bef600]"></span>
                            Platform Capabilities
                        </motion.div>

                        <h1 className="text-7xl lg:text-[10rem] font-black tracking-tighter mb-10 leading-[0.8] text-black italic">
                            Modern <br />
                            <span className="relative">
                                Money.
                                <motion.span
                                    initial={{ width: 0 }}
                                    whileInView={{ width: '110%' }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5, duration: 1, ease: "circOut" }}
                                    className="absolute -bottom-6 -left-[5%] h-[0.15em] bg-[#bef600] -z-10 rounded-full"
                                />
                            </span>
                        </h1>

                        <p className="text-xl lg:text-3xl text-gray-400 max-w-2xl mx-auto font-medium leading-tight tracking-tight">
                            A complete financial ecosystem built for <br />
                            <span className="text-black font-extrabold">exceptional speed</span> and <span className="text-black font-extrabold">unmatched security.</span>
                        </p>
                    </motion.div>

                    {/* Bento Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 auto-rows-[280px]">

                        {/* Security - Large Span */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="md:col-span-3 lg:col-span-8 bg-black rounded-[2.5rem] p-10 flex flex-col justify-between text-white shadow-2xl shadow-black/40 overflow-hidden relative group"
                        >
                            <div className="absolute top-0 right-0 p-8 transform group-hover:rotate-12 transition-transform duration-500">
                                <Shield size={120} className="text-white opacity-10" />
                            </div>
                            <div className="relative z-10 w-16 h-16 bg-[#bef600] rounded-2xl flex items-center justify-center mb-6">
                                <Shield size={32} className="text-black" />
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-4xl font-black mb-4 tracking-tight">Triple-Stack <br />Protection.</h3>
                                <p className="text-gray-400 text-lg max-w-md">AES-256 military-grade encryption, biometric vaults, and real-time fraud monitoring.</p>
                            </div>
                        </motion.div>

                        {/* Instant Transfers - Cube */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="md:col-span-3 lg:col-span-4 bg-[#bef600] rounded-[2.5rem] p-10 flex flex-col justify-between shadow-xl shadow-[#bef600]/20 relative group"
                        >
                            <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center">
                                <Zap size={32} />
                            </div>
                            <div>
                                <h3 className="text-3xl font-black mb-2 tracking-tight">Instant Pay.</h3>
                                <p className="text-black/60 font-semibold">Zero latency transfers worldwide.</p>
                            </div>
                        </motion.div>

                        {/* Analytics - Cube */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="md:col-span-3 lg:col-span-4 bg-white border border-gray-100 rounded-[2.5rem] p-10 flex flex-col justify-between shadow-xl shadow-gray-200/50 group overflow-hidden"
                        >
                            <div className="flex justify-between items-start">
                                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-[#bef600] group-hover:text-black transition-colors duration-500">
                                    <BarChart3 size={28} />
                                </div>
                                <div className="flex gap-1">
                                    <div className="h-6 w-1 bg-gray-100 group-hover:bg-[#bef600] transition-all animate-pulse duration-700"></div>
                                    <div className="h-10 w-1 bg-gray-200 group-hover:bg-black transition-all animate-pulse duration-1000"></div>
                                    <div className="h-4 w-1 bg-gray-100 group-hover:bg-[#bef600] transition-all animate-pulse duration-500"></div>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-3xl font-black mb-2 tracking-tight">Smart Stats.</h3>
                                <p className="text-gray-500">Auto-categorized spending insights.</p>
                            </div>
                        </motion.div>

                        {/* Global Cards - Large Span */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="md:col-span-3 lg:col-span-8 bg-gray-50 rounded-[2.5rem] p-10 flex flex-col justify-between relative overflow-hidden group border border-gray-100 shadow-inner"
                        >
                            <div className="absolute right-[-50px] bottom-[-50px] opacity-10 transform group-hover:scale-110 transition-transform duration-700">
                                <Globe size={400} />
                            </div>
                            <div className="flex gap-4 mb-4">
                                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center"><CreditCard size={20} /></div>
                                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center text-gray-300"><RefreshCw size={20} /></div>
                            </div>
                            <div className="relative z-10 max-w-lg">
                                <h3 className="text-4xl font-black mb-4 tracking-tight">Borderless Living.</h3>
                                <p className="text-gray-500 text-lg">Virtual and physical cards that work in 200+ countries with mid-market rates.</p>
                            </div>
                        </motion.div>

                        {/* Mobile App - Small */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="md:col-span-6 lg:col-span-12 bg-[#bef600]/10 border-2 border-dashed border-[#bef600]/30 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center justify-between gap-8"
                        >
                            <div className="flex-1">
                                <div className="inline-flex items-center gap-2 bg-[#bef600] text-black px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-4">Award Winning</div>
                                <h3 className="text-4xl font-black tracking-tight mb-4 text-black">Master your money anywhere.</h3>
                                <p className="text-gray-600 font-medium">Download the Pesse App for iOS and Android. One account, limitless possibilities.</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="px-8 py-4 bg-black text-white rounded-2xl font-black hover:scale-105 transition-transform cursor-pointer">iOS App</div>
                                <div className="px-8 py-4 bg-white border border-gray-200 text-black rounded-2xl font-black hover:scale-105 transition-transform cursor-pointer">Android</div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>
        </LandingLayout>
    );
};
