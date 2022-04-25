import { Response } from 'express'
import { AssetsType } from './types'

export const getAssetsFromResponse = (res: Response): AssetsType => {
  const { devMiddleware } = res?.locals?.webpack
  const jsonWebpackStats = devMiddleware.stats.toJson()
  const { assetsByChunkName } = jsonWebpackStats
  const assets = assetsByChunkName.main
  return assets
}
