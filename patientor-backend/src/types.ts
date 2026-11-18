export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface Diagnosis {
  code: string
  name: string
  latin?: string
}

export interface Patient {
  id: string
  name: string
  dateOfBirth: string
  ssn: string
  gender: Gender
  occupation: string
  entries?: Entry[]
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry

export interface BaseEntry {
  id: string
  date: string
  description: string
  specialist: string
  diagnosisCodes?: Array<Diagnosis['code']>
}

export interface HospitalEntry extends BaseEntry {
  type: 'Hospital'
  dischargeDate: string
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare'
  employerName: string
  sickLeave?: { startDate: string; endDate: string }
}

export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck'
  healthCheckRating: number
}
