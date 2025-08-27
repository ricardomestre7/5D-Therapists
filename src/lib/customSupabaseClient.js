import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eelzfwfqznmlguumfkfu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVlbHpmd2Zxem5tbGd1dW1ma2Z1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczMzI0NTQsImV4cCI6MjA2MjkwODQ1NH0.6IS82qxxL06oE-LC2gyiWMh7pqEjTfUDN630zxrhBG8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);