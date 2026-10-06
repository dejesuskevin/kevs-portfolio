import 'dotenv/config'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { connectDB, isDatabaseConnected } from './config/db.js'
import contactRoutes from './routes/contactRoutes.js'
import projectRoutes from './routes/projectRoutes.js'
import errorMiddleware from './middleware/errorMiddleware.js'
import notFoundMiddleware from './middleware/notFoundMiddleware.js'

export const app = express()

app.disable('x-powered-by')
app.use(helmet())
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }))
app.use(express.json({ limit: '16kb' }))
app.use('/api', async (_request, _response, next) => {
  if (!isDatabaseConnected()) {
    let timeout
    try {
      await Promise.race([
        connectDB(),
        new Promise((resolve) => { timeout = setTimeout(resolve, 3000) }),
      ])
    } finally {
      clearTimeout(timeout)
    }
  }
  next()
})

app.get('/api/health', (_request, response) => {
  const databaseConnected = isDatabaseConnected()
  response.status(databaseConnected ? 200 : 503).json({
    success: databaseConnected,
    message: databaseConnected ? 'API and database are running' : 'API is running; database unavailable',
    api: 'available',
    database: databaseConnected ? 'connected' : 'disconnected',
  })
})
app.use('/api/projects', projectRoutes)
app.use('/api/contact', contactRoutes)
app.use(notFoundMiddleware)
app.use(errorMiddleware)

async function startServer() {
  const port = Number(process.env.PORT || 5000)
  app.listen(port, () => console.info(`API listening on http://localhost:${port}`))
  void connectDB()
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  startServer().catch((error) => {
    console.error(`Could not start the API (${error.name}).`)
    process.exitCode = 1
  })
}

export default app
