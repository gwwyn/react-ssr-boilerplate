import path from 'path'
import express from 'express'
import ssrHandler from './routes/ssr'
export const app = express()

app.use(express.static(path.join(__dirname, '../../', 'dist/client')))
app.use(ssrHandler)
