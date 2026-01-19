import { motion } from 'framer-motion';
import { CheckCircle, Shield } from 'lucide-react';

interface CTAProps {
  onJoinWaitlist: () => void;
  onViewDemo: () => void;
}

export default function CTA({ onJoinWaitlist, onViewDemo }: CTAProps) {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-purple-900/20"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Ready for the{' '}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              upgrade
            </span>
            ?
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Join the elite circle of professionals using AI to navigate their career paths with precision.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onJoinWaitlist}
            className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
          >
            Join Waitlist Now
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onViewDemo}
            className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-all"
          >
            View Live Demo
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400"
        >
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-400" />
            <span>Cancel anytime</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
