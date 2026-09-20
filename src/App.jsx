import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Quiz from './pages/Quiz'
import Ranking from './pages/Ranking'
import Resultado from './pages/Resultado'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/resultado" element={<Resultado />} />
        <Route path="/ranking" element={<Ranking />} />
      </Route>
    </Routes>
  )
}

export default App
