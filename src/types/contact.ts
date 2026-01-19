export interface Contact {
    id: string;
    user_id: string;
    name: string;
    email?: string;
    phone?: string;
    company?: string;
    position?: string;
    relationship?: string; // recruiter, referral, hiring manager
    last_contact?: string;
    notes?: string;
    created_at: string;
  }