import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ChevronLeft, Send, AlertTriangle, Loader2 } from 'lucide-react';
import QuantumAnalysisTabs from '@/components/quantumAnalysis/QuantumAnalysisTabs.jsx';
import QuantumAnalysisHeader from '@/components/quantumAnalysis/QuantumAnalysisHeader.jsx';
import { useQuantumAnalysisPageLogic } from '@/hooks/useQuantumAnalysisPageLogic.js';
import QuantumQuestionnaire from '@/components/quantumAnalysis/QuantumQuestionnaire.jsx';


const QuantumAnalysisPage = () => {
  const navigate = useNavigate();

  const {
    patient,
    answers,
    currentTab,
    setCurrentTab,
    isLoading,
    isSubmitting,
    handleAnswerChange,
    handleSubmit,
    isFormComplete,
    totalQuestions,
    answeredQuestions,
    quantumQuestions,
    handleNextTab,
    handlePrevTab,
    isFirstTab,
    isLastTab,
  } = useQuantumAnalysisPageLogic();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <Loader2 className="h-12 w-12 text-purple-400 animate-spin" />
        <p className="ml-4 text-lg text-slate-300">Carregando análise quântica...</p>
      </div>
    );
  }

  if (!patient) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center p-4 m-4"
      >
        <AlertTriangle className="w-20 h-20 text-red-400 mb-6" />
        <h2 className="text-3xl font-bold mb-3 text-slate-100">Paciente Não Encontrado</h2>
        <p className="text-slate-300 mb-8 text-lg max-w-md">
          Não foi possível carregar os dados do paciente. Verifique se o ID está correto ou tente novamente.
        </p>
        <Button 
          onClick={() => navigate('/')} 
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-3 text-lg"
        >
          <ChevronLeft className="mr-2 h-5 w-5" />
          Voltar ao Painel
        </Button>
      </motion.div>
    );
  }

  const progress = totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="container mx-auto p-4 md:p-6 lg:p-8"
    >
      <div className="bg-slate-800 shadow-2xl rounded-xl border border-slate-700 p-6">
        <QuantumAnalysisHeader patientName={patient.full_name} progress={progress} onBack={() => navigate(-1)} />
        
        <QuantumAnalysisTabs
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          questionsByCategory={quantumQuestions}
        >
          {(categoryKey, questions) => (
            <QuantumQuestionnaire
              category={categoryKey}
              questions={questions}
              answers={answers}
              onAnswerChange={handleAnswerChange}
              onNextTab={handleNextTab}
              onPrevTab={handlePrevTab}
              isFirstTab={isFirstTab}
              isLastTab={isLastTab}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              isFormComplete={isFormComplete}
            />
          )}
        </QuantumAnalysisTabs>
      </div>
    </motion.div>
  );
};

export default QuantumAnalysisPage;