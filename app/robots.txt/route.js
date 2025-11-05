export async function GET() {
  const robotsTxt = `# Robots.txt for CreativeDigital
# Allow all crawlers to access all content
User-agent: *
Allow: /

# Disallow access to admin/studio areas
Disallow: /studio/
Disallow: /admin/
Disallow: /api/

# Disallow access to private or sensitive areas
Disallow: /_next/
Disallow: /static/

# Sitemap location
Sitemap: https://www.creativeedigital.com/sitemap.xml

# Crawl delay (optional)
Crawl-delay: 1

`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400', // Cache for 24 hours
    },
  });
}
