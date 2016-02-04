'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

function addHash(template, hash) {
  return NODE_ENV == 'production' ?
    template.replace(/\.[^.]+$/, `.[${hash}]$&`) : template
}

module.exports = {
  context: __dirname + '/frontend',
  entry: {
    home: './home',
    about: './about',
    app: './app',
    external: './external'
  },
  output: {
    path: __dirname + '/public/assets',
    publicPath: '/public/assets/',
    filename: addHash('[name].js', 'chunkhash'),
    chunkFilename: addHash('[id].js', 'chunkhash'),
    library: '[name]',
    libraryTarget: 'var'
  },

  watch: NODE_ENV == 'development',

  devtool: NODE_ENV == 'development' ? 'cheap-inline-module-source-map' : null,

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV),
      LANG: 'ru'
    }),
    new webpack.optimize.CommonsChunkPlugin(addHash('common.js', 'chunkhash')),
    new webpack.ProvidePlugin({
      pluck: 'lodash/collection/pluck'
    }),
    new ExtractTextPlugin(addHash('[name].css', 'contenthash'), {allChunks: true}),
    new AssetsPlugin({
      filename: 'assets.json',
      path: __dirname + '/public/assets/'
    })
  ],

  externals: {
    lodash: '_'
  },

  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      query: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
      },
      exclude: /node_modules/,
    }, {
      test: /\.jade$/,
      loader: 'jade'
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css!autoprefixer?browsers=last 2 versions')
      // loader: 'style!css!autoprefixer?browsers=last 2 versions'
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('style', 'css!autoprefixer?browsers=last 2 versions!less')
      // loader: 'style!css!autoprefixer?browsers=last 2 versions!less'
    },{
      test: /\.(png|jpg|svg)$/,
      // loader: 'file?name=[name].[hash:6].[ext]'
      loader: 'url?name=[path][name].[ext]&limit=4096'
    }]
  },

  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.less', '.ts']
  },

  resolveLoader: {
    modulesDirectories: ['node_modules'],
    moduleTemplates: ['*-loader'],
    extensions: ['', '.js']
  },

  devServer: {
    host: 'localhost',
    port: 4000,
    proxy: [{
      path: /.*/,
      target: 'http://localhost:3000'
    }]
  }
}

if (NODE_ENV == 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        unsafe: true
      }
    })
  )
}
