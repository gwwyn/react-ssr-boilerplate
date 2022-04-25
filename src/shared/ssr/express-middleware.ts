import React from 'react'
import { Request, Response, NextFunction } from 'express'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router'
import { asyncLoadAssets } from './load-assets'
import { getAssetsFromResponse } from './helpers'
import { AssetsType } from './types'
import withSSR from './withSSR'

import App from '@/src/front/App'
import routes from '@/src/front/routes'

type RenderData = {
  data: string
  markup: string
  assets: string[]
}

declare module 'express-serve-static-core' {
  interface Request {
    renderData?: RenderData
  }
}

// SSR middleware
export default () => {
  async function ssrMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const isProd = process.env.NODE_ENV !== 'development'
    const assets: AssetsType = !isProd
      ? getAssetsFromResponse(res)
      : await asyncLoadAssets()

    const currentRoute = routes.find(route => matchPath(req.url, route))
    if (!currentRoute) {
      return res.status(404).send('Not found')
    }

    const component = withSSR(currentRoute.component)
    const initProps = await component.getInitialProps()
    const data = JSON.stringify(initProps)

    const context = {}

    const StaticApp = React.createElement(App, { initData: initProps })
    const AppRouter = React.createElement(
      StaticRouter,
      {
        context: context,
        location: req.url,
      },
      StaticApp
    )

    const markup = renderToString(
      React.createElement('div', { id: 'app' }, AppRouter)
    )

    req.renderData = {
      data,
      markup,
      assets: assets || [],
    }

    next()
  }

  return ssrMiddleware
}
