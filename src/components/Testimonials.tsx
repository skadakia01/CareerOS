import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    author: 'Sarah Chen',
    role: 'Product Manager at Google',
    image: '👩‍💼',
    content: 'Career OS helped me organize my entire job search. Got 3 offers within 2 months!',
    rating: 5,
  },
  {
    author: 'Marcus Johnson',
    role: 'Software Engineer',
    image: '👨‍💻',
    content: 'The resume optimizer increased my ATS score from 62% to 89%. Game changer!',
    rating: 5,
  },
  {
    author: 'Emily Rodriguez',
    role: 'UX Designer at Apple',
    image: '👩‍🎨',
    content: 'Tracking my network and following up has never been easier. Highly recommend!',
    rating: 5,
  },
  {
    author: 'David Kim',
    role: 'Data Scientist',
    image: '👨‍🔬',
    content: 'The analytics dashboard gives me insights I never had before about my job search.',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-4">
            Loved by professionals worldwide
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Join thousands of successful career changers and job seekers
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-all"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              <p className="text-gray-300 text-lg mb-6">{testimonial.content}</p>

              <div className="flex items-center gap-4">
                <div className="text-4xl">{testimonial.image}</div>
                <div>
                  <p className="text-white font-semibold">{testimonial.author}</p>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
