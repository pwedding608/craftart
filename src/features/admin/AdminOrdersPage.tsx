import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Container, MenuItem, Select, Typography } from '@mui/material'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { Seo } from '@/components/layout/Seo'
import { fetchOrders, updateOrderStatus } from '@/lib/api/admin'
import type { Order } from '@/lib/supabase/types'

const statuses: Order['status'][] = ['pending', 'confirmed', 'fulfilled', 'cancelled']

export function AdminOrdersPage() {
  const qc = useQueryClient()
  const { data: rows = [], isLoading, refetch } = useQuery({
    queryKey: ['admin', 'orders'],
    queryFn: fetchOrders,
  })

  const columns: GridColDef<Order>[] = [
    { field: 'created_at', minWidth: 150, valueFormatter: (v) => (v != null ? new Date(String(v)).toLocaleString() : '') },
    { field: 'customer_name', minWidth: 120 },
    { field: 'phone', width: 120 },
    { field: 'email', minWidth: 160 },
    {
      field: 'total_inr',
      width: 100,
      valueFormatter: (v) => (v != null ? `₹${Number(v).toLocaleString('en-IN')}` : '—'),
    },
    { field: 'notes', minWidth: 150, flex: 1 },
    {
      field: 'status',
      minWidth: 150,
      renderCell: (params) => (
        <Select
          size="small"
          value={params.row.status}
          onChange={async (e) => {
            await updateOrderStatus(
              params.row.id,
              e.target.value as Order['status'],
            )
            void refetch()
            void qc.invalidateQueries()
          }}
        >
          {statuses.map((s) => (
            <MenuItem key={s} value={s}>
              {s}
            </MenuItem>
          ))}
        </Select>
      ),
    },
  ]

  return (
    <>
      <Seo noIndex path="/admin/orders" title="Orders" />
      <Container maxWidth="xl" sx={{ px: 0 }}>
        <Typography variant="h1" sx={{ fontSize: '1.75rem', mb: 2 }}>
          Orders
        </Typography>
        <Typography color="text.secondary" variant="body2" sx={{ mb: 1 }}>
          For Razorpay or cart checkout, extend this table and webhooks. Today: manual and WhatsApp pipeline.
        </Typography>
        <DataGrid
          autoHeight
          rows={rows as Order[]}
          columns={columns}
          getRowId={(r) => r.id}
          loading={isLoading}
          pageSizeOptions={[20, 50]}
          initialState={{ pagination: { paginationModel: { pageSize: 20 } } }}
        />
      </Container>
    </>
  )
}
