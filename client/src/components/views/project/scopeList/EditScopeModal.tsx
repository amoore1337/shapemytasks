import React, { useEffect, useState } from 'react';

import { Button, TextField, Typography } from '@mui/material';

import Modal from '@/components/Modal';
import { useUpdateScope } from '@/models/scope';

import { ProjectScope } from '../helpers';

import DotColorPicker from './DotColorPicker';

type Props ={
  scope: ProjectScope;
  open: boolean;
  onClose?: () => void;
}

export default function EditScopeModal({ onClose, scope, ...props }: Props) {
  const [title, setTitle] = useState(scope.title);
  const [color, setColor] = useState(scope.color);
  const [showError, setShowError] = useState(false);
  const [updateScope, { loading, called }] = useUpdateScope();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title) {
      setShowError(true);
      return;
    }

    updateScope({ variables: { id: scope.id, title, color } });
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
        width: '80%', height: '80%', maxWidth: 800, maxHeight: 275,
      }}
    >
      <div className="flex flex-col h-full">
        <Typography variant="h4" className="text-2xl">Edit Scope</Typography>
        <form noValidate autoComplete="off" className="pt-8 flex-1 flex flex-col justify-between" onSubmit={handleSubmit}>
          <div className="mb-4 flex items-center">
            <div className="mr-4">Edit Color: </div>
            <DotColorPicker selectedColor={color} onChange={setColor} size={40} />
          </div>
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
            className="flex-grow"
            autoFocus
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="text-white"
              style={{ width: 150 }}
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
