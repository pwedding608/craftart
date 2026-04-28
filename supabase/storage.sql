-- Run in Supabase SQL after creating buckets in Dashboard → Storage, or use INSERT for buckets.
-- Adjust paths and policies to your project.

-- Buckets: create `product-images` (public), `custom-order-refs` (private for refs), `gallery` (as needed)
/*
insert into storage.buckets (id, public) values
  ('product-images', true),
  ('custom-order-refs', false)
on conflict (id) do nothing;
*/

-- Public read of product images
-- create policy "read_product_images" on storage.objects
--   for select to public
--   using (bucket_id = 'product-images');

-- Authenticated admin: upload to product-images (tighten with path prefix if needed)
-- create policy "admin_upload_product_images" on storage.objects
--   for insert to authenticated
--   with check (bucket_id = 'product-images' and (select is_admin() from profiles where id = auth.uid()));

-- Anonymous / authenticated upload to custom order refs (optional; for public form uploads you may
-- use a signed URL flow or an Edge Function instead of open anon write)
-- create policy "anon_insert_refs" on storage.objects
--   for insert to anon, authenticated
--   with check (bucket_id = 'custom-order-refs' and (storage.foldername(name))[1] = 'ref');
