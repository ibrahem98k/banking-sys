import React, { useState } from 'react';
import { Layout } from '../components/Layout/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCardVisual } from '../components/Dashboard/CreditCard';
import { Plus, Lock, Wifi, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '../components/UI/Button';

// Mock Card Data Type
interface CardData {
    id: string;
    number: string;
    holder: string;
    expiry: string;
    frozen: boolean;
    online: boolean;
    cvv: string;
}

export const Cards: React.FC = () => {
    const [cards, setCards] = useState<CardData[]>([
        { id: '1', number: '8910', holder: 'IBRAHIM AL-FAILAKAWY', expiry: '12/28', frozen: false, online: true, cvv: '•••' }
    ]);
    const [isAdding, setIsAdding] = useState(false);
    const [loading, setLoading] = useState(false);

    const addNewCard = () => {
        setLoading(true);
        setTimeout(() => {
            const newCard: CardData = {
                id: Math.random().toString(36).substr(2, 9),
                number: Math.floor(1000 + Math.random() * 9000).toString(),
                holder: 'IBRAHIM AL-FAILAKAWY',
                expiry: '12/30',
                frozen: false,
                online: true,
                cvv: '•••'
            };
            setCards([...cards, newCard]);
            setIsAdding(false);
            setLoading(false);
        }, 1500);
    };

    const toggleFreeze = (id: string) => {
        setCards(cards.map(c => c.id === id ? { ...c, frozen: !c.frozen } : c));
    };

    return (
        <Layout>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-7xl mx-auto px-4 lg:px-8 pt-6 pb-24"
            >
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-extrabold text-black tracking-tight">My Cards.</h1>
                    <Button variant="primary" onClick={() => setIsAdding(true)} disabled={loading}>
                        {loading ? <Loader2 className="animate-spin" /> : <Plus size={20} />}
                        <span className="ml-2">Add New Card</span>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cards.map((card, index) => (
                        <motion.div
                            key={card.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative"
                        >
                            {/* Card Visual Container */}
                            <div className={`transition-all duration-300 ${card.frozen ? 'grayscale opacity-70' : ''}`}>
                                {/* We replicate CreditCardVisual props logic here or just wrap it. 
                             For now, using the fixed component but modifying it would be better. 
                             Let's wrap it in a container that simulates different cards or passed props if we refactored it. 
                             Since CreditCardVisual is hardcoded currently, we'll keep it as 'The Card' visual.
                         */}
                                <CreditCardVisual />
                            </div>

                            {/* Card Controls Overlay */}
                            <div className="mt-4 bg-white border border-pesse-gray rounded-2xl p-4 shadow-lg shadow-black/5">
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <p className="font-bold text-black">Visa Classic</p>
                                        <p className="text-sm text-gray-500">•••• {card.number}</p>
                                    </div>
                                    <div className="bg-pesse-light px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-black/60">
                                        {card.frozen ? 'Frozen' : 'Active'}
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-2">
                                    <button
                                        onClick={() => toggleFreeze(card.id)}
                                        className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-colors
                                    ${card.frozen
                                                ? 'bg-black text-white border-black'
                                                : 'bg-white border-pesse-gray hover:bg-pesse-light text-black'}`}
                                    >
                                        <Lock size={18} />
                                        <span className="text-[10px] font-bold mt-1">{card.frozen ? 'Unfreeze' : 'Freeze'}</span>
                                    </button>
                                    <button className="flex flex-col items-center justify-center p-2 rounded-xl bg-white border border-pesse-gray hover:bg-pesse-light text-black transition-colors">
                                        <Wifi size={18} />
                                        <span className="text-[10px] font-bold mt-1">Limits</span>
                                    </button>
                                    <button className="flex flex-col items-center justify-center p-2 rounded-xl bg-white border border-pesse-gray hover:bg-pesse-light text-black transition-colors">
                                        <EyeOff size={18} />
                                        <span className="text-[10px] font-bold mt-1">Reveal</span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Add Card Modal (Mock) */}
                <AnimatePresence>
                    {isAdding && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4"
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 20 }}
                                className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl relative"
                            >
                                <h2 className="text-2xl font-bold mb-4">Ordering New Card</h2>
                                <p className="text-gray-500 mb-8">
                                    A new physical and virtual card will be issued to your account.
                                </p>
                                <div className="flex gap-4">
                                    <Button variant="secondary" onClick={() => setIsAdding(false)} className="flex-1">Cancel</Button>
                                    <Button variant="primary" onClick={addNewCard} className="flex-1">Confirm</Button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </motion.div>
        </Layout>
    );
};
