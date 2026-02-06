import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, CreditCard, PieChart, Settings, LogOut, ShieldCheck } from 'lucide-react';
import { useBankStore } from '../../store/useBankStore';

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

const NavIcon = ({ icon: Icon, active = false, to }: { icon: any, active?: boolean, to: string }) => (
    <Link to={to}>
        <div className={`
        p-3 rounded-full cursor-pointer transition-all duration-300
        ${active
                ? 'bg-pesse-lime text-black shadow-lg shadow-pesse-lime/40 scale-110'
                : 'text-gray-400 hover:bg-pesse-light hover:text-black'}
      `}>
            <Icon size={24} strokeWidth={2} />
        </div>
    </Link>
);

export const Sidebar: React.FC<SidebarProps> = () => {
    const location = useLocation();
    const { user } = useBankStore();
    const isActive = (path: string) => location.pathname === path;

    return (
        <>
            {/* Desktop Sidebar (Left Pill) */}
            <aside className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-8 py-8 px-3 bg-white border border-pesse-gray rounded-full shadow-xl shadow-black/5">
                <div className="mb-2">
                    {/* Admin Logo Link */}
                    {user?.role === 'admin' && (
                        <Link to="/admin">
                            <div className="w-12 h-12 rounded-full bg-black text-pesse-lime border-2 border-pesse-lime flex items-center justify-center shadow-[0_0_15px_rgba(190,246,0,0.4)] hover:scale-110 hover:shadow-[0_0_25px_rgba(190,246,0,0.6)] transition-all cursor-pointer">
                                <ShieldCheck size={24} strokeWidth={3} />
                            </div>
                        </Link>
                    )}
                </div>

                <nav className="flex flex-col gap-6">
                    <NavIcon icon={Home} to="/dashboard" active={isActive('/dashboard')} />
                    <NavIcon icon={CreditCard} to="/cards" active={isActive('/cards')} />
                    <NavIcon icon={PieChart} to="/analytics" active={isActive('/analytics')} />
                    <NavIcon icon={Settings} to="/settings" active={isActive('/settings')} />
                </nav>

                <div className="mt-auto">
                    <NavIcon icon={LogOut} to="/" />
                </div>
            </aside>

            {/* Mobile Bottom Bar */}
            <nav className="fixed bottom-6 left-6 right-6 lg:hidden z-50 bg-white/90 backdrop-blur-xl border border-pesse-gray rounded-full flex justify-around items-center p-4 shadow-2xl shadow-black/10 safe-area-pb">
                <NavIcon icon={Home} to="/dashboard" active={isActive('/dashboard')} />
                <NavIcon icon={CreditCard} to="/cards" active={isActive('/cards')} />
                <NavIcon icon={PieChart} to="/analytics" active={isActive('/analytics')} />
                <NavIcon icon={Settings} to="/settings" active={isActive('/settings')} />
            </nav>
        </>
    );
};
