import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { Seo } from '@/components/layout/Seo'
import { fetchTestimonialsAll, saveTestimonial, deleteTestimonial } from '@/lib/api/admin'
import type { Testimonial } from '@/lib/supabase/types'

export function AdminTestimonialsPage() {
  const qc = useQueryClient()
  const { data: rows = [], isLoading, refetch } = useQuery({
    queryKey: ['admin', 'testimonials'],
    queryFn: fetchTestimonialsAll,
  })
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Partial<Testimonial> | null>(null)

  const columns: GridColDef<Testimonial>[] = [
    { field: 'name', flex: 1, minWidth: 120 },
    { field: 'text', minWidth: 200, flex: 2 },
    { field: 'rating', width: 80, type: 'number' },
    { field: 'is_published', type: 'boolean' },
    {
      field: 'a',
      headerName: '',
      width: 160,
      sortable: false,
      renderCell: (p) => (
        <Button
          size="small"
          onClick={() => {
            setEditing(p.row)
            setOpen(true)
          }}
        >
          Edit
        </Button>
      ),
    },
    {
      field: 'd',
      width: 90,
      sortable: false,
      renderCell: (p) => (
        <Button
          size="small"
          color="error"
          onClick={async () => {
            if (window.confirm('Delete?')) {
              await deleteTestimonial(p.row.id)
              void refetch()
              void qc.invalidateQueries()
            }
          }}
        >
          Del
        </Button>
      ),
    },
  ]

  function newRow() {
    setEditing({
      name: '',
      text: '',
      rating: 5,
      is_published: true,
      sort_order: 0,
    })
    setOpen(true)
  }

  async function save() {
    if (!editing?.name || !editing.text) return
    await saveTestimonial({
      id: editing.id,
      name: editing.name,
      text: editing.text,
      rating: editing.rating != null ? Number(editing.rating) : null,
      is_published: !!editing.is_published,
      sort_order: Number(editing.sort_order) || 0,
    })
    setOpen(false)
    void refetch()
    void qc.invalidateQueries()
  }

  return (
    <>
      <Seo noIndex path="/admin/testimonials" title="Testimonials" />
      <Container maxWidth="md" sx={{ px: 0 }}>
        <Stack
          direction="row"
          sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 2 }}
        >
          <Typography variant="h1" sx={{ fontSize: '1.75rem' }}>
            Testimonials
          </Typography>
          <Button variant="contained" onClick={newRow}>
            Add
          </Button>
        </Stack>
        <DataGrid
          autoHeight
          rows={rows as Testimonial[]}
          columns={columns}
          getRowId={(r) => r.id}
          loading={isLoading}
        />
      </Container>
      <Dialog open={open} onClose={() => { setOpen(false); return undefined; }} fullWidth maxWidth="sm">
        <DialogTitle>{editing?.id ? 'Edit' : 'New'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            value={editing?.name ?? ''}
            onChange={(e) => setEditing((o) => ({ ...o, name: e.target.value }))}
          />
          <TextField
            fullWidth
            multiline
            minRows={3}
            label="Quote"
            name="qtext"
            value={editing?.text ?? ''}
            onChange={(e) => setEditing((o) => ({ ...o, text: e.target.value }))}
            margin="normal"
          />
          <TextField
            fullWidth
            type="number"
            label="Rating 1-5 (optional)"
            name="qrate"
            value={editing?.rating ?? ''}
            onChange={(e) => setEditing((o) => ({ ...o, rating: Number(e.target.value) }))}
            margin="normal"
            slotProps={{ htmlInput: { min: 1, max: 5, step: 0.5 } }}
          />
          <TextField
            type="number"
            label="Sort"
            name="qsort"
            value={editing?.sort_order ?? 0}
            onChange={(e) => setEditing((o) => ({ ...o, sort_order: Number(e.target.value) }))}
            fullWidth
            margin="normal"
          />
          <FormControlLabel
            control={(
              <Switch
                checked={!!editing?.is_published}
                onChange={(_, c) => setEditing((o) => ({ ...o, is_published: c }))}
              />
            )}
            label="Published"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setOpen(false); return undefined; }}>Cancel</Button>
          <Button onClick={() => { void save(); return undefined; }} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
