import React, { useContext, useEffect, useState } from 'react';

import CancelIcon from '@mui/icons-material/Cancel';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Typography, IconButton, TextField, Button, FormControlLabel, Checkbox, Accordion, AccordionSummary, AccordionDetails,
} from '@mui/material';

import { CurrentUserContext } from '@/CurrentUserContext';
import useCreateOrJoinTeam from '@/api/mutations/useCreateOrJoinTeam';

import ErrorToast from './ErrorToast';
import Modal from './Modal';

type Props ={
  open: boolean;
  onClose?: () => void;
}
export default function UserSettingsModal({ open, onClose }: Props) {
  const { currentUser } = useContext(CurrentUserContext);
  const [expandedSection, setExpandedSection] = useState<'join' | 'create'>('join');
  const [teamName, setTeamName] = useState('');
  const [teamCode, setTeamCode] = useState('');
  const [emailDomain, setEmailDomain] = useState(currentUser?.email.split('@')[1] || '');
  const [enforceDomainRestriction, setEnforceDomainRestriction] = useState(false);
  const [formError, setFormError] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const [joinTeam, { loading, called, error }] = useCreateOrJoinTeam(
    { onError: () => setShowErrorToast(true) },
  );

  useEffect(() => {
    // If we're done, close the modal
    if (called && !loading && !error && onClose) {
      onClose();
    }
  }, [loading, called]);

  const handleAccordionChange = (section: 'join' | 'create') => {
    if (expandedSection !== section) {
      setExpandedSection(section);
    }
  };

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

  const showCodeError = formError && !teamName && !teamCode;
  const showNameError = showCodeError;
  const showDomainError = formError && enforceDomainRestriction && !emailDomain;

  return (
    <Modal
      open={open}
      onClose={onClose}
      style={{
        width: '80%', height: '80%', maxWidth: 600, maxHeight: 500,
      }}
    >
      <div className="flex flex-col justify-between h-full">
        <div>
          <Typography variant="h5" className="pb-4">Join or Create a Team</Typography>
          <Accordion expanded={expandedSection === 'join'} onChange={() => handleAccordionChange('join')} variant="outlined" disableGutters>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} classes={{ content: 'flex-col' }}>
              <Typography variant="h6">Join A Team</Typography>
              <Typography variant="subtitle2">
                Have an invite code? Provide it below to join an existing team.
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <form noValidate autoComplete="off" className="py-2" onSubmit={handleSubmit}>
                <TextField
                  autoFocus
                  name="code"
                  value={teamCode}
                  onChange={handleChange}
                  size="small"
                  color="primary"
                  label="Team Code"
                  variant="outlined"
                  error={showCodeError}
                  helperText={showCodeError && 'Please provide the code for the team you wish to join.'}
                />
              </form>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expandedSection === 'create'} onChange={() => handleAccordionChange('create')} variant="outlined" disableGutters>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} classes={{ content: 'flex-col' }}>
              <Typography variant="h6">Create A New Team</Typography>
              <Typography variant="subtitle2">
                Create a new team and have others join you.
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <form noValidate autoComplete="off" className="py-6" onSubmit={handleSubmit}>
                <TextField
                  name="name"
                  value={teamName}
                  onChange={handleChange}
                  size="small"
                  color="primary"
                  label="Team Name"
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
                  label="Restrict by email domain"
                />
                {enforceDomainRestriction && (
                <div className="flex items-center">
                  <span className="mr-1 text-xl font-bold text-gray-600">@</span>
                  <TextField
                    name="domain"
                    value={emailDomain}
                    onChange={handleChange}
                    size="small"
                    color="primary"
                    label="example.com"
                    variant="outlined"
                    error={showDomainError}
                    helperText={showDomainError && 'Please provide an email domain name'}
                  />
                </div>
                )}
              </form>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="text-white"
            onClick={submitTeam}
            disabled={loading}
          >
            Submit
          </Button>
        </div>
        {showErrorToast && (
          <ErrorToast open={open} onClose={() => setShowErrorToast(false)} message={error?.message} />
        )}
      </div>
    </Modal>
  );
}
