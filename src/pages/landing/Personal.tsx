import React from 'react';
import { LandingLayout } from '../../components/Layout/LandingLayout';
import { motion } from 'framer-motion';
import { CreditCardVisual } from '../../components/Dashboard/CreditCard';
import { Smartphone, Zap, Shield, Sparkles, ArrowRight, PieChart } from 'lucide-react';

export const Personal: React.FC = () => {
    return (
        <LandingLayout>
            <div className="relative overflow-hidden min-h-screen">
                {/* Background Watermark */}
                <div className="absolute top-[15%] left-1/2 -translate-x-1/2 text-[18vw] font-black text-gray-50 pointer-events-none select-none z-0 tracking-tighter uppercase whitespace-nowrap">
                    Personal
                </div>

                <div className="relative z-10 pt-24 pb-32 px-4 lg:px-12 max-w-7xl mx-auto">
                    {/* Hero Section */}
                    <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 mb-32">
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
                                Banking for You
                            </motion.div>

                            <h1 className="text-7xl lg:text-[7.5rem] font-black tracking-tighter mb-10 leading-[0.8] text-black italic">
                                Daily <br />
                                <span className="relative">
                                    Driver.
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
                                From coffee to rent, manage your everyday spending with tools designed to keep you <span className="text-black font-extrabold uppercase italic">effortlessly on budget.</span>
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="bg-black text-white px-10 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-transform flex items-center justify-center gap-3">
                                    Open Free Account <ArrowRight size={20} />
                                </button>
                                <button className="bg-white border border-gray-100 text-black px-10 py-5 rounded-2xl font-black text-lg hover:bg-gray-50 transition-colors">
                                    Explore Plans
                                </button>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ duration: 1, ease: "circOut" }}
                            className="flex-1 w-full flex justify-center lg:justify-end relative"
                        >
                            <div className="relative group perspective-[1000px]">
                                <motion.div
                                    whileHover={{
                                        rotateY: -20,
                                        rotateX: 10,
                                        scale: 1.05
                                    }}
                                    className="w-[340px] h-[210px] lg:w-[450px] lg:h-[280px] transition-all duration-500 hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)]"
                                >
                                    <CreditCardVisual />
                                </motion.div>
                                <div className="absolute -inset-10 bg-[#bef600] rounded-full blur-[100px] opacity-20 -z-10 animate-pulse"></div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Bento Features */}
                    <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 auto-rows-[300px]">
                        {/* Tap & Pay */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="md:col-span-3 lg:col-span-4 bg-gray-50 rounded-[2.5rem] p-10 flex flex-col justify-between border border-gray-100 group overflow-hidden"
                        >
                            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center group-hover:bg-[#bef600] group-hover:text-black transition-colors duration-500">
                                <Smartphone size={32} />
                            </div>
                            <div>
                                <h3 className="text-3xl font-black mb-2 tracking-tight text-black italic uppercase">Tap & Pay.</h3>
                                <p className="text-gray-500 font-medium">Add Pesse to Apple Pay or Google Pay for instant, secure checkout anywhere.</p>
                            </div>
                        </motion.div>

                        {/* Insights */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="md:col-span-3 lg:col-span-8 bg-black rounded-[2.5rem] p-10 flex flex-col md:flex-row justify-between text-white relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#bef600] rounded-full blur-[100px] opacity-10"></div>
                            <div className="flex-1 flex flex-col justify-between relative z-10">
                                <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center">
                                    <PieChart size={32} className="text-[#bef600]" />
                                </div>
                                <div>
                                    <h3 className="text-4xl font-black mb-4 tracking-tight italic uppercase">Deep Insights.</h3>
                                    <p className="text-gray-400 text-lg max-w-md">Our AI categorizes your spending automatically, so you can see exactly where your money goes.</p>
                                </div>
                            </div>
                            <div className="hidden md:flex flex-1 items-end justify-end gap-3 pb-4">
                                <div className="h-[40%] w-6 bg-white/5 rounded-t-lg group-hover:h-[60%] transition-all duration-700"></div>
                                <div className="h-[70%] w-6 bg-[#bef600] rounded-t-lg group-hover:h-[90%] transition-all duration-700 delay-100"></div>
                                <div className="h-[30%] w-6 bg-white/10 rounded-t-lg group-hover:h-[50%] transition-all duration-700 delay-200"></div>
                                <div className="h-[60%] w-6 bg-white/5 rounded-t-lg group-hover:h-[80%] transition-all duration-700 delay-300"></div>
                            </div>
                        </motion.div>

                        {/* Security */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="md:col-span-3 lg:col-span-7 bg-[#bef600] rounded-[2.5rem] p-10 flex flex-col justify-between relative group shadow-xl shadow-[#bef600]/20"
                        >
                            <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center">
                                <Shield size={32} />
                            </div>
                            <div>
                                <h3 className="text-4xl font-black mb-4 tracking-tight italic uppercase">Ultra Security.</h3>
                                <p className="text-black/60 text-lg font-black">Freeze your card, change your PIN, and set limits instantly from the app. You're always in control.</p>
                            </div>
                        </motion.div>

                        {/* Free Transfers */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="md:col-span-3 lg:col-span-5 bg-white border border-gray-100 rounded-[2.5rem] p-10 flex flex-col justify-between shadow-sm group"
                        >
                            <div className="w-16 h-16 bg-black text-[#bef600] rounded-2xl flex items-center justify-center">
                                <Zap size={32} />
                            </div>
                            <div>
                                <h3 className="text-3xl font-black mb-2 tracking-tight text-black italic uppercase">Free Forever.</h3>
                                <p className="text-gray-500 font-medium">Send money to any Pesse user instantly and for free. No more awkward bank transfers.</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* App CTA */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="mt-32 bg-black rounded-[3.5rem] p-16 lg:p-24 text-center text-white relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-[#bef600]/10 to-transparent opacity-30"></div>
                        <h2 className="text-5xl lg:text-7xl font-black mb-10 relative z-10 leading-none tracking-tighter">Your bank, <br /> in your pocket.</h2>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
                            <div className="bg-white text-black px-12 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-transform flex items-center justify-center gap-3 cursor-pointer">
                                App Store
                            </div>
                            <div className="bg-transparent border border-white/20 text-white px-12 py-5 rounded-2xl font-black text-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-3 cursor-pointer">
                                Play Store
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </LandingLayout>
    );
};
