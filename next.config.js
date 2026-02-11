/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === 'development';

const nextConfig = {
  // Only enable static export for production builds (GitHub Pages)
  ...(isDev ? {} : { output: 'export' }),
  // Only set basePath for production builds
  ...(isDev ? {} : { basePath: '/portfolio', assetPrefix: '/portfolio' }),
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
