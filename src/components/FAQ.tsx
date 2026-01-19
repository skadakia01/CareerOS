import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: 'How does the AI resume optimization work?',
    answer: 'Our AI analyzes job descriptions and compares them with your resume, providing real-time suggestions to improve your ATS score and relevance. It identifies missing keywords, formatting issues, and highlights sections that need strengthening.',
  },
  {
    question: 'Can I import my existing applications?',
    answer: 'Yes! You can manually add your applications or use our CSV import feature. You can also sync with Gmail to automatically track your job application emails.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Absolutely. We use end-to-end encryption and follow enterprise-grade security standards. Your data is never shared with third parties and you maintain full control.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, Mastercard, American Express) and PayPal. You can also request invoicing for enterprise customers.',
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes, you can cancel anytime with no penalties. Your data remains accessible for 30 days after cancellation.',
  },
  {
    question: 'Do you offer team plans?',
    answer: 'Yes! Our Enterprise plan includes team collaboration features, custom integrations, and dedicated support. Contact our sales team for details.',
  },
];

export default function FAQ() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-400">Everything you need to know about Career OS</p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <motion.button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className={`w-full text-left p-6 rounded-lg border transition-all ${
                  expandedIndex === index
                    ? 'bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-500/50'
                    : 'bg-gray-900 border-gray-800 hover:border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                  <motion.div
                    animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-6 h-6 text-blue-400" />
                  </motion.div>
                </div>
              </motion.button>

              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-4 bg-gray-800/50 text-gray-300 border-t border-gray-700">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
