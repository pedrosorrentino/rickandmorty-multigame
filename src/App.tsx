import { Route, Routes } from 'react-router-dom'
import Memotest from './screens/Memotest'
import Rickandmorty from './screens/Rickandmorty'
import WordsPerMinute from './screens/WordsPerMinute'

function App() {
  return (
    <Routes>
      <Route path='/memotest' element={<Memotest />} />
      <Route path='/rickandmorty' element={<Rickandmorty />} />
      <Route path='/wpm' element={<WordsPerMinute />} />
    </Routes>
  )
}

export default App
