import { DIFFICULTIES, MISTO_PER_LEVEL } from '../lib/constants'
import { supabase } from '../lib/supabaseClient'
import { shuffle } from '../lib/shuffle'

/**
 * @param {'iniciante'|'intermediario'|'avancado'|'misto'} difficulty
 * @returns {Promise<Array>} questions for the round, already shuffled
 */
export async function getQuestionsForRound(difficulty) {
  if (difficulty === 'misto') {
    const { data, error } = await supabase.from('questions').select('*')
    if (error) throw error

    const byDifficulty = DIFFICULTIES.map((level) =>
      shuffle(data.filter((question) => question.difficulty === level)).slice(
        0,
        MISTO_PER_LEVEL,
      ),
    )

    return shuffle(byDifficulty.flat())
  }

  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .eq('difficulty', difficulty)

  if (error) throw error

  return shuffle(data)
}
