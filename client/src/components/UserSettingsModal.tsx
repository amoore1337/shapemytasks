import {
  Modal, Backdrop, Fade, Typography, IconButton, TextField,
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import React from 'react';
import tw, { styled } from 'twin.macro';

const ModalContent = styled.div`
  ${tw`bg-white p-4 shadow text-gray-800 relative`}
  width: 60%;
  height: 80%;
  max-width: 400px;
  max-height: 500px;
`;

type Props ={
  open: boolean;
  onClose?: () => void;
}
export default function UserSettingsModal({ open, onClose }: Props) {
  return (
    <Modal
      className="flex items-center justify-center"
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      disableBackdropClick
    >
      <Fade in={open}>
        <ModalContent>
          <Typography variant="h4">Add Project</Typography>
          <IconButton onClick={onClose} className="p-1 -mt-2 absolute right-1 top-3">
            <CancelIcon color="secondary" className="text-4xl" />
          </IconButton>
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
        </ModalContent>
      </Fade>
    </Modal>
  );
}
