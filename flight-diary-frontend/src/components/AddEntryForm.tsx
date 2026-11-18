import { useState } from 'react'
import axios from 'axios'
import { type NewDiaryEntry } from '../types'
import diaryService from '../services/diaries'

const WEATHER_OPTIONS = ['sunny', 'rainy', 'cloudy', 'stormy', 'windy'] as const
const VISIBILITY_OPTIONS = ['great', 'good', 'ok', 'poor'] as const

interface Props {
  onAdded: () => void
}

const AddEntryForm = ({ onAdded }: Props) => {
  const [date, setDate] = useState('')
  const [weather, setWeather] = useState<(typeof WEATHER_OPTIONS)[number]>('sunny')
  const [visibility, setVisibility] = useState<
    (typeof VISIBILITY_OPTIONS)[number]
  >('good')
  const [comment, setComment] = useState('')
  const [error, setError] = useState<string | null>(null)

  const submit = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    const newEntry: NewDiaryEntry = { date, weather, visibility, comment }

    try {
      await diaryService.create(newEntry)
      setDate('')
      setComment('')
      setError(null)
      onAdded()
    } catch (e) {
      if (axios.isAxiosError(e)) {
        setError(
          typeof e.response?.data === 'string'
            ? e.response.data
            : e.response?.data?.error ?? 'adding the entry failed'
        )
      } else if (e instanceof Error) {
        setError(e.message)
      } else {
        setError('unknown error')
      }
    }
  }

  return (
    <div>
      <h2>add new entry</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={submit}>
        <div>
          date{' '}
          <input
            type="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <fieldset>
          <legend>weather</legend>
          {WEATHER_OPTIONS.map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="weather"
                value={option}
                checked={weather === option}
                onChange={() => setWeather(option)}
              />
              {option}
            </label>
          ))}
        </fieldset>
        <fieldset>
          <legend>visibility</legend>
          {VISIBILITY_OPTIONS.map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="visibility"
                value={option}
                checked={visibility === option}
                onChange={() => setVisibility(option)}
              />
              {option}
            </label>
          ))}
        </fieldset>
        <div>
          comment{' '}
          <input
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default AddEntryForm
