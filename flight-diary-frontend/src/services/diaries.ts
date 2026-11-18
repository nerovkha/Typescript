import axios from 'axios'
import { type DiaryEntry, type NewDiaryEntry } from '../types'

const client = axios.create({ baseURL: 'http://localhost:3000/api' })

const getAll = async (): Promise<DiaryEntry[]> => {
  const response = await client.get<DiaryEntry[]>('/diaries')
  return response.data
}

const create = async (entry: NewDiaryEntry): Promise<DiaryEntry> => {
  const response = await client.post<DiaryEntry>('/diaries', entry)
  return response.data
}

export default { getAll, create }
