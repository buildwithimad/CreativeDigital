export async function GET() {
  // Base URL - replace with your actual domain
  const baseUrl = 'https://www.creativeedigital.com';

  // Static pages that exist in both languages
  const staticPages = [
    '',
    '/about',
    '/services',
    '/work',
    '/blogs'
  ];

  // Generate sitemap entries for all pages (no language prefixes since using client-side i18n)
  const sitemapEntries = [];

  // Add entries for static pages
  staticPages.forEach(page => {
    sitemapEntries.push({
      url: `${baseUrl}${page}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: page === '' ? 1.0 : 0.8,
    });
  });

  // You can add dynamic blog entries here if needed
  // For now, we'll add a placeholder for blog posts
  sitemapEntries.push({
    url: `${baseUrl}/blogs`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily',
    priority: 0.9,
  });

  // Generate XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

${sitemapEntries.map(entry => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastModified}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n')}

</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
