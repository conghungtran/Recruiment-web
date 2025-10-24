"use client"

import { useCounter } from "@/hooks/use-counter"

interface CounterProps {
  end: number
  start?: number
  duration?: number
  decimals?: number
  suffix?: string
  prefix?: string
  className?: string
}

export function Counter({
  end,
  start = 0,
  duration = 2000,
  decimals = 0,
  suffix = "",
  prefix = "",
  className = "",
}: CounterProps) {
  const { count, ref } = useCounter({ start, end, duration, decimals })

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count}
      {suffix}
    </span>
  )
}

