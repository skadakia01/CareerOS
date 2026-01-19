import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Target, LogOut, Settings, Plus, MessageSquare, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import KanbanBoard from '../components/KanbanBoard';
import ApplicationModal from '../components/ApplicationModal';
import ResumeOptimizer from '../components/ResumeOptimizer';
import InterviewPrep from '../components/InterviewPrep';
import AnalyticsDashboard from '../components/AnalyticsDashboard';

interface Application {
  id: string;
  company: string;
  position: string;
  status: 'applied' | 'interviewing' | 'offer' | 'rejected';
  appliedDate: string;
  rating?: number;
}

type Tab = 'overview' | 'kanban' | 'optimizer' | 'interview' | 'analytics';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedTab, setSelectedTab] = useState<Tab>('overview');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<Application | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate('/signin');
        return;
      }

      setUser(user);
    };

    checkUser();
  }, [navigate]);

  const mockApplications: Application[] = [
    {
      id: '1',
      company: 'Google',
      position: 'Senior Product Manager',
      status: 'interviewing',
      appliedDate: '2024-01-10',
      rating: 5,
    },
    {
      id: '2',
      company: 'Microsoft',
      position: 'UX Designer',
      status: 'applied',
      appliedDate: '2024-01-08',
      rating: 4,
    },
    {
      id: '3',
      company: 'Apple',
      position: 'iOS Developer',
      status: 'offer',
      appliedDate: '2024-01-05',
      rating: 5,
    },
    {
      id: '4',
      company: 'Amazon',
      position: 'Data Scientist',
      status: 'rejected',
      appliedDate: '2024-01-02',
      rating: 3,
    },
    {
      id: '5',
      company: 'Meta',
      position: 'Engineering Manager',
      status: 'applied',
      appliedDate: '2024-01-12',
      rating: 4,
    },
    {
      id: '6',
      company: 'Tesla',
      position: 'Software Engineer',
      status: 'interviewing',
      appliedDate: '2024-01-14',
      rating: 5,
    },
  ];

  useEffect(() => {
    setApplications(mockApplications);
  }, []);

  const handleLogOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const handleAddApplication = () => {
    setSelectedApplication(undefined);
    setIsModalOpen(true);
  };

  const handleEditApplication = (app: Application) => {
    setSelectedApplication(app);
    setIsModalOpen(true);
  };

  const handleDeleteApplication = (id: string) => {
    setApplications(applications.filter((app) => app.id !== id));
  };

  const handleSubmitApplication = (data: any) => {
    if (selectedApplication) {
      setApplications(
        applications.map((app) => (app.id === selectedApplication.id ? { ...app, ...data } : app))
      );
    } else {
      setApplications([
        ...applications,
        {
          ...data,
          id: Math.random().toString(),
          appliedDate: new Date().toISOString().split('T')[0],
        },
      ]);
    }
    setIsModalOpen(false);
  };

  const stats = {
    total: applications.length,
    interviews: applications.filter((a) => a.status === 'interviewing').length,
    offers: applications.filter((a) => a.status === 'offer').length,
    conversionRate:
      applications.length > 0
        ? (
            ((applications.filter((a) => a.status === 'offer').length +
              applications.filter((a) => a.status === 'interviewing').length) /
              applications.length) *
            100
          ).toFixed(1)
        : 0,
  };

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'kanban', label: 'Kanban Board', icon: <Target className="w-5 h-5" /> },
    { id: 'optimizer', label: 'Resume Optimizer', icon: <Zap className="w-5 h-5" /> },
    { id: 'interview', label: 'Interview Prep', icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'analytics', label: 'Analytics', icon: <TrendingUp className="w-5 h-5" /> },
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-black pt-24 flex items-center justify-center">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-gray-400"
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12"
        >
          <div>
            <h1 className="text-4xl font-bold text-white">
              Welcome back, <span className="text-blue-400">{user.user_metadata?.full_name || 'User'}</span>!
            </h1>
            <p className="text-gray-400 mt-2">Manage your career journey with intelligent tools</p>
          </div>

          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddApplication}
              className="flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Plus className="w-5 h-5" />
              New Application
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 border border-gray-700 text-white rounded-lg hover:border-gray-600 transition-colors"
            >
              <Settings className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogOut}
              className="flex items-center gap-2 px-6 py-3 border border-red-800 text-red-400 rounded-lg hover:border-red-700 transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>

        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex gap-2 min-w-max">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                  selectedTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {tab.icon}
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>

        {selectedTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { icon: Target, label: 'Total Applications', value: stats.total, gradient: 'from-blue-500 to-blue-600' },
                { icon: BarChart3, label: 'Interviews', value: stats.interviews, gradient: 'from-purple-500 to-purple-600' },
                { icon: TrendingUp, label: 'Offers', value: stats.offers, gradient: 'from-green-500 to-green-600' },
                { icon: Users, label: 'Conversion Rate', value: `${stats.conversionRate}%`, gradient: 'from-orange-500 to-orange-600' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className={`bg-gradient-to-br ${stat.gradient} rounded-xl p-6 text-white`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <stat.icon className="w-8 h-8 opacity-80" />
                  </div>
                  <p className="text-sm opacity-80 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Recent Applications</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {applications.slice(0, 5).map((app, i) => (
                  <motion.div
                    key={app.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ x: 5 }}
                    onClick={() => handleEditApplication(app)}
                    className="flex items-center justify-between p-4 bg-black/50 border border-gray-800 rounded-xl hover:border-gray-700 transition-all cursor-pointer"
                  >
                    <div className="flex-1">
                      <h4 className="text-white font-semibold">{app.position}</h4>
                      <p className="text-gray-400 text-sm">{app.company}</p>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${
                      app.status === 'applied' ? 'bg-blue-900/20 text-blue-400' :
                      app.status === 'interviewing' ? 'bg-purple-900/20 text-purple-400' :
                      app.status === 'offer' ? 'bg-green-900/20 text-green-400' :
                      'bg-red-900/20 text-red-400'
                    }`}>
                      {app.status}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {selectedTab === 'kanban' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <KanbanBoard
              applications={applications}
              onAddClick={handleAddApplication}
              onDeleteClick={handleDeleteApplication}
              onCardClick={handleEditApplication}
            />
          </motion.div>
        )}

        {selectedTab === 'optimizer' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <ResumeOptimizer />
          </motion.div>
        )}

        {selectedTab === 'interview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <InterviewPrep />
          </motion.div>
        )}

        {selectedTab === 'analytics' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AnalyticsDashboard />
          </motion.div>
        )}
      </div>

      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitApplication}
        initialData={selectedApplication}
      />
    </div>
  );
}
