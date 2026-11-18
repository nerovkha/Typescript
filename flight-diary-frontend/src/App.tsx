import { useEffect, useState } from 'react'
import { type DiaryEntry } from './types'
import diaryService from './services/diaries'
import DiaryList from './components/DiaryList'
import AddEntryForm from './components/AddEntryForm'

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])

  useEffect(() => {
    diaryService.getAll().then(setDiaries)
  }, [])

  return (
    <div>
      <h1>Ilari's flight diaries</h1>
      <AddEntryForm onAdded={() => diaryService.getAll().then(setDiaries)} />
      <DiaryList diaries={diaries} />
    </div>
  )
}

export default App
