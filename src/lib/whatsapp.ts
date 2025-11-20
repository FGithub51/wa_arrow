import { Contact } from '@/types';

export function generateWhatsAppLink(phone: string, message: string): string {
    // Remove non-numeric characters from phone
    const cleanPhone = phone.replace(/\D/g, '');

    // Encode message
    const encodedMessage = encodeURIComponent(message);

    return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}

export function processTemplate(template: string, contact: Contact): string {
    return template.replace(/{name}/g, contact.name);
}
