import mongoose from 'mongoose'

const contactMessageSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    maxlength: 254,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  message: { type: String, required: true, trim: true, minlength: 20, maxlength: 5000 },
  status: { type: String, enum: ['new', 'read', 'replied'], default: 'new' },
}, { timestamps: true, versionKey: false })

export default mongoose.model('ContactMessage', contactMessageSchema)
