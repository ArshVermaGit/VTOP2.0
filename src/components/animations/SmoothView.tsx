"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface SmoothViewProps {
  children: ReactNode
  delay?: number
  className?: string
  direction?: "up" | "down" | "left" | "right" | "none"
}

export function SmoothView({ 
  children, 
  delay = 0, 
  className = "",
  direction = "up" 
}: SmoothViewProps) {
  const getInitial = () => {
    switch (direction) {
      case "up": return { opacity: 0, y: 20 }
      case "down": return { opacity: 0, y: -20 }
      case "left": return { opacity: 0, x: 20 }
      case "right": return { opacity: 0, x: -20 }
      case "none": return { opacity: 0 }
      default: return { opacity: 0, y: 20 }
    }
  }

  return (
    <motion.div
      initial={getInitial()}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{
        duration: 0.5,
        delay: delay,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function SmoothContainer({ children, className = "" }: { children: ReactNode, className?: string }) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.05
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
