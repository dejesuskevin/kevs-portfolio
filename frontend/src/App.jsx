import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Projects from './components/Projects'
import Resume from './components/Resume'
import TechStack from './components/TechStack'

export default function App() {
  return (
    <div className="site-shell">
      <div className="ambient ambient--violet" aria-hidden="true" />
      <div className="ambient ambient--mint" aria-hidden="true" />
      <div className="ambient ambient--blue" aria-hidden="true" />
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Projects />
        <TechStack />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
