import React from 'react';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, UserPlus, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PatientFormHeader = ({ isEditMode, patientName }) => {
  const navigate = useNavigate();
  const title = isEditMode ? `Editando: ${patientName || 'Paciente'}` : 'Novo Paciente';
  const Icon = isEditMode ? Edit : UserPlus;

  return (
    <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-700 dark:from-purple-700 dark:to-indigo-800 text-white p-6 rounded-t-xl">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full" onClick={() => navigate(-1)}>
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <CardTitle className="text-2xl font-bold tracking-tight text-center flex-grow truncate px-4">
          {title}
        </CardTitle>
        <Icon className="h-8 w-8 opacity-70" />
      </div>
    </CardHeader>
  );
};

export default PatientFormHeader;