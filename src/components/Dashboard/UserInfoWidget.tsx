import React from 'react';
import { motion } from 'framer-motion';
import { useBankStore } from '../../store/useBankStore';
import { User, Phone, MapPin, ShieldCheck, Mail, Calendar } from 'lucide-react';

export const UserInfoWidget: React.FC = () => {
    const user = useBankStore((state) => state.user);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm h-full relative overflow-hidden"
        >
            {/* Soft decorative background element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-pesse-lime/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />

            <div className="relative z-10">
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-16 h-16 rounded-2xl bg-pesse-light flex items-center justify-center text-pesse-lime">
                        <User size={32} />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-black tracking-tight uppercase italic">
                            Node Profile.
                        </h3>
                        <div className="flex items-center gap-2">
                            <ShieldCheck size={12} className="text-pesse-lime" />
                            <span className="text-[10px] font-black text-pesse-lime uppercase tracking-widest">Verified Identity</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <InfoItem icon={<Mail size={16} />} label="Email Address" value={user?.email || 'N/A'} />
                    <InfoItem icon={<Phone size={16} />} label="Phone Number" value="+964 770 123 4567" />
                    <InfoItem icon={<MapPin size={16} />} label="Base Location" value="Baghdad, Iraq" />
                    <InfoItem icon={<Calendar size={16} />} label="Member Since" value="January 2026" />
                </div>

                <div className="mt-10 pt-10 border-t border-gray-50 flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Account Tier</p>
                        <span className="px-3 py-1 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-widest leading-none">
                            {user?.tier || 'Basic'}
                        </span>
                    </div>
                    <button className="text-xs font-black text-black uppercase tracking-widest hover:text-pesse-lime transition-colors border-b-2 border-pesse-lime pb-1">
                        Edit Credentials
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

const InfoItem: React.FC<{ icon: React.ReactNode, label: string, value: string }> = ({ icon, label, value }) => (
    <div className="flex items-start gap-4">
        <div className="mt-1 p-2 rounded-lg bg-gray-50 text-gray-400">
            {icon}
        </div>
        <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
            <p className="text-sm font-bold text-black">{value}</p>
        </div>
    </div>
);
