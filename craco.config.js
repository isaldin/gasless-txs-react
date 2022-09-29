const webpack = require('webpack');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

const isBrowser = typeof window !== 'undefined';

module.exports = {
  webpack: {
    configure: {
      resolve: {
        fallback: {
          process: require.resolve('process/browser'),
          zlib: require.resolve('browserify-zlib'),
          stream: require.resolve('stream-browserify'),
          util: require.resolve('util'),
          buffer: require.resolve('buffer'),
          asset: require.resolve('assert'),
          querystring: require.resolve('querystring-es3'),
          crypto: require.resolve('crypto-browserify'),
          url: require.resolve('url'),
          http: require.resolve('stream-http'),
          https: require.resolve('https-browserify'),
          tls: false,
          net: false,
          path: false,
          os: false,
          fs: false,
        },
      },
      plugins: [
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
          process: 'process/browser',
        }),
        isBrowser ? new NodePolyfillPlugin() : null,
      ].filter((item) => !!item),
    },
  },
};
