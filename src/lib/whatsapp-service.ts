import { Client, LocalAuth, Message } from 'whatsapp-web.js';
import qrcode from 'qrcode';

let client: Client | null = null;
let qrCodeData: string | null = null;
let status: 'DISCONNECTED' | 'QR_READY' | 'READY' = 'DISCONNECTED';

// Simple in-memory store for inbox (Note: this will reset on server restart)
export interface InboxItem {
    id: string;
    from: string;
    pushname: string;
    body: string;
    timestamp: number;
    unreadCount: number;
}

let inbox: Map<string, InboxItem> = new Map();

export const getClient = () => {
    if (!client) {
        console.log('Initializing WhatsApp Client...');
        client = new Client({
            authStrategy: new LocalAuth(),
            puppeteer: {
                headless: true,
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-accelerated-2d-canvas',
                    '--no-first-run',
                    '--no-zygote',
                    '--disable-gpu'
                ],
            },
            webVersionCache: {
                type: 'remote',
                remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
            },
        });

        client.on('qr', async (qr) => {
            console.log('QR Code received');
            qrCodeData = await qrcode.toDataURL(qr);
            status = 'QR_READY';
        });

        client.on('ready', () => {
            console.log('WhatsApp Client is ready!');
            status = 'READY';
            qrCodeData = null;
        });

        client.on('message', async (msg: Message) => {
            try {
                const contact = await msg.getContact();
                const from = msg.from; // e.g., 1234567890@c.us

                // Update inbox
                const existing = inbox.get(from);
                inbox.set(from, {
                    id: from,
                    from: contact.number,
                    pushname: contact.pushname || contact.name || contact.number,
                    body: msg.body,
                    timestamp: msg.timestamp,
                    unreadCount: (existing?.unreadCount || 0) + 1
                });

                console.log('New message from:', contact.pushname);
            } catch (err) {
                console.error('Error handling message:', err);
            }
        });

        client.on('disconnected', () => {
            console.log('WhatsApp Client disconnected');
            status = 'DISCONNECTED';
            qrCodeData = null;
        });

        client.initialize();
    }
    return client;
};

export const getStatus = () => {
    return { status, qrCode: qrCodeData };
};

export const getInbox = () => {
    return Array.from(inbox.values()).sort((a, b) => b.timestamp - a.timestamp);
};

export const logout = async () => {
    if (client) {
        await client.logout();
        client = null;
        status = 'DISCONNECTED';
        qrCodeData = null;
        inbox.clear();
    }
};
