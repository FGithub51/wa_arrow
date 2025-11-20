'use client';

import React, { useState } from 'react';
import Papa from 'papaparse';
import { Upload, Plus, FileText } from 'lucide-react';
import { Contact } from '@/types';
import { cn } from '@/lib/utils';

interface ContactImporterProps {
    onImport: (contacts: Contact[]) => void;
}

export function ContactImporter({ onImport }: ContactImporterProps) {
    const [isDragging, setIsDragging] = useState(false);

    const handleFileUpload = (file: File) => {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            transformHeader: (header) => header.toLowerCase().trim(),
            complete: (results) => {
                const contacts: Contact[] = results.data
                    .map((row: any) => {
                        // Try to find name and phone fields with various common names
                        const name = row.name || row['full name'] || row.firstname || '';
                        const phone = row.phone || row.mobile || row['phone number'] || row.whatsapp || '';

                        return {
                            id: crypto.randomUUID(),
                            name: name,
                            phone: phone,
                            status: 'pending' as const,
                        };
                    })
                    .filter((c) => c.name && c.phone); // Only keep valid contacts

                if (contacts.length === 0) {
                    alert('No valid contacts found. Please ensure your CSV has "name" and "phone" columns.');
                    return;
                }

                onImport(contacts);
            },
            error: (error) => {
                console.error('CSV Parse Error:', error);
                alert('Failed to parse CSV file.');
            }
        });
    };

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type === 'text/csv') {
            handleFileUpload(file);
        }
    };

    return (
        <div
            className={cn(
                'border-2 border-dashed rounded-xl p-3 text-center transition-colors cursor-pointer group',
                isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-400 hover:bg-blue-50/50'
            )}
            onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={onDrop}
            onClick={() => document.getElementById('csv-input')?.click()}
        >
            <input
                id="csv-input"
                type="file"
                accept=".csv"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
            />
            <div className="flex items-center justify-center gap-4">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600 group-hover:bg-blue-200 transition-colors">
                    <Upload size={20} />
                </div>
                <div className="text-left">
                    <h3 className="font-semibold text-gray-900 text-sm">Import Contacts via CSV</h3>
                    <p className="text-xs text-gray-500">Drag & drop or click to upload</p>
                </div>
                <div className="ml-auto text-xs text-gray-400 hidden sm:block bg-gray-50 px-2 py-1 rounded border border-gray-100">
                    name, phone
                </div>
            </div>
        </div>
    );
}
