import { motion } from 'framer-motion';
import { Brain, Network, Zap, Kanban, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const featuresDetail = [
  {
    id: 1,
    icon: Brain,
    title: 'AI Resume Architect',
    description: 'Beat time optimization against job descriptions. Increase your ATS score instantly.',
    gradient: 'from-purple-500 to-pink-500',
    details: [
      'AI-powered job description analysis',
      'Real-time ATS score optimization',
      'Resume formatting suggestions',
      'Keyword matching and enhancement',
      'Format compatibility checks',
      'Industry-specific recommendations',
    ],
  },
  {
    id: 2,
    icon: Network,
    title: 'Network Mesh',
    description: 'Visualize connections and set smart follow-up reminders.',
    gradient: 'from-cyan-500 to-blue-500',
    details: [
      'Interactive network visualization',
      'Connection mapping and tracking',
      'Automated follow-up reminders',
      'Relationship strength metrics',
      'Contact history and notes',
      'Connection suggestions and insights',
    ],
  },
  {
    id: 3,
    icon: Zap,
    title: 'Velocity Metrics',
    description: 'Track application conversion rates and optimize your job search strategy.',
    gradient: 'from-violet-500 to-purple-500',
    details: [
      'Application tracking dashboard',
      'Conversion rate analytics',
      'Interview success metrics',
      'Time-to-offer calculations',
      'Strategy optimization recommendations',
      'Export reports and insights',
    ],
  },
  {
    id: 4,
    icon: Kanban,
    title: 'Kanban Command',
    description: 'Drag-and-drop workflow with automated status updates from email integration.',
    gradient: 'from-blue-500 to-cyan-500',
    details: [
      'Drag-and-drop workflow management',
      'Email integration and auto-sync',
      'Custom status columns',
      'Timeline and deadline tracking',
      'Bulk actions and automation',
      'Archive and historical tracking',
    ],
  },
];

export default function FeaturesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black pt-24">
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-6xl font-bold text-white mb-6">
              Powerful Features for{' '}
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Career Success
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Everything you need to manage your job search, track applications, and ace interviews
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {featuresDetail.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-10 hover:border-gray-700 transition-all group cursor-pointer"
              >
                <div className={`p-4 rounded-xl bg-gradient-to-br ${feature.gradient} w-fit mb-6`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>

                <h2 className="text-3xl font-bold text-white mb-3">{feature.title}</h2>
                <p className="text-gray-400 mb-8">{feature.description}</p>

                <div className="space-y-3 mb-8">
                  {feature.details.map((detail, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                      <span className="text-gray-300">{detail}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ gap: '12px' }}
                  onClick={() => navigate('/dashboard')}
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-semibold group"
                >
                  Try Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">Ready to transform your career?</h2>
            <p className="text-xl text-gray-400 mb-8">
              Start your free trial today and experience the difference Career OS can make
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/pricing')}
              className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              View Pricing Plans
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
