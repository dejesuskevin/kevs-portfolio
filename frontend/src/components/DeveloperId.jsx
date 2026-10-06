import { useCallback, useEffect, useRef, useState } from 'react'
import { animate, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { QRCodeSVG } from 'qrcode.react'

const defaultConstraints = { left: -86, right: 86, top: -30, bottom: 42 }

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

export default function DeveloperId() {
  const reduceMotion = useReducedMotion()
  const stageRef = useRef(null)
  const cardRef = useRef(null)
  const keyboardTimerRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [constraints, setConstraints] = useState(defaultConstraints)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const cardRotateTarget = useTransform(x, [-110, 110], [-10, 10])
  const cardRotate = useSpring(cardRotateTarget, { stiffness: 250, damping: 19, mass: 0.62 })
  const laceRotateTarget = useTransform(x, [-110, 110], [-22, 22])
  const laceRotate = useSpring(laceRotateTarget, { stiffness: 190, damping: 22, mass: 0.7 })
  const laceStretchTarget = useTransform(y, [-30, 42], [0.88, 1.22])
  const laceStretch = useSpring(laceStretchTarget, { stiffness: 190, damping: 22, mass: 0.7 })

  const settleCard = useCallback((velocity = { x: 0, y: 0 }) => {
    const xTransition = reduceMotion
      ? { duration: 0.15 }
      : { type: 'spring', stiffness: 105, damping: 14, mass: 0.82, velocity: velocity.x }
    const yTransition = reduceMotion
      ? { duration: 0.15 }
      : { type: 'spring', stiffness: 120, damping: 16, mass: 0.78, velocity: velocity.y }

    animate(x, 0, xTransition)
    animate(y, 0, yTransition)
  }, [reduceMotion, x, y])

  useEffect(() => {
    const stage = stageRef.current
    const card = cardRef.current
    if (!stage || !card) return undefined

    const updateConstraints = () => {
      const availableSpace = (stage.clientWidth - card.offsetWidth) / 2
      const horizontalLimit = Math.max(0, Math.min(96, availableSpace - 10))
      const nextConstraints = { left: -horizontalLimit, right: horizontalLimit, top: -30, bottom: 42 }
      setConstraints(nextConstraints)
      x.set(clamp(x.get(), nextConstraints.left, nextConstraints.right))
      y.set(clamp(y.get(), nextConstraints.top, nextConstraints.bottom))
    }

    const resizeObserver = new ResizeObserver(updateConstraints)
    resizeObserver.observe(stage)
    resizeObserver.observe(card)
    updateConstraints()

    return () => resizeObserver.disconnect()
  }, [x, y])

  useEffect(() => () => window.clearTimeout(keyboardTimerRef.current), [])

  const scheduleSettle = () => {
    window.clearTimeout(keyboardTimerRef.current)
    keyboardTimerRef.current = window.setTimeout(() => {
      setIsDragging(false)
      settleCard()
    }, reduceMotion ? 120 : 420)
  }

  const handleKeyDown = (event) => {
    const keyboardMoves = {
      ArrowLeft: [-18, 0],
      ArrowRight: [18, 0],
      ArrowUp: [0, -12],
      ArrowDown: [0, 12],
    }

    if (keyboardMoves[event.key]) {
      event.preventDefault()
      const [deltaX, deltaY] = keyboardMoves[event.key]
      setIsDragging(true)
      x.set(clamp(x.get() + deltaX, constraints.left, constraints.right))
      y.set(clamp(y.get() + deltaY, constraints.top, constraints.bottom))
      scheduleSettle()
      return
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setIsDragging(true)
      x.set(clamp(x.get() <= 0 ? 34 : -34, constraints.left, constraints.right))
      scheduleSettle()
    }
  }

  return (
    <div ref={stageRef} className="developer-id-stage">
      <div className={`developer-id-rig ${isDragging ? 'is-dragging' : ''}`}>
        <motion.div className="id-lanyard" style={{ rotate: laceRotate, scaleY: laceStretch }} aria-hidden="true">
          <div className="id-lanyard-band"><span>&lt;/&gt;&nbsp;&nbsp; KD &nbsp;&nbsp;{`{ }`}&nbsp;&nbsp; DEV</span></div>
          <div className="id-lanyard-ring" />
        </motion.div>

        <div className="developer-id-home">
          <motion.article
            ref={cardRef}
            className="developer-id-card"
            role="button"
            tabIndex="0"
            aria-label="Interactive developer ID card. Drag to swing. Use arrow keys to move it."
            drag
            dragConstraints={constraints}
            dragElastic={0.06}
            dragMomentum={false}
            onDragStart={() => {
              window.clearTimeout(keyboardTimerRef.current)
              setIsDragging(true)
            }}
            onDragEnd={(_, info) => {
              setIsDragging(false)
              settleCard(info.velocity)
            }}
            onKeyDown={handleKeyDown}
            onBlur={() => settleCard()}
            style={{ x, y, rotate: cardRotate }}
            whileDrag={reduceMotion ? undefined : { scale: 1.025 }}
          >
            <div className="id-card-hardware" aria-hidden="true"><span /></div>
            <div className="id-card-topline">
              <span></span>
              <strong aria-hidden="true">&lt;/&gt;</strong>
            </div>

            <div className="id-card-profile">
              <div className="id-card-photo">
                <span aria-hidden="true">KD</span>
                <img src="/profile.jpg" alt="Kevin De Jesus" draggable="false" onError={(event) => { event.currentTarget.hidden = true }} />
                <i aria-hidden="true" />
              </div>
              <div className="id-card-identity">
                <p className="id-card-role">WEB DEVELOPER</p>
                <p className="id-card-name">Kevin<br />De Jesus</p>
                <span>IT STUDENT</span>
              </div>
            </div>

            <div className="id-card-program">
              <span>PROGRAM</span>
              <strong>BS INFORMATION TECHNOLOGY</strong>
            </div>

            <div className="id-card-footer">
              <QRCodeSVG
                className="id-card-qr"
                value="https://github.com/dejesuskevin"
                size={64}
                level="M"
                marginSize={4}
                bgColor="#c9cdc7"
                fgColor="#242629"
                title="Scan to open Kevin De Jesus's GitHub profile"
                role="img"
                aria-label="QR code linking to Kevin De Jesus's GitHub profile"
              />
              <div className="id-card-link">
                <span>PORTFOLIO PROFILE</span>
                <strong>github.com/dejesuskevin</strong>
                <small><i /> REACT&nbsp;&nbsp;•&nbsp;&nbsp;NODE&nbsp;&nbsp;•&nbsp;&nbsp;UI</small>
              </div>
            </div>
          </motion.article>
        </div>
      </div>
      <p className="developer-id-hint" aria-hidden="true">↔ DRAG TO SWING</p>
    </div>
  )
}
