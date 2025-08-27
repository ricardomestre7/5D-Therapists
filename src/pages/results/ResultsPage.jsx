import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useResultsPageLogic } from '@/hooks/useResultsPageLogic.js';
import LoadingSpinner from '@/components/quantumAnalysis/LoadingSpinner.jsx';
import ResultsView from '@/components/results/ResultsView';
import NoAnalysisView from '@/components/results/NoAnalysisView';
import ErrorView from '@/components/results/ErrorView';

const ResultsPage = ({ userSession }) => {
  const navigate = useNavigate();
  const { patientId } = useParams();

  const {
    patient,
    currentAnalysis,
    allAnalyses,
    journeyEvents,
    techniqueEvaluations,
    therapyKnowledgeBase,
    isLoading,
    currentPhaseNumber,
    phaseStartDate,
    currentPhaseIdPk,
    handlePhaseUpdate,
    handlePrint,
    handleShare,
    handleNewAnalysis,
  } = useResultsPageLogic();

  if (isLoading) {
    return <LoadingSpinner message="Carregando resultados quânticos..." />;
  }

  if (!patient && !isLoading) {
    return <ErrorView message="Paciente não encontrado ou erro ao carregar dados." onBack={() => navigate('/')} />;
  }

  if (patient && !isLoading && allAnalyses.length === 0) {
    return (
      <NoAnalysisView
        patient={patient}
        currentPhaseNumber={currentPhaseNumber}
        phaseStartDate={phaseStartDate}
        currentPhaseIdPk={currentPhaseIdPk}
        onPhaseUpdate={handlePhaseUpdate}
        onBack={() => navigate('/')}
        onStartNewAnalysis={() => handleNewAnalysis()}
      />
    );
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

export default ResultsPage;