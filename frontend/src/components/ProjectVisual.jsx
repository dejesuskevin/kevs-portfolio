export default function ProjectVisual({ project, large = false }) {
  return (
    <div className={`project-visual project-visual--${project.tone} ${large ? 'project-visual--large' : ''}`} aria-label={`${project.title} interface preview`} role="img">
      <div className="project-browser">
        <div className="project-browser-bar"><span /><span /><span /><i /></div>
        {project.id === 'mindcare' && (
          <div className="mock mock--mindcare">
            <div className="mock-side"><b>M</b><i /><i /><i /></div>
            <div className="mock-content"><small>Good afternoon</small><strong>How are you feeling?</strong><div className="mood-row"><i>◡</i><i>—</i><i>⌣</i></div><span /><span className="short" /></div>
            <div className="mock-chat"><small>Community</small><p>You&apos;re not alone.</p><p>Take it one day at a time.</p></div>
          </div>
        )}
        {project.id === 'lakbay' && (
          <div className="mock mock--lakbay">
            <div className="map-road map-road--one" /><div className="map-road map-road--two" /><div className="map-road map-road--three" />
            <div className="map-pin pin-one">J</div><div className="map-pin pin-two">J</div><div className="map-pin pin-three">J</div>
            <div className="map-panel"><small>Route 03</small><strong>Downtown Loop</strong><span>8 vehicles active</span><i className="map-cta">View route</i></div>
          </div>
        )}
        {project.id === 'iskolarvault' && (
          <div className="mock mock--vault">
            <div className="vault-nav"><b>IV</b><span>Library</span><span>Collections</span><span>Reviews</span></div>
            <div className="vault-main"><small>Research library</small><strong>Discover academic work</strong><div className="vault-search">Search papers...</div><div className="vault-files"><i /><i /><i /></div></div>
          </div>
        )}
      </div>
      <div className="visual-grain" />
    </div>
  )
}
