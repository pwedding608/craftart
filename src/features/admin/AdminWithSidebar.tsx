import { AppBar, Box, Drawer, IconButton, List, ListItemButton, ListItemText, Toolbar, Typography } from '@mui/material'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import MenuIcon from '@mui/icons-material/Menu'

const drawerW = 240
const items = [
  { to: '/admin', label: 'Dashboard' },
  { to: '/admin/products', label: 'Products' },
  { to: '/admin/inquiries', label: 'Inquiries' },
  { to: '/admin/orders', label: 'Orders' },
  { to: '/admin/testimonials', label: 'Testimonials' },
  { to: '/admin/gallery', label: 'Gallery' },
]

type Props = { children: React.ReactNode }

export function AdminWithSidebar({ children }: Props) {
  const [open, setOpen] = useState(false)
  const { supabase } = useAuth()
  const loc = useLocation()
  const nav = useNavigate()

  const drawer = (
    <List sx={{ pt: 1 }}>
      {items.map((i) => (
        <ListItemButton
          key={i.to}
          component={Link}
          to={i.to}
          onClick={() => { setOpen(false); return undefined; }}
          selected={loc.pathname === i.to}
        >
          <ListItemText primary={i.label} />
        </ListItemButton>
      ))}
      <ListItemButton
        onClick={async () => {
          if (supabase) await supabase.auth.signOut()
          nav('/admin/login')
        }}
      >
        <ListItemText primary="Sign out" />
      </ListItemButton>
    </List>
  )

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        color="default"
        elevation={0}
        sx={{ zIndex: (t) => t.zIndex.drawer + 1, display: { md: 'none' } }}
      >
        <Toolbar>
          <IconButton edge="start" onClick={() => { setOpen(true); return undefined; }} aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="span">Admin</Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={open}
        onClose={() => { setOpen(false); return undefined; }}
        sx={{ display: { md: 'none' } }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: drawerW,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: drawerW, boxSizing: 'border-box' },
        }}
        open
      >
        <Toolbar>
          <Typography component={Link} to="/" color="inherit" sx={{ textDecoration: 'none', fontWeight: 700 }}>
            ← Site
          </Typography>
        </Toolbar>
        {drawer}
      </Drawer>
      <Box
        component="div"
        sx={(theme) => ({
          flex: 1,
          p: 3,
          pt: { xs: 7, md: 3 },
          [theme.breakpoints.up('md')]: {
            marginLeft: `${drawerW}px`,
            width: `calc(100% - ${drawerW}px)`,
            maxWidth: '100%',
            boxSizing: 'border-box',
          },
        })}
      >
        {children}
      </Box>
    </Box>
  )
}
