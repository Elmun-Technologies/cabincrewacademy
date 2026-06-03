import { useEffect, useState } from 'react'

export function useCountUp(target: number, duration = 900) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const elapsed = now - start
      const t = Math.min(1, elapsed / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(target * eased))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, duration])
  return value
}

export function AnimatedNumber({
  value,
  className,
  duration,
}: { value: number; className?: string; duration?: number }) {
  const display = useCountUp(value, duration)
  return <span className={className}>{display}</span>
}
