import { Router, Request, Response, NextFunction } from 'express'
import ssrMiddleware from '@/src/shared/ssr/express-middleware'
import customTemplate from '../utils/templates/custom-template'
import template from '../utils/templates/basic-template'

const router = Router()
router.use(ssrMiddleware())

router.get('/portal', async (req: Request, res: Response) => {
  if (!req.renderData) {
    throw new Error('ssr middleware is missing')
  }

  const { data, markup, assets } = req.renderData
  res.set('Content-Type', 'text/html')
  res.send(
    template({
      data,
      markup: customTemplate(markup),
      bundle: assets,
    })
  )
})

router.get('*', async (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers?.accept?.includes('text/html')) {
    return next()
  }
  if (!req.renderData) {
    throw new Error('ssr middleware is missing')
  }

  res.set('Content-Type', 'text/html')
  const { data, markup, assets } = req.renderData
  res.send(template({ data, markup, bundle: assets }))
})

export default router
