import { motion } from 'motion/react'

type Props = {
  image: string
  alt: string
  footer: string
  active: boolean
}

export function OriginalSlide({ image, alt, footer, active }: Props) {
  return (
    <section className="slide original-slide" aria-label={alt}>
      <motion.div
        className="original-slide__mat"
        initial={false}
        animate={
          active
            ? { opacity: 1, scale: 1, filter: 'blur(0px)' }
            : { opacity: 0, scale: 1.012, filter: 'blur(5px)' }
        }
        transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
      >
        <img className="original-slide__image" src={image} alt={alt} draggable={false} />
      </motion.div>
      <div className="original-slide__fx" aria-hidden="true">
        <motion.div
          className="original-slide__scan"
          initial={{ x: -520, opacity: 0 }}
          animate={active ? { x: 2260, opacity: [0, 0.7, 0] } : { x: -520, opacity: 0 }}
          transition={{ duration: 1.55, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          className="original-slide__edge-glow original-slide__edge-glow--cyan"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={active ? { scaleX: 1, opacity: [0, 0.75, 0.22] } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 1.25, delay: 0.08 }}
        />
        <motion.div
          className="original-slide__edge-glow original-slide__edge-glow--magenta"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={active ? { scaleY: 1, opacity: [0, 0.65, 0.18] } : { scaleY: 0, opacity: 0 }}
          transition={{ duration: 1.2, delay: 0.22 }}
        />
        <motion.i
          className="original-slide__node original-slide__node--one"
          animate={active ? { opacity: [0, 0.9, 0.28], scale: [0.5, 1.5, 1] } : { opacity: 0 }}
          transition={{ duration: 1.4, delay: 0.38 }}
        />
        <motion.i
          className="original-slide__node original-slide__node--two"
          animate={active ? { opacity: [0, 0.8, 0.2], scale: [0.5, 1.5, 1] } : { opacity: 0 }}
          transition={{ duration: 1.4, delay: 0.62 }}
        />
        <span className="original-slide__corner original-slide__corner--tl" />
        <span className="original-slide__corner original-slide__corner--br" />
      </div>
      <motion.footer
        initial={false}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ delay: 0.22, duration: 0.42 }}
      >
        <span>{footer}</span>
        <i aria-hidden="true" />
      </motion.footer>
    </section>
  )
}
