import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { FiArrowUpRight, FiMenu, FiX } from 'react-icons/fi'
import { navItems } from '../data/portfolio'
import { useFocusTrap } from '../hooks/useFocusTrap'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const sidebarRef = useRef(null)
  const triggerRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const closeMenu = useCallback(() => setOpen(false), [])

  useFocusTrap(sidebarRef, open, closeMenu, triggerRef)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [open])

  return (
    <>
      <header className={`navbar-shell ${scrolled ? 'is-scrolled' : ''}`}>
        <nav className="navbar container" aria-label="Main navigation">
          <a className="brand" href="#home" aria-label="Kevin De Jesus, home">
            <span className="brand-monogram" aria-hidden="true">KDJ</span>
          </a>

          <div className="nav-links">
            {navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
          </div>

          <button ref={triggerRef} className="icon-button menu-button" type="button" onClick={() => setOpen(true)} aria-label="Open navigation menu" aria-expanded={open} aria-controls="site-sidebar">
            <FiMenu aria-hidden="true" />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div className="sidebar-layer" initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <button className="sidebar-scrim" type="button" onClick={closeMenu} aria-label="Close navigation menu" />
            <motion.aside
              ref={sidebarRef}
              id="site-sidebar"
              className="sidebar"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              initial={reduceMotion ? { x: 0 } : { x: '-104%' }}
              animate={{ x: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { x: '-104%' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="sidebar-head">
                <a className="brand" href="#home" onClick={closeMenu} aria-label="Kevin De Jesus, home">
                  <span className="brand-monogram" aria-hidden="true">KDJ</span>
                </a>
                <button className="icon-button" type="button" onClick={closeMenu} aria-label="Close navigation menu"><FiX aria-hidden="true" /></button>
              </div>

              <div className="sidebar-label">Explore</div>
              <nav className="sidebar-nav" aria-label="Sidebar navigation">
                <a href="#home" onClick={closeMenu}><span>01</span>Home<FiArrowUpRight aria-hidden="true" /></a>
                {navItems.map((item, index) => (
                  <a key={item.href} href={item.href} onClick={closeMenu}>
                    <span>{String(index + 2).padStart(2, '0')}</span>{item.label}<FiArrowUpRight aria-hidden="true" />
                  </a>
                ))}
              </nav>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
