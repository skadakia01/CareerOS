import { Application } from '../../types/application';

export interface MonthlyTrend {
  month: string;
  applications: number;
  interviews: number;
  offers: number;
}

export function computeMonthlyTrends(
  applications: Application[]
): MonthlyTrend[] {
  const map = new Map<string, MonthlyTrend>();

  applications.forEach((app) => {
    const date = new Date(app.application_date);
    const key = date.toLocaleString('default', { month: 'short', year: 'numeric' });

    if (!map.has(key)) {
      map.set(key, {
        month: key,
        applications: 0,
        interviews: 0,
        offers: 0,
      });
    }

    const entry = map.get(key)!;
    entry.applications += 1;
    if (app.status === 'interviewing') entry.interviews += 1;
    if (app.status === 'offer') entry.offers += 1;
  });

  return Array.from(map.values());
}