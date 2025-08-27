import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // useParams needed here
import { getPatientById, updatePatientHasAnalysisFlag } from '@/lib/services/patientService.js'; // Corrected imports
import { getAllAnalysesForPatient } from '@/lib/services/analysisService.js'; // Corrected import
import { useToast } from '@/components/ui/use-toast.js'; // Correct import for useToast

// Assuming updatePatientCurrentPhase is not directly used on results page logic,
// but rather through PatientPhaseManager component which might have its own logic.
// If it's needed directly: import { updatePatientCurrentPhase } from '@/lib/services/patientService.js'; 

export const useResultsPageLogic = () => {
  const { patientId } = useParams(); // Get patientId from URL
  const navigate = useNavigate();
  const { toast } = useToast();

  const [patient, setPatient] = useState(null);
  const [currentAnalysis, setCurrentAnalysis] = useState(null);
  const [allAnalyses, setAllAnalyses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Phase related states - these are now primarily driven by patient data itself
  // And PatientPhaseManager will handle its own updates.
  // This hook mainly focuses on fetching and displaying analysis data.
  // We might still need to pass some initial phase info to components.
  const [currentPhaseNumber, setCurrentPhaseNumber] = useState(1);
  const [phaseStartDate, setPhaseStartDate] = useState(null);
  const [currentPhaseIdPk, setCurrentPhaseIdPk] = useState(null);


  const fetchData = useCallback(async () => {
    if (!patientId) {
      toast({ title: "Erro", description: "ID do paciente não fornecido para buscar resultados.", variant: "destructive" });
      navigate('/');
      return;
    }
    setIsLoading(true);
    try {
      const patientResponse = await getPatientById(patientId);
      if (patientResponse.success && patientResponse.data) {
        setPatient(patientResponse.data);
        // Initialize phase info from patient data
        // setCurrentPhaseNumber(patientResponse.data.current_phase_number || 1);
        // setPhaseStartDate(patientResponse.data.phase_start_date);
        // setCurrentPhaseIdPk(patientResponse.data.current_phase_id_pk); // Ensure this field exists or map it
      } else {
        toast({ title: "Erro ao Buscar Paciente", description: patientResponse.error?.message || "Paciente não encontrado.", variant: "destructive" });
        navigate('/');
        setIsLoading(false);
        return;
      }

      const analysesResponse = await getAllAnalysesForPatient(patientId);
      if (analysesResponse.data) {
        const sortedAnalyses = [...analysesResponse.data].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setAllAnalyses(sortedAnalyses);
        
        if (sortedAnalyses.length > 0) {
          const latestAnalysis = sortedAnalyses[0];
          // Check if results and categories are valid
          if (latestAnalysis && latestAnalysis.results && typeof latestAnalysis.results.categories === 'object' && latestAnalysis.results.categories !== null && Object.keys(latestAnalysis.results.categories).length > 0) {
              setCurrentAnalysis(latestAnalysis);
          } else {
              setCurrentAnalysis(null); // Set to null if data is incomplete for rendering charts
              if (latestAnalysis) { // If an analysis exists but is faulty
                toast({ 
                  title: "Dados da Análise Incompletos", 
                  description: "A análise mais recente não contém dados de categorias válidos para os gráficos. Pode ser necessário realizar uma nova análise.", 
                  variant: "warning", 
                  duration: 7000 
                });
              }
          }
        } else {
          setCurrentAnalysis(null); // No analyses found
        }
      } else {
         toast({ title: "Erro ao Carregar Análises", description: analysesResponse.error?.message || "Não foi possível buscar as análises.", variant: "destructive" });
         setAllAnalyses([]);
         setCurrentAnalysis(null);
      }

    } catch (error) {
      console.error("Error fetching results page data:", error);
      toast({ title: "Erro Crítico ao Carregar Resultados", description: "Ocorreu um erro inesperado. Tente novamente.", variant: "destructive" });
      setAllAnalyses([]);
      setCurrentAnalysis(null);
    } finally {
      setIsLoading(false);
    }
  }, [patientId, toast, navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  // handlePhaseUpdate could be here if ResultsPage directly manages phase changes,
  // but it's better encapsulated in PatientPhaseManager.
  // If PatientPhaseManager updates and then calls a refresh function passed from here,
  // then we might need to re-fetch patient data or just update local state if the manager returns all needed info.
  const handlePhaseUpdate = (newPhaseData) => {
    // Example: called by PatientPhaseManager after a successful update
    // setPatient(prev => ({ ...prev, ...newPhaseData })); // Update patient state
    // Or simply:
    fetchData(); // Re-fetch all data to ensure consistency
    toast({ title: "Fase Atualizada", description: "A fase do paciente foi atualizada com sucesso.", className: "bg-green-500 text-white"});
  };
  
  const handlePrint = () => window.print();

  const handleShare = async () => {
    if (navigator.share && patient) {
      try {
        await navigator.share({
          title: `Resultados Quânticos de ${patient.full_name}`,
          text: `Confira os resultados da análise quântica de ${patient.full_name}.`,
          url: window.location.href,
        });
      } catch (error) {
        toast({ title: "Erro ao compartilhar", description: "Não foi possível compartilhar.", variant: "destructive" });
      }
    } else {
      toast({ title: "Não Suportado", description: "Compartilhamento não suportado neste navegador ou dados do paciente indisponíveis.", variant: "warning" });
    }
  };
  
  const handleNewAnalysis = () => {
    if(patientId) navigate(`/quantum-analysis/${patientId}`);
  };

  return { 
    patient, 
    currentAnalysis, 
    allAnalyses, 
    isLoading, 
    fetchData, // Expose for potential manual refresh
    // Phase info is now derived from patient object within components or managed by PatientPhaseManager
    // currentPhaseNumber, 
    // phaseStartDate, 
    // currentPhaseIdPk, 
    handlePhaseUpdate, // Pass this to PatientPhaseManager
    handlePrint,
    handleShare,
    handleNewAnalysis // Expose for action button
  };
};