import express from 'express'
import request from 'supertest'
import ssrHandler from './ssr'

const app = express()
app.use(ssrHandler)

describe('SSR middleware integration tests', () => {
  it('should respond with a html page', async () => {
    const res = await request(app)
      .get('/home')
      .expect('Content-Type', /html/)
      .expect(200)
    const body = res.text
    expect(body).toMatch(/mocked_main.bundle/)
    expect(body).toMatch(/mockew/)
    //expect(mockHomeCallback).toBeCalled()
  })
})
