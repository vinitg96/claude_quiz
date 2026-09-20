import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DifficultySelector from '../components/DifficultySelector'
import NicknameInput from '../components/NicknameInput'
import { STORAGE_KEYS } from '../lib/constants'

function Home() {
  const navigate = useNavigate()
  const [nickname, setNickname] = useState(
    () => localStorage.getItem(STORAGE_KEYS.nickname) ?? '',
  )
  const [difficulty, setDifficulty] = useState(
    () => localStorage.getItem(STORAGE_KEYS.lastDifficulty) ?? 'iniciante',
  )
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const trimmed = nickname.trim()

    if (!trimmed) {
      setError('informe um nickname para começar')
      return
    }

    localStorage.setItem(STORAGE_KEYS.nickname, trimmed)
    localStorage.setItem(STORAGE_KEYS.lastDifficulty, difficulty)
    navigate(`/quiz?dificuldade=${difficulty}`)
  }

  return (
    <div className="flex flex-col gap-7">
      <div>
        <p className="text-sm text-mute">$ quiz --sobre</p>
        <h1 className="mt-1 text-xl font-semibold leading-snug text-paper">
          verdadeiro ou falso: claude code
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-mute">
          Teste o que você sabe sobre a CLI de IA da Anthropic. Escolha um nível e responda antes
          que o tempo acabe.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <NicknameInput
          value={nickname}
          onChange={(value) => {
            setNickname(value)
            setError('')
          }}
        />

        <DifficultySelector value={difficulty} onChange={setDifficulty} />

        {error && (
          <p role="alert" className="text-sm text-err">
            ! {error}
          </p>
        )}

        <button
          type="submit"
          className="rounded-md bg-cursor px-4 py-3 text-sm font-semibold text-ink transition-colors hover:bg-cursor/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cursor focus-visible:ring-offset-2 focus-visible:ring-offset-panel"
        >
          iniciar quiz
        </button>
      </form>
    </div>
  )
}

export default Home
