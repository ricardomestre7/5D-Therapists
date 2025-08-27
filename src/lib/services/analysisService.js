import { supabase } from '@/lib/customSupabaseClient.js';
import { getSupabaseUser } from '@/lib/supabaseClient.jsx';
import { toast } from '@/components/ui/use-toast.js';
import { updatePatientHasAnalysisFlag } from '@/lib/services/patientService.js';
import { logJourneyEvent } from '@/lib/services/journeyService.js';

export const saveQuantumAnalysis = async (patientId, analysisData) => {
  const user = await getSupabaseUser();
  if (!user) {
    toast({ title: "Erro de Autenticação", description: "Usuário não autenticado.", variant: "destructive" });
    return { data: null, error: { message: "Usuário não autenticado." } };
  }

  const { answers, results, recommendations } = analysisData;

  if (!results || typeof results.categories !== 'object' || results.categories === null) {
    console.error("Invalid results.categories in analysisData for saveQuantumAnalysis", results);
    toast({ title: "Erro de Dados da Análise", description: "Dados de categorias da análise estão inválidos ou ausentes.", variant: "destructive" });
    return { data: null, error: { message: "Dados de categorias da análise estão inválidos ou ausentes." } };
  }


  const { data: newAnalysis, error } = await supabase
    .from('quantum_analyses')
    .insert([{ 
      patient_id: patientId, 
      user_id: user.id,
      answers, 
      results, 
      recommendations 
    }])
    .select()
    .single();

  if (error) {
    console.error('Error saving quantum analysis:', error);
    toast({ title: "Erro ao Salvar Análise", description: error.message, variant: "destructive" });
    return { data: null, error };
  }
  
  const updateFlagResult = await updatePatientHasAnalysisFlag(patientId, true);
    
  if (updateFlagResult.error) {
    toast({ title: "Aviso", description: "Análise salva, mas houve um erro ao atualizar o status do paciente.", variant: "warning" });
  }

  if (newAnalysis) {
    await logJourneyEvent(
      patientId,
      'ANALYSIS_GENERATED',
      { analysisId: newAnalysis.id, categories: newAnalysis.results?.categories },
      newAnalysis.id
    );
  }

  toast({ title: "Análise Salva!", description: `Análise para o paciente foi salva com sucesso.`, className: "bg-green-500 text-white" });
  return { data: newAnalysis, error: null };
};

export const getAllAnalysesForPatient = async (patientId) => {
  const user = await getSupabaseUser();
  if (!user) {
    return { data: [], error: { message: "Usuário não autenticado." } };
  }

  const { data, error } = await supabase
    .from('quantum_analyses')
    .select('*')
    .eq('patient_id', patientId)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching analyses for patient:", error);
    return { data: [], error };
  }
  return { data: data || [], error: null };
};