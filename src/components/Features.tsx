import { motion } from 'framer-motion';
import { Brain, Network, Zap, Kanban } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI Resume Architect',
    description: 'Beat time optimization against job descriptions. Increase your ATS score instantly.',
    gradient: 'from-purple-500 to-pink-500',
    demo: (
      <div className="mt-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gray-400">Match Score</span>
          <span className="text-xs text-blue-400 font-semibold">84%</span>
        </div>
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '84%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
          />
        </div>
      </div>
    ),
  },
  {
    icon: Network,
    title: 'Network Mesh',
    description: 'Visualize connections and set smart follow-up reminders.',
    gradient: 'from-cyan-500 to-blue-500',
    demo: (
      <div className="mt-4 relative h-24 flex items-center justify-center">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="absolute w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
            style={{
              left: `${20 + i * 30}%`,
              background: `linear-gradient(135deg, ${i === 0 ? '#06b6d4' : i === 1 ? '#3b82f6' : '#8b5cf6'}, ${
                i === 0 ? '#0891b2' : i === 1 ? '#2563eb' : '#7c3aed'
              })`,
            }}
          >
            {['A', 'B', 'C'][i]}
          </motion.div>
        ))}
        <svg className="absolute inset-0 w-full h-full">
          <motion.path
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.6 }}
            d="M 30% 50% Q 40% 30% 50% 50%"
            fill="none"
            stroke="url(#networkGradient1)"
            strokeWidth="2"
            opacity="0.5"
          />
          <motion.path
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.8 }}
            d="M 50% 50% Q 60% 70% 70% 50%"
            fill="none"
            stroke="url(#networkGradient2)"
            strokeWidth="2"
            opacity="0.5"
          />
          <defs>
            <linearGradient id="networkGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient id="networkGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    ),
  },
  {
    icon: Zap,
    title: 'Velocity Metrics',
    description: 'Track application conversion rates and optimize your job search strategy.',
    gradient: 'from-violet-500 to-purple-500',
    demo: (
      <div className="mt-4 space-y-3">
        {[
          { label: 'Applications', value: 45, color: 'from-purple-500 to-violet-500' },
          { label: 'Interviews', value: 12, color: 'from-violet-500 to-fuchsia-500' },
          { label: 'Offers', value: 3, color: 'from-fuchsia-500 to-pink-500' },
        ].map((stat, i) => (
          <div key={i}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-400">{stat.label}</span>
              <span className="text-xs text-white font-semibold">{stat.value}</span>
            </div>
            <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(stat.value / 45) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.2 }}
                className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
              />
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: Kanban,
    title: 'Kanban Command',
    description: 'Drag-and-drop workflow with automated status updates from email integration.',
    gradient: 'from-blue-500 to-cyan-500',
    demo: (
      <div className="mt-4 flex gap-2">
        {['APPLIED', 'INTERVIEW', 'OFFER'].map((status, i) => (
          <motion.div
            key={status}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="flex-1"
          >
            <div className="bg-gray-800 rounded p-2">
              <div className="text-xs text-gray-500 mb-2">{status}</div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gray-700 rounded p-2 cursor-pointer"
              >
                <div className="w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded mb-1" />
                <div className="w-2/3 h-1 bg-gray-600 rounded" />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    ),
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-4">
            The Operating System
          </h2>
          <p className="text-2xl text-gray-400">
            for your <span className="text-gray-300">next chapter.</span>
          </p>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Replace fragmented tools with a unified command center. AI-powered, spatially aware, and
            designed for speed.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-all"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.gradient}`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              </div>

              <div className="bg-black/50 rounded-xl p-4 border border-gray-800">
                {feature.demo}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
