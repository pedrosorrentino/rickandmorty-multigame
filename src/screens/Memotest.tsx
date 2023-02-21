import { useState, useEffect, useMemo, useCallback } from 'react'
import TitlePage from '../components/TitlePage'

function generateRandomImages(count: number) {
  const images = []
  while (images.length < count) {
    const id = Math.floor(Math.random() * 250) + 1
    const url = `https://rickandmortyapi.com/api/character/avatar/${id}.jpeg`
    images.push(url)
  }
  return images
}

const IMAGES = generateRandomImages(10)
  .flatMap((url) => [`a|${url}`, `b|${url}`])
  .sort(() => Math.random() - 0.5)

const Memotest = () => {
  const [complete, setComplete] = useState<string[]>([])
  const [selected, setSelected] = useState<string[]>([])
  const [time, setTime] = useState<number>(0)

  const handleImageClick = useCallback(
    (image: string) => {
      if (selected.length < 2) {
        setSelected((selected) => [...selected, image])
      }
    },
    [selected]
  )

  const formatTime = useMemo(
    () =>
      (time: number): string => {
        const minutes = Math.floor(time / 60)
        const seconds = time % 60

        const formattedMinutes = String(minutes).padStart(2, '0')
        const formattedSeconds = String(seconds).padStart(2, '0')

        return `${formattedMinutes}m:${formattedSeconds}s`
      },
    []
  )

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
        <p
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            fontSize: '20px',
          }}
        >
          <img src='https://icongr.am/jam/clock.svg?size=28&color=ffffff' />
          It took you{' '}
          <span style={{ fontWeight: 'bold' }}>{formatTime(time)}</span> to
          solve it.
        </p>
        <button
          onClick={() => {
            setComplete([])
            setTime(0)
          }}
        >
          Try Again
        </button>
      </div>
    )
  }

  useEffect(() => {
    IMAGES.forEach((url) => {
      const img = new Image()
      img.src = url.split('|')[1]
      img.onload = () => console.log(`Image ${img.src} preloaded.`)
    })
  }, [])

  useEffect(() => {
    let interval: number
    if (complete.length !== IMAGES.length) {
      interval = setInterval(() => {
        setTime((time) => time + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [complete])

  useEffect(() => {
    if (selected.length === 2) {
      const [id1, url1, i1] = selected[0].split('|')
      const [id2, url2, i2] = selected[1].split('|')
      if (url1 === url2) {
        setComplete((complete) => [...complete, selected[0], selected[1]])
      }

      setTimeout(() => setSelected([]), 1500)
    }
  }, [selected])

  if (complete.length === IMAGES.length) {
    return <Complete />
  }

  return (
    <>
      <TitlePage title='Rick and Morty Memotest' />
      <ul className='fadeIn ul__memotest'>
        {IMAGES.map((image, i) => {
          const [, url, id] = image.split('|')
          const isSelected = selected.includes(image)
          const isComplete = complete.includes(image)
          const key = `${url}-${i}`
          return (
            <li key={key} onClick={() => handleImageClick(image)}>
              <img
                className='image__memotest'
                src={
                  isSelected || isComplete
                    ? url
                    : 'https://icongr.am/jam/help.svg?size=128&color=898989'
                }
              />
            </li>
          )
        })}
      </ul>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '25px',
          color: '#666666',
        }}
      >
        Your time {formatTime(time)}
      </div>
    </>
  )
}

export default Memotest
