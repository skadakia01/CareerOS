import { motion, AnimatePresence } from 'framer-motion';
import { X, Briefcase, DollarSign, Calendar, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Application } from '../types/application';

/* ----------------------------------
   Form-only type (DO NOT use Application here)
---------------------------------- */
export interface ApplicationFormData {
  company: string;
  position: string;
  status: 'applied' | 'interviewing' | 'offer' | 'rejected';
  salary?: string;
  jobUrl?: string;
  interviewDate?: string;
  rating?: number;
  notes?: string;
}

/* ----------------------------------
   Props
---------------------------------- */
export interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ApplicationFormData) => void;
  initialData?: Application;
  isLoading?: boolean;
}

/* ----------------------------------
   Mapper: Domain → Form
---------------------------------- */
function mapApplicationToFormData(
  app?: Application
): ApplicationFormData {
  if (!app) {
    return {
      company: '',
      position: '',
      status: 'applied',
      salary: '',
      jobUrl: '',
      interviewDate: '',
      rating: 3,
      notes: '',
    };
  }

  return {
    company: app.company,
    position: app.position,
    status: app.status === 'accepted' ? 'offer' : app.status,
    salary: '',
    jobUrl: '',
    interviewDate: '',
    rating: 3,
    notes: '',
  };
}

/* ----------------------------------
   Component
---------------------------------- */
export default function ApplicationModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading = false,
}: ApplicationModalProps) {
  const [formData, setFormData] = useState<ApplicationFormData>(
    mapApplicationToFormData(initialData)
  );

  /* Reset form when modal opens or application changes */
  useEffect(() => {
    if (isOpen) {
      setFormData(mapApplicationToFormData(initialData));
    }
  }, [isOpen, initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
          >
            <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {initialData ? 'Edit Application' : 'Add New Application'}
                </h2>
                <button onClick={onClose} className="text-gray-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Company */}
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">
                      Company Name
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                        required
                        className="w-full pl-10 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white"
                      />
                    </div>
                  </div>

                  {/* Position */}
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">
                      Position
                    </label>
                    <input
                      value={formData.position}
                      onChange={(e) =>
                        setFormData({ ...formData, position: e.target.value })
                      }
                      required
                      className="w-full py-3 px-4 bg-gray-900 border border-gray-700 rounded-lg text-white"
                    />
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          status: e.target.value as ApplicationFormData['status'],
                        })
                      }
                      className="w-full py-3 px-4 bg-gray-900 border border-gray-700 rounded-lg text-white"
                    >
                      <option value="applied">Applied</option>
                      <option value="interviewing">Interviewing</option>
                      <option value="offer">Offer</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>

                  {/* Salary */}
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">
                      Salary Range
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        value={formData.salary}
                        onChange={(e) =>
                          setFormData({ ...formData, salary: e.target.value })
                        }
                        className="w-full pl-10 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    Notes
                  </label>
                  <textarea
                    rows={4}
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    className="w-full py-3 px-4 bg-gray-900 border border-gray-700 rounded-lg text-white"
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 py-3 bg-white text-black rounded-lg font-semibold disabled:opacity-50"
                  >
                    {isLoading ? 'Saving…' : 'Save Application'}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-3 border border-gray-700 text-white rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}