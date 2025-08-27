import { supabase } from '@/lib/customSupabaseClient.js';
import { getSupabaseUser } from '@/lib/supabaseClient.jsx';
import { toast } from '@/components/ui/use-toast.js';
import { logJourneyEvent } from '@/lib/services/journeyService.js';


export const getAllTechniques = async () => {
  const user = await getSupabaseUser();
  if (!user) {
    return { data: [], error: { message: "Usuário não autenticado." } };
  }

  const { data, error } = await supabase
    .from('therapy_knowledge_base')
    .select('*')
    .eq('user_id', user.id)
    .order('title', { ascending: true });

  if (error) {
    console.error("Error fetching techniques:", error);
    return { data: [], error };
  }
  return { data: data || [], error: null };
};

export const getTechniqueById = async (techniqueId) => {
   const user = await getSupabaseUser();
  if (!user) {
    return { data: null, error: { message: "Usuário não autenticado." } };
  }

  const { data, error } = await supabase
    .from('therapy_knowledge_base')
    .select('*')
    .eq('id', techniqueId)
    .eq('user_id', user.id)
    .single();

  if (error) {
    console.error("Error fetching technique by ID:", error);
    if (error.code !== 'PGRST116') {
        toast({ title: "Erro ao Buscar Técnica", description: error.message, variant: "destructive" });
    }
    return { data: null, error };
  }
  return { data, error: null };
};

export const saveTechnique = async (techniqueData) => {
  const user = await getSupabaseUser();
  if (!user) {
    toast({ title: "Erro de Autenticação", description: "Usuário não autenticado.", variant: "destructive" });
    return { data: null, error: { message: "Usuário não autenticado." } };
  }

  const dataToSave = { ...techniqueData, user_id: user.id };

  let response;
  if (dataToSave.id) {
    const { id, ...updateData } = dataToSave;
    response = await supabase
      .from('therapy_knowledge_base')
      .update(updateData)
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single();
  } else {
    response = await supabase
      .from('therapy_knowledge_base')
      .insert(dataToSave)
      .select()
      .single();
  }

  const { data, error } = response;

  if (error) {
    console.error('Error saving technique:', error);
    toast({ title: "Erro ao Salvar Técnica", description: error.message, variant: "destructive" });
    return { data: null, error };
  }
  
  toast({ title: "Técnica Salva!", description: `A técnica "${data.title}" foi salva com sucesso.`, className: "bg-green-500 text-white" });
  return { data, error: null };
};

export const deleteTechnique = async (techniqueId) => {
  const user = await getSupabaseUser();
  if (!user) {
    return { error: { message: "Usuário não autenticado." } };
  }

  const { error } = await supabase
    .from('therapy_knowledge_base')
    .delete()
    .eq('id', techniqueId)
    .eq('user_id', user.id);

  if (error) {
    console.error('Error deleting technique:', error);
    toast({ title: "Erro ao Excluir Técnica", description: error.message, variant: "destructive" });
    return { error };
  }
  
  toast({ title: "Técnica Excluída!", description: "A técnica foi excluída com sucesso.", className: "bg-red-500 text-white" });
  return { error: null };
};


export const saveTechniqueEvaluation = async (evaluationPayload) => {
  const user = await getSupabaseUser();
  if (!user) {
    toast({ title: "Erro de Autenticação", description: "Usuário não autenticado.", variant: "destructive" });
    return { data: null, error: { message: "Usuário não autenticado." } };
  }

  const dataToSave = { 
    ...evaluationPayload, 
    therapist_id: user.id 
  };

  const { data: newEvaluation, error } = await supabase
    .from('technique_evaluations')
    .insert(dataToSave)
    .select()
    .single();

  if (error) {
    console.error('Error saving technique evaluation:', error);
    toast({ title: "Erro ao Salvar Avaliação da Técnica", description: error.message, variant: "destructive" });
    return { data: null, error };
  }

  await logJourneyEvent(
      newEvaluation.patient_id,
      'TECHNIQUE_EVALUATION_COMPLETED',
      { 
        evaluationId: newEvaluation.id, 
        techniqueId: newEvaluation.knowledge_base_id,
        evaluationData: newEvaluation.evaluation_data,
        evaluationResults: newEvaluation.evaluation_results 
      },
      null,
      newEvaluation.knowledge_base_id,
      newEvaluation.id,
      newEvaluation.notes
    );
  
  toast({ title: "Avaliação Salva!", description: `Avaliação da técnica foi salva com sucesso.`, className: "bg-green-500 text-white" });
  return { data: newEvaluation, error: null };
};

export const getEvaluationsForTechnique = async (patientId, techniqueId) => {
  const user = await getSupabaseUser();
  if (!user) {
    return { data: [], error: { message: "Usuário não autenticado." } };
  }

  const { data, error } = await supabase
    .from('technique_evaluations')
    .select('*, therapy_knowledge_base(title)')
    .eq('patient_id', patientId)
    .eq('knowledge_base_id', techniqueId)
    .eq('therapist_id', user.id)
    .order('evaluation_date', { ascending: false });

  if (error) {
    console.error("Error fetching evaluations for technique:", error);
    toast({ title: "Erro ao Buscar Avaliações", description: error.message, variant: "destructive" });
    return { data: [], error };
  }
  return { data: data || [], error: null };
};