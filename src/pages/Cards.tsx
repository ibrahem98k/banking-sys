import React, { useState } from 'react';
import { Layout } from '../components/Layout/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCardVisual } from '../components/Dashboard/CreditCard';
import { Plus, Lock, Wifi, Eye, EyeOff, Loader2, X, Shield, Trash2, AlertTriangle } from 'lucide-react';
import { Button } from '../components/UI/Button';
import { useBankStore } from '../store/useBankStore';

export const Cards: React.FC = () => {
    const { cards, user, addCard, toggleCardFreeze, deleteCard } = useBankStore();
    const [isAdding, setIsAdding] = useState(false);
    const [deleteCardId, setDeleteCardId] = useState<string | null>(null);
    const [passwordInput, setPasswordInput] = useState('');
    const [deleteError, setDeleteError] = useState('');
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
                holder: user ? `${user.firstName} ${user.lastName}`.toUpperCase() : 'AUTHORIZED HOLDER',
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

    const confirmDelete = () => {
        if (!passwordInput) {
            setDeleteError('Security Protocol: Password Required');
            return;
        }
        if (user?.password && passwordInput !== user.password) {
            setDeleteError('Security Protocol: Invalid Credentials');
            return;
        }

        // Fallback for demo users without password in store
        if (!user?.password && passwordInput.length < 3) {
            setDeleteError('Security Protocol: Invalid Credentials');
            return;
        }

        if (deleteCardId) {
            deleteCard(deleteCardId);
            setDeleteCardId(null);
            setPasswordInput('');
            setDeleteError('');
        }
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

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-16">
                        {cards.map((card, index) => (
                            <motion.div
                                key={card.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group/item"
                            >
                                <div className="bg-white border border-gray-100 rounded-[48px] p-10 lg:p-12 shadow-sm hover:shadow-2xl hover:shadow-black/5 transition-all duration-500">
                                    <div className="flex flex-col gap-12">
                                        <div className="relative w-full max-w-[500px] mx-auto xl:mx-0">
                                            <div className="relative z-10">
                                                <CreditCardVisual card={card} showFullNumber={revealedIds.includes(card.id)} />
                                            </div>

                                            <div className="absolute -bottom-4 right-8 z-[60]">
                                                <motion.div
                                                    initial={false}
                                                    animate={{
                                                        backgroundColor: card.frozen ? '#000000' : '#ffffff',
                                                        color: card.frozen ? '#ffffff' : '#000000'
                                                    }}
                                                    className={`px-6 py-2.5 rounded-full border shadow-2xl flex items-center gap-3 backdrop-blur-md ${card.frozen ? 'border-white/20' : 'border-gray-100'}`}
                                                >
                                                    <div className={`w-2 h-2 rounded-full ${card.frozen ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]' : 'bg-pesse-lime animate-pulse shadow-[0_0_10px_rgba(190,246,0,0.8)]'}`} />
                                                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                                                        {card.frozen ? 'Node Encrypted' : 'Asset Live'}
                                                    </span>
                                                </motion.div>
                                            </div>

                                            {card.frozen && (
                                                <div className="absolute inset-0 bg-black/40 backdrop-blur-[6px] rounded-[28px] flex items-center justify-center z-50 pointer-events-none border border-black/10">
                                                    <motion.div
                                                        initial={{ scale: 0.5, opacity: 0 }}
                                                        animate={{ scale: 1, opacity: 1 }}
                                                        className="bg-white/10 p-5 rounded-full backdrop-blur-sm border border-white/20"
                                                    >
                                                        <Lock size={32} className="text-white" />
                                                    </motion.div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Controls Area */}
                                        <div className="space-y-6">
                                            <div>
                                                <h3 className="text-xl font-black text-black uppercase italic tracking-tighter leading-none mb-2">Protocol Controls.</h3>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Active Config Node v2.04.42-STABLE</p>
                                            </div>

                                            <div className="grid grid-cols-4 gap-3">
                                                <ControlBtn
                                                    active={card.frozen}
                                                    onClick={() => toggleCardFreeze(card.id)}
                                                    icon={<Lock size={18} />}
                                                    label={card.frozen ? 'Unfreeze' : 'Freeze'}
                                                />
                                                <ControlBtn
                                                    onClick={() => setActiveLimitId(activeLimitId === card.id ? null : card.id)}
                                                    icon={<Wifi size={18} />}
                                                    label="Limits"
                                                />
                                                <ControlBtn
                                                    onClick={() => toggleReveal(card.id)}
                                                    icon={revealedIds.includes(card.id) ? <EyeOff size={18} /> : <Eye size={18} />}
                                                    label={revealedIds.includes(card.id) ? 'Hide' : 'Reveal'}
                                                />
                                                <ControlBtn
                                                    onClick={() => setDeleteCardId(card.id)}
                                                    icon={<Trash2 size={18} className="text-red-500" />}
                                                    label="Delete"
                                                />
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

                    {/* Delete Confirmation Modal */}
                    <AnimatePresence>
                        {deleteCardId && (
                            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.9, opacity: 0 }}
                                    className="bg-white rounded-[32px] p-10 max-w-md w-full shadow-2xl relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl"></div>

                                    <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 mb-6 mx-auto">
                                        <AlertTriangle size={28} />
                                    </div>

                                    <h3 className="text-2xl font-black text-center text-black uppercase italic tracking-tighter mb-2">Protocol Warning</h3>
                                    <p className="text-center text-gray-400 text-sm font-bold uppercase tracking-widest mb-8">Authorize Node Termination</p>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest italic ml-2">Node Access Key (Password)</label>
                                            <input
                                                type="password"
                                                value={passwordInput}
                                                onChange={(e) => {
                                                    setPasswordInput(e.target.value);
                                                    setDeleteError('');
                                                }}
                                                className="w-full h-14 bg-gray-50 border-2 border-transparent focus:border-red-500 focus:bg-white rounded-xl px-4 outline-none transition-all font-black uppercase italic tracking-tighter text-lg"
                                                placeholder="••••••••"
                                            />
                                            {deleteError && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest italic ml-2">{deleteError}</p>}
                                        </div>

                                        <div className="flex gap-3 pt-4">
                                            <Button
                                                variant="secondary"
                                                onClick={() => {
                                                    setDeleteCardId(null);
                                                    setPasswordInput('');
                                                    setDeleteError('');
                                                }}
                                                className="flex-1 h-14 rounded-xl border-2 border-gray-100 font-black uppercase italic tracking-tighter text-gray-400 hover:border-black hover:text-black transition-all"
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                variant="primary"
                                                onClick={confirmDelete}
                                                className="flex-1 h-14 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-all font-black uppercase italic tracking-tighter shadow-lg shadow-red-500/20"
                                            >
                                                Confirm Delete
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
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
        className={`w-full flex flex-col items-center justify-center gap-3 p-5 rounded-[24px] border transition-all duration-300 group relative overflow-hidden ${active
            ? 'bg-black text-white border-black shadow-xl shadow-black/20'
            : 'bg-white border-gray-100 hover:border-pesse-lime hover:shadow-lg hover:shadow-pesse-lime/10 text-black'
            }`}
    >
        <span className={`transition-transform duration-300 group-hover:scale-110 ${active ? 'text-pesse-lime' : 'text-gray-400 group-hover:text-black'}`}>
            {icon}
        </span>
        <span className="font-black uppercase italic tracking-tighter text-[9px] whitespace-nowrap opacity-80 group-hover:opacity-100">
            {label}
        </span>
        {!active && (
            <div className="absolute inset-0 bg-pesse-lime/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
    </button>
);
