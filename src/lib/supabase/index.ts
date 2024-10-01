import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase_url = process.env.SUPABASE_URL ?? "";
const supabase_key = process.env.SUPABASE_KEY ?? "";

const supabase = createClient(supabase_url, supabase_key, {});

export { supabase };
