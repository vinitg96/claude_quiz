import { useEffect, useState } from 'react'
import { DIFFICULTY_LABELS, HISTORY_LIMIT, STORAGE_KEYS } from '../lib/constants'
import { getHistoryByNickname } from '../services/gameSessionsService'

function formatDate(playedAt) {
  return new Date(playedAt).toLocaleString('pt-BR')
}

// Histórico correlacionado apenas pelo nickname salvo no localStorage — não é uma
// identidade real. Dois jogadores com o mesmo nickname veriam o mesmo histórico;
// limitação conhecida do MVP (mesmo motivo pelo qual o ranking é "spoofável").
function HistoryList() {
  const nickname = localStorage.getItem(STORAGE_KEYS.nickname)
  const [status, setStatus] = useState('loading')
  const [entries, setEntries] = useState([])

  useEffect(() => {
    if (!nickname) {
      setStatus('no-nickname')
      return
    }

    getHistoryByNickname(nickname, HISTORY_LIMIT)
      .then((data) => {
        setEntries(data)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [nickname])

  if (status === 'no-nickname') {
    return <p className="text-sm text-mute">Jogue uma partida para ver seu histórico aqui.</p>
  }

  if (status === 'loading') {
    return <p className="text-sm text-mute">Carregando histórico...</p>
  }

  if (status === 'error') {
    return (
      <p role="alert" className="text-sm text-err">
        Não foi possível carregar seu histórico.
      </p>
    )
  }

  if (entries.length === 0) {
    return <p className="text-sm text-mute">Você ainda não tem partidas registradas.</p>
  }

  return (
    <ul className="flex flex-col gap-2">
      {entries.map((entry) => (
        <li
          key={entry.id}
          className="flex items-center justify-between rounded-md border border-line px-3 py-2 text-sm"
        >
          <span className="text-mute">{formatDate(entry.played_at)}</span>
          <span className="text-mute">{DIFFICULTY_LABELS[entry.difficulty]?.toLowerCase() ?? entry.difficulty}</span>
          <span className="font-semibold text-cursor">{entry.score} pts</span>
        </li>
      ))}
    </ul>
  )
}

export default HistoryList
