import React from 'react';
import { motion } from 'framer-motion';
import useDashboardLogic from '@/hooks/useDashboardLogic.js'; 
import DashboardHeader from '@/components/dashboard/DashboardHeader.jsx';
import DashboardStats from '@/components/dashboard/DashboardStats.jsx';
import DashboardTabs from '@/components/dashboard/DashboardTabs.jsx';
import { Loader2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext.jsx';

const DashboardPage = () => {
  const { session } = useAuth();
  const {
    patients,
    isLoading,
    error,
    stats,
    searchTerm,
    setSearchTerm,
    handlePatientAction,
    handleDeletePatient,
    loadData,
    handleNewPatient,
  } = useDashboardLogic(session);

  const navigate = useNavigate();

  if (!session || !session.user) {
     return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center quantum-card bg-slate-800/70">
        <AlertTriangle className="w-16 h-16 text-yellow-400 mb-4" />
        <h2 className="text-2xl font-semibold mb-2 text-yellow-300">Sessão Inválida</h2>
        <p className="text-slate-300 mb-6">
          Não foi possível carregar os dados do painel. Parece que você não está autenticado.
        </p>
        <Button onClick={() => navigate('/login')} className="quantum-glow bg-yellow-500 hover:bg-yellow-600 text-black">
          Ir para Login
        </Button>
      </div>
    );
  }

  const userName = session?.user?.user_metadata?.full_name || session?.user?.email || "Terapeuta";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="container mx-auto py-8 px-2 md:px-4"
    >
      <DashboardHeader 
        userName={userName}
        patientCount={stats.total}
        onNewPatient={handleNewPatient}
      />
      
      <DashboardStats stats={stats} />

      {error && (
        <div className="mt-10 p-10 bg-red-800/30 border border-red-700 rounded-lg shadow-xl text-center">
          <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-red-300 mb-2">Oops! Algo deu errado.</h3>
          <p className="text-red-200 mb-4">{error}</p>
          <Button
            onClick={loadData}
            className="quantum-glow bg-red-500 hover:bg-red-600 text-white"
          >
            Tentar Novamente
          </Button>
        </div>
      )}

      {!error && (
        <DashboardTabs
          patients={patients}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isLoading={isLoading}
          handlePatientAction={handlePatientAction}
          handleDeletePatient={handleDeletePatient}
          handleNewPatient={handleNewPatient}
          onTherapistUpdate={loadData}
        />
      )}
    </motion.div>
  );
};

export default DashboardPage;