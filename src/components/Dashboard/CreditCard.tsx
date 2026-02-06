import React from 'react';
import { motion } from 'framer-motion';

export const CreditCardVisual: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            className="w-full h-full min-h-[220px] rounded-3xl p-6 relative overflow-hidden shadow-xl shadow-pesse-lime/20"
            style={{
                background: '#bef600', // Pesse Lime
                color: '#000000'
            }}
        >
            {/* Abstract Pattern */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/20 rounded-fullblur-2xl -translate-y-1/2 translate-x-1/4"></div>

            <div className="relative z-10 flex flex-col justify-between h-full">
                <div className="flex justify-between items-start">
                    {/* Chip */}
                    <div className="w-12 h-9 rounded-md border border-black/20 bg-black/5 flex items-center justify-center">
                        <div className="w-8 h-6 border border-black/20 rounded-sm grid grid-cols-2 gap-px p-px">
                            <div className="border border-black/10 rounded-[1px]"></div>
                            <div className="border border-black/10 rounded-[1px]"></div>
                            <div className="border border-black/10 rounded-[1px]"></div>
                            <div className="border border-black/10 rounded-[1px]"></div>
                        </div>
                    </div>
                    <span className="font-bold italic text-2xl tracking-tighter opacity-80">Pesse</span>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-4 text-xl tracking-widest font-mono font-bold">
                        <span>••••</span>
                        <span>••••</span>
                        <span>••••</span>
                        <span>8910</span>
                    </div>

                    <div className="flex justify-between items-end">
                        <div>
                            <div className="text-[10px] uppercase font-bold tracking-wider opacity-60 mb-0.5">Card Holder</div>
                            <div className="font-bold text-sm">IBRAHIM AL-FAILAKAWY</div>
                        </div>
                        <div className="font-bold text-lg italic tracking-wider">VISA</div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
