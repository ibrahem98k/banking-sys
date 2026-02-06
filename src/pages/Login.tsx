import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/UI/Button';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useBankStore } from '../store/useBankStore';

export const Login: React.FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const login = useBankStore((state) => state.login);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Mock login delay
        setTimeout(() => {
            setIsLoading(false);
            const isAdmin = email.toLowerCase() === 'admin@pesse.com';
            login({
                id: isAdmin ? '4' : '1',
                firstName: isAdmin ? 'Admin' : 'John',
                lastName: isAdmin ? 'Pesse' : 'Doe',
                email: email,
                role: isAdmin ? 'admin' : 'user',
                status: 'approved'
            });
            navigate(isAdmin ? '/admin' : '/dashboard');
        }, 1500);
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white font-sans">
            {/* Left: Visual Side */}
            <div className="hidden lg:flex flex-col justify-between p-12 bg-black text-white relative overflow-hidden">
                {/* Floating animated background elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.1, 0.2, 0.1],
                            x: [0, 50, 0],
                            y: [0, -30, 0],
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-pesse-lime/30 rounded-full blur-[120px]"
                    />
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.1, 0.15, 0.1],
                            x: [0, -40, 0],
                            y: [0, 40, 0],
                        }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[100px]"
                    />

                    {/* Animated grid lines or particles could go here, but let's stick to sleek orbs for now */}
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: [0.3, 0.6, 0.3],
                                y: [0, -100, 0],
                                x: [0, Math.random() * 50 - 25, 0],
                            }}
                            transition={{
                                duration: 5 + Math.random() * 5,
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
            <div className="flex flex-col justify-center items-center p-8 lg:p-24 relative">
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
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all bg-gray-50"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-semibold text-gray-700">Password</label>
                                    <a href="#" className="text-sm font-medium text-pesse-lime hover:opacity-80 transition-opacity">Forgot?</a>
                                </div>
                                <input
                                    type="password"
                                    className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all bg-gray-50"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
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
