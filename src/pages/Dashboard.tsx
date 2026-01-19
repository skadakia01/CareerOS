import { motion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  Target,
  LogOut,
  Settings,
  Plus,
  MessageSquare,
  Zap,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import KanbanBoard from '../components/KanbanBoard';
import ApplicationModal from '../components/ApplicationModal';
import ResumeOptimizer from '../components/ResumeOptimizer';
import InterviewPrep from '../components/InterviewPrep';
import AnalyticsDashboard from '../components/AnalyticsDashboard';
import ContactsList from '../components/ContactsList';
import NetworkMesh from '../components/NetworkMesh';

import { useAuth } from './../hooks/useAuth';
import { useApplications } from './../features/applications/useApplications';
import { useContacts } from './../features/contacts/useContacts';

import { Application } from './../types/application';
import { Contact } from './../types/contact';
import { computeAnalytics } from '../features/analytics/analytics.utils';

type Tab =
  | 'overview'
  | 'kanban'
  | 'optimizer'
  | 'interview'
  | 'analytics'
  | 'contacts';

export default function Dashboard() {
  const navigate = useNavigate();

  /* ----------------------------------
     Auth + Data
  ---------------------------------- */
  const { user, loading: authLoading } = useAuth();

  const {
    applications,
    loading: appsLoading,
    addApplication,
    editApplication,
    removeApplication,
  } = useApplications();

  const {
    contacts,
    loading: contactsLoading,
    addContact,
    updateContact,
    removeContact,
  } = useContacts();

  /* ----------------------------------
     State
  ---------------------------------- */
  const [selectedTab, setSelectedTab] = useState<Tab>('overview');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] =
    useState<Application | undefined>();

  const [selectedContact, setSelectedContact] =
    useState<Contact | undefined>();

  /* ----------------------------------
     Loading & auth guard
  ---------------------------------- */
  if (authLoading || appsLoading || contactsLoading) {
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

  if (!user) {
    navigate('/signin');
    return null;
  }

  /* ----------------------------------
     Handlers
  ---------------------------------- */
  const handleLogOut = async () => {
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

  const handleDeleteApplication = async (id: string) => {
    await removeApplication(id);
  };

  const handleSubmitApplication = async (data: any) => {
    if (selectedApplication) {
      await editApplication(selectedApplication.id, data);
    } else {
      await addApplication({
        ...data,
        user_id: user.id,
        application_date: new Date().toISOString(),
      });
    }
    setIsModalOpen(false);
  };

  const handleStatusChange = async (
    id: string,
    status: Application['status']
  ) => {
    await editApplication(id, { status });
  };

  /* ----------------------------------
     Analytics
  ---------------------------------- */
  const analytics = computeAnalytics(applications);

  /* ----------------------------------
     Tabs
  ---------------------------------- */
  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'kanban', label: 'Kanban Board', icon: <Target className="w-5 h-5" /> },
    { id: 'optimizer', label: 'Resume Optimizer', icon: <Zap className="w-5 h-5" /> },
    { id: 'interview', label: 'Interview Prep', icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'analytics', label: 'Analytics', icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'contacts', label: 'Network', icon: <Users className="w-5 h-5" /> },
  ];

  /* ----------------------------------
     Render
  ---------------------------------- */
  return (
    <div className="min-h-screen bg-black pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between gap-6 mb-12"
        >
          <div>
            <h1 className="text-4xl font-bold text-white">
              Welcome back,&nbsp;
              <span className="text-blue-400">
                {user.user_metadata?.full_name || 'User'}
              </span>
            </h1>
            <p className="text-gray-400 mt-2">
              Manage your career journey with intelligent tools
            </p>
          </div>

          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={handleAddApplication}
              className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-lg"
            >
              <Plus className="w-5 h-5" />
              New Application
            </motion.button>

            <motion.button className="px-6 py-3 border border-gray-700 rounded-lg">
              <Settings className="w-5 h-5 text-white" />
            </motion.button>

            <motion.button
              onClick={handleLogOut}
              className="px-6 py-3 border border-red-800 text-red-400 rounded-lg"
            >
              <LogOut className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg ${
                  selectedTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Overview */}
        {selectedTab === 'overview' && (
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { label: 'Total Applications', value: analytics.totalApplications },
              { label: 'Interviews', value: analytics.interviews },
              { label: 'Offers', value: analytics.offers },
              { label: 'Conversion Rate', value: `${analytics.conversionRate}%` },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-gray-900 border border-gray-800 rounded-xl p-6"
              >
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Kanban */}
        {selectedTab === 'kanban' && (
          <KanbanBoard
            applications={applications}
            onAddClick={handleAddApplication}
            onDeleteClick={handleDeleteApplication}
            onCardClick={handleEditApplication}
            onStatusChange={handleStatusChange}
          />
        )}

        {selectedTab === 'optimizer' && <ResumeOptimizer />}
        {selectedTab === 'interview' && <InterviewPrep />}
        {selectedTab === 'analytics' && (
          <AnalyticsDashboard applications={applications} />
        )}

        {/* Contacts + Network Mesh */}
        {selectedTab === 'contacts' && (
          <div className="grid md:grid-cols-2 gap-6">
            <ContactsList
              contacts={contacts}
              onEdit={setSelectedContact}
              onDelete={removeContact}
            />
            <NetworkMesh contacts={contacts} />
          </div>
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