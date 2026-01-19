import { motion } from 'framer-motion';
import { Plus, GripVertical, Trash2, Star } from 'lucide-react';
import { useState } from 'react';
import { Application } from '../types/application';




interface KanbanBoardProps {
  applications: Application[];
  onAddClick: () => void;
  onDeleteClick: (id: string) => void;
  onCardClick: (app: Application) => void;
  onStatusChange: (id: string, status: Application['status']) => void;
}

const statusConfig = {
  applied: { color: 'from-blue-500 to-blue-600', label: 'Applied', position: 0 },
  interviewing: { color: 'from-purple-500 to-purple-600', label: 'Interviewing', position: 1 },
  offer: { color: 'from-green-500 to-green-600', label: 'Offer', position: 2 },
  rejected: { color: 'from-red-500 to-red-600', label: 'Rejected', position: 3 },
};

export default function KanbanBoard({ applications, onAddClick, onDeleteClick, onCardClick }: KanbanBoardProps) {
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const columns = ['applied', 'interviewing', 'offer', 'rejected'] as const;
  const getAppsForStatus = (status: string) => applications.filter((app) => app.status === status);

  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-6 min-w-max">
        {columns.map((status, index) => {
          const apps = getAppsForStatus(status);
          const config = statusConfig[status as keyof typeof statusConfig];

          return (
            <motion.div
              key={status}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex-shrink-0 w-80"
            >
              <div className="bg-black/50 border border-gray-800 rounded-xl overflow-hidden">
                <div className={`bg-gradient-to-r ${config.color} p-4`}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-bold text-lg">{config.label}</h3>
                    <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {apps.length}
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-3 min-h-96 max-h-96 overflow-y-auto">
                  {apps.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <p className="text-sm">No applications yet</p>
                    </div>
                  ) : (
                    apps.map((app) => (
                      <motion.div
                        key={app.id}
                        draggable
                        onDragStart={() => setDraggedId(app.id)}
                        onDragEnd={() => setDraggedId(null)}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => onCardClick(app)}
                        className={`bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 cursor-move hover:shadow-lg transition-all border border-gray-700 hover:border-gray-600 ${
                          draggedId === app.id ? 'opacity-50' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <GripVertical className="w-4 h-4 text-gray-600 flex-shrink-0 mt-1" />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-white font-semibold text-sm truncate">{app.position}</h4>
                            <p className="text-gray-400 text-xs truncate">{app.company}</p>
                            <p className="text-gray-500 text-xs mt-2">Applied: {app.appliedDate}</p>

                            {app.rating && (
                              <div className="flex gap-1 mt-2">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-3 h-3 ${i < app.rating! ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteClick(app.id);
                            }}
                            className="text-red-400 hover:text-red-300 transition-colors flex-shrink-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </motion.div>
                    ))
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onAddClick}
                    className="w-full py-3 border-2 border-dashed border-gray-700 rounded-lg text-gray-400 hover:text-gray-300 hover:border-gray-600 transition-all flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Card
                  </motion.button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
