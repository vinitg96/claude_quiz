import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ScoreSummary from '../components/ScoreSummary'

function Resultado() {
  const navigate = useNavigate()
  const location = useLocation()
  const result = location.state

  useEffect(() => {
    if (!result) navigate('/', { replace: true })
  }, [result, navigate])

  if (!result) return null

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm text-mute">$ quiz --resultado</p>
        <h1 className="mt-1 text-xl font-semibold text-paper">Parabéns, {result.nickname}.</h1>
        <p className="mt-1 text-sm text-mute">Você completou o quiz. Confira seu desempenho abaixo.</p>
      </div>

      <ScoreSummary
        score={result.score}
        correctCount={result.correctCount}
        totalQuestions={result.totalQuestions}
        durationSeconds={result.durationSeconds}
        difficulty={result.difficulty}
      />

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="flex-1 rounded-md bg-cursor px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-cursor/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cursor focus-visible:ring-offset-2 focus-visible:ring-offset-panel"
        >
          jogar novamente
        </button>
        <button
          type="button"
          onClick={() => navigate('/ranking')}
          className="flex-1 rounded-md border border-line px-4 py-2.5 text-sm font-semibold text-mute transition-colors hover:border-mute hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cursor focus-visible:ring-offset-2 focus-visible:ring-offset-panel"
        >
          ver ranking
        </button>
      </div>
    </div>
  )
}

export default Resultado
