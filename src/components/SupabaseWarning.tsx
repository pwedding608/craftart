import { Alert, Box } from '@mui/material'
import { isSupabaseConfigured } from '@/lib/config'

export function SupabaseWarning() {
  if (isSupabaseConfigured) return null
  return (
    <Box sx={{ p: 2, maxWidth: 900, mx: 'auto' }}>
      <Alert severity="warning">
        Set <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_PUBLISHABLE_KEY</code> (or <code>VITE_SUPABASE_ANON_KEY</code>) in a <code>.env</code> file
        to enable products, forms, and admin. See README.
      </Alert>
    </Box>
  )
}
