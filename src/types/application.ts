// Raw DB row from Supabase
export interface ApplicationDB {
    rating: null;
    id: string;
    user_id: string;
    company_name: string;
    position: string;
    status: 'applied' | 'interviewing' | 'offer' | 'rejected' | 'accepted';
    application_date: string;
    created_at: string;
    updated_at: string;
  }
  
  // UI-friendly model (Kanban, Modal, Analytics)
  export interface Application {
    application_date: string | number | Date;
    rating: any;
    id: string;
    company: string;
    position: string;
    status: ApplicationDB['status'];
    appliedDate: string;
  }