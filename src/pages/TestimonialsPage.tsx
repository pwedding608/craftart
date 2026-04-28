import { useQuery } from '@tanstack/react-query'
import { Box, Card, CardContent, Container, Stack, Rating, Typography } from '@mui/material'
import { Seo } from '@/components/layout/Seo'
import { fetchTestimonials } from '@/lib/api/products'

export function TestimonialsPage() {
  const { data: items = [] } = useQuery({ queryKey: ['testimonials', 'all'], queryFn: fetchTestimonials })
  return (
    <>
      <Seo
        title="Testimonials & reviews"
        path="/testimonials"
        description="Read what our clients say about CraftArt—wedding decor, gifts, and custom artificial flowers."
      />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h1" gutterBottom sx={{ fontSize: '2.2rem' }}>
          Testimonials
        </Typography>
        <Stack spacing={2}>
          {items.map((t) => (
            <Card key={t.id} variant="outlined">
              <CardContent>
                {t.rating != null && <Rating name="r" value={t.rating} readOnly size="small" sx={{ mb: 1 }} />}
                <Typography sx={{ fontStyle: 'italic', fontSize: '1.1rem' }}>
                  “{t.text}”
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  — {t.name}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
        {items.length === 0 && (
          <Box sx={{ py: 4 }}>
            <Typography color="text.secondary">Testimonials will appear when published in admin.</Typography>
          </Box>
        )}
      </Container>
    </>
  )
}
