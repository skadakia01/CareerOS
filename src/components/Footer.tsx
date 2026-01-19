import { motion } from 'framer-motion';
import { Briefcase, Twitter, Linkedin, Github } from 'lucide-react';

const footerLinks = {
  Product: ['Features', 'Pricing', 'Integrations', 'Changelog'],
  Resources: ['Blog', 'Job Search Guide', 'Resume Templates', 'Community'],
  Company: ['About', 'Careers', 'Privacy', 'Terms'],
};

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-5 gap-12 mb-12">
          <div className="md:col-span-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 mb-4"
            >
              <Briefcase className="w-8 h-8 text-white" />
              <span className="text-2xl font-bold text-white">Career OS</span>
            </motion.div>
            <p className="text-gray-400 mb-6 max-w-sm">
              The intelligent platform for ambitious professionals navigating their career journey
              with precision and purpose.
            </p>
            <div className="flex gap-4">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-semibold mb-4">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 5 }}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2024 Career OS. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">
            Built with ❤️ for ambitious professionals
          </p>
        </div>
      </div>
    </footer>
  );
}
