import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Loader2, Save, UserPlus, ChevronLeft, AlertTriangle } from 'lucide-react';
import PatientFormHeader from '@/components/patientForm/PatientFormHeader.jsx';
import PatientFormFields from '@/components/patientForm/PatientFormFields.jsx';
import { usePatientFormLogic } from '@/hooks/usePatientFormLogic.jsx';
import { useAuth } from '@/contexts/SupabaseAuthContext.jsx';

const PatientDataFormPage = () => {
  const { session } = useAuth();
  const navigate = useNavigate();
  const { patientId } = useParams();
  
  const {
    formData,
    isLoading,
    isSubmitting,
    isEditing,
    error,
    therapists,
    formStructure,
    handleInputChange,
    handleSelectChange,
    handleSubmit,
  } = usePatientFormLogic(patientId);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-theme(space.24))] p-6">
        <Loader2 className="h-16 w-16 text-purple-400 animate-spin mb-6" />
        <p className="text-xl text-slate-300">
          Carregando dados...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-theme(space.24))] p-6 text-center">
        <AlertTriangle className="h-16 w-16 text-red-500 mb-6" />
        <h2 className="text-2xl font-semibold text-red-400 mb-3">Erro ao Carregar Dados</h2>
        <p className="text-slate-300 mb-6">{error}</p>
        <Button onClick={() => navigate(-1) || navigate('/')} variant="outline" className="text-purple-300 border-purple-500 hover:bg-purple-500/20">
          <ChevronLeft className="mr-2 h-5 w-5" />
          Voltar
        </Button>
      </div>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto p-4 sm:p-6 md:p-8 bg-slate-850 rounded-xl shadow-2xl border border-slate-700/50"
    >
      <PatientFormHeader isEditMode={isEditing} patientName={formData.full_name} />
      
      <form onSubmit={(e) => handleSubmit(e, session)} className="space-y-10 mt-8">
        <PatientFormFields
          formStructure={formStructure}
          formData={formData}
          handleInputChange={handleInputChange} 
          onSelectChange={handleSelectChange}
          therapists={therapists}
        />

        <div className="pt-8 flex flex-col sm:flex-row justify-end items-center gap-4 border-t border-slate-700">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto text-slate-300 border-slate-600 hover:bg-slate-700 hover:text-white"
            disabled={isSubmitting}
          >
            <ChevronLeft className="mr-2 h-5 w-5" /> Cancelar
          </Button>
          <Button
            type="submit"
            className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 px-8 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              isEditing ? <Save className="mr-2 h-5 w-5" /> : <UserPlus className="mr-2 h-5 w-5" />
            )}
            {isSubmitting ? (isEditing ? 'Salvando Alterações...' : 'Cadastrando Paciente...') : (isEditing ? 'Salvar Alterações' : 'Cadastrar Paciente')}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default PatientDataFormPage;