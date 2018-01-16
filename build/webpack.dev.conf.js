var utils = require(process.cwd() + '/config/utils')
var webpack = require('webpack')
var config = require(process.cwd() + '/config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var path = require('path')


// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = [path.resolve(__dirname, './dev-client')].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: utils.getModuleTemplate(),
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
})
