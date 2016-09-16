'use strict';

const webpack = require('webpack');
const ExtractText = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const production = process.env.NODE_ENV === 'production';
const API_URL = JSON.stringify(process.env.API_URL || 'http://localhost:3000');
// const DashboardPlugin = require('webpack-dashboard');

let pluginsArray = [
  new ExtractText('bundle.css'),
  new webpack.DefinePlugin({
    __API_URL__: API_URL,
    __DEBUG__: JSON.stringify(!production),
  }),
  // new DashboardPlugin(),
];

module.exports = {
  entry: `${__dirname}/app/entry.js`,
  debug: !production,
  output: {
    path: 'build',
    filename: 'bundle.js',
  },
  devtool: 'inline-source-map',
  plugins: pluginsArray,
  postcss: function(){
    return [autoprefixer];
  },
  sassLoader: {
    includePaths: `${__dirname}/app/style/scss`,
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractText.extract('style', 'css!postcss!sass!'),
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        loader: 'html',
      },
      {
        test: /\.(jpg|jpgeg|gif|png)$/,
        loader: 'file?name=img/[hash]-[name].[ext]',
      },
      {
        test: /\.(woff|svg|eot|ttf).*/,
        loader: 'url?limit=10000&name=font/[name].[ext]',
      },
    ],
  },
};
