import { useState } from 'react'
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material'
import { Seo } from '@/components/layout/Seo'
import { supabase, REF_UPLOADS_BUCKET } from '@/lib/supabase/client'
import { isSupabaseConfigured } from '@/lib/config'

export function CustomOrderPage() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [occasion, setOccasion] = useState('')
  const [budget, setBudget] = useState('')
  const [style, setStyle] = useState('')
  const [message, setMessage] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [toast, setToast] = useState<{ t: 'ok' | 'err'; m: string } | null>(null)

  async function submit() {
    if (!supabase) {
      setToast({ t: 'err', m: 'Configure Supabase in .env first.' })
      return
    }
    if (!name.trim() || !phone.trim()) {
      setToast({ t: 'err', m: 'Name and phone are required.' })
      return
    }
    let refPath: string | null = null
    if (file) {
      const nameSafe = `ref/${crypto.randomUUID()}-${file.name.replace(/[^\w.]/g, '_')}`
      const { error: up } = await supabase.storage
        .from(REF_UPLOADS_BUCKET)
        .upload(nameSafe, file, { upsert: true })
      if (up) {
        setToast({ t: 'err', m: `Image: ${up.message} (see README: Storage bucket + policy).` })
        return
      }
      refPath = nameSafe
    }
    const { error } = await supabase.from('inquiries').insert({
      type: 'custom_order',
      name: name.trim(),
      phone: phone.trim(),
      occasion: occasion || null,
      budget: budget || null,
      style: style || null,
      message: message || null,
      reference_image_path: refPath,
    })
    if (error) {
      setToast({ t: 'err', m: error.message })
      return
    }
    setToast({ t: 'ok', m: 'Thank you! We will get back to you soon.' })
    setName('')
    setPhone('')
    setOccasion('')
    setBudget('')
    setStyle('')
    setMessage('')
    setFile(null)
  }

  return (
    <>
      <Seo
        title="Custom flower arrangement order"
        path="/custom-order"
        description="Request a bespoke artificial flower piece for weddings, gifts, or home."
      />
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Typography variant="h1" gutterBottom sx={{ fontSize: '2.2rem' }}>
          Custom order
        </Typography>
        <Typography color="text.secondary" component="p" sx={{ mb: 2 }}>
          Share your occasion, budget, and style. Optional reference image (requires Supabase Storage).
        </Typography>
        <Stack spacing={2}>
          <TextField
            fullWidth
            required
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            autoComplete="name"
          />
          <TextField
            fullWidth
            required
            label="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            name="phone"
            type="tel"
            autoComplete="tel"
          />
          <TextField
            fullWidth
            label="Occasion"
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
            name="occasion"
          />
          <TextField
            fullWidth
            label="Budget (approx.)"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            name="budget"
          />
          <TextField
            fullWidth
            multiline
            minRows={2}
            label="Style / color notes"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            name="style"
          />
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Reference image (optional)
            </Typography>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => { setFile(e.target.files?.[0] || null); return undefined; }}
              name="ref-file"
              aria-label="Reference image"
            />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
              If uploads fail, run the <code>supabase/migrations</code> for Storage (bucket <code>custom-order-refs</code> and RLS policies).
            </Typography>
          </Box>
          <TextField
            fullWidth
            multiline
            minRows={3}
            label="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            name="message"
          />
        </Stack>
        {!isSupabaseConfigured && (
          <Alert severity="warning" sx={{ mt: 2 }}>
            Add Supabase environment variables to submit.
          </Alert>
        )}
        <Button fullWidth size="large" variant="contained" sx={{ mt: 2 }} onClick={() => void submit()}>
          Submit request
        </Button>
        <Snackbar
          open={!!toast}
          onClose={() => { setToast(null); return undefined; }}
          autoHideDuration={5000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          {toast ? <Alert severity={toast.t === 'ok' ? 'success' : 'error'} onClose={() => { setToast(null); return undefined; }}>{toast.m}</Alert> : <span />}
        </Snackbar>
      </Container>
    </>
  )
}
