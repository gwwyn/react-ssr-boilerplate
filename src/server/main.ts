/* eslint-disable no-console */
import express, { Request, Response } from 'express'
import { createServer } from 'http'
import { app } from './app'
const server = express()

const port = process.env.PORT || 3000

server.use((req: Request, res: Response) => {
  app(req, res)
})

const http = createServer(server)

http.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
