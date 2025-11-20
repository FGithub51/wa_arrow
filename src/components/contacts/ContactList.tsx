'use client';

import React from 'react';
import { Contact } from '@/types';
import { Trash2, CheckCircle, XCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContactListProps {
    contacts: Contact[];
    onDelete: (id: string) => void;
    onClearAll?: () => void;
}

export function ContactList({ contacts, onDelete, onClearAll }: ContactListProps) {
    if (contacts.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500">
                No contacts added yet. Import a CSV to get started.
            </div>
        );
    }

    return (
        <div className="space-y-2">
            {onClearAll && contacts.length > 0 && (
                <div className="flex justify-end mb-2">
                    <button
                        onClick={onClearAll}
                        className="text-xs text-red-500 hover:text-red-700 font-medium flex items-center gap-1"
                    >
                        <Trash2 size={12} />
                        Clear All
                    </button>
                </div>
            )}
            {contacts.map((contact) => (
                <div
                    key={contact.id}
                    className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-lg hover:shadow-sm transition-shadow"
                >
                    <div className="flex items-center gap-3">
                        <div
                            className={cn(
                                'w-2 h-2 rounded-full',
                                contact.status === 'sent'
                                    ? 'bg-green-500'
                                    : contact.status === 'failed'
                                        ? 'bg-red-500'
                                        : 'bg-gray-300'
                            )}
                        />
                        <div>
                            <p className="font-medium text-gray-900">{contact.name}</p>
                            <p className="text-sm text-gray-500">{contact.phone}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {contact.status === 'sent' && <CheckCircle size={16} className="text-green-500" />}
                        {contact.status === 'failed' && <XCircle size={16} className="text-red-500" />}
                        {contact.status === 'pending' && <Clock size={16} className="text-gray-300" />}
                        <button
                            onClick={() => onDelete(contact.id)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
