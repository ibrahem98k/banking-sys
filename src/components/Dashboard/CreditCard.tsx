import React from 'react';
import { motion } from 'framer-motion';
import { useBankStore } from '../../store/useBankStore';

interface CreditCardProps {
    card?: {
        id: string;
        number: string;
        holder: string;
        expiry: string;
        type: 'visa' | 'mastercard';
        frozen: boolean;
        cvv: string;
    };
    showFullNumber?: boolean;
}

export const CreditCardVisual: React.FC<CreditCardProps> = ({ card, showFullNumber = false }) => {
    const { user, cards } = useBankStore();
    const displayCard = card || cards[0];

    if (!displayCard) return null;

    const formattedNumber = displayCard.number.replace(/\s/g, '');
    const groups = showFullNumber
        ? [formattedNumber.slice(0, 4), formattedNumber.slice(4, 8), formattedNumber.slice(8, 12), formattedNumber.slice(12, 16)]
        : ['••••', '••••', '••••', formattedNumber.slice(-4)];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            className={`w-full aspect-[1.586/1] rounded-[28px] p-7 lg:p-9 relative overflow-hidden shadow-2xl transition-all duration-500 ${displayCard.frozen ? 'grayscale opacity-60' : ''} ${displayCard.type === 'visa' ? 'shadow-pesse-lime/20' : 'shadow-black/20'}`}
            style={{
                background: displayCard.type === 'visa' ? '#bef600' : '#000000',
                color: displayCard.type === 'visa' ? '#000000' : 'white'
            }}
        >
            {/* Abstract Organic Pattern */}
            <div className={`absolute top-0 right-0 w-72 h-72 rounded-full blur-[90px] -translate-y-1/2 translate-x-1/4 ${displayCard.type === 'visa' ? 'bg-white/40' : 'bg-pesse-lime/20'}`}></div>

            <div className="relative z-10 flex flex-col justify-between h-full">
                <div className="flex justify-between items-start">
                    {/* Security Chip */}
                    <div className={`w-12 h-9 rounded-lg border flex items-center justify-center ${displayCard.type === 'visa' ? 'border-black/10 bg-black/5' : 'border-white/10 bg-white/5'}`}>
                        <div className={`w-8 h-6 border rounded-md grid grid-cols-2 gap-px p-1 ${displayCard.type === 'visa' ? 'border-black/20' : 'border-white/20'}`}>
                            <div className={`border rounded-[1px] ${displayCard.type === 'visa' ? 'border-black/10' : 'border-white/10'}`}></div>
                            <div className={`border rounded-[1px] ${displayCard.type === 'visa' ? 'border-black/10' : 'border-white/10'}`}></div>
                            <div className={`border rounded-[1px] ${displayCard.type === 'visa' ? 'border-black/10' : 'border-white/10'}`}></div>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="font-black italic text-2xl tracking-tighter opacity-95 uppercase">Pesse.</span>
                        {displayCard.frozen && (
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] mt-1 text-red-500">Node Frozen</p>
                        )}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center gap-3 lg:gap-5 text-lg lg:text-xl tracking-[0.2em] lg:tracking-[0.25em] font-mono font-black">
                        {groups.map((group, i) => (
                            <span key={i} className={i === 3 ? 'text-xl lg:text-2xl' : 'opacity-80'}>{group}</span>
                        ))}
                    </div>

                    <div className="flex justify-between items-end gap-4">
                        <div className="space-y-1 min-w-0">
                            <div className="text-[9px] uppercase font-black tracking-[0.25em] opacity-50 truncate">Authorized Holder</div>
                            <div className="font-black text-sm lg:text-base uppercase italic tracking-tight truncate leading-tight">{user?.firstName} {user?.lastName}</div>
                        </div>
                        <div className="text-right shrink-0">
                            <div className="text-[9px] uppercase font-black tracking-[0.25em] opacity-50 mb-0.5 lg:mb-1">Valid Thru</div>
                            <div className="font-black text-sm lg:text-base italic leading-tight">{displayCard.expiry}</div>
                        </div>
                        <div className="font-black text-2xl lg:text-3xl italic tracking-tighter uppercase ml-2 shrink-0 opacity-80">{displayCard.type}</div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
