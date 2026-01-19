import { motion } from 'framer-motion';
import { Instagram, Truck, ShoppingBag, Play, Droplet } from 'lucide-react';

const companies = [
  { name: 'Instagram', icon: Instagram },
  { name: 'Uber', icon: Truck },
  { name: 'Shopify', icon: ShoppingBag },
  { name: 'Netflix', icon: Play },
  { name: 'Dropbox', icon: Droplet },
];

export default function TrustedBy() {
  return (
    <section className="py-16 px-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-gray-500 uppercase tracking-wider mb-12"
        >
          Trusted by forward-thinkers at
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
          {companies.map((company, index) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              className="flex items-center justify-center gap-2 text-gray-600 hover:text-gray-400 transition-colors cursor-pointer"
            >
              <company.icon className="w-6 h-6" />
              <span className="font-semibold">{company.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
