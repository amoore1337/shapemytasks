import React, { useContext, useEffect, useState } from 'react';

import { gql, useMutation } from '@apollo/client';
import {
  Typography, IconButton, TextField, Button, FormControlLabel, Checkbox, Snackbar,
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import Alert from '@material-ui/lab/Alert';

import { CurrentUserContext } from '@/CurrentUserContext';

import Modal from './Modal';
import { JoinTeamVariables, JoinTeam_joinTeam as JoinResponse } from './types/JoinTeam';

const JOIN_TEAM = gql`
  mutation JoinTeam($name: String!, $joinCode: String!, $joinTeam: Boolean!, $restrictEmailDomain: String) {
    createTeam(name: $name, restrictEmailDomain: $restrictEmailDomain) @skip(if: $joinTeam) {
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
  const { currentUser } = useContext(CurrentUserContext);
  const [teamName, setTeamName] = useState('');
  const [teamCode, setTeamCode] = useState('');
  const [emailDomain, setEmailDomain] = useState(currentUser?.email.split('@')[1] || '');
  const [enforceDomainRestriction, setEnforceDomainRestriction] = useState(false);
  const [formError, setFormError] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const [joinTeam, { loading, called, error }] = useMutation<JoinResponse, JoinTeamVariables>(
    JOIN_TEAM,
    { onError: () => setShowErrorToast(true) },
  );

  useEffect(() => {
    // If we're done, close the modal
    if (called && !loading && !error && onClose) {
      onClose();
    }
  }, [loading, called]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'code') {
      setTeamCode(event.target.value.toUpperCase());
    } else if (event.target.name === 'name') {
      setTeamName(event.target.value);
    } else if (event.target.name === 'domain') {
      setEmailDomain(event.target.value);
    } else {
      setEnforceDomainRestriction(event.target.checked);
    }

    if (event.target.value && formError) {
      setFormError(false);
    }
  };

  const submitTeam = () => {
    if (teamName && (!enforceDomainRestriction || emailDomain)) {
      const restrictEmailDomain = enforceDomainRestriction ? emailDomain : '';
      joinTeam({
        variables: {
          name: teamName, joinCode: '', restrictEmailDomain, joinTeam: false,
        },
      });
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

  // TODO: Bleh, refactor all of this and maybe use formik
  const showCodeError = formError && !teamName && !teamCode;
  const showNameError = showCodeError;
  const showDomainError = formError && enforceDomainRestriction && !emailDomain;

  return (
    <Modal
      open={open}
      onClose={onClose}
      style={{
        width: '60%', height: '80%', maxWidth: 400, maxHeight: 600,
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
              autoFocus
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
            <FormControlLabel
              control={(
                <Checkbox
                  name="domain-restriction"
                  checked={enforceDomainRestriction}
                  onChange={handleChange}
                />
              )}
              label="Enforce by email domain"
            />
            {enforceDomainRestriction && (
              <div className="flex items-center">
                <span className="mr-1 text-xl font-bold text-gray-600">@</span>
                <TextField
                  name="domain"
                  value={emailDomain}
                  onChange={handleChange}
                  size="small"
                  color="secondary"
                  label="example.com"
                  variant="outlined"
                  error={showDomainError}
                  helperText={showDomainError && 'Please provide an email domain name'}
                />
              </div>
            )}
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
        {showErrorToast && (
          <Snackbar open={open} autoHideDuration={6000} onClose={() => setShowErrorToast(false)}>
            <Alert onClose={() => setShowErrorToast(false)} severity="error">
              {error?.message || 'Oops! Something went wrong, please try again.'}
            </Alert>
          </Snackbar>
        )}
      </div>
    </Modal>
  );
}
