import React, { useEffect, useState } from 'react';

import { Button, TextField, Typography } from '@mui/material';

import useCreateFlag from '@/api/mutations/useCreateFlag';
import Modal from '@/components/Modal';

import { ProjectScope } from '../helpers';

type Props ={
  scope: ProjectScope;
  open: boolean;
  onClose?: () => void;
}

export default function AddFlagModal({ onClose, scope, ...props }: Props) {
  const [message, setMessage] = useState('');
  const [createFlag, { loading, called }] = useCreateFlag();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    createFlag({ variables: { scopeId: scope.id, message } });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
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
      afterClose={() => setMessage('')}
      style={{
        width: '60%', maxWidth: 400, maxHeight: 500,
      }}
    >
      <div className="flex flex-col h-full">
        <Typography variant="h4" className="text-2xl">
          Add Flag to
          {' '}
          <span className="italic">{scope.title}</span>
        </Typography>
        <form noValidate autoComplete="off" className="pt-8 flex-1 flex flex-col justify-between" onSubmit={handleSubmit}>
          <TextField
            size="small"
            color="primary"
            label="Note (Optional)"
            variant="outlined"
            multiline
            maxRows={4}
            name="message"
            value={message}
            onChange={handleChange}
            autoFocus
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="text-white mt-4"
          >
            Add Flag
          </Button>
        </form>
      </div>
    </Modal>
  );
}
