import { motion } from 'framer-motion';
import { Monitor, Sparkles, Smartphone } from 'lucide-react';

const showcases = [
  {
    title: 'Deep Focus Mode',
    description: 'Distraction-free environment',
    icon: Monitor,
    gradient: 'from-gray-800 to-gray-900',
  },
  {
    title: 'AI Assistant',
    description: 'Smart recommendations',
    icon: Sparkles,
    gradient: 'from-blue-900 to-purple-900',
  },
  {
    title: 'Mobile',
    description: 'On-the-go access',
    icon: Smartphone,
    gradient: 'from-gray-800 to-gray-700',
  },
];

export default function Showcase() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          {showcases.map((showcase, index) => (
            <motion.div
              key={showcase.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative group overflow-hidden rounded-2xl border border-gray-800 hover:border-gray-700 transition-all"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${showcase.gradient}`} />

              <div className="relative aspect-[4/5] p-8 flex flex-col">
                <motion.div
                  className="flex-1 relative"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + 0.3 }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <showcase.icon className="w-24 h-24 text-white/20" />
                    </motion.div>
                  </div>

                  {index === 1 && (
                    <motion.div
                      className="absolute inset-0"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                    >
                      {[...Array(20)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-blue-400 rounded-full"
                          initial={{
                            x: '50%',
                            y: '50%',
                            scale: 0,
                          }}
                          animate={{
                            x: `${Math.random() * 100}%`,
                            y: `${Math.random() * 100}%`,
                            scale: [0, 1, 0],
                          }}
                          transition={{
                            duration: 2 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                          }}
                        />
                      ))}
                    </motion.div>
                  )}
                </motion.div>

                <div className="mt-auto">
                  <h3 className="text-2xl font-bold text-white mb-2">{showcase.title}</h3>
                  <p className="text-gray-400">{showcase.description}</p>
                </div>
              </div>

              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
