import { supabase } from '../../lib/supabase';
import { Application } from '../../types/application';

export async function getApplications() {
  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Application[];
}

export async function createApplication(
  app: Omit<Application, 'id' | 'created_at' | 'updated_at'>
) {
  const { data, error } = await supabase
    .from('applications')
    .insert(app)
    .select()
    .single();

  if (error) throw error;
  return data as Application;
}

export async function updateApplication(
  id: string,
  updates: Partial<Application>
) {
  const { data, error } = await supabase
    .from('applications')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Application;
}

export async function deleteApplication(id: string) {
  const { error } = await supabase
    .from('applications')
    .delete()
    .eq('id', id);

  if (error) throw error;
}