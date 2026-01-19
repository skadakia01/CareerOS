import { motion } from 'framer-motion';
import { TrendingUp, BarChart3, PieChart, Calendar } from 'lucide-react';

interface Stat {
  label: string;
  value: string | number;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
}

export default function AnalyticsDashboard() {
  const stats: Stat[] = [
    {
      label: 'Total Applications',
      value: 24,
      change: '+4 this week',
      isPositive: true,
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      label: 'Interview Rate',
      value: '33%',
      change: '+8% vs last month',
      isPositive: true,
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      label: 'Avg Days to Interview',
      value: 12,
      change: '-3 days vs avg',
      isPositive: true,
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      label: 'Conversion Rate',
      value: '8%',
      change: '+2% this month',
      isPositive: true,
      icon: <PieChart className="w-5 h-5" />,
    },
  ];

  const chartData = [
    { month: 'Jan', applications: 5, interviews: 1 },
    { month: 'Feb', applications: 7, interviews: 2 },
    { month: 'Mar', applications: 6, interviews: 2 },
    { month: 'Apr', applications: 8, interviews: 3 },
    { month: 'May', applications: 9, interviews: 3 },
    { month: 'Jun', applications: 12, interviews: 4 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 rounded-lg bg-gray-800">{stat.icon}</div>
            </div>
            <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
            <p className="text-2xl font-bold text-white mb-2">{stat.value}</p>
            <p className={`text-xs ${stat.isPositive ? 'text-green-400' : 'text-red-400'}`}>{stat.change}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold text-white mb-6">Applications & Interviews Trend</h3>

        <div className="flex items-end justify-between h-64 gap-2">
          {chartData.map((data, index) => (
            <motion.div
              key={index}
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="flex-1 flex flex-col items-center"
            >
              <div className="flex gap-1 mb-4">
                <motion.div
                  className="rounded-t-lg bg-gradient-to-t from-blue-500 to-blue-600"
                  style={{ width: '18px', height: `${(data.applications / 12) * 200}px` }}
                  whileHover={{ scale: 1.1 }}
                />
                <motion.div
                  className="rounded-t-lg bg-gradient-to-t from-purple-500 to-purple-600"
                  style={{ width: '18px', height: `${(data.interviews / 4) * 200}px` }}
                  whileHover={{ scale: 1.1 }}
                />
              </div>
              <span className="text-xs text-gray-400 font-medium">{data.month}</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex gap-4 justify-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-xs text-gray-400">Applications</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500" />
            <span className="text-xs text-gray-400">Interviews</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold text-white mb-4">Application Distribution by Status</h3>

        <div className="space-y-3">
          {[
            { label: 'Applied', value: 12, color: 'from-blue-500 to-blue-600' },
            { label: 'Interviewing', value: 8, color: 'from-purple-500 to-purple-600' },
            { label: 'Offer', value: 2, color: 'from-green-500 to-green-600' },
            { label: 'Rejected', value: 2, color: 'from-red-500 to-red-600' },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-300">{item.label}</span>
                <span className="text-sm font-semibold text-white">{item.value}</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(item.value / 24) * 100}%` }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                  className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
