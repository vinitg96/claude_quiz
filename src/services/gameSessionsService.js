import { supabase } from '../lib/supabaseClient'

/**
 * @param {{ nickname: string, difficulty: string, score: number, correctCount: number, totalQuestions: number, durationSeconds: number }} session
 */
export async function insertGameSession({
  nickname,
  difficulty,
  score,
  correctCount,
  totalQuestions,
  durationSeconds,
}) {
  const { data, error } = await supabase
    .from('game_sessions')
    .insert({
      nickname,
      difficulty,
      score,
      correct_count: correctCount,
      total_questions: totalQuestions,
      duration_seconds: durationSeconds,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getLeaderboard(limit) {
  const { data, error } = await supabase
    .from('game_sessions')
    .select('*')
    .order('score', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data
}

export async function getHistoryByNickname(nickname, limit) {
  const { data, error } = await supabase
    .from('game_sessions')
    .select('*')
    .eq('nickname', nickname)
    .order('played_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data
}
