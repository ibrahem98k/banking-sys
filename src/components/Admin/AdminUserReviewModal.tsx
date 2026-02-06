import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, ShieldAlert, Check, FileText } from 'lucide-react';
import { Button } from '../UI/Button';

interface AdminUserReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: any;
    onAction: (userId: string, status: 'approved' | 'blocked') => void;
}

export const AdminUserReviewModal: React.FC<AdminUserReviewModalProps> = ({ isOpen, onClose, user, onAction }) => {
    if (!isOpen || !user) return null;

    const handleApprove = () => {
        onAction(user.id, 'approved');
        onClose();
    };

    const handleRestrict = () => {
        onAction(user.id, 'blocked');
        onClose();
    };

    const StatusBadge = ({ status }: { status: string }) => {
        const styles = status === 'approved' ? 'bg-pesse-lime text-black' :
            status === 'blocked' ? 'bg-red-500 text-white' : 'bg-amber-100 text-amber-600';
        return (
            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] italic ${styles}`}>
                {status}
            </span>
        );
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-md"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-4xl bg-white rounded-[40px] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
                >
                    {/* Header */}
                    <div className="p-8 lg:p-10 border-b border-gray-100 flex justify-between items-start bg-gray-50/50">
                        <div>
                            <div className="flex items-center gap-4 mb-2">
                                <h2 className="text-3xl font-black text-black tracking-tighter uppercase italic leading-none">
                                    {user.firstName} {user.lastName}
                                </h2>
                                <StatusBadge status={user.status} />
                            </div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2">
                                <span className="text-black">{user.id}</span>
                                <span>•</span>
                                <span>{user.email || 'NO EMAIL'}</span>
                                <span>•</span>
                                <span>{user.phone || 'NO PHONE'}</span>
                            </p>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                            <X size={24} />
                        </button>
                    </div>

                    {/* Scrollable Content */}
                    <div className="overflow-y-auto flex-1 p-8 lg:p-10 space-y-10">
                        {/* Identity Section */}
                        <section>
                            <h3 className="text-xl font-black text-black uppercase italic tracking-tighter mb-6 flex items-center gap-2">
                                <FileText size={20} /> Identity Documents
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Selfie - Prominent */}
                                <div className="lg:col-span-1 row-span-2">
                                    <div className="bg-black rounded-3xl p-1 shadow-xl overflow-hidden relative group h-full min-h-[300px]">
                                        {user.selfie ? (
                                            <img src={user.selfie} alt="Biometric Verification" className="w-full h-full object-cover rounded-[20px]" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-900 text-gray-700 font-black uppercase italic">No Biometric Data</div>
                                        )}
                                        <div className="absolute top-4 left-4 bg-pesse-lime text-black px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">
                                            Biometric Check
                                        </div>
                                    </div>
                                </div>

                                {/* ID/Passport Front */}
                                <div className="bg-gray-50 rounded-3xl p-4 border border-gray-100 relative group hover:shadow-lg transition-shadow">
                                    <div className="aspect-[1.58/1] bg-white rounded-xl mb-3 overflow-hidden border border-gray-100">
                                        {user.documents?.main ? (
                                            <img src={user.documents.main} alt="Main ID" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs font-bold uppercase">Front Side Missing</div>
                                        )}
                                    </div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Primary Credential (Front)</p>
                                </div>

                                {/* ID/Passport Back / Secondary */}
                                <div className="bg-gray-50 rounded-3xl p-4 border border-gray-100 relative group hover:shadow-lg transition-shadow">
                                    <div className="aspect-[1.58/1] bg-white rounded-xl mb-3 overflow-hidden border border-gray-100">
                                        {user.documents?.secondary ? (
                                            <img src={user.documents.secondary} alt="Secondary ID" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs font-bold uppercase">Back Side Missing</div>
                                        )}
                                    </div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Primary Credential (Back)</p>
                                </div>

                                {/* Residence Front */}
                                <div className="bg-gray-50 rounded-3xl p-4 border border-gray-100 relative group hover:shadow-lg transition-shadow">
                                    <div className="aspect-[1.58/1] bg-white rounded-xl mb-3 overflow-hidden border border-gray-100">
                                        {user.documents?.residenceFront ? (
                                            <img src={user.documents.residenceFront} alt="Residence Front" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs font-bold uppercase">Residence Front Missing</div>
                                        )}
                                    </div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Residence (Front)</p>
                                </div>

                                {/* Residence Back */}
                                <div className="bg-gray-50 rounded-3xl p-4 border border-gray-100 relative group hover:shadow-lg transition-shadow">
                                    <div className="aspect-[1.58/1] bg-white rounded-xl mb-3 overflow-hidden border border-gray-100">
                                        {user.documents?.residenceBack ? (
                                            <img src={user.documents.residenceBack} alt="Residence Back" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs font-bold uppercase">Residence Back Missing</div>
                                        )}
                                    </div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Residence (Back)</p>
                                </div>
                            </div>
                        </section>

                        <section className="grid grid-cols-2 gap-8 pt-6 border-t border-gray-100">
                            <div>
                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic mb-2">Account Tier</h4>
                                <div className="text-xl font-black italic uppercase">{user.tier || 'Standard'}</div>
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic mb-2">Join Date</h4>
                                <div className="text-xl font-black italic uppercase">{user.joinDate || 'N/A'}</div>
                            </div>
                        </section>
                    </div>

                    {/* Action Bar */}
                    <div className="p-8 border-t border-gray-100 bg-gray-50 flex gap-4">
                        <Button
                            onClick={handleRestrict}
                            className={`flex-1 h-16 rounded-2xl font-black uppercase italic tracking-widest text-lg flex items-center justify-center gap-3 transition-all ${user.status === 'blocked'
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-black text-white hover:bg-red-600 shadow-xl'
                                }`}
                            disabled={user.status === 'blocked'}
                        >
                            <ShieldAlert size={20} />
                            Restrict Access
                        </Button>
                        <Button
                            onClick={handleApprove}
                            className={`flex-[2] h-16 rounded-2xl font-black uppercase italic tracking-widest text-lg flex items-center justify-center gap-3 transition-all ${user.status === 'approved'
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-pesse-lime text-black hover:scale-[1.02] shadow-xl shadow-pesse-lime/20'
                                }`}
                            disabled={user.status === 'approved'}
                        >
                            <ShieldCheck size={20} />
                            Accept & Authorize
                        </Button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
