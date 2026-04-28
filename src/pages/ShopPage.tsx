import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams, Link } from 'react-router-dom'
import { Container, Grid, MenuItem, TextField, Typography, Stack, Button } from '@mui/material'
import { Seo } from '@/components/layout/Seo'
import { fetchCategories, fetchProducts } from '@/lib/api/products'
import { ProductCard } from '@/components/shop/ProductCard'
import { isSupabaseConfigured } from '@/lib/config'

type SortKey = 'new' | 'price-asc' | 'price-desc'

export function ShopPage() {
  const { categorySlug } = useParams()
  const [q, setQ] = useState('')
  const [sort, setSort] = useState<SortKey>('new')
  const { data: categories = [] } = useQuery({ queryKey: ['categories'], queryFn: fetchCategories })
  const { data: products = [] } = useQuery({
    queryKey: ['products', categorySlug],
    queryFn: () => fetchProducts({ categorySlug: categorySlug || undefined }),
  })

  const filtered = useMemo(() => {
    let r = products
    if (q.trim()) {
      const t = q.toLowerCase()
      r = r.filter((p) => p.name.toLowerCase().includes(t) || p.short_description?.toLowerCase().includes(t))
    }
    r = [...r]
    if (sort === 'price-asc') r.sort((a, b) => a.price_inr - b.price_inr)
    if (sort === 'price-desc') r.sort((a, b) => b.price_inr - a.price_inr)
    if (sort === 'new') r.sort((a, b) => (a.created_at < b.created_at ? 1 : -1))
    return r
  }, [products, q, sort])

  return (
    <>
      <Seo
        title="Shop artificial flowers & decor"
        path={categorySlug ? `/shop/${categorySlug}` : '/shop'}
        description="Browse handmade artificial flower bouquets, wedding decor, wall art, and gifts. Delivered in India."
      />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h1" gutterBottom>
          Shop
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          Artificial flower shop India—filters for bouquets, gifts, wedding, wall art, and more.
        </Typography>

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          sx={{ mb: 2, alignItems: { xs: 'stretch', md: 'center' } }}
        >
          <TextField
            size="small"
            label="Search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            fullWidth
            name="q"
            autoComplete="off"
          />
          <TextField
            select
            size="small"
            label="Sort by"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            sx={{ minWidth: 180 }}
            name="sort"
          >
            <MenuItem value="new">Latest</MenuItem>
            <MenuItem value="price-asc">Price: low to high</MenuItem>
            <MenuItem value="price-desc">Price: high to low</MenuItem>
          </TextField>
        </Stack>

        <Stack sx={{ flexDirection: 'row', flexWrap: 'wrap', gap: 0.5, mb: 3 }}>
          <Button
            size="small"
            component={Link}
            to="/shop"
            variant={!categorySlug ? 'contained' : 'outlined'}
          >
            All
          </Button>
          {categories.map((c) => (
            <Button
              key={c.id}
              size="small"
              component={Link}
              to={`/shop/${c.slug}`}
              variant={categorySlug === c.slug ? 'contained' : 'outlined'}
            >
              {c.name}
            </Button>
          ))}
        </Stack>

        {!isSupabaseConfigured && (
          <Typography color="error" sx={{ mb: 2 }}>
            Connect Supabase in .env to load catalog.
          </Typography>
        )}

        <Grid container spacing={2}>
          {filtered.map((p) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={p.id}>
              <ProductCard product={p} />
            </Grid>
          ))}
        </Grid>
        {filtered.length === 0 && (
          <Typography color="text.secondary" sx={{ py: 4 }}>
            No products match. Try another category or check back after admin products are live.
          </Typography>
        )}
      </Container>
    </>
  )
}
