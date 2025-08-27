import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { getAllPatients, deletePatientById } from '@/lib/services/patientService.js';

const useDashboardLogic = (userSession) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [allPatients, setAllPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({ total: 0, recentlyAdded: 0, withAnalysis: 0 });

  const loadData = useCallback(async () => {
    if (!userSession?.user?.id) {
      setError("Sessão do usuário não encontrada. Por favor, faça login novamente.");
      setIsLoading(false);
      setAllPatients([]);
      setStats({ total: 0, recentlyAdded: 0, withAnalysis: 0 });
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await getAllPatients();
      
      if (response.error) {
        throw new Error(response.error.message || "Falha ao buscar pacientes.");
      }
      
      const fetchedPatients = response.data || [];
      setAllPatients(fetchedPatients);
      setFilteredPatients(fetchedPatients);

      const total = fetchedPatients.length;
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      const recentlyAdded = fetchedPatients.filter(p => new Date(p.created_at) > sevenDaysAgo).length;
      const withAnalysis = fetchedPatients.filter(p => p.has_analysis).length;
      setStats({ total, recentlyAdded, withAnalysis });

    } catch (err) {
      console.error("Error loading dashboard data:", err);
      setError(err.message || "Ocorreu um erro desconhecido ao carregar os dados.");
      toast({
        title: "Erro ao Carregar Dados",
        description: err.message || "Não foi possível buscar os pacientes.",
        variant: "destructive",
      });
      setAllPatients([]);
      setStats({ total: 0, recentlyAdded: 0, withAnalysis: 0 });
    } finally {
      setIsLoading(false);
    }
  }, [userSession, toast]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filteredData = allPatients.filter(item => {
      return (
        item.full_name?.toLowerCase().includes(lowercasedFilter) ||
        item.email?.toLowerCase().includes(lowercasedFilter) ||
        item.therapistName?.toLowerCase().includes(lowercasedFilter)
      );
    });
    setFilteredPatients(filteredData);
  }, [searchTerm, allPatients]);

  const handlePatientAction = (patient, action) => {
    switch (action) {
      case 'edit':
        navigate(`/edit-patient/${patient.id}`);
        break;
      case 'analyze':
        navigate(`/quantum-analysis/${patient.id}`);
        break;
      case 'view_results':
        navigate(`/results/${patient.id}`);
        break;
      default:
        console.warn(`Ação desconhecida: ${action}`);
    }
  };

  const handleDeletePatient = async (patientId) => {
    const patientToDelete = allPatients.find(p => p.id === patientId);
    if (!patientToDelete) return;

    const originalPatients = [...allPatients];
    setAllPatients(prev => prev.filter(p => p.id !== patientId));

    try {
      const { success, error: deleteError } = await deletePatientById(patientId);
      if (!success) {
        throw new Error(deleteError?.message || "Falha ao excluir paciente.");
      }
      toast({
        title: "Paciente Excluído",
        description: `${patientToDelete.full_name} foi removido com sucesso.`,
        className: "bg-green-500 text-white",
      });
      await loadData(); // Recarrega tudo para atualizar as estatísticas
    } catch (err) {
      console.error("Error deleting patient:", err);
      toast({
        title: "Erro ao Excluir",
        description: err.message,
        variant: "destructive",
      });
      setAllPatients(originalPatients); // Rollback
    }
  };
  
  const handleAddNewPatient = () => {
    navigate('/collect-data');
  };

  return {
    patients: filteredPatients,
    isLoading,
    error,
    stats,
    searchTerm,
    setSearchTerm,
    handlePatientAction,
    handleDeletePatient,
    loadData,
    handleNewPatient: handleAddNewPatient,
  };
};

export default useDashboardLogic;