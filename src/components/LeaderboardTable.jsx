import { DIFFICULTY_LABELS } from '../lib/constants'

function formatDate(playedAt) {
  return new Date(playedAt).toLocaleDateString('pt-BR')
}

function LeaderboardTable({ entries }) {
  if (entries.length === 0) {
    return <p className="text-sm text-mute">Ainda não há resultados no ranking.</p>
  }

  return (
    <div className="overflow-x-auto rounded-md border border-line">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-line text-mute">
          <tr>
            <th scope="col" className="px-3 py-2 font-normal">
              #
            </th>
            <th scope="col" className="px-3 py-2 font-normal">
              nickname
            </th>
            <th scope="col" className="px-3 py-2 font-normal">
              pontos
            </th>
            <th scope="col" className="px-3 py-2 font-normal">
              nível
            </th>
            <th scope="col" className="px-3 py-2 font-normal">
              data
            </th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={entry.id} className="border-t border-line">
              <td className="px-3 py-2 text-mute">{String(index + 1).padStart(2, '0')}</td>
              <td className="px-3 py-2 text-paper">{entry.nickname}</td>
              <td className="px-3 py-2 font-semibold text-cursor">{entry.score}</td>
              <td className="px-3 py-2 text-mute">
                {DIFFICULTY_LABELS[entry.difficulty]?.toLowerCase() ?? entry.difficulty}
              </td>
              <td className="px-3 py-2 text-mute">{formatDate(entry.played_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LeaderboardTable
