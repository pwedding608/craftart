import { Box, Container, Grid, Stack, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { Seo } from '@/components/layout/Seo'

export function AboutPage() {
  return (
    <>
      <Seo
        title="Our story & craftsmanship"
        path="/about"
        description="Discover CraftArt—artificial flower art handmade in India for weddings, gifts, and home."
      />
      <Box sx={{ py: 4, background: (t) => t.palette.background.default }}>
        <Container maxWidth="md">
          <Typography variant="h1" gutterBottom>
            The story of CraftArt
          </Typography>
          <Typography color="text.secondary" component="p" sx={{ mb: 2 }}>
            We began with a love for color and texture that never wilts. Every bouquet, wall frame, and
            centre-piece is sketched, layered, and finished by hand—so your space feels as considered as a
            couture editorial.
          </Typography>
          <Typography color="text.secondary" component="p" sx={{ mb: 2 }}>
            We work with premium silks, realistic stems, and thoughtful palettes. Whether you are planning
            a wedding, gifting a friend, or refreshing a corner of your home, we design pieces that look
            fresh on the shelf and in photos for years to come.
          </Typography>
          <Grid container spacing={3} sx={{ mt: 0 }}>
            <Grid size={12}>
              <Box
                component="img"
                src="/hero-floral.svg"
                alt="Floral art hero"
                sx={{ width: '100%', maxHeight: 360, objectFit: 'cover', borderRadius: 1 }}
                loading="lazy"
              />
            </Grid>
          </Grid>
          <Stack spacing={2} sx={{ mt: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
            <Button component={Link} to="/shop" variant="contained">
              Browse shop
            </Button>
            <Button component={Link} to="/contact" variant="outlined">
              Talk to us
            </Button>
          </Stack>
        </Container>
      </Box>
    </>
  )
}
