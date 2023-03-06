import { useEffect, useState } from 'react'
import TitlePage from '../components/TitlePage'

interface Figure {
  id: number
  name: string
}

type Form = HTMLFormElement & {
  rickandmorty_input: HTMLInputElement
}

const Rickandmorty = () => {
  const [rickandmorty, setRickandmorty] = useState<Figure>()
  const [win, setWin] = useState(false)

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then((res) => res.json())
      .then((res) =>
        setRickandmorty(res.results[Math.round(Math.random() * 20 + 1)])
      )
      .catch((e) => console.log(e))
  }, [win])

  if (!rickandmorty)
    return <div style={{ textAlign: 'center' }}>Loading...</div>

  function handleSubmit(e: React.FormEvent<Form>) {
    e.preventDefault()
    const { rickandmorty_input } = e.currentTarget
    if (
      rickandmorty_input.value.toLowerCase() ===
      rickandmorty?.name.toLowerCase()
    ) {
      setWin(true)
    }
  }

  const Complete = () => {
    return (
      <div className='fadeIn' style={{ textAlign: 'center' }}>
        <h1
          style={{
            fontSize: '48px',
          }}
        >
          You Win!
        </h1>
        <button
          onClick={() => {
            setWin(false)
          }}
        >
          Try Again
        </button>
      </div>
    )
  }

  const Incomplete = () => {
    return (
      <div className='fadeIn'>
        <TitlePage title='¿Who is the character?' />
        <img
          style={{
            display: 'block',
            margin: 'auto',
            borderRadius: '10px',
          }}
          src={`https://rickandmortyapi.com/api/character/avatar/${rickandmorty.id}.jpeg`}
        />
        <h1
          style={{
            textAlign: 'center',
            filter: 'blur(5px)',
            marginTop: '30px',
            userSelect: 'none',
          }}
        >
          {rickandmorty.name}
        </h1>
        <form onSubmit={handleSubmit}>
          <input type='text' name='rickandmorty_input' />
          <button type='submit'>Submit</button>
        </form>
        <p style={{ textAlign: 'center' }}>* Type the correct name</p>
      </div>
    )
  }

  return <>{win ? <Complete /> : <Incomplete />}</>
}

export default Rickandmorty
