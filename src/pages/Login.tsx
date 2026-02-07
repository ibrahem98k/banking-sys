import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/UI/Button';
import { ArrowLeft, ShieldCheck, Cpu, Zap, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { useBankStore } from '../store/useBankStore';
import { authService } from '../api/auth.service';

export const Login: React.FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const login = useBankStore((state) => state.login);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await authService.login({ phone, password });
            
            if (response.success && response.data) {
                // Get user info
                const userResponse = await authService.me();
                if (userResponse.success && userResponse.data) {
                    const user = userResponse.data;
                    // Store user role for route protection
                    localStorage.setItem('userRole', user.role);
                    
                    login({
                        id: user.id.toString(),
                        firstName: user.fullName.split(' ')[0] || user.fullName,
                        lastName: user.fullName.split(' ').slice(1).join(' ') || '',
                        phone: user.phone,
                        role: user.role.toLowerCase() as 'admin' | 'user',
                        status: user.approvalStatus.toLowerCase() as 'approved' | 'pending' | 'blocked',
                        tier: 'basic'
                    });
                    
                    if (user.role === 'Admin') {
                        navigate('/admin');
                    } else {
                        navigate('/dashboard');
                    }
                } else {
                    setError(userResponse.message || 'Failed to get user information');
                }
            } else {
                setError(response.message || 'Login failed');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'An error occurred during login');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white font-sans">
            {/* Left: Visual Side */}
            <div className="hidden lg:flex flex-col justify-between p-12 bg-black text-white relative overflow-hidden order-1">
                {/* Floating animated background elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Primary Rotating Square */}
                    <motion.div
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.1, 0.2, 0.1],
                            rotate: [0, -90, 0],
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] border-[40px] border-white/5 rounded-[120px]"
                    />

                    {/* Secondary Reverse Rotating Square */}
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.05, 0.1, 0.05],
                            rotate: [0, 180, 0],
                        }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] border-[30px] border-pesse-lime/10 rounded-[80px]"
                    />

                    {/* Moving Scanning Line */}
                    <motion.div
                        animate={{
                            y: ['-100%', '200%'],
                            opacity: [0, 0.3, 0],
                        }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-pesse-lime/50 to-transparent blur-sm"
                    />

                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.1, 0.2, 0.1],
                            x: [0, 50, 0],
                            y: [0, -30, 0],
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-pesse-lime/20 rounded-full blur-[120px]"
                    />

                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.05, 0.1, 0.05],
                            x: [0, -40, 0],
                            y: [0, 40, 0],
                        }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px]"
                    />

                    {/* Floating icons */}
                    <motion.div
                        animate={{ y: [0, -30, 0], rotate: [0, -10, 0], opacity: [0.1, 0.2, 0.1] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[25%] left-[10%] text-white"
                    >
                        <ShieldCheck className="w-20 h-20" />
                    </motion.div>

                    <motion.div
                        animate={{ y: [0, 40, 0], rotate: [0, 20, 0], opacity: [0.05, 0.15, 0.05] }}
                        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute top-[20%] right-[15%] text-pesse-lime"
                    >
                        <Cpu className="w-24 h-24" />
                    </motion.div>

                    <motion.div
                        animate={{ x: [0, 20, 0], scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                        className="absolute top-[50%] right-[30%] text-white"
                    >
                        <Zap className="w-12 h-12" />
                    </motion.div>

                    {[...Array(15)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: [0.1, 0.4, 0.1],
                                y: [0, -200, 0],
                                x: [0, Math.random() * 60 - 30, 0],
                            }}
                            transition={{
                                duration: 10 + Math.random() * 10,
                                repeat: Infinity,
                                ease: "linear",
                                delay: Math.random() * 5,
                            }}
                            className="absolute bg-white/10 w-1 h-1 rounded-full"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                            }}
                        />
                    ))}
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                </div>

                <div className="z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <Link to="/" className="group text-lg font-medium text-white/70 hover:text-white flex items-center gap-2 mb-12 transition-all">
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back to Home
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <h1 className="text-7xl font-black leading-none mt-10 tracking-tighter">
                            Welcome <br />
                            <span className="text-pesse-lime">Back.</span>
                        </h1>
                        <p className="text-gray-400 mt-8 text-xl max-w-sm leading-relaxed font-light">
                            Your gateway to intelligent banking. Secure, fast, and built for the future of finance.
                        </p>
                    </motion.div>
                </div>

                <div className="z-10 text-sm font-medium tracking-widest uppercase opacity-30">
                    Pesse Digital Assets — Est. 2026
                </div>
            </div>

            {/* Right: Form Side */}
            <div className="flex flex-col justify-center items-center p-8 lg:p-24 relative order-2">
                {/* Mobile Back Button */}
                <Link to="/" className="absolute top-8 left-8 lg:hidden text-black flex items-center gap-2 font-medium">
                    <ArrowLeft className="w-5 h-5" /> Home
                </Link>

                <div className="w-full max-w-md">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl font-bold mb-2 text-black">Sign In</h2>
                        <p className="text-gray-500 mb-10">Enter your credentials to access your account.</p>

                        <form onSubmit={handleLogin} className="flex flex-col gap-6">
                            {error && (
                                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                                    {error}
                                </div>
                            )}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-gray-700">Phone Number</label>
                                <input
                                    type="tel"
                                    className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all bg-gray-50"
                                    placeholder="+964 750 000 0000"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-semibold text-gray-700">Password</label>
                                    <a href="#" className="text-sm font-medium text-pesse-lime hover:opacity-80 transition-opacity">Forgot?</a>
                                </div>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="w-full h-12 pl-4 pr-12 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all bg-gray-50"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                isLoading={isLoading}
                                className="w-full h-14 bg-black text-white hover:bg-gray-900 rounded-xl mt-4 font-bold text-lg shadow-lg shadow-black/20"
                            >
                                Sign In
                            </Button>
                        </form>

                        <div className="mt-8 text-center text-sm text-gray-500">
                            Don't have an account?
                            <Link to="/signup" className="text-black font-bold ml-1 hover:underline">Sign up for free</Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
