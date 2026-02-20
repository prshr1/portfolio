/** @type {import('next').NextConfig} */
<<<<<<< HEAD
const createMDX = require('@next/mdx');
const isDev = process.env.NODE_ENV === 'development';

/* remark-math v6+ and rehype-katex v7+ are ESM-only.
   CJS `require()` returns { __esModule: true, default: fn }.
   Extract .default so unified receives the actual plugin function. */
const remarkMath = require('remark-math');
const rehypeKatex = require('rehype-katex');

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkMath.default || remarkMath],
    rehypePlugins: [rehypeKatex.default || rehypeKatex],
  },
});

const nextConfig = {
  // Only enable static export for production builds (GitHub Pages)
  ...(isDev ? {} : { output: 'export' }),
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
=======
const isDev = process.env.NODE_ENV === 'development';

const nextConfig = {
  // Only enable static export for production builds (GitHub Pages)
  ...(isDev ? {} : { output: 'export' }),
>>>>>>> 5310e64d237822ff8a9facfe5bf7db7642d9b681
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

<<<<<<< HEAD
module.exports = withMDX(nextConfig);
=======
module.exports = nextConfig;
>>>>>>> 5310e64d237822ff8a9facfe5bf7db7642d9b681
