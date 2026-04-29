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

/** Storage object path, or an absolute http(s) URL (e.g. demo seed rows). */
export function resolveStorageOrRemoteImageUrl(bucket: string, path: string): string | null {
  const p = path.trim()
  if (!p) return null
  if (/^https?:\/\//i.test(p)) return p
  return publicFileUrl(bucket, p)
}

export function withSiteUrl(s?: string) {
  if (!s) return siteUrl
  if (s.startsWith('http')) return s
  return `${siteUrl.replace(/\/$/, '')}/${s.replace(/^\//, '')}`
}
