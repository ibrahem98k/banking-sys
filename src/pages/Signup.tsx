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
            <div className="hidden lg:flex flex-col justify-between p-12 bg-pesse-lime text-black relative overflow-hidden">
                {/* Floating animated background elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.2, 0.4, 0.2],
                            rotate: [0, 90, 0],
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] border-[40px] border-black/5 rounded-[100px]"
                    />
                    <motion.div
                        animate={{
                            y: [0, -40, 0],
                            x: [0, 30, 0],
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-[10%] right-[-10%] w-64 h-64 bg-black/10 rounded-full blur-3xl"
                    />

                    {/* Floating icons */}
                    <motion.div
                        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[20%] right-[15%] text-black/20"
                    >
                        <Check className="w-16 h-16" />
                    </motion.div>
                </div>

                <div className="z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Link to="/" className="group text-lg font-medium text-black/70 hover:text-black flex items-center gap-2 mb-12 transition-all">
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back to Home
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h1 className="text-7xl font-black leading-none mt-10 tracking-tighter">
                            Join the <br />
                            <span className="text-black/80">Future.</span>
                        </h1>
                        <ul className="mt-12 space-y-6">
                            {[
                                "Instant Account Setup",
                                "Zero Hidden Fees",
                                "Global Digital Assets"
                            ].map((text, idx) => (
                                <motion.li
                                    key={idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 + (idx * 0.1) }}
                                    className="flex items-center gap-4 text-xl font-bold italic uppercase"
                                >
                                    <div className="w-10 h-10 rounded-full bg-black text-pesse-lime flex items-center justify-center shadow-lg">
                                        <Check className="w-6 h-6 stroke-[3]" />
                                    </div>
                                    {text}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                <div className="z-10 text-sm font-black tracking-[0.2em] uppercase opacity-40">
                    Secure Banking Node — 0x4F2A
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
