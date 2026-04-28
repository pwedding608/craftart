import { Helmet } from 'react-helmet-async'
import { siteUrl } from '@/lib/config'

const defaultTitle = 'CraftArt — Handcrafted floral art that lasts forever | India'
const defaultDesc =
  'Artificial flower shop in India. Handmade bouquet gifts, wedding flower decor, wall floral art, and custom arrangements. Premium silk & preserved flowers.'

const keywords =
  'artificial flower shop India, handmade bouquet gifts, wedding flower decor, floral gifts online, silk flowers, custom flower arrangements India'

type Props = {
  title?: string
  description?: string
  path?: string
  jsonLd?: object
  noIndex?: boolean
}

export function Seo({ title, description, path = '', jsonLd, noIndex }: Props) {
  const fullTitle = title ? `${title} | CraftArt` : defaultTitle
  const desc = description ?? defaultDesc
  const canonical = `${siteUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`

  return (
    <Helmet>
      <html lang="en" />
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta name="keywords" content={keywords} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={canonical} />
      <meta name="twitter:card" content="summary_large_image" />
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  )
}
