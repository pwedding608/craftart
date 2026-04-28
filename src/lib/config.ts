const env = import.meta.env

/** Resolves the public Supabase key (new publishable or legacy anon). */
export function getSupabasePublicKey(): string {
  return (env.VITE_SUPABASE_PUBLISHABLE_KEY as string) || (env.VITE_SUPABASE_ANON_KEY as string) || ''
}

export const isSupabaseConfigured = Boolean(
  env.VITE_SUPABASE_URL && getSupabasePublicKey()
)

export const siteUrl = env.VITE_SITE_URL || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173')
export const whatsappNumber = env.VITE_WHATSAPP_NUMBER || '919999999999'
export const instagramUrl = env.VITE_INSTAGRAM_URL || 'https://www.instagram.com'
export const brandEmail = env.VITE_BRAND_EMAIL || 'hello@craftart.in'
export const mapsEmbedUrl = env.VITE_MAPS_EMBED_URL || ''

export function whatsappLinkWithText(text: string) {
  const n = whatsappNumber.replace(/\D/g, '')
  return `https://wa.me/${n}?text=${encodeURIComponent(text)}`
}
