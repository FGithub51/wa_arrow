'use client';

import React from 'react';
import { Contact } from '@/types';
import { Trash2, CheckCircle, XCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContactListProps {
    contacts: Contact[];
    onDelete?: (id: string) => void;
    onSelect?: (id: string) => void;
    selectedId?: string | null;
    onClearAll?: () => void;
}

export function ContactList({ contacts, onDelete, onSelect, selectedId, onClearAll }: ContactListProps) {
    if (contacts.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500">
                No contacts added yet. Import a CSV to get started.
            </div>
        );
    }

    return (
        <div className="space-y-2 overflow-y-auto p-1">
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
                    onClick={() => onSelect?.(contact.id)}
                    className={cn(
                        "flex items-center justify-between p-3 border rounded-lg hover:shadow-sm transition-all cursor-pointer",
                        selectedId === contact.id
                            ? "bg-blue-50 border-blue-200 shadow-sm ring-1 ring-blue-200"
                            : "bg-white border-gray-100"
                    )}
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
                            <p className={cn("font-medium", selectedId === contact.id ? "text-blue-900" : "text-gray-900")}>
                                {contact.name}
                            </p>
                            <p className="text-sm text-gray-500">{contact.phone}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {contact.status === 'sent' && <CheckCircle size={16} className="text-green-500" />}
                        {contact.status === 'failed' && <XCircle size={16} className="text-red-500" />}
                        {contact.status === 'pending' && <Clock size={16} className="text-gray-300" />}
                        {onDelete && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(contact.id);
                                }}
                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                            >
                                <Trash2 size={16} />
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
