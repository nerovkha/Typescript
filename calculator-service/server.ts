import express from 'express'
import calculateBmi from './bmiCalculator'
import calculateExercises from './exerciseCalculator'

const app = express()
app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height)
  const weight = Number(req.query.weight)

  if (Number.isNaN(height) || Number.isNaN(weight) || height <= 0 || weight <= 0) {
    return res.status(400).json({ error: 'malformed parameters' })
  }

  return res.json({
    weight,
    height,
    bmi: calculateBmi(height, weight),
  })
})

app.post('/exercises', (req, res) => {
  const { daily_exercises: dailyExercises, target } = req.body ?? {}

  if (!Array.isArray(dailyExercises) || typeof target !== 'number') {
    return res.status(400).json({ error: 'parameters missing' })
  }

  const hours = dailyExercises.map(Number)
  if (
    hours.some((hours) => Number.isNaN(hours) || hours < 0) ||
    target <= 0
  ) {
    return res.status(400).json({ error: 'malformed parameters' })
  }

  return res.json(calculateExercises(hours, target))
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
