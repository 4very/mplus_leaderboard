/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  poweredByHeader: false,
  trailingSlash: true,
  basePath: '',
  // The starter code load resources from `public` folder with `router.basePath` in React components.
  // So, the source code is "basePath-ready".
  // You can remove `basePath` if you don't need it.
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/g/',
        destination: '/g/current',
        permanent: true,
      },
      {
        source: '/g',
        destination: '/g/current',
        permanent: true,
      },
      {
        source: '/t/',
        destination: '/t/tournament-1',
        permanent: true,
      },
      {
        source: '/t',
        destination: '/t/tournament-1',
        permanent: true,
      },
    ];
  },
});
