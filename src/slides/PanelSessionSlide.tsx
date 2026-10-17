import { motion } from 'motion/react'
import logoUrl from '../../.brand-source/favicon.svg'
import timurUrl from '../../timur-korshlow-image.webp'
import alaaUrl from '../../alaa-khawaja-image.webp'
import mohammadUrl from '../../mohammad-khudary-image.webp'
import { AmbientScene } from '../components/AmbientScene'
import type { SlideContext } from '../types'

const panelists = [
  { name: 'Timur Korshlow', image: timurUrl },
  { name: 'Alaa Khawaja', image: alaaUrl },
  { name: 'Mohammad Khudary', image: mohammadUrl },
]

export function PanelSessionSlide({ active }: SlideContext) {
  return (
    <section className="slide panel-slide" aria-label="Session 4 panel discussion">
      <AmbientScene restrained />

      <motion.header
        className="panel-slide__header"
        initial={false}
        animate={active ? 'visible' : 'hidden'}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.18 } },
        }}
      >
        <motion.div
          className="panel-slide__eyebrow"
          variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
        >
          <span>SESSION 04</span>
          <i />
          <span>ITAIF 2026</span>
        </motion.div>
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 28, filter: 'blur(10px)' },
            visible: {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
            },
          }}
        >
          Panel <span>Discussion</span>
        </motion.h1>
        <motion.p variants={{ hidden: { opacity: 0 }, visible: { opacity: 0.55 } }}>
          THREE PERSPECTIVES · ONE CONVERSATION
        </motion.p>
      </motion.header>

      <div className="panel-slide__panelists">
        {panelists.map((panelist, index) => (
          <motion.article
            className="panel-card"
            key={panelist.name}
            initial={false}
            animate={
              active
                ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
                : { opacity: 0, y: 54, scale: 0.96, filter: 'blur(8px)' }
            }
            transition={{ duration: 0.85, delay: 0.55 + index * 0.16, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="panel-card__portrait">
              <img src={panelist.image} alt={panelist.name} draggable={false} />
              <div className="panel-card__shade" />
              <motion.div
                className="panel-card__scan"
                animate={{ y: ['-120%', '220%'] }}
                transition={{ duration: 2.2, delay: 0.9 + index * 0.18, ease: 'easeInOut' }}
              />
            </div>
            <div className="panel-card__number">0{index + 1}</div>
            <h2>{panelist.name}</h2>
            <span className="panel-card__role">PANELIST</span>
          </motion.article>
        ))}
      </div>

      <motion.div
        className="panel-slide__connector"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={active ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 1.2, delay: 1.05 }}
      >
        <i />
        <i />
        <i />
      </motion.div>

      <motion.img
        src={logoUrl}
        className="panel-slide__logo"
        alt="ITAIF"
        initial={false}
        animate={active ? { opacity: 0.78, y: 0 } : { opacity: 0, y: -16 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      />
      <div className="panel-slide__index">04</div>
    </section>
  )
}
