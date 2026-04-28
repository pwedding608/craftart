-- CraftArt: initial schema, RLS (Supabase PostgreSQL)

CREATE TYPE public.inquiry_type AS ENUM ('custom_order', 'contact', 'product_inquiry');
CREATE TYPE public.inquiry_status AS ENUM ('new', 'read', 'resolved');
CREATE TYPE public.order_status AS ENUM ('pending', 'confirmed', 'fulfilled', 'cancelled');
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  full_name text,
  role public.app_role NOT NULL DEFAULT 'user',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (new.id, COALESCE(new.raw_user_meta_data->>'full_name', ''), 'user');
  RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

-- Categories
CREATE TABLE public.categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  sort_order int NOT NULL DEFAULT 0
);

-- Products (price in whole INR)
CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid NOT NULL REFERENCES public.categories (id) ON DELETE RESTRICT,
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  price_inr bigint NOT NULL CHECK (price_inr >= 0),
  short_description text,
  long_description text,
  materials text,
  dimensions text,
  delivery_info text,
  is_featured boolean NOT NULL DEFAULT false,
  is_best_seller boolean NOT NULL DEFAULT false,
  is_published boolean NOT NULL DEFAULT true,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX products_category_id_idx ON public.products (category_id);
CREATE INDEX products_published_idx ON public.products (is_published) WHERE is_published = true;

CREATE TABLE public.product_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES public.products (id) ON DELETE CASCADE,
  storage_path text NOT NULL,
  alt text,
  sort_order int NOT NULL DEFAULT 0
);

CREATE TABLE public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  text text NOT NULL,
  rating smallint CHECK (rating IS NULL OR (rating >= 1 AND rating <= 5)),
  is_published boolean NOT NULL DEFAULT false,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type public.inquiry_type NOT NULL,
  status public.inquiry_status NOT NULL DEFAULT 'new',
  name text NOT NULL,
  phone text,
  email text,
  occasion text,
  budget text,
  style text,
  reference_image_path text,
  message text,
  product_id uuid REFERENCES public.products (id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  source text,
  subscribed_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  status public.order_status NOT NULL DEFAULT 'pending',
  customer_name text,
  phone text,
  email text,
  total_inr bigint CHECK (total_inr IS NULL OR total_inr >= 0),
  items jsonb DEFAULT '[]'::jsonb,
  notes text,
  inquiry_id uuid REFERENCES public.inquiries (id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.gallery_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  storage_path text,
  public_url text,
  caption text,
  sort_order int NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;

-- Profiles
CREATE POLICY "profiles_self_select" ON public.profiles
  FOR SELECT TO authenticated USING (id = auth.uid() OR public.is_admin());
CREATE POLICY "profiles_self_update" ON public.profiles
  FOR UPDATE TO authenticated USING (id = auth.uid() OR public.is_admin()) WITH CHECK (id = auth.uid() OR public.is_admin());

-- Categories: public read
CREATE POLICY "categories_anon_read" ON public.categories
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "categories_admin_write" ON public.categories
  FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Products
CREATE POLICY "products_read" ON public.products
  FOR SELECT TO anon, authenticated
  USING (is_published = true OR public.is_admin());
CREATE POLICY "products_admin" ON public.products
  FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Product images
CREATE POLICY "product_images_read" ON public.product_images
  FOR SELECT TO anon, authenticated
  USING (
    public.is_admin()
    OR EXISTS (
      SELECT 1 FROM public.products p
      WHERE p.id = product_id AND p.is_published = true
    )
  );
CREATE POLICY "product_images_admin" ON public.product_images
  FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Testimonials
CREATE POLICY "testimonials_read" ON public.testimonials
  FOR SELECT TO anon, authenticated
  USING (is_published = true OR public.is_admin());
CREATE POLICY "testimonials_admin" ON public.testimonials
  FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Inquiries
CREATE POLICY "inquiries_insert_public" ON public.inquiries
  FOR INSERT TO anon, authenticated
  WITH CHECK (char_length(name) >= 1 AND char_length(name) < 200);
CREATE POLICY "inquiries_admin" ON public.inquiries
  FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Newsletter
CREATE POLICY "newsletter_insert" ON public.newsletter_subscribers
  FOR INSERT TO anon, authenticated
  WITH CHECK (char_length(email) > 3 AND char_length(email) < 256);
CREATE POLICY "newsletter_admin" ON public.newsletter_subscribers
  FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Orders
CREATE POLICY "orders_admin" ON public.orders
  FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Gallery
CREATE POLICY "gallery_read" ON public.gallery_items
  FOR SELECT TO anon, authenticated
  USING (is_published = true OR public.is_admin());
CREATE POLICY "gallery_admin" ON public.gallery_items
  FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

INSERT INTO public.categories (slug, name, sort_order) VALUES
  ('bouquets', 'Bouquets', 1),
  ('gifts', 'Gifts', 2),
  ('wedding-decor', 'Wedding decor', 3),
  ('wall-art', 'Wall art', 4),
  ('centerpieces', 'Centerpieces', 5),
  ('custom-orders', 'Custom orders', 6)
ON CONFLICT (slug) DO NOTHING;
