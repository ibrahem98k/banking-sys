import React, { useState } from 'react';
import { Layout } from '../components/Layout/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCardVisual } from '../components/Dashboard/CreditCard';
import { Plus, Lock, Wifi, Eye, EyeOff, Loader2, X, Shield, Settings2, ArrowUpRight } from 'lucide-react';
import { Button } from '../components/UI/Button';
import { useBankStore } from '../store/useBankStore';

export const Cards: React.FC = () => {
    const { cards, user, addCard, toggleCardFreeze } = useBankStore();
    const [isAdding, setIsAdding] = useState(false);
    const [loading, setLoading] = useState(false);
    const [revealedIds, setRevealedIds] = useState<string[]>([]);
    const [activeLimitId, setActiveLimitId] = useState<string | null>(null);

    const generateCardNumber = () => {
        let res = '';
        for (let i = 0; i < 4; i++) {
            res += Math.floor(1000 + Math.random() * 9000).toString() + (i < 3 ? ' ' : '');
        }
        return res;
    };

    const handleOrderNewCard = () => {
        setLoading(true);
        setTimeout(() => {
            const newCard = {
                id: 'c' + (cards.length + 1),
                number: generateCardNumber(),
                holder: `${user?.firstName} ${user?.lastName}`,
                expiry: '12/30',
                type: cards.length % 2 === 0 ? 'mastercard' : 'visa' as any,
                frozen: false,
                cvv: Math.floor(100 + Math.random() * 900).toString()
            };
            addCard(newCard);
            setLoading(false);
            setIsAdding(false);
        }, 2000);
    };

    const toggleReveal = (id: string) => {
        setRevealedIds(prev =>
            prev.includes(id) ? prev.filter(mid => mid !== id) : [...prev, id]
        );
    };

    return (
        <Layout>
            <div className="min-h-screen bg-[#fafafa]">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="max-w-7xl mx-auto px-6 lg:px-12 py-16 space-y-16"
                >
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 pb-12">
                        <div>
                            <h1 className="text-5xl font-black text-black tracking-tighter uppercase italic leading-none">Security Center.</h1>
                            <p className="text-gray-400 font-bold mt-3 uppercase text-[10px] tracking-[0.3em] opacity-60">Authorized Node Asset Management</p>
                        </div>
                        <Button
                            variant="primary"
                            onClick={() => setIsAdding(true)}
                            className="rounded-2xl px-10 h-16 bg-black hover:bg-pesse-lime hover:text-black transition-all group shadow-xl shadow-black/10"
                        >
                            <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                            <span className="ml-3 font-black uppercase italic tracking-tighter">Order New Node</span>
                        </Button>
                    </div>

                    {/* Cards Grid - Restored for better visual impact */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-16">
                        {cards.map((card, index) => (
                            <motion.div
                                key={card.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group/item"
                            >
                                {/* Premium Card Unit Container */}
                                <div className="bg-white border border-gray-100 rounded-[48px] p-10 lg:p-12 shadow-sm hover:shadow-2xl hover:shadow-black/5 transition-all duration-500">
                                    <div className="flex flex-col gap-12">

                                        {/* Card Visual Wrapper - Centered and full impact */}
                                        <div className="relative w-full max-w-[500px] mx-auto xl:mx-0">
                                            <div className="relative z-10">
                                                <CreditCardVisual card={card} showFullNumber={revealedIds.includes(card.id)} />
                                            </div>

                                            {/* Status Badge - Floating or pinned */}
                                            <div className="absolute -bottom-4 right-4 z-20">
                                                <div className={`px-6 py-2.5 rounded-full border shadow-xl flex items-center gap-3 backdrop-blur-md ${card.frozen ? 'bg-black text-white border-white/10' : 'bg-white text-black border-gray-100'}`}>
                                                    <div className={`w-2 h-2 rounded-full ${card.frozen ? 'bg-red-500' : 'bg-pesse-lime animate-pulse'}`} />
                                                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                                                        {card.frozen ? 'Encrypted' : 'Live Asset'}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Reflection Glow */}
                                            {!card.frozen && (
                                                <div className="absolute inset-0 bg-pesse-lime/10 blur-[100px] -z-10 rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity" />
                                            )}

                                            {card.frozen && (
                                                <div className="absolute inset-0 bg-black/40 backdrop-blur-[4px] rounded-[28px] flex items-center justify-center z-30 pointer-events-none">
                                                    <div className="scale-150">
                                                        <Lock size={32} className="text-white/80" />
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Controls and Metadata Area */}
                                        <div className="flex flex-col md:flex-row gap-12 items-end justify-between">
                                            <div className="flex-1 space-y-6 w-full">
                                                <div>
                                                    <h3 className="text-xl font-black text-black uppercase italic tracking-tighter leading-none mb-2">Protocol Controls.</h3>
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Active Config Node v2.04.42-STABLE</p>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                    <ControlBtn
                                                        active={card.frozen}
                                                        onClick={() => toggleCardFreeze(card.id)}
                                                        icon={<Lock size={16} />}
                                                        label={card.frozen ? 'Unfreeze' : 'Freeze'}
                                                    />
                                                    <ControlBtn
                                                        onClick={() => setActiveLimitId(activeLimitId === card.id ? null : card.id)}
                                                        icon={<Wifi size={16} />}
                                                        label="Limits"
                                                    />
                                                    <ControlBtn
                                                        onClick={() => toggleReveal(card.id)}
                                                        icon={revealedIds.includes(card.id) ? <EyeOff size={16} /> : <Eye size={16} />}
                                                        label={revealedIds.includes(card.id) ? 'Hide Info' : 'Reveal Data'}
                                                    />
                                                </div>
                                            </div>

                                            <div className="hidden md:flex flex-col items-end gap-2 shrink-0">
                                                <div className="flex -space-x-2">
                                                    {[1, 2, 3].map(i => (
                                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center overflow-hidden">
                                                            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-400" />
                                                        </div>
                                                    ))}
                                                </div>
                                                <button className="flex items-center gap-2 text-[9px] font-black uppercase text-gray-400 hover:text-black transition-colors tracking-widest">
                                                    <Settings2 size={12} />
                                                    System Logs
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Ordering Modal */}
                    <AnimatePresence>
                        {isAdding && (
                            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md">
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0, y: 50 }}
                                    animate={{ scale: 1, opacity: 1, y: 0 }}
                                    exit={{ scale: 0.9, opacity: 0, y: 50 }}
                                    className="bg-white rounded-[40px] p-12 max-w-lg w-full shadow-2xl relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-pesse-lime/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>

                                    <button
                                        onClick={() => setIsAdding(false)}
                                        className="absolute top-8 right-8 text-gray-300 hover:text-black transition-colors"
                                    >
                                        <X size={24} />
                                    </button>

                                    <div className="relative z-10">
                                        <div className="w-16 h-16 bg-pesse-light rounded-2xl flex items-center justify-center text-pesse-lime mb-8 shadow-inner">
                                            <Plus size={32} />
                                        </div>

                                        <h2 className="text-4xl font-black text-black tracking-tighter uppercase italic mb-4">Request New Asset.</h2>
                                        <p className="text-gray-500 font-medium leading-relaxed mb-10">
                                            You are about to initialize a new financial node. A 16-digit primary account number with active EMV logic will be generated instantly.
                                        </p>

                                        <div className="space-y-4">
                                            <Button
                                                variant="primary"
                                                onClick={handleOrderNewCard}
                                                disabled={loading}
                                                className="w-full h-16 rounded-2xl bg-black text-white hover:bg-pesse-lime hover:text-black transition-all font-black uppercase italic tracking-tighter flex items-center justify-center gap-3 shadow-xl shadow-black/10"
                                            >
                                                {loading ? <Loader2 className="animate-spin" /> : <Shield size={20} />}
                                                {loading ? 'Initializing...' : 'Authorize Generation'}
                                            </Button>
                                            <Button
                                                variant="secondary"
                                                onClick={() => setIsAdding(false)}
                                                className="w-full h-16 rounded-2xl border-2 border-gray-100 font-black uppercase italic tracking-tighter text-gray-400 hover:border-black hover:text-black transition-all"
                                            >
                                                Abort Request
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        )}
                    </AnimatePresence>

                    {/* Simple Limit Alert */}
                    <AnimatePresence>
                        {activeLimitId && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] bg-black text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-white/10"
                            >
                                <Wifi size={20} className="text-pesse-lime" />
                                <span className="font-black uppercase italic tracking-tighter text-sm">Node transfer limit synchronized at $50,000 / day</span>
                                <button onClick={() => setActiveLimitId(null)} className="ml-4 text-gray-500 hover:text-white"><X size={18} /></button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </Layout>
    );
};

// Sub-component for cleaner control buttons
const ControlBtn: React.FC<{ active?: boolean, onClick: () => void, icon: React.ReactNode, label: string }> = ({ active, onClick, icon, label }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all group ${active ? 'bg-black border-black text-white' : 'bg-gray-50 border-transparent hover:border-pesse-lime hover:bg-white text-black'}`}
    >
        <div className="flex items-center gap-3">
            <span className={active ? 'text-pesse-lime' : 'text-gray-400 group-hover:text-black'}>{icon}</span>
            <span className="font-black uppercase italic tracking-tighter text-xs">{label}</span>
        </div>
        <ArrowUpRight size={14} className="opacity-30 group-hover:opacity-100 transition-opacity" />
    </button>
);
