import mongoose from 'mongoose'

const httpUrl = /^https?:\/\/\S+$/i

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 120 },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  },
  description: { type: String, required: true, trim: true, maxlength: 1000 },
  category: { type: String, trim: true, maxlength: 100 },
  eyebrow: { type: String, trim: true, maxlength: 100 },
  tone: { type: String, trim: true, maxlength: 30 },
  image: { type: String, trim: true, maxlength: 2048 },
  technologies: {
    type: [{ type: String, trim: true, maxlength: 60 }],
    default: [],
    validate: { validator: (items) => items.length <= 30, message: 'Too many technologies.' },
  },
  githubUrl: { type: String, trim: true, maxlength: 2048, match: httpUrl },
  liveUrl: { type: String, trim: true, maxlength: 2048, match: httpUrl },
  overview: { type: String, trim: true, maxlength: 5000 },
  problem: { type: String, trim: true, maxlength: 5000 },
  solution: { type: String, trim: true, maxlength: 5000 },
  features: {
    type: [{ type: String, trim: true, maxlength: 250 }],
    default: [],
    validate: { validator: (items) => items.length <= 30, message: 'Too many features.' },
  },
  role: { type: String, trim: true, maxlength: 2000 },
  challenges: { type: String, trim: true, maxlength: 5000 },
  outcome: { type: String, trim: true, maxlength: 5000 },
}, { timestamps: true, versionKey: false })

export default mongoose.model('Project', projectSchema)
