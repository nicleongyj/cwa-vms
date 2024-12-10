import { createClient } from "@supabase/supabase-js";
import { config } from "../../common/config";

// Create a single supabase client for interacting with your database
const supabase_url = config.supabase?.url ?? "";
const supabase_key = config.supabase?.key ?? "";

const supabase = createClient(supabase_url, supabase_key, {});

export { supabase };
