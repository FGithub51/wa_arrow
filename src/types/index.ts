export type ContactStatus = 'pending' | 'sent' | 'failed';

export interface Contact {
  id: string;
  name: string;
  phone: string;
  status: ContactStatus;
  lastSentAt?: Date;
}

export interface WAMessageTemplate {
  raw: string;
  processed: string;
}
