import { Button, Container, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { Seo } from '@/components/layout/Seo'

export function NotFoundPage() {
  return (
    <>
      <Seo title="Page not found" noIndex path="/404" description="The page you requested could not be found." />
      <Container sx={{ py: 8 }}>
        <Stack spacing={2} sx={{ alignItems: 'flex-start' }}>
          <Typography variant="h1" sx={{ fontSize: '2rem' }}>
            404 — we could not find that page
          </Typography>
          <Button component={Link} to="/" variant="contained">
            Return home
          </Button>
        </Stack>
      </Container>
    </>
  )
}
