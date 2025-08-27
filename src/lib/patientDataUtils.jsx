import React from 'react';
import { supabase } from '@/lib/supabaseClient';

export const savePatient = async (patientData) => {
  const { name, email, phone, birth_date, address, gender, profession, marital_status, therapist_id } = patientData;
  
  const { data: newPatient, error } = await supabase
    .from('patients')
    .insert([{ 
      name, 
      email, 
      phone, 
      birth_date: birth_date || null, 
      address, 
      gender, 
      profession, 
      marital_status, 
      therapist_id: therapist_id || null 
    }])
    .select()
    .single();

  if (error) {
    console.error('Error saving patient:', error);
    return { error }; 
  }
  return newPatient;
};

export const getAllPatients = async () => {
  const { data: patients, error } = await supabase
    .from('patients')
    .select(`
      *,
      therapists (
        id,
        name
      ),
      patient_current_phase!patient_current_phase_patient_id_fkey (
        current_phase_number,
        phase_start_date
      )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching patients:', error);
    return { error, data: [] };
  }
  
  return { 
    error: null, 
    data: patients.map(p => ({
      ...p,
      therapistName: p.therapists ? p.therapists.name : "Não atribuído",
      therapist_id: p.therapists ? p.therapists.id : null,
      current_phase_number: p.patient_current_phase && p.patient_current_phase.length > 0 ? p.patient_current_phase[0].current_phase_number : 1,
      phase_start_date: p.patient_current_phase && p.patient_current_phase.length > 0 ? p.patient_current_phase[0].phase_start_date : null,
    }))
  };
};

export const getPatientById = async (id) => {
  const { data: patient, error } = await supabase
    .from('patients')
    .select(`
      *,
      therapists (
        id,
        name
      ),
      patient_current_phase!patient_current_phase_patient_id_fkey (
        id,
        current_phase_number,
        phase_start_date
      )
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching patient by ID:', error);
    return null;
  }
  
  return patient ? {
    ...patient,
    therapistName: patient.therapists ? patient.therapists.name : "Não atribuído",
    therapist_id: patient.therapists ? patient.therapists.id : null,
    current_phase_id_pk: patient.patient_current_phase && patient.patient_current_phase.length > 0 ? patient.patient_current_phase[0].id : null,
    current_phase_number: patient.patient_current_phase && patient.patient_current_phase.length > 0 ? patient.patient_current_phase[0].current_phase_number : 1,
    phase_start_date: patient.patient_current_phase && patient.patient_current_phase.length > 0 ? patient.patient_current_phase[0].phase_start_date : null,
  } : null;
};


export const updatePatientHasAnalysis = async (patientId) => {
  const { error } = await supabase
    .from('patients')
    .update({ has_analysis: true })
    .eq('id', patientId);

  if (error) {
    console.error('Error updating patient has_analysis:', error);
  }
};

export const updatePatientCurrentPhase = async (patientId, current_phase_id_pk, newPhaseNumber) => {
  if (!patientId || !newPhaseNumber) {
    console.error('Patient ID and new phase number are required.');
    return { data: null, error: { message: 'Patient ID and new phase number are required.'} };
  }

  try {
    let data, error;
    if (current_phase_id_pk) {
      const response = await supabase
        .from('patient_current_phase')
        .update({ 
          current_phase_number: newPhaseNumber,
          phase_start_date: new Date().toISOString() 
        })
        .eq('id', current_phase_id_pk)
        .select()
        .single();
      data = response.data;
      error = response.error;
    } else {
      const response = await supabase
        .from('patient_current_phase')
        .insert({
          patient_id: patientId,
          current_phase_number: newPhaseNumber,
          phase_start_date: new Date().toISOString()
        })
        .select()
        .single();
      data = response.data;
      error = response.error;
      
      if (!error && data) {
        const { error: patientUpdateError } = await supabase
          .from('patients')
          .update({ current_phase_id: data.id })
          .eq('id', patientId);
        if (patientUpdateError) {
            console.error('Error updating patient current_phase_id link:', patientUpdateError);
            throw patientUpdateError;
        }
      }
    }
    
    if (error) {
        console.error('Error in updatePatientCurrentPhase (insert/update phase):', error);
        throw error;
    }
    return { data, error: null };

  } catch (error) {
    console.error('Overall error in updatePatientCurrentPhase:', error);
    return { data: null, error: { message: error.message || 'Unknown error updating patient phase', details: error } };
  }
};

export const deletePatientById = async (patientId) => {
  if (!patientId) {
    const errorMsg = 'ID do paciente é obrigatório para exclusão.';
    console.error(errorMsg);
    return { error: { message: errorMsg } };
  }
  console.log(`Attempting to delete patient with ID: ${patientId}`);

  try {
    console.log(`Deleting analyses for patient ID: ${patientId}`);
    const { error: analysesError } = await supabase
      .from('quantum_analyses')
      .delete()
      .eq('patient_id', patientId);

    if (analysesError) {
      console.error('Supabase error deleting patient analyses:', analysesError);
      throw new Error(`Falha ao excluir análises: ${analysesError.message} (Code: ${analysesError.code})`);
    }
    console.log(`Analyses deleted for patient ID: ${patientId}`);

    console.log(`Deleting current phase for patient ID: ${patientId}`);
    const { error: phaseError } = await supabase
      .from('patient_current_phase')
      .delete()
      .eq('patient_id', patientId);

    if (phaseError) {
      console.error('Supabase error deleting patient current phase:', phaseError);
      throw new Error(`Falha ao excluir fase atual: ${phaseError.message} (Code: ${phaseError.code})`);
    }
    console.log(`Current phase deleted for patient ID: ${patientId}`);
    
    console.log(`Deleting patient record for ID: ${patientId}`);
    const { error: patientError } = await supabase
      .from('patients')
      .delete()
      .eq('id', patientId);

    if (patientError) {
      console.error('Supabase error deleting patient record:', patientError);
      throw new Error(`Falha ao excluir paciente: ${patientError.message} (Code: ${patientError.code})`);
    }
    console.log(`Patient record deleted for ID: ${patientId}`);

    return { error: null };
  } catch (error) {
    console.error('Failed to delete patient and related data:', error);
    return { error: { message: error.message || 'Erro desconhecido ao excluir paciente e dados relacionados.', details: error.details || error } };
  }
};