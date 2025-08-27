import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast.js';
import { getPatientById } from '@/lib/services/patientService.js';
import { saveQuantumAnalysis } from '@/lib/services/analysisService.js';
import { quantumQuestions } from '@/lib/config/quantumQuestions.js';
import { calculateQuantumResults } from '@/lib/utils/analysisCalculations.js';

export const useQuantumAnalysisPageLogic = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [patient, setPatient] = useState(null);
  const [answers, setAnswers] = useState({});
  const [currentTab, setCurrentTab] = useState(Object.keys(quantumQuestions)[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchPatientData = useCallback(async () => {
    if (!patientId) {
      toast({ title: "Erro", description: "ID do paciente não fornecido.", variant: "destructive" });
      navigate('/');
      return;
    }
    setIsLoading(true);
    try {
      const response = await getPatientById(patientId);
      if (response.data) {
        setPatient(response.data);
      } else {
        toast({ title: "Erro", description: response.error?.message || "Paciente não encontrado.", variant: "destructive" });
        navigate('/');
      }
    } catch (error) {
      toast({ title: "Erro", description: "Não foi possível carregar os dados do paciente.", variant: "destructive" });
      navigate('/');
    } finally {
      setIsLoading(false);
    }
  }, [patientId, toast, navigate]);

  useEffect(() => {
    fetchPatientData();
  }, [fetchPatientData]);
  
  const handleAnswerChange = useCallback((questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  }, []);

  const totalQuestionsCount = Object.values(quantumQuestions).flat().length;
  const answeredQuestionsCount = Object.keys(answers).length;
  const isFormComplete = answeredQuestionsCount === totalQuestionsCount && 
                         Object.values(answers).every(answer => answer !== undefined && answer !== "");

  const handleSubmit = async () => {
    if (!isFormComplete) {
      toast({
        title: "Formulário Incompleto",
        description: "Por favor, responda todas as perguntas antes de submeter.",
        variant: "warning",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const resultsData = calculateQuantumResults(answers);
      
      const analysisPayload = {
        answers,
        results: { categories: resultsData.categories || {} },
        recommendations: resultsData.recommendations || [], 
      };

      const {data: savedAnalysis, error} = await saveQuantumAnalysis(patientId, analysisPayload);
      
      if (savedAnalysis && !error) {
        toast({
          title: "Análise Quântica Salva!",
          description: `A análise para ${patient.full_name} foi concluída com sucesso.`,
          className: "bg-green-500 text-white",
        });
        navigate(`/results/${patientId}`);
      } else {
        throw new Error(error?.message || "Falha ao salvar análise.");
      }
    } catch (error) {
      toast({
        title: "Erro ao Submeter",
        description: error.message || "Não foi possível salvar a análise quântica.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const categories = Object.keys(quantumQuestions);
  const currentTabIndex = categories.indexOf(currentTab);
  const isFirstTab = currentTabIndex === 0;
  const isLastTab = currentTabIndex === categories.length - 1;

  const handleNextTab = () => {
    if (!isLastTab) {
      setCurrentTab(categories[currentTabIndex + 1]);
    }
  };

  const handlePrevTab = () => {
    if (!isFirstTab) {
      setCurrentTab(categories[currentTabIndex - 1]);
    }
  };


  return {
    patient,
    answers,
    currentTab,
    setCurrentTab,
    isLoading,
    isSubmitting,
    handleAnswerChange,
    handleSubmit,
    isFormComplete,
    totalQuestions: totalQuestionsCount,
    answeredQuestions: answeredQuestionsCount,
    quantumQuestions,
    handleNextTab,
    handlePrevTab,
    isFirstTab,
    isLastTab,
  };
};