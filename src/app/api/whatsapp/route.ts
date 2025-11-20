import { NextResponse } from 'next/server';
import { getClient, getStatus, logout, getInbox } from '@/lib/whatsapp-service';

export async function GET(request: Request) {
    // Ensure client is initialized
    getClient();

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    if (type === 'inbox') {
        return NextResponse.json({ inbox: getInbox() });
    }

    return NextResponse.json(getStatus());
}

export async function POST(request: Request) {
    const body = await request.json();
    const { action, phone, message } = body;

    if (action === 'logout') {
        await logout();
        return NextResponse.json({ success: true });
    }

    if (action === 'send_message') {
        const client = getClient();
        if (!client) {
            return NextResponse.json({ success: false, error: 'Client not initialized' }, { status: 500 });
        }

        try {
            // Format phone number: remove non-digits, ensure suffix @c.us
            const cleanPhone = phone.replace(/\D/g, '');
            const chatId = `${cleanPhone}@c.us`;

            console.log(`Attempting to send message to: ${chatId}`);

            await client.sendMessage(chatId, message);

            console.log(`Message sent successfully to: ${chatId}`);
            return NextResponse.json({ success: true });
        } catch (error) {
            console.error('Send Message Error:', error);
            return NextResponse.json({ success: false, error: 'Failed to send message' }, { status: 500 });
        }
    }

    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
}
