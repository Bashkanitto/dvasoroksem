import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://dvasoroksem.vercel.app'

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/about', '/projects', '/reviews', '/contact'],
        disallow: ['/admin/', '/api/', '/_next/', '/private/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
