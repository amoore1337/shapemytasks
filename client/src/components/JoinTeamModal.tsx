import React, { useEffect, useState } from 'react';

import { gql, useMutation } from '@apollo/client';
import {
  Typography, IconButton, TextField, Button,
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';

import Modal from './Modal';
import { JoinTeamVariables, JoinTeam_joinTeam as JoinResponse } from './types/JoinTeam';

const JOIN_TEAM = gql`
  mutation JoinTeam($name: String!, $joinCode: String!, $joinTeam: Boolean!) {
    createTeam(name: $name) @skip(if: $joinTeam) {
      ...TeamInfo
    }

    joinTeam(joinCode: $joinCode) @include(if: $joinTeam) {
      ...TeamInfo
    }
  }

  fragment TeamInfo on CurrentUser {
    id
    team {
      id
      name
      joinCode
    }
  }
`;

type Props ={
  open: boolean;
  onClose?: () => void;
}
export default function UserSettingsModal({ open, onClose }: Props) {
  const [teamName, setTeamName] = useState('');
  const [teamCode, setTeamCode] = useState('');
  const [formError, setFormError] = useState(false);

  const [joinTeam, { loading, called }] = useMutation<JoinResponse, JoinTeamVariables>(JOIN_TEAM);

  useEffect(() => {
    // If we're done, close the modal
    if (called && !loading && onClose) {
      onClose();
    }
  }, [loading, called]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'code') {
      setTeamCode(event.target.value.toUpperCase());
    } else {
      setTeamName(event.target.value);
    }
    if (event.target.value && formError) {
      setFormError(false);
    }
  };

  const submitTeam = () => {
    if (teamName) {
      joinTeam({ variables: { name: teamName, joinCode: '', joinTeam: false } });
    } else if (teamCode) {
      joinTeam({ variables: { name: '', joinCode: teamCode, joinTeam: true } });
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
      open={open}
      onClose={onClose}
      style={{
        width: '60%', height: '80%', maxWidth: 400, maxHeight: 400,
      }}
    >
      <div>
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
      </div>
    </Modal>
  );
}
