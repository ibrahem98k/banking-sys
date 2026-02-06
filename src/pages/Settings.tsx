import React from 'react';
import { Layout } from '../components/Layout/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/UI/Button';
import { User, Bell, Shield, ChevronRight, Camera, Globe, Lock, ShieldCheck, Mail } from 'lucide-react';
import { useBankStore } from '../store/useBankStore';

export const Settings: React.FC = () => {
    const { user } = useBankStore();

    return (
        <Layout>
            <div className="min-h-screen bg-[#fafafa]">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="max-w-4xl mx-auto px-6 lg:px-12 py-16 space-y-16"
                >
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 pb-12">
                        <div>
                            <h1 className="text-5xl font-black text-black tracking-tighter uppercase italic leading-none">Preferences.</h1>
                            <p className="text-gray-400 font-bold mt-3 uppercase text-[10px] tracking-[0.3em] opacity-60">System Configuration & User Authority</p>
                        </div>
                        <div className="flex items-center gap-4 text-[10px] font-black uppercase text-gray-300 tracking-widest">
                            <span className="flex items-center gap-2"><Globe size={12} /> GLOBAL NODE v4.0</span>
                            <span className="w-1 h-1 bg-gray-200 rounded-full" />
                            <span className="text-pesse-lime">ENCRYPTED SESSION</span>
                        </div>
                    </div>

                    <div className="space-y-12">
                        {/* Profile Identity Section */}
                        <section className="bg-white border border-gray-100 rounded-[48px] p-10 lg:p-12 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-pesse-lime/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-pesse-lime/10 transition-colors duration-700"></div>

                            <div className="flex items-center justify-between mb-12">
                                <div>
                                    <h2 className="text-2xl font-black text-black tracking-tighter uppercase italic leading-none">Node Identity.</h2>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2">Primary authorized user credentials</p>
                                </div>
                                <div className="p-4 bg-pesse-light rounded-2xl text-pesse-lime">
                                    <ShieldCheck size={24} />
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row items-center gap-12 mb-12">
                                <div className="relative">
                                    <div className="w-32 h-32 rounded-[40px] bg-black text-white flex items-center justify-center text-4xl font-black italic tracking-tighter overflow-hidden">
                                        {user?.firstName?.[0]}{user?.lastName?.[0]}
                                    </div>
                                    <button className="absolute -bottom-2 -right-2 p-3 bg-pesse-lime text-black rounded-2xl shadow-xl hover:scale-110 transition-transform">
                                        <Camera size={20} />
                                    </button>
                                </div>
                                <div className="space-y-2 text-center md:text-left">
                                    <h3 className="text-xl font-black text-black uppercase tracking-tight italic">{user?.firstName} {user?.lastName}</h3>
                                    <div className="flex items-center gap-3 justify-center md:justify-start">
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-full border border-gray-100 italic">Level {user?.tier || 'Basic'} Node</span>
                                        <span className="text-[10px] font-black text-pesse-lime uppercase tracking-widest">Active Status</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <FormInput label="First Name" value={user?.firstName || ''} />
                                <FormInput label="Last Name" value={user?.lastName || ''} />
                                <FormInput label="Email Address" value={user?.email || ''} icon={<Mail size={16} />} />
                                <FormInput label="Phone Number" value="+964 770 123 4567" />
                            </div>
                        </section>

                        {/* Communication Protocols */}
                        <section className="bg-white border border-gray-100 rounded-[48px] p-10 lg:p-12 shadow-sm">
                            <div className="flex items-center justify-between mb-12">
                                <div>
                                    <h2 className="text-2xl font-black text-black tracking-tighter uppercase italic leading-none">Protocols.</h2>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2">Notification & communication triggers</p>
                                </div>
                                <div className="p-4 bg-black rounded-2xl text-white">
                                    <Bell size={24} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                <SettingsToggle label="Outflow Alerts" description="Immediate notification on node spending" defaultChecked />
                                <SettingsToggle label="Session Access" description="Alert when node is accessed from new device" defaultChecked />
                                <SettingsToggle label="Monthly Audit" description="Detailed financial performance reports" />
                                <SettingsToggle label="Network Updates" description="System improvements and node expansions" defaultChecked />
                            </div>
                        </section>

                        {/* Security Core */}
                        <section className="bg-black text-white rounded-[48px] p-10 lg:p-12 shadow-2xl shadow-black/20 overflow-hidden relative group">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-pesse-lime shadow-[0_0_100px_#bef600] rounded-full translate-x-1/2 -translate-y-1/2 opacity-5 blur-3xl group-hover:opacity-10 transition-opacity duration-700"></div>

                            <div className="flex items-center justify-between mb-12 relative z-10">
                                <div>
                                    <h2 className="text-2xl font-black text-white tracking-tighter uppercase italic leading-none">Security Core.</h2>
                                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-2">Encryption & access authorization</p>
                                </div>
                                <div className="p-4 bg-white/10 border border-white/10 rounded-2xl text-pesse-lime">
                                    <Lock size={24} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                                <SecurityAction title="Two-Factor Auth" status="Enabled" action="Manage" icon={<Shield size={20} />} />
                                <SecurityAction title="Node Password" status="Last changed 34 days ago" action="Update" icon={<Lock size={20} />} />
                            </div>
                        </section>
                    </div>

                    <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-end gap-6">
                        <button className="px-12 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-black transition-all">Discard Changes</button>
                        <Button
                            variant="primary"
                            className="px-16 h-16 rounded-2xl bg-black text-white hover:bg-pesse-lime hover:text-black transition-all font-black uppercase italic tracking-tighter shadow-xl shadow-black/10"
                        >
                            Sync Preferences
                        </Button>
                    </div>
                </motion.div>
            </div>
        </Layout>
    );
};

const FormInput: React.FC<{ label: string, value: string, icon?: React.ReactNode }> = ({ label, value, icon }) => (
    <div className="space-y-3">
        <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] ml-2 italic">{label}</label>
        <div className="relative group">
            <input
                type="text"
                defaultValue={value}
                className="w-full bg-gray-50 border-2 border-transparent border-b-gray-100 transition-all focus:bg-white focus:border-pesse-lime rounded-[20px] px-6 py-4 font-black italic text-black tracking-tight placeholder:text-gray-200 outline-none shadow-sm group-hover:shadow-md h-16 flex items-center"
            />
            {icon && <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 group-hover:text-black transition-colors">{icon}</div>}
        </div>
    </div>
);

const SettingsToggle: React.FC<{ label: string, description: string, defaultChecked?: boolean }> = ({ label, description, defaultChecked }) => (
    <div className="flex items-center justify-between p-6 bg-white border border-gray-50 rounded-[30px] hover:border-pesse-lime/30 hover:shadow-xl hover:shadow-black/5 transition-all group">
        <div>
            <h4 className="font-black text-black uppercase text-sm tracking-tight italic group-hover:text-pesse-lime transition-colors">{label}</h4>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{description}</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" defaultChecked={defaultChecked} className="sr-only peer" />
            <div className="w-14 h-8 bg-gray-100 rounded-full peer peer-checked:bg-pesse-lime transition-all after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:after:translate-x-6 shadow-inner"></div>
        </label>
    </div>
);

const SecurityAction: React.FC<{ title: string, status: string, action: string, icon: React.ReactNode }> = ({ title, status, action, icon }) => (
    <div className="flex items-center justify-between p-8 bg-white/5 border border-white/5 rounded-[32px] hover:bg-white/10 hover:border-white/10 transition-all cursor-pointer group">
        <div className="flex items-center gap-6">
            <div className="p-4 bg-white/5 rounded-2xl text-white group-hover:text-pesse-lime transition-colors">
                {icon}
            </div>
            <div>
                <h4 className="font-black text-white uppercase text-sm tracking-tight italic">{title}</h4>
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mt-1">{status}</p>
            </div>
        </div>
        <button className="text-[10px] font-black text-pesse-lime uppercase tracking-widest border-b-2 border-pesse-lime/30 pb-1 group-hover:border-pesse-lime transition-all">{action}</button>
    </div>
);
