import React from 'react';
import { Layout } from '../components/Layout/Layout';
import { motion } from 'framer-motion';
import { Button } from '../components/UI/Button';
import { User, Bell, Shield, ChevronRight } from 'lucide-react';

export const Settings: React.FC = () => {
    return (
        <Layout>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl mx-auto px-4 lg:px-8 pt-6 pb-24"
            >
                <h1 className="text-3xl font-extrabold text-black tracking-tight mb-2">Settings.</h1>
                <p className="text-gray-500 mb-8">Manage your account preferences.</p>

                <div className="space-y-6">
                    {/* Profile Section */}
                    <div className="bg-white border border-pesse-gray rounded-3xl p-6 shadow-sm">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <div className="p-2 bg-pesse-lime rounded-full text-black">
                                <User size={20} />
                            </div>
                            Profile Information
                        </h2>

                        <div className="flex items-center gap-6 mb-8">
                            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-3xl font-bold text-gray-400 border-2 border-dashed border-gray-300">
                                IA
                            </div>
                            <div>
                                <Button variant="secondary" className="text-xs py-1.5 h-auto">Change Avatar</Button>
                                <p className="text-xs text-gray-400 mt-2">Max size 2MB (JPG, PNG)</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Full Name</label>
                                <input type="text" defaultValue="Ibrahim Al-Failakawy" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-black/5" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Email Address</label>
                                <input type="email" defaultValue="ibrahim@example.com" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-black/5" />
                            </div>
                        </div>
                    </div>

                    {/* Notifications */}
                    <div className="bg-white border border-pesse-gray rounded-3xl p-6 shadow-sm">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <div className="p-2 bg-black text-white rounded-full">
                                <Bell size={20} />
                            </div>
                            Notifications
                        </h2>

                        <div className="space-y-4">
                            {['Payment Alert', 'New Device Login', 'Monthly Report', 'Promotional Offers'].map((item) => (
                                <div key={item} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
                                    <span className="font-medium">{item}</span>
                                    {/* Simple Toggle Switch */}
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" defaultChecked className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pesse-lime"></div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Security */}
                    <div className="bg-white border border-pesse-gray rounded-3xl p-6 shadow-sm cursor-pointer hover:border-black transition-colors group">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gray-100 rounded-full text-black group-hover:bg-black group-hover:text-white transition-colors">
                                    <Shield size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold">Security Settings</h4>
                                    <p className="text-sm text-gray-500">2FA, Password, Login History</p>
                                </div>
                            </div>
                            <ChevronRight className="text-gray-400 group-hover:text-black" />
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-end gap-4">
                    <Button variant="ghost">Discard</Button>
                    <Button variant="primary">Save Changes</Button>
                </div>

            </motion.div>
        </Layout>
    );
};
