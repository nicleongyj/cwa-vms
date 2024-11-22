import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase_url = process.env.SUPABASE_URL ?? "";
const supabase_key = process.env.SUPABASE_KEY ?? "";

if (supabase_url === undefined) {
  throw new Error(`Env variable SUPABASE_URL undefined`);
}

if (supabase_key === undefined) {
  throw new Error(`Env variable SUPABASE_KEY undefined`);
}

const supabase = createClient(supabase_url, supabase_key, {});

export { supabase };
