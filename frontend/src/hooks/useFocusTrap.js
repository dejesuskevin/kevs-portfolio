import { useEffect } from 'react'

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

export function useFocusTrap(containerRef, isActive, onEscape, returnFocusRef) {
  useEffect(() => {
    if (!isActive || !containerRef.current) return undefined

    const container = containerRef.current
    const previousFocus = document.activeElement
    const returnFocusTarget = returnFocusRef?.current
    const firstFocusable = container.querySelector(focusableSelector)
    firstFocusable?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onEscape()
        return
      }

      if (event.key !== 'Tab') return
      const focusable = [...container.querySelectorAll(focusableSelector)]
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable.at(-1)

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      const target = returnFocusTarget || previousFocus
      target?.focus?.()
    }
  }, [containerRef, isActive, onEscape, returnFocusRef])
}
