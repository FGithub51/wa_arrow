'use client';

import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { InboxItem } from '@/lib/whatsapp-service';
import { MessageCircle, User, Clock } from 'lucide-react';

export default function InboxPage() {
    const [inbox, setInbox] = useState<InboxItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInbox = async () => {
            try {
                const res = await fetch('/api/whatsapp?type=inbox');
                const data = await res.json();
                if (data.inbox) {
                    setInbox(data.inbox);
                }
            } catch (error) {
                console.error('Failed to fetch inbox', error);
            } finally {
                setLoading(false);
            }
        };

        fetchInbox();
        const interval = setInterval(fetchInbox, 5000); // Poll every 5s
        return () => clearInterval(interval);
    }, []);

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                        <MessageCircle size={24} />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Inbox</h1>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    {loading && inbox.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">Loading messages...</div>
                    ) : inbox.length === 0 ? (
                        <div className="p-12 text-center flex flex-col items-center gap-4">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                                <MessageCircle size={32} />
                            </div>
                            <p className="text-gray-500 font-medium">No messages yet</p>
                            <p className="text-sm text-gray-400">Replies to your messages will appear here.</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {inbox.map((item) => (
                                <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors flex items-start gap-4 cursor-pointer">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg shrink-0">
                                        <User size={20} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <h3 className="font-bold text-gray-900 truncate">{item.pushname}</h3>
                                            <span className="text-xs text-gray-500 flex items-center gap-1">
                                                <Clock size={12} />
                                                {new Date(item.timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 text-sm truncate">{item.body}</p>
                                        <p className="text-xs text-gray-400 mt-1 font-mono">{item.from}</p>
                                    </div>
                                    {item.unreadCount > 0 && (
                                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                            {item.unreadCount}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
