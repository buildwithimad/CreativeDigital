export async function GET() {
  const robotsTxt = `
# Robots.txt for Creative Digital
# https://www.creativeedigital.com

User-agent: *
Allow: /

# Block non-public system paths
Disallow: /studio/
Disallow: /admin/

# Block Next.js internal build files
Disallow: /_next/

# Sitemap
Sitemap: https://www.creativeedigital.com/sitemap.xml
`;

  return new Response(robotsTxt.trim(), {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
