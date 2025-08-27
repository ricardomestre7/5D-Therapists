import React from 'react';
import { supabase } from '@/lib/supabaseClient';

export const getTherapists = async () => {
  const { data, error } = await supabase
    .from('therapists')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching therapists:', error);
    return [];
  }
  return data;
};

export const saveTherapist = async (therapistName) => {
  if (!therapistName || therapistName.trim() === "") {
    return { success: false, message: "O nome do terapeuta não pode estar vazio." };
  }

  const trimmedName = therapistName.trim();

  const { data: existingTherapist, error: fetchError } = await supabase
    .from('therapists')
    .select('id')
    .eq('name', trimmedName)
    .maybeSingle();

  if (fetchError && fetchError.code !== 'PGRST116') { 
    console.error('Error checking existing therapist:', fetchError);
    return { success: false, message: 'Erro ao verificar terapeuta.' };
  }

  if (existingTherapist) {
    return { success: false, message: "Este terapeuta já está cadastrado." };
  }

  const { data: newTherapist, error: insertError } = await supabase
    .from('therapists')
    .insert([{ name: trimmedName }])
    .select()
    .single();

  if (insertError) {
    console.error('Error saving therapist:', insertError);
    return { success: false, message: 'Erro ao salvar terapeuta.' };
  }
  return { success: true, therapist: newTherapist, message: "Terapeuta adicionado com sucesso!" };
};

export const deleteTherapist = async (therapistId) => {
  const { error } = await supabase
    .from('therapists')
    .delete()
    .eq('id', therapistId);

  if (error) {
    console.error('Error deleting therapist:', error);
    return { success: false, message: "Erro ao remover terapeuta." };
  }
  return { success: true, message: "Terapeuta removido com sucesso." };
};