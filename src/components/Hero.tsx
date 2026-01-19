import { motion } from 'framer-motion';
import { Rocket, Star } from 'lucide-react';
import { useState } from 'react';

interface HeroProps {
  onSubmitEmail: (email: string) => Promise<void>;
}

export default function Hero({ onSubmitEmail }: HeroProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    await onSubmitEmail(email);
    setIsSubmitting(false);
    setEmail('');
  };

  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-purple-900/10 to-black" />

      <motion.div
        className="absolute top-20 left-1/4 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute top-40 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <Star className="w-4 h-4 text-blue-400 fill-blue-400" />
          <span className="text-sm text-gray-400 uppercase tracking-wider">
            ✨ #1 Best Rated
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-6xl md:text-7xl font-bold text-center mb-6"
        >
          <span className="text-white">Your Career,</span>
          <br />
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            Spatially Organized
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl text-gray-400 text-center max-w-3xl mx-auto mb-10"
        >
          Transcend spreadsheets. Experience the first Spatial CRM designed to map your
          professional network and job applications in a 3D workspace.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto mb-16"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your work email"
            required
            className="flex-1 px-6 py-4 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Joining...' : 'Get Early Access'}
          </motion.button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="relative"
        >
          <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-1 shadow-2xl">
            <div className="bg-black rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-sm text-gray-500 ml-4">Spatial View</span>
              </div>

              <div className="relative h-80 bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden">
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="bg-blue-600/20 border border-blue-500/50 rounded-lg p-4 backdrop-blur">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">GG</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Google</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="bg-purple-600/20 border border-purple-500/50 rounded-lg p-4 backdrop-blur">
                    <div className="flex flex-col items-center">
                      <Rocket className="w-8 h-8 text-purple-400" />
                      <p className="text-sm text-white font-medium mt-2">Project Lead</p>
                      <p className="text-xs text-gray-400">Target Role</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2"
                >
                  <div className="bg-orange-600/20 border border-orange-500/50 rounded-lg p-4 backdrop-blur">
                    <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">NF</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Netflix</p>
                  </div>
                </motion.div>

                <svg className="absolute inset-0 w-full h-full">
                  <motion.line
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.3 }}
                    transition={{ delay: 1.4, duration: 1 }}
                    x1="25%"
                    y1="50%"
                    x2="50%"
                    y2="50%"
                    stroke="url(#gradient1)"
                    strokeWidth="2"
                  />
                  <motion.line
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.3 }}
                    transition={{ delay: 1.6, duration: 1 }}
                    x1="50%"
                    y1="50%"
                    x2="75%"
                    y2="50%"
                    stroke="url(#gradient2)"
                    strokeWidth="2"
                  />
                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                    <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#f97316" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
