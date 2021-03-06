/* eslint-disable no-process-env, no-console */

if (typeof process.env.NODE_ENV === 'undefined') {
  process.env.NODE_ENV = 'production';
}

console.log(process.env.NODE_ENV);

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist')
};

const CONFIG = require('dotenv').config().parsed;

const commonConfig = {
  mode: JSON.stringify(process.env.NODE_ENV),
  entry: ['@babel/polyfill', path.join(__dirname, 'src', 'index.js')],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
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
      }, {
        test: /\.css$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader', options: {url: true}}
        ]
      }, {
        test: /\.(sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {loader: 'css-loader', options: {sourceMap: true}},
          {loader: 'resolve-url-loader'},
          {loader: 'sass-loader', options: {sourceMap: true}}
        ]
      }, {
        test: /\.(svg|png|swf|jpg|otf|eot|ttf|woff|woff2)(\?.*)?$/,
        use: [{loader: 'file-loader', options: {name: '[name].[ext]', outputPath: 'assets/'}}]
      }
    ]
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()],
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css'
    }),
    new HtmlWebpackPlugin({
      template: PATHS.src + '/index.html',
      filename: PATHS.dist + '/index.html',
      // favicon: 'favicon.png',
      inject: 'body'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        API_HTTP_ENDPOINT: JSON.stringify(CONFIG.API_HTTP_ENDPOINT),
        API_CHAIN_ID: JSON.stringify(CONFIG.API_CHAIN_ID),
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
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
    contentBase: PATHS.dist,
    publicPath: '/',
    stats: {colors: true},
    historyApiFallback: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};

const productionConfig = {
  devtool: 'nosources-source-map',
  plugins: [
    new UglifyJsPlugin({sourceMap: true, uglifyOptions: {safari10: true}})
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
