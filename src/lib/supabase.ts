import { createClient } from "@supabase/supabase-js";

declare global {
  interface Window {
    __ST_PROFUMI__?: {
      SUPABASE_URL?: string;
      SUPABASE_ANON_KEY?: string;
    };
  }
}

const runtime = (typeof window !== "undefined" ? window.__ST_PROFUMI__ : undefined) || {};

const supabaseUrl = (runtime.SUPABASE_URL || (import.meta.env.VITE_SUPABASE_URL as string | undefined)) as string | undefined;
const supabaseAnonKey = (runtime.SUPABASE_ANON_KEY || (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined)) as string | undefined;

if (!supabaseUrl || !supabaseAnonKey) {
  // Don't throw hard to keep the app previewable; Auth/Orders will show a friendly message.
  console.warn("Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY");
}

export const supabase = createClient(supabaseUrl || "", supabaseAnonKey || "");
