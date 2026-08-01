import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://tlnuvqttkbtblniojbax.supabase.co";
const supabaseKey = "sb_publishable_GBrCRRkGzDhE0ESlSPP97g_7c0N7iPC";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
