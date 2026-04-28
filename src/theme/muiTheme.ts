import { alpha, createTheme } from '@mui/material/styles'

const blush = '#E8B4B8'
const champagne = '#C4A77D'
const gold = '#B8956E'
const sage = '#9EB8A0'
const cream = '#F9F4EF'
const ink = '#2A2522'

export const muiTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: gold, contrastText: '#fff' },
    secondary: { main: blush, contrastText: ink },
    background: { default: cream, paper: '#FFFFFF' },
    text: { primary: ink, secondary: alpha(ink, 0.7) },
    success: { main: sage },
  },
  typography: {
    fontFamily: '"DM Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
    h1: { fontFamily: '"Cormorant Garamond", "Times New Roman", serif', fontWeight: 500, fontSize: '2.75rem' },
    h2: { fontFamily: '"Cormorant Garamond", "Times New Roman", serif', fontWeight: 500, fontSize: '2.25rem' },
    h3: { fontFamily: '"Cormorant Garamond", "Times New Roman", serif', fontWeight: 500, fontSize: '1.75rem' },
    h4: { fontFamily: '"Cormorant Garamond", "Times New Roman", serif', fontWeight: 500, fontSize: '1.5rem' },
    h5: { fontFamily: '"Cormorant Garamond", "Times New Roman", serif', fontWeight: 500, fontSize: '1.25rem' },
    h6: { fontFamily: '"Cormorant Garamond", "Times New Roman", serif', fontWeight: 500, fontSize: '1.1rem' },
    button: { textTransform: 'none', fontWeight: 600, letterSpacing: 0.02 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true, size: 'large' },
    },
    MuiCard: {
      styleOverrides: { root: { boxShadow: '0 4px 24px rgba(42,37,34,0.06)', border: `1px solid ${alpha(ink, 0.06)}` } },
    },
    MuiAppBar: {
      styleOverrides: { root: { backgroundColor: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', borderBottom: `1px solid ${alpha(ink, 0.08)}` } },
    },
  },
})

// Brand accents used via sx: blush, gold, sage
export const brand = { blush, champagne, gold, sage, cream, ink }
