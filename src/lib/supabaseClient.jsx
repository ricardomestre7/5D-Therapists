import { supabase } from '@/lib/customSupabaseClient.js';
import { toast } from "@/components/ui/use-toast";

export const getSupabaseUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
      console.error("Error getting user:", error.message);
      return null;
    }
    return user;
  } catch (error) {
    console.error("Exception getting user:", error.message);
    return null;
  }
};