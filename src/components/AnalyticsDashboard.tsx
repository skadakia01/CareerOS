import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Calendar, PieChart } from 'lucide-react';
import { Application } from '../types/application';
import { computeAnalytics } from './../features/analytics/analytics.utils';
import { computeMonthlyTrends } from './../features/analytics/analytics.trends';
import { generateInsights } from './../features/analytics/insights.engine';
import InsightsPanel from './InsightsPanel';

interface Props {
  applications: Application[];
}

export default function AnalyticsDashboard({ applications }: Props) {
  const analytics = computeAnalytics(applications);
  const trends = computeMonthlyTrends(applications);
  const insights = generateInsights(applications, analytics, trends);

  return (
    <div className="space-y-8">
      <InsightsPanel insights={insights} />
      {/* KPI Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        {[
          {
            label: 'Total Applications',
            value: analytics.totalApplications,
            icon: <BarChart3 className="w-5 h-5" />,
          },
          {
            label: 'Interview Rate',
            value: `${analytics.conversionRate}%`,
            icon: <TrendingUp className="w-5 h-5" />,
          },
          {
            label: 'Offers',
            value: analytics.offers,
            icon: <PieChart className="w-5 h-5" />,
          },
          {
            label: 'Rejected',
            value: analytics.rejected,
            icon: <Calendar className="w-5 h-5" />,
          },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6"
          >
            <div className="mb-4">{stat.icon}</div>
            <p className="text-gray-400 text-sm">{stat.label}</p>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Monthly Trend */}
      <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-6">
          Application Funnel Over Time
        </h3>

        <div className="space-y-4">
          {trends.map((month, i) => (
            <motion.div
              key={month.month}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="grid grid-cols-4 gap-4 items-center"
            >
              <span className="text-gray-300 text-sm">{month.month}</span>

              <MetricBar
                label="Apps"
                value={month.applications}
                max={analytics.totalApplications}
                color="from-blue-500 to-blue-600"
              />

              <MetricBar
                label="Interviews"
                value={month.interviews}
                max={analytics.totalApplications}
                color="from-purple-500 to-purple-600"
              />

              <MetricBar
                label="Offers"
                value={month.offers}
                max={analytics.totalApplications}
                color="from-green-500 to-green-600"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------
   Reusable metric bar
-------------------------------- */
function MetricBar({
  label,
  value,
  max,
  color,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
}) {
  const percent = max > 0 ? (value / max) * 100 : 0;

  return (
    <div>
      <div className="flex justify-between text-xs text-gray-400 mb-1">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.6 }}
          className={`h-full bg-gradient-to-r ${color}`}
        />
      </div>
    </div>
  );
}