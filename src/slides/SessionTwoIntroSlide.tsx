import { motion } from 'motion/react'
import logoUrl from '../../.brand-source/favicon.svg'
import speakerUrl from '../../ghaith-hammouri-image.webp'
import { AmbientScene } from '../components/AmbientScene'
import type { SlideContext } from '../types'

export function SessionTwoIntroSlide({ active }: SlideContext) {
  return (
    <section className="slide session-slide session-slide--two" aria-label="Session 2 introduction">
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
            alt="Dr. Ghaith Hammouri"
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
          <span>SESSION 02</span>
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
          When <span>AI</span> Makes
          <br />
          the Call:
          <br />
          Who’s Responsible?
        </motion.h1>
        <motion.div
          className="session-slide__divider"
          variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.85 } } }}
        />
        <motion.div
          className="session-slide__speaker session-slide__speaker--english"
          variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
        >
          <span>SPEAKER</span>
          <strong>Dr. Ghaith Hammouri</strong>
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
      <div className="session-slide__index">02</div>
    </section>
  )
}
