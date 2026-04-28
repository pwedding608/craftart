import { useState } from 'react'
import { Alert, Box, Button, Container, TextField, Typography } from '@mui/material'
import { useNavigate, useLocation, Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Seo } from '@/components/layout/Seo'

export function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState<string | null>(null)
  const { supabase, isAdmin, user, loading } = useAuth()
  const nav = useNavigate()
  const loc = useLocation()
  const from = (loc.state as { from?: string } | null)?.from || '/admin'

  if (!loading && user && isAdmin) {
    return <Navigate to={from} replace />
  }

  async function signIn() {
    setErr(null)
    if (!supabase) {
      setErr('Supabase is not configured.')
      return
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setErr(error.message)
      return
    }
    nav(from, { replace: true })
  }

  return (
    <>
      <Seo title="Admin sign in" noIndex path="/admin/login" description="CraftArt admin" />
      <Container maxWidth="xs" sx={{ py: 8 }}>
        <Typography variant="h1" gutterBottom sx={{ fontSize: '1.75rem' }}>
          Admin
        </Typography>
        {err && <Alert severity="error" sx={{ mb: 1 }}>{err}</Alert>}
        <Box component="form" onSubmit={(e) => { e.preventDefault(); return void signIn() }}>
          <TextField
            fullWidth
            type="email"
            label="Email"
            name="uemail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            margin="normal"
            autoComplete="email"
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            name="upassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            margin="normal"
            autoComplete="current-password"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            Sign in
          </Button>
        </Box>
      </Container>
    </>
  )
}
