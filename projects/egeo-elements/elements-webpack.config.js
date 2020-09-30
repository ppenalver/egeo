const uuidv1 = require('uuid/v1');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
   optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true
        })
      ]
    },
    output: {
        jsonpFunction: 'egeo-' + uuidv1(),
        library: 'elements',
    },
    plugins: [
      new CompressionPlugin({ algorithm: 'gzip' })
    ]
};
