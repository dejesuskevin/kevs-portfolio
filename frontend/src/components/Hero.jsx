import { motion, useReducedMotion } from 'framer-motion'
import { FiArrowDownRight, FiArrowUpRight } from 'react-icons/fi'
import DeveloperId from './DeveloperId'

export default function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="hero container" id="home" aria-labelledby="hero-title">
      <div className="hero-copy">
        <motion.p className="hero-intro" initial={reduceMotion ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>Hello, I&apos;m</motion.p>
        <motion.h1 id="hero-title" initial={reduceMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.06 }}>
          Kevin <span>De Jesus.</span>
        </motion.h1>
        <motion.p className="hero-role" initial={reduceMotion ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.12 }}>Web Developer <i aria-hidden="true" /> IT Student</motion.p>
        <motion.p className="hero-description" initial={reduceMotion ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.18 }}>
          I build modern web experiences that bring thoughtful design, clean code, and practical functionality into one polished product.
        </motion.p>
        <motion.div className="hero-actions" initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.24 }}>
          <a className="button button--primary" href="#projects">View my projects <FiArrowDownRight aria-hidden="true" /></a>
          <a className="button button--ghost" href="#contact">Contact me <FiArrowUpRight aria-hidden="true" /></a>
        </motion.div>
        <motion.div className="hero-meta" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.35 }}>
          <span><i className="status-dot" /> Available for opportunities</span>
        </motion.div>
      </div>

      <motion.div className="hero-visual" initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}>
        <DeveloperId />
      </motion.div>
    </section>
  )
}
