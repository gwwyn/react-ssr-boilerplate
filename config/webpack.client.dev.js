const webpack = require('webpack')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const generateScopedHash = require('../scripts/utils/generateScopedHash')
const common = require('./webpack.client.common')

const config = {
  mode: 'development',
  output: {
    filename: '[name]_[hash].bundle.js',
    chunkFilename: '[name].chunk.js',
  },
  module: {
    rules: [

      { //Styles
        test: /\.s?css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: {
                auto: /\.module\.\w+$/i,
                getLocalIdent: ({ resourcePath }, _, localName) => generateScopedHash(localName, resourcePath),
                exportLocalsConvention: 'camelCase'
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }

    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new WebpackManifestPlugin({
      fileName: 'assets-manifest.json'
    })
    
  ]
}

module.exports = merge(common, config)