const typescript = require('@zeit/next-typescript');
const sass = require('@zeit/next-sass');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const optimizedImages = require('next-optimized-images');
const withPlugins = require('next-compose-plugins');

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
], nextConfig);
