/** @type {import('next').NextConfig} */
const createMDX = require('@next/mdx');
const isDev = process.env.NODE_ENV === 'development';

const nextConfig = {
  // Only enable static export for production builds (GitHub Pages)
  ...(isDev ? {} : { output: 'export' }),
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

module.exports = async () => {
  // remark-math/rehype-katex are ESM-only; load them via dynamic import in CJS config.
  const { default: remarkMath } = await import('remark-math');
  const { default: rehypeKatex } = await import('rehype-katex');

  const withMDX = createMDX({
    extension: /\.mdx?$/,
    options: {
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    },
  });

  return withMDX(nextConfig);
};
