import { useState } from 'react'
import { Box, Button, Container, Stack, TextField, Typography, Link, Divider, Snackbar } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import Instagram from '@mui/icons-material/Instagram'
import { supabase } from '@/lib/supabase/client'
import { isSupabaseConfigured, instagramUrl, brandEmail, whatsappLinkWithText } from '@/lib/config'

const footerLink = (to: string, t: string) => (
  <Button component={RouterLink} to={to} color="inherit" size="small">
    {t}
  </Button>
)

export function Footer() {
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState<string | null>(null)

  async function submitNewsletter() {
    if (!supabase) {
      setMsg('Connect Supabase first (see .env).')
      return
    }
    if (!email.includes('@')) {
      setMsg('Enter a valid email.')
      return
    }
    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert({ email: email.trim().toLowerCase(), source: 'footer' })
    if (error) {
      if (error.code === '23505') setMsg('You are already subscribed. Thank you!')
      else setMsg(error.message)
      return
    }
    setMsg('You are in. Thank you!')
    setEmail('')
  }

  return (
    <Box
      component="footer"
      sx={{ bgcolor: 'text.primary', color: 'common.white', pt: 5, pb: 3, mt: 'auto' }}
    >
      <Container maxWidth="lg">
        <Stack
          spacing={4}
          sx={{ flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between' }}
        >
          <Box>
            <Typography variant="h5" sx={{ fontFamily: 'Cormorant Garamond, serif', mb: 1 }}>
              CraftArt
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, maxWidth: 360 }}>
              Handcrafted artificial flower art. Bouquets, home & wedding decor, and bespoke gifts
              that stay beautiful.
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }} gutterBottom>
              Explore
            </Typography>
            <Stack>
              {footerLink('/shop', 'Shop')}
              {footerLink('/custom-order', 'Custom order')}
              {footerLink('/about', 'About')}
              {footerLink('/contact', 'Contact')}
            </Stack>
          </Box>
          <Box sx={{ minWidth: { md: 280 } }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }} gutterBottom>
              Newsletter
            </Typography>
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
              <TextField
                size="small"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Your email"
                name="email"
                autoComplete="email"
                hiddenLabel
                variant="outlined"
                slotProps={{ htmlInput: { 'aria-label': 'email for newsletter' } }}
                sx={{ bgcolor: 'background.paper', borderRadius: 1 }}
              />
              <Button variant="contained" color="primary" onClick={() => void submitNewsletter()}>
                Join
              </Button>
            </Stack>
            {isSupabaseConfigured ? null : (
              <Typography variant="caption" sx={{ opacity: 0.6, display: 'block', mt: 0.5 }}>
                Configure Supabase to enable signups
              </Typography>
            )}
          </Box>
        </Stack>
        <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.12)' }} />
        <Stack
          spacing={2}
          sx={{
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            sx={{ flexWrap: 'wrap', alignItems: 'center' }}
          >
            <Button
              component="a"
              href={whatsappLinkWithText('Hi! I have a question about CraftArt.')}
              size="small"
              color="inherit"
            >
              WhatsApp
            </Button>
            <Link
              href={instagramUrl}
              color="inherit"
              underline="hover"
              target="_blank"
              rel="noopener"
              sx={{ display: 'inline-flex', alignItems: 'center' }}
            >
              <Instagram fontSize="small" sx={{ mr: 0.5 }} />
              Instagram
            </Link>
            <Button href={`mailto:${brandEmail}`} size="small" color="inherit">
              Email
            </Button>
          </Stack>
          <Typography variant="body2" sx={{ opacity: 0.6 }}>
            © {new Date().getFullYear()} CraftArt. Handmade with care.
          </Typography>
        </Stack>
      </Container>
      <Snackbar
        open={!!msg}
        autoHideDuration={5000}
        onClose={() => { setMsg(null); return undefined; }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        message={msg || undefined}
      />
    </Box>
  )
}
