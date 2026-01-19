import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    description: 'Perfect for getting started',
    features: [
      'Up to 25 job applications tracked',
      'Basic resume optimization',
      'Standard email support',
      'Limited network visualization',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    description: 'For serious job seekers',
    features: [
      'Unlimited job applications',
      'Advanced AI resume optimization',
      'Priority email support',
      'Full network mesh visualization',
      'Advanced velocity metrics',
      'Email integration',
      'Custom kanban workflows',
    ],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For teams and organizations',
    features: [
      'Everything in Pro',
      'Team collaboration features',
      'API access',
      'Priority phone support',
      'Custom integrations',
      'Advanced analytics',
      'Dedicated account manager',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

export default function Pricing() {
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
              Transparent,{' '}
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Flexible Pricing
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Choose the perfect plan for your career journey. Cancel anytime.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className={`rounded-2xl p-8 transition-all ${
                  plan.highlighted
                    ? 'bg-gradient-to-br from-blue-950 to-black border-2 border-blue-500 scale-105 md:scale-100 md:relative md:z-10'
                    : 'bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-gray-700'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-5xl font-bold text-white">{plan.price}</span>
                    {plan.period && <span className="text-gray-400">{plan.period}</span>}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/signup')}
                  className={`w-full py-3 rounded-lg font-semibold mb-8 flex items-center justify-center gap-2 transition-all ${
                    plan.highlighted
                      ? 'bg-white text-black hover:bg-gray-100'
                      : 'border border-gray-700 text-white hover:border-gray-600 hover:bg-gray-900'
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4" />
                </motion.button>

                <div className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                      <span className="text-gray-300">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-gray-800">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-gray-800 rounded-2xl p-12 text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-400 mb-8">
              Have questions about pricing? We've got answers.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-black transition-all font-semibold"
            >
              Contact Support
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
