import { FiArrowUpRight, FiAward, FiBookOpen, FiEye, FiMail, FiMapPin, FiUser } from 'react-icons/fi'
import { certifications } from '../data/portfolio'
import Reveal from './Reveal'

function ResumeSectionTitle({ icon: Icon, children }) {
  return (
    <div className="resume-section-title">
      <span aria-hidden="true"><Icon /></span>
      <h3>{children}</h3>
    </div>
  )
}

export default function Resume() {
  return (
    <section className="section section--tinted" id="resume" aria-labelledby="resume-title">
      <div className="container">
        <Reveal className="resume-sheet glass-panel">
          <header className="resume-dashboard-header">
            <div className="resume-heading">
              <p className="resume-kicker">Resume / My resume, at a glance.</p>
              <h2 id="resume-title">Kevin De Jesus</h2>
              <div className="resume-contact" aria-label="Contact details">
                <span><FiMapPin aria-hidden="true" /> Bulacan, Philippines</span>
                <a href="mailto:dejesus.kevinkevin2004@gmail.com"><FiMail aria-hidden="true" /><span>dejesus.kevinkevin2004@gmail.com</span></a>
              </div>
            </div>
            <a className="resume-view-button" href="#resume-details"><FiEye aria-hidden="true" /> View Resume</a>
          </header>

          <div className="resume-dashboard-body" id="resume-details">
            <section className="resume-block" aria-labelledby="resume-summary-title">
              <ResumeSectionTitle icon={FiUser}><span id="resume-summary-title">Professional Summary</span></ResumeSectionTitle>
              <div className="resume-summary">
                <p>Fourth-year BSIT student with hands-on experience in full-stack development and software testing within collaborative teams. Skilled in building web applications, UI/UX design, bug identification, and quality assurance. A detail-oriented and adaptable IT professional eager to contribute technical and problem-solving skills to a professional team.</p>
              </div>
            </section>

            <section className="resume-block" aria-labelledby="resume-certifications-title">
              <ResumeSectionTitle icon={FiAward}><span id="resume-certifications-title">Certifications &amp; Training</span></ResumeSectionTitle>
              <div className="resume-certifications-grid">
                {certifications.map((certification) => (
                  <a
                    className="resume-certification-card"
                    href={certification.href}
                    key={certification.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View certificate: ${certification.title} (opens in a new tab)`}
                  >
                    <span className="resume-certification-icon" aria-hidden="true"><FiAward /></span>
                    <span className="resume-certification-copy">
                      <strong>{certification.title}</strong>
                      <span>{certification.provider} · <time dateTime={certification.dateISO}>{certification.date}</time></span>
                    </span>
                    <FiArrowUpRight className="resume-certification-arrow" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </section>

            <section className="resume-block" aria-labelledby="resume-education-title">
              <ResumeSectionTitle icon={FiBookOpen}><span id="resume-education-title">Education</span></ResumeSectionTitle>
              <article className="resume-education-card">
                <div>
                  <span className="resume-label">01 / Education</span>
                  <h4>Polytechnic University of the Philippines</h4>
                  <p className="resume-education-campus">Santa Maria Campus</p>
                  <p className="resume-education-degree">Bachelor of Science in Information Technology</p>
                </div>
                <span className="resume-education-status">Currently studying</span>
              </article>
            </section>
          </div>

          <footer className="resume-footer">
            <span>Interested in working together?</span>
            <a className="text-link" href="#contact">Get in touch <FiArrowUpRight aria-hidden="true" /></a>
          </footer>
        </Reveal>
      </div>
    </section>
  )
}
