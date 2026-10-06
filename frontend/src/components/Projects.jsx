import { useCallback, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { projects } from '../data/portfolio'
import ProjectCard from './ProjectCard'
import ProjectDetail from './ProjectDetail'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function Projects() {
  const [selected, setSelected] = useState(null)
  const triggerRefs = useRef({})
  const closeProject = useCallback(() => setSelected(null), [])

  return (
    <section className="section container" id="projects" aria-labelledby="projects-title">
      <Reveal>
        <SectionHeading eyebrow="Selected work" title="Products made to solve real problems." copy="A selection of full-stack concepts shaped around people, context, and the details that make software useful." />
      </Reveal>
      <div className="project-grid">
        {projects.map((project, index) => (
          <Reveal key={project.id} delay={index * 0.07}>
            <ProjectCard project={project} index={index} onSelect={setSelected} buttonRef={(node) => { triggerRefs.current[project.id] = node }} />
          </Reveal>
        ))}
      </div>
      <AnimatePresence>
        {selected && <ProjectDetail project={selected} onClose={closeProject} returnFocusRef={{ current: triggerRefs.current[selected.id] }} />}
      </AnimatePresence>
    </section>
  )
}
