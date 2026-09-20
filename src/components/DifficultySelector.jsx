import { DIFFICULTY_LABELS } from '../lib/constants'

const OPTIONS = ['iniciante', 'intermediario', 'avancado', 'misto']

function DifficultySelector({ value, onChange }) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm text-mute">$ nivel --escolher</legend>
      <div className="grid grid-cols-2 gap-2">
        {OPTIONS.map((option) => {
          const isSelected = value === option
          return (
            <button
              key={option}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onChange(option)}
              className={`rounded-md border px-3 py-2.5 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cursor ${
                isSelected
                  ? 'border-cursor bg-cursor/10 text-cursor'
                  : 'border-line text-mute hover:border-mute hover:text-paper'
              }`}
            >
              <span className="text-line">{isSelected ? '[x]' : '[ ]'}</span>{' '}
              {DIFFICULTY_LABELS[option].toLowerCase()}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

export default DifficultySelector
