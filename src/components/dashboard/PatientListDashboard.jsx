import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, SearchX } from 'lucide-react';
import PatientCardDashboard from '@/components/dashboard/PatientCardDashboard.jsx';

const PatientListDashboard = ({ patients, isLoading, onPatientAction, onDeletePatient, searchTerm }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px] text-slate-400">
        <Loader2 className="h-12 w-12 animate-spin text-purple-400" />
        <p className="ml-3 text-lg">Carregando pacientes...</p>
      </div>
    );
  }
  
  // A mensagem de "nenhum paciente" agora é tratada no DashboardPage.jsx
  // para cobrir tanto a lista vazia inicial quanto a busca sem resultados.
  // Aqui, se a lista de pacientes estiver vazia e não estiver carregando,
  // significa que o DashboardPage já lidou com a mensagem de "nenhum paciente" (inicial ou por busca).
  // Este componente apenas renderiza a lista se ela existir.
  
  if (!isLoading && patients.length === 0 && searchTerm) {
     return (
      <div className="text-center py-12 my-8 bg-slate-800/50 rounded-xl shadow-lg">
        <SearchX className="mx-auto h-16 w-16 text-yellow-400 mb-6 opacity-70" />
        <h3 className="text-2xl font-semibold text-slate-300 mb-3">Nenhum Resultado</h3>
        <p className="text-slate-400 mb-6 max-w-md mx-auto">
          Não foram encontrados pacientes com o termo "{searchTerm}".<br/> Verifique a ortografia ou tente uma busca mais ampla.
        </p>
      </div>
    );
  }


  if (!isLoading && patients.length === 0 && !searchTerm) {
    // Não renderiza nada se a lista estiver vazia e não houver termo de busca,
    // pois DashboardPage.jsx lida com essa mensagem.
    return null; 
  }


  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
    >
      {patients.map((patient, index) => (
        <motion.div
          key={patient.id}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <PatientCardDashboard
            patient={patient}
            onAction={onPatientAction}
            onDelete={onDeletePatient}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default PatientListDashboard;