import { supabase, publicFileUrl, PRODUCT_IMAGES_BUCKET } from '@/lib/supabase/client'
import type { Category, Product, ProductImage, Testimonial, GalleryItem } from '@/lib/supabase/types'

export type ProductWithMeta = Product & {
  product_images: ProductImage[]
  categories: Category
}

function firstImageUrl(images: ProductImage[] | undefined) {
  if (!images?.length) return '/hero-floral.svg'
  const path = images[0].storage_path
  return publicFileUrl(PRODUCT_IMAGES_BUCKET, path) || '/hero-floral.svg'
}

export { firstImageUrl }

export async function fetchCategories() {
  if (!supabase) return [] as Category[]
  const { data, error } = await supabase.from('categories').select('*').order('sort_order')
  if (error) throw error
  return (data ?? []) as Category[]
}

export async function fetchProducts(opts?: { categorySlug?: string }) {
  if (!supabase) return [] as ProductWithMeta[]
  let q = supabase
    .from('products')
    .select('*, product_images(*), categories(*)')
    .eq('is_published', true)
    .order('sort_order')
  if (opts?.categorySlug) {
    const { data: cat } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', opts.categorySlug)
      .maybeSingle()
    if (cat) q = q.eq('category_id', cat.id)
  }
  const { data, error } = await q
  if (error) throw error
  return (data ?? []) as ProductWithMeta[]
}

export async function fetchProductBySlug(slug: string) {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('products')
    .select('*, product_images(*), categories(*)')
    .eq('slug', slug)
    .eq('is_published', true)
    .maybeSingle()
  if (error) throw error
  return (data as ProductWithMeta | null) ?? null
}

export async function fetchFeatured() {
  const all = await fetchProducts()
  return all.filter((p) => p.is_featured)
}

export async function fetchBestSellers() {
  const all = await fetchProducts()
  return all.filter((p) => p.is_best_seller)
}

export async function fetchTestimonials() {
  if (!supabase) return [] as Testimonial[]
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_published', true)
    .order('sort_order')
  if (error) throw error
  return (data ?? []) as Testimonial[]
}

export async function fetchGallery() {
  if (!supabase) return [] as GalleryItem[]
  const { data, error } = await supabase
    .from('gallery_items')
    .select('*')
    .eq('is_published', true)
    .order('sort_order')
  if (error) throw error
  return (data ?? []) as GalleryItem[]
}
