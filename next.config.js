const withTypescript = require('@zeit/next-typescript');
const withSass = require('@zeit/next-sass');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = withTypescript(withSass({
  cssModules: true,
  webpack(config, options) {
    // Do not run type checking twice:
    if (options.isServer) {
      config.plugins.push(new ForkTsCheckerWebpackPlugin({
        tslint: './tslint.json',
      }));
    }

    return config
  }
}));
