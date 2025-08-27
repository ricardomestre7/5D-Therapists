import { supabase } from '@/lib/customSupabaseClient.js';
import { getSupabaseUser } from '@/lib/supabaseClient.jsx';
import { toast } from "@/components/ui/use-toast";

export const getTherapists = async () => {
  const user = await getSupabaseUser();
  if (!user) {
    toast({ title: "Erro de Autenticação", description: "Usuário não autenticado.", variant: "destructive" });
    return [];
  }

  const { data, error } = await supabase
    .from('therapists')
    .select('id, name')
    .eq('user_id', user.id);

  if (error) {
    console.error("Error fetching therapists:", error);
    toast({ title: "Erro ao Carregar Terapeutas", description: error.message, variant: "destructive" });
    return [];
  }
  return data || [];
};

export const saveTherapist = async (therapistName) => {
  const user = await getSupabaseUser();
  if (!user) {
    toast({ title: "Erro de Autenticação", description: "Usuário não autenticado.", variant: "destructive" });
    return { success: false, message: "Usuário não autenticado." };
  }

  const { data, error } = await supabase
    .from('therapists')
    .insert({ name: therapistName, user_id: user.id })
    .select()
    .single();

  if (error) {
    console.error("Error saving therapist:", error);
    toast({ title: "Erro ao Salvar Terapeuta", description: error.message, variant: "destructive" });
    return { success: false, message: error.message };
  }

  toast({ title: "Terapeuta Adicionado!", description: `"${therapistName}" foi adicionado com sucesso.`, className: "bg-green-500 text-white" });
  return { success: true, therapist: data };
};

export const deleteTherapist = async (therapistId) => {
  const user = await getSupabaseUser();
  if (!user) {
    toast({ title: "Erro de Autenticação", description: "Usuário não autenticado.", variant: "destructive" });
    return { success: false, message: "Usuário não autenticado." };
  }

  const { error } = await supabase
    .from('therapists')
    .delete()
    .eq('id', therapistId)
    .eq('user_id', user.id);

  if (error) {
    console.error("Error deleting therapist:", error);
    toast({ title: "Erro ao Remover Terapeuta", description: error.message, variant: "destructive" });
    return { success: false, message: error.message };
  }

  toast({ title: "Terapeuta Removido!", description: "O terapeuta foi removido com sucesso.", className: "bg-blue-500 text-white" });
  return { success: true };
};