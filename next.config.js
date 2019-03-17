const typescript = require('@zeit/next-typescript');
const sass = require('@zeit/next-sass');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const optimizedImages = require('next-optimized-images');
const withPlugins = require('next-compose-plugins');
const bundleAnalyzer = require('@zeit/next-bundle-analyzer');

const nextConfig = {
  webpack: (config, options) => {
    // Do not run type checking twice:
    if (options.isServer) {
      config.plugins.push(new ForkTsCheckerWebpackPlugin({
        tslint: './tslint.json',
      }));
    }
    return config
  }
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
  }]
], nextConfig);
