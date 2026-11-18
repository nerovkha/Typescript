import express, { type Request, type Response } from 'express'
import { v1 as uuid } from 'uuid'
import patientsData from '../data/patients.json'
import { type Patient, type PublicPatient, type Entry } from '../types'
import { newEntrySchema, newPatientSchema } from '../utils/validation'

const patients: Patient[] = (patientsData as Patient[]).map((patient) => ({
  ...patient,
  entries: patient.entries ?? [],
}))

const toPublicPatient = ({ ssn: _ssn, ...rest }: Patient): PublicPatient => rest

const router = express.Router()

router.get('/', (_req: Request, res: Response<PublicPatient[]>) => {
  res.json(patients.map(toPublicPatient))
})

router.get('/:id', (req: Request, res: Response) => {
  const patient = patients.find((p) => p.id === req.params.id)
  if (!patient) {
    return res.status(404).json({ error: 'patient not found' })
  }
  return res.json(patient)
})

router.post('/', (req: Request, res: Response) => {
  const parsed = newPatientSchema.safeParse(req.body)
  if (!parsed.success) {
    return res
      .status(400)
      .json({ error: parsed.error.issues.map((i) => i.message).join('; ') })
  }

  const newPatient = { id: uuid(), entries: [], ...parsed.data }
  patients.push(newPatient)
  return res.status(201).json(toPublicPatient(newPatient))
})

router.post('/:id/entries', (req: Request, res: Response) => {
  const patient = patients.find((p) => p.id === req.params.id)
  if (!patient) {
    return res.status(404).json({ error: 'patient not found' })
  }

  const parsed = newEntrySchema.safeParse(req.body)
  if (!parsed.success) {
    return res
      .status(400)
      .json({ error: parsed.error.issues.map((i) => i.message).join('; ') })
  }

  const newEntry: Entry = { id: uuid(), ...parsed.data }
  patient.entries = (patient.entries ?? []).concat(newEntry)
  return res.status(201).json(newEntry)
})

export default router
