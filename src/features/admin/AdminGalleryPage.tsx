import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Container, Stack, TextField, Typography } from '@mui/material'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { Seo } from '@/components/layout/Seo'
import { fetchGalleryAll, supabase } from '@/lib/api/admin'
import type { GalleryItem } from '@/lib/supabase/types'

export function AdminGalleryPage() {
  const qc = useQueryClient()
  const { data: rows = [], isLoading, refetch } = useQuery({
    queryKey: ['admin', 'gallery'],
    queryFn: fetchGalleryAll,
  })
  const [publicUrl, setPU] = useState('')
  const [caption, setC] = useState('')

  const columns: GridColDef<GalleryItem>[] = [
    { field: 'public_url', minWidth: 200, flex: 1 },
    { field: 'caption', minWidth: 100 },
    { field: 'sort_order', width: 90 },
    { field: 'is_published', type: 'boolean' },
    {
      field: 'd',
      width: 100,
      sortable: false,
      renderCell: (p) => (
        <Button
          size="small"
          color="error"
          onClick={async () => {
            if (!supabase || !window.confirm('Delete row?')) return
            await supabase.from('gallery_items').delete().eq('id', p.row.id)
            void refetch()
            void qc.invalidateQueries()
          }}
        >
          Del
        </Button>
      ),
    },
  ]

  async function add() {
    if (!supabase || !publicUrl.trim()) return
    const { error } = await supabase
      .from('gallery_items')
      .insert({ public_url: publicUrl.trim(), caption: caption || null, sort_order: 0, is_published: true })
    if (error) {
      window.alert(error.message)
      return
    }
    setPU('')
    setC('')
    void refetch()
    void qc.invalidateQueries()
  }

  return (
    <>
      <Seo noIndex path="/admin/gallery" title="Gallery" />
      <Container>
        <Typography variant="h1" gutterBottom sx={{ fontSize: '1.75rem' }}>
          Gallery
        </Typography>
        <Typography color="text.secondary" variant="body2" sx={{ mb: 2 }}>
          Add full image URLs (CDN, Instagram, or your Supabase public URLs). For uploads, use the Storage
          flow from products or extend this page later.
        </Typography>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1}
          sx={{ mb: 2, alignItems: 'center' }}
        >
          <TextField
            size="small"
            fullWidth
            label="Image URL"
            value={publicUrl}
            onChange={(e) => setPU(e.target.value)}
            placeholder="https://"
          />
          <TextField size="small" label="Caption" value={caption} onChange={(e) => setC(e.target.value)} />
          <Button variant="contained" onClick={() => { void add(); return undefined; }}>
            Add
          </Button>
        </Stack>
        <DataGrid
          autoHeight
          rows={rows as GalleryItem[]}
          columns={columns}
          getRowId={(r) => r.id}
          loading={isLoading}
        />
      </Container>
    </>
  )
}
