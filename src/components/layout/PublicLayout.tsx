import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { FloatingWhatsapp } from './FloatingWhatsapp'
import { SupabaseWarning } from '../SupabaseWarning'

export function PublicLayout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <SupabaseWarning />
      <Box component="main" sx={{ flex: 1 }}>
        <Outlet />
      </Box>
      <Footer />
      <FloatingWhatsapp />
    </Box>
  )
}
