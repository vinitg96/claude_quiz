import { DIFFICULTY_LABELS } from '../lib/constants'

function ScoreSummary({ score, correctCount, totalQuestions, durationSeconds, difficulty }) {
  const incorrectCount = totalQuestions - correctCount

  return (
    <div className="flex flex-col gap-5 rounded-md border border-line bg-ink px-5 py-6">
      <p className="text-4xl font-bold text-cursor">
        {score} <span className="text-base font-normal text-mute">pontos</span>
      </p>

      <dl className="grid grid-cols-2 gap-x-4 gap-y-4 text-sm">
        <div>
          <dt className="text-mute">acertos</dt>
          <dd className="mt-0.5 text-lg font-semibold text-ok">{correctCount}</dd>
        </div>
        <div>
          <dt className="text-mute">erros</dt>
          <dd className="mt-0.5 text-lg font-semibold text-err">{incorrectCount}</dd>
        </div>
        <div>
          <dt className="text-mute">tempo total</dt>
          <dd className="mt-0.5 text-lg font-semibold text-paper">{durationSeconds}s</dd>
        </div>
        <div>
          <dt className="text-mute">dificuldade</dt>
          <dd className="mt-0.5 text-lg font-semibold text-paper">
            {DIFFICULTY_LABELS[difficulty]?.toLowerCase() ?? difficulty}
          </dd>
        </div>
      </dl>
    </div>
  )
}

export default ScoreSummary
