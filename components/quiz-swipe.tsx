"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"

interface QuizSwipeProps {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  children: React.ReactNode
}

export function QuizSwipe({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  children,
}: QuizSwipeProps) {
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const touchEnd = useRef<{ x: number; y: number } | null>(null)
  const [isSwiping, setIsSwiping] = useState(false)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    }
    setIsSwiping(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping) return
    touchEnd.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    }
  }

  const handleTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return

    const deltaX = touchEnd.current.x - touchStart.current.x
    const deltaY = touchEnd.current.y - touchStart.current.y

    // Minimum swipe distance (in pixels)
    const minSwipeDistance = 50

    // Determine swipe direction
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX > 0 && onSwipeRight) {
          onSwipeRight()
        } else if (deltaX < 0 && onSwipeLeft) {
          onSwipeLeft()
        }
      }
    } else {
      if (Math.abs(deltaY) > minSwipeDistance) {
        if (deltaY > 0 && onSwipeDown) {
          onSwipeDown()
        } else if (deltaY < 0 && onSwipeUp) {
          onSwipeUp()
        }
      }
    }

    // Reset touch points
    touchStart.current = null
    touchEnd.current = null
    setIsSwiping(false)
  }

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="touch-manipulation"
    >
      {children}
    </div>
  )
} 