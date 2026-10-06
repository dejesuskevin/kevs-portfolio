import { motion } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import ProjectVisual from './ProjectVisual'

export default function ProjectCard({ project, index, onSelect, buttonRef }) {
  return (
    <motion.article className="project-card" layoutId={`card-${project.id}`}>
      <button ref={buttonRef} className="project-card-trigger" type="button" onClick={() => onSelect(project)} aria-label={`View ${project.title} case study`}>
        <motion.div layoutId={`visual-${project.id}`}><ProjectVisual project={project} /></motion.div>
        <div className="project-card-body">
          <div className="project-index">0{index + 1} / Featured project</div>
          <div className="project-card-title"><motion.h3 layoutId={`title-${project.id}`}>{project.title}</motion.h3><span className="project-arrow"><FiArrowUpRight aria-hidden="true" /></span></div>
          <p>{project.description}</p>
          <div className="tag-list">{project.technologies.slice(0, 4).map((technology) => <span key={technology}>{technology}</span>)}</div>
        </div>
      </button>
    </motion.article>
  )
}
