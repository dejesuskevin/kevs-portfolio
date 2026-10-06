import { FiArrowUpRight } from 'react-icons/fi'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const facts = [
  ['Role', 'Web Developer'],
  ['Education', 'BS Information Technology'],
  ['Focus', 'Full-Stack Web Development'],
  ['Location', 'Bulacan, Philippines'],
  ['Currently', 'Building modern web applications'],
]

export default function About() {
  return (
    <section className="section container" id="about" aria-labelledby="about-title">
      <Reveal>
        <SectionHeading eyebrow="About me" title="Curious by nature. Intentional by design." />
      </Reveal>
      <div className="about-layout">
        <Reveal className="about-copy">
          <p className="about-lead">I&apos;m an IT student and web developer who enjoys turning complex ideas into digital products that feel simple to use.</p>
          <div className="about-columns">
            <p>My work sits between design and engineering. I care about the details people notice—the pace of an interaction, the clarity of a layout, and whether the product genuinely helps.</p>
            <p>I&apos;m currently focused on full-stack development, building reliable applications with modern frontend tools, practical APIs, and thoughtfully structured data.</p>
          </div>
          <a className="text-link" href="#contact">Let&apos;s work together <FiArrowUpRight aria-hidden="true" /></a>
        </Reveal>

        <Reveal className="info-card glass-panel" delay={0.12}>
          <div className="info-card-head"><span>ABOUT ME</span><i className="status-dot" /></div>
          <dl>
            {facts.map(([term, value]) => <div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
