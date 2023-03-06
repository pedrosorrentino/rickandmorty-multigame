import { Route, Routes, Link } from 'react-router-dom'
import Memotest from './screens/Memotest'
import Rickandmorty from './screens/Rickandmorty'
import WordsPerMinute from './screens/WordsPerMinute'

function App() {
  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Choose your game</h1>
      <ul
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '50px',
        }}
      >
        <li className='li_button'>
          <Link
            style={{ textDecoration: 'none', color: '#000000' }}
            to='/memotest'
          >
            Memotest
          </Link>
        </li>
        <li className='li_button'>
          <Link
            style={{ textDecoration: 'none', color: '#000000' }}
            to='/rickandmorty'
          >
            ¿Who is?
          </Link>
        </li>
        <li className='li_button'>
          <Link style={{ textDecoration: 'none', color: '#000000' }} to='/wpm'>
            Words per Minutes
          </Link>
        </li>
      </ul>
      <Routes>
        <Route path='/memotest' element={<Memotest />} />
        <Route path='/rickandmorty' element={<Rickandmorty />} />
        <Route path='/wpm' element={<WordsPerMinute />} />
      </Routes>
    </>
  )
}

export default App
