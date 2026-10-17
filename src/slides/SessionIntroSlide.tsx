import { motion } from 'motion/react'
import logoUrl from '../../.brand-source/favicon.svg'
import speakerUrl from '../../nidal-khalifeh-image.webp'
import { AmbientScene } from '../components/AmbientScene'
import { PRESENTATION } from '../config'
import type { SlideContext } from '../types'

export function SessionIntroSlide({ active }: SlideContext) {
  return (
    <section className="slide session-slide" aria-label="Session introduction">
      <AmbientScene restrained />

      <motion.div
        className="session-slide__photo-panel"
        initial={false}
        animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
        transition={{ duration: 1, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="session-slide__photo-frame">
          <div className="session-slide__photo-aura" />
          <img
            src={speakerUrl}
            alt={`صورة المتحدث ${PRESENTATION.speakerAr}`}
            className="session-slide__photo"
            draggable={false}
          />
          <div className="session-slide__photo-shade" />
        </div>
        <motion.div
          className="session-slide__portrait-line"
          animate={{ scaleY: [0.65, 1, 0.65], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      <motion.div
        className="session-slide__copy"
        initial={false}
        animate={active ? 'visible' : 'hidden'}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.13, delayChildren: 0.38 } },
        }}
      >
        <motion.div
          className="session-slide__eyebrow"
          variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
        >
          <span>SESSION 01</span>
          <i />
          <span>ITAIF 2026</span>
        </motion.div>
        <motion.h1
          dir="ltr"
          variants={{
            hidden: { opacity: 0, x: 42, filter: 'blur(10px)' },
            visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.9 } },
          }}
        >
          The Power of <span>AI</span>
          <br />
          in Business
        </motion.h1>
        <motion.div
          className="session-slide__divider"
          variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.85 } } }}
        />
        <motion.div
          className="session-slide__speaker"
          variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
        >
          <span>المتحدث</span>
          <strong>{PRESENTATION.speakerAr}</strong>
        </motion.div>
      </motion.div>

      <motion.img
        src={logoUrl}
        className="session-slide__logo"
        alt="ITAIF"
        initial={false}
        animate={active ? { opacity: 0.78, y: 0 } : { opacity: 0, y: -16 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      />
      <div className="session-slide__index">01</div>
    </section>
  )
}
