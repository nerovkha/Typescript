interface BmiValues {
  height: number
  weight: number
}

const parseBmiArguments = (args: string[]): BmiValues => {
  if (args.length !== 4) {
    throw new Error('usage: npm run bmi -- height(cm) weight(kg)')
  }

  const height = Number(args[2])
  const weight = Number(args[3])

  if (Number.isNaN(height) || Number.isNaN(weight) || height <= 0 || weight <= 0) {
    throw new Error('height and weight must be positive numbers')
  }

  return { height, weight }
}

const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2

  if (bmi < 16) return 'Underweight (Severe thinness)'
  if (bmi < 17) return 'Underweight (Moderate thinness)'
  if (bmi < 18.5) return 'Underweight (Mild thinness)'
  if (bmi < 25) return 'Normal range'
  if (bmi < 30) return 'Overweight (Pre-obese)'
  if (bmi < 35) return 'Obese (Class I)'
  if (bmi < 40) return 'Obese (Class II)'
  return 'Obese (Class III)'
}

if (require.main === module) {
  try {
    const { height, weight } = parseBmiArguments(process.argv)
    console.log(calculateBmi(height, weight))
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
    process.exit(1)
  }
}

export default calculateBmi
