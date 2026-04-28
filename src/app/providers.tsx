import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { muiTheme } from '@/theme/muiTheme'

const qc = new QueryClient({ defaultOptions: { queries: { staleTime: 30_000 } } })

type Props = { children: React.ReactNode }

export function AppProviders({ children }: Props) {
  return (
    <HelmetProvider>
      <QueryClientProvider client={qc}>
        <ThemeProvider theme={muiTheme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  )
}
