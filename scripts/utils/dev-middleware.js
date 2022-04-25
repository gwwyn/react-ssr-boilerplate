import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import config from '../../config/webpack.client.dev'
const compiler = webpack(config)

export const devMiddleware = app => {
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath,
      serverSideRender: true,
      stats: {
        colors: true,
        assets: false,
        chunks: false,
        modules: false,
        hash: false,
      },
    })
  )
  app.use(webpackHotMiddleware(compiler))
}
