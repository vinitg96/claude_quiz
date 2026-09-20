function FeedbackPanel({ isCorrect, correctAnswer, explanation, pointsEarned, onNext, isLast }) {
  return (
    <div
      aria-live="polite"
      className={`flex flex-col gap-3 rounded-md border px-4 py-4 ${
        isCorrect ? 'border-ok/50 bg-ok/5' : 'border-err/50 bg-err/5'
      }`}
    >
      <p className={`text-sm font-semibold ${isCorrect ? 'text-ok' : 'text-err'}`}>
        {isCorrect ? '✓ correto.' : '✗ incorreto.'}
      </p>
      <p className="text-sm text-mute">Resposta certa: {correctAnswer ? 'verdadeiro' : 'falso'}.</p>
      <p className="text-sm leading-relaxed text-mute">{explanation}</p>
      <p className="text-sm text-paper">
        <span className="text-cursor">+{pointsEarned}</span> pontos
      </p>

      <button
        type="button"
        onClick={onNext}
        className="mt-1 self-start rounded-md bg-cursor px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-cursor/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cursor focus-visible:ring-offset-2 focus-visible:ring-offset-panel"
      >
        {isLast ? 'ver resultado' : 'próxima pergunta'}
      </button>
    </div>
  )
}

export default FeedbackPanel
