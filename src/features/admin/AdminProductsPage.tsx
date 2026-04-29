import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { Button, Container, Stack, Typography } from '@mui/material'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { Seo } from '@/components/layout/Seo'
import { supabase, fetchAllProducts, PRODUCT_IMAGES_BUCKET } from '@/lib/api/admin'
import { useState } from 'react'

export function AdminProductsPage() {
  const qc = useQueryClient()
  const nav = useNavigate()
  const { data: rows = [], isLoading, refetch } = useQuery({
    queryKey: ['admin', 'products'],
    queryFn: fetchAllProducts,
  })
  const [del, setDel] = useState<string | null>(null)

  const columns: GridColDef[] = [
    { field: 'name', flex: 1, minWidth: 160 },
    { field: 'slug', minWidth: 120 },
    {
      field: 'price_inr',
      width: 100,
      valueFormatter: (v) => (v != null ? `₹${Number(v).toLocaleString('en-IN')}` : '—'),
    },
    { field: 'is_published', headerName: 'Visible', type: 'boolean' },
    { field: 'is_featured', headerName: 'Featured', type: 'boolean' },
    { field: 'is_best_seller', headerName: 'Best', type: 'boolean' },
    {
      field: 'actions',
      headerName: '',
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={0.5}>
          <Button size="small" onClick={() => nav(`/admin/products/${params.row.id}`)}>Edit</Button>
          <Button
            size="small"
            color="error"
            onClick={async () => {
              if (!supabase || !window.confirm('Delete this product?')) return
              setDel(params.row.id)
              for (const im of params.row.product_images || []) {
                const path = im.storage_path as string
                if (path && !/^https?:\/\//i.test(path)) {
                  await supabase.storage.from(PRODUCT_IMAGES_BUCKET).remove([path])
                }
              }
              await supabase.from('products').delete().eq('id', params.row.id)
              setDel(null)
              void refetch()
              void qc.invalidateQueries()
            }}
            disabled={del === params.row.id}
          >
            Delete
          </Button>
        </Stack>
      ),
    },
  ]

  return (
    <>
      <Seo noIndex path="/admin/products" title="Admin products" />
      <Container maxWidth="lg" sx={{ px: 0 }}>
        <Stack
          direction="row"
          sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 2 }}
        >
          <Typography variant="h1" sx={{ fontSize: '1.75rem' }}>
            Products
          </Typography>
          <Button variant="contained" onClick={() => nav('/admin/products/new')}>
            New product
          </Button>
        </Stack>
        <DataGrid
          autoHeight
          rows={rows}
          columns={columns}
          getRowId={(r) => r.id}
          loading={isLoading}
          initialState={{ pagination: { paginationModel: { pageSize: 20 } } }}
        />
      </Container>
    </>
  )
}
