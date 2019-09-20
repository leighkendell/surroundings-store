const sass = require('@zeit/next-sass');
const optimizedImages = require('next-optimized-images');
const withPlugins = require('next-compose-plugins');
const bundleAnalyzer = require('@zeit/next-bundle-analyzer');
const offline = require('next-offline');
const sourceMaps = require('@zeit/next-source-maps')();

const nextConfig = {
  target: 'serverless',
};

module.exports = withPlugins(
  [
    [sourceMaps],
    [
      sass,
      {
        cssLoaderOptions: {
          importLoaders: 1,
          localIdentName: '[name]__[local]:[hash:base64:5]',
        },
        cssModules: true,
      },
    ],
    [
      optimizedImages,
      {
        handleImages: ['jpeg', 'png', 'svg'],
      },
    ],
    [
      bundleAnalyzer,
      {
        analyzeBrowser: ['browser', 'both'].includes(
          process.env.BUNDLE_ANALYZE
        ),
        analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
        bundleAnalyzerConfig: {
          browser: {
            analyzerMode: 'static',
            reportFilename: '../bundles/client.html',
          },
          server: {
            analyzerMode: 'static',
            reportFilename: '../bundles/server.html',
          },
        },
      },
    ],
    [
      offline,
      {
        workboxOpts: {
          swDest: 'static/service-worker.js',
          runtimeCaching: [
            {
              urlPattern: /^https?.*/,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'https-calls',
                networkTimeoutSeconds: 15,
                expiration: {
                  maxEntries: 150,
                  maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        },
      },
    ],
  ],
  nextConfig
);
