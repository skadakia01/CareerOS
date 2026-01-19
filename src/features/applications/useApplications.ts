import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { ApplicationDB, Application } from '../../types/application';
import { mapDBToApplication } from './application.mapper';

export function useApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('application_date', { ascending: false });

    if (!error && data) {
      setApplications(data.map(mapDBToApplication));
    }

    setLoading(false);
  };

  const addApplication = async (payload: {
    company: string;
    position: string;
    status: Application['status'];
    appliedDate: string;
    user_id: string;
  }) => {
    const { data, error } = await supabase
      .from('applications')
      .insert({
        company_name: payload.company,
        position: payload.position,
        status: payload.status,
        application_date: payload.appliedDate,
        user_id: payload.user_id,
      })
      .select()
      .single();

    if (!error && data) {
      setApplications((prev) => [
        mapDBToApplication(data),
        ...prev,
      ]);
    }
  };

  const editApplication = async (
    id: string,
    updates: Partial<Application>
  ) => {
    const previous = applications;

    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updates } : a))
    );

    const { error } = await supabase
      .from('applications')
      .update({
        company_name: updates.company,
        position: updates.position,
        status: updates.status,
        application_date: updates.appliedDate,
      })
      .eq('id', id);

    if (error) {
      setApplications(previous);
      throw error;
    }
  };

  const removeApplication = async (id: string) => {
    setApplications((prev) => prev.filter((a) => a.id !== id));
    await supabase.from('applications').delete().eq('id', id);
  };

  return {
    applications,
    loading,
    addApplication,
    editApplication,
    removeApplication,
  };
}