export type Category = {
  id: string
  slug: string
  name: string
  sort_order: number
}

export type Product = {
  id: string
  category_id: string
  name: string
  slug: string
  price_inr: number
  short_description: string | null
  long_description: string | null
  materials: string | null
  dimensions: string | null
  delivery_info: string | null
  is_featured: boolean
  is_best_seller: boolean
  is_published: boolean
  sort_order: number
  created_at: string
  categories?: Category
}

export type ProductImage = {
  id: string
  product_id: string
  storage_path: string
  alt: string | null
  sort_order: number
}

export type Testimonial = {
  id: string
  name: string
  text: string
  rating: number | null
  is_published: boolean
  sort_order: number
  created_at: string
}

export type Inquiry = {
  id: string
  type: 'custom_order' | 'contact' | 'product_inquiry'
  status: 'new' | 'read' | 'resolved'
  name: string
  phone: string | null
  email: string | null
  occasion: string | null
  budget: string | null
  style: string | null
  reference_image_path: string | null
  message: string | null
  product_id: string | null
  created_at: string
}

export type Order = {
  id: string
  status: 'pending' | 'confirmed' | 'fulfilled' | 'cancelled'
  customer_name: string | null
  phone: string | null
  email: string | null
  total_inr: number | null
  items: unknown
  notes: string | null
  inquiry_id: string | null
  created_at: string
}

export type GalleryItem = {
  id: string
  storage_path: string | null
  public_url: string | null
  caption: string | null
  sort_order: number
  is_published: boolean
}

export type Profile = {
  id: string
  full_name: string | null
  role: 'admin' | 'user'
  created_at: string
}
