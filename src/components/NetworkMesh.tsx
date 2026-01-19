import { Contact } from '../types/contact';
import { motion } from 'framer-motion';

export default function NetworkMesh({ contacts }: { contacts: Contact[] }) {
  return (
    <div className="relative h-96 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6 overflow-hidden">
      {contacts.map((c, i) => (
        <motion.div
          key={c.id}
          className="absolute rounded-full bg-blue-600 text-white text-xs px-3 py-1"
          style={{
            top: `${(i * 37) % 80}%`,
            left: `${(i * 53) % 80}%`,
          }}
          whileHover={{ scale: 1.1 }}
        >
          {c.name}
        </motion.div>
      ))}

      <p className="absolute bottom-4 right-4 text-gray-500 text-xs">
        Network Mesh (visual overview)
      </p>
    </div>
  );
}