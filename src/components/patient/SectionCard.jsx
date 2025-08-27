import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card.jsx';
import { motion } from 'framer-motion';

const SectionCard = ({ title, icon: Icon, children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-8"
    >
      <Card className="bg-slate-800/60 backdrop-blur-sm border-purple-500/20 shadow-xl">
        <CardHeader className="pb-4 border-b border-slate-700">
          <CardTitle className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 flex items-center">
            {Icon && <Icon className="mr-3 h-6 w-6 text-purple-400" />}
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SectionCard;