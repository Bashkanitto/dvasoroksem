// components/animations/ScrollAnimationSection.tsx
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, ReactNode, CSSProperties } from 'react'

interface ScrollAnimationSectionProps {
  children?: ReactNode
  delay?: number
  className?: string
  style?: CSSProperties
  once?: boolean
}

const AnimationSection: React.FC<ScrollAnimationSectionProps> = ({
  children,
  delay = 0,
  className = '',
  once = true,
  style,
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: '-100px' })

  return (
    <motion.div
      style={style}
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 75 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 75 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export default AnimationSection
