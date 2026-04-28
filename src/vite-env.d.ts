/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  /** Legacy name; use VITE_SUPABASE_PUBLISHABLE_KEY in new projects */
  readonly VITE_SUPABASE_ANON_KEY?: string
  /** Supabase public / publishable key (preferred) */
  readonly VITE_SUPABASE_PUBLISHABLE_KEY?: string
  readonly VITE_SITE_URL: string
  readonly VITE_WHATSAPP_NUMBER: string
  readonly VITE_INSTAGRAM_URL: string
  readonly VITE_BRAND_EMAIL: string
  readonly VITE_MAPS_EMBED_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
