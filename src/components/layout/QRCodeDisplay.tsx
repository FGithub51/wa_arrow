'use client';

import React, { useEffect, useState } from 'react';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

export function QRCodeDisplay() {
    const [status, setStatus] = useState<'DISCONNECTED' | 'QR_READY' | 'READY'>('DISCONNECTED');
    const [qrCode, setQrCode] = useState<string | null>(null);

    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const res = await fetch('/api/whatsapp');
                const data = await res.json();
                setStatus(data.status);
                setQrCode(data.qrCode);
            } catch (err) {
                console.error('Failed to fetch status', err);
            }
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    if (status === 'READY') {
        return (
            <div className="flex flex-col items-center gap-2 text-green-600">
                <CheckCircle size={48} />
                <p className="font-semibold">WhatsApp Connected!</p>
            </div>
        );
    }

    if (status === 'QR_READY' && qrCode) {
        return (
            <div className="flex flex-col items-center gap-2">
                <img src={qrCode} alt="WhatsApp QR Code" className="w-64 h-64" />
                <p className="text-sm text-gray-500">Scan with your WhatsApp mobile app</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center gap-2 text-gray-400">
            <Loader2 size={32} className="animate-spin" />
            <p>Initializing Client...</p>
        </div>
    );
}
