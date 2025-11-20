'use client';

import React from 'react';
import { MessageSquare } from 'lucide-react';

interface MessageEditorProps {
    value: string;
    onChange: (value: string) => void;
}

export function MessageEditor({ value, onChange }: MessageEditorProps) {
    const insertVariable = (variable: string) => {
        const textarea = document.getElementById('message-input') as HTMLTextAreaElement;
        if (textarea) {
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const newValue = value.substring(0, start) + variable + value.substring(end);
            onChange(newValue);
            // Restore focus and cursor position (roughly)
            setTimeout(() => {
                textarea.focus();
                textarea.setSelectionRange(start + variable.length, start + variable.length);
            }, 0);
        } else {
            onChange(value + variable);
        }
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-gray-900 font-semibold">
                    <MessageSquare size={20} className="text-blue-600" />
                    <h3>Message Template</h3>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => insertVariable('{name}')}
                        className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-md hover:bg-blue-100 transition-colors font-medium"
                    >
                        + Insert Name
                    </button>
                </div>
            </div>
            <textarea
                id="message-input"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Hi {name}, checking in regarding..."
                className="w-full h-32 p-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none resize-none text-gray-700"
            />
            <p className="text-xs text-gray-400 mt-2 text-right">
                Use {'{name}'} to dynamically insert contact name
            </p>
        </div>
    );
}
