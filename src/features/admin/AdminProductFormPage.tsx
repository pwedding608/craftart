import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
  Box,
  Button,
  Container,
  FormControlLabel,
  MenuItem,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import { Seo } from '@/components/layout/Seo'
import { fetchAllCategories, supabase, PRODUCT_IMAGES_BUCKET, fetchProductById } from '@/lib/api/admin'
import { slugify } from '@/lib/slugify'
import { publicFileUrl } from '@/lib/supabase/client'

export function AdminProductFormPage() {
  const { id: rawId = 'new' } = useParams()
  const isNew = rawId === 'new'
  const nav = useNavigate()
  const qc = useQueryClient()

  const { data: categories = [] } = useQuery({ queryKey: ['admin', 'categories'], queryFn: fetchAllCategories })
  const { data: row, isLoading } = useQuery({
    queryKey: ['admin', 'product', rawId],
    queryFn: () => fetchProductById(rawId),
    enabled: !isNew,
  })

  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [cat, setCat] = useState('')
  const [price, setPrice] = useState('0')
  const [shortD, setShortD] = useState('')
  const [longD, setLongD] = useState('')
  const [materials, setMaterials] = useState('')
  const [dims, setDims] = useState('')
  const [delivery, setDelivery] = useState('')
  const [pub, setPub] = useState(true)
  const [feat, setFeat] = useState(false)
  const [best, setBest] = useState(false)
  const [files, setFiles] = useState<FileList | null>(null)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- form bootstrap when `row` loads from API */
    if (row) {
      setName(row.name)
      setSlug(row.slug)
      setCat(row.category_id)
      setPrice(String(row.price_inr))
      setShortD(row.short_description || '')
      setLongD(row.long_description || '')
      setMaterials(row.materials || '')
      setDims(row.dimensions || '')
      setDelivery(row.delivery_info || '')
      setPub(row.is_published)
      setFeat(row.is_featured)
      setBest(row.is_best_seller)
    } else if (isNew && categories[0]) {
      setCat(categories[0].id)
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [row, categories, isNew])

  async function save() {
    setErr(null)
    if (!supabase) return
    if (!name.trim() || !slug.trim() || !cat) {
      setErr('Name, slug, and category are required.')
      return
    }
    const pr = {
      name: name.trim(),
      slug: slug.trim().toLowerCase(),
      category_id: cat,
      price_inr: Math.max(0, Math.floor(Number(price) || 0)),
      short_description: shortD || null,
      long_description: longD || null,
      materials: materials || null,
      dimensions: dims || null,
      delivery_info: delivery || null,
      is_published: pub,
      is_featured: feat,
      is_best_seller: best,
    }
    if (isNew) {
      const { data, error } = await supabase.from('products').insert(pr).select('id').single()
      if (error) {
        setErr(error.message)
        return
      }
      if (data?.id && files?.length) {
        for (const f of Array.from(files)) {
          const p = `products/${data.id}/${f.name.replace(/[^\w.]/g, '_')}`
          const { error: up } = await supabase.storage.from(PRODUCT_IMAGES_BUCKET).upload(p, f)
          if (up) {
            setErr(up.message)
            return
          }
          const { error: r } = await supabase.from('product_images').insert({
            product_id: data.id,
            storage_path: p,
            alt: f.name,
            sort_order: 0,
          })
          if (r) setErr(r.message)
        }
      }
    } else {
      const { error } = await supabase.from('products').update(pr).eq('id', rawId)
      if (error) {
        setErr(error.message)
        return
      }
      if (files?.length) {
        let o = 0
        for (const f of Array.from(files)) {
          const p = `products/${rawId}/${f.name.replace(/[^\w.]/g, '_')}`
          const { error: up } = await supabase.storage.from(PRODUCT_IMAGES_BUCKET).upload(p, f, { upsert: true })
          if (up) {
            setErr(up.message)
            return
          }
          await supabase.from('product_images').insert({
            product_id: rawId,
            storage_path: p,
            alt: f.name,
            sort_order: o++,
          })
        }
      }
    }
    void qc.invalidateQueries()
    nav('/admin/products')
  }

  const imList = (row?.product_images || []) as { id: string; storage_path: string; alt: string | null }[]

  if (!isNew && isLoading) {
    return (
      <Container sx={{ py: 3 }}>
        <Typography>Loading…</Typography>
      </Container>
    )
  }
  if (!isNew && !row) {
    return (
      <Container sx={{ py: 3 }}>
        <Typography>Not found</Typography>
      </Container>
    )
  }

  return (
    <>
      <Seo noIndex path={`/admin/products/${rawId}`} title="Edit product" />
      <Container maxWidth="md">
        <Typography variant="h1" gutterBottom sx={{ fontSize: '1.75rem' }}>
          {isNew ? 'New product' : 'Edit product'}
        </Typography>
        {err && (
          <Typography color="error" variant="body2" sx={{ mb: 1 }}>
            {err}
          </Typography>
        )}
        <Stack spacing={2} component="form">
          <TextField
            fullWidth
            required
            label="Name"
            name="pname"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Stack sx={{ flexDirection: 'row', gap: 1, alignItems: 'flex-start' }}>
            <TextField
              fullWidth
              required
              label="URL slug"
              name="pslug"
              value={slug}
              onChange={(e) => setSlug(e.target.value.toLowerCase())}
            />
            <Button variant="outlined" onClick={() => { setSlug(slugify(name)); return undefined; }} sx={{ flexShrink: 0 }}>
              From name
            </Button>
          </Stack>
          <TextField select fullWidth required label="Category" value={cat} onChange={(e) => setCat(e.target.value)} name="pcat">
            {categories.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            type="number"
            label="Price (INR, whole number)"
            name="pprice"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            slotProps={{ htmlInput: { min: 0, step: 1 } }}
          />
          <TextField
            fullWidth
            multiline
            minRows={2}
            label="Short description"
            name="psd"
            value={shortD}
            onChange={(e) => setShortD(e.target.value)}
          />
          <TextField
            fullWidth
            multiline
            minRows={4}
            label="Description"
            name="pld"
            value={longD}
            onChange={(e) => setLongD(e.target.value)}
          />
          <TextField fullWidth label="Materials" name="pmat" value={materials} onChange={(e) => setMaterials(e.target.value)} />
          <TextField fullWidth label="Dimensions" name="pdim" value={dims} onChange={(e) => setDims(e.target.value)} />
          <TextField
            fullWidth
            label="Delivery"
            name="pdel"
            value={delivery}
            onChange={(e) => setDelivery(e.target.value)}
          />
          <FormControlLabel
            control={<Switch checked={pub} onChange={(_, c) => setPub(c)} />}
            label="Published (visible in shop)"
          />
          <FormControlLabel
            control={<Switch checked={feat} onChange={(_, c) => setFeat(c)} />}
            label="Featured on home"
          />
          <FormControlLabel
            control={<Switch checked={best} onChange={(_, c) => setBest(c)} />}
            label="Best seller"
          />
          <Button variant="outlined" component="label">
            {isNew ? 'Add images' : 'Add more images'}
            <input
              type="file"
              multiple
              accept="image/*"
              name="pfiles"
              hidden
              onChange={(e) => { setFiles(e.target.files); return undefined; }}
            />
          </Button>
          {imList.length > 0 && (
            <Stack sx={{ flexDirection: 'row', flexWrap: 'wrap', gap: 1 }}>
              {imList.map((i) => (
                <Box key={i.id} sx={{ position: 'relative' }}>
                  <Box
                    component="img"
                    src={publicFileUrl(PRODUCT_IMAGES_BUCKET, i.storage_path) || ''}
                    alt={i.alt || ''}
                    sx={{ width: 100, height: 100, objectFit: 'cover' }}
                  />
                </Box>
              ))}
            </Stack>
          )}
        </Stack>
        <Stack sx={{ flexDirection: 'row', gap: 2, mt: 2 }}>
          <Button variant="contained" onClick={() => { void save(); return undefined; }}>
            Save
          </Button>
          <Button onClick={() => nav('/admin/products')}>Cancel</Button>
        </Stack>
      </Container>
    </>
  )
}
