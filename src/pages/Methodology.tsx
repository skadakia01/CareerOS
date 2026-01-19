import { motion } from 'framer-motion';
import { CheckCircle, Zap, Target, Users, TrendingUp, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const methodSteps = [
  {
    icon: Target,
    title: 'Goal Mapping',
    description: 'Define your career objectives and target roles with clarity and precision.',
  },
  {
    icon: Users,
    title: 'Network Building',
    description: 'Systematically build and nurture meaningful professional relationships.',
  },
  {
    icon: Zap,
    title: 'Application Strategy',
    description: 'Optimize your job search with AI-powered application tracking and insights.',
  },
  {
    icon: TrendingUp,
    title: 'Progress Tracking',
    description: 'Monitor your metrics and conversion rates to continuously improve your approach.',
  },
  {
    icon: Lightbulb,
    title: 'Interview Prep',
    description: 'Get AI recommendations for interview preparation and success.',
  },
  {
    icon: CheckCircle,
    title: 'Offer Negotiation',
    description: 'Leverage data-driven insights to negotiate the best possible outcomes.',
  },
];

const benefits = [
  'Data-Driven Decision Making',
  'Faster Job Search Process',
  'Higher Interview Success Rate',
  'Better Offer Negotiation',
  'Professional Network Growth',
  'Career Growth Acceleration',
];

export default function Methodology() {
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
              The Career OS{' '}
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Methodology
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              A scientifically-designed framework for navigating your career journey with precision and success.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {methodSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-all"
              >
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 w-fit mb-4">
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <span className="text-sm text-blue-400 font-semibold">Step {index + 1}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center py-20 border-y border-gray-800">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-8">
                Why the{' '}
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Career OS Works
                </span>
              </h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Our methodology is built on years of research into what makes job seekers successful.
                By combining AI-powered optimization with human-centric design, Career OS delivers
                results that matter.
              </p>
              <ul className="space-y-3">
                {benefits.map((benefit, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 text-gray-300"
                  >
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    {benefit}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8"
            >
              <div className="space-y-6">
                {[
                  { label: 'Success Rate', value: '89%' },
                  { label: 'Avg Time to Offer', value: '3.2 months' },
                  { label: 'User Satisfaction', value: '4.9/5' },
                  { label: 'Active Users', value: '50K+' },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                    <p className="text-4xl font-bold text-white">{stat.value}</p>
                    <div className="mt-3 h-1 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + 0.3, duration: 1 }}
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">Ready to transform your career?</h2>
            <p className="text-xl text-gray-400 mb-8">
              Join thousands of professionals using Career OS to achieve their goals
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/signup')}
              className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Get Started Today
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
