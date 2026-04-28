-- Fix 403 on custom-order-refs: bucket-only WITH CHECK; UPDATE policy for storage upload upsert.
-- (Supersedes the earlier ltrim/LIKE version — path checks can disagree with `storage.objects.name`.)

DROP POLICY IF EXISTS "custom_order_refs_insert_public" ON storage.objects;
CREATE POLICY "custom_order_refs_insert_public"
  ON storage.objects
  FOR INSERT
  TO public
  WITH CHECK (bucket_id = 'custom-order-refs');

DROP POLICY IF EXISTS "custom_order_refs_update_public" ON storage.objects;
CREATE POLICY "custom_order_refs_update_public"
  ON storage.objects
  FOR UPDATE
  TO public
  USING (bucket_id = 'custom-order-refs')
  WITH CHECK (bucket_id = 'custom-order-refs');
