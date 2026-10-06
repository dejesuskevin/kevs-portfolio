import mongoose from 'mongoose'

export default function errorMiddleware(error, _request, response, next) {
  if (response.headersSent) return next(error)

  console.error(`API error: ${error.name}`)

  if (error.type === 'entity.too.large') {
    return response.status(413).json({ success: false, message: 'Request body is too large.' })
  }
  if (error instanceof SyntaxError && 'body' in error) {
    return response.status(400).json({ success: false, message: 'Invalid JSON request body.' })
  }
  if (error instanceof mongoose.Error.ValidationError) {
    return response.status(400).json({ success: false, message: 'Invalid data provided.' })
  }

  return response.status(500).json({ success: false, message: 'An unexpected server error occurred.' })
}
