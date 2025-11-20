'use client';

import React, { useState } from 'react';
import { Contact } from '@/types';
import { generateWhatsAppLink } from '@/lib/whatsapp';
import { Send, SkipForward, CheckCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SenderViewProps {
    contact: Contact;
    message: string;
    onStatusChange: (id: string, status: Contact['status']) => void;
    onNext: () => void;
}

export function SenderView({ contact, message, onStatusChange, onNext }: SenderViewProps) {
    const [isSending, setIsSending] = useState(false);
    const whatsappLink = generateWhatsAppLink(contact.phone, message);

    const handleSend = () => {
        window.open(whatsappLink, '_blank');
        onStatusChange(contact.id, 'sent');
        onNext();
    };

    const handleSkip = () => {
        onNext();
    };

    const handleAutoSend = async () => {
        setIsSending(true);
        try {
            const res = await fetch('/api/whatsapp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'send_message',
                    phone: contact.phone,
                    message: message,
                }),
            });
            const data = await res.json();
            if (data.success) {
                onStatusChange(contact.id, 'sent');
                onNext();
            } else {
                alert('Failed to send message: ' + data.error);
            }
        } catch (err) {
            console.error(err);
            alert('Failed to send message');
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden flex flex-col h-full">
            <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <h2 className="text-xl font-bold">Ready to Send</h2>
                <p className="text-blue-100 opacity-90 mt-1">Review and send to next contact</p>
            </div>

            <div className="p-6 flex-1 flex flex-col gap-6">
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">To</label>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                            {contact.name.charAt(0)}
                        </div>
                        <div>
                            <p className="font-bold text-gray-900 text-lg">{contact.name}</p>
                            <p className="text-gray-500 font-mono">{contact.phone}</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-1 flex-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Message Preview</label>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-gray-800 whitespace-pre-wrap h-full">
                        {message}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-auto">
                    <button
                        onClick={handleSkip}
                        className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                        <SkipForward size={20} />
                        Skip
                    </button>
                    <button
                        onClick={handleAutoSend}
                        disabled={isSending}
                        className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg transform active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSending ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                        Auto Send
                    </button>
                </div>
            </div>
        </div>
    );
}
