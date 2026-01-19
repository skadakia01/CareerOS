import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string) => Promise<void>;
}

export default function WaitlistModal({ isOpen, onClose, onSubmit }: WaitlistModalProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    await onSubmit(email);
    setIsSubmitting(false);
    setIsSuccess(true);

    setTimeout(() => {
      setEmail('');
      setIsSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none"
          >
            <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 max-w-md w-full pointer-events-auto relative overflow-hidden">
              <motion.div
                className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              {!isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative z-10"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
                    <Mail className="w-8 h-8 text-white" />
                  </div>

                  <h2 className="text-3xl font-bold text-white mb-2">Join the Waitlist</h2>
                  <p className="text-gray-400 mb-8">
                    Be among the first to experience the future of career management.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="w-full px-6 py-4 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-6 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Joining...' : 'Get Early Access'}
                    </motion.button>
                  </form>

                  <p className="text-xs text-gray-500 mt-4 text-center">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative z-10 text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                    className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle className="w-10 h-10 text-white" />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-white mb-2">You're in!</h3>
                  <p className="text-gray-400">
                    We'll notify you when Career OS launches.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
