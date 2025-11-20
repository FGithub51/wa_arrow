'use client';

import React from 'react';
import { MessageCircle, Users, Settings, LogOut, QrCode } from 'lucide-react';
import { cn } from '@/lib/utils';
import { QRCodeDisplay } from './QRCodeDisplay';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="flex h-screen bg-gray-50 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex">
                <div className="p-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                        <MessageCircle size={20} fill="currentColor" />
                    </div>
                    <span className="font-bold text-xl text-gray-900 tracking-tight">Wa Arrow</span>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-1">
                    <NavItem icon={<Users size={20} />} label="Contacts" href="/waarrow" />
                    <NavItem icon={<MessageCircle size={20} />} label="Inbox" href="/waarrow/inbox" />
                    <NavItem icon={<Settings size={20} />} label="Settings" />

                    <div className="pt-4 mt-4 border-t border-gray-100">
                        <button
                            onClick={() => (document.getElementById('qr-modal') as HTMLDialogElement)?.showModal()}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg w-full bg-green-50 text-green-700 hover:bg-green-100 transition-colors font-semibold"
                        >
                            <QrCode size={20} />
                            <span>Scan QR Code</span>
                        </button>
                    </div>
                </nav>

                <dialog id="qr-modal" className="modal p-0 rounded-xl shadow-2xl backdrop:bg-black/50">
                    <div className="bg-white p-6 w-96 flex flex-col items-center gap-4">
                        <h3 className="font-bold text-lg">Scan WhatsApp QR</h3>
                        <QRCodeDisplay />
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">Close</button>
                        </form>
                    </div>
                </dialog>

                <div className="p-4 border-t border-gray-100">
                    <button className="flex items-center gap-3 px-4 py-2 text-gray-500 hover:text-gray-900 transition-colors w-full">
                        <LogOut size={18} />
                        <span className="font-medium text-sm">Exit</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-hidden flex flex-col">
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 md:hidden">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                            <MessageCircle size={20} fill="currentColor" />
                        </div>
                        <span className="font-bold text-xl text-gray-900 tracking-tight">Wa Arrow</span>
                    </div>
                </header>
                <div className="flex-1 overflow-auto p-6">
                    {children}
                </div>
            </main>
        </div>
    );
}

function NavItem({ icon, label, active = false, href }: { icon: React.ReactNode; label: string; active?: boolean; href?: string }) {
    const Content = (
        <>
            {icon}
            <span>{label}</span>
        </>
    );

    const className = cn(
        'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium w-full text-left',
        active ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
    );

    if (href) {
        return (
            <a href={href} className={className}>
                {Content}
            </a>
        );
    }

    return (
        <button className={className}>
            {Content}
        </button>
    );
}
