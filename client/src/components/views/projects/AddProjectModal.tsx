import {
  Typography, TextField,
} from '@material-ui/core';
import React from 'react';
import Modal from '../../Modal';

type Props ={
  open: boolean;
  onClose?: () => void;
}
export default function AddProjectModal(props: Props) {
  return (
    <Modal
      {...props}
      style={{
        width: '60%', height: '80%', maxWidth: 400, maxHeight: 500,
      }}
    >
      <div>
        <Typography variant="h4">Add Project</Typography>
        <form noValidate autoComplete="off" className="pt-8">
          <TextField size="small" color="secondary" label="Project Title" variant="outlined" />
          <TextField
            size="small"
            color="secondary"
            label="Project Description (Optional)"
            variant="outlined"
            className="mt-4 w-full"
            multiline
            rows={3}
            rowsMax={4}
          />
        </form>
      </div>
    </Modal>
  );
}
