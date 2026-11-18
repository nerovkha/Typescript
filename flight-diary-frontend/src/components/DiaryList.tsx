import { type DiaryEntry } from '../types'

const DiaryList = ({ diaries }: { diaries: DiaryEntry[] }) => (
  <div>
    <h2>diary entries</h2>
    {diaries.map((diary) => (
      <div key={diary.id}>
        <h3>{diary.date}</h3>
        <p>
          weather: {diary.weather}
          <br />
          visibility: {diary.visibility}
        </p>
      </div>
    ))}
  </div>
)

export default DiaryList
