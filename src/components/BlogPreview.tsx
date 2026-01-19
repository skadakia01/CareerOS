import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';

const posts = [
  {
    title: '10 ATS Keywords Every Job Seeker Should Know',
    author: 'Sarah Mitchell',
    date: 'Jan 15, 2024',
    category: 'Resume Tips',
    excerpt: 'Discover the most important keywords that ATS systems scan for and how to incorporate them naturally into your resume...',
    image: '📄',
  },
  {
    title: 'Master the Behavioral Interview with STAR Method',
    author: 'David Chen',
    date: 'Jan 12, 2024',
    category: 'Interview Prep',
    excerpt: 'Learn how to structure your interview answers using the STAR method to leave a lasting impression on hiring managers...',
    image: '🎯',
  },
  {
    title: 'Networking Strategies That Actually Work in 2024',
    author: 'Emma Rodriguez',
    date: 'Jan 10, 2024',
    category: 'Career Strategy',
    excerpt: 'Stop cold emailing. Learn proven networking strategies that build genuine relationships and lead to opportunities...',
    image: '🤝',
  },
];

export default function BlogPreview() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-gray-900 to-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <h2 className="text-5xl font-bold text-white mb-4">Career Insights</h2>
            <p className="text-xl text-gray-400">Tips and strategies from career experts</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-6 py-3 border border-gray-700 text-white rounded-lg hover:border-gray-600 transition-colors flex items-center gap-2"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 transition-all group"
            >
              <div className="p-6">
                <div className="text-5xl mb-4">{post.image}</div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-blue-400 uppercase bg-blue-900/20 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">{post.excerpt}</p>

                <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-800">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
