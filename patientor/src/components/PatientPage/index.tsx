import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";

import { Entry, Gender, Patient } from "../../types";
import patientService from "../../services/patients";
import HealthRatingBar from "../HealthRatingBar";
import AddEntryModal from "../AddEntryModal";

import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import WorkIcon from "@mui/icons-material/Work";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "Hospital":
      return (
        <div style={{ border: "1px solid #ccc", borderRadius: 8, padding: 12, marginBottom: 8 }}>
          <Typography variant="body1">
            <LocalHospitalIcon fontSize="small" /> {entry.date} — {entry.description}
          </Typography>
          <Typography variant="body2">specialist: {entry.specialist}</Typography>
          {entry.diagnosisCodes && (
            <ul>
              {entry.diagnosisCodes.map((code) => (
                <li key={code}>{code}</li>
              ))}
            </ul>
          )}
          <Typography variant="body2">discharged: {entry.dischargeDate}</Typography>
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div style={{ border: "1px solid #ccc", borderRadius: 8, padding: 12, marginBottom: 8 }}>
          <Typography variant="body1">
            <WorkIcon fontSize="small" /> {entry.date} — {entry.description}
          </Typography>
          <Typography variant="body2">specialist: {entry.specialist}</Typography>
          <Typography variant="body2">employer: {entry.employerName}</Typography>
          {entry.sickLeave && (
            <Typography variant="body2">
              sick leave: {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
            </Typography>
          )}
          {entry.diagnosisCodes && (
            <ul>
              {entry.diagnosisCodes.map((code) => (
                <li key={code}>{code}</li>
              ))}
            </ul>
          )}
        </div>
      );
    case "HealthCheck":
      return (
        <div style={{ border: "1px solid #ccc", borderRadius: 8, padding: 12, marginBottom: 8 }}>
          <Typography variant="body1">
            <MedicalServicesIcon fontSize="small" /> {entry.date} — {entry.description}
          </Typography>
          <Typography variant="body2">specialist: {entry.specialist}</Typography>
          {entry.diagnosisCodes && (
            <ul>
              {entry.diagnosisCodes.map((code) => (
                <li key={code}>{code}</li>
              ))}
            </ul>
          )}
          <HealthRatingBar showText={false} rating={entry.healthCheckRating} />
        </div>
      );
  }
};

const genderIcon = (gender: Gender) => {
  switch (gender) {
    case Gender.Male:
      return <MaleIcon />;
    case Gender.Female:
      return <FemaleIcon />;
    default:
      return <TransgenderIcon />;
  }
};

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      patientService.getPatient(id).then(setPatient).catch(() => setPatient(null));
    }
  }, [id]);

  if (!patient) {
    return <Typography>patient not found</Typography>;
  }

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => setModalOpen(false);

  const submitNewEntry = async (values: Parameters<typeof patientService.createEntry>[1]) => {
    if (!id) {
      return;
    }
    const entry = await patientService.createEntry(id, values);
    setPatient({ ...patient, entries: patient.entries.concat(entry) });
    setModalOpen(false);
  };

  return (
    <div>
      <Typography variant="h4" style={{ marginTop: 12 }}>
        {patient.name} {genderIcon(patient.gender)}
      </Typography>
      <Typography variant="body1">
        ssn: {patient.ssn}
        <br />
        occupation: {patient.occupation}
      </Typography>

      <Typography variant="h6" style={{ marginTop: 16 }}>
        entries
      </Typography>

      {patient.entries.length === 0 && (
        <Typography variant="body2">no entries yet</Typography>
      )}

      {patient.entries.map((entry) => (
        <EntryDetails key={entry.id} entry={entry} />
      ))}

      <AddEntryModal
        modalOpen={modalOpen}
        onClose={closeModal}
        onSubmit={submitNewEntry}
        error=""
      />

      <Button variant="contained" color="primary" onClick={() => openModal()}>
        add new entry
      </Button>
    </div>
  );
};

export default PatientPage;
