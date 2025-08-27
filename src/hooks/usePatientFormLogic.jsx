import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast.js';
import { getInitialPatientFormData, patientFormStructure as rawPatientFormStructure } from '@/lib/config/formStructures.js';
import { savePatientToSupabase, getPatientById } from '@/lib/services/patientService.js'; 
import { getTherapists } from '@/lib/services/therapistService.js';
import { UserCircle, Briefcase, HeartPulse, Sparkles, HelpCircle } from 'lucide-react';

const iconMap = {
  UserCircle,
  Briefcase,
  HeartPulse,
  Sparkles,
};

export const usePatientFormLogic = (patientId) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState(getInitialPatientFormData());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  
  const [therapists, setTherapists] = useState([]);
  
  const formSections = Object.entries(rawPatientFormStructure || {}).map(([key, value]) => ({
    id: key,
    title: value?.title || 'Seção Desconhecida',
    icon: iconMap[value?.icon] || HelpCircle,
    fields: Array.isArray(value?.fields) ? value.fields : [],
  }));
  
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const therapistsData = await getTherapists();
        setTherapists(therapistsData || []);

        if (patientId) {
          setIsEditing(true);
          const { data: patient, error: patientError } = await getPatientById(patientId);
          if (patientError) throw patientError;

          if (patient) {
            const formattedData = { ...getInitialPatientFormData(), ...patient };
            if (patient.birth_date) {
              formattedData.birth_date = new Date(patient.birth_date).toISOString().split('T')[0];
            }
            setFormData(formattedData);
          } else {
             throw new Error("Paciente não encontrado.");
          }
        } else {
          setIsEditing(false);
          setFormData(getInitialPatientFormData());
        }
      } catch (err) {
        const errorMessage = err.message || 'Erro ao carregar dados.';
        setError(errorMessage);
        toast({ title: 'Erro', description: errorMessage, variant: 'destructive' });
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, [patientId, toast]);

  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }, []);
  
  const handleSelectChange = useCallback((name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = async (e, userSession) => {
    e.preventDefault();
    if (!userSession || !userSession.user) {
        toast({ title: "Erro de Autenticação", description: "Sessão de usuário inválida. Faça login novamente.", variant: "destructive" });
        navigate('/login');
        return;
    }

    setIsSubmitting(true);
    
    const dataToSave = { ...formData, id: patientId, user_id: userSession.user.id };

    try {
      const response = await savePatientToSupabase(dataToSave);

      if (response.error || !response.success) {
        throw new Error(response.error?.message || "Erro desconhecido ao salvar.");
      }
      
      toast({
        title: isEditing ? "Paciente Atualizado!" : "Paciente Cadastrado!",
        description: `${response.data.full_name} foi ${isEditing ? 'atualizado(a)' : 'cadastrado(a)'} com sucesso.`,
        className: "bg-green-500 text-white",
      });
      navigate('/'); 
    } catch (error) {
      toast({
        title: "Erro ao Salvar",
        description: error.message || "Não foi possível salvar os dados do paciente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isLoading,
    isSubmitting,
    isEditing,
    error,
    therapists,
    formStructure: formSections, 
    handleInputChange,
    handleSelectChange,
    handleSubmit,
  };
};