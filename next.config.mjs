/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    domains: [
      'images.unsplash.com',
      'res.cloudinary.com',
      'cdn.sanity.io',
    ],
  },

};

export default nextConfig;
