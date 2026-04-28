import { supabase, PRODUCT_IMAGES_BUCKET, REF_UPLOADS_BUCKET, GALLERY_BUCKET } from '@/lib/supabase/client'
import type { ProductWithMeta } from '@/lib/api/products'
import type { Inquiry, Order, Testimonial, Category, GalleryItem } from '@/lib/supabase/types'

export async function fetchAllProducts() {
  if (!supabase) return [] as ProductWithMeta[]
  const { data, error } = await supabase
    .from('products')
    .select('*, product_images(*), categories(*)')
    .order('created_at', { ascending: false })
  if (error) throw error
  return (data ?? []) as ProductWithMeta[]
}

export async function fetchProductById(id: string) {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('products')
    .select('*, product_images(*), categories(*)')
    .eq('id', id)
    .maybeSingle()
  if (error) throw error
  return (data as ProductWithMeta | null) ?? null
}

export async function fetchInquiries() {
  if (!supabase) return [] as Inquiry[]
  const { data, error } = await supabase
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return (data ?? []) as Inquiry[]
}

export async function updateInquiryStatus(id: string, status: Inquiry['status']) {
  if (!supabase) return
  const { error } = await supabase.from('inquiries').update({ status }).eq('id', id)
  if (error) throw error
}

export async function fetchOrders() {
  if (!supabase) return [] as Order[]
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return (data ?? []) as Order[]
}

export async function updateOrderStatus(id: string, status: Order['status']) {
  if (!supabase) return
  const { error } = await supabase.from('orders').update({ status }).eq('id', id)
  if (error) throw error
}

export async function fetchTestimonialsAll() {
  if (!supabase) return [] as Testimonial[]
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('sort_order')
  if (error) throw error
  return (data ?? []) as Testimonial[]
}

export async function saveTestimonial(input: {
  id?: string
  name: string
  text: string
  rating: number | null
  is_published: boolean
  sort_order: number
}) {
  if (!supabase) return
  if (input.id) {
    const { id, ...rest } = input
    const { error } = await supabase.from('testimonials').update(rest).eq('id', id)
    if (error) throw error
  } else {
    const { id: _d, ...rest } = { ...input }
    void _d
    const { error } = await supabase.from('testimonials').insert(rest)
    if (error) throw error
  }
}

export async function deleteTestimonial(id: string) {
  if (!supabase) return
  const { error } = await supabase.from('testimonials').delete().eq('id', id)
  if (error) throw error
}

export async function createOrderFromInquiry(
  inq: Pick<Inquiry, 'name' | 'phone' | 'email' | 'id'>
) {
  if (!supabase) return
  const { error } = await supabase.from('orders').insert({
    customer_name: inq.name,
    phone: inq.phone,
    email: inq.email,
    inquiry_id: inq.id,
    status: 'pending',
  })
  if (error) throw error
}

export { PRODUCT_IMAGES_BUCKET, REF_UPLOADS_BUCKET, GALLERY_BUCKET, supabase }

export async function fetchAllCategories() {
  if (!supabase) return [] as Category[]
  const { data, error } = await supabase.from('categories').select('*').order('sort_order')
  if (error) throw error
  return (data ?? []) as Category[]
}

export async function fetchGalleryAll() {
  if (!supabase) return [] as GalleryItem[]
  const { data, error } = await supabase.from('gallery_items').select('*').order('sort_order')
  if (error) throw error
  return (data ?? []) as GalleryItem[]
}
