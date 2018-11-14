'use strict';
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  mode: 'development',
  entry: [
    '@babel/polyfill',
    path.join(__dirname, 'app/index.js')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        eslint: {
          configFile: '.eslintrc',
          failOnWarning: false,
          failOnError: false
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: 'app/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.DefinePlugin({
      DISABLE_DELETION: JSON.stringify(process.env.DISABLE_DELETION) || JSON.parse(false)
    })
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'eslint-loader'
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.json?$/,
        loader: 'json-loader'
      },
      {
        test: /\.css/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader?modules&localIdentName=[name]---[local]---[hash:base64:5]!sass-loader'
      },
      {
        test: /\.woff(2)?(\?[a-z0-9#=&.]+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff-loader'
      },
      {
        test: /\.(gif|ttf|eot|svg|png)(\?[a-z0-9#=&.]+)?$/,
        use: ['file-loader', { loader: 'image-webpack-loader', }]
      }
    ]
  }
};
