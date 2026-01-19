import { Application } from '../../types/application';
import { AnalyticsSummary } from './analytics.utils';
import { MonthlyTrend } from './analytics.trends';

export interface Insight {
  id: string;
  title: string;
  message: string;
  severity: 'info' | 'warning' | 'success';
}

export function generateInsights(
  applications: Application[],
  analytics: AnalyticsSummary,
  trends: MonthlyTrend[]
): Insight[] {
  const insights: Insight[] = [];

  /* -------------------------
     Low interview rate
  -------------------------- */
  if (analytics.conversionRate < 20 && analytics.totalApplications > 10) {
    insights.push({
      id: 'low-interview-rate',
      title: 'Low Interview Rate',
      message:
        'You are applying frequently, but interviews are low. Consider refining your resume or targeting roles more closely.',
      severity: 'warning',
    });
  }

  /* -------------------------
     Strong offer performance
  -------------------------- */
  if (analytics.offerRate >= 10) {
    insights.push({
      id: 'strong-offer-rate',
      title: 'Strong Offer Performance',
      message:
        'Your offer rate is strong. Keep focusing on similar roles and companies.',
      severity: 'success',
    });
  }

  /* -------------------------
     Drop in activity
  -------------------------- */
  if (trends.length >= 2) {
    const last = trends[trends.length - 1];
    const prev = trends[trends.length - 2];

    if (last.applications < prev.applications) {
      insights.push({
        id: 'activity-drop',
        title: 'Application Activity Dropped',
        message:
          'You applied to fewer roles this period. Staying consistent improves momentum.',
        severity: 'info',
      });
    }
  }

  /* -------------------------
     No offers yet
  -------------------------- */
  if (analytics.offers === 0 && analytics.totalApplications >= 15) {
    insights.push({
      id: 'no-offers',
      title: 'No Offers Yet',
      message:
        'You have applied to many roles without offers. Consider mock interviews or role targeting.',
      severity: 'warning',
    });
  }

  return insights;
}