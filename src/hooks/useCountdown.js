import { useEffect, useRef, useState } from 'react'

/**
 * Countdown that resets whenever `resetKey` changes, ticks once per second,
 * and calls `onExpire` a single time when it reaches zero. Pass `paused`
 * to freeze the clock (e.g. once the user has already answered).
 *
 * @param {number} seconds
 * @param {{ onExpire: () => void, resetKey: unknown, paused?: boolean }} options
 */
export function useCountdown(seconds, { onExpire, resetKey, paused = false }) {
  const [timeRemaining, setTimeRemaining] = useState(seconds)
  const [trackedResetKey, setTrackedResetKey] = useState(resetKey)

  // Reset synchronously during render when resetKey changes, per React's
  // guidance for "adjusting state when a prop changes" (avoids an extra effect/render).
  if (resetKey !== trackedResetKey) {
    setTrackedResetKey(resetKey)
    setTimeRemaining(seconds)
  }

  const onExpireRef = useRef(onExpire)
  useEffect(() => {
    onExpireRef.current = onExpire
  }, [onExpire])

  useEffect(() => {
    if (paused || timeRemaining <= 0) return undefined

    const timeoutId = setTimeout(() => {
      setTimeRemaining((current) => {
        if (current <= 1) {
          onExpireRef.current()
          return 0
        }
        return current - 1
      })
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [timeRemaining, paused])

  return timeRemaining
}
