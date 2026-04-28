import { Alert, Box, Button, CircularProgress } from '@mui/material'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { AdminWithSidebar } from './AdminWithSidebar'

export function AdminGuard() {
  const { user, isAdmin, loading, supabase } = useAuth()
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    )
  }
  if (!supabase) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="warning">Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY (or VITE_SUPABASE_ANON_KEY) in .env</Alert>
      </Box>
    )
  }
  if (!user) {
    return <Navigate to="/admin/login" replace />
  }
  if (!isAdmin) {
    return (
      <Box sx={{ p: 3, maxWidth: 600 }}>
        <Alert severity="error" sx={{ mb: 1 }}>
          Admin access only. In Supabase SQL, run:{' '}
          <code>update public.profiles set role = &apos;admin&apos; where id = &apos;YOUR_USER_UUID&apos;;</code>
        </Alert>
        <Button
          onClick={async () => {
            if (supabase) await supabase.auth.signOut()
            window.location.href = '/admin/login'
          }}
        >
          Sign out
        </Button>
      </Box>
    )
  }
  return (
    <AdminWithSidebar>
      <Outlet />
    </AdminWithSidebar>
  )
}
