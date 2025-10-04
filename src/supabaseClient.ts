import { createClient } from "@supabase/supabase-js";

const supabaseURL = import.meta.env.VITE_SUPABASE_URL;
const supabaseApiKey = import.meta.env.VITE_SUPABASE_API_KEY;

const supabase = createClient(supabaseURL as string, supabaseApiKey as string);

export { supabase };
