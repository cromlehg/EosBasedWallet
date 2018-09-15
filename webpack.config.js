/* eslint-disable no-process-env, no-console */

if (typeof process.env.NODE_ENV === 'undefined') {
  process.env.NODE_ENV = 'production';
}

console.log(process.env.NODE_ENV);

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build')
};

const CONFIG = require('dotenv').config().parsed;

const commonConfig = {
  context: PATHS.src,
  entry: {
    index: PATHS.src + '/pages/index/index.js'
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{loader: 'babel-loader'}]
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          doctype: 'xml',
          pretty: true
        }
      },
      {
        test: /\.css$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader', options: {url: true}}
        ]
      },
      {
        test: /\.less$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader', options: {url: true}},
          {loader: 'less-loader', options: {url: true}}
        ]
      }, {
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {sourceMap: true}
          }, {
            loader: 'resolve-url-loader'
          }, {
            loader: 'sass-loader',
            options: {sourceMap: true}
          }]
        })
      }, {
        test: /\.(svg|png|swf|jpg|otf|eot|ttf|woff|woff2)(\?.*)?$/,
        use: [{
          loader: 'file-loader',
          options: {name: '[name].[ext]', outputPath: 'assets/'}
        }]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'style.css',
      disable: process.env.NODE_ENV !== 'production',
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      title: 'Index Page',
      filename: 'index.html',
      chunks: ['index'],
      template: PATHS.src + '/pages/index/index.pug',
      inject: 'body'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        API_HTTP_ENDPOINT: JSON.stringify(CONFIG.API_HTTP_ENDPOINT),
        API_CHAIN_ID: JSON.stringify(CONFIG.API_CHAIN_ID),
        TRACKER_HTTP_ENDPOINT: JSON.stringify(CONFIG.TRACKER_HTTP_ENDPOINT)
      }
    })
  ]
};

const developmentConfig = {
  devtool: 'cheap-module-inline-source-map',
  devServer: {
    host: '0.0.0.0',
    port: CONFIG.APP_HTTP_PORT,
    hot: true,
    disableHostCheck: true,
    compress: true,
    contentBase: PATHS.build,
    publicPath: '/',
    stats: {colors: true}
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
    })
  ]
};

const productionConfig = {
  devtool: 'nosources-source-map',
  plugins: [
    new UglifyJsPlugin({sourceMap: true, uglifyOptions: {safari10: true}}),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
};

let config;

if (process.env.NODE_ENV === 'production') {
  config = merge(commonConfig, productionConfig);
} else {
  config = merge(commonConfig, developmentConfig);
}

module.exports = config;

/* eslint-enable no-process-env, no-console */
