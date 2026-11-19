# Part 9 — TypeScript

Exercises for [Full Stack Open](https://fullstackopen.com) part 9
(CSM14110): TypeScript from first primitives to a full-stack patient
records app.

## Apps

| App | Topic |
| --- | --- |
| `calculator-service/` | BMI and exercise calculators (course 9.8–9.15 utilities) |
| `course-info/` | course stats with typed props |
| `flight-diary-frontend/` | typed diary entries against the course-provided API |
| `patientor-backend/` | Express + TypeScript API for diagnoses, patients and entries |
| `patientor/` | React + TypeScript frontend for the patientor |

## Run

```bash
cd patientor-backend && npm install && npm run dev    # http://localhost:3001 (or port 3000 per its .env)
cd patientor && npm install && npm run dev            # http://localhost:5173
```

`flight-diary-frontend` runs on its own against the course-provided
API; `calculator-service` is a CLI (`npm run bmi`, `npm run exercises`).

## Test in CI

`.github/workflows/ci.yml` lints everything, type-checks and lints the
backend, and builds the three frontends on every push and pull request.
This directory is self-contained — copy its contents into a new
repository and CI works without any extra setup.
