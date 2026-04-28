import { Card, CardActionArea, CardContent, Container, Grid, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { Seo } from '@/components/layout/Seo'

const cards = [
  { to: '/admin/products', title: 'Products', d: 'Add, edit, delete product listings and images.' },
  { to: '/admin/inquiries', title: 'Inquiries', d: 'Custom and contact form submissions.' },
  { to: '/admin/orders', title: 'Orders', d: 'Manual and WhatsApp pipeline orders.' },
  { to: '/admin/testimonials', title: 'Testimonials', d: 'Publish or hide client quotes.' },
  { to: '/admin/gallery', title: 'Gallery', d: 'Instagram-style grid (curated images).' },
]

export function AdminDashboardPage() {
  return (
    <>
      <Seo noIndex path="/admin" title="Admin dashboard" />
      <Container maxWidth="md">
        <Typography variant="h1" gutterBottom sx={{ fontSize: '1.75rem' }}>
          Dashboard
        </Typography>
        <Stack spacing={0}>
          <Grid container spacing={2}>
            {cards.map((c) => (
              <Grid size={{ xs: 12, sm: 6 }} key={c.to}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardActionArea component={Link} to={c.to}>
                    <CardContent>
                      <Typography gutterBottom sx={{ fontWeight: 700 }}>
                        {c.title}
                      </Typography>
                      <Typography color="text.secondary" variant="body2">
                        {c.d}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
    </>
  )
}
