import { motion, AnimatePresence } from 'framer-motion';
import { X, Briefcase, DollarSign, Calendar, Star } from 'lucide-react';
import { useState } from 'react';

interface ApplicationData {
  id?: string;
  company: string;
  position: string;
  status: 'applied' | 'interviewing' | 'offer' | 'rejected';
  salary?: string;
  jobUrl?: string;
  interviewDate?: string;
  rating?: number;
  notes?: string;
}

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ApplicationData) => void;
  initialData?: ApplicationData;
  isLoading?: boolean;
}

export default function ApplicationModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading = false,
}: ApplicationModalProps) {
  const [formData, setFormData] = useState<ApplicationData>(
    initialData || {
      company: '',
      position: '',
      status: 'applied',
      salary: '',
      jobUrl: '',
      interviewDate: '',
      rating: 3,
      notes: '',
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
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
            <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 max-w-2xl w-full pointer-events-auto max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {initialData ? 'Edit Application' : 'Add New Application'}
                </h2>
                <button onClick={onClose} className="text-gray-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Company Name
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g., Google"
                        required
                        className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Position</label>
                    <input
                      type="text"
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      placeholder="e.g., Senior Product Manager"
                      required
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          status: e.target.value as 'applied' | 'interviewing' | 'offer' | 'rejected',
                        })
                      }
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                    >
                      <option value="applied">Applied</option>
                      <option value="interviewing">Interviewing</option>
                      <option value="offer">Offer</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Salary Range</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="text"
                        value={formData.salary}
                        onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                        placeholder="e.g., $150k - $180k"
                        className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Job URL</label>
                    <input
                      type="url"
                      value={formData.jobUrl}
                      onChange={(e) => setFormData({ ...formData, jobUrl: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Interview Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="date"
                        value={formData.interviewDate}
                        onChange={(e) => setFormData({ ...formData, interviewDate: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Rating</label>
                    <div className="flex items-center gap-1 bg-gray-900 border border-gray-700 rounded-lg p-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <motion.button
                          key={star}
                          type="button"
                          whileHover={{ scale: 1.2 }}
                          onClick={() => setFormData({ ...formData, rating: star })}
                          className="p-1 transition-colors"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= (formData.rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'
                            }`}
                          />
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Notes</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Add any notes about this application..."
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                </div>

                <div className="flex gap-4">
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Saving...' : 'Save Application'}
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="flex-1 py-3 border border-gray-700 text-white font-semibold rounded-lg hover:border-gray-600 transition-colors"
                  >
                    Cancel
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
