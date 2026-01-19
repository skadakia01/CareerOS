import { Contact } from '../types/contact';
import { motion } from 'framer-motion';

export default function ContactsList({
  contacts,
  onEdit,
  onDelete,
}: {
  contacts: Contact[];
  onEdit: (c: Contact) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="space-y-3">
      {contacts.map((c) => (
        <motion.div
          key={c.id}
          whileHover={{ y: -2 }}
          className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex justify-between"
        >
          <div>
            <h4 className="text-white font-semibold">{c.name}</h4>
            <p className="text-gray-400 text-sm">
              {c.position} @ {c.company}
            </p>
            <p className="text-xs text-gray-500">
              Last contact: {c.last_contact || '—'}
            </p>
          </div>

          <div className="flex gap-2">
            <button onClick={() => onEdit(c)} className="text-blue-400 text-sm">
              Edit
            </button>
            <button
              onClick={() => onDelete(c.id)}
              className="text-red-400 text-sm"
            >
              Delete
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}