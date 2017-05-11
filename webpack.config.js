/* eslint-disable no-var */
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:3000',
    'webpack/hot/only-dev-server',
    './src/index.js'
  ],
  debug: true,
  output: { path: __dirname, filename: 'bundle.js' },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: [ 'babel?presets[]=react,presets[]=es2015,presets[]=stage-2' ],
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '', '.js', '.jsx' ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: '#inline-source-map'
};
