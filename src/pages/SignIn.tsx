import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
      } else if (data?.user) {
        navigate('/dashboard');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setError('');
    setIsLoading(true);
    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: 'demo@careeros.com',
        password: 'demo123456',
      });

      if (authError) {
        alert('Demo account not available. Please sign up to create your account.');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black pt-24 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-400">Sign in to your Career OS account</p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-900/20 border border-red-800 rounded-lg text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
              {!isLoading && <ArrowRight className="w-4 h-4" />}
            </motion.button>
          </form>

          <div className="my-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-black text-gray-500">or</span>
            </div>
          </div>

          <motion.button
            onClick={handleDemoLogin}
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 border-2 border-gray-700 text-white font-semibold rounded-lg hover:border-gray-600 hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Try Demo Account
          </motion.button>

          <div className="mt-6 pt-6 border-t border-gray-800 text-center">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <motion.button
                whileHover={{ textDecoration: 'underline' }}
                onClick={() => navigate('/signup')}
                className="text-blue-400 hover:text-blue-300 transition-colors font-semibold"
              >
                Sign Up
              </motion.button>
            </p>
          </div>

          <p className="mt-4 text-xs text-gray-500 text-center">
            Forgot your password?{' '}
            <motion.button
              whileHover={{ textDecoration: 'underline' }}
              className="text-blue-400 hover:text-blue-300 transition-colors font-semibold"
            >
              Reset it
            </motion.button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
