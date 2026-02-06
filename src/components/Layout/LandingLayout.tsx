import React, { useState } from 'react';
import { Button } from '../UI/Button';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const LandingLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const isActive = (path: string) => location.pathname === path;

    // Animation Variants
    const navContainer = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const navItem = {
        hidden: { opacity: 0, y: -20 },
        show: { opacity: 1, y: 0 }
    };

    // Mobile Link Click Handler
    const onMobileNavigate = (path: string) => {
        setMobileMenuOpen(false);
        navigate(path);
    };

    return (
        <div className="min-h-screen bg-[#F8F9FA] text-pesse-black font-sans overflow-x-hidden relative selection:bg-pesse-lime selection:text-black">

            {/* Navbar - Floating Pill */}
            <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
                <nav className="flex items-center justify-between px-6 py-3 bg-white/80 backdrop-blur-xl border border-white/20 shadow-lg shadow-black/5 rounded-full w-full max-w-5xl transition-all hover:shadow-xl hover:shadow-black/10 hover:scale-[1.005] duration-500">
                    <Link to="/" className="text-2xl font-bold tracking-tight px-2">Pesse</Link>

                    <motion.div
                        variants={navContainer}
                        initial="hidden"
                        animate="show"
                        className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-600"
                    >
                        {['/features', '/benefits', '/company', '/personal', '/business'].map((path) => (
                            <motion.div key={path} variants={navItem} whileHover={{ y: -1 }}>
                                <Link to={path} className={`relative group text-sm font-medium transition-colors ${isActive(path) ? 'text-black font-bold' : 'text-gray-600 hover:text-black'}`}>
                                    {path.replace('/', '').charAt(0).toUpperCase() + path.slice(2)}
                                    {isActive(path) && (
                                        <motion.div layoutId="activeNav" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-black rounded-full" />
                                    )}
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>

                    <div className="flex items-center gap-2">
                        <button onClick={() => navigate('/login')} className="text-sm font-medium hover:text-black transition-colors px-4 py-2 rounded-full hover:bg-gray-100">Login</button>
                        <Button
                            className="rounded-full px-6 py-2 bg-pesse-lime text-black hover:bg-pesse-lime/90 shadow-lg shadow-pesse-lime/20 font-bold text-sm"
                            onClick={() => navigate('/signup')}
                        >
                            Sign Up
                        </Button>
                    </div>
                    {/* Mobile Menu Toggle */}
                    <button className="lg:hidden text-black z-50 relative ml-4" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </nav>
            </div>

            {/* Mobile Navigation Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-white pt-32 px-6 lg:hidden"
                    >
                        <div className="flex flex-col gap-6 text-xl font-bold items-center text-center">
                            <button onClick={() => onMobileNavigate('/features')} className=" w-full pb-4 border-b border-gray-100">Features</button>
                            <button onClick={() => onMobileNavigate('/benefits')} className=" w-full pb-4 border-b border-gray-100">Benefits</button>
                            <button onClick={() => onMobileNavigate('/company')} className=" w-full pb-4 border-b border-gray-100">Company</button>
                            <button onClick={() => onMobileNavigate('/personal')} className=" w-full pb-4 border-b border-gray-100">Personal</button>
                            <button onClick={() => onMobileNavigate('/business')} className=" w-full pb-4 border-b border-gray-100">Business</button>
                            <div className="pt-4 flex flex-col gap-4 w-full">
                                <Button onClick={() => onMobileNavigate('/signup')} variant="primary" className="w-full justify-center py-4 bg-pesse-lime text-black hover:bg-pesse-lime/90 border-none rounded-2xl text-lg">
                                    Sign Up Now
                                </Button>
                                <button onClick={() => onMobileNavigate('/login')} className="text-center text-sm font-medium text-gray-500 py-2">
                                    Already have an account? Login
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <main className="relative z-10 pt-32">
                {children}
            </main>

            {/* Simple Footer */}
            <footer className="bg-white border-t border-pesse-gray mt-0 py-12 relative z-10">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center opacity-60">
                    <p className="text-sm">© 2026 Pesse Bank. All rights reserved.</p>
                    <div className="flex gap-6 text-sm mt-4 md:mt-0">
                        <a href="#">Privacy</a>
                        <a href="#">Terms</a>
                        <a href="#">Security</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};
