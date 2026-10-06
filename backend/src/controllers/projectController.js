import mongoose from 'mongoose'
import { isDatabaseConnected } from '../config/db.js'
import Project from '../models/Project.js'

const databaseUnavailable = { success: false, message: 'Database unavailable. Please try again later.' }

function formatProject(project) {
  return {
    ...project,
    id: project.slug,
    eyebrow: project.eyebrow || project.category || 'Project',
    tone: project.tone || 'violet',
    details: {
      overview: project.overview || '',
      problem: project.problem || '',
      solution: project.solution || '',
      features: project.features || [],
      role: project.role || '',
      challenges: project.challenges || '',
      outcome: project.outcome || '',
    },
  }
}

export async function getProjects(_request, response) {
  if (!isDatabaseConnected()) return response.status(503).json(databaseUnavailable)

  const projects = await Project.find().sort({ createdAt: -1 }).lean()
  return response.json({ success: true, data: projects.map(formatProject) })
}

export async function getProject(request, response) {
  if (!isDatabaseConnected()) return response.status(503).json(databaseUnavailable)

  const identifier = request.params.id
  const project = mongoose.isValidObjectId(identifier)
    ? await Project.findById(identifier).lean()
    : await Project.findOne({ slug: identifier }).lean()

  if (!project) return response.status(404).json({ success: false, message: 'Project not found' })
  return response.json({ success: true, data: formatProject(project) })
}
