const typescript = require('@zeit/next-typescript');
const sass = require('@zeit/next-sass');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const optimizedImages = require('next-optimized-images');
const withPlugins = require('next-compose-plugins');
const bundleAnalyzer = require('@zeit/next-bundle-analyzer');
const offline = require('next-offline');

const nextConfig = {
  target: 'serverless',
  webpack: (config, options) => {
    // Do not run type checking twice:
    if (options.isServer) {
      config.plugins.push(new ForkTsCheckerWebpackPlugin({
        tslint: './tslint.json',
      }));
    }
    return config
  },
};

module.exports = withPlugins([
  [sass, {
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: '[name]__[local]:[hash:base64:5]',
    },
    cssModules: true,
  }],
  [typescript],
  [optimizedImages],
  [bundleAnalyzer, {
    analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
    analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
    bundleAnalyzerConfig: {
      browser: {
        analyzerMode: 'static',
        reportFilename: '../bundles/client.html'
      },
      server: {
        analyzerMode: 'static',
        reportFilename: '../bundles/server.html'
      }
    }
  }],
  [offline, {
    workboxOpts: {
      runtimeCaching: [
        {
          handler: 'networkFirst',
          options: {
            cacheName: 'https-calls',
            cacheableResponse: {
              statuses: [0, 200],
            },
            expiration: {
              maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
              maxEntries: 150,
            },
            networkTimeoutSeconds: 15,
          },
          urlPattern: /^https?.*/,
        },
      ],
      swDest: 'static/service-worker.js',
    }
  }]
], nextConfig);
