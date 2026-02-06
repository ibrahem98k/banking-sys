import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/UI/Button';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export const Login: React.FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Mock login delay
        setTimeout(() => {
            setIsLoading(false);
            navigate('/dashboard');
        }, 1500);
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white font-sans">
            {/* Left: Visual Side */}
            <div className="hidden lg:flex flex-col justify-between p-12 bg-black text-white relative overflow-hidden">
                <div className="z-10">
                    <Link to="/" className="text-2xl font-bold tracking-tight text-white flex items-center gap-2 mb-8">
                        <ArrowLeft className="w-5 h-5" /> Back to Home
                    </Link>
                    <h1 className="text-6xl font-black leading-tight mt-10">
                        Welcome <br /> Back.
                    </h1>
                    <p className="text-gray-400 mt-6 text-lg max-w-md">
                        Access your secure dashboard and manage your finances with Pesse's advanced tools.
                    </p>
                </div>

                <div className="z-10 text-sm opacity-50">
                    © 2026 Pesse Bank. Secure & Encrypted.
                </div>

                {/* Abstract Visuals */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-pesse-lime/20 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-900/20 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>
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
