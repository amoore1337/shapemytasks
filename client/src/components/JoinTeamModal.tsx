import { gql, useMutation } from '@apollo/client';
import {
  Modal, Backdrop, Fade, Typography, IconButton, TextField, Button,
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import React, { useEffect, useState } from 'react';
import tw, { styled } from 'twin.macro';
import { CreateTeamVariables, CreateTeam_createTeam as TeamResponse } from './types/CreateTeam';

const CREATE_TEAM = gql`
  mutation CreateTeam($name: String!) {
    createTeam(name: $name) {
      id
      name
    }
  }
`;

const ModalContent = styled.div`
  ${tw`bg-white p-4 shadow text-gray-800 relative flex flex-col justify-between`}
  width: 60%;
  height: 80%;
  max-width: 400px;
  max-height: 400px;
`;

type Props ={
  open: boolean;
  onClose?: () => void;
}
export default function UserSettingsModal({ open, onClose }: Props) {
  const [teamName, setTeamName] = useState('');
  const [teamCode, setTeamCode] = useState('');
  const [formError, setFormError] = useState(false);
  const [createTeam, { loading, called }] = useMutation<TeamResponse, CreateTeamVariables>(CREATE_TEAM);

  useEffect(() => {
    // If we're done creating a team, close the modal
    if (called && !loading && onClose) {
      onClose();
    }
  }, [loading, called]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'code') {
      setTeamCode(event.target.value);
    } else {
      setTeamName(event.target.value);
    }
    if (event.target.value && formError) {
      setFormError(false);
    }
  };

  const submitTeam = () => {
    if (teamName) {
      createTeam({ variables: { name: teamName } });
    } else if (teamCode) {
      // joinTeam();
    } else {
      setFormError(true);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitTeam();
  };

  const showCodeError = formError && !teamName;
  const showNameError = formError && !teamCode;

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
          <div>
            <Typography variant="h4">Join A Team</Typography>
            <IconButton onClick={onClose} className="p-1 -mt-2 absolute right-1 top-3">
              <CancelIcon color="secondary" className="text-4xl" />
            </IconButton>
            <Typography variant="subtitle2">
              Have an invite code? Provide it below to join an existing team.
            </Typography>
            <form noValidate autoComplete="off" className="py-6" onSubmit={handleSubmit}>
              <TextField
                name="code"
                value={teamCode}
                onChange={handleChange}
                size="small"
                color="secondary"
                label="Team Code"
                variant="outlined"
                error={showCodeError}
                helperText={showCodeError && 'Please provide the code for the team you wish to join.'}
              />
            </form>
            <Typography variant="h4">Create A New Team</Typography>
            <Typography variant="subtitle2">
              Create a new team and have others join you.
            </Typography>
            <form noValidate autoComplete="off" className="py-6" onSubmit={handleSubmit}>
              <TextField
                name="name"
                value={teamName}
                onChange={handleChange}
                size="small"
                color="secondary"
                label="Project Title"
                variant="outlined"
                error={showNameError}
                helperText={showNameError && 'Please provide a name for the team'}
              />
            </form>
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              className="text-white"
              onClick={submitTeam}
              disabled={loading}
            >
              Submit
            </Button>
          </div>
        </ModalContent>
      </Fade>
    </Modal>
  );
}
