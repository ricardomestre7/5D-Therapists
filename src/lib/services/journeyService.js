import { supabase } from '@/lib/customSupabaseClient.js';
import { getSupabaseUser } from '@/lib/supabaseClient.jsx';
import { toast } from '@/components/ui/use-toast.js';

export const logJourneyEvent = async (patientId, eventType, eventData = {}, relatedAnalysisId = null, relatedKnowledgeId = null, relatedTechniqueEvaluationId = null, notes = null) => {
  const user = await getSupabaseUser();
  if (!user) {
    toast({ title: "Erro de Autenticação", description: "Usuário não autenticado. Evento não registrado.", variant: "warning" });
    return { data: null, error: { message: "Usuário não autenticado." } };
  }

  try {
    const { data, error } = await supabase
      .from('patient_journey_events')
      .insert([{
        patient_id: patientId,
        user_id: user.id,
        event_type: eventType,
        event_data: eventData,
        related_analysis_id: relatedAnalysisId,
        related_knowledge_id: relatedKnowledgeId,
        related_technique_evaluation_id: relatedTechniqueEvaluationId,
        notes: notes,
        timestamp: new Date().toISOString(), 
      }])
      .select()
      .single();

    if (error) {
      console.error(`Error logging journey event (${eventType}):`, error);
      toast({ title: "Erro ao Registrar Evento da Jornada", description: `Detalhes: ${error.message}`, variant: "destructive" });
      return { data: null, error };
    }
    return { data, error: null };

  } catch (exception) {
    console.error(`Exception logging journey event (${eventType}):`, exception);
    toast({ title: "Erro Crítico ao Registrar Evento", description: "Ocorreu uma exceção inesperada.", variant: "destructive" });
    return { data: null, error: { message: exception.message || "Exceção desconhecida" } };
  }
};

export const getAllJourneyEventsForPatient = async (patientId) => {
  const user = await getSupabaseUser();
  if (!user) {
    return { data: [], error: { message: "Usuário não autenticado." } };
  }

  const { data, error } = await supabase
    .from('patient_journey_events')
    .select('*')
    .eq('patient_id', patientId)
    .eq('user_id', user.id) 
    .order('timestamp', { ascending: false });

  if (error) {
    console.error("Error fetching journey events for patient:", error);
    return { data: [], error };
  }
  return { data: data || [], error: null };
};


export const getAllTechniqueEvaluationsForPatient = async (patientId) => {
    const user = await getSupabaseUser();
    if (!user) {
      return { data: [], error: { message: "Usuário não autenticado." } };
    }

    const { data, error } = await supabase
      .from('technique_evaluations')
      .select(`
        *,
        therapy_knowledge_base (title)
      `)
      .eq('patient_id', patientId)
      .eq('therapist_id', user.id)
      .order('evaluation_date', { ascending: false });

    if (error) {
        if(error.code === '42P01') { // relation does not exist
            console.warn("Tabela 'technique_evaluations' não encontrada. Assumindo que nenhuma avaliação existe.");
            return { data: [], error: null };
        }
      console.error("Error fetching technique evaluations for patient:", error);
      return { data: [], error };
    }
    
    return { data: data || [], error: null };
};