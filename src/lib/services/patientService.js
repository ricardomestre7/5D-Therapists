import { supabase } from '@/lib/customSupabaseClient.js';
import { getSupabaseUser } from '@/lib/supabaseClient.jsx';
import { toast } from "@/components/ui/use-toast";

export const savePatientToSupabase = async (patientData) => {
  const user = await getSupabaseUser();
  if (!user) {
    toast({ title: "Erro de Autenticação", description: "Usuário não autenticado.", variant: "destructive" });
    return { success: false, error: { message: "Usuário não autenticado." } };
  }

  const patientRecord = {
    ...patientData, 
    user_id: user.id, 
    updated_at: new Date().toISOString(),
  };

  Object.keys(patientRecord).forEach(key => {
    if (patientRecord[key] === '') {
      if (key === 'birth_date' || key === 'therapist_id') { 
        patientRecord[key] = null;
      }
    }
  });
  
  if (patientRecord.therapist_id === '' || patientRecord.therapist_id === undefined) {
    patientRecord.therapist_id = null;
  }


  if (!patientData.id) { 
    patientRecord.created_at = new Date().toISOString();
    const { data, error } = await supabase
      .from('patients')
      .insert(patientRecord)
      .select()
      .single();
    
    if (error) {
      console.error('Error inserting patient:', error);
      toast({ title: "Erro ao Salvar", description: `Não foi possível cadastrar o paciente: ${error.message}`, variant: "destructive" });
      return { success: false, error };
    }
    toast({ title: "Paciente Cadastrado!", description: `${data.full_name} foi cadastrado(a) com sucesso.`, className: "bg-green-500 text-white" });
    return { success: true, data };
  } else {
    const { data, error } = await supabase
      .from('patients')
      .update(patientRecord)
      .eq('id', patientData.id)
      .eq('user_id', user.id) 
      .select()
      .single();

    if (error) {
      console.error('Error updating patient:', error);
      toast({ title: "Erro ao Atualizar", description: `Não foi possível atualizar o paciente: ${error.message}`, variant: "destructive" });
      return { success: false, error };
    }
    toast({ title: "Paciente Atualizado!", description: `${data.full_name} foi atualizado(a) com sucesso.`, className: "bg-blue-500 text-white" });
    return { success: true, data };
  }
};


export const getAllPatients = async () => {
  const user = await getSupabaseUser();
  if (!user) {
    return { error: { message: "Usuário não autenticado para buscar pacientes." }, data: [] };
  }

  const { data: patients, error: patientsError } = await supabase
    .from('patients')
    .select(`
      *,
      therapists (
        name
      )
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (patientsError) {
    console.error('Error fetching patients:', patientsError);
    toast({ title: "Erro ao Buscar Pacientes", description: `Falha na consulta de pacientes: ${patientsError.message}`, variant: "destructive" });
    return { error: patientsError, data: [] };
  }

  const patientsWithTherapistName = patients.map(patient => ({
    ...patient,
    therapistName: patient.therapists ? patient.therapists.name : null,
  }));

  return { error: null, data: patientsWithTherapistName || [] };
};

export const getPatientById = async (id) => {
  if (!id) {
    console.error('Patient ID is required to fetch patient data.');
    return { success: false, data: null, error: { message: "ID do paciente não fornecido." } };
  }

  const user = await getSupabaseUser();
  if (!user) {
     return { success: false, data: null, error: { message: "Usuário não autenticado para buscar paciente." } };
  }

  const { data: patient, error: patientError } = await supabase
    .from('patients')
    .select(`
      *,
      therapists (
        name
      )
    `)
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (patientError) {
    console.error('Error fetching patient by ID:', patientError);
    if (patientError.code === 'PGRST116') { 
        return { success: false, data: null, error: { message: "Paciente não encontrado ou acesso negado." } };
    }
    toast({ title: "Erro ao Buscar Paciente", description: `Falha na consulta: ${patientError.message}`, variant: "destructive" });
    return { success: false, data: null, error: patientError };
  }

  if (!patient) {
      return { success: false, data: null, error: { message: "Paciente não encontrado." } };
  }

  const patientWithTherapistDetails = { 
    ...patient, 
    therapistName: patient.therapists ? patient.therapists.name : null 
  };
  
  return { success: true, data: patientWithTherapistDetails, error: null };
};

export const deletePatientById = async (patientId) => {
  if (!patientId) {
    return { success: false, error: { message: 'ID do paciente é obrigatório para exclusão.' } };
  }

  const user = await getSupabaseUser();
  if (!user) {
    return { success: false, error: { message: "Usuário não autenticado para excluir paciente." } };
  }
  
  const { error: journeyEventsError } = await supabase
    .from('patient_journey_events')
    .delete()
    .eq('patient_id', patientId);

  if (journeyEventsError) {
    console.error('Supabase error deleting patient journey events:', journeyEventsError);
    toast({
      title: "Erro ao Excluir Eventos da Jornada",
      description: `Falha ao excluir eventos associados: ${journeyEventsError.message}`,
      variant: "destructive",
    });
    return { success: false, error: { message: `Falha ao excluir eventos da jornada: ${journeyEventsError.message}` } };
  }
  
  const { error: techniqueEvaluationsError } = await supabase
    .from('technique_evaluations')
    .delete()
    .eq('patient_id', patientId);

  if (techniqueEvaluationsError) {
    console.error('Supabase error deleting technique evaluations:', techniqueEvaluationsError);
    toast({
      title: "Erro ao Excluir Avaliações de Técnicas",
      description: `Falha ao excluir avaliações de técnicas associadas: ${techniqueEvaluationsError.message}`,
      variant: "destructive",
    });
    return { success: false, error: { message: `Falha ao excluir avaliações de técnicas: ${techniqueEvaluationsError.message}` } };
  }


  const { error: analysesError } = await supabase
    .from('quantum_analyses')
    .delete()
    .eq('patient_id', patientId);

  if (analysesError) {
    console.error('Supabase error deleting patient analyses:', analysesError);
    toast({
      title: "Erro ao Excluir Análises",
      description: `Falha ao excluir análises associadas: ${analysesError.message}`,
      variant: "destructive",
    });
    return { success: false, error: { message: `Falha ao excluir análises: ${analysesError.message}` } };
  }
  
  const { error: patientError } = await supabase
    .from('patients')
    .delete()
    .eq('id', patientId)
    .eq('user_id', user.id); 

  if (patientError) {
    console.error('Supabase error deleting patient record:', patientError);
    toast({
      title: "Erro ao Excluir Paciente",
      description: `Falha ao excluir o registro do paciente: ${patientError.message}`,
      variant: "destructive",
    });
    return { success: false, error: { message: `Falha ao excluir paciente: ${patientError.message}` } };
  }
  
  return { success: true, error: null };
};

export const updatePatientHasAnalysisFlag = async (patientId, hasAnalysis) => {
  const user = await getSupabaseUser();
  if (!user) {
    return { success: false, error: { message: "Usuário não autenticado para atualizar status." } };
  }

  const { data, error } = await supabase
    .from('patients')
    .update({ has_analysis: hasAnalysis, updated_at: new Date().toISOString() })
    .eq('id', patientId)
    .eq('user_id', user.id) 
    .select('id, has_analysis') 
    .single();
  
  if (error) {
    console.error('Error updating patient has_analysis flag:', error);
    return { success: false, error };
  }
  return { success: true, data };
};

export const updatePatientCurrentPhase = async (patientId, currentPhaseIdPk, newPhaseNumber) => {
  const user = await getSupabaseUser();
  if (!user) {
    return { data: null, error: { message: "Usuário não autenticado." } };
  }

  const phaseStartDate = new Date().toISOString();

  const { data: patientUpdateData, error: patientUpdateError } = await supabase
    .from('patients')
    .update({
      current_phase_number: newPhaseNumber,
      phase_start_date: phaseStartDate,
    })
    .eq('id', patientId)
    .select('id, current_phase_id_pk')
    .single();

  if (patientUpdateError) {
    console.error('Erro ao atualizar a fase na tabela de pacientes:', patientUpdateError);
    return { data: null, error: patientUpdateError };
  }
  
  if (currentPhaseIdPk) {
    const { error: journeyEndError } = await supabase
      .from('patient_journey_events')
      .update({ phase_end_date: phaseStartDate })
      .eq('id', currentPhaseIdPk);

    if (journeyEndError) {
      console.error('Erro ao definir a data de término da fase anterior:', journeyEndError);
      toast({
        title: "Aviso de Sincronização",
        description: "A nova fase foi iniciada, mas não foi possível encerrar a anterior no histórico.",
        variant: "warning",
      });
    }
  }

  const newJourneyEvent = {
    patient_id: patientId,
    user_id: user.id,
    event_type: 'phase_start',
    event_data: { description: `Início da Fase ${newPhaseNumber}` },
    timestamp: phaseStartDate,
  };
  
  const { data: newJourneyData, error: newJourneyError } = await supabase
    .from('patient_journey_events')
    .insert(newJourneyEvent)
    .select('id')
    .single();

  if (newJourneyError) {
    console.error('Erro ao criar o novo evento de início de fase:', newJourneyError);
    toast({
        title: "Erro de Sincronização",
        description: "A fase foi atualizada, mas não foi possível registrar o início no histórico.",
        variant: "destructive",
      });
    return { data: { id: patientUpdateData.id, phase_start_date: phaseStartDate }, error: null };
  }

  const { error: patientPkUpdateError } = await supabase
    .from('patients')
    .update({ current_phase_id_pk: newJourneyData.id })
    .eq('id', patientId);

  if (patientPkUpdateError) {
      console.error('Erro ao atualizar o ID da fase atual no paciente:', patientPkUpdateError);
      toast({
        title: "Erro de Sincronização Final",
        description: "Ocorreu um erro ao vincular o novo histórico ao paciente.",
        variant: "destructive",
      });
  }
  
  return { 
    data: { id: newJourneyData.id, phase_start_date: phaseStartDate }, 
    error: null 
  };
};