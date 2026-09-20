const BASE_POINTS = 100
const MAX_SPEED_BONUS = 50

/**
 * @param {{ isCorrect: boolean, timeRemaining: number, timeTotal: number }} params
 * @returns {{ base: number, bonus: number, total: number }}
 */
export function calculateQuestionScore({ isCorrect, timeRemaining, timeTotal }) {
  if (!isCorrect) {
    return { base: 0, bonus: 0, total: 0 }
  }

  const base = BASE_POINTS
  const bonus = Math.round(MAX_SPEED_BONUS * (timeRemaining / timeTotal))

  return { base, bonus, total: base + bonus }
}
