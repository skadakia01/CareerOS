import { ApplicationDB, Application } from '../../types/application';

export function mapDBToApplication(db: ApplicationDB): Application {
  return {
    id: db.id,
    company: db.company_name,
    position: db.position,
    status: db.status,
    appliedDate: db.application_date,
    application_date: db.application_date,
    rating: db.rating || null, // Assuming rating might be optional in the database
  };
}