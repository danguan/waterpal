var path = require('path')

var SRC_DIR = path.join(__dirname, '/client/src')
var DIST_DIR = path.join(__dirname, '/client/dist')

module.exports = {
  mode: 'production',
  entry: `${SRC_DIR}/index.jsx`,
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
          loader: 'babel-loader',
        }
      },
      {
        type: 'javascript/auto',
        test: /\.mjs$/,
        include: /node_modules/
      },
      {
        test:/\.css$/,
        include: [
          SRC_DIR,
          /node_modules/
        ],
        loader: ['style-loader','css-loader']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i, 
        include: [
          SRC_DIR,
          /node_modules/
        ],
        loader: "file-loader?name=assets/[name].[ext]"
      },
      {
        test: /\.(eot|svg|ttf|otf|woff|woff2)$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
    ]
  }
};
