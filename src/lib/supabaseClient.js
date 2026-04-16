import { createClient } from '@supabase/supabase-js';

// Fallback to placeholder values if env variables are missing so the UI can still run locally
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('Supabase credentials missing in .env. Using placeholder values for local UI testing. Submissions will fail but UI will render.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
