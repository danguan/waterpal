var path = require('path')
var HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
require('babel-polyfill')

var SRC_DIR = path.join(__dirname, '/client/src')
var DIST_DIR = path.join(__dirname, '/client/dist')

module.exports = {
  mode: 'production',
  entry: ['babel-polyfill', `${SRC_DIR}/index.jsx`],
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  module: {
    rules: [
      {
        type: 'javascript/auto',
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        type: 'javascript/auto',
        test: /\.mjs$/,
        include: /node_modules/
      }
    ]
  },
  plugins: [new HardSourceWebpackPlugin()]
}
