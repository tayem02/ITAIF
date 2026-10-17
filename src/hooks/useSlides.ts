import { useEffect, useState } from 'react'
import { OpeningSlide } from '../slides/OpeningSlide'
import { PanelSessionSlide } from '../slides/PanelSessionSlide'
import { SessionFiveIntroSlide } from '../slides/SessionFiveIntroSlide'
import { SessionIntroSlide } from '../slides/SessionIntroSlide'
import { SessionThreeIntroSlide } from '../slides/SessionThreeIntroSlide'
import { SessionTwoIntroSlide } from '../slides/SessionTwoIntroSlide'
import type { SlideDefinition, SlideManifest } from '../types'

const openingSlides: SlideDefinition[] = [
  { id: 'opening', kind: 'custom', label: 'Event opening', component: OpeningSlide },
  { id: 'session-01', kind: 'custom', label: 'Session 1 introduction', component: SessionIntroSlide },
]

const sessionTwoIntro: SlideDefinition = {
  id: 'session-02',
  kind: 'custom',
  label: 'Session 2 introduction',
  component: SessionTwoIntroSlide,
}

const sessionTwoOpening: SlideDefinition = {
  id: 'opening-before-session-02',
  kind: 'custom',
  label: 'Event opening before Session 2',
  component: OpeningSlide,
}

const sessionThreeIntro: SlideDefinition = {
  id: 'session-03',
  kind: 'custom',
  label: 'Session 3 introduction',
  component: SessionThreeIntroSlide,
}

const sessionThreeOpening: SlideDefinition = {
  id: 'opening-before-session-03',
  kind: 'custom',
  label: 'Event opening before Session 3',
  component: OpeningSlide,
}

const panelSessionIntro: SlideDefinition = {
  id: 'session-04-panel',
  kind: 'custom',
  label: 'Session 4 panel discussion',
  component: PanelSessionSlide,
}

const panelSessionOpening: SlideDefinition = {
  id: 'opening-before-session-04',
  kind: 'custom',
  label: 'Event opening before Session 4',
  component: OpeningSlide,
}

const sessionFiveIntro: SlideDefinition = {
  id: 'session-05',
  kind: 'custom',
  label: 'Session 5 introduction',
  component: SessionFiveIntroSlide,
}

const sessionFiveOpening: SlideDefinition = {
  id: 'opening-before-session-05',
  kind: 'custom',
  label: 'Event opening before Session 5',
  component: OpeningSlide,
}

const SESSION_ONE_FOOTER = 'ITAIF 2026 | The Power of AI in Business | نضال خليفة'
const SESSION_TWO_FOOTER =
  "ITAIF 2026 | When AI Makes the Call: Who's Responsible? | Dr. Ghaith Hammouri"
const SESSION_FIVE_FOOTER = 'ITAIF 2026 | Beyond Automation | Dr. Hamzeh Aljawawdeh'

export function useSlides() {
  const [slides, setSlides] = useState<SlideDefinition[]>([
    ...openingSlides,
    sessionTwoOpening,
    sessionTwoIntro,
    sessionThreeOpening,
    sessionThreeIntro,
    panelSessionOpening,
    panelSessionIntro,
    sessionFiveOpening,
    sessionFiveIntro,
  ])
  const [sourceReady, setSourceReady] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function readManifest(path: string) {
      try {
        const response = await fetch(path, { cache: 'no-store' })
        if (!response.ok) throw new Error(`Manifest returned ${response.status}`)
        return (await response.json()) as SlideManifest
      } catch {
        return { slides: [] } satisfies SlideManifest
      }
    }

    async function loadManifests() {
      const [sessionOneManifest, sessionTwoManifest, sessionFiveManifest] = await Promise.all([
        readManifest('./slides/manifest.json'),
        readManifest('./slides/session-02/manifest.json'),
        readManifest('./slides/session-05/manifest.json'),
      ])

      const sessionOneSlides: SlideDefinition[] = sessionOneManifest.slides.map((slide, index) => ({
        id: `session-01-original-${index + 1}`,
        kind: 'original',
        label: slide.title || `Original slide ${index + 1}`,
        image: `./slides/${slide.file}`,
        alt: slide.title || `The Power of AI in Business — slide ${index + 1}`,
        footer: SESSION_ONE_FOOTER,
      }))

      const sessionTwoSlides: SlideDefinition[] = sessionTwoManifest.slides.map((slide, index) => ({
        id: `session-02-original-${index + 1}`,
        kind: 'original',
        label: slide.title || `Session 2 slide ${index + 1}`,
        image: `./slides/session-02/${slide.file}`,
        alt: slide.title || `When AI Makes the Call — slide ${index + 1}`,
        footer: SESSION_TWO_FOOTER,
      }))

      const sessionFiveSlides: SlideDefinition[] = sessionFiveManifest.slides.map((slide, index) => ({
        id: `session-05-original-${index + 1}`,
        kind: 'original',
        label: slide.title || `Session 5 slide ${index + 1}`,
        image: `./slides/session-05/${slide.file}`,
        alt: slide.title || `Beyond Automation — slide ${index + 1}`,
        footer: SESSION_FIVE_FOOTER,
      }))

      if (!cancelled) {
        const completeDeck = [
          ...openingSlides,
          ...sessionOneSlides,
          sessionTwoOpening,
          sessionTwoIntro,
          ...sessionTwoSlides,
          sessionThreeOpening,
          sessionThreeIntro,
          panelSessionOpening,
          panelSessionIntro,
          sessionFiveOpening,
          sessionFiveIntro,
          ...sessionFiveSlides,
        ]
        setSlides(completeDeck)
        setSourceReady(sessionOneSlides.length > 0)

        completeDeck.forEach((slide) => {
          if (slide.kind === 'original') {
            const image = new Image()
            image.decoding = 'async'
            image.src = slide.image
          }
        })
      }
    }

    void loadManifests()

    return () => {
      cancelled = true
    }
  }, [])

  return { slides, sourceReady }
}
