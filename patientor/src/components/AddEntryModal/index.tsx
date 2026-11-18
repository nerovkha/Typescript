import { Modal, Box } from "@mui/material";
import { EntryFormValues } from "../../types";
import AddEntryForm from "./AddEntryForm";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
}

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose}>
    <Box sx={style}>
      <AddEntryForm onCancel={onClose} onSubmit={onSubmit} error={error} />
    </Box>
  </Modal>
);

export default AddEntryModal;
