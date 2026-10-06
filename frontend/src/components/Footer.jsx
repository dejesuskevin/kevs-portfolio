import { FiArrowUp } from 'react-icons/fi'
import { navItems, socialLinks } from '../data/portfolio'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-main">
        <div className="footer-brand"><a className="brand" href="#home"><span className="brand-mark"><span className="brand-initials" aria-hidden="true">KD</span><img className="brand-photo" src="/profile.jpg" alt="" onError={(event) => { event.currentTarget.hidden = true }} /></span><span className="brand-name">Kevin De Jesus</span></a><p>Designing and building thoughtful web experiences from the Philippines.</p></div>
        <div className="footer-links"><strong>Explore</strong>{navItems.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}</div>
        <div className="footer-links"><strong>Connect</strong>{socialLinks.map((item) => <a href={item.href} key={item.label} title={item.placeholder ? 'Placeholder link — update in portfolio data' : undefined}>{item.label}</a>)}</div>
        <a className="back-to-top" href="#home" aria-label="Back to top"><FiArrowUp aria-hidden="true" /></a>
      </div>
      <div className="container footer-bottom"><span>© 2026 Kevin De Jesus. All rights reserved.</span></div>
    </footer>
  )
}
