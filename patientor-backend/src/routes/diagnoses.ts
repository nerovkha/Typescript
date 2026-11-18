import express, { type Request, type Response } from 'express'
import diagnosesData from '../data/diagnoses.json'
import { type Diagnosis } from '../types'

const diagnoses: Diagnosis[] = diagnosesData as Diagnosis[]

const router = express.Router()

router.get('/', (_req: Request, res: Response<Diagnosis[]>) => {
  res.json(diagnoses)
})

export default router
