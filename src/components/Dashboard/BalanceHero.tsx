import React from 'react';
import { motion } from 'framer-motion';

interface BalanceHeroProps {
    totalBalance: number;
}

export const BalanceHero: React.FC<BalanceHeroProps> = ({ totalBalance }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden h-full flex flex-col justify-between p-8"
        >
            <div className="z-10">
                <h2 className="text-gray-500 text-sm font-semibold uppercase tracking-widest flex items-center gap-2 mb-1">
                    Total Balance
                    <div className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center">
                        <div className="w-1 h-1 bg-black rounded-full"></div>
                    </div>
                </h2>
                <div className="text-5xl lg:text-7xl font-extrabold mt-2 text-black tracking-tight">
                    ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
            </div>

            {/* Decorative Animated Line Chart - Lime */}
            <div className="absolute bottom-0 left-0 right-0 h-48 opacity-100 z-0 pointer-events-none">
                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <motion.path
                        d="M0,80 Q25,40 50,70 T100,50 L100,100 L0,100 Z"
                        fill="url(#gradient)"
                        initial={{ d: "M0,100 Q25,100 50,100 T100,100 L100,100 L0,100 Z" }}
                        animate={{ d: "M0,80 Q25,60 50,80 T100,40 L100,100 L0,100 Z" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                    <defs>
                        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#bef600" stopOpacity={0.8} />
                            <stop offset="100%" stopColor="#bef600" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </motion.div>
    );
};
