import { z } from 'zod'
import { Gender } from '../types'

export const newPatientSchema = z.object({
  name: z.string().min(1),
  dateOfBirth: z.string().date(),
  ssn: z.string().min(1),
  gender: z.nativeEnum(Gender),
  occupation: z.string().min(1),
  entries: z.array(z.any()).optional(),
})

export const newEntrySchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('Hospital'),
    date: z.string().date(),
    description: z.string().min(1),
    specialist: z.string().min(1),
    diagnosisCodes: z.array(z.string()).optional(),
    dischargeDate: z.string().date(),
  }),
  z.object({
    type: z.literal('OccupationalHealthcare'),
    date: z.string().date(),
    description: z.string().min(1),
    specialist: z.string().min(1),
    diagnosisCodes: z.array(z.string()).optional(),
    employerName: z.string().min(1),
    sickLeave: z
      .object({ startDate: z.string().date(), endDate: z.string().date() })
      .optional(),
  }),
  z.object({
    type: z.literal('HealthCheck'),
    date: z.string().date(),
    description: z.string().min(1),
    specialist: z.string().min(1),
    diagnosisCodes: z.array(z.string()).optional(),
    healthCheckRating: z.number().int().min(0).max(3),
  }),
])
