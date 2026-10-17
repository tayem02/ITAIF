import { motion } from 'motion/react'
import logoUrl from '../../.brand-source/favicon.svg'
import { PRESENTATION } from '../config'
import { AmbientScene } from '../components/AmbientScene'
import type { SlideContext } from '../types'

export function OpeningSlide({ active }: SlideContext) {
  return (
    <section className="slide opening-slide" aria-label="ITAIF 2026 opening">
      <AmbientScene />
      <div className="opening-slide__halo" aria-hidden="true" />

      <motion.div
        className="opening-slide__content"
        initial={false}
        animate={active ? 'visible' : 'hidden'}
        variants={{
          hidden: { opacity: 0, scale: 0.96 },
          visible: { opacity: 1, scale: 1, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } },
        }}
      >
        <motion.div
          className="opening-slide__edition"
          variants={{
            hidden: { opacity: 0, y: 18 },
            visible: { opacity: 1, y: 0, transition: { delay: 0.35, duration: 0.75 } },
          }}
        >
          SECOND EDITION · 2026
        </motion.div>

        <motion.div
          className="opening-slide__logo-wrap"
          variants={{
            hidden: { opacity: 0, y: 34, filter: 'blur(18px)' },
            visible: {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              transition: { delay: 0.15, duration: 1.25, ease: [0.16, 1, 0.3, 1] },
            },
          }}
        >
          <motion.div
            className="opening-slide__logo-glow"
            animate={{ opacity: [0.35, 0.75, 0.35], scale: [0.97, 1.04, 0.97] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <img className="opening-slide__logo" src={logoUrl} alt="ITAIF" draggable={false} />
          <motion.div
            className="opening-slide__scan"
            animate={{ x: ['-130%', '170%'] }}
            transition={{ duration: 3.8, delay: 1.1, repeat: Infinity, repeatDelay: 5.5, ease: 'easeInOut' }}
          />
        </motion.div>

        <motion.div
          className="opening-slide__rule"
          variants={{
            hidden: { scaleX: 0, opacity: 0 },
            visible: { scaleX: 1, opacity: 1, transition: { delay: 0.9, duration: 1 } },
          }}
        />

        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 28, filter: 'blur(10px)' },
            visible: {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              transition: { delay: 1.05, duration: 1, ease: [0.16, 1, 0.3, 1] },
            },
          }}
        >
          {PRESENTATION.taglineAr}
        </motion.h1>
        <motion.p
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 0.68, transition: { delay: 1.45, duration: 0.8 } },
          }}
        >
          {PRESENTATION.eventTitleAr}
        </motion.p>
      </motion.div>

      <div className="corner-mark corner-mark--top" aria-hidden="true" />
      <div className="corner-mark corner-mark--bottom" aria-hidden="true" />
    </section>
  )
}
