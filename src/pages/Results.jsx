import React, { useEffect, useState } from 'react'; // Added useState
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { ChevronLeft, AlertTriangle } from 'lucide-react';

import ResultsHeader from '@/components/results/ResultsHeader';
import PatientDetailsCard from '@/components/results/PatientDetailsCard';
import AnalysisInfoCard from '@/components/results/AnalysisInfoCard';
import QuantumCharts from '@/components/results/QuantumCharts';
import PersonalizedRecommendations from '@/components/results/PersonalizedRecommendations';
import ResultsActions from '@/components/results/ResultsActions';
import EvolutionChart from '@/components/results/EvolutionChart';
import LoadingSpinner from '@/components/quantumAnalysis/LoadingSpinner';
import PatientPhaseManager from '@/components/results/PatientPhaseManager';

import { useResultsPageLogic } from '@/hooks/useResultsPageLogic'; 
import ResultsView from '@/components/results/ResultsView';
import NoAnalysisView from '@/components/results/NoAnalysisView';
import ErrorView from '@/components/results/ErrorView';
import { getAllTechniques } from '@/lib/services/techniquesService.js';


const Results = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [therapyKnowledgeBase, setTherapyKnowledgeBase] = useState([]); // State for therapy knowledge

  const {
    patient,
    currentAnalysis,
    allAnalyses,
    journeyEvents, // Added
    techniqueEvaluations, // Added
    isLoading,
    currentPhaseNumber,
    phaseStartDate,
    currentPhaseIdPk,
    handlePhaseUpdate,
    handlePrint,
    handleShare,
  } = useResultsPageLogic(patientId, toast, navigate);

  // Fetch therapy knowledge base
  useEffect(() => {
    const fetchTherapyKnowledge = async () => {
      const { data, error } = await getAllTechniques(); // Assuming this fetches all techniques
      if (error) {
        toast({ title: "Erro ao Carregar Base de Conhecimento", description: error.message, variant: "destructive" });
      } else {
        setTherapyKnowledgeBase(data || []);
      }
    };
    fetchTherapyKnowledge();
  }, [toast]);


  if (isLoading) return <LoadingSpinner message="Carregando resultados..." />;

  if (!patient && !isLoading) {
    return <ErrorView message="Paciente não encontrado." onBack={() => navigate('/')} />;
  }

  if (patient && !currentAnalysis && !isLoading && allAnalyses.length === 0) { // Check allAnalyses length
    return (
      <NoAnalysisView
        patient={patient}
        currentPhaseNumber={currentPhaseNumber}
        phaseStartDate={phaseStartDate}
        currentPhaseIdPk={currentPhaseIdPk}
        onPhaseUpdate={handlePhaseUpdate}
        onBack={() => navigate('/')}
        onStartNewAnalysis={() => navigate(`/quantum-analysis/${patientId}`)}
      />
    );
  }
  
  if (!patient) { // Removed currentAnalysis check here as it might be null legitimately if no analyses exist
     return <ErrorView message="Dados do paciente incompletos. Por favor, tente recarregar." onBack={() => window.location.reload()} backButtonText="Recarregar" />;
  }

  return (
    <ResultsView
      patient={patient}
      currentAnalysis={currentAnalysis}
      allAnalyses={allAnalyses}
      journeyEvents={journeyEvents}
      techniqueEvaluations={techniqueEvaluations}
      therapyKnowledgeBase={therapyKnowledgeBase}
      currentPhaseNumber={currentPhaseNumber}
      phaseStartDate={phaseStartDate}
      currentPhaseIdPk={currentPhaseIdPk}
      onPhaseUpdate={handlePhaseUpdate}
      onPrint={handlePrint}
      onShare={handleShare}
      onBack={() => navigate('/')}
    />
  );
};

export default Results;