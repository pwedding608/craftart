-- Fix demo seed images: many images.unsplash.com/photo-* URLs now return 404.
-- Run after 20260429120000 if rows still point at dead Unsplash CDN URLs.

UPDATE public.product_images SET storage_path = 'https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg'
WHERE storage_path = 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1200&q=80';

UPDATE public.product_images SET storage_path = 'https://images.pexels.com/photos/2746155/pexels-photo-2746155.jpeg'
WHERE storage_path = 'https://images.unsplash.com/photo-1468327768560-75d0abfebba0?w=1200&q=80';

UPDATE public.product_images SET storage_path = 'https://images.pexels.com/photos/6633446/pexels-photo-6633446.jpeg'
WHERE storage_path = 'https://images.unsplash.com/photo-1490751739439-578002642112?w=1200&q=80';

UPDATE public.product_images SET storage_path = 'https://images.pexels.com/photos/298246/pexels-photo-298246.jpeg'
WHERE storage_path = 'https://images.unsplash.com/photo-1520763185298-95b0c443944c?w=1200&q=80';

UPDATE public.product_images SET storage_path = 'https://images.pexels.com/photos/3648305/pexels-photo-3648305.jpeg'
WHERE storage_path = 'https://images.unsplash.com/photo-1518895949257-7621c3e3ed52?w=1200&q=80';

UPDATE public.product_images SET storage_path = 'https://images.pexels.com/photos/4050299/pexels-photo-4050299.jpeg'
WHERE storage_path = 'https://images.unsplash.com/photo-1525310072740-f252532d9b83?w=1200&q=80';

UPDATE public.product_images SET storage_path = 'https://images.pexels.com/photos/5650027/pexels-photo-5650027.jpeg'
WHERE storage_path = 'https://images.unsplash.com/photo-1563241527-296b2ba30e07?w=1200&q=80';

UPDATE public.product_images SET storage_path = 'https://images.pexels.com/photos/6643699/pexels-photo-6643699.jpeg'
WHERE storage_path = 'https://images.unsplash.com/photo-1596627629736-c08f04600199?w=1200&q=80';

UPDATE public.product_images SET storage_path = 'https://images.pexels.com/photos/5414015/pexels-photo-5414015.jpeg'
WHERE storage_path = 'https://images.unsplash.com/photo-1455659817273-f968077319a8?w=1200&q=80';

UPDATE public.product_images SET storage_path = 'https://images.pexels.com/photos/118030/pexels-photo-118030.jpeg'
WHERE storage_path = 'https://images.unsplash.com/photo-1582794543139-8d94832f066b?w=1200&q=80';

UPDATE public.product_images SET storage_path = 'https://images.pexels.com/photos/4226808/pexels-photo-4226808.jpeg'
WHERE storage_path = 'https://images.unsplash.com/photo-1606041011622-aa112b15ed08?w=1200&q=80';

UPDATE public.product_images SET storage_path = 'https://images.pexels.com/photos/5636439/pexels-photo-5636439.jpeg'
WHERE storage_path = 'https://images.unsplash.com/photo-1494336934272-3360c47924ca?w=1200&q=80';

UPDATE public.product_images SET storage_path = 'https://images.pexels.com/photos/264614/pexels-photo-264614.jpeg'
WHERE storage_path = 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=1200&q=80';

UPDATE public.product_images SET storage_path = 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg'
WHERE storage_path = 'https://images.unsplash.com/photo-1533616688419-b7a585564566?w=1200&q=80';

UPDATE public.product_images SET storage_path = 'https://images.pexels.com/photos/531990/pexels-photo-531990.jpeg'
WHERE storage_path = 'https://images.unsplash.com/photo-1597826368522-9f4e30f5e7e5?w=1200&q=80';

UPDATE public.product_images SET storage_path = 'https://images.pexels.com/photos/687824/pexels-photo-687824.jpeg'
WHERE storage_path = 'https://images.unsplash.com/photo-1508610048659-a07b889e6cec?w=1200&q=80';

UPDATE public.product_images SET storage_path = 'https://images.pexels.com/photos/815887/pexels-photo-815887.jpeg'
WHERE storage_path = 'https://images.unsplash.com/photo-1558298673-48efdb24fe41?w=1200&q=80';

UPDATE public.product_images SET storage_path = 'https://images.pexels.com/photos/459904/pexels-photo-459904.jpeg'
WHERE storage_path = 'https://images.unsplash.com/photo-1487073244988-211077bbe396?w=1200&q=80';

UPDATE public.product_images SET storage_path = 'https://images.pexels.com/photos/696996/pexels-photo-696996.jpeg'
WHERE storage_path = 'https://images.unsplash.com/photo-1469253695326-115091235673?w=1200&q=80';

UPDATE public.product_images SET storage_path = 'https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg'
WHERE storage_path = 'https://images.unsplash.com/photo-1457089327909-7f5fc68be49d?w=1200&q=80';

UPDATE public.product_images SET storage_path = 'https://images.pexels.com/photos/1105166/pexels-photo-1105166.jpeg'
WHERE storage_path = 'https://images.unsplash.com/photo-1530967975668-fda5515f8d9a?w=1200&q=80';

UPDATE public.product_images SET storage_path = 'https://images.pexels.com/photos/1308885/pexels-photo-1308885.jpeg'
WHERE storage_path = 'https://images.unsplash.com/photo-1444938294708-ca00529e05f7?w=1200&q=80';

UPDATE public.product_images SET storage_path = 'https://images.pexels.com/photos/1308880/pexels-photo-1308880.jpeg'
WHERE storage_path = 'https://images.unsplash.com/photo-1525445436817-f035fd4ed495?w=1200&q=80';

UPDATE public.product_images SET storage_path = 'https://images.pexels.com/photos/1308882/pexels-photo-1308882.jpeg'
WHERE storage_path = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&q=80';

UPDATE public.product_images SET storage_path = 'https://images.pexels.com/photos/1308883/pexels-photo-1308883.jpeg'
WHERE storage_path = 'https://images.unsplash.com/photo-1519378058459-fbf73f227f98?w=1200&q=80';

UPDATE public.product_images SET storage_path = 'https://images.pexels.com/photos/1308884/pexels-photo-1308884.jpeg'
WHERE storage_path = 'https://images.unsplash.com/photo-1559130397-a860a07f728a?w=1200&q=80';

UPDATE public.product_images SET storage_path = 'https://images.pexels.com/photos/1308886/pexels-photo-1308886.jpeg'
WHERE storage_path = 'https://images.unsplash.com/photo-1562690868-60bbeaf7f6cc?w=1200&q=80';

UPDATE public.product_images SET storage_path = 'https://images.pexels.com/photos/1308887/pexels-photo-1308887.jpeg'
WHERE storage_path = 'https://images.unsplash.com/photo-1613536426639-e291ad10ee30?w=1200&q=80';

UPDATE public.product_images SET storage_path = 'https://images.pexels.com/photos/136691/pexels-photo-136691.jpeg'
WHERE storage_path = 'https://images.unsplash.com/photo-1620706857358-d21162162c44?w=1200&q=80';

UPDATE public.product_images SET storage_path = 'https://images.pexels.com/photos/146903/pexels-photo-146903.jpeg'
WHERE storage_path = 'https://images.unsplash.com/photo-1548587468-43aa21651925?w=1200&q=80';

UPDATE public.gallery_items SET public_url = 'https://images.pexels.com/photos/148629/pexels-photo-148629.jpeg'
WHERE public_url = 'https://images.unsplash.com/photo-1455659817273-f968077319a8?w=1400&q=80';

UPDATE public.gallery_items SET public_url = 'https://images.pexels.com/photos/150446/pexels-photo-150446.jpeg'
WHERE public_url = 'https://images.unsplash.com/photo-1519378058459-fbf73f227f98?w=1400&q=80';

UPDATE public.gallery_items SET public_url = 'https://images.pexels.com/photos/152354/pexels-photo-152354.jpeg'
WHERE public_url = 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1400&q=80';

UPDATE public.gallery_items SET public_url = 'https://images.pexels.com/photos/154357/pexels-photo-154357.jpeg'
WHERE public_url = 'https://images.unsplash.com/photo-1563241527-296b2ba30e07?w=1400&q=80';
