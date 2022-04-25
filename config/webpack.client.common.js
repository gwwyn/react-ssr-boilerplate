const path = require('path')
const root = path.resolve(__dirname, '../')

module.exports = {
  entry: `${root}/src/front/main.tsx`,
  output: {
    path: `${root}/dist/client`,
    publicPath: '/'
  },
  module: {
    rules: [

      { //Typescript
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          highlightCode: false
        }
      },

      { // Assets
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'assets/images',
        }
      }

    ]
  },

  plugins: [],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.scss'],
    alias: {
      '@': `${root}`
    }
  }
}
