import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { Insight } from '../features/analytics/insights.engine';

export default function InsightsPanel({ insights }: { insights: Insight[] }) {
  if (insights.length === 0) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-gray-400">
        No insights yet. Keep applying and tracking progress.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {insights.map((insight, i) => (
        <motion.div
          key={insight.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="flex gap-4 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-5"
        >
          <InsightIcon severity={insight.severity} />

          <div>
            <h4 className="text-white font-semibold">{insight.title}</h4>
            <p className="text-gray-400 text-sm mt-1">{insight.message}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function InsightIcon({ severity }: { severity: Insight['severity'] }) {
  if (severity === 'warning') {
    return <AlertTriangle className="w-5 h-5 text-yellow-400 mt-1" />;
  }
  if (severity === 'success') {
    return <CheckCircle className="w-5 h-5 text-green-400 mt-1" />;
  }
  return <Info className="w-5 h-5 text-blue-400 mt-1" />;
}