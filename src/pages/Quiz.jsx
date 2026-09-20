import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import FeedbackPanel from '../components/FeedbackPanel'
import QuestionCard from '../components/QuestionCard'
import { useCountdown } from '../hooks/useCountdown'
import { DIFFICULTIES, QUESTION_TIME_SECONDS, STORAGE_KEYS } from '../lib/constants'
import { calculateQuestionScore } from '../lib/scoring'
import { insertGameSession } from '../services/gameSessionsService'
import { getQuestionsForRound } from '../services/questionsService'

const VALID_DIFFICULTIES = [...DIFFICULTIES, 'misto']

function Quiz() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const difficulty = searchParams.get('dificuldade')
  const nickname = localStorage.getItem(STORAGE_KEYS.nickname)

  const [questions, setQuestions] = useState([])
  const [status, setStatus] = useState('loading') // loading | ready | error | submitting
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [lastResult, setLastResult] = useState(null)
  const [score, setScore] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [quizStartedAt] = useState(() => Date.now())
  const isSubmittingRef = useRef(false)

  const validParams = Boolean(nickname) && VALID_DIFFICULTIES.includes(difficulty)

  useEffect(() => {
    if (!validParams) {
      navigate('/', { replace: true })
      return
    }

    let cancelled = false

    getQuestionsForRound(difficulty)
      .then((data) => {
        if (cancelled) return
        setQuestions(data)
        setStatus('ready')
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const currentQuestion = questions[currentIndex]

  const timeRemaining = useCountdown(QUESTION_TIME_SECONDS, {
    resetKey: currentQuestion?.id,
    paused: answered || status !== 'ready',
    onExpire: () => submitAnswer(null),
  })

  function submitAnswer(userAnswer) {
    if (answered || !currentQuestion) return

    const isCorrect = userAnswer !== null && userAnswer === currentQuestion.correct_answer
    const { total } = calculateQuestionScore({
      isCorrect,
      timeRemaining,
      timeTotal: QUESTION_TIME_SECONDS,
    })

    setAnswered(true)
    setLastResult({
      isCorrect,
      pointsEarned: total,
      correctAnswer: currentQuestion.correct_answer,
      explanation: currentQuestion.explanation,
    })
    setScore((current) => current + total)
    if (isCorrect) setCorrectCount((current) => current + 1)
  }

  async function handleNext() {
    const isLast = currentIndex === questions.length - 1

    if (!isLast) {
      setCurrentIndex((index) => index + 1)
      setAnswered(false)
      setLastResult(null)
      return
    }

    if (isSubmittingRef.current) return
    isSubmittingRef.current = true
    setStatus('submitting')
    const durationSeconds = Math.round((Date.now() - quizStartedAt) / 1000)

    try {
      await insertGameSession({
        nickname,
        difficulty,
        score,
        correctCount,
        totalQuestions: questions.length,
        durationSeconds,
      })
    } catch {
      // Falha ao salvar não deve travar o usuário na tela de resultado.
    }

    navigate('/resultado', {
      state: {
        nickname,
        difficulty,
        score,
        correctCount,
        totalQuestions: questions.length,
        durationSeconds,
      },
    })
  }

  if (!validParams) return null

  if (status === 'loading') {
    return <p className="text-mute">Carregando perguntas...</p>
  }

  if (status === 'error') {
    return (
      <p role="alert" className="text-err">
        Não foi possível carregar as perguntas. Verifique sua conexão e tente novamente.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-mute">
          pergunta {currentIndex + 1}/{questions.length}
        </span>
        <span className="text-cursor">{score} pontos</span>
      </div>

      <QuestionCard
        question={currentQuestion}
        timeRemaining={timeRemaining}
        timeTotal={QUESTION_TIME_SECONDS}
        hasAnswered={answered}
        onAnswer={submitAnswer}
      />

      {answered && lastResult && (
        <FeedbackPanel
          isCorrect={lastResult.isCorrect}
          correctAnswer={lastResult.correctAnswer}
          explanation={lastResult.explanation}
          pointsEarned={lastResult.pointsEarned}
          isLast={currentIndex === questions.length - 1}
          onNext={handleNext}
        />
      )}
    </div>
  )
}

export default Quiz
