import React from 'react';
import { motion } from 'framer-motion';
import TechniqueCard from './TechniqueCard.jsx';

const TechniqueList = ({ techniques, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {techniques.map(tech => (
        <motion.div 
          key={tech.id} 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.4, ease: "easeOut" }}
          whileHover={{ scale: 1.03, boxShadow: "0px 10px 20px rgba(0, 255, 255, 0.2)" }}
          className="h-full"
        >
          <TechniqueCard
            technique={tech}
            onEdit={() => onEdit(tech)}
            onDelete={() => onDelete(tech.id)}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default TechniqueList;