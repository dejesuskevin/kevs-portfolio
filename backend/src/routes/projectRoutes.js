import { Router } from 'express'
import { getProject, getProjects } from '../controllers/projectController.js'

const router = Router()

router.get('/', getProjects)
router.get('/:id', getProject)

export default router
