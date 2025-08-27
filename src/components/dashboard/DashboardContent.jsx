import React from 'react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardStats from '@/components/dashboard/DashboardStats';
import DashboardTabs from '@/components/dashboard/DashboardTabs';

const DashboardContent = ({
  patients,
  searchTerm,
  setSearchTerm,
  stats,
  isLoading,
  handleNewPatient,
  handlePatientAction,
  handleDeletePatient,
  loadData,
}) => {
  return (
    <>
      <DashboardHeader onNewPatient={handleNewPatient} />
      <DashboardStats stats={stats} />
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
    </>
  );
};

export default DashboardContent;