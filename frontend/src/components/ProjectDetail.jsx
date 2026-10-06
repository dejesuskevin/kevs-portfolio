import { useCallback, useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FiArrowLeft, FiArrowUpRight, FiGithub, FiX } from 'react-icons/fi'
import { useFocusTrap } from '../hooks/useFocusTrap'
import ProjectVisual from './ProjectVisual'

export default function ProjectDetail({ project, onClose, returnFocusRef }) {
  const detailRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const closeDetail = useCallback(() => onClose(), [onClose])
  useFocusTrap(detailRef, true, closeDetail, returnFocusRef)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [])

  return (
    <motion.div className="project-detail-layer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0.01 : 0.4 }}>
      <motion.article ref={detailRef} className="project-detail" layoutId={`card-${project.id}`} role="dialog" aria-modal="true" aria-labelledby={`project-title-${project.id}`} transition={{ duration: reduceMotion ? 0.01 : 0.4, ease: 'easeInOut' }}>
        <div className="project-detail-nav">
          <button className="detail-back" type="button" onClick={onClose}><FiArrowLeft aria-hidden="true" /> Back to projects</button>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close project case study"><FiX aria-hidden="true" /></button>
        </div>
        <div className="project-detail-scroll">
          <header className="project-detail-header">
            <div>
              <p className="eyebrow"><span aria-hidden="true" />{project.eyebrow}</p>
              <motion.h2 id={`project-title-${project.id}`} layoutId={`title-${project.id}`}>{project.title}</motion.h2>
              <p>{project.details.overview}</p>
            </div>
            <div className="project-detail-actions">
              <a className="button button--primary" href="https://github.com/dejesuskevin" target="_blank" rel="noreferrer"><FiGithub aria-hidden="true" /> GitHub</a>
              <a className="button button--ghost is-placeholder" href="#contact" onClick={onClose} title="Live demo URL not configured">Request demo <FiArrowUpRight aria-hidden="true" /></a>
            </div>
          </header>
          <motion.div layoutId={`visual-${project.id}`}><ProjectVisual project={project} large /></motion.div>
          <div className="case-study-grid">
            <section><span className="detail-number">01</span><h3>The problem</h3><p>{project.details.problem}</p></section>
            <section><span className="detail-number">02</span><h3>The solution</h3><p>{project.details.solution}</p></section>
            <section className="case-study-features"><span className="detail-number">03</span><h3>Key features</h3><ul>{project.details.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></section>
            <section><span className="detail-number">04</span><h3>Development role</h3><p>{project.details.role}</p></section>
            <section><span className="detail-number">05</span><h3>Challenges</h3><p>{project.details.challenges}</p></section>
            <section><span className="detail-number">06</span><h3>Outcome</h3><p>{project.details.outcome}</p></section>
          </div>
          <div className="detail-stack"><span>Technologies</span><div className="tag-list">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div></div>
        </div>
      </motion.article>
    </motion.div>
  )
}
