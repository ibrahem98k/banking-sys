import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/UI/Button';
import { LandingLayout } from '../components/Layout/LandingLayout';

export const Landing: React.FC = () => {
    const navigate = useNavigate();

    return (
        <LandingLayout>
            <main className="flex flex-col items-center justify-start pt-12 lg:pt-20 text-center px-4 overflow-hidden min-h-[90vh]">

                {/* Hero Text */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-6xl lg:text-8xl font-black tracking-tight leading-[0.9] text-black mb-8 z-20 relative"
                >
                    Manage Your <br />
                    Money Smarter.
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="z-30 relative mb-8"
                >
                    <Button
                        onClick={() => navigate('/signup')}
                        className="rounded-full h-14 px-10 bg-black text-white hover:bg-gray-900 shadow-2xl shadow-black/30 text-lg font-bold hover:scale-105 transition-transform"
                    >
                        Get Started Now
                    </Button>
                </motion.div>

                {/* Massive Watermark Text */}
                <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-black text-white pointer-events-none select-none drop-shadow-xl z-0 tracking-tighter opacity-50">
                    Pesse
                </div>

                {/* Main Visual Composition */}
                <div className="relative w-full max-w-6xl mx-auto mt-12 h-[600px] flex justify-center items-end">

                    {/* Person Image (Centered) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 100 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="relative z-10 w-[300px] md:w-[400px] lg:w-[500px] aspect-[3/4] rounded-t-full overflow-hidden grayscale contrast-125 brightness-110 shadow-2xl"
                        style={{ borderTopLeftRadius: '200px', borderTopRightRadius: '200px' }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop"
                            alt="User"
                            className="w-full h-full object-cover mix-blend-multiply opacity-90"
                        />
                    </motion.div>

                    {/* Cards Fan - Absolute Positioning around bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-full w-full pointer-events-none z-20 flex justify-center items-end pb-10 perspective-[1000px]">

                        {/* Chip Visual Component (repeated inside cards) */}
                        {/* Card 1: Black Left - Glassy Black */}
                        <motion.div
                            initial={{ x: -100, y: 100, rotate: -30, opacity: 0 }}
                            animate={{ x: -350, y: 50, rotate: -15, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            whileHover={{
                                scale: 1.05,
                                rotateY: -10,
                                rotateX: 5,
                                zIndex: 50,
                                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)"
                            }}
                            drag
                            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                            className="absolute bottom-0 w-[340px] h-[210px] bg-gradient-to-br from-[#1a1a1a] to-black border border-white/10 rounded-[2rem] p-8 shadow-2xl shadow-black/60 transform origin-bottom-right hidden lg:block hover:cursor-grab active:cursor-grabbing pointer-events-auto backdrop-blur-xl group overflow-hidden"
                        >
                            {/* Reflection Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                            <div className="flex justify-between items-start relative z-10">
                                <div className="w-12 h-9 bg-gradient-to-br from-yellow-400/80 to-yellow-600/80 rounded-md border border-white/20 shadow-inner flex items-center justify-center">
                                    <div className="w-8 h-6 border border-black/20 rounded-sm grid grid-cols-2 gap-px p-1">
                                        <div className="bg-black/10 rounded"></div>
                                        <div className="bg-black/10 rounded"></div>
                                        <div className="bg-black/10 rounded"></div>
                                        <div className="bg-black/10 rounded"></div>
                                    </div>
                                </div>
                                <span className="text-white font-black italic text-2xl tracking-tighter opacity-80 uppercase">Pesse</span>
                            </div>

                            <div className="mt-10 text-white/90 text-xl tracking-[0.2em] font-mono relative z-10">
                                •••• •••• •••• 4582
                            </div>

                            <div className="mt-6 flex justify-between items-end relative z-10">
                                <div>
                                    <div className="text-white/40 text-[10px] uppercase font-bold tracking-widest mb-1">Card Holder</div>
                                    <div className="text-white text-sm font-semibold tracking-wide uppercase">Linda Srikandi</div>
                                </div>
                                <div className="text-white/60 text-xs font-bold font-mono">12/28</div>
                            </div>
                        </motion.div>

                        {/* Card 2: Lime Center-Left - The Star Card */}
                        <motion.div
                            initial={{ x: -50, y: 100, rotate: -15, opacity: 0 }}
                            animate={{
                                x: -120,
                                y: 20,
                                rotate: -5,
                                opacity: 1,
                                transition: { delay: 0.6, duration: 1 }
                            }}
                            whileHover={{
                                scale: 1.1,
                                rotateY: -5,
                                rotateX: 5,
                                y: 0,
                                zIndex: 60
                            }}
                            drag
                            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                            className="absolute bottom-10 w-[340px] h-[210px] bg-gradient-to-br from-[#bef600] to-[#a1cf00] rounded-[2rem] p-8 shadow-[0_30px_60px_-15px_rgba(190,246,0,0.4)] transform origin-bottom-center hidden md:block hover:cursor-grab active:cursor-grabbing pointer-events-auto group overflow-hidden border border-white/20"
                        >
                            {/* Animated Pattern Overlay */}
                            <div className="absolute inset-0 opacity-10 mix-blend-overlay">
                                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="black" strokeWidth="0.5" />
                                    </pattern>
                                    <rect width="100%" height="100%" fill="url(#grid)" />
                                </svg>
                            </div>
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                            <div className="flex justify-between items-start relative z-10">
                                <div className="flex flex-col gap-4">
                                    <div className="w-12 h-9 bg-black/10 rounded-md border border-black/10 flex items-center justify-center">
                                        <div className="w-8 h-6 border border-black/20 rounded-sm grid grid-cols-2 gap-px p-1">
                                            <div className="bg-black/10 rounded"></div>
                                            <div className="bg-black/10 rounded"></div>
                                            <div className="bg-black/10 rounded"></div>
                                            <div className="bg-black/10 rounded"></div>
                                        </div>
                                    </div>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-black/40 rotate-90">
                                        <path d="M2 8.5c1.5-1.5 3-2.5 5-2.5s3.5 1 5 2.5m-10 5c2.5-2.5 5-4 8-4s5.5 1.5 8 4M12 16c4 0 7-3 7-7" strokeLinecap="round" />
                                    </svg>
                                </div>
                                <span className="text-5xl font-black italic opacity-10 text-black tracking-tighter -mt-2 -mr-4 select-none">Pesse</span>
                            </div>

                            <div className="mt-6">
                                <div className="text-black/80 text-2xl tracking-[0.25em] font-mono font-bold">
                                    •••• •••• •••• 8910
                                </div>
                                <div className="mt-4 flex justify-between items-end relative z-10">
                                    <div>
                                        <div className="text-black/40 text-[10px] uppercase font-extrabold tracking-widest mb-0.5">Current Balance</div>
                                        <div className="text-black text-2xl font-black tabular-nums tracking-tight">$82,401.00</div>
                                    </div>
                                    <div className="font-black italic text-xl tracking-tighter opacity-80 text-black">Pesse</div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Card 3: White Ceramic Right */}
                        <motion.div
                            initial={{ x: 50, y: 100, rotate: 15, opacity: 0 }}
                            animate={{ x: 150, y: 40, rotate: 10, opacity: 1 }}
                            transition={{ delay: 0.7, duration: 1 }}
                            whileHover={{
                                scale: 1.05,
                                rotateY: 10,
                                rotateX: 5,
                                zIndex: 50
                            }}
                            drag
                            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                            className="absolute bottom-0 w-[340px] h-[210px] bg-white border border-gray-100 rounded-[2rem] p-8 shadow-2xl transform origin-bottom-left hover:cursor-grab active:cursor-grabbing pointer-events-auto overflow-hidden group"
                        >
                            <div className="absolute -bottom-8 -right-8 text-9xl font-black text-gray-50/80 italic select-none pointer-events-none group-hover:text-gray-100/80 transition-colors">Pesse</div>

                            <div className="flex justify-between items-start relative z-10">
                                <div className="w-12 h-9 bg-gray-50 rounded-md border border-gray-200 flex items-center justify-center">
                                    <div className="w-8 h-6 border border-black/10 rounded-sm grid grid-cols-2 gap-px p-1">
                                        <div className="bg-black/5 rounded"></div>
                                        <div className="bg-black/5 rounded"></div>
                                        <div className="bg-black/5 rounded"></div>
                                        <div className="bg-black/5 rounded"></div>
                                    </div>
                                </div>
                                <span className="text-black/20 font-black italic text-xl tracking-tighter uppercase">VISA</span>
                            </div>

                            <div className="mt-10 text-black/60 text-xl tracking-[0.2em] font-mono relative z-10">
                                •••• •••• •••• 1234
                            </div>

                            <div className="mt-8 flex justify-between items-end relative z-10">
                                <div>
                                    <div className="text-black/30 text-[10px] uppercase font-bold tracking-widest mb-1">Account Executive</div>
                                    <div className="text-black/80 text-sm font-bold tracking-wide uppercase">Thomas Anderson</div>
                                </div>
                                <div className="font-black italic text-lg tracking-tighter text-black opacity-10">Pesse</div>
                            </div>
                        </motion.div>

                        {/* Card 4: Black Right Extreme - Gold/Metal Textures */}
                        <motion.div
                            initial={{ x: 100, y: 100, rotate: 30, opacity: 0 }}
                            animate={{ x: 380, y: 80, rotate: 20, opacity: 1 }}
                            transition={{ delay: 0.8, duration: 1 }}
                            whileHover={{
                                scale: 1.05,
                                rotateY: 15,
                                rotateX: 5,
                                zIndex: 50,
                                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)"
                            }}
                            drag
                            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                            className="absolute bottom-[-20px] w-[340px] h-[210px] bg-[#050505] rounded-[2rem] p-8 shadow-2xl shadow-black/80 transform origin-bottom-left hidden lg:block hover:cursor-grab active:cursor-grabbing pointer-events-auto border border-white/5 overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.05),transparent)] pointer-events-none"></div>

                            <div className="flex justify-between items-start relative z-10">
                                <div className="w-12 h-9 bg-gradient-to-br from-gray-400 to-gray-600 rounded-md border border-white/10 flex items-center justify-center">
                                    <div className="w-8 h-6 border border-black/20 rounded-sm grid grid-cols-2 gap-px p-1">
                                        <div className="bg-black/10 rounded"></div>
                                        <div className="bg-black/10 rounded"></div>
                                        <div className="bg-black/10 rounded"></div>
                                        <div className="bg-black/10 rounded"></div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-white font-black italic text-xl tracking-tighter opacity-90">Pesse</span>
                                    <span className="text-[8px] text-white/40 font-bold tracking-widest uppercase">Platinum</span>
                                </div>
                            </div>

                            <div className="mt-10 text-white/80 text-xl tracking-[0.2em] font-mono opacity-80">
                                •••• •••• •••• 9921
                            </div>

                            <div className="mt-8 flex justify-between items-end relative z-10">
                                <div>
                                    <div className="text-white/20 text-[10px] uppercase font-bold tracking-widest mb-1">Member Since</div>
                                    <div className="text-white/70 text-sm font-bold tracking-wide">2026</div>
                                </div>
                                <div className="flex gap-1">
                                    <div className="w-8 h-8 rounded-full bg-red-600/20 backdrop-blur-md"></div>
                                    <div className="w-8 h-8 rounded-full bg-yellow-600/20 backdrop-blur-md -ml-4"></div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>

            </main>
        </LandingLayout>
    );
};
