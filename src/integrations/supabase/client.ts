
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Supabase URL:', supabaseUrl ? 'Present' : 'Missing');
console.log('Supabase Anon Key:', supabaseAnonKey ? 'Present' : 'Missing');

if (!supabaseUrl) {
  console.error('VITE_SUPABASE_URL is missing. Please check your Supabase connection.');
  throw new Error('VITE_SUPABASE_URL environment variable is required. Please ensure Supabase is properly connected to your Lovable project.');
}

if (!supabaseAnonKey) {
  console.error('VITE_SUPABASE_ANON_KEY is missing. Please check your Supabase connection.');
  throw new Error('VITE_SUPABASE_ANON_KEY environment variable is required. Please ensure Supabase is properly connected to your Lovable project.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
