import React from 'react';
import { useDashboardLogic } from '@/hooks/useDashboardLogic.jsx';
import DashboardContent from '@/components/dashboard/DashboardContent.jsx';
import LoadingSpinner from '@/components/quantumAnalysis/LoadingSpinner.jsx';

const DashboardPage = () => {
  const dashboardLogic = useDashboardLogic();
  
  if (dashboardLogic.isLoading && !dashboardLogic.patients.length) {
    return <LoadingSpinner message="Carregando painel de controle Lumina Restauris..." />;
  }

  return (
    <div className="space-y-8 p-4 md:p-6 lg:p-8">
      <DashboardContent {...dashboardLogic} />
    </div>
  );
};

export default DashboardPage;