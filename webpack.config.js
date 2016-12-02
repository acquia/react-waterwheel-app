const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const postcssImport = require('postcss-import');

module.exports = {
  entry: [
    './src/Main.jsx'
  ],
  output: {
    filename: '[hash].js',
    publicPath: '/'
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body',
      filename: 'index.html',
      hash: true
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new ExtractTextPlugin('style.css', { allChunks: true })
  ],
  postcss: webpack => ( // eslint-disable-line no-shadow
    [
      postcssImport({ addDependencyTo: webpack }),
      require('precss'),
      require('autoprefixer')
    ]
  ),
  module: {
    loaders: [
      {
        test: /\.js$|\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      },
      {
        test: /\.json?$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url',
        query: {
          name: '[hash].[ext]',
          limit: 10000,
        },

      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'url',
        options: {
          name: 'fonts/[hash].[ext]',
          limit: 5000,
          mimetype: 'application/font-woff',
        }
      },
      {
        test: /\.(ttf|eot|svg)$/,
        loader: 'file',
        options: {
          name: 'fonts/[hash].[ext]',
        }
      }
    ]
  }
};
