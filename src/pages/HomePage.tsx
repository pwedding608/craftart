import { useQuery } from '@tanstack/react-query'
import { Box, Button, Container, Stack, Typography, Accordion, AccordionSummary, AccordionDetails, Grid, Paper } from '@mui/material'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { Seo } from '@/components/layout/Seo'
import { orgJsonLd } from '@/lib/seo/jsonLd'
import { brand } from '@/theme/muiTheme'
import { fetchBestSellers, fetchFeatured, fetchTestimonials, fetchGallery, firstImageUrl } from '@/lib/api/products'
import { publicFileUrl, GALLERY_BUCKET } from '@/lib/supabase/client'
import { ProductCard } from '@/components/shop/ProductCard'
import { whatsappLinkWithText } from '@/lib/config'

const MotionBox = motion.create(Box)

const faqs = [
  {
    q: 'Are your flowers real?',
    a: 'We specialize in high-quality artificial and preserved floral art—long-lasting, dust-friendly, and perfect for display without watering.',
  },
  {
    q: 'Do you deliver across India?',
    a: 'We ship to most pan-India locations. Timelines and packaging are shared at order confirmation (often via WhatsApp).',
  },
  {
    q: 'Can I customize colors and size?',
    a: 'Yes. Use our Custom order page to share your occasion, budget, and reference images.',
  },
]

export function HomePage() {
  const { data: featured = [] } = useQuery({ queryKey: ['featured'], queryFn: fetchFeatured })
  const { data: best = [] } = useQuery({ queryKey: ['best'], queryFn: fetchBestSellers })
  const { data: testimonials = [] } = useQuery({ queryKey: ['testimonials'], queryFn: fetchTestimonials })
  const { data: gallery = [] } = useQuery({ queryKey: ['gallery'], queryFn: fetchGallery })

  return (
    <>
      <Seo path="/" jsonLd={orgJsonLd()} />
      <Box
        sx={{
          position: 'relative',
          minHeight: { xs: 420, md: 520 },
          display: 'flex',
          alignItems: 'center',
          background: `linear-gradient(135deg, ${brand.cream} 0%, #fff 45%, ${brand.blush}22 100%)`,
          overflow: 'hidden',
        }}
      >
        <Box
          component="img"
          src="/hero-floral.svg"
          alt=""
          aria-hidden
          sx={{ position: 'absolute', right: { md: 0 }, top: 0, width: { xs: '100%', md: '50%' }, opacity: 0.9, objectFit: 'cover' }}
        />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: 6 }}>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ maxWidth: 600 }}
          >
            <Typography
              variant="overline"
              color="primary"
              sx={{ fontWeight: 700, letterSpacing: 2 }}
            >
              Premium handmade
            </Typography>
            <Typography variant="h1" sx={{ mt: 1, mb: 2, color: 'text.primary' }}>
              Handcrafted floral art that lasts forever
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Silk bouquets, wedding backdrops, wall art, and gifts—curated in India for an Instagram-worthy home.
            </Typography>
            <Stack spacing={1.5} sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
              <Button component={Link} to="/shop" variant="contained" size="large">
                Shop now
              </Button>
              <Button component={Link} to="/custom-order" variant="outlined" size="large">
                Custom order
              </Button>
              <Button
                href={whatsappLinkWithText('Hi! I would love a custom floral piece from CraftArt.')}
                variant="text"
                size="large"
                color="primary"
              >
                WhatsApp
              </Button>
            </Stack>
          </MotionBox>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Stack spacing={1} sx={{ alignItems: 'center', mb: 3 }}>
          <Typography variant="h2" sx={{ textAlign: 'center' }}>
            Featured pieces
          </Typography>
          <Typography color="text.secondary" sx={{ textAlign: 'center', maxWidth: 520 }}>
            A few arrangements we are proud to show—artificial flowers, real emotion.
          </Typography>
        </Stack>
        <Grid container spacing={2}>
          {(featured.length ? featured : best).slice(0, 3).map((p) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={p.id}>
              <ProductCard product={p} />
            </Grid>
          ))}
        </Grid>
        {!featured.length && !best.length && (
          <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
            Add products in the admin when Supabase is connected.
          </Typography>
        )}
      </Container>

      <Box sx={{ py: 6, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Typography variant="h2" gutterBottom sx={{ textAlign: 'center' }}>
            Why choose us
          </Typography>
          <Grid container spacing={3} sx={{ mt: 0 }}>
            {[
              { t: 'Hand-assembled', d: 'Each piece is designed and built by hand—not mass produced.' },
              { t: 'Wedding & gifts', d: 'From mehendi to reception and thoughtful gifting.' },
              { t: 'Lasts for years', d: 'No wilting, easy to clean, ready for your feed.' },
            ].map((c) => (
              <Grid size={{ xs: 12, md: 4 }} key={c.t}>
                <Paper sx={{ p: 3, height: '100%' }}>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontFamily: 'Cormorant Garamond,serif' }}
                  >
                    {c.t}
                  </Typography>
                  <Typography color="text.secondary">{c.d}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h2" gutterBottom sx={{ textAlign: 'center' }}>
          Best sellers
        </Typography>
        <Grid container spacing={2} sx={{ mt: 0 }}>
          {best.slice(0, 4).map((p) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={p.id}>
              <ProductCard product={p} />
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box sx={{ py: 6, bgcolor: 'background.paper' }}>
        <Container maxWidth="md">
          <Typography variant="h2" gutterBottom sx={{ textAlign: 'center' }}>
            Kind words
          </Typography>
          {testimonials.slice(0, 3).map((t) => (
            <Paper key={t.id} sx={{ p: 3, mb: 2 }}>
              <Typography sx={{ fontStyle: 'italic' }}>“{t.text}”</Typography>
              <Typography variant="subtitle2" sx={{ mt: 1 }}>
                — {t.name}
              </Typography>
            </Paper>
          ))}
          {testimonials.length === 0 && (
            <Typography color="text.secondary" sx={{ textAlign: 'center' }}>
              Testimonials appear after you add them in admin.
            </Typography>
          )}
          <Stack sx={{ alignItems: 'center', mt: 2 }}>
            <Button component={Link} to="/testimonials" variant="outlined">
              View all
            </Button>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h2" gutterBottom sx={{ textAlign: 'center' }}>
          On the grid
        </Typography>
        <Grid container spacing={1}>
          {gallery.length > 0
            ? gallery.map((g) => {
                const src =
                  g.public_url ||
                  (g.storage_path ? publicFileUrl(GALLERY_BUCKET, g.storage_path) : null) ||
                  '/hero-floral.svg'
                return (
                  <Grid size={{ xs: 6, md: 2 }} key={g.id}>
                    <Box
                      component="img"
                      src={src}
                      alt={g.caption || 'Gallery'}
                      loading="lazy"
                      sx={{ width: '100%', borderRadius: 1, objectFit: 'cover', aspectRatio: '1/1' }}
                    />
                  </Grid>
                )
              })
            : featured.slice(0, 6).map((p) => {
                const sorted = [...(p.product_images || [])].sort((a, b) => a.sort_order - b.sort_order)
                return (
                  <Grid size={{ xs: 6, md: 2 }} key={p.id}>
                    <Box
                      component="img"
                      src={firstImageUrl(sorted)}
                      alt={p.name}
                      loading="lazy"
                      sx={{ width: '100%', borderRadius: 1, objectFit: 'cover', aspectRatio: '1/1' }}
                    />
                  </Grid>
                )
              })}
        </Grid>
        {!gallery.length && !featured.length && (
          <Typography color="text.secondary" sx={{ textAlign: 'center' }}>
            Add gallery items in admin or add products to showcase imagery.
          </Typography>
        )}
      </Container>

      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h2" gutterBottom sx={{ textAlign: 'center' }}>
            FAQ
          </Typography>
        {faqs.map((f) => (
          <Accordion key={f.q} disableGutters elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, mb: 1, '&:before': { display: 'none' } }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography sx={{ fontWeight: 600 }}>{f.q}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary">{f.a}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button component={Link} to="/custom-order" variant="contained" size="large">
            Start a custom order
          </Button>
        </Box>
      </Container>
    </>
  )
}
