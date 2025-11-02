/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    domains: ['images.unsplash.com',
      'res.cloudinary.com',
      'cdn.sanity.io'
    ], // Add any external image domains here
  },
};

export default nextConfig;
