import { useState } from 'react'
import { Box, Button, Container, Stack, TextField, Typography, Alert, Snackbar } from '@mui/material'
import Instagram from '@mui/icons-material/Instagram'
import { Seo } from '@/components/layout/Seo'
import { supabase } from '@/lib/supabase/client'
import { brandEmail, mapsEmbedUrl, whatsappNumber, whatsappLinkWithText, instagramUrl, isSupabaseConfigured } from '@/lib/config'

export function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [open, setOpen] = useState(false)

  async function send() {
    if (!supabase) return
    const { error } = await supabase.from('inquiries').insert({
      type: 'contact',
      name: name.trim() || 'Visitor',
      email: email || null,
      message: message,
      phone: null,
    })
    if (error) {
      window.alert(error.message)
      return
    }
    setOpen(true)
    setName(''); setEmail(''); setMessage('')
  }

  return (
    <>
      <Seo
        title="Contact CraftArt"
        path="/contact"
        description="Get in touch for custom artificial flower art, wholesale, or events across India."
      />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h1" gutterBottom sx={{ fontSize: '2.2rem' }}>
          Contact
        </Typography>
        <Stack sx={{ flexDirection: 'row', flexWrap: 'wrap', gap: 2, mb: 2 }}>
          <Button
            variant="contained"
            href={whatsappLinkWithText('Hi CraftArt! I would like to get in touch.')}
            target="_blank"
            rel="noopener"
          >
            WhatsApp: {whatsappNumber}
          </Button>
          <Button
            startIcon={<Instagram />}
            href={instagramUrl}
            target="_blank"
            rel="noopener"
          >
            Instagram
          </Button>
          <Button href={`mailto:${brandEmail}`}>Email: {brandEmail}</Button>
        </Stack>

        <Box sx={{ my: 3 }}>
          {mapsEmbedUrl ? (
            <Box
              component="iframe"
              title="Map"
              src={mapsEmbedUrl}
              width="100%"
              height="280"
              sx={{ border: 0, borderRadius: 1 }}
            />
          ) : (
            <Alert severity="info">Set <code>VITE_MAPS_EMBED_URL</code> in .env to show your studio map.</Alert>
          )}
        </Box>

        <Typography variant="h2" gutterBottom sx={{ fontSize: '1.35rem' }}>
          Send a message
        </Typography>
        <Stack spacing={2} sx={{ maxWidth: 600, mx: 0 }}>
          <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} name="cname" />
          <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="cemail" autoComplete="email" />
          <TextField
            multiline
            minRows={4}
            required
            label="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            name="cmessage"
          />
          <Button
            variant="outlined"
            onClick={() => { void send(); return undefined; }}
            disabled={!isSupabaseConfigured}
          >
            Send
          </Button>
        </Stack>
        <Snackbar open={open} onClose={() => { setOpen(false); return undefined; }} autoHideDuration={4000}>
          <Alert severity="success">We received your message. Thank you!</Alert>
        </Snackbar>
      </Container>
    </>
  )
}
