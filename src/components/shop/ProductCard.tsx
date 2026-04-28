import { Card, CardActionArea, CardContent, CardMedia, Typography, Box, Chip } from '@mui/material'
import { Link } from 'react-router-dom'
import { firstImageUrl, type ProductWithMeta } from '@/lib/api/products'

type Props = { product: ProductWithMeta }

export function ProductCard({ product }: Props) {
  const imgs = [...(product.product_images || [])].sort((a, b) => a.sort_order - b.sort_order)
  const src = firstImageUrl(imgs)

  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardActionArea component={Link} to={`/product/${product.slug}`}>
        <CardMedia
          component="img"
          height="220"
          image={src}
          alt={product.name}
          loading="lazy"
          sx={{ objectFit: 'cover' }}
        />
        <CardContent>
          {product.is_best_seller && (
            <Box sx={{ mb: 0.5 }}>
              <Chip size="small" label="Best seller" color="primary" />
            </Box>
          )}
          <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Cormorant Garamond,serif' }}>
            {product.name}
          </Typography>
          <Typography color="text.secondary" variant="body2" noWrap>
            {product.short_description}
          </Typography>
          <Typography sx={{ mt: 1, fontWeight: 700 }}>₹{product.price_inr.toLocaleString('en-IN')}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
