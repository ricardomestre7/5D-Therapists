import React from 'react';
import { motion } from 'framer-motion';

const ManageTechniquesHeader = () => {
  return (
    <header className="mb-10 text-center">
      <motion.h1 
        className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-sky-400 sm:text-5xl lg:text-6xl mb-3"
        initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }}
      >
        Gerenciar Minhas Técnicas
      </motion.h1>
      <motion.p 
        className="text-lg text-slate-400 max-w-2xl mx-auto"
        initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}
      >
        Adicione, edite e defina os parâmetros para suas terapias e técnicas personalizadas.
      </motion.p>
    </header>
  );
};

export default ManageTechniquesHeader;