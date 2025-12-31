import { client } from '@/sanity/lib/client';
import { BLOGS_LIST_QUERY } from '@/sanity/queries/blogs';
import { SERVICES_LIST_QUERY } from '@/sanity/queries/services';

export async function GET() {
  const baseUrl = 'https://www.creativeedigital.com';
  const now = new Date().toISOString();
  const urls = [];

  // ---------- STATIC ROUTES ----------
  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/work',
    '/blogs',
    '/contact',
  ];

  staticRoutes.forEach((route) => {
    urls.push(
      {
        loc: `${baseUrl}/en${route}`,
        lastmod: now,
        changefreq: 'weekly',
        priority: route === '' ? 1.0 : 0.8,
      },
      {
        loc: `${baseUrl}/ar${route}`,
        lastmod: now,
        changefreq: 'weekly',
        priority: route === '' ? 1.0 : 0.8,
      }
    );
  });

  // ---------- DYNAMIC: BLOGS ----------
  const blogs = await client.fetch(BLOGS_LIST_QUERY);

  blogs?.forEach((blog) => {
    urls.push(
      {
        loc: `${baseUrl}/en/blogs/${blog.slug}`,
        lastmod: blog._updatedAt || now,
        changefreq: 'monthly',
        priority: 0.7,
      },
      {
        loc: `${baseUrl}/ar/blogs/${blog.slug}`,
        lastmod: blog._updatedAt || now,
        changefreq: 'monthly',
        priority: 0.7,
      }
    );
  });

  // ---------- DYNAMIC: SERVICES ----------
  const services = await client.fetch(SERVICES_LIST_QUERY);

  services?.forEach((service) => {
    urls.push(
      {
        loc: `${baseUrl}/en/services/${service.slug}`,
        lastmod: service._updatedAt || now,
        changefreq: 'monthly',
        priority: 0.8,
      },
      {
        loc: `${baseUrl}/ar/services/${service.slug}`,
        lastmod: service._updatedAt || now,
        changefreq: 'monthly',
        priority: 0.8,
      }
    );
  });

  // ---------- XML ----------
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
