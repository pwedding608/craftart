import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams, Link } from 'react-router-dom'
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import { Seo } from '@/components/layout/Seo'
import { productJsonLd } from '@/lib/seo/jsonLd'
import { fetchProductBySlug, fetchProducts, firstImageUrl } from '@/lib/api/products'
import { resolveStorageOrRemoteImageUrl, PRODUCT_IMAGES_BUCKET } from '@/lib/supabase/client'
import { siteUrl, whatsappLinkWithText } from '@/lib/config'
import { ProductCard } from '@/components/shop/ProductCard'
import type { ProductWithMeta } from '@/lib/api/products'

export function ProductDetailPage() {
  const { slug = '' } = useParams()
  const { data: product, isLoading } = useQuery({
    queryKey: ['product', slug],
    queryFn: () => fetchProductBySlug(slug),
    enabled: Boolean(slug),
  })
  const { data: related = [] } = useQuery({
    queryKey: ['related', product?.category_id, product?.id],
    queryFn: async () => {
      if (!product) return []
      const all = await fetchProducts()
      return all.filter((p) => p.category_id === product.category_id && p.id !== product.id).slice(0, 4)
    },
    enabled: Boolean(product),
  })

  const [imgIdx, setImgIdx] = useState(0)

  if (isLoading) {
    return (
      <Container sx={{ py: 6 }}>
        <Typography>Loading…</Typography>
      </Container>
    )
  }
  if (!product) {
    return (
      <Container sx={{ py: 6 }}>
        <Typography>Product not found.</Typography>
        <Button component={Link} to="/shop" sx={{ mt: 2 }}>
          Back to shop
        </Button>
      </Container>
    )
  }

  const images = [...(product.product_images || [])].sort((a, b) => a.sort_order - b.sort_order)
  const main =
    images[imgIdx] && images[imgIdx].storage_path
      ? resolveStorageOrRemoteImageUrl(PRODUCT_IMAGES_BUCKET, images[imgIdx].storage_path)
      : firstImageUrl(images)
  const pageUrl = `${siteUrl.replace(/\/$/, '')}/product/${product.slug}`

  return (
    <>
      <Seo
        title={product.name}
        path={`/product/${product.slug}`}
        description={product.short_description || product.long_description || 'Handmade artificial flower art from CraftArt.'}
        jsonLd={productJsonLd({
          name: product.name,
          description: product.short_description || '',
          image: typeof main === 'string' ? main : firstImageUrl(images),
          price: product.price_inr,
          url: pageUrl,
        })}
      />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Breadcrumbs sx={{ mb: 2 }}>
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Typography color="text.primary">{product.name}</Typography>
        </Breadcrumbs>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              component="img"
              src={main || '/hero-floral.svg'}
              alt={product.name}
              loading="lazy"
              sx={{ width: '100%', borderRadius: 1, maxHeight: 480, objectFit: 'cover' }}
            />
            {images.length > 1 && (
              <Stack sx={{ flexDirection: 'row', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                {images.map((im, i) => (
                  <Box
                    key={im.id}
                    component="img"
                    src={resolveStorageOrRemoteImageUrl(PRODUCT_IMAGES_BUCKET, im.storage_path) || '/hero-floral.svg'}
                    alt={im.alt || product.name}
                    onClick={() => { setImgIdx(i); return undefined; }}
                    sx={{
                      width: 72,
                      height: 72,
                      objectFit: 'cover',
                      borderRadius: 1,
                      cursor: 'pointer',
                      outline: i === imgIdx ? '2px solid' : 'none',
                      outlineColor: 'primary.main',
                    }}
                    loading="lazy"
                  />
                ))}
              </Stack>
            )}
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h1" gutterBottom sx={{ fontSize: { xs: 32, md: 40 } }}>
              {product.name}
            </Typography>
            <Typography color="primary" gutterBottom sx={{ fontWeight: 700, fontSize: 24 }}>
              ₹{product.price_inr.toLocaleString('en-IN')}
            </Typography>
            {product.short_description && (
              <Typography color="text.secondary" component="p" sx={{ mb: 1.5 }}>
                {product.short_description}
              </Typography>
            )}
            {product.long_description && (
              <Typography component="p" sx={{ mb: 1.5 }}>{product.long_description}</Typography>
            )}
            {product.materials && (
              <Typography variant="body2" component="p" sx={{ mb: 1.5 }}>
                <strong>Materials:</strong> {product.materials}
              </Typography>
            )}
            {product.dimensions && (
              <Typography variant="body2" component="p" sx={{ mb: 1.5 }}>
                <strong>Dimensions:</strong> {product.dimensions}
              </Typography>
            )}
            {product.delivery_info && (
              <Typography variant="body2" component="p" sx={{ mb: 1.5 }}>
                <strong>Delivery:</strong> {product.delivery_info}
              </Typography>
            )}
            <Button
              fullWidth
              size="large"
              variant="contained"
              href={whatsappLinkWithText(
                `Hi! I want to order: ${product.name} (₹${product.price_inr}) from CraftArt.`
              )}
              target="_blank"
              rel="noopener"
              sx={{ mt: 2 }}
            >
              Order on WhatsApp
            </Button>
            <Button fullWidth component={Link} to="/custom-order" variant="outlined" sx={{ mt: 1 }}>
              Custom variations
            </Button>
          </Grid>
        </Grid>

        {related.length > 0 && (
          <Box sx={{ mt: 5 }}>
            <Typography variant="h2" gutterBottom sx={{ fontSize: '1.5rem' }}>
              You may also like
            </Typography>
            <Grid container spacing={2}>
              {related.map((p) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={p.id}>
                  <ProductCard product={p as ProductWithMeta} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
    </>
  )
}
