import React, { useEffect, useState } from 'react';

import { Button, TextField, Typography } from '@mui/material';

import useUpdateScope from '@/api/mutations/useUpdateScope';
import Modal from '@/components/Modal';

import { ProjectScope } from '../helpers';

type Props ={
  scope: ProjectScope;
  open: boolean;
  onClose?: () => void;
}

export default function EditScopeModal({ onClose, scope, ...props }: Props) {
  const [title, setTitle] = useState(scope.title);
  const [showError, setShowError] = useState(false);
  const [updateScope, { loading, called }] = useUpdateScope();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title) {
      setShowError(true);
      return;
    }

    updateScope({ variables: { id: scope.id, title } });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    if (showError && event.target.value) {
      setShowError(false);
    }
  };

  useEffect(() => {
    if (!loading && called && onClose) {
      onClose();
    }
  }, [loading, called]);

  return (
    <Modal
      {...props}
      onClose={onClose}
      style={{
        width: '60%', height: '80%', maxWidth: 400, maxHeight: 500,
      }}
    >
      <div className="flex flex-col h-full">
        <Typography variant="h4" className="text-2xl">Edit Scope</Typography>
        <form noValidate autoComplete="off" className="pt-8 flex-1 flex flex-col justify-between" onSubmit={handleSubmit}>
          <TextField
            size="small"
            color="primary"
            label="Title"
            variant="outlined"
            name="title"
            value={title}
            onChange={handleChange}
            error={showError}
            helperText={showError && 'Please provide a title.'}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="text-white"
          >
            Save
          </Button>
        </form>
      </div>
    </Modal>
  );
}
