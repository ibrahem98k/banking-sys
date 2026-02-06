import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from '../components/Layout/Layout';
import { mockApi } from '../api/mockApi';
import { useBankStore } from '../store/useBankStore';
import {
    UserCheck,
    UserX,
    Clock,
    Users,
    Shield,
    Search,
    Trash2,
    Edit3,
    FileText,
    UploadCloud,
    DollarSign,
    CheckCircle2,
    AlertCircle,
    Activity,
    ShieldAlert,
    Database,
    Loader2,
    Camera
} from 'lucide-react';
import { AdminEditModal } from '../components/Admin/AdminEditModal';
import { Button } from '../components/UI/Button';

export const AdminDashboard: React.FC = () => {
    const { allUsers, setUsers, updateUserStatus, deleteUser, updateUser } = useBankStore();
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState<'users' | 'payroll'>('users');

    // Salary processing states
    const [isProcessing, setIsProcessing] = useState(false);
    const [processComplete, setProcessComplete] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Edit modal states
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);

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

    const handleDelete = async (userId: string) => {
        if (window.confirm('PROTOCOL WARNING: Are you sure you want to PERMANENTLY delete this node? This action cannot be undone.')) {
            await mockApi.deleteUser(userId);
            deleteUser(userId);
        }
    };

    const handleEditSave = async (userId: string, data: any) => {
        await mockApi.updateUser(userId, data);
        updateUser(userId, data);
    };

    const handleProcessSalaries = async () => {
        setIsProcessing(true);
        // Simulate processing
        await mockApi.processSalaries([1, 2, 3, 4, 5]);
        setIsProcessing(false);
        setProcessComplete(true);
        setTimeout(() => setProcessComplete(false), 5000);
        setSelectedFile(null);
    };

    const filteredUsers = allUsers.filter(u =>
        `${u.firstName} ${u.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.phone?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const stats = {
        total: allUsers.length,
        pending: allUsers.filter(u => u.status === 'pending').length,
        active: allUsers.filter(u => u.status === 'approved').length,
        risk: allUsers.filter(u => u.status === 'blocked').length,
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
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-gray-100 pb-12">
                        <div>
                            <h1 className="text-6xl font-black text-black tracking-tighter uppercase italic leading-none">Authority.</h1>
                            <p className="text-gray-400 font-bold mt-3 uppercase text-[10px] tracking-[0.4em] opacity-60 flex items-center gap-2">
                                <Database size={12} className="text-pesse-lime" />
                                Central Intelligence Command Center
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-6 text-[10px] font-black uppercase text-gray-300 tracking-widest">
                            <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-100"><Activity size={12} className="text-pesse-lime" /> SYSTEM HEALTH: OPTIMAL</span>
                            <span className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full"><Shield size={12} className="text-pesse-lime" /> ADMIN CLEARANCE</span>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex gap-4">
                        <TabButton
                            active={activeTab === 'users'}
                            onClick={() => setActiveTab('users')}
                            icon={<Users size={18} />}
                            label="User Network"
                        />
                        <TabButton
                            active={activeTab === 'payroll'}
                            onClick={() => setActiveTab('payroll')}
                            icon={<DollarSign size={18} />}
                            label="Payroll Protocol"
                        />
                    </div>

                    <AnimatePresence mode="wait">
                        {activeTab === 'users' ? (
                            <motion.div
                                key="users"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-12"
                            >
                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                                    <StatCard label="Total Nodes" value={stats.total} icon={Users} color="text-black" bg="bg-white" />
                                    <StatCard label="In Review" value={stats.pending} icon={Clock} color="text-amber-500" bg="bg-amber-50" />
                                    <StatCard label="Verified" value={stats.active} icon={Shield} color="text-pesse-lime" bg="bg-pesse-lime/10" />
                                    <StatCard label="Restricted" value={stats.risk} icon={ShieldAlert} color="text-red-500" bg="bg-red-50" />
                                </div>

                                {/* Table Section */}
                                <div className="bg-white border border-gray-100 rounded-[48px] shadow-sm overflow-hidden relative">
                                    <div className="p-8 lg:p-12 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div>
                                            <h3 className="text-2xl font-black text-black tracking-tighter uppercase italic leading-none">Agent Ledger.</h3>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2 italic">Global user accessibility & authorization</p>
                                        </div>
                                        <div className="relative">
                                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input
                                                type="text"
                                                placeholder="SEARCH NODES..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="bg-gray-50 border-2 border-transparent focus:bg-white focus:border-pesse-lime rounded-[20px] py-4 pl-12 pr-6 w-full md:w-80 outline-none transition-all font-black italic uppercase tracking-tighter text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left">
                                            <thead className="bg-gray-50/50 text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] italic">
                                                <tr>
                                                    <th className="px-12 py-6">Identity</th>
                                                    <th className="px-12 py-6">Authorization</th>
                                                    <th className="px-12 py-6">Node Status</th>
                                                    <th className="px-12 py-6 text-right">Command</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-50">
                                                {loading ? (
                                                    <tr><td colSpan={4} className="px-12 py-32 text-center font-black text-gray-200 uppercase tracking-[0.5em]">Initializing Data Stream...</td></tr>
                                                ) : filteredUsers.length === 0 ? (
                                                    <tr><td colSpan={4} className="px-12 py-32 text-center font-black text-gray-200 uppercase tracking-[0.5em]">No Nodes Detected</td></tr>
                                                ) : filteredUsers.map((user) => (
                                                    <tr key={user.id} className="hover:bg-pesse-light/30 transition-all group">
                                                        <td className="px-12 py-8">
                                                            <div className="flex items-center gap-6">
                                                                <div className="relative group/avatar">
                                                                    <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center font-black text-xl italic shadow-xl group-hover:scale-110 transition-transform overflow-hidden">
                                                                        {user.selfie ? (
                                                                            <img src={user.selfie} alt="Selfie" className="w-full h-full object-cover" />
                                                                        ) : (
                                                                            <span>{user.firstName[0]}{user.lastName[0]}</span>
                                                                        )}
                                                                    </div>
                                                                    {user.selfie && (
                                                                        <div className="absolute -bottom-2 -right-2 bg-pesse-lime text-black p-1.5 rounded-lg shadow-md scale-75 border-2 border-white">
                                                                            <Camera size={12} strokeWidth={3} />
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div>
                                                                    <p className="text-xl font-black text-black leading-tight italic uppercase tracking-tighter">{user.firstName} {user.lastName}</p>
                                                                    <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mt-1 opacity-50">{user.email || user.phone}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-12 py-8">
                                                            <div className="flex flex-col">
                                                                <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest italic leading-none mb-1">Authorization</span>
                                                                <span className="text-sm font-black text-black uppercase italic tracking-tighter">Level: {user.tier || 'Standard'}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-12 py-8">
                                                            <span className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] italic ${user.status === 'approved' ? 'bg-pesse-lime text-black' :
                                                                user.status === 'pending' ? 'bg-amber-100 text-amber-600' :
                                                                    'bg-red-500 text-white shadow-lg shadow-red-500/20'
                                                                }`}>
                                                                {user.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-12 py-8 text-right">
                                                            <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <ActionButton
                                                                    icon={<Edit3 size={18} />}
                                                                    onClick={() => { setSelectedUser(user); setIsEditModalOpen(true); }}
                                                                    className="bg-gray-50 text-black hover:bg-black hover:text-white"
                                                                    title="Edit Node"
                                                                />
                                                                {user.status !== 'approved' && (
                                                                    <ActionButton
                                                                        icon={<UserCheck size={18} />}
                                                                        onClick={() => handleAction(user.id, 'approved')}
                                                                        className="bg-pesse-lime text-black hover:scale-110"
                                                                        title="Verify Node"
                                                                    />
                                                                )}
                                                                {user.status !== 'blocked' && (
                                                                    <ActionButton
                                                                        icon={<UserX size={18} />}
                                                                        onClick={() => handleAction(user.id, 'blocked')}
                                                                        className="bg-black text-white hover:scale-110"
                                                                        title="Restrict Node"
                                                                    />
                                                                )}
                                                                <ActionButton
                                                                    icon={<Trash2 size={18} />}
                                                                    onClick={() => handleDelete(user.id)}
                                                                    className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white"
                                                                    title="Terminate Node"
                                                                />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="payroll"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-12"
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    {/* Upload Section */}
                                    <div className="lg:col-span-2 bg-white border border-gray-100 rounded-[48px] p-12 lg:p-16 shadow-sm relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-pesse-lime/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-pesse-lime/10 transition-colors duration-700"></div>

                                        <div className="mb-12">
                                            <h2 className="text-4xl font-black text-black tracking-tighter uppercase italic leading-none">Automated Payroll.</h2>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-4 max-w-md italic">Upload employee node data (Excel/CSV) to initialize global salary distribution stream.</p>
                                        </div>

                                        <div
                                            onClick={() => fileInputRef.current?.click()}
                                            className={`relative border-4 border-dashed rounded-[40px] p-16 flex flex-col items-center justify-center transition-all cursor-pointer group/upload ${selectedFile ? 'border-pesse-lime bg-pesse-lime/5' : 'border-gray-50 hover:border-pesse-lime/30 hover:bg-gray-50/50'}`}
                                        >
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                className="hidden"
                                                accept=".xlsx,.xls,.csv"
                                                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                                            />

                                            {selectedFile ? (
                                                <>
                                                    <div className="p-6 bg-pesse-lime text-black rounded-3xl mb-6 shadow-xl shadow-pesse-lime/20">
                                                        <FileText size={48} />
                                                    </div>
                                                    <h4 className="text-2xl font-black text-black uppercase italic tracking-tighter">{selectedFile.name}</h4>
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2 italic">{(selectedFile.size / 1024).toFixed(2)} KB - READY FOR PROCESSING</p>
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); setSelectedFile(null); }}
                                                        className="mt-6 text-[10px] font-black text-red-500 uppercase tracking-widest border-b-2 border-red-500/20 hover:border-red-500 transition-all"
                                                    >
                                                        REPLACE PROTOCOL
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="p-6 bg-gray-50 text-gray-300 rounded-3xl mb-6 group-hover/upload:bg-pesse-lime group-hover/upload:text-black transition-all">
                                                        <UploadCloud size={48} />
                                                    </div>
                                                    <h4 className="text-2xl font-black text-gray-300 uppercase italic tracking-tighter group-hover/upload:text-black transition-colors">Select Data Stream</h4>
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2 italic text-center">DRAG AND DROP OR CLICK TO SELECT FILE</p>
                                                </>
                                            )}
                                        </div>

                                        <div className="mt-12 flex justify-end">
                                            <Button
                                                variant="primary"
                                                disabled={!selectedFile || isProcessing}
                                                onClick={handleProcessSalaries}
                                                className={`px-16 h-20 rounded-3xl font-black uppercase italic tracking-tighter shadow-2xl transition-all ${isProcessing ? 'bg-gray-100 text-gray-400' : 'bg-black text-white hover:bg-pesse-lime hover:text-black active:scale-95'}`}
                                            >
                                                {isProcessing ? (
                                                    <span className="flex items-center gap-3"><Loader2 className="animate-spin" /> EXECUTING PAYROLL...</span>
                                                ) : (
                                                    <span className="flex items-center gap-3"><Shield size={20} /> AUTHORIZE PAYROLL</span>
                                                )}
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Status Section */}
                                    <div className="space-y-8">
                                        <div className="bg-black text-white rounded-[48px] p-10 shadow-xl shadow-black/20">
                                            <h3 className="text-xl font-black uppercase italic tracking-tighter mb-8 border-b border-white/10 pb-4">Audit Trail.</h3>
                                            <div className="space-y-6">
                                                {processComplete ? (
                                                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                                                        <div className="flex items-center gap-4 text-pesse-lime mb-2">
                                                            <CheckCircle2 size={16} />
                                                            <span className="text-[10px] font-black uppercase tracking-widest">Protocol Success</span>
                                                        </div>
                                                        <p className="text-sm font-bold opacity-60 uppercase tracking-tighter">Distributed salaries to 5 authorized nodes.</p>
                                                        <p className="text-[9px] opacity-30 uppercase tracking-[0.2em] mt-2">SYS_LOG_ID: {Math.random().toString(36).substring(7).toUpperCase()}</p>
                                                    </motion.div>
                                                ) : isProcessing ? (
                                                    <div className="flex flex-col items-center py-12 text-center">
                                                        <Loader2 className="animate-spin text-pesse-lime mb-4" size={32} />
                                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Encrypting & Transmitting...</p>
                                                    </div>
                                                ) : (
                                                    <div className="py-8 text-center border-2 border-dashed border-white/5 rounded-3xl">
                                                        <AlertCircle className="mx-auto text-white/20 mb-3" size={32} />
                                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Waiting for authorization</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="bg-pesse-lime rounded-[48px] p-10">
                                            <h3 className="text-xl font-black text-black uppercase italic tracking-tighter mb-4">Network Info.</h3>
                                            <p className="text-xs font-bold text-black/60 uppercase leading-relaxed italic">All payroll transactions are end-to-end encrypted and verified via the Pesse Node Ledger. Ensure file integrity before authorization.</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {isEditModalOpen && selectedUser && (
                    <AdminEditModal
                        isOpen={isEditModalOpen}
                        onClose={() => { setIsEditModalOpen(false); setSelectedUser(null); }}
                        user={selectedUser}
                        onSave={handleEditSave}
                    />
                )}
            </div>
        </Layout>
    );
};

const TabButton: React.FC<{ active: boolean, onClick: () => void, icon: React.ReactNode, label: string }> = ({ active, onClick, icon, label }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-3 px-8 py-5 rounded-[24px] font-black uppercase italic tracking-tighter transition-all ${active ? 'bg-black text-white shadow-xl shadow-black/10 scale-105' : 'bg-white text-gray-400 border border-gray-100 hover:bg-gray-50'}`}
    >
        {icon}
        <span className="text-sm">{label}</span>
    </button>
);

const StatCard: React.FC<{ label: string, value: number, icon: any, color: string, bg: string }> = ({ label, value, icon: Icon, color, bg }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className={`${bg} border border-gray-100 p-8 rounded-[40px] shadow-sm relative overflow-hidden group`}
    >
        <Icon className={`absolute -right-4 -bottom-4 w-28 h-28 opacity-5 ${color} group-hover:scale-110 transition-transform`} />
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 italic">{label}</p>
        <h3 className={`text-5xl font-black ${color} tracking-tighter italic leading-none`}>{value}</h3>
    </motion.div>
);

const ActionButton: React.FC<{ icon: React.ReactNode, onClick: () => void, className: string, title: string }> = ({ icon, onClick, className, title }) => (
    <button
        onClick={onClick}
        className={`p-3 rounded-xl transition-all shadow-lg ${className}`}
        title={title}
    >
        {icon}
    </button>
);
