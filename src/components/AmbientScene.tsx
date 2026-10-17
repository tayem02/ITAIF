import { motion } from 'motion/react'

const particles = Array.from({ length: 30 }, (_, index) => ({
  id: index,
  x: (index * 137 + 83) % 1920,
  y: (index * 251 + 61) % 1080,
  size: 2 + (index % 4),
  duration: 9 + (index % 7) * 1.8,
  delay: -(index % 9) * 1.1,
}))

export function AmbientScene({ restrained = false }: { restrained?: boolean }) {
  return (
    <div className={`ambient ${restrained ? 'ambient--restrained' : ''}`} aria-hidden="true">
      <motion.div
        className="ambient__orb ambient__orb--cyan"
        animate={{ x: [0, 130, -40, 0], y: [0, -70, 55, 0], scale: [1, 1.12, 0.96, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="ambient__orb ambient__orb--magenta"
        animate={{ x: [0, -110, 45, 0], y: [0, 85, -40, 0], scale: [1, 0.92, 1.1, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="ambient__grid" />
      <div className="ambient__beam" />
      <svg className="ambient__network" viewBox="0 0 1920 1080" preserveAspectRatio="none">
        <motion.path
          d="M-40 770 C 260 550, 420 870, 720 640 S 1130 370, 1480 600 S 1810 820, 1990 600"
          fill="none"
          stroke="url(#networkGradient)"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0.1, 0.55, 0.18] }}
          transition={{ pathLength: { duration: 3 }, opacity: { duration: 8, repeat: Infinity } }}
        />
        <defs>
          <linearGradient id="networkGradient">
            <stop stopColor="#5fecff" stopOpacity="0" />
            <stop offset=".45" stopColor="#5fecff" />
            <stop offset="1" stopColor="#b500da" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      {!restrained &&
        particles.map((particle) => (
          <motion.i
            className="ambient__particle"
            key={particle.id}
            style={{ left: particle.x, top: particle.y, width: particle.size, height: particle.size }}
            animate={{ y: [0, -42, 0], opacity: [0.12, 0.8, 0.12] }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
    </div>
  )
}
