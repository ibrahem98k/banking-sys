import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/UI/Button';
import { ArrowLeft, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export const Signup: React.FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Mock signup delay
        setTimeout(() => {
            setIsLoading(false);
            navigate('/dashboard');
        }, 1500);
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white font-sans">
            {/* Left: Visual Side */}
            <div className="hidden lg:flex flex-col justify-between p-12 bg-[#bef600] text-black relative overflow-hidden">
                <div className="z-10">
                    <Link to="/" className="text-2xl font-bold tracking-tight flex items-center gap-2 mb-8 text-black opacity-80 hover:opacity-100 transition-opacity">
                        <ArrowLeft className="w-5 h-5" /> Back to Home
                    </Link>
                    <h1 className="text-6xl font-black leading-tight mt-10 tracking-tighter">
                        Join the <br /> Future.
                    </h1>
                    <ul className="mt-10 space-y-4 text-xl font-medium">
                        <li className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center"><Check className="w-4 h-4" /></div> Instant Setup</li>
                        <li className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center"><Check className="w-4 h-4" /></div> No Hidden Fees</li>
                        <li className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center"><Check className="w-4 h-4" /></div> Global Payments</li>
                    </ul>
                </div>

                <div className="z-10 text-sm font-semibold opacity-60">
                    © 2026 Pesse Bank.
                </div>

                {/* Abstract Visuals */}
                <div className="absolute top-1/2 right-0 w-[900px] h-[900px] bg-white/30 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none mix-blend-overlay"></div>
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
                        <h2 className="text-3xl font-bold mb-2 text-black">Create Account</h2>
                        <p className="text-gray-500 mb-10">Start your journey with Pesse today.</p>

                        <form onSubmit={handleSignup} className="flex flex-col gap-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-gray-700">First Name</label>
                                    <input
                                        type="text"
                                        className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-pesse-lime focus:ring-1 focus:ring-pesse-lime outline-none transition-all bg-gray-50"
                                        placeholder="John"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-gray-700">Last Name</label>
                                    <input
                                        type="text"
                                        className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-pesse-lime focus:ring-1 focus:ring-pesse-lime outline-none transition-all bg-gray-50"
                                        placeholder="Doe"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-pesse-lime focus:ring-1 focus:ring-pesse-lime outline-none transition-all bg-gray-50"
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-gray-700">Password</label>
                                <input
                                    type="password"
                                    className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-pesse-lime focus:ring-1 focus:ring-pesse-lime outline-none transition-all bg-gray-50"
                                    placeholder="Create a password"
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                isLoading={isLoading}
                                className="w-full h-14 bg-pesse-lime text-black hover:bg-[#c2e600] rounded-xl mt-4 font-bold text-lg shadow-lg shadow-pesse-lime/30"
                            >
                                Get Started
                            </Button>
                        </form>

                        <div className="mt-8 text-center text-sm text-gray-500">
                            Already have an account?
                            <Link to="/login" className="text-black font-bold ml-1 hover:underline">Log in</Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
