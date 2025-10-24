"use client"

import { useEffect, useRef, useState } from "react"

interface UseCounterOptions {
  start?: number
  end: number
  duration?: number
  decimals?: number
}

export function useCounter({
  start = 0,
  end,
  duration = 2000,
  decimals = 0,
}: UseCounterOptions) {
  const [count, setCount] = useState(start)
  const [isInView, setIsInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true)
        }
      },
      { threshold: 0.1 }
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [isInView])

  useEffect(() => {
    if (!isInView) return

    const startTime = Date.now()
    const startValue = start
    const endValue = end
    const difference = endValue - startValue

    const animate = () => {
      const currentTime = Date.now()
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = startValue + difference * easeOutQuart

      setCount(Number(currentCount.toFixed(decimals)))

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(endValue)
      }
    }

    animate()
  }, [isInView, start, end, duration, decimals])

  return { count, ref }
}

