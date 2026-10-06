import { stackGroups } from '../data/portfolio'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function TechStack() {
  return (
    <section className="section section--tinted" id="stack" aria-labelledby="stack-title">
      <div className="container">
        <Reveal><SectionHeading eyebrow="Tech stack" title="The tools behind the work." copy="A practical set of technologies I use to design, build, test, and evolve modern web applications." /></Reveal>
        <div className="stack-groups">
          {stackGroups.map((group, groupIndex) => (
            <Reveal className="stack-group" key={group.title} delay={groupIndex * 0.05}>
              <h3>{group.title}</h3>
              <div className="stack-list">
                {group.items.map(({ name, description, icon: Icon }) => (
                  <div className="stack-item" key={name}>
                    <div className="stack-icon"><Icon aria-hidden="true" /></div>
                    <div><strong>{name}</strong><span>{description}</span></div>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
