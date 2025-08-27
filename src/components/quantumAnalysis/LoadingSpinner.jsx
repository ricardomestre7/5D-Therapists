import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ message = "Carregando..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-theme(space.24))] p-6 bg-slate-900/50 text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="mb-6"
      >
        <Loader2 className="h-16 w-16 text-purple-400" />
      </motion.div>
      <h2 className="text-xl font-semibold text-purple-300 mb-2">{message}</h2>
      <p className="text-slate-400">Por favor, aguarde um momento.</p>
    </div>
  );
};

export default LoadingSpinner;