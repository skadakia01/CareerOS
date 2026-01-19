import { motion } from 'framer-motion';
import { Briefcase, Menu, X } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-lg border-b border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400 }}
            onClick={() => navigate('/')}
          >
            <Briefcase className="w-6 h-6 text-white" />
            <span className="text-xl font-bold text-white">Career OS</span>
          </motion.div>

          <nav className="hidden md:flex items-center gap-8">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className={`transition-colors ${
                    isActive('/dashboard') ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/features"
                  className={`transition-colors ${
                    isActive('/features') ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Features
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/features"
                  className={`transition-colors ${
                    isActive('/features') ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Features
                </Link>
                <Link
                  to="/pricing"
                  className={`transition-colors ${
                    isActive('/pricing') ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Pricing
                </Link>
                <Link
                  to="/methodology"
                  className={`transition-colors ${
                    isActive('/methodology') ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Methodology
                </Link>
              </>
            )}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/dashboard')}
                  className="text-gray-300 hover:text-white transition-colors font-medium"
                >
                  Dashboard
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={async () => {
                    await supabase.auth.signOut();
                    navigate('/');
                  }}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  Sign Out
                </motion.button>
              </>
            ) : (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/signin')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Sign In
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/signup')}
                  className="bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  Get Started
                </motion.button>
              </>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-4 pb-4 space-y-4 border-t border-gray-800 pt-4"
          >
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="block text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/features"
                  className="block text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Features
                </Link>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={async () => {
                    await supabase.auth.signOut();
                    navigate('/');
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  Sign Out
                </motion.button>
              </>
            ) : (
              <>
                <Link
                  to="/features"
                  className="block text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Features
                </Link>
                <Link
                  to="/pricing"
                  className="block text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link
                  to="/methodology"
                  className="block text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Methodology
                </Link>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    navigate('/signin');
                    setIsMenuOpen(false);
                  }}
                  className="w-full border border-gray-700 text-white px-6 py-2 rounded-lg font-medium hover:border-gray-600 transition-colors"
                >
                  Sign In
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    navigate('/signup');
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  Get Started
                </motion.button>
              </>
            )}
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
