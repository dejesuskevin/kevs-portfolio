import mongoose from 'mongoose'

let connectionPromise

export function isDatabaseConnected() {
  return mongoose.connection.readyState === 1
}

export async function connectDB() {
  if (isDatabaseConnected()) return true
  if (connectionPromise) return connectionPromise

  if (!process.env.MONGODB_URI) {
    console.error('MongoDB is not configured: set MONGODB_URI in the environment. Database endpoints will return 503.')
    return false
  }

  connectionPromise = (async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 5000 })
      console.info('MongoDB connected.')
      return true
    } catch (error) {
      console.error(`MongoDB connection failed (${error.name}). Check MONGODB_URI and database availability. Database endpoints will return 503.`)
      return false
    } finally {
      connectionPromise = undefined
    }
  })()

  return connectionPromise
}
