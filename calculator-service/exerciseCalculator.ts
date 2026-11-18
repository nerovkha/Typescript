interface ExerciseValues {
  target: number
  dailyExerciseHours: number[]
}

interface ExerciseResult {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const parseExerciseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) {
    throw new Error(
      'usage: npm run exercises -- target hours_mon hours_tue ... hours_sun'
    )
  }

  const target = Number(args[2])
  const dailyExerciseHours = args.slice(3).map(Number)

  if (
    Number.isNaN(target) ||
    target <= 0 ||
    dailyExerciseHours.some((hours) => Number.isNaN(hours) || hours < 0)
  ) {
    throw new Error('target must be positive and daily hours non-negative numbers')
  }

  return { target, dailyExerciseHours }
}

const calculateExercises = (
  dailyExerciseHours: number[],
  target: number
): ExerciseResult => {
  const periodLength = dailyExerciseHours.length
  const trainingDays = dailyExerciseHours.filter((hours) => hours > 0).length
  const average =
    dailyExerciseHours.reduce((sum, hours) => sum + hours, 0) / periodLength
  const success = average >= target

  const rating = average >= target ? 3 : average >= target / 2 ? 2 : 1
  const ratingDescription =
    rating === 3
      ? 'great job, target reached'
      : rating === 2
        ? 'not too bad but could be better'
        : 'far from the target, time to get moving'

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  }
}

if (require.main === module) {
  try {
    const { target, dailyExerciseHours } = parseExerciseArguments(process.argv)
    console.log(calculateExercises(dailyExerciseHours, target))
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
    process.exit(1)
  }
}

export default calculateExercises
