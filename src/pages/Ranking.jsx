import { useEffect, useState } from 'react'
import HistoryList from '../components/HistoryList'
import LeaderboardTable from '../components/LeaderboardTable'
import { LEADERBOARD_LIMIT } from '../lib/constants'
import { getLeaderboard } from '../services/gameSessionsService'

function Ranking() {
  const [status, setStatus] = useState('loading')
  const [entries, setEntries] = useState([])

  useEffect(() => {
    getLeaderboard(LEADERBOARD_LIMIT)
      .then((data) => {
        setEntries(data)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [])

  return (
    <div className="flex flex-col gap-8">
      <section>
        <p className="text-sm text-mute">$ ranking --global</p>
        <h1 className="mt-1 mb-3 text-xl font-semibold text-paper">Top {LEADERBOARD_LIMIT}</h1>
        {status === 'loading' && <p className="text-sm text-mute">Carregando ranking...</p>}
        {status === 'error' && (
          <p role="alert" className="text-sm text-err">
            Não foi possível carregar o ranking.
          </p>
        )}
        {status === 'ready' && <LeaderboardTable entries={entries} />}
      </section>

      <section>
        <p className="text-sm text-mute">$ ranking --meu-historico</p>
        <h2 className="mt-1 mb-3 text-lg font-semibold text-paper">Seu histórico</h2>
        <HistoryList />
      </section>
    </div>
  )
}

export default Ranking
