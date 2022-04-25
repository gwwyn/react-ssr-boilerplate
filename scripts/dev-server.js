/* eslint-disable  @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
process.env.NODE_ENV = 'development'
const generateScopedHash = require('./utils/generateScopedHash')

require('@babel/register')({
  plugins: [
    [
      'css-modules-transform',
      {
        camelCase: true,
        extensions: ['.css', '.scss'],
        generateScopedName: generateScopedHash,
        devMode: true,
      },
    ],
    [
      'transform-assets',
      {
        extensions: ['svg'],
        name: '/assets/images/[name].[ext]',
      },
    ],
    'dynamic-import-node',
  ],
  extensions: ['.js', '.ts', '.tsx', '.scss', 'svg'],
})

const express = require('express')
const chokidar = require('chokidar')
const chalk = require('chalk')
const path = require('path')
const { pureCache } = require('./utils/pure-cache')
const { devMiddleware } = require('./utils/dev-middleware')

process.on('unhandledRejection', err => {
  console.error(err)
})

const server = express()
const port = process.env.PORT || 3000

const watchServer = async () => {
  const watcher = chokidar.watch(path.resolve(__dirname, '../'), {
    ignoreInitial: true,
    ignored: /\/(node_modules|dist)\//,
  })

  watcher.on('ready', () => {
    watcher.on('all', () => {
      pureCache()
    })
  })
}

devMiddleware(server)

server.use((req, res) => {
  const { app } = require('../src/server/app')
  app(req, res)
})

server.listen(port, () => {
  watchServer()
  console.log(chalk.cyanBright(`Server running on port ${port}`))
})
