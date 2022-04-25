import React from 'react'
import express from 'express'
import request from 'supertest'
import ssrMiddleware from '@/src/shared/ssr/express-middleware'

jest.mock(
  './load-assets',
  () => ({
    asyncLoadAssets: jest.fn(() => ['mocked_main.bundle.js']),
  }),
  { virtual: true }
)

type HomeProps = {
  title: string
}

const mockHomeCallback = jest.fn()

jest.mock('@/src/front/routes', () => {
  const HomePage = ({ title }: HomeProps) => {
    mockHomeCallback()
    return <div>Welcome {title}</div>
  }
  HomePage.displayName = 'Home page'
  HomePage.getInitialProps = async () => ({ title: 'Home' })

  return [
    { path: '/', component: () => null, exact: true },
    { path: '/home', component: HomePage, exact: true },
    { path: '/about', component: () => null, exact: true },
  ]
})

const app = express()

app.use((req, res, next) => {
  res.locals = {
    webpack: {
      devMiddleware: {
        stats: {
          toJson: () => ({
            assetsByChunkName: { main: ['mocked_dev_bundle.bundle.js'] },
          }),
        },
      },
    },
  }
  next()
})

app.use(ssrMiddleware())

app.use((req, res) => {
  res.set('Content-Type', 'text/html')
  res.send(req.renderData)
})

describe('SSR middleware integration tests', () => {
  it('should respond with a html page', async () => {
    const res = await request(app)
      .get('/home')
      .expect('Content-Type', /html/)
      .expect(200)
    const body = res.text
    expect(body).toMatch(/mocked_main.bundle/)
    expect(mockHomeCallback).toBeCalled()
  })
  it('should render a Home component on server', async () => {
    const res = await request(app)
      .get('/home')
      .expect('Content-Type', /html/)
      .expect(200)
    const body = res.text
    expect(body).toMatch(/mocked_main.bundle.js/)
    expect(body).toMatch(/Welcome/)
    expect(body).toMatch(/Home/)
  })
  it('should handle an error', async () => {
    const res = await request(app).get('/nopage').expect(404)
    expect(res.text).toMatch(/Not found/)
  })
})

// Webpack 4/5
describe('SSR dev middleware integration tests', () => {
  it('should access devMiddleware in dev mode', async () => {
    process.env.NODE_ENV = 'development'
    const res = await request(app).get('/home').expect(200)
    expect(res.text).toMatch(/mocked_dev_bundle.bundle.js/)
  })
})
