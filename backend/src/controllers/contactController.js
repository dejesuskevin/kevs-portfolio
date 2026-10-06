import { isDatabaseConnected } from '../config/db.js'
import ContactMessage from '../models/ContactMessage.js'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function createContactMessage(request, response) {
  const { name, email, message } = request.body ?? {}

  if (typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 100) {
    return response.status(400).json({ success: false, message: 'Name must be between 2 and 100 characters.' })
  }
  if (typeof email !== 'string' || email.trim().length > 254 || !emailPattern.test(email.trim())) {
    return response.status(400).json({ success: false, message: 'Enter a valid email address.' })
  }
  if (typeof message !== 'string' || message.trim().length < 20 || message.trim().length > 5000) {
    return response.status(400).json({ success: false, message: 'Message must be between 20 and 5000 characters.' })
  }
  if (!isDatabaseConnected()) {
    return response.status(503).json({ success: false, message: 'Database unavailable. Please try again later.' })
  }

  await ContactMessage.create({ name: name.trim(), email: email.trim().toLowerCase(), message: message.trim() })
  return response.status(201).json({ success: true, message: 'Message sent successfully.' })
}
