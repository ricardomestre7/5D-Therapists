import React from 'react';
import { Button } from '@/components/ui/button.jsx';
import { PlusCircle, Users, BarChart3 } from 'lucide-react';

const DashboardHeader = ({ onNewPatient, userName, patientCount }) => {
  return (
    <div className="mb-10">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            Painel 5D Therapists
          </h1>
          {userName && <p className="text-slate-400 text-lg mt-1">Bem-vindo(a) de volta, {userName}!</p>}
        </div>
        <Button 
          onClick={onNewPatient} 
          className="mt-4 sm:mt-0 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white py-3 px-6 text-base font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          Novo Paciente
        </Button>
      </div>
        <p className="text-slate-500 text-md">
            {patientCount > 0 ? `Você tem ${patientCount} paciente(s) cadastrado(s).` : "Nenhum paciente cadastrado ainda."}
        </p>
    </div>
  );
};

export default DashboardHeader;