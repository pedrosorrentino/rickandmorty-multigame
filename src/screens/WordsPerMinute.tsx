import { useState, useEffect } from 'react'
import TitlePage from '../components/TitlePage'

const WORDS = [
  'Earth',
  'Abadango',
  'Citadel of Ricks',
  'Worldender lair',
  'Anatomy Park',
  'Interdimensional Cable',
  'Immortality Field Resort',
  'Apocalyptic Earth',
  'Purge Planet',
  'Venzenulon 7',
  'Bepis 9',
  'Cronenberg Earth',
  'Nuptia 4',
  'Giant Town',
  'Bird World',
  'Gloopy Noops Hospital',
  'Goldenfold dream',
  'Gromflom Prime',
]

const WordsPerMinute = () => {
  const [word, setWord] = useState(
    () => WORDS[(Math.random() * WORDS.length) | 0]
  )
  const [characterCount, setCharacterCount] = useState(0)
  const [buffer, setBuffer] = useState('')
  const [time, setTime] = useState(0)

  const totalTime = 60

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (buffer === word) {
      setWord(WORDS[(Math.random() * WORDS.length) | 0])
      setCharacterCount((characterCount) => characterCount + word.length)
    }
    setBuffer('')
  }

  useEffect(() => {
    if (time !== 0) {
      const timeout = setTimeout(() => setTime(time - 1), 1000)
      return () => clearTimeout(timeout)
    }
  }, [time])

  if (time === 0) {
    return (
      <div style={{ textAlign: 'center' }}>
        <TitlePage title='Words per Minute' />
        {characterCount !== 0 && (
          <>
            <p>
              You have typed {characterCount} characters in {totalTime} seconds,
            </p>
            <p>please retry to improve your score.</p>
          </>
        )}
        <button onClick={() => setTime(totalTime)}>Start Game</button>
      </div>
    )
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <TitlePage title='Words per Minute' />
      <h2>{word}</h2>
      <p>Characters typed: {characterCount}</p>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          autoFocus
          value={buffer}
          onChange={(e) => setBuffer(e.target.value)}
        />
        <button type='submit'>Submit</button>
      </form>
      <p>Remaining time: {time}</p>
    </div>
  )
}

export default WordsPerMinute
