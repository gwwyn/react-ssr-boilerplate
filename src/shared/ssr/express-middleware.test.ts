import { Request, Response, NextFunction } from 'express'
import { createRequest, createResponse } from 'node-mocks-http'
import ssrMiddleware from './express-middleware'
import { asyncLoadAssets } from './load-assets'
import { getAssetsFromResponse } from './helpers'

let req: Request
let res: Response
let mockNext: NextFunction

beforeEach(() => {
  req = createRequest()
  res = createResponse()
  mockNext = jest.fn()
})

jest.mock('./load-assets', () => ({
  asyncLoadAssets: jest.fn(),
}))

jest.mock('./helpers', () => ({
  getAssetsFromResponse: jest.fn(),
}))

jest.mock('@/src/front/routes', () => [{ path: '/', component: () => null }], {
  virtual: true,
})

describe('SSR middleware unit tests', () => {
  xit('should be a valid express middleware', async () => {
    const middleware = ssrMiddleware()
    await expect(
      middleware(req as Request, res as Response, mockNext as NextFunction)
    )
    expect(mockNext).toBeCalled()
  })
  it('should call mock functions', async () => {
    const middleware = ssrMiddleware()
    await middleware(req, res, mockNext)
    expect(asyncLoadAssets).toBeCalled()
  })
})

describe('SSR dev middleware unit tests', () => {
  beforeAll(() => {
    jest.resetModules()
  })
  afterAll(() => {
    process.env.NODE_ENV = 'test'
  })
  it('should access dev-middleware', async () => {
    process.env.NODE_ENV = 'development'
    const middleware = ssrMiddleware()
    await middleware(req, res, mockNext)
    expect(getAssetsFromResponse).toBeCalled()
  })
})
