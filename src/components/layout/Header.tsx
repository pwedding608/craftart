import { useState } from 'react'
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  useMediaQuery,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import MenuIcon from '@mui/icons-material/Menu'
import { Link as RouterLink, useLocation } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/custom-order', label: 'Custom order' },
  { to: '/about', label: 'About' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/contact', label: 'Contact' },
]

export function Header() {
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const isMd = useMediaQuery(theme.breakpoints.up('md'))
  const loc = useLocation()

  return (
    <AppBar color="default" position="sticky" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ py: 0.5, minHeight: 64 }}>
          <Button
            component={RouterLink}
            to="/"
            sx={{ mr: 2, fontSize: 24, color: 'text.primary', textAlign: 'left' }}
            variant="text"
            disableTouchRipple
          >
            CraftArt
          </Button>
          <Box sx={{ flex: 1 }} />
          {isMd ? (
            <Stack direction="row" spacing={0.5}>
              {links.map((l) => (
                <Button
                  key={l.to}
                  component={RouterLink}
                  to={l.to}
                  color="inherit"
                  variant={loc.pathname === l.to ? 'contained' : 'text'}
                >
                  {l.label}
                </Button>
              ))}
            </Stack>
          ) : (
            <IconButton edge="end" onClick={() => setOpen(true)} aria-label="open menu">
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </Container>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <List sx={{ width: 240, pt: 2 }}>
          {links.map((l) => (
            <ListItemButton
              key={l.to}
              component={RouterLink}
              to={l.to}
              onClick={() => setOpen(false)}
            >
              <ListItemText primary={l.label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </AppBar>
  )
}
