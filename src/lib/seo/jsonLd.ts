import { siteUrl } from '@/lib/config'

const defaultDesc =
  'Artificial flower shop in India. Handmade bouquet gifts, wedding flower decor, wall floral art, and custom arrangements. Premium silk & preserved flowers.'

export function orgJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'CraftArt',
    description: defaultDesc,
    url: siteUrl,
  }
}

export function productJsonLd(p: {
  name: string
  description: string
  image: string
  price: number
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: p.description,
    image: p.image,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: p.price,
      availability: 'https://schema.org/InStock',
    },
    url: p.url,
  }
}
