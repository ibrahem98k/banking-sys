import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '../components/Layout/Layout';
import { mockApi } from '../api/mockApi';
import { useBankStore } from '../store/useBankStore';
import { UserCheck, UserX, Clock, Users, Shield, Search } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
    const { allUsers, setUsers, updateUserStatus } = useBankStore();
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            const data = await mockApi.getAllUsers();
            setUsers(data as any);
            setLoading(false);
        };
        fetchUsers();
    }, [setUsers]);

    const handleAction = async (userId: string, status: 'approved' | 'blocked') => {
        await mockApi.updateUserStatus(userId, status);
        updateUserStatus(userId, status);
    };

    const filteredUsers = allUsers.filter(u =>
        `${u.firstName} ${u.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const stats = {
        total: allUsers.length,
        pending: allUsers.filter(u => u.status === 'pending').length,
        approved: allUsers.filter(u => u.status === 'approved').length,
        blocked: allUsers.filter(u => u.status === 'blocked').length,
    };

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-6 pb-24">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                    <div>
                        <h1 className="text-4xl font-black text-black tracking-tighter uppercase italic">Control Panel.</h1>
                        <p className="text-gray-500 font-bold mt-1 uppercase text-xs tracking-[0.2em]">Pesse Node Administrator Base</p>
                    </div>

                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search Agents..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-white border-2 border-pesse-gray rounded-2xl py-3 pl-12 pr-6 w-full md:w-80 focus:border-black outline-none transition-all font-bold"
                        />
                    </div>
                </div>

                {/* Grid Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: 'Total Nodes', value: stats.total, icon: Users, color: 'text-black', bg: 'bg-white' },
                        { label: 'Pending Auth', value: stats.pending, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
                        { label: 'Verified', value: stats.approved, icon: Shield, color: 'text-pesse-lime', bg: 'bg-pesse-lime/10' },
                        { label: 'Deactivated', value: stats.blocked, icon: UserX, color: 'text-red-500', bg: 'bg-red-50' },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`${stat.bg} border border-pesse-gray p-6 rounded-[32px] shadow-lg shadow-black/5 relative overflow-hidden`}
                        >
                            <stat.icon className={`absolute -right-4 -bottom-4 w-24 h-24 opacity-5 ${stat.color}`} />
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                            <h3 className={`text-4xl font-black ${stat.color}`}>{stat.value}</h3>
                        </motion.div>
                    ))}
                </div>

                {/* User List Table */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white border border-pesse-gray rounded-[40px] overflow-hidden shadow-2xl shadow-black/5"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-pesse-light text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">
                                <tr>
                                    <th className="px-8 py-6">Agent Details</th>
                                    <th className="px-8 py-6">Status</th>
                                    <th className="px-8 py-6">Control</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {loading ? (
                                    <tr>
                                        <td colSpan={3} className="px-8 py-20 text-center font-bold text-gray-400">Loading Nodes...</td>
                                    </tr>
                                ) : filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan={3} className="px-8 py-20 text-center font-bold text-gray-400">No Nodes Found</td>
                                    </tr>
                                ) : filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-pesse-light/50 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-black text-pesse-lime flex items-center justify-center font-black text-xl shadow-lg shadow-black/20">
                                                    {user.firstName[0]}
                                                </div>
                                                <div>
                                                    <p className="text-lg font-black text-black leading-tight italic uppercase">{user.firstName} {user.lastName}</p>
                                                    <p className="text-sm text-gray-400 font-bold tracking-tight lowercase">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${user.status === 'approved' ? 'bg-pesse-lime/20 text-pesse-lime border border-pesse-lime/30' :
                                                user.status === 'pending' ? 'bg-amber-100 text-amber-600 border border-amber-200' :
                                                    'bg-red-100 text-red-600 border border-red-200'
                                                }`}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {user.status !== 'approved' && (
                                                    <button
                                                        onClick={() => handleAction(user.id, 'approved')}
                                                        className="p-3 bg-pesse-lime text-black rounded-xl hover:scale-110 transition-transform shadow-lg shadow-pesse-lime/20"
                                                        title="Approve Node"
                                                    >
                                                        <UserCheck size={20} strokeWidth={3} />
                                                    </button>
                                                )}
                                                {user.status !== 'blocked' && (
                                                    <button
                                                        onClick={() => handleAction(user.id, 'blocked')}
                                                        className="p-3 bg-black text-white rounded-xl hover:scale-110 transition-transform shadow-lg shadow-black/20"
                                                        title="Block Node"
                                                    >
                                                        <UserX size={20} strokeWidth={3} />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>
        </Layout>
    );
};
