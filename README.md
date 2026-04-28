# CraftArt

Premium marketing + shop experience for a handmade **artificial flower** brand (India). Built with **Vite + React 19 + TypeScript**, **Material UI 9** (no Tailwind), **Supabase** (Postgres, Auth, Storage), **Framer Motion**, and **react-helmet-async** for SEO.

## Features

- **Public site**: Home (hero, featured, why us, best sellers, testimonials, gallery, FAQ, footer newsletter), Shop with category filters / search / sort, product detail, custom order (with optional image upload), testimonials, contact, floating WhatsApp.
- **Admin** (`/admin/login`): products CRUD with multi-image upload, inquiries, orders, testimonials, gallery URLs.
- **SEO**: meta tags, `robots.txt`, `sitemap.xml` (replace `YOUR-SITE-URL` after deploy), JSON-LD (Organization, Product) on key routes.

## Prerequisites

- Node 20+ recommended
- A [Supabase](https://supabase.com) free project (region close to your users, e.g. India)

## Supabase setup

1. **Create a project** and open **SQL Editor**.

2. Run the migration: copy contents of [`supabase/migrations/20260127000000_init.sql`](supabase/migrations/20260127000000_init.sql) and execute (or use Supabase CLI `supabase db push` if you use the full CLI with linked project).

3. **Storage**: In **Storage**, create public buckets (names must match the app):
   - `product-images` — public read; authenticated upload for admins (set policies; see [`supabase/storage.sql`](supabase/storage.sql) for examples).
   - `custom-order-refs` — for custom-order reference images (tighten policies; by default the app tries to upload to path `ref/...`).

4. **Auth** → **Providers** → enable Email (password) for the admin.

5. **Create your admin user** (Auth → Users) or sign up from the app, then in SQL:
   ```sql
   update public.profiles
   set role = 'admin'
   where id = 'YOUR-USER-UUID-HERE';
   ```
   (Find the UUID in Authentication → Users.)

6. **API keys** (Project Settings → API):
   - **Publishable** public key and project **URL** go into `.env` as `VITE_SUPABASE_PUBLISHABLE_KEY` and `VITE_SUPABASE_URL` (or use legacy `VITE_SUPABASE_ANON_KEY` for the old JWT `anon` key). Never use the `service_role` key in the browser.

## Local development

```bash
cp .env.example .env
# Fill VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_KEY, VITE_WHATSAPP_NUMBER, etc.
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Admin: [http://localhost:5173/admin/login](http://localhost:5173/admin/login).

## Environment variables

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` or `VITE_SUPABASE_ANON_KEY` | Public (publishable or legacy `anon`) key |
| `VITE_SITE_URL` | Public site URL (no trailing slash) for canonical + OG |
| `VITE_WHATSAPP_NUMBER` | E.164 or digits, e.g. `9198XXXXXXXX` for `wa.me` links |
| `VITE_INSTAGRAM_URL` | Full profile URL |
| `VITE_BRAND_EMAIL` | Shown in footer and contact context |
| `VITE_MAPS_EMBED_URL` | Google Maps embed `src` for contact page (optional) |

## Deploy (Vercel / Netlify)

- Build command: `npm run build`
- Output directory: `dist`
- Set the same `VITE_*` env vars in the hosting dashboard
- After first deploy, replace `YOUR-SITE-URL` in `public/sitemap.xml` and `public/robots.txt` (or switch to a generated sitemap / Edge function that lists product URLs)

## Project layout

- `src/app` — `AppRouter`, `providers` (MUI, React Query, Helmet)
- `src/pages` — public routes
- `src/features/admin` — admin UI + guard
- `src/lib` — Supabase client, `http` (axios for future webhooks)
- `src/components` — layout, shop, etc.
- `src/theme` — MUI brand theme (serif + sans, blush/gold palette)

## Future: Razorpay, coupons, reviews

- `orders` table is ready for manual / WhatsApp tracking; add payment provider columns or a new `payments` table when you integrate.
- `product` slug URLs are clean for SEO; extend with `product_reviews` and `coupons` tables in new migrations when needed.

## Scripts

- `npm run dev` — Vite dev server
- `npm run build` — `tsc` + production bundle
- `npm run preview` — preview production build locally
- `npm run lint` — ESLint

## License

Private / your brand — use as you own the content and product imagery.
