import React from 'react';
import { supabase } from '@/lib/supabaseClient';

export const saveQuantumAnalysis = async (patientId, analysisData) => {
  const { answers, results, recommendations } = analysisData;

  const { data: newAnalysis, error } = await supabase
    .from('quantum_analyses')
    .insert([{ 
      patient_id: patientId, 
      answers, 
      results, 
      recommendations 
    }])
    .select()
    .single();

  if (error) {
    console.error('Error saving quantum analysis:', error);
    return null;
  }
  
  await supabase
    .from('patients')
    .update({ has_analysis: true })
    .eq('id', patientId);
    
  return newAnalysis;
};

export const getQuantumAnalysis = async (analysisId) => {
  const { data: analysis, error } = await supabase
    .from('quantum_analyses')
    .select('*')
    .eq('id', analysisId)
    .single();

  if (error) {
    console.error('Error fetching quantum analysis:', error);
    return null;
  }
  return analysis;
};

export const getAllAnalysesForPatient = async (patientId) => {
  const { data: analyses, error } = await supabase
    .from('quantum_analyses')
    .select('*')
    .eq('patient_id', patientId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching analyses for patient:', error);
    return [];
  }
  return analyses;
};