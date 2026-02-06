import React, { useEffect, useRef } from 'react';
import { LandingLayout } from '../../components/Layout/LandingLayout';
import { motion, useMotionValue, useSpring, useTransform, animate, useInView } from 'framer-motion';
import { Users, Landmark, Star, ArrowRight, Heart, Sparkles } from 'lucide-react';

const AnimatedNumber: React.FC<{ value: number; duration?: number; suffix?: string; prefix?: string; decimals?: number }> = ({ value, duration = 2, suffix = "", prefix = "", decimals = 0 }) => {
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { stiffness: 60, damping: 20 });
    const displayValue = useTransform(springValue, (latest) => {
        return prefix + latest.toFixed(decimals) + suffix;
    });
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            animate(motionValue, value, { duration });
        }
    }, [isInView, motionValue, value, duration]);

    return <motion.span ref={ref}>{displayValue}</motion.span>;
};

export const Company: React.FC = () => {
    return (
        <LandingLayout>
            <div className="relative overflow-hidden min-h-screen">
                {/* Background Watermark */}
                <div className="absolute top-[15%] left-1/2 -translate-x-1/2 text-[18vw] font-black text-gray-50 pointer-events-none select-none z-0 tracking-tighter uppercase whitespace-nowrap">
                    Company
                </div>

                <div className="relative z-10 pt-24 pb-32 px-4 lg:px-12 max-w-7xl mx-auto">
                    {/* Hero Section */}
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
                            Our Mission & Values
                        </motion.div>

                        <h1 className="text-7xl lg:text-[10rem] font-black tracking-tighter mb-4 leading-[0.8] text-black italic">
                            Future of <br />
                            <span className="relative">
                                Finance.
                                <motion.span
                                    initial={{ width: 0 }}
                                    whileInView={{ width: '110%' }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5, duration: 1, ease: "circOut" }}
                                    className="absolute -bottom-1 -left-[5%] h-[0.15em] bg-[#bef600] -z-10 rounded-full"
                                />
                            </span>
                        </h1>

                        <p className="text-xl lg:text-3xl text-gray-400 max-w-2xl mx-auto font-medium leading-tight tracking-tight">
                            Founded in 2024, Pesse operates on a simple belief: <br />
                            Banking should be <span className="text-black font-extrabold italic uppercase">transparent</span>, <span className="text-black font-extrabold italic uppercase">accessible</span>, and designed for <span className="text-black font-extrabold italic uppercase">humans</span>.
                        </p>
                    </motion.div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                        {[
                            { icon: Users, label: "Active Users", value: 500, suffix: "k+", prefix: "" },
                            { icon: Landmark, label: "Transacted", value: 1.2, suffix: "B+", prefix: "$", decimals: 1 },
                            { icon: Star, label: "App Rating", value: 4.9, suffix: "/5", prefix: "", decimals: 1 }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white border border-gray-100 rounded-[2.5rem] p-12 text-center shadow-xl shadow-gray-100/50 hover:shadow-2xl hover:shadow-[#bef600]/10 transition-all group"
                            >
                                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:bg-black group-hover:text-[#bef600] transition-colors duration-500">
                                    <stat.icon size={32} />
                                </div>
                                <div className="text-6xl font-black mb-2 tracking-tighter text-black">
                                    <AnimatedNumber value={stat.value} suffix={stat.suffix} prefix={stat.prefix} decimals={stat.decimals} />
                                </div>
                                <div className="text-sm font-black uppercase tracking-[0.2em] text-gray-400">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Culture Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-32">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-black rounded-[3rem] p-16 text-white relative overflow-hidden"
                        >
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#bef600] rounded-full blur-[140px] opacity-20"></div>
                            <Sparkles className="text-[#bef600] mb-8" size={48} />
                            <h2 className="text-5xl font-black mb-8 italic uppercase tracking-tighter leading-none">Radical <br /> Transparency.</h2>
                            <p className="text-gray-400 text-lg font-medium max-w-md">We don't believe in fine print or hidden fees. Every decision we make is shared openly with our community.</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-[#bef600] rounded-[3rem] p-16 text-black relative"
                        >
                            <Heart className="text-black mb-8" size={48} />
                            <h2 className="text-5xl font-black mb-8 italic uppercase tracking-tighter leading-none">Human <br /> Centric.</h2>
                            <p className="text-black/60 text-lg font-black max-w-md">Our technology serves people, not the other way around. Every pixel and line of code is optimized for your life.</p>
                        </motion.div>
                    </div>

                    {/* Join Us CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-gray-50 rounded-[3rem] p-20 text-center border border-gray-100"
                    >
                        <h2 className="text-5xl font-black mb-8 text-black">We're just getting started.</h2>
                        <p className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto font-medium">Join a global team of builders, designers, and thinkers who are redefining the relationship between people and money.</p>
                        <button className="bg-black text-white px-12 py-5 rounded-full font-black text-xl hover:scale-105 transition-transform flex items-center gap-3 mx-auto">
                            View Careers <ArrowRight size={24} />
                        </button>
                    </motion.div>
                </div>
            </div>
        </LandingLayout>
    );
};
