import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '../UI/Button';

interface AdminEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: any;
    onSave: (userId: string, data: any) => void;
}

export const AdminEditModal: React.FC<AdminEditModalProps> = ({ isOpen, onClose, user, onSave }) => {
    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        tier: user?.tier || 'basic',
        status: user?.status || 'approved'
    });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(user.id, formData);
        onClose();
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-lg bg-white rounded-[40px] shadow-2xl overflow-hidden"
                >
                    <div className="p-8 lg:p-12">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-3xl font-black text-black tracking-tighter uppercase italic leading-none">Edit Agent.</h2>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2">Modify node authorization levels</p>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {user.selfie && (
                                <div className="mb-6 rounded-2xl overflow-hidden aspect-video relative group border-2 border-gray-100">
                                    <img src={user.selfie} alt="User Selfie" className="w-full h-full object-cover type" />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="text-white font-black uppercase tracking-widest text-xs">Biometric Data</span>
                                    </div>
                                </div>
                            )}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-2 italic">First Name</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                            className="w-full bg-gray-50 border-2 border-transparent border-b-gray-100 focus:border-pesse-lime rounded-2xl px-5 py-3.5 font-bold outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-2 italic">Last Name</label>
                                    <input
                                        type="text"
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        className="w-full bg-gray-50 border-2 border-transparent border-b-gray-100 focus:border-pesse-lime rounded-2xl px-5 py-3.5 font-bold outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-2 italic">Email Address</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-gray-50 border-2 border-transparent border-b-gray-100 focus:border-pesse-lime rounded-2xl px-5 py-3.5 font-bold outline-none transition-all"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-2 italic">Node Tier</label>
                                    <select
                                        value={formData.tier}
                                        onChange={(e) => setFormData({ ...formData, tier: e.target.value as any })}
                                        className="w-full bg-gray-50 border-2 border-transparent border-b-gray-100 focus:border-pesse-lime rounded-2xl px-5 py-3.5 font-bold outline-none transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="basic">Basic Node</option>
                                        <option value="premium">Premium Node</option>
                                        <option value="elite">Elite Node</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-2 italic">Status</label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                                        className="w-full bg-gray-50 border-2 border-transparent border-b-gray-100 focus:border-pesse-lime rounded-2xl px-5 py-3.5 font-bold outline-none transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="approved">Approved</option>
                                        <option value="blocked">Blocked</option>
                                    </select>
                                </div>
                            </div>

                            <div className="pt-8 flex gap-4">
                                <Button type="button" variant="ghost" className="flex-1 rounded-2xl" onClick={onClose}>Cancel</Button>
                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="flex-1 rounded-2xl bg-black text-white hover:bg-pesse-lime hover:text-black font-black uppercase italic tracking-tighter"
                                >
                                    Authorize Updates
                                </Button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
