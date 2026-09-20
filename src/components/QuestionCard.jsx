const BAR_SEGMENTS = 24

function QuestionCard({ question, timeRemaining, timeTotal, hasAnswered, onAnswer }) {
  const progress = Math.max(0, Math.min(1, timeRemaining / timeTotal))
  const filled = Math.round(progress * BAR_SEGMENTS)
  const bar = '▓'.repeat(filled) + '░'.repeat(BAR_SEGMENTS - filled)
  const isUrgent = timeRemaining <= 5

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p
          aria-hidden="true"
          className={`select-none whitespace-pre text-xs leading-none tracking-tighter ${
            isUrgent ? 'text-err' : 'text-cursor'
          }`}
        >
          {bar}
        </p>
        <p aria-live="polite" className={`mt-1.5 text-sm ${isUrgent ? 'text-err' : 'text-mute'}`}>
          {timeRemaining}s restantes
        </p>
      </div>

      <p className="text-lg leading-relaxed text-paper">{question.question_text}</p>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          disabled={hasAnswered}
          onClick={() => onAnswer(true)}
          className="flex items-center justify-center gap-2 rounded-md border border-ok/60 bg-ok/10 px-4 py-3 font-semibold text-ok transition-colors hover:bg-ok/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ok disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span className="text-xs text-ok/70">[v]</span> verdadeiro
        </button>
        <button
          type="button"
          disabled={hasAnswered}
          onClick={() => onAnswer(false)}
          className="flex items-center justify-center gap-2 rounded-md border border-err/60 bg-err/10 px-4 py-3 font-semibold text-err transition-colors hover:bg-err/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-err disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span className="text-xs text-err/70">[f]</span> falso
        </button>
      </div>
    </div>
  )
}

export default QuestionCard
