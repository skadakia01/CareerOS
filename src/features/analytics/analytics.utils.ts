import { Application } from '../../types/application';

export interface AnalyticsSummary {
  totalApplications: number;
  interviews: number;
  offers: number;
  rejected: number;
  conversionRate: number;
  offerRate: number;
}

export function computeAnalytics(applications: Application[]): AnalyticsSummary {
  const total = applications.length;

  const interviews = applications.filter(
    (a) => a.status === 'interviewing'
  ).length;

  const offers = applications.filter(
    (a) => a.status === 'offer'
  ).length;

  const rejected = applications.filter(
    (a) => a.status === 'rejected'
  ).length;

  const conversionRate =
    total > 0 ? ((interviews + offers) / total) * 100 : 0;

  const offerRate =
    total > 0 ? (offers / total) * 100 : 0;

  return {
    totalApplications: total,
    interviews,
    offers,
    rejected,
    conversionRate: Number(conversionRate.toFixed(1)),
    offerRate: Number(offerRate.toFixed(1)),
  };
}