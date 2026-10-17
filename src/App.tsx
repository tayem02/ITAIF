import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSlides } from './hooks/useSlides'
import { OriginalSlide } from './slides/OriginalSlide'

const WIDTH = 1920
const HEIGHT = 1080

function getInitialSlide() {
  const fromHash = Number.parseInt(window.location.hash.replace('#', ''), 10)
  return Number.isFinite(fromHash) && fromHash > 0 ? fromHash - 1 : 0
}

export default function App() {
  const { slides, sourceReady } = useSlides()
  const [current, setCurrent] = useState(getInitialSlide)
  const [direction, setDirection] = useState<1 | -1>(1)
  const [scale, setScale] = useState(1)
  const [fullscreen, setFullscreen] = useState(Boolean(document.fullscreenElement))

  const goTo = useCallback(
    (index: number) => {
      const next = Math.max(0, Math.min(index, slides.length - 1))
      if (next === current) return
      setDirection(next > current ? 1 : -1)
      setCurrent(next)
    },
    [current, slides.length],
  )

  const toggleFullscreen = useCallback(async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen()
      } else {
        await document.documentElement.requestFullscreen({ navigationUI: 'hide' })
      }
    } catch {
      // Fullscreen can be rejected when the browser does not treat the key event as a user gesture.
    }
  }, [])

  useEffect(() => {
    const resize = () => setScale(Math.min(window.innerWidth / WIDTH, window.innerHeight / HEIGHT))
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  useEffect(() => {
    window.history.replaceState(null, '', `#${current + 1}`)
  }, [current])

  useEffect(() => {
    const onFullscreen = () => setFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', onFullscreen)
    return () => document.removeEventListener('fullscreenchange', onFullscreen)
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const nextKeys = ['ArrowRight', 'ArrowDown', 'PageDown', ' ']
      const previousKeys = ['ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace']

      if (nextKeys.includes(event.key)) {
        event.preventDefault()
        goTo(current + 1)
      } else if (previousKeys.includes(event.key)) {
        event.preventDefault()
        goTo(current - 1)
      } else if (event.key === 'Home') {
        event.preventDefault()
        goTo(0)
      } else if (event.key === 'End') {
        event.preventDefault()
        goTo(slides.length - 1)
      } else if (event.key.toLowerCase() === 'f') {
        event.preventDefault()
        void toggleFullscreen()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [current, goTo, slides.length, toggleFullscreen])

  const activeSlide = slides[current]
  const renderedSlide = useMemo(() => {
    if (!activeSlide) return null
    if (activeSlide.kind === 'original') {
      return <OriginalSlide image={activeSlide.image} alt={activeSlide.alt} footer={activeSlide.footer} active />
    }
    const Component = activeSlide.component
    return <Component active direction={direction} />
  }, [activeSlide, direction])

  return (
    <main className={`viewport ${fullscreen ? 'is-fullscreen' : ''}`}>
      <div
        className="stage"
        style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
        aria-live="polite"
      >
        <AnimatePresence initial={false} mode="sync" custom={direction}>
          <motion.div
            className="stage__slide"
            key={activeSlide?.id}
            custom={direction}
            initial={{ opacity: 0, x: direction * 90, scale: 1.018, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: direction * -70, scale: 0.992, filter: 'blur(8px)' }}
            transition={{
              duration: activeSlide?.kind === 'custom' ? 0.9 : 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {renderedSlide}
          </motion.div>
        </AnimatePresence>

        <div className="stage__chrome" aria-hidden="true">
          <span>{String(current + 1).padStart(2, '0')}</span>
          <div>
            {slides.map((slide, index) => (
              <i key={slide.id} className={index === current ? 'is-active' : ''} />
            ))}
          </div>
          <span>{String(slides.length).padStart(2, '0')}</span>
        </div>

        {!fullscreen && !sourceReady && (
          <div className="source-status" role="status">
            PPTX source pending · Opening and session intro ready
          </div>
        )}
      </div>
      <div className="viewport__grain" aria-hidden="true" />
    </main>
  )
}
