import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Contact } from '../../types/contact';

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) setContacts(data);
    setLoading(false);
  };

  const addContact = async (payload: Partial<Contact>) => {
    const { data, error } = await supabase
      .from('contacts')
      .insert(payload)
      .select()
      .single();

    if (!error && data) setContacts((prev) => [data, ...prev]);
  };

  const updateContact = async (id: string, updates: Partial<Contact>) => {
    const prev = contacts;
    setContacts((p) => p.map((c) => (c.id === id ? { ...c, ...updates } : c)));

    const { error } = await supabase.from('contacts').update(updates).eq('id', id);
    if (error) setContacts(prev);
  };

  const removeContact = async (id: string) => {
    const prev = contacts;
    setContacts((p) => p.filter((c) => c.id !== id));

    const { error } = await supabase.from('contacts').delete().eq('id', id);
    if (error) setContacts(prev);
  };

  return { contacts, loading, addContact, updateContact, removeContact };
}