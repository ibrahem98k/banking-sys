import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Menu } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-pesse-light text-pesse-black font-sans selection:bg-pesse-lime selection:text-black">
            {/* Mobile Header */}
            <header className="lg:hidden flex items-center justify-between p-4 border-b border-pesse-gray bg-white/80 backdrop-blur-md sticky top-0 z-30">
                <h1 className="text-xl font-bold">Pesse</h1>
                <button onClick={() => setIsSidebarOpen(true)} className="text-black">
                    <Menu size={24} />
                </button>
            </header>

            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            {/* Main Content Area */}
            <main className="lg:pl-64 min-h-screen transition-all duration-300">
                <div className="container mx-auto p-4 lg:p-8 max-w-7xl">
                    {children}
                </div>
            </main>
        </div>
    );
};
