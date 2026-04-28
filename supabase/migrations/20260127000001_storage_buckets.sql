-- Storage buckets + object policies (required for custom-order ref uploads and product images)

INSERT INTO storage.buckets (id, name, public)
VALUES
  ('product-images', 'product-images', true),
  ('custom-order-refs', 'custom-order-refs', false)
ON CONFLICT (id) DO NOTHING;

-- custom-order-refs: only this use case; WITH CHECK is bucket_id only (path checks can disagree with how Storage sets `name`)
CREATE POLICY "custom_order_refs_insert_public"
  ON storage.objects
  FOR INSERT
  TO public
  WITH CHECK (bucket_id = 'custom-order-refs');

-- Upload with upsert can UPDATE an existing object; without this, re-uploads get RLS 403
CREATE POLICY "custom_order_refs_update_public"
  ON storage.objects
  FOR UPDATE
  TO public
  USING (bucket_id = 'custom-order-refs')
  WITH CHECK (bucket_id = 'custom-order-refs');

-- Admins can read private reference images
CREATE POLICY "custom_order_refs_select_admin"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (bucket_id = 'custom-order-refs' AND public.is_admin());

-- product-images: public read
CREATE POLICY "product_images_select_public"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'product-images');

-- product-images: admin write
CREATE POLICY "product_images_insert_admin"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'product-images' AND public.is_admin());

CREATE POLICY "product_images_update_admin"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'product-images' AND public.is_admin())
  WITH CHECK (bucket_id = 'product-images' AND public.is_admin());

CREATE POLICY "product_images_delete_admin"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'product-images' AND public.is_admin());
