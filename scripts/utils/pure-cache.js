/* eslint-disable no-console */
import path from 'path'

export const pureCache = () => {
  Object.keys(require.cache).forEach(id => {
    const pathToPlugin = path.resolve(
      process.cwd(),
      'node_modules/babel-plugin-css-modules-transform/build/index.js'
    )
    if (!!require.cache[pathToPlugin]) {
      delete require.cache[pathToPlugin]
    }

    if (/[/\\](src|scripts\\utils|scss)[/\\]/.test(id)) {
      delete require.cache[id]
    }
  })

  console.log('Server reloaded')
}
