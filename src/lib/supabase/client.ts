import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { getSupabasePublicKey, isSupabaseConfigured, siteUrl } from '@/lib/config'

const url = import.meta.env.VITE_SUPABASE_URL
const key = getSupabasePublicKey()

export const supabase: SupabaseClient | null =
  isSupabaseConfigured && url && key ? createClient(url, key) : null

export const PRODUCT_IMAGES_BUCKET = 'product-images'
export const REF_UPLOADS_BUCKET = 'custom-order-refs'
export const GALLERY_BUCKET = 'gallery'

export function publicFileUrl(bucket: string, path: string) {
  if (!supabase) return null
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}

export function withSiteUrl(s?: string) {
  if (!s) return siteUrl
  if (s.startsWith('http')) return s
  return `${siteUrl.replace(/\/$/, '')}/${s.replace(/^\//, '')}`
}
