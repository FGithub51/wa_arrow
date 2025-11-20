'use client';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ContactList } from '@/components/contacts/ContactList';
import { SenderView } from '@/components/messaging/SenderView';
import { MessageEditor } from '@/components/messaging/MessageEditor';
import { ContactImporter } from '@/components/contacts/ContactImporter';
import { Contact, MessageTemplate } from '@/types';
import { generateWhatsAppLink, processTemplate } from '@/lib/whatsapp';

export default function WaArrowPage() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [currentContactId, setCurrentContactId] = useState<string | null>(null);
    const [template, setTemplate] = useState<MessageTemplate>({ raw: '', processed: '' });

    // Load from local storage on mount
    useEffect(() => {
        const savedContacts = localStorage.getItem('wa_contacts');
        if (savedContacts) {
            setContacts(JSON.parse(savedContacts));
        }
        const savedTemplate = localStorage.getItem('wa_template');
        if (savedTemplate) {
            setTemplate(JSON.parse(savedTemplate));
        }
    }, []);

    // Save to local storage on change
    useEffect(() => {
        localStorage.setItem('wa_contacts', JSON.stringify(contacts));
    }, [contacts]);

    useEffect(() => {
        localStorage.setItem('wa_template', JSON.stringify(template));
    }, [template]);

    const handleImport = (newContacts: Contact[]) => {
        setContacts(prev => [...prev, ...newContacts]);
    };

    const handleTemplateChange = (raw: string) => {
        setTemplate({ raw, processed: raw }); // Processed updates dynamically in SenderView
    };

    const handleSelectContact = (id: string) => {
        setCurrentContactId(id);
    };

    const handleStatusChange = (id: string, status: Contact['status']) => {
        setContacts(prev => prev.map(c => c.id === id ? { ...c, status } : c));
    };

    const handleClearAll = () => {
        if (confirm('Are you sure you want to delete all contacts?')) {
            setContacts([]);
            setCurrentContactId(null);
        }
    };

    const currentContact = contacts.find(c => c.id === currentContactId);
    const processedMessage = currentContact ? processTemplate(template.raw, currentContact) : template.raw;

    const handleNext = () => {
        if (!currentContactId) return;
        const currentIndex = contacts.findIndex(c => c.id === currentContactId);
        if (currentIndex < contacts.length - 1) {
            setCurrentContactId(contacts[currentIndex + 1].id);
        }
    };

    return (
        <DashboardLayout>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-180px)] min-h-[600px]">
                {/* Left Column: Contacts */}
                <div className="lg:col-span-4 flex flex-col gap-6 h-full overflow-hidden">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex-shrink-0">
                        <ContactImporter onImport={handleImport} />
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex-1 overflow-hidden flex flex-col">
                        <ContactList
                            contacts={contacts}
                            onSelect={handleSelectContact}
                            selectedId={currentContactId}
                            onClearAll={handleClearAll}
                        />
                    </div>
                </div>

                {/* Right Column: Editor & Sender */}
                <div className="lg:col-span-8 flex flex-col gap-6 h-full overflow-hidden">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex-shrink-0">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Message Template</h2>
                        <MessageEditor
                            template={template.raw}
                            onChange={handleTemplateChange}
                        />
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex-1 overflow-hidden">
                        {currentContact ? (
                            <SenderView
                                contact={currentContact}
                                message={processedMessage}
                                onStatusChange={handleStatusChange}
                                onNext={handleNext}
                            />
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-gray-400 p-8 text-center">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                    <span className="text-2xl">👈</span>
                                </div>
                                <p className="text-lg font-medium">Select a contact to start sending</p>
                                <p className="text-sm mt-2">Import contacts or choose one from the list</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
