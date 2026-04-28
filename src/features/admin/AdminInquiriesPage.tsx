import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Container, MenuItem, Select, Typography } from '@mui/material'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { Seo } from '@/components/layout/Seo'
import { fetchInquiries, updateInquiryStatus, createOrderFromInquiry } from '@/lib/api/admin'
import type { Inquiry } from '@/lib/supabase/types'

const statuses: Inquiry['status'][] = ['new', 'read', 'resolved']

export function AdminInquiriesPage() {
  const qc = useQueryClient()
  const { data: rows = [], isLoading, refetch } = useQuery({
    queryKey: ['admin', 'inquiries'],
    queryFn: fetchInquiries,
  })
  const columns: GridColDef<Inquiry>[] = [
    { field: 'created_at', minWidth: 150, valueFormatter: (v) => (v != null ? new Date(String(v)).toLocaleString() : '') },
    { field: 'type', width: 130 },
    { field: 'name', minWidth: 100 },
    { field: 'phone', width: 120 },
    { field: 'email', minWidth: 150 },
    { field: 'message', minWidth: 200, flex: 1 },
    {
      field: 'status',
      minWidth: 150,
      renderCell: (params) => (
        <Select
          size="small"
          value={params.row.status}
          onChange={async (e) => {
            await updateInquiryStatus(
              params.row.id,
              e.target.value as Inquiry['status'],
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
    {
      field: 'order',
      minWidth: 100,
      sortable: false,
      renderCell: (params) => (
        <Button
          size="small"
          onClick={async () => {
            await createOrderFromInquiry({
              id: params.row.id,
              name: params.row.name,
              phone: params.row.phone,
              email: params.row.email,
            })
            void refetch()
            void qc.invalidateQueries()
          }}
        >
          + Order
        </Button>
      ),
    },
  ]

  return (
    <>
      <Seo noIndex path="/admin/inquiries" title="Inquiries" />
      <Container maxWidth="xl" sx={{ px: 0 }}>
        <Typography variant="h1" sx={{ fontSize: '1.75rem', mb: 2 }}>
          Inquiries
        </Typography>
        <DataGrid
          autoHeight
          rows={rows as Inquiry[]}
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
