import React from 'react';
import { LandingLayout } from '../../components/Layout/LandingLayout';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useBankStore } from '../../store/useBankStore';
import { ArrowRight, TrendingUp, ShieldCheck, Wallet, PieChart, Sparkles, Globe } from 'lucide-react';

export const Benefits: React.FC = () => {
    const { user } = useBankStore();
    const navigate = useNavigate();

    return (
        <LandingLayout>
            <div className="relative overflow-hidden min-h-screen">
                {/* Background Watermark */}
                <div className="absolute top-[15%] left-1/2 -translate-x-1/2 text-[18vw] font-black text-gray-50 pointer-events-none select-none z-0 tracking-tighter uppercase whitespace-nowrap">
                    Benefits
                </div>

                <div className="relative z-10 pt-24 pb-32 px-4 lg:px-12 max-w-7xl mx-auto">
                    {/* Hero Section */}
                    <div className="flex flex-col lg:flex-row gap-16 items-start mb-32">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="flex-1"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 bg-[#bef600] text-black px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-10 shadow-lg shadow-[#bef600]/20"
                            >
                                <Sparkles size={14} />
                                Why Choice Pesse?
                            </motion.div>

                            <h1 className="text-7xl lg:text-[7rem] font-black tracking-tighter mb-16 leading-[0.8] text-black italic">
                                Better <br />
                                <span className="relative">
                                    Benefits.
                                    <motion.span
                                        initial={{ width: 0 }}
                                        whileInView={{ width: '110%' }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.5, duration: 1, ease: "circOut" }}
                                        className="absolute -bottom-1 -left-[5%] h-[0.15em] bg-[#bef600] -z-10 rounded-full"
                                    />
                                </span>
                            </h1>

                            <p className="text-xl lg:text-3xl text-gray-400 max-w-xl font-medium leading-tight tracking-tight mb-12">
                                We've dismantled the traditional banking model to build something that actually <span className="text-black font-extrabold uppercase italic">works for you.</span>
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { title: "Zero Fees", desc: "No maintenance or hidden costs.", icon: Wallet },
                                    { title: "Early Access", desc: "Get paid 48 hours sooner.", icon: TrendingUp },
                                    { title: "Safe Vaults", desc: "Insured by federal standards.", icon: ShieldCheck },
                                    { title: "Smart Cashback", desc: "Earn on every single tap.", icon: PieChart }
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.1 * i }}
                                        className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-gray-100 transition-all duration-300 group"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-[#bef600] group-hover:text-black transition-colors duration-500">
                                            <item.icon size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-black text-lg text-black">{item.title}</h3>
                                            <p className="text-gray-400 text-sm font-medium">{item.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Interactive Main Visual */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="lg:w-[500px] w-full relative group"
                        >
                            <div className="aspect-[4/5] bg-black rounded-[3.5rem] p-12 relative overflow-hidden shadow-2xl shadow-black/40 group-hover:translate-y-[-10px] transition-transform duration-700">
                                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#bef600] rounded-full blur-[120px] opacity-30 group-hover:opacity-50 transition-opacity"></div>

                                <div className="h-full flex flex-col justify-between relative z-10">
                                    <div className="space-y-4">
                                        <div className="text-[12rem] font-black text-[#bef600] leading-none tracking-tighter">3%</div>
                                        <div className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/10 text-xs font-black uppercase tracking-widest">High-Yield APY</div>
                                    </div>

                                    <div className="space-y-6">
                                        <h2 className="text-4xl font-black text-white leading-tight">Your money, <br /> working harder.</h2>
                                        <p className="text-gray-400 text-lg font-medium">That's 10x the national average, paid out monthly directly to your vault.</p>
                                        <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: '80%' }}
                                                className="h-full bg-[#bef600]"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Stats Card */}
                            <motion.div
                                initial={{ x: 20, y: 40, opacity: 0 }}
                                whileInView={{ x: 0, y: 20, opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="absolute -bottom-12 -right-6 md:-right-12 bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 lg:w-64 z-20"
                            >
                                <div className="flex items-center gap-1 text-[#bef600] mb-2 font-black">
                                    <TrendingUp size={16} />
                                    <span>+14.2%</span>
                                </div>
                                <div className="text-black font-black text-2xl tracking-tighter">Growth Rate</div>
                                <p className="text-gray-400 text-xs mt-1 font-bold italic uppercase">System Average</p>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Secondary Benefits Bento */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Global Access",
                                desc: "No foreign transaction fees, ever.",
                                icon: Globe,
                                color: "blue",
                                iconBg: "bg-blue-50 text-blue-600",
                                borderHover: "hover:border-blue-200"
                            },
                            {
                                title: "Safety First",
                                desc: "Block your card in one tap.",
                                icon: ShieldCheck,
                                color: "orange",
                                iconBg: "bg-orange-50 text-orange-600",
                                borderHover: "hover:border-orange-200"
                            },
                            {
                                title: "Smart Budgets",
                                desc: "Auto-sort your income.",
                                icon: PieChart,
                                color: "purple",
                                iconBg: "bg-purple-50 text-purple-600",
                                borderHover: "hover:border-purple-200"
                            }
                        ].map((b, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 * i, duration: 0.8 }}
                                whileHover={{
                                    y: -8,
                                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.08)",
                                }}
                                className={`group bg-white border border-gray-100 rounded-[3rem] p-12 flex flex-col items-center text-center transition-all duration-500 hover:shadow-2xl hover:shadow-gray-200/50 ${b.borderHover}`}
                            >
                                <div className={`w-24 h-24 rounded-3xl ${b.iconBg} flex items-center justify-center mb-8 relative group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                                    <div className="absolute inset-0 rounded-3xl bg-current opacity-10 group-hover:opacity-20 transition-opacity blur-xl"></div>
                                    <b.icon size={44} strokeWidth={1.5} className="relative z-10" />
                                </div>
                                <h3 className="text-3xl font-black text-black mb-4 tracking-tighter">{b.title}</h3>
                                <p className="text-gray-400 font-medium text-lg leading-relaxed max-w-[200px]">{b.desc}</p>

                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileHover={{ opacity: 1, scale: 1 }}
                                    onClick={() => user?.role === 'admin' && navigate('/admin')}
                                    className={`mt-8 flex items-center gap-2 font-black uppercase tracking-widest text-xs ${user?.role === 'admin' ? 'text-black cursor-pointer hover:scale-105' : 'text-gray-300 cursor-default'}`}
                                >
                                    {user?.role === 'admin' ? 'Access Authority' : 'Details Protected'} <ArrowRight size={14} />
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="mt-32 bg-black rounded-[3rem] p-16 text-center text-white relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#bef600]/5 to-transparent"></div>
                        <h2 className="text-5xl lg:text-7xl font-black mb-8 relative z-10">Ready for a <br /> better experience?</h2>
                        <button className="bg-[#bef600] text-black px-12 py-5 rounded-full font-black text-xl hover:scale-105 transition-transform flex items-center gap-3 mx-auto relative z-10">
                            Switch to Pesse <ArrowRight size={24} />
                        </button>
                    </motion.div>
                </div>
            </div>
        </LandingLayout>
    );
};
