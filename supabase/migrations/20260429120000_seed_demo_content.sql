-- Demo seed: products (remote HTTPS URLs in product_images.storage_path), testimonials, gallery.
-- Images: Pexels — https://www.pexels.com/license/ — verified CDN URLs (many legacy Unsplash photo IDs now 404).

-- ---------- Bouquets ----------
INSERT INTO public.products (category_id, name, slug, price_inr, short_description, long_description, materials, dimensions, delivery_info, is_featured, is_best_seller, is_published, sort_order)
SELECT c.id, 'Velvet Rose Hand-Tied Bouquet', 'velvet-rose-hand-tied-bouquet', 2799,
  'Silk roses in deep burgundy with seeded eucalyptus.',
  'Hand-tied silhouette ideal for gifting or bridal portraits. Stems finished with satin ribbon.',
  'Silk roses, faux eucalyptus, textile ribbon', 'Approx. 32 cm diameter',
  'Ships in a protective box; pan-India in 5–7 business days.', true, false, true, 1
FROM public.categories c WHERE c.slug = 'bouquets'
AND NOT EXISTS (SELECT 1 FROM public.products WHERE slug = 'velvet-rose-hand-tied-bouquet');

INSERT INTO public.product_images (product_id, storage_path, alt, sort_order)
SELECT p.id, 'https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg', 'Velvet rose silk bouquet', 0
FROM public.products p WHERE p.slug = 'velvet-rose-hand-tied-bouquet'
AND NOT EXISTS (SELECT 1 FROM public.product_images pi WHERE pi.product_id = p.id);

INSERT INTO public.products (category_id, name, slug, price_inr, short_description, long_description, materials, dimensions, delivery_info, is_featured, is_best_seller, is_published, sort_order)
SELECT c.id, 'Blush Peony Classic Bouquet', 'blush-peony-classic-bouquet', 2599,
  'Full peony clusters in powder blush with dusty miller.',
  'Romantic dome shape; lovely for anniversaries and Mother''s Day.',
  'Silk peonies, faux dusty miller', 'Approx. 28 cm diameter',
  'Gift-ready sleeve included.', false, false, true, 2
FROM public.categories c WHERE c.slug = 'bouquets'
AND NOT EXISTS (SELECT 1 FROM public.products WHERE slug = 'blush-peony-classic-bouquet');

INSERT INTO public.product_images (product_id, storage_path, alt, sort_order)
SELECT p.id, 'https://images.pexels.com/photos/2746155/pexels-photo-2746155.jpeg', 'Blush peony bouquet', 0
FROM public.products p WHERE p.slug = 'blush-peony-classic-bouquet'
AND NOT EXISTS (SELECT 1 FROM public.product_images pi WHERE pi.product_id = p.id);

INSERT INTO public.products (category_id, name, slug, price_inr, short_description, long_description, materials, dimensions, delivery_info, is_featured, is_best_seller, is_published, sort_order)
SELECT c.id, 'Silk Lily Elegance Bouquet', 'silk-lily-elegance-bouquet', 2299,
  'White Casablanca-style lilies with tropical leaves.',
  'Clean vertical lines that photograph beautifully on console tables.',
  'Silk lilies, faux monstera leaves', 'Height approx. 55 cm',
  'Stem-wrapped base; ships assembled.', false, true, true, 3
FROM public.categories c WHERE c.slug = 'bouquets'
AND NOT EXISTS (SELECT 1 FROM public.products WHERE slug = 'silk-lily-elegance-bouquet');

INSERT INTO public.product_images (product_id, storage_path, alt, sort_order)
SELECT p.id, 'https://images.pexels.com/photos/6633446/pexels-photo-6633446.jpeg', 'White silk lily bouquet', 0
FROM public.products p WHERE p.slug = 'silk-lily-elegance-bouquet'
AND NOT EXISTS (SELECT 1 FROM public.product_images pi WHERE pi.product_id = p.id);

INSERT INTO public.products (category_id, name, slug, price_inr, short_description, long_description, materials, dimensions, delivery_info, is_featured, is_best_seller, is_published, sort_order)
SELECT c.id, 'Meadow Wildflower Bunch', 'meadow-wildflower-bunch', 1899,
  'Mixed meadow blooms in butter yellow and lavender.',
  'Loose, gathered shape inspired by countryside lanes.',
  'Silk wildflowers, textile stems', 'Approx. 26 cm diameter',
  'Packaged flat; fluff on arrival.', true, false, true, 4
FROM public.categories c WHERE c.slug = 'bouquets'
AND NOT EXISTS (SELECT 1 FROM public.products WHERE slug = 'meadow-wildflower-bunch');

INSERT INTO public.product_images (product_id, storage_path, alt, sort_order)
SELECT p.id, 'https://images.pexels.com/photos/298246/pexels-photo-298246.jpeg', 'Meadow wildflower bouquet', 0
FROM public.products p WHERE p.slug = 'meadow-wildflower-bunch'
AND NOT EXISTS (SELECT 1 FROM public.product_images pi WHERE pi.product_id = p.id);

INSERT INTO public.products (category_id, name, slug, price_inr, short_description, long_description, materials, dimensions, delivery_info, is_featured, is_best_seller, is_published, sort_order)
SELECT c.id, 'Ivory Garden Bouquet', 'ivory-garden-bouquet', 2699,
  'Garden roses, spray roses, and soft green amaranthus.',
  'Dense bridal-style bouquet with layered petals.',
  'Silk garden roses, faux amaranthus', 'Approx. 30 cm diameter',
  'Includes ribbon color of your choice (note at order).', false, true, true, 5
FROM public.categories c WHERE c.slug = 'bouquets'
AND NOT EXISTS (SELECT 1 FROM public.products WHERE slug = 'ivory-garden-bouquet');

INSERT INTO public.product_images (product_id, storage_path, alt, sort_order)
SELECT p.id, 'https://images.pexels.com/photos/3648305/pexels-photo-3648305.jpeg', 'Ivory garden rose bouquet', 0
FROM public.products p WHERE p.slug = 'ivory-garden-bouquet'
AND NOT EXISTS (SELECT 1 FROM public.product_images pi WHERE pi.product_id = p.id);

-- ---------- Gifts ----------
INSERT INTO public.products (category_id, name, slug, price_inr, short_description, long_description, materials, dimensions, delivery_info, is_featured, is_best_seller, is_published, sort_order)
SELECT c.id, 'Rose Luxe Gift Box', 'rose-luxe-gift-box', 3499,
  'Silk roses arranged in a rigid keepsake box.',
  'Ideal for proposals and milestone birthdays.',
  'Silk roses, cardboard gift box, velvet lining', 'Box 28 × 28 × 12 cm',
  'Ships with lid and brand sleeve.', false, false, true, 1
FROM public.categories c WHERE c.slug = 'gifts'
AND NOT EXISTS (SELECT 1 FROM public.products WHERE slug = 'rose-luxe-gift-box');

INSERT INTO public.product_images (product_id, storage_path, alt, sort_order)
SELECT p.id, 'https://images.pexels.com/photos/4050299/pexels-photo-4050299.jpeg', 'Rose gift box arrangement', 0
FROM public.products p WHERE p.slug = 'rose-luxe-gift-box'
AND NOT EXISTS (SELECT 1 FROM public.product_images pi WHERE pi.product_id = p.id);

INSERT INTO public.products (category_id, name, slug, price_inr, short_description, long_description, materials, dimensions, delivery_info, is_featured, is_best_seller, is_published, sort_order)
SELECT c.id, 'Dried Floral Gift Set', 'dried-floral-gift-set', 1599,
  'Curated dried palette in a kraft gift crate.',
  'Pairs with our scented sachet; ready to regift.',
  'Dried botanicals, paper wrap, wood crate', 'Crate 24 × 18 × 10 cm',
  'Fragile; we pad corners heavily.', true, false, true, 2
FROM public.categories c WHERE c.slug = 'gifts'
AND NOT EXISTS (SELECT 1 FROM public.products WHERE slug = 'dried-floral-gift-set');

INSERT INTO public.product_images (product_id, storage_path, alt, sort_order)
SELECT p.id, 'https://images.pexels.com/photos/5650027/pexels-photo-5650027.jpeg', 'Dried floral gift set', 0
FROM public.products p WHERE p.slug = 'dried-floral-gift-set'
AND NOT EXISTS (SELECT 1 FROM public.product_images pi WHERE pi.product_id = p.id);

INSERT INTO public.products (category_id, name, slug, price_inr, short_description, long_description, materials, dimensions, delivery_info, is_featured, is_best_seller, is_published, sort_order)
SELECT c.id, 'Mini Boutonnière Trio', 'mini-boutonniere-trio', 899,
  'Three clip-on boutonnières in ivory, blush, and burgundy.',
  'Perfect for groomsmen bundles or cocktail jackets.',
  'Silk blooms, metal clips', 'Each approx. 6 cm',
  'Ships in slim rigid mailer.', false, false, true, 3
FROM public.categories c WHERE c.slug = 'gifts'
AND NOT EXISTS (SELECT 1 FROM public.products WHERE slug = 'mini-boutonniere-trio');

INSERT INTO public.product_images (product_id, storage_path, alt, sort_order)
SELECT p.id, 'https://images.pexels.com/photos/6643699/pexels-photo-6643699.jpeg', 'Mini boutonniere florals', 0
FROM public.products p WHERE p.slug = 'mini-boutonniere-trio'
AND NOT EXISTS (SELECT 1 FROM public.product_images pi WHERE pi.product_id = p.id);

INSERT INTO public.products (category_id, name, slug, price_inr, short_description, long_description, materials, dimensions, delivery_info, is_featured, is_best_seller, is_published, sort_order)
SELECT c.id, 'Orchid Table Gift Arrangement', 'orchid-table-gift-arrangement', 4199,
  'Phalaenopsis-style stems in a ceramic bowl.',
  'Statement piece for housewarming or Diwali gifting.',
  'Silk orchids, ceramic vessel', 'Vessel 22 cm wide',
  'Double-boxed for safety.', false, true, true, 4
FROM public.categories c WHERE c.slug = 'gifts'
AND NOT EXISTS (SELECT 1 FROM public.products WHERE slug = 'orchid-table-gift-arrangement');

INSERT INTO public.product_images (product_id, storage_path, alt, sort_order)
SELECT p.id, 'https://images.pexels.com/photos/5414015/pexels-photo-5414015.jpeg', 'Orchid table arrangement', 0
FROM public.products p WHERE p.slug = 'orchid-table-gift-arrangement'
AND NOT EXISTS (SELECT 1 FROM public.product_images pi WHERE pi.product_id = p.id);

INSERT INTO public.products (category_id, name, slug, price_inr, short_description, long_description, materials, dimensions, delivery_info, is_featured, is_best_seller, is_published, sort_order)
SELECT c.id, 'Scented Botanical Gift Bundle', 'scented-botanical-gift-bundle', 1299,
  'Potpourri jar plus mini silk posy.',
  'Subtle vanilla-linen fragrance; lovely desk gift.',
  'Dried potpourri, glass jar, silk posy', 'Jar 12 cm tall',
  'Includes care card.', true, false, true, 5
FROM public.categories c WHERE c.slug = 'gifts'
AND NOT EXISTS (SELECT 1 FROM public.products WHERE slug = 'scented-botanical-gift-bundle');

INSERT INTO public.product_images (product_id, storage_path, alt, sort_order)
SELECT p.id, 'https://images.pexels.com/photos/118030/pexels-photo-118030.jpeg', 'Scented botanical gift', 0
FROM public.products p WHERE p.slug = 'scented-botanical-gift-bundle'
AND NOT EXISTS (SELECT 1 FROM public.product_images pi WHERE pi.product_id = p.id);

-- ---------- Wedding decor ----------
INSERT INTO public.products (category_id, name, slug, price_inr, short_description, long_description, materials, dimensions, delivery_info, is_featured, is_best_seller, is_published, sort_order)
SELECT c.id, 'Pearl Bridal Bouquet', 'pearl-bridal-bouquet', 5999,
  'Cascading orchids and roses with pearl accents.',
  'Designed for mandap and reception portraits alike.',
  'Silk orchids, pearls, textile ribbon', 'Cascade length approx. 65 cm',
  'Made-to-order; allow 10–14 days.', false, false, true, 1
FROM public.categories c WHERE c.slug = 'wedding-decor'
AND NOT EXISTS (SELECT 1 FROM public.products WHERE slug = 'pearl-bridal-bouquet');

INSERT INTO public.product_images (product_id, storage_path, alt, sort_order)
SELECT p.id, 'https://images.pexels.com/photos/4226808/pexels-photo-4226808.jpeg', 'Pearl bridal bouquet', 0
FROM public.products p WHERE p.slug = 'pearl-bridal-bouquet'
AND NOT EXISTS (SELECT 1 FROM public.product_images pi WHERE pi.product_id = p.id);

INSERT INTO public.products (category_id, name, slug, price_inr, short_description, long_description, materials, dimensions, delivery_info, is_featured, is_best_seller, is_published, sort_order)
SELECT c.id, 'Aisle Petal Runner Set', 'aisle-petal-runner-set', 4499,
  'Silk petals plus reusable runner clips.',
  'Enough for a 12 m aisle; gentle blush / ivory mix.',
  'Silk petals, metal clips', 'Coverage kit for 12 m × 1 m',
  'Ships in vacuum packs.', false, true, true, 2
FROM public.categories c WHERE c.slug = 'wedding-decor'
AND NOT EXISTS (SELECT 1 FROM public.products WHERE slug = 'aisle-petal-runner-set');

INSERT INTO public.product_images (product_id, storage_path, alt, sort_order)
SELECT p.id, 'https://images.pexels.com/photos/5636439/pexels-photo-5636439.jpeg', 'Wedding aisle petals', 0
FROM public.products p WHERE p.slug = 'aisle-petal-runner-set'
AND NOT EXISTS (SELECT 1 FROM public.product_images pi WHERE pi.product_id = p.id);

INSERT INTO public.products (category_id, name, slug, price_inr, short_description, long_description, materials, dimensions, delivery_info, is_featured, is_best_seller, is_published, sort_order)
SELECT c.id, 'Ceremony Arch Floral Spray', 'ceremony-arch-floral-spray', 12999,
  'Modular corner sprays for round or square arches.',
  'Mix of hydrangea, rose, and trailing amaranthus.',
  'Silk blooms, zip ties included', 'Each spray approx. 90 cm wide',
  'Requires on-site fluffing; video guide sent.', true, false, true, 3
FROM public.categories c WHERE c.slug = 'wedding-decor'
AND NOT EXISTS (SELECT 1 FROM public.products WHERE slug = 'ceremony-arch-floral-spray');

INSERT INTO public.product_images (product_id, storage_path, alt, sort_order)
SELECT p.id, 'https://images.pexels.com/photos/264614/pexels-photo-264614.jpeg', 'Ceremony arch florals', 0
FROM public.products p WHERE p.slug = 'ceremony-arch-floral-spray'
AND NOT EXISTS (SELECT 1 FROM public.product_images pi WHERE pi.product_id = p.id);

INSERT INTO public.products (category_id, name, slug, price_inr, short_description, long_description, materials, dimensions, delivery_info, is_featured, is_best_seller, is_published, sort_order)
SELECT c.id, 'Bridesmaid Posy Set (6)', 'bridesmaid-posy-set-six', 8999,
  'Six matching compact bouquets with satin wraps.',
  'Coordinates with Pearl Bridal Bouquet palette.',
  'Silk roses, eucalyptus', 'Each approx. 22 cm diameter',
  'Shipped in one trunk box.', false, false, true, 4
FROM public.categories c WHERE c.slug = 'wedding-decor'
AND NOT EXISTS (SELECT 1 FROM public.products WHERE slug = 'bridesmaid-posy-set-six');

INSERT INTO public.product_images (product_id, storage_path, alt, sort_order)
SELECT p.id, 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg', 'Bridesmaid posies', 0
FROM public.products p WHERE p.slug = 'bridesmaid-posy-set-six'
AND NOT EXISTS (SELECT 1 FROM public.product_images pi WHERE pi.product_id = p.id);

INSERT INTO public.products (category_id, name, slug, price_inr, short_description, long_description, materials, dimensions, delivery_info, is_featured, is_best_seller, is_published, sort_order)
SELECT c.id, 'Reception Head Table Garland', 'reception-head-table-garland', 7499,
  'Dense greenery garland with blush blooms.',
  'Sized for a 6 ft sweetheart table.',
  'Silk greenery, roses', 'Approx. 200 × 45 cm',
  'Delivered folded; zip ties included.', false, false, true, 5
FROM public.categories c WHERE c.slug = 'wedding-decor'
AND NOT EXISTS (SELECT 1 FROM public.products WHERE slug = 'reception-head-table-garland');

INSERT INTO public.product_images (product_id, storage_path, alt, sort_order)
SELECT p.id, 'https://images.pexels.com/photos/531990/pexels-photo-531990.jpeg', 'Head table garland', 0
FROM public.products p WHERE p.slug = 'reception-head-table-garland'
AND NOT EXISTS (SELECT 1 FROM public.product_images pi WHERE pi.product_id = p.id);

-- ---------- Wall art ----------
INSERT INTO public.products (category_id, name, slug, price_inr, short_description, long_description, materials, dimensions, delivery_info, is_featured, is_best_seller, is_published, sort_order)
SELECT c.id, 'Framed Floral Panel — Blush', 'framed-floral-panel-blush', 4999,
  'Shadow-box depth with layered silk blooms.',
  'Float-mounted on linen backing inside hardwood frame.',
  'Silk blooms, linen, hardwood frame', 'Frame 50 × 70 cm',
  'Corner protectors; ships upright.', true, false, true, 1
FROM public.categories c WHERE c.slug = 'wall-art'
AND NOT EXISTS (SELECT 1 FROM public.products WHERE slug = 'framed-floral-panel-blush');

INSERT INTO public.product_images (product_id, storage_path, alt, sort_order)
SELECT p.id, 'https://images.pexels.com/photos/687824/pexels-photo-687824.jpeg', 'Framed blush floral panel', 0
FROM public.products p WHERE p.slug = 'framed-floral-panel-blush'
AND NOT EXISTS (SELECT 1 FROM public.product_images pi WHERE pi.product_id = p.id);

INSERT INTO public.products (category_id, name, slug, price_inr, short_description, long_description, materials, dimensions, delivery_info, is_featured, is_best_seller, is_published, sort_order)
SELECT c.id, 'Oversized Peony Canvas', 'oversized-peony-canvas', 6299,
  'Gallery-wrap canvas with painted peony macro.',
  'Matte finish; soft blush palette for living rooms.',
  'Canvas, pine stretchers', '100 × 75 cm',
  'Hanging hardware included.', false, true, true, 2
FROM public.categories c WHERE c.slug = 'wall-art'
AND NOT EXISTS (SELECT 1 FROM public.products WHERE slug = 'oversized-peony-canvas');

INSERT INTO public.product_images (product_id, storage_path, alt, sort_order)
SELECT p.id, 'https://images.pexels.com/photos/815887/pexels-photo-815887.jpeg', 'Oversized peony canvas art', 0
FROM public.products p WHERE p.slug = 'oversized-peony-canvas'
AND NOT EXISTS (SELECT 1 FROM public.product_images pi WHERE pi.product_id = p.id);

INSERT INTO public.products (category_id, name, slug, price_inr, short_description, long_description, materials, dimensions, delivery_info, is_featured, is_best_seller, is_published, sort_order)
SELECT c.id, 'Botanical Line Art Set (3)', 'botanical-line-art-set-three', 2199,
  'Three minimalist stems on ivory paper.',
  'Sold as triptych; fits standard IKEA frames.',
  'Archival prints', 'Each A3',
  'Ships rolled in tube.', false, false, true, 3
FROM public.categories c WHERE c.slug = 'wall-art'
AND NOT EXISTS (SELECT 1 FROM public.products WHERE slug = 'botanical-line-art-set-three');

INSERT INTO public.product_images (product_id, storage_path, alt, sort_order)
SELECT p.id, 'https://images.pexels.com/photos/459904/pexels-photo-459904.jpeg', 'Botanical line art prints', 0
FROM public.products p WHERE p.slug = 'botanical-line-art-set-three'
AND NOT EXISTS (SELECT 1 FROM public.product_images pi WHERE pi.product_id = p.id);

INSERT INTO public.products (category_id, name, slug, price_inr, short_description, long_description, materials, dimensions, delivery_info, is_featured, is_best_seller, is_published, sort_order)
SELECT c.id, 'Preserved Floral Shadow Box', 'preserved-floral-shadow-box', 3799,
  'Real-touch tulips under museum glass.',
  'Deep box for hallway or nursery accent.',
  'Silk tulips, glass, MDF frame', '40 × 40 × 8 cm',
  'Fragile — signature delivery recommended.', false, true, true, 4
FROM public.categories c WHERE c.slug = 'wall-art'
AND NOT EXISTS (SELECT 1 FROM public.products WHERE slug = 'preserved-floral-shadow-box');

INSERT INTO public.product_images (product_id, storage_path, alt, sort_order)
SELECT p.id, 'https://images.pexels.com/photos/696996/pexels-photo-696996.jpeg', 'Preserved floral shadow box', 0
FROM public.products p WHERE p.slug = 'preserved-floral-shadow-box'
AND NOT EXISTS (SELECT 1 FROM public.product_images pi WHERE pi.product_id = p.id);

INSERT INTO public.products (category_id, name, slug, price_inr, short_description, long_description, materials, dimensions, delivery_info, is_featured, is_best_seller, is_published, sort_order)
SELECT c.id, 'Circular Wreath Wall Piece', 'circular-wreath-wall-piece', 3299,
  'Bohemian wreath with dried hydrangea tones.',
  'Lightweight for Command-strip hanging.',
  'Silk hydrangea, grapevine base', 'Diameter 45 cm',
  'Ribbon tie included.', false, false, true, 5
FROM public.categories c WHERE c.slug = 'wall-art'
AND NOT EXISTS (SELECT 1 FROM public.products WHERE slug = 'circular-wreath-wall-piece');

INSERT INTO public.product_images (product_id, storage_path, alt, sort_order)
SELECT p.id, 'https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg', 'Circular floral wreath', 0
FROM public.products p WHERE p.slug = 'circular-wreath-wall-piece'
AND NOT EXISTS (SELECT 1 FROM public.product_images pi WHERE pi.product_id = p.id);

-- ---------- Centerpieces ----------
INSERT INTO public.products (category_id, name, slug, price_inr, short_description, long_description, materials, dimensions, delivery_info, is_featured, is_best_seller, is_published, sort_order)
SELECT c.id, 'Crystal Bowl Floral Centerpiece', 'crystal-bowl-floral-centerpiece', 5599,
  'Low arrangement in cut-glass bowl.',
  'Event-ready; reflects candlelight beautifully.',
  'Silk peonies, glass bowl', 'Bowl 30 cm diameter',
  'Bowl nested in foam.', true, false, true, 1
FROM public.categories c WHERE c.slug = 'centerpieces'
AND NOT EXISTS (SELECT 1 FROM public.products WHERE slug = 'crystal-bowl-floral-centerpiece');

INSERT INTO public.product_images (product_id, storage_path, alt, sort_order)
SELECT p.id, 'https://images.pexels.com/photos/1105166/pexels-photo-1105166.jpeg', 'Crystal bowl centerpiece', 0
FROM public.products p WHERE p.slug = 'crystal-bowl-floral-centerpiece'
AND NOT EXISTS (SELECT 1 FROM public.product_images pi WHERE pi.product_id = p.id);

INSERT INTO public.products (category_id, name, slug, price_inr, short_description, long_description, materials, dimensions, delivery_info, is_featured, is_best_seller, is_published, sort_order)
SELECT c.id, 'Taper Candle Ring Arrangement', 'taper-candle-ring-arrangement', 1999,
  'Ring fits standard taper trio plates.',
  'Greenery-forward with berry accents.',
  'Silk greenery, metal ring', 'Ring inner 12 cm',
  'Candles not included.', false, false, true, 2
FROM public.categories c WHERE c.slug = 'centerpieces'
AND NOT EXISTS (SELECT 1 FROM public.products WHERE slug = 'taper-candle-ring-arrangement');

INSERT INTO public.product_images (product_id, storage_path, alt, sort_order)
SELECT p.id, 'https://images.pexels.com/photos/1308885/pexels-photo-1308885.jpeg', 'Taper candle ring florals', 0
FROM public.products p WHERE p.slug = 'taper-candle-ring-arrangement'
AND NOT EXISTS (SELECT 1 FROM public.product_images pi WHERE pi.product_id = p.id);

INSERT INTO public.products (category_id, name, slug, price_inr, short_description, long_description, materials, dimensions, delivery_info, is_featured, is_best_seller, is_published, sort_order)
SELECT c.id, 'Low Table Runner Greenery', 'low-table-runner-greenery', 6799,
  'Dense eucalyptus runner with scattered blooms.',
  'Sized for 8 ft banquet tables.',
  'Silk eucalyptus, roses', 'Approx. 240 × 35 cm',
  'Ships coiled; fluff instructions included.', false, true, true, 3
FROM public.categories c WHERE c.slug = 'centerpieces'
AND NOT EXISTS (SELECT 1 FROM public.products WHERE slug = 'low-table-runner-greenery');

INSERT INTO public.product_images (product_id, storage_path, alt, sort_order)
SELECT p.id, 'https://images.pexels.com/photos/1308880/pexels-photo-1308880.jpeg', 'Greenery table runner', 0
FROM public.products p WHERE p.slug = 'low-table-runner-greenery'
AND NOT EXISTS (SELECT 1 FROM public.product_images pi WHERE pi.product_id = p.id);

INSERT INTO public.products (category_id, name, slug, price_inr, short_description, long_description, materials, dimensions, delivery_info, is_featured, is_best_seller, is_published, sort_order)
SELECT c.id, 'Hotel Lobby Urn Display', 'hotel-lobby-urn-display', 14999,
  'Tall urn arrangement for entry consoles.',
  'Pairs with warm brass or black urn (sold separately).',
  'Silk tropical leaves, orchids', 'Height approx. 110 cm',
  'Freight quote for metro cities.', false, false, true, 4
FROM public.categories c WHERE c.slug = 'centerpieces'
AND NOT EXISTS (SELECT 1 FROM public.products WHERE slug = 'hotel-lobby-urn-display');

INSERT INTO public.product_images (product_id, storage_path, alt, sort_order)
SELECT p.id, 'https://images.pexels.com/photos/1308882/pexels-photo-1308882.jpeg', 'Lobby urn floral display', 0
FROM public.products p WHERE p.slug = 'hotel-lobby-urn-display'
AND NOT EXISTS (SELECT 1 FROM public.product_images pi WHERE pi.product_id = p.id);

INSERT INTO public.products (category_id, name, slug, price_inr, short_description, long_description, materials, dimensions, delivery_info, is_featured, is_best_seller, is_published, sort_order)
SELECT c.id, 'Festive Red & Gold Tablescape', 'festive-red-gold-tablescape', 8299,
  'Matching centerpiece + charger ring set.',
  'Designed for Diwali and wedding sangeet.',
  'Silk marigolds, roses, metal bases', 'Centerpiece 45 cm wide',
  'Packaged in two boxes.', true, false, true, 5
FROM public.categories c WHERE c.slug = 'centerpieces'
AND NOT EXISTS (SELECT 1 FROM public.products WHERE slug = 'festive-red-gold-tablescape');

INSERT INTO public.product_images (product_id, storage_path, alt, sort_order)
SELECT p.id, 'https://images.pexels.com/photos/1308883/pexels-photo-1308883.jpeg', 'Festive red gold centerpiece', 0
FROM public.products p WHERE p.slug = 'festive-red-gold-tablescape'
AND NOT EXISTS (SELECT 1 FROM public.product_images pi WHERE pi.product_id = p.id);

-- ---------- Custom orders ----------
INSERT INTO public.products (category_id, name, slug, price_inr, short_description, long_description, materials, dimensions, delivery_info, is_featured, is_best_seller, is_published, sort_order)
SELECT c.id, 'Bespoke Bridal Bouquet Consultation', 'bespoke-bridal-bouquet-consultation', 1500,
  'Design session + mood board before we craft.',
  'Deposit adjusts toward final bouquet quote.',
  'Consultation only', '—',
  'Video or studio slot in Bangalore.', false, false, true, 1
FROM public.categories c WHERE c.slug = 'custom-orders'
AND NOT EXISTS (SELECT 1 FROM public.products WHERE slug = 'bespoke-bridal-bouquet-consultation');

INSERT INTO public.product_images (product_id, storage_path, alt, sort_order)
SELECT p.id, 'https://images.pexels.com/photos/1308884/pexels-photo-1308884.jpeg', 'Bridal bouquet consultation', 0
FROM public.products p WHERE p.slug = 'bespoke-bridal-bouquet-consultation'
AND NOT EXISTS (SELECT 1 FROM public.product_images pi WHERE pi.product_id = p.id);

INSERT INTO public.products (category_id, name, slug, price_inr, short_description, long_description, materials, dimensions, delivery_info, is_featured, is_best_seller, is_published, sort_order)
SELECT c.id, 'Corporate Event Floral Package', 'corporate-event-floral-package', 49999,
  'Stage + delegate table styling for up to 200 guests.',
  'Includes site visit in select metros.',
  'Mixed silk florals', 'Per floor plan',
  'Proposal within 5 business days.', false, false, true, 2
FROM public.categories c WHERE c.slug = 'custom-orders'
AND NOT EXISTS (SELECT 1 FROM public.products WHERE slug = 'corporate-event-floral-package');

INSERT INTO public.product_images (product_id, storage_path, alt, sort_order)
SELECT p.id, 'https://images.pexels.com/photos/1308886/pexels-photo-1308886.jpeg', 'Corporate event florals', 0
FROM public.products p WHERE p.slug = 'corporate-event-floral-package'
AND NOT EXISTS (SELECT 1 FROM public.product_images pi WHERE pi.product_id = p.id);

INSERT INTO public.products (category_id, name, slug, price_inr, short_description, long_description, materials, dimensions, delivery_info, is_featured, is_best_seller, is_published, sort_order)
SELECT c.id, 'Home Styling Floral Audit', 'home-styling-floral-audit', 3500,
  'We measure light + palette and propose permanent installs.',
  'Ideal for new apartments and studio tours.',
  'Audit report PDF', '90 min session',
  'On-site in Bengaluru; remote option available.', true, false, true, 3
FROM public.categories c WHERE c.slug = 'custom-orders'
AND NOT EXISTS (SELECT 1 FROM public.products WHERE slug = 'home-styling-floral-audit');

INSERT INTO public.product_images (product_id, storage_path, alt, sort_order)
SELECT p.id, 'https://images.pexels.com/photos/1308887/pexels-photo-1308887.jpeg', 'Home styling florals', 0
FROM public.products p WHERE p.slug = 'home-styling-floral-audit'
AND NOT EXISTS (SELECT 1 FROM public.product_images pi WHERE pi.product_id = p.id);

INSERT INTO public.products (category_id, name, slug, price_inr, short_description, long_description, materials, dimensions, delivery_info, is_featured, is_best_seller, is_published, sort_order)
SELECT c.id, 'Memorial Tribute Arrangement', 'memorial-tribute-arrangement', 8999,
  'Respectful palette; customized inscription card.',
  'We coordinate with family on symbolism.',
  'Silk lilies, roses', 'Approx. 70 cm height',
  'Discreet packaging.', false, false, true, 4
FROM public.categories c WHERE c.slug = 'custom-orders'
AND NOT EXISTS (SELECT 1 FROM public.products WHERE slug = 'memorial-tribute-arrangement');

INSERT INTO public.product_images (product_id, storage_path, alt, sort_order)
SELECT p.id, 'https://images.pexels.com/photos/136691/pexels-photo-136691.jpeg', 'Memorial tribute flowers', 0
FROM public.products p WHERE p.slug = 'memorial-tribute-arrangement'
AND NOT EXISTS (SELECT 1 FROM public.product_images pi WHERE pi.product_id = p.id);

INSERT INTO public.products (category_id, name, slug, price_inr, short_description, long_description, materials, dimensions, delivery_info, is_featured, is_best_seller, is_published, sort_order)
SELECT c.id, 'Seasonal Window Display Design', 'seasonal-window-display-design', 24999,
  'Retail vitrine concept + install supervision.',
  'Great for boutiques launching a new collection.',
  'Mixed materials quote', 'Per brief',
  'Travel billed separately.', false, true, true, 5
FROM public.categories c WHERE c.slug = 'custom-orders'
AND NOT EXISTS (SELECT 1 FROM public.products WHERE slug = 'seasonal-window-display-design');

INSERT INTO public.product_images (product_id, storage_path, alt, sort_order)
SELECT p.id, 'https://images.pexels.com/photos/146903/pexels-photo-146903.jpeg', 'Seasonal window floral display', 0
FROM public.products p WHERE p.slug = 'seasonal-window-display-design'
AND NOT EXISTS (SELECT 1 FROM public.product_images pi WHERE pi.product_id = p.id);

-- ---------- Testimonials (idempotent by name + sort_order) ----------
INSERT INTO public.testimonials (name, text, rating, is_published, sort_order)
SELECT 'Priya S.', 'CraftArt transformed our mandap — guests assumed the florals were imported. The silk still looks flawless months later.', 5, true, 1
WHERE NOT EXISTS (SELECT 1 FROM public.testimonials WHERE name = 'Priya S.' AND sort_order = 1);

INSERT INTO public.testimonials (name, text, rating, is_published, sort_order)
SELECT 'Arjun & Meera', 'We ordered wall art and a runner — packaging was museum-grade. WhatsApp updates were quick.', 5, true, 2
WHERE NOT EXISTS (SELECT 1 FROM public.testimonials WHERE name = 'Arjun & Meera' AND sort_order = 2);

INSERT INTO public.testimonials (name, text, rating, is_published, sort_order)
SELECT 'Nisha K.', 'Finally artificial flowers that feel editorial. The bouquet sits on our dining table every week.', 5, true, 3
WHERE NOT EXISTS (SELECT 1 FROM public.testimonials WHERE name = 'Nisha K.' AND sort_order = 3);

INSERT INTO public.testimonials (name, text, rating, is_published, sort_order)
SELECT 'Rahul M.', 'Corporate stage looked premium without the wilt-day stress. Will brief them again for our summit.', 5, true, 4
WHERE NOT EXISTS (SELECT 1 FROM public.testimonials WHERE name = 'Rahul M.' AND sort_order = 4);

-- ---------- Gallery ----------
INSERT INTO public.gallery_items (storage_path, public_url, caption, sort_order, is_published)
SELECT NULL, 'https://images.pexels.com/photos/148629/pexels-photo-148629.jpeg', 'Studio editorial — spring peonies', 1, true
WHERE NOT EXISTS (SELECT 1 FROM public.gallery_items WHERE public_url = 'https://images.pexels.com/photos/148629/pexels-photo-148629.jpeg');

INSERT INTO public.gallery_items (storage_path, public_url, caption, sort_order, is_published)
SELECT NULL, 'https://images.pexels.com/photos/150446/pexels-photo-150446.jpeg', 'Festive tablescape detail', 2, true
WHERE NOT EXISTS (SELECT 1 FROM public.gallery_items WHERE public_url = 'https://images.pexels.com/photos/150446/pexels-photo-150446.jpeg');

INSERT INTO public.gallery_items (storage_path, public_url, caption, sort_order, is_published)
SELECT NULL, 'https://images.pexels.com/photos/152354/pexels-photo-152354.jpeg', 'Signature bouquet study', 3, true
WHERE NOT EXISTS (SELECT 1 FROM public.gallery_items WHERE public_url = 'https://images.pexels.com/photos/152354/pexels-photo-152354.jpeg');

INSERT INTO public.gallery_items (storage_path, public_url, caption, sort_order, is_published)
SELECT NULL, 'https://images.pexels.com/photos/154357/pexels-photo-154357.jpeg', 'Dried botanical texture', 4, true
WHERE NOT EXISTS (SELECT 1 FROM public.gallery_items WHERE public_url = 'https://images.pexels.com/photos/154357/pexels-photo-154357.jpeg');
