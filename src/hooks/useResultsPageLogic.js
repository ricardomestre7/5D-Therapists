import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast.js';
import { getPatientById } from '@/lib/services/patientService.js';
import { getAllAnalysesForPatient } from '@/lib/services/analysisService.js';
import { getAllJourneyEventsForPatient, getAllTechniqueEvaluationsForPatient } from '@/lib/services/journeyService.js';
import { getAllTechniques } from '@/lib/services/techniquesService.js';


export const useResultsPageLogic = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [patient, setPatient] = useState(null);
  const [currentAnalysis, setCurrentAnalysis] = useState(null);
  const [allAnalyses, setAllAnalyses] = useState([]);
  const [journeyEvents, setJourneyEvents] = useState([]);
  const [techniqueEvaluations, setTechniqueEvaluations] = useState([]);
  const [therapyKnowledgeBase, setTherapyKnowledgeBase] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [currentPhaseNumber, setCurrentPhaseNumber] = useState(1);
  const [phaseStartDate, setPhaseStartDate] = useState(null);
  const [currentPhaseIdPk, setCurrentPhaseIdPk] = useState(null);

  
  const fetchData = useCallback(async () => {
    if (!patientId) {
      toast({ title: "Erro", description: "ID do paciente não fornecido.", variant: "destructive" });
      navigate('/');
      return;
    }
    setIsLoading(true);
    try {
      const [
        patientResponse,
        analysesResponse,
        journeyEventsResponse,
        techniqueEvaluationsResponse,
        therapyKnowledgeResponse
      ] = await Promise.all([
        getPatientById(patientId),
        getAllAnalysesForPatient(patientId),
        getAllJourneyEventsForPatient(patientId),
        getAllTechniqueEvaluationsForPatient(patientId),
        getAllTechniques()
      ]);

      if (patientResponse.success && patientResponse.data) {
        setPatient(patientResponse.data);
        setCurrentPhaseNumber(patientResponse.data.current_phase_number || 1);
        setPhaseStartDate(patientResponse.data.phase_start_date);
        setCurrentPhaseIdPk(patientResponse.data.current_phase_id_pk);
      } else {
        toast({ title: "Erro", description: patientResponse.error?.message || "Paciente não encontrado.", variant: "destructive" });
        navigate('/');
        setIsLoading(false);
        return;
      }

      if (analysesResponse.data) {
        const sortedAnalyses = [...analysesResponse.data].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setAllAnalyses(sortedAnalyses);
        
        if (sortedAnalyses.length > 0) {
          const latestAnalysis = sortedAnalyses[0];
          if (latestAnalysis && latestAnalysis.results && latestAnalysis.results.categories && Object.keys(latestAnalysis.results.categories).length > 0) {
              setCurrentAnalysis(latestAnalysis);
          } else {
              setCurrentAnalysis(null); 
              if (latestAnalysis) {
                toast({ 
                  title: "Dados da Análise Incompletos", 
                  description: "A análise mais recente não contém dados de categorias válidos.", 
                  variant: "warning", 
                  duration: 6000 
                });
              }
          }
        } else {
          setCurrentAnalysis(null);
        }
      } else {
         setAllAnalyses([]);
         setCurrentAnalysis(null);
         if(analysesResponse.error) toast({ title: "Erro ao Carregar Análises", description: analysesResponse.error?.message, variant: "destructive" });
      }

      if (journeyEventsResponse.data) {
        setJourneyEvents(journeyEventsResponse.data);
      } else {
        setJourneyEvents([]);
        if(journeyEventsResponse.error) toast({ title: "Erro ao Carregar Jornada", description: journeyEventsResponse.error?.message, variant: "warning" });
      }
      
      if (techniqueEvaluationsResponse.data) {
        setTechniqueEvaluations(techniqueEvaluationsResponse.data);
      } else {
         setTechniqueEvaluations([]);
         if(techniqueEvaluationsResponse.error) toast({ title: "Erro ao Carregar Avaliações", description: techniqueEvaluationsResponse.error?.message, variant: "warning" });
      }
      
      if(therapyKnowledgeResponse.data) {
        setTherapyKnowledgeBase(therapyKnowledgeResponse.data);
      } else {
        setTherapyKnowledgeBase([]);
        if(therapyKnowledgeResponse.error) toast({ title: "Erro ao Carregar Base de Conhecimento", description: therapyKnowledgeResponse.error?.message, variant: "warning" });
      }


    } catch (error) {
      toast({ title: "Erro Crítico ao Carregar", description: "Ocorreu um erro inesperado ao carregar os dados da página.", variant: "destructive" });
      setPatient(null);
      setAllAnalyses([]);
      setCurrentAnalysis(null);
      setJourneyEvents([]);
      setTechniqueEvaluations([]);
      setTherapyKnowledgeBase([]);
    } finally {
      setIsLoading(false);
    }
  }, [patientId, toast, navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePhaseUpdate = (newPhaseNumber, newPhaseStartDate, newPhaseIdPk) => {
    setCurrentPhaseNumber(newPhaseNumber);
    setPhaseStartDate(newPhaseStartDate);
    setCurrentPhaseIdPk(newPhaseIdPk);
    setPatient(prev => ({...prev, current_phase_number: newPhaseNumber, phase_start_date: newPhaseStartDate, current_phase_id_pk: newPhaseIdPk }));
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
      toast({ title: "Não Suportado", description: "Compartilhamento não suportado neste navegador.", variant: "warning" });
    }
  };
  
  const handleNewAnalysis = () => {
    if(patientId) navigate(`/quantum-analysis/${patientId}`);
  };

  return { 
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
  };
};