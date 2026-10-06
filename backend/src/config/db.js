import mongoose from 'mongoose'

export function isDatabaseConnected() {
  return mongoose.connection.readyState === 1
}

export async function connectDB() {
  if (!process.env.MONGODB_URI) {
    console.error('MongoDB is not configured: set MONGODB_URI in backend/.env. Database endpoints will return 503.')
    return false
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 5000 })
    console.info('MongoDB connected.')
    return true
  } catch (error) {
    console.error(`MongoDB connection failed (${error.name}). Check MONGODB_URI and database availability. Database endpoints will return 503.`)
    return false
  }
}
