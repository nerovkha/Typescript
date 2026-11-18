import { useEffect, useState, SyntheticEvent } from "react";
import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
  FormControl,
} from "@mui/material";

import {
  Diagnosis,
  EntryFormValues,
  HealthCheckRating,
} from "../../types";
import diagnosesService from "../../services/diagnoses";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
}

type EntryType = "Hospital" | "OccupationalHealthcare" | "HealthCheck";

const AddEntryForm = ({ onCancel, onSubmit, error }: Props) => {
  const [type, setType] = useState<EntryType>("HealthCheck");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [dischargeDate, setDischargeDate] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy
  );

  useEffect(() => {
    diagnosesService.getAll().then(setDiagnoses);
  }, []);

  const onTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      setType(event.target.value as EntryType);
    }
  };

  const onCodeChange = (event: SelectChangeEvent<string[]>) => {
    event.preventDefault();
    const value = event.target.value;
    if (typeof value === "string") {
      setDiagnosisCodes(value.split(","));
    } else {
      setDiagnosisCodes(value);
    }
  };

  const onRatingChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    setHealthCheckRating(Number(event.target.value) as HealthCheckRating);
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    const base = {
      description,
      date,
      specialist,
      diagnosisCodes: diagnosisCodes.length > 0 ? diagnosisCodes : undefined,
    };

    switch (type) {
      case "Hospital":
        onSubmit({
          ...base,
          type: "Hospital",
          dischargeDate,
        });
        break;
      case "OccupationalHealthcare":
        onSubmit({
          ...base,
          type: "OccupationalHealthcare",
          employerName,
          sickLeave:
            sickLeaveStart && sickLeaveEnd
              ? { startDate: sickLeaveStart, endDate: sickLeaveEnd }
              : undefined,
        });
        break;
      case "HealthCheck":
        onSubmit({
          ...base,
          type: "HealthCheck",
          healthCheckRating,
        });
        break;
    }
  };

  return (
    <div>
      <h3>add a new entry</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={addEntry}>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />

        <FormControl fullWidth style={{ marginTop: 8 }}>
          <InputLabel>Diagnosis codes</InputLabel>
          <Select
            multiple
            label="Diagnosis codes"
            value={diagnosisCodes}
            onChange={onCodeChange}
          >
            {diagnoses.map((d) => (
              <MenuItem key={d.code} value={d.code}>
                {d.code} — {d.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth style={{ marginTop: 8 }}>
          <InputLabel>Entry type</InputLabel>
          <Select label="Entry type" value={type} onChange={onTypeChange}>
            <MenuItem value="HealthCheck">Health check</MenuItem>
            <MenuItem value="Hospital">Hospital</MenuItem>
            <MenuItem value="OccupationalHealthcare">
              Occupational healthcare
            </MenuItem>
          </Select>
        </FormControl>

        {type === "Hospital" && (
          <TextField
            label="Discharge date"
            placeholder="YYYY-MM-DD"
            fullWidth
            value={dischargeDate}
            onChange={({ target }) => setDischargeDate(target.value)}
          />
        )}

        {type === "OccupationalHealthcare" && (
          <>
            <TextField
              label="Employer name"
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <TextField
              label="Sick leave start"
              placeholder="YYYY-MM-DD"
              fullWidth
              value={sickLeaveStart}
              onChange={({ target }) => setSickLeaveStart(target.value)}
            />
            <TextField
              label="Sick leave end"
              placeholder="YYYY-MM-DD"
              fullWidth
              value={sickLeaveEnd}
              onChange={({ target }) => setSickLeaveEnd(target.value)}
            />
          </>
        )}

        {type === "HealthCheck" && (
          <FormControl fullWidth style={{ marginTop: 8 }}>
            <InputLabel>Health check rating</InputLabel>
            <Select
              label="Health check rating"
              value={String(healthCheckRating)}
              onChange={onRatingChange}
            >
              {Object.entries(HealthCheckRating)
                .filter(([key]) => isNaN(Number(key)))
                .map(([key, value]) => (
                  <MenuItem key={key} value={String(value)}>
                    {key}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        )}

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{ float: "right" }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;
