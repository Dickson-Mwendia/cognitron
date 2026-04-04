'use client'

import { useState, useEffect, useRef } from 'react'
import { Confetti } from './Confetti'

interface XPCelebrationProps {
  currentXP: number
  milestoneInterval?: number
}

function isNearMilestone(xp: number, interval: number): boolean {
  const milestone = Math.floor(xp / interval) * interval
  return milestone > 0 && xp - milestone < 50
}

export function XPCelebration({ currentXP, milestoneInterval = 1000 }: XPCelebrationProps) {
  const near = isNearMilestone(currentXP, milestoneInterval)
  const [showConfetti, setShowConfetti] = useState(near)
  const prevXP = useRef(currentXP)

  // Auto-dismiss after 3.5s
  useEffect(() => {
    if (!showConfetti) return
    const timer = setTimeout(() => setShowConfetti(false), 3500)
    return () => clearTimeout(timer)
  }, [showConfetti])

  // Re-trigger if XP changes and crosses a new milestone
  useEffect(() => {
    if (currentXP !== prevXP.current && isNearMilestone(currentXP, milestoneInterval)) {
      const id = requestAnimationFrame(() => setShowConfetti(true))
      prevXP.current = currentXP
      return () => cancelAnimationFrame(id)
    }
    prevXP.current = currentXP
  }, [currentXP, milestoneInterval])

  return (
    <>
      <Confetti trigger={showConfetti} />
      {showConfetti && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[101] animate-bounce">
          <div className="bg-gold text-navy px-6 py-3 rounded-full shadow-lg font-heading font-bold text-lg">
            🎉 XP Milestone Reached!
          </div>
        </div>
      )}
    </>
  )
}
