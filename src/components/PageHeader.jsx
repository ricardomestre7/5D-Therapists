import React from 'react';
import { motion } from 'framer-motion';

const PageHeader = ({ title, description, icon: Icon }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "circOut" }}
      className="mb-8 pb-6 border-b border-slate-700"
    >
      <div className="flex items-center space-x-3">
        {Icon && <Icon className="h-10 w-10 text-purple-400" />}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            {title}
          </h1>
          {description && (
            <p className="mt-1 text-base md:text-lg text-slate-400">{description}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PageHeader;